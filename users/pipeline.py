# users/pipeline.py
"""
Pipeline функции для обработки социальной аутентификации через Google.
"""
import re
import random
import string
from django.contrib.auth.models import User
from django.db import transaction
from django.db.models import Q
from .models import UserProfile, UserSettings, UserAchievement, Achievement
from django.core.files.base import ContentFile
import requests
from urllib.parse import urlparse
import os
import logging

logger = logging.getLogger(__name__)

def generate_unique_username(email, first_name, last_name):
    """
    Генерирует уникальное имя пользователя на основе email или имени.
    """
    # Пробуем использовать часть email до @
    if email:
        base_username = email.split('@')[0]
        # Очищаем от недопустимых символов
        base_username = re.sub(r'[^\w.]+', '', base_username)
        base_username = base_username.lower()
        
        # Если username слишком короткий, добавляем имя
        if len(base_username) < 3:
            if first_name:
                base_username = re.sub(r'[^\w]+', '', first_name.lower())
            elif last_name:
                base_username = re.sub(r'[^\w]+', '', last_name.lower())
    
    # Если email не подходит, используем имя
    if not base_username or len(base_username) < 3:
        if first_name and last_name:
            base_username = f"{first_name.lower()}_{last_name.lower()}"
        elif first_name:
            base_username = first_name.lower()
        elif last_name:
            base_username = last_name.lower()
        else:
            base_username = "user"
    
    # Очищаем от недопустимых символов еще раз
    base_username = re.sub(r'[^\w.]+', '', base_username)
    
    # Проверяем уникальность
    username = base_username
    counter = 1
    
    while User.objects.filter(username=username).exists():
        username = f"{base_username}{counter}"
        counter += 1
        
        # Защита от бесконечного цикла
        if counter > 100:
            # Генерируем случайный суффикс
            random_suffix = ''.join(random.choices(string.digits, k=6))
            username = f"{base_username}_{random_suffix}"
            break
    
    return username


def create_user_via_google(strategy, details, backend, user=None, *args, **kwargs):
    """
    Создает или находит пользователя при аутентификации через Google.
    """
    logger.info(f"🔐 Попытка создания/поиска пользователя через Google")
    
    # Если пользователь уже аутентифицирован, ничего не делаем
    if user:
        logger.info(f"👤 Пользователь уже аутентифицирован: {user.username}")
        return {'is_new': False}
    
    # Получаем данные из Google
    email = details.get('email', '')
    first_name = details.get('first_name', '')
    last_name = details.get('last_name', '')
    fullname = details.get('fullname', '')
    
    if not email:
        # Без email не можем создать пользователя
        logger.error("❌ Нет email для создания пользователя через Google")
        return None
    
    logger.info(f"📧 Google данные: email={email}, first_name={first_name}, last_name={last_name}")
    
    # Проверяем, существует ли пользователь с таким email
    try:
        existing_user = User.objects.get(email=email)
        logger.info(f"👤 Найден существующий пользователь по email: {existing_user.username}")
        return {
            'is_new': False,
            'user': existing_user
        }
    except User.DoesNotExist:
        logger.info(f"👤 Пользователь с email {email} не найден, создаем нового")
        pass
    
    # Проверяем, существует ли пользователь с таким username (на основе email)
    username_from_email = email.split('@')[0]
    try:
        existing_user = User.objects.get(username=username_from_email)
        logger.info(f"👤 Найден пользователь с username из email: {existing_user.username}")
        # Если пользователь с таким username существует, генерируем новый
        pass
    except User.DoesNotExist:
        # Можно попробовать использовать username из email
        base_username = username_from_email
        logger.info(f"👤 Username из email свободен: {base_username}")
    
    # Генерируем уникальное имя пользователя
    username = generate_unique_username(email, first_name, last_name)
    logger.info(f"👤 Сгенерирован username: {username}")
    
    # Создаем нового пользователя
    try:
        with transaction.atomic():
            user = User.objects.create_user(
                username=username,
                email=email,
                password=None,  # У Google пользователей нет пароля
                first_name=first_name,
                last_name=last_name,
                is_active=True
            )
            
            logger.info(f"✅ Создан новый пользователь через Google: {username} ({email})")
            
            return {
                'is_new': True,
                'user': user
            }
    except Exception as e:
        logger.error(f"❌ Ошибка при создании пользователя через Google: {e}")
        # В случае ошибки пробуем найти существующего пользователя
        try:
            user = User.objects.get(Q(email=email) | Q(username=username))
            logger.info(f"👤 Найден пользователь после ошибки: {user.username}")
            return {
                'is_new': False,
                'user': user
            }
        except User.DoesNotExist:
            logger.error(f"❌ Пользователь не найден после ошибки создания")
            return None


def save_google_avatar(strategy, details, response, user=None, *args, **kwargs):
    """
    Загружает и сохраняет аватар из Google профиля.
    """
    if not user:
        logger.warning("⚠️ Нет пользователя для сохранения аватара Google")
        return
    
    try:
        profile = user.profile
    except UserProfile.DoesNotExist:
        # Профиль еще не создан
        logger.warning(f"⚠️ Профиль не найден для пользователя {user.username}")
        return
    
    # Получаем URL аватара из Google
    picture_url = response.get('picture')
    
    if picture_url and not profile.avatar:
        try:
            logger.info(f"🖼️ Загрузка аватара Google для {user.username}")
            # Загружаем изображение
            response_img = requests.get(picture_url, timeout=10)
            
            if response_img.status_code == 200:
                # Получаем расширение файла из URL
                parsed_url = urlparse(picture_url)
                path = parsed_url.path
                filename = os.path.basename(path)
                
                # Если нет расширения, используем jpg
                if not '.' in filename:
                    filename = f"google_avatar_{user.id}.jpg"
                
                # Сохраняем аватар
                profile.avatar.save(
                    filename,
                    ContentFile(response_img.content),
                    save=True
                )
                
                logger.info(f"✅ Аватар загружен из Google для пользователя {user.username}")
            else:
                logger.warning(f"⚠️ Не удалось загрузить аватар Google: статус {response_img.status_code}")
        except Exception as e:
            logger.error(f"❌ Ошибка загрузки аватара Google: {e}")
            # Не прерываем процесс, если аватар не загрузился
    
    return {'user': user}


def create_google_user_profile(strategy, details, response, user=None, is_new=False, *args, **kwargs):
    """
    Создает профиль и настройки для пользователя из Google.
    """
    if not user:
        logger.warning("⚠️ Нет пользователя для создания профиля Google")
        return
    
    logger.info(f"👤 Создание профиля Google для {user.username}, is_new={is_new}")
    
    # Проверяем, создан ли пользователь только что
    if not is_new:
        try:
            # Пользователь уже существует, проверяем профиль
            profile = user.profile
            # Обновляем данные из Google, если они пустые
            if not profile.status and details.get('fullname'):
                profile.status = details['fullname']
                profile.save(update_fields=['status'])
                logger.info(f"✅ Обновлен статус для существующего пользователя {user.username}")
            
            return {'user': user, 'profile_created': False}
        except UserProfile.DoesNotExist:
            # Продолжаем создание профиля
            logger.info(f"👤 Профиль не найден, создаем для {user.username}")
            pass
    
    try:
        # Создаем профиль пользователя
        profile = UserProfile.objects.create(user=user)
        logger.info(f"✅ Создан профиль для {user.username}")
        
        # Заполняем данные из Google
        if details.get('fullname'):
            profile.status = details['fullname']
        
        # Сохраняем страну из локали Google
        if response.get('locale'):
            locale = response['locale']
            if '_' in locale:
                country_code = locale.split('_')[1]
                profile.country = country_code.upper()
                logger.info(f"🌍 Определена страна из locale: {country_code}")
            elif '-' in locale:
                country_code = locale.split('-')[1]
                profile.country = country_code.upper()
                logger.info(f"🌍 Определена страна из locale: {country_code}")
        
        # Сохраняем bio из Google, если есть
        if response.get('bio'):
            profile.bio = response['bio'][:500]  # Ограничиваем длину
            logger.info(f"📝 Добавлено bio из Google")
        
        profile.save()
        
        logger.info(f"✅ Профиль сохранен для пользователя {user.username}")
        
    except Exception as e:
        logger.error(f"❌ Ошибка при создании профиля: {e}")
        # Пробуем найти существующий профиль
        try:
            profile = user.profile
            logger.info(f"👤 Найден существующий профиль после ошибки")
        except UserProfile.DoesNotExist:
            # Если не удалось, создаем минимальный профиль
            profile = UserProfile.objects.create(user=user)
            logger.info(f"👤 Создан минимальный профиль после ошибки")
    
    # Создаем настройки пользователя, если их нет
    try:
        settings = user.settings
        logger.info(f"⚙️ Настройки уже существуют для {user.username}")
    except UserSettings.DoesNotExist:
        settings = UserSettings.objects.create(user=user)
        logger.info(f"✅ Созданы настройки для пользователя {user.username}")
    
    return {'user': user, 'profile_created': True}


def award_google_registration_achievement(strategy, details, response, user=None, is_new=False, *args, **kwargs):
    """
    Выдает достижение за регистрацию через Google.
    """
    if not user or not is_new:
        logger.info(f"👤 Пропуск выдачи достижения: user={user}, is_new={is_new}")
        return
    
    logger.info(f"🎖️ Выдача достижения Google для {user.username}")
    
    try:
        # Находим или создаем достижение за регистрацию
        registered_achievement, created = Achievement.objects.get_or_create(
            code='registered',
            defaults={
                'title': 'Добро пожаловать через Google!',
                'description': 'Вы зарегистрировались в Kirava через Google',
                'points': 15,  # Немного больше очков за Google регистрацию
                'achievement_type': 'silver'
            }
        )
        
        if created:
            logger.info(f"✅ Создано достижение 'registered'")
        
        # Проверяем, есть ли уже такое достижение у пользователя
        if not UserAchievement.objects.filter(user=user, achievement=registered_achievement).exists():
            UserAchievement.objects.create(user=user, achievement=registered_achievement)
            logger.info(f"✅ Выдано достижение 'registered' пользователю {user.username}")
            
            # Обновляем счетчик достижений в профиле
            try:
                profile = user.profile
                profile.achievements_count = user.user_achievements.count()
                profile.save(update_fields=['achievements_count'])
                logger.info(f"✅ Обновлен счетчик достижений: {profile.achievements_count}")
            except UserProfile.DoesNotExist:
                logger.warning(f"⚠️ Нет профиля для обновления счетчика достижений")
        
        # Также выдаем достижение за Google аутентификацию, если оно существует
        google_achievement = Achievement.objects.filter(code='google_auth').first()
        if google_achievement and not UserAchievement.objects.filter(user=user, achievement=google_achievement).exists():
            UserAchievement.objects.create(user=user, achievement=google_achievement)
            logger.info(f"✅ Выдано достижение 'google_auth' пользователю {user.username}")
            
    except Exception as e:
        logger.error(f"❌ Ошибка при выдаче достижения: {e}")
    
    return {'user': user}


def ensure_google_achievements_exist():
    """
    Создает необходимые достижения для Google аутентификации, если их нет.
    """
    logger.info("🎖️ Проверка Google достижений")
    
    achievements_data = [
        {
            'code': 'google_auth',
            'title': 'Google Explorer',
            'description': 'Вы вошли в систему через Google',
            'points': 10,
            'achievement_type': 'bronze'
        },
        {
            'code': 'social_butterfly',
            'title': 'Социальная бабочка',
            'description': 'Вы подключили социальный аккаунт',
            'points': 20,
            'achievement_type': 'silver'
        },
    ]
    
    created_count = 0
    for data in achievements_data:
        obj, created = Achievement.objects.get_or_create(
            code=data['code'],
            defaults=data
        )
        if created:
            created_count += 1
            logger.info(f"✅ Создано достижение: {data['code']}")
    
    logger.info(f"🎖️ Google достижения проверены. Создано: {created_count}")
    return created_count