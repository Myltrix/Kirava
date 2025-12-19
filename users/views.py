# users/views.py
"""
View функции для пользователей.
"""
import json
import logging
from urllib.request import urlopen
from urllib.error import URLError

from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import login, logout, authenticate, update_session_auth_hash
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpRequest, HttpResponseBadRequest
from django.views.decorators.http import require_POST
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.db import transaction
from django.conf import settings
from social_django.models import UserSocialAuth

from .forms import RegisterForm, LoginForm, ProfileEditForm
from .models import Achievement, UserAchievement, UserProfile, UserSettings
from .pipeline import ensure_google_achievements_exist

logger = logging.getLogger(__name__)

def google_login(request):
    """Редирект на Google OAuth"""
    # Простой редирект на стандартный URL social auth
    return redirect('/social-auth/login/google-oauth2/')

def _get_client_ip(request: HttpRequest) -> str:
    """Получает IP адрес клиента"""
    xff = request.META.get("HTTP_X_FORWARDED_FOR")
    if xff:
        return xff.split(",")[0].strip()
    return request.META.get("REMOTE_ADDR", "")

def _detect_country_code_by_ip(ip: str) -> str:
    """Определяет страну по IP адресу"""
    if not ip or ip in ("127.0.0.1", "localhost"):
        return ""

    try:
        with urlopen(f"https://ipapi.co/{ip}/country/", timeout=2) as r:
            code = r.read().decode("utf-8").strip().upper()
            if len(code) == 2:
                return code
    except URLError:
        return ""
    except Exception:
        return ""

    return ""

def home(request):
    """Главная страница"""
    return render(request, "main.html")

def register_view(request):
    """Регистрация пользователя"""
    if request.user.is_authenticated:
        return redirect("home")

    if request.method == "POST":
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            
            # Автоматический вход после регистрации
            raw_password = form.cleaned_data.get("password1")
            auth_user = authenticate(username=user.username, password=raw_password)
            if auth_user:
                login(request, auth_user)
            
            # Определяем страну по IP
            try:
                profile = user.profile
                if not profile.country:
                    ip = _get_client_ip(request)
                    code = _detect_country_code_by_ip(ip)
                    if code:
                        profile.country = code
                        profile.save(update_fields=["country"])
            except Exception as e:
                logger.error(f"Ошибка определения страны: {e}")
            
            messages.success(request, "Регистрация успешна! Добро пожаловать!")
            return redirect("home")
        else:
            messages.error(request, "Исправьте ошибки формы.")
    else:
        form = RegisterForm()

    # Убедимся, что Google достижения существуют
    ensure_google_achievements_exist()
    
    return render(request, "register.html", {"form": form})

def login_view(request):
    """Вход в систему"""
    if request.user.is_authenticated:
        return redirect("home")

    if request.method == "POST":
        form = LoginForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get("username")
            password = form.cleaned_data.get("password")
            user = authenticate(username=username, password=password)
            
            if user:
                login(request, user)
                messages.success(request, "Вход выполнен!")
                return redirect("home")
        
        messages.error(request, "Неверный логин или пароль.")
    else:
        form = LoginForm()
    
    # Убедимся, что Google достижения существуют
    ensure_google_achievements_exist()
    
    return render(request, "login.html", {"form": form})

def logout_view(request):
    """Выход из системы"""
    logout(request)
    messages.success(request, "Вы вышли из аккаунта.")
    return redirect("home")

def is_google_user(user):
    """Проверяет, зарегистрирован ли пользователь через Google"""
    return UserSocialAuth.objects.filter(user=user, provider='google-oauth2').exists()

@login_required
def profile_page(request):
    """Страница профиля пользователя"""
    try:
        profile = request.user.profile
    except UserProfile.DoesNotExist:
        # Если профиля нет, создаем его
        profile = UserProfile.objects.create(user=request.user)
    
    registration_date = profile.get_registration_date_formatted()
    achievements = request.user.user_achievements.select_related("achievement").all()
    
    # Получаем отображаемые достижения
    displayed = profile.displayed_achievements.all() if hasattr(profile, "displayed_achievements") else []
    
    # Проверяем, Google ли пользователь
    google_user = is_google_user(request.user)
    
    return render(request, "profile.html", {
        "user": request.user,
        "profile": profile,
        "registration_date": registration_date,
        "achievements": achievements,
        "displayed_achievements": displayed,
        "is_google_user": google_user,
    })

