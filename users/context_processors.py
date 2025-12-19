# users/context_processors.py
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

def user_profile_processor(request):
    """Добавляет профиль пользователя в контекст всех шаблонов"""
    context = {}
    
    if request.user.is_authenticated:
        try:
            from .models import UserProfile, UserSettings
            context['user_profile'] = request.user.profile
            context['user_settings'] = request.user.settings
            logger.debug(f"👤 Добавлен профиль в контекст для {request.user.username}")
        except Exception as e:
            # Если профиля или настроек нет
            context['user_profile'] = None
            context['user_settings'] = None
            logger.debug(f"⚠️ Нет профиля/настроек для {request.user.username}: {e}")
    
    return context

def theme_processor(request):
    """Добавляет тему в контекст"""
    context = {}
    
    if request.user.is_authenticated:
        try:
            context['current_theme'] = 'dark' if request.user.settings.dark_theme else 'light'
            logger.debug(f"🎨 Тема для {request.user.username}: {context['current_theme']}")
        except Exception as e:
            context['current_theme'] = 'light'
            logger.debug(f"⚠️ Ошибка определения темы: {e}")
    else:
        context['current_theme'] = 'light'
    
    return context

def kirava_settings_processor(request):
    """Добавляет настройки Kirava в контекст"""
    return {
        'KIRAVA_CONFIG': getattr(settings, 'KIRAVA_CONFIG', {}),
        'DEBUG': settings.DEBUG,
        'AVATAR_MAX_FILE_SIZE': getattr(settings, 'AVATAR_MAX_FILE_SIZE', 5242880),
    }

def notifications_processor(request):
    """Добавляет уведомления в контекст"""
    from django.contrib import messages
    context = {}
    
    # Получаем непрочитанные сообщения
    unread_messages = messages.get_messages(request)
    context['unread_messages'] = list(unread_messages)
    
    # Флаг незаполненного профиля
    if request.user.is_authenticated:
        try:
            profile = request.user.profile
            incomplete = not (profile.avatar and profile.bio and profile.country)
            context['profile_incomplete'] = incomplete
            if incomplete:
                logger.debug(f"⚠️ Профиль {request.user.username} не заполнен полностью")
        except Exception as e:
            context['profile_incomplete'] = False
            logger.debug(f"⚠️ Ошибка проверки заполненности профиля: {e}")
    
    return context