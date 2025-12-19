# users/signals.py
"""
Сигналы для обработки событий пользователей.
"""
from django.db.models.signals import post_save, post_delete, pre_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from django.db import transaction
import logging

from .models import UserProfile, UserSettings, Achievement, UserAchievement
from .pipeline import ensure_google_achievements_exist

logger = logging.getLogger(__name__)

def ensure_achievement(code: str, title: str, description: str = "", points: int = 0, achievement_type: str = "bronze") -> Achievement:
    """Создает или получает достижение по коду"""
    obj, created = Achievement.objects.get_or_create(
        code=code,
        defaults={
            "title": title, 
            "description": description, 
            "points": points,
            "achievement_type": achievement_type
        }
    )
    if created:
        logger.info(f"✅ Создано достижение: {code} - {title}")
    return obj


def award_achievement(user: User, code: str, force: bool = False):
    """Награждает пользователя достижением"""
    ach = Achievement.objects.filter(code=code).first()
    if not ach:
        logger.error(f"❌ Достижение с кодом '{code}' не найдено!")
        return False
        
    # Проверяем, есть ли уже такое достижение
    existing = UserAchievement.objects.filter(user=user, achievement=ach).exists()
    
    if existing and not force:
        logger.info(f"ℹ️  Достижение '{code}' уже есть у пользователя {user.username}")
        return False
    
    # Создаем связь пользователь-достижение
    ua, created = UserAchievement.objects.get_or_create(user=user, achievement=ach)
    
    if created:
        logger.info(f"✅ Достижение '{code}' выдано пользователю {user.username}")
        
        # Обновляем счетчик достижений в профиле
        try:
            profile = user.profile
            profile.achievements_count = user.user_achievements.count()
            profile.save(update_fields=["achievements_count"])
            logger.info(f"✅ Счетчик достижений обновлен: {profile.achievements_count}")
        except Exception as e:
            logger.error(f"❌ Ошибка при обновлении счетчика достижений: {e}")
        
        return True
    else:
        logger.info(f"ℹ️  Достижение '{code}' уже было у пользователя {user.username}")
        return False


@receiver(post_save, sender=User)
def create_user_profile_and_settings(sender, instance, created, **kwargs):
    """Создает профиль и настройки при создании пользователя"""
    if not created:
        return

    logger.info(f"👤 Создание профиля для пользователя: {instance.username}")
    
    # Создаем профиль и настройки
    try:
        with transaction.atomic():
            UserProfile.objects.create(user=instance)
            UserSettings.objects.create(user=instance)
            
            # Создаем базовые достижения, если их нет
            ensure_achievement(
                code="registered",
                title="Добро пожаловать!",
                description="Вы зарегистрировались в Kirava",
                points=10,
                achievement_type="bronze"
            )
            
            ensure_achievement(
                code="set_avatar", 
                title="Первый аватар",
                description="Вы установили аватар в профиле", 
                points=10,
                achievement_type="bronze"
            )
            
            # Создаем Google достижения, если их нет
            ensure_google_achievements_exist()
            
            # Выдаем достижение за регистрацию (только для обычной регистрации)
            # Для Google регистрации достижение выдается в pipeline
            award_achievement(instance, "registered")
            
            logger.info(f"✅ Профиль и настройки созданы для {instance.username}")
    except Exception as e:
        logger.error(f"❌ Ошибка при создании профиля и настроек: {e}")


@receiver(post_save, sender=UserProfile)
def update_achievements_count_on_profile_save(sender, instance, **kwargs):
    """Обновляет счетчик достижений при сохранении профиля"""
    try:
        current_count = instance.user.user_achievements.count()
        if instance.achievements_count != current_count:
            instance.achievements_count = current_count
            # Используем update чтобы избежать рекурсии
            UserProfile.objects.filter(pk=instance.pk).update(
                achievements_count=current_count
            )
            logger.info(f"📊 Обновлен счетчик достижений для {instance.user.username}: {current_count}")
    except Exception as e:
        logger.error(f"❌ Ошибка обновления счетчика достижений: {e}")


@receiver(pre_save, sender=UserProfile)
def check_avatar_achievement_before_save(sender, instance, **kwargs):
    """Проверяет и выдает достижение за аватар перед сохранением"""
    try:
        if instance.pk:
            # Получаем старую версию профиля
            old_profile = UserProfile.objects.get(pk=instance.pk)
            
            # Проверяем, был ли пустым аватар, а теперь есть
            was_empty = not bool(old_profile.avatar)
            now_has = bool(instance.avatar)
            
            if was_empty and now_has:
                logger.info(f"🖼️  Пользователь {instance.user.username} установил аватар!")
                award_achievement(instance.user, "set_avatar")
    except UserProfile.DoesNotExist:
        pass
    except Exception as e:
        logger.error(f"❌ Ошибка при проверке достижения за аватар: {e}")


@receiver(post_save, sender=Achievement)
def log_achievement_creation(sender, instance, created, **kwargs):
    """Логирует создание новых достижений"""
    if created:
        logger.info(f"🎖️  Создано новое достижение: {instance.code} - {instance.title}")


@receiver(post_save, sender=UserAchievement)
def update_profile_on_achievement_award(sender, instance, created, **kwargs):
    """Обновляет профиль при выдаче достижения"""
    if created:
        try:
            profile = instance.user.profile
            profile.achievements_count = instance.user.user_achievements.count()
            profile.save(update_fields=['achievements_count'])
            logger.info(f"📈 Обновлен счетчик достижений для {instance.user.username}")
        except UserProfile.DoesNotExist:
            pass
        except Exception as e:
            logger.error(f"❌ Ошибка обновления профиля: {e}")


@receiver(post_delete, sender=User)
def cleanup_on_user_delete(sender, instance, **kwargs):
    """Очистка при удалении пользователя"""
    try:
        logger.info(f"🗑️  Удален пользователь: {instance.username}")
    except Exception as e:
        logger.error(f"❌ Ошибка при очистке пользователя: {e}")


@receiver(post_save, sender=UserSettings)
def log_user_settings_update(sender, instance, created, **kwargs):
    """Логирует обновление настроек пользователя"""
    if not created:
        logger.info(f"⚙️  Обновлены настройки для пользователя: {instance.user.username}")