@login_required
def edit_profile_page(request):
    """Редактирование профиля"""
    profile = request.user.profile
    
    # Проверяем, Google ли пользователь
    google_user = is_google_user(request.user)
    
    if request.method == "POST":
        form = ProfileEditForm(request.POST, request.FILES, instance=profile)
        
        # Получаем список ID выбранных достижений
        displayed_ids = []
        for key in request.POST:
            if key == "displayed_achievements":
                # Если одно значение
                value = request.POST[key]
                if value.isdigit():
                    displayed_ids.append(int(value))
            elif key.startswith("displayed_achievements["):
                # Если массив значений
                value = request.POST[key]
                if value.isdigit():
                    displayed_ids.append(int(value))
        
        # Также проверяем getlist для поддержки массивов
        displayed_ids += [int(x) for x in request.POST.getlist("displayed_achievements") if str(x).isdigit()]
        
        # Убираем дубликаты и ограничиваем 4 элементами
        displayed_ids = list(set(displayed_ids))[:4]
        
        if form.is_valid():
            # Отладочная информация
            print("=" * 50)
            print("ОБНОВЛЕНИЕ ПРОФИЛЯ")
            print(f"Пользователь: {request.user.username}")
            print(f"Google пользователь: {google_user}")
            print(f"Файл аватара в запросе: {request.FILES.get('avatar')}")
            print(f"Старый аватар: {profile.avatar}")
            was_avatar_empty = not bool(profile.avatar)
            print(f"Был ли аватар пустым: {was_avatar_empty}")
            print(f"Remove avatar value: {request.POST.get('remove_avatar')}")
            print("=" * 50)
            
            # Сохраняем форму
            obj = form.save(commit=False)
            
            # Удаление аватара
            if request.POST.get("remove_avatar") == "true":
                print("УДАЛЕНИЕ АВАТАРА ЗАПРОШЕНО")
                try:
                    obj.delete_avatar()
                except Exception as e:
                    print(f"Ошибка удаления аватара: {e}")
                obj.avatar = None
            
            # Сохраняем профиль
            obj.save()
            print(f"Профиль сохранен. Новый аватар: {obj.avatar}")
            
            # Сохраняем выбранные достижения
            if hasattr(obj, "displayed_achievements"):
                obj.displayed_achievements.set(displayed_ids)
            
            # Награждаем достижением за установку аватара
            if obj.avatar and was_avatar_empty:
                print("=" * 50)
                print("ПРОВЕРКА НАГРАЖДЕНИЯ ЗА АВАТАР")
                print(f"Условие: obj.avatar={obj.avatar}, was_avatar_empty={was_avatar_empty}")
                try:
                    ach = Achievement.objects.filter(code="set_avatar").first()
                    print(f"Найдено достижение: {ach}")
                    
                    if ach:
                        # Проверяем, есть ли уже такое достижение у пользователя
                        existing = UserAchievement.objects.filter(
                            user=request.user, 
                            achievement=ach
                        ).exists()
                        print(f"Достижение уже есть у пользователя: {existing}")
                        
                        if not existing:
                            ua = UserAchievement.objects.create(
                                user=request.user, 
                                achievement=ach
                            )
                            print(f"Достижение создано: {ua}")
                            
                            # Обновляем счетчик достижений
                            new_count = request.user.user_achievements.count()
                            obj.achievements_count = new_count
                            obj.save(update_fields=["achievements_count"])
                            print(f"Счетчик достижений обновлен: {new_count}")
                            
                            # Добавляем сообщение пользователю
                            messages.success(request, f"Получено достижение: {ach.title}!")
                        else:
                            print("Достижение уже было получено ранее")
                    else:
                        print("Достижение 'set_avatar' не найдено в базе данных!")
                except Exception as e:
                    print(f"Ошибка награждения за аватар: {e}")
                print("=" * 50)
            
            messages.success(request, "Профиль успешно сохранён!")
            return redirect("profile")
        else:
            messages.error(request, "Ошибка формы. Проверьте поля.")
    else:
        form = ProfileEditForm(instance=profile)
        displayed_ids = list(profile.displayed_achievements.values_list('id', flat=True))
    
    # Получаем все достижения пользователя
    user_achievements = request.user.user_achievements.select_related('achievement').all()
    
    # Получаем все доступные достижения
    all_achievements = Achievement.objects.all().order_by('id')
    
    return render(request, "edit-profile.html", {
        "user": request.user,
        "profile": profile,
        "form": form,
        "user_achievements": user_achievements,
        "all_achievements": all_achievements,
        "displayed_achievement_ids": displayed_ids,
        "is_google_user": google_user,
    })

def entertainment_page(request):
    """Страница развлечений"""
    return render(request, "entertainment.html")

def education_page(request):
    """Страница обучения"""
    return render(request, "education.html")

def rating_page(request):
    """Страница рейтинга"""
    from django.db.models import Count, Q
    from .models import UserProfile
    
    # Получаем топ пользователей по очкам
    top_users = UserProfile.objects.select_related('user').order_by('-points', 'id')[:50]
    
    # Обновляем рейтинг всех пользователей (на случай если он устарел)
    UserProfile.update_all_ranks()
    
    # Получаем позицию текущего пользователя
    user_rank = None
    user_position = None
    if request.user.is_authenticated:
        try:
            user_profile = request.user.profile
            user_rank = user_profile.rank
            # Находим позицию в списке
            for idx, profile in enumerate(top_users, start=1):
                if profile.user == request.user:
                    user_position = idx
                    break
        except UserProfile.DoesNotExist:
            pass
    
    # Статистика сообщества
    total_users = User.objects.count()
    total_games = sum(profile.games_played for profile in UserProfile.objects.all())
    total_courses = sum(profile.courses_completed for profile in UserProfile.objects.all())
    total_achievements = sum(profile.achievements_count for profile in UserProfile.objects.all())
    
    context = {
        'top_users': top_users,
        'user_rank': user_rank,
        'user_position': user_position,
        'total_users': total_users,
        'total_games': total_games,
        'total_courses': total_courses,
        'total_achievements': total_achievements,
    }
    
    return render(request, "rating.html", context)

def community_page(request):
    """Страница сообщества"""
    return render(request, "community.html")

def quizzes_page(request):
    """Страница викторин"""
    return render(request, "quizzes.html")

def minigames_page(request):
    """Страница мини-игр"""
    return render(request, "minigames.html")

def school_subjects_page(request):
    """Страница школьных предметов"""
    return render(request, "subjects.html")

def future_skills_page(request):
    """Страница будущих навыков"""
    return render(request, "future-skills.html")

def anime_page(request):
    """Страница аниме"""
    return render(request, "anime.html")

@login_required
def settings_page(request):
    """Страница настроек"""
    # Получаем настройки пользователя
    try:
        user_settings = request.user.settings
    except Exception:
        # Если настроек нет, создаем их
        user_settings = UserSettings.objects.create(user=request.user)
    
    # Проверяем, Google ли пользователь
    google_user = is_google_user(request.user)
    
    return render(request, "settings.html", {
        "user_settings": user_settings,
        "user": request.user,
        "is_google_user": google_user,
    })

@login_required
@require_POST
def api_update_settings(request: HttpRequest):
    """API для обновления настроек"""
    logger.info(f"🔄 Запрос обновления настроек от пользователя: {request.user.username}")
    
    try:
        data = json.loads(request.body.decode("utf-8"))
        logger.debug(f"📦 Данные настроек: {data}")
    except json.JSONDecodeError as e:
        logger.error(f"❌ Ошибка JSON при обновлении настроек: {e}")
        return JsonResponse({"ok": False, "error": "Некорректный JSON"}, status=400)
    
    try:
        s = request.user.settings
        s.public_profile = bool(data.get("public_profile", s.public_profile))
        s.show_statistics = bool(data.get("show_statistics", s.show_statistics))
        s.dark_theme = bool(data.get("dark_theme", s.dark_theme))
        s.save(update_fields=["public_profile", "show_statistics", "dark_theme", "updated_at"])
        
        logger.info(f"✅ Настройки успешно обновлены для {request.user.username}")
        return JsonResponse({"ok": True})
    except Exception as e:
        logger.error(f"❌ Ошибка при обновлении настроек для {request.user.username}: {e}")
        return JsonResponse({"ok": False, "error": str(e)}, status=500)

@login_required
@require_POST
def api_change_password(request: HttpRequest):
    """API для смены пароля"""
    logger.info(f"🔑 Запрос на смену пароля от пользователя: {request.user.username}")
    
    # Проверяем, является ли пользователь Google пользователем
    if is_google_user(request.user):
        logger.warning(f"⚠️ Пользователь {request.user.username} пытается сменить пароль Google аккаунта")
        return JsonResponse({
            "ok": False, 
            "error": "Google пользователи не могут менять пароль через эту форму. Используйте настройки Google аккаунта."
        }, status=400)
    
    try:
        data = json.loads(request.body.decode("utf-8"))
        logger.debug(f"📦 Данные для смены пароля: {list(data.keys())}")
    except json.JSONDecodeError as e:
        logger.error(f"❌ Ошибка JSON при смене пароля: {e}")
        return JsonResponse({"ok": False, "error": "Некорректный JSON"}, status=400)
    
    current_password = data.get("current_password", "")
    new_password = data.get("new_password", "")
    confirm_password = data.get("confirm_password", "")

    # Проверяем текущий пароль
    if not request.user.check_password(current_password):
        logger.warning(f"❌ Неверный текущий пароль для {request.user.username}")
        return JsonResponse({"ok": False, "error": "Текущий пароль неверный"}, status=400)

    # Проверяем совпадение новых паролей
    if new_password != confirm_password:
        logger.warning(f"❌ Новые пароли не совпадают для {request.user.username}")
        return JsonResponse({"ok": False, "error": "Новые пароли не совпадают"}, status=400)

    # Валидируем новый пароль
    try:
        validate_password(new_password, user=request.user)
    except ValidationError as e:
        logger.warning(f"❌ Валидация пароля не пройдена для {request.user.username}: {e.messages}")
        return JsonResponse({"ok": False, "error": " ".join(e.messages)}, status=400)

    # Меняем пароль
    try:
        request.user.set_password(new_password)
        request.user.save()
        update_session_auth_hash(request, request.user)
        logger.info(f"✅ Пароль успешно изменен для {request.user.username}")
        return JsonResponse({"ok": True})
    except Exception as e:
        logger.error(f"❌ Ошибка при смене пароля для {request.user.username}: {e}")
        return JsonResponse({"ok": False, "error": str(e)}, status=500)

@login_required
@require_POST
def api_twofactor(request: HttpRequest):
    """API для двухфакторной аутентификации"""
    try:
        data = json.loads(request.body.decode("utf-8"))
    except json.JSONDecodeError as e:
        logger.error(f"❌ Ошибка JSON при настройке 2FA: {e}")
        return JsonResponse({"ok": False, "error": "Некорректный JSON"}, status=400)
    
    code = str(data.get("code", "")).strip()

    if not (code.isdigit() and len(code) == 6):
        return JsonResponse({"ok": False, "error": "Код должен состоять из 6 цифр"}, status=400)

    try:
        s = request.user.settings
        s.set_two_factor_code(code)
        s.save(update_fields=["two_factor_enabled", "two_factor_code_hash", "updated_at"])
        return JsonResponse({"ok": True})
    except Exception as e:
        logger.error(f"❌ Ошибка при настройке 2FA для {request.user.username}: {e}")
        return JsonResponse({"ok": False, "error": str(e)}, status=500)

@login_required
@require_POST
def api_delete_account(request: HttpRequest):
    """API для удаления аккаунта"""
    logger.info(f"🗑️ Запрос на удаление аккаунта от пользователя: {request.user.username}")
    
    try:
        user = request.user
        username = user.username
        
        # Выходим из системы
        logout(request)
        
        # Удаляем пользователя
        user.delete()
        
        logger.info(f"✅ Аккаунт {username} успешно удален")
        return JsonResponse({"ok": True})
    except Exception as e:
        logger.error(f"❌ Ошибка при удалении аккаунта {request.user.username}: {e}")
        return JsonResponse({"ok": False, "error": str(e)}, status=500)

@login_required
def check_user_type(request):
    """Отладочная функция для проверки типа пользователя"""
    user = request.user
    google_user = is_google_user(user)
    
    response_data = {
        "username": user.username,
        "email": user.email,
        "is_google_user": google_user,
        "has_password": user.has_usable_password(),
        "is_authenticated": user.is_authenticated,
        "user_id": user.id,
        "date_joined": user.date_joined.isoformat() if user.date_joined else None,
        "is_active": user.is_active,
        "is_staff": user.is_staff,
        "is_superuser": user.is_superuser,
    }
    
    logger.info(f"👤 Проверка типа пользователя для {user.username}: Google={google_user}")
    
    return JsonResponse(response_data)

@login_required
def debug_achievements(request):
    """Отладочная страница для проверки достижений"""
    from .models import Achievement, UserAchievement
    
    # Проверяем все достижения
    all_achievements = Achievement.objects.all()
    user_achievements = request.user.user_achievements.all()
    
    # Проверяем достижение set_avatar
    set_avatar_achievement = Achievement.objects.filter(code="set_avatar").first()
    has_set_avatar = False
    if set_avatar_achievement:
        has_set_avatar = UserAchievement.objects.filter(
            user=request.user, 
            achievement=set_avatar_achievement
        ).exists()
    
    # Создаем достижение если его нет
    if not set_avatar_achievement:
        set_avatar_achievement = Achievement.objects.create(
            code="set_avatar",
            title="Первый аватар",
            description="Вы установили аватар в профиле",
            points=10,
            achievement_type="bronze"
        )
    
    # Если есть аватар, но нет достижения - выдаем принудительно
    if request.user.profile.avatar and not has_set_avatar and set_avatar_achievement:
        UserAchievement.objects.create(
            user=request.user, 
            achievement=set_avatar_achievement
        )
        return JsonResponse({
            "message": "Достижение 'set_avatar' выдано принудительно",
            "has_avatar": True,
            "had_achievement": False,
            "now_has": True
        })
    
    return JsonResponse({
        "all_achievements": [{"code": a.code, "title": a.title} for a in all_achievements],
        "user_achievements": [{"code": ua.achievement.code, "title": ua.achievement.title} for ua in user_achievements],
        "has_set_avatar_achievement": has_set_avatar,
        "user_has_avatar": bool(request.user.profile.avatar),
        "profile_exists": bool(request.user.profile)
    })

@login_required
def debug_create_achievements(request):
    """Создание всех необходимых достижений"""
    from .models import Achievement
    
    achievements_data = [
        {
            'code': 'registered',
            'title': 'Добро пожаловать!',
            'description': 'Вы зарегистрировались в Kirava',
            'points': 10,
            'achievement_type': 'bronze'
        },
        {
            'code': 'set_avatar',
            'title': 'Первый аватар',
            'description': 'Вы установили аватар в профиле',
            'points': 10,
            'achievement_type': 'bronze'
        },
        {
            'code': 'first_quiz',
            'title': 'Первая викторина',
            'description': 'Вы прошли первую викторину',
            'points': 20,
            'achievement_type': 'silver'
        },
        {
            'code': 'quiz_master',
            'title': 'Мастер викторин',
            'description': 'Вы прошли 10 викторин',
            'points': 50,
            'achievement_type': 'gold'
        },
        {
            'code': 'game_master',
            'title': 'Мастер игр',
            'description': 'Вы сыграли в 5 мини-игр',
            'points': 30,
            'achievement_type': 'silver'
        },
        {
            'code': 'course_completed',
            'title': 'Ученик',
            'description': 'Вы завершили первый курс',
            'points': 40,
            'achievement_type': 'silver'
        },
        {
            'code': 'level_5',
            'title': 'Опытный пользователь',
            'description': 'Вы достигли 5 уровня',
            'points': 100,
            'achievement_type': 'gold'
        },
        {
            'code': 'top_100',
            'title': 'Лучший из лучших',
            'description': 'Вы вошли в топ-100 рейтинга',
            'points': 200,
            'achievement_type': 'platinum'
        },
        # Google достижения
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
    
    created = []
    for data in achievements_data:
        obj, was_created = Achievement.objects.get_or_create(
            code=data['code'],
            defaults=data
        )
        created.append({
            'code': data['code'],
            'created': was_created,
            'title': obj.title
        })
    
    return JsonResponse({
        "message": "Достижения проверены/созданы",
        "achievements": created
    })

def google_auth_error(request):
    """Обработка ошибок Google аутентификации"""
    messages.error(request, "Произошла ошибка при входе через Google. Пожалуйста, попробуйте еще раз.")
    return redirect('login')

def google_auth_callback(request):
    """Callback для Google OAuth"""
    # Эта функция вызывается после успешной аутентификации через Google
    # Основная логика обрабатывается в pipeline
    return redirect('profile')