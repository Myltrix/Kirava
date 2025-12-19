# users/templatetags/custom_filters.py
from django import template
import logging

logger = logging.getLogger(__name__)

register = template.Library()

@register.filter
def multiply(value, arg):
    """Умножает value на arg"""
    try:
        result = float(value) * float(arg)
        logger.debug(f"🔢 Умножение: {value} * {arg} = {result}")
        return result
    except (ValueError, TypeError) as e:
        logger.debug(f"⚠️ Ошибка умножения: {e}")
        return 0

@register.filter
def calculate_level_progress(profile):
    """Рассчитывает прогресс уровня"""
    try:
        next_level_points = (profile.level + 1) * 100
        if next_level_points <= 0:
            return 0
        progress = (profile.points / next_level_points) * 100
        result = min(progress, 100)
        logger.debug(f"📊 Прогресс уровня для {profile.user.username}: {result}%")
        return result
    except Exception as e:
        logger.debug(f"⚠️ Ошибка расчета прогресса уровня: {e}")
        return 50

@register.filter
def is_google_user(user):
    """Проверяет, является ли пользователь Google пользователем"""
    try:
        from social_django.models import UserSocialAuth
        is_google = UserSocialAuth.objects.filter(user=user, provider='google-oauth2').exists()
        logger.debug(f"👤 Проверка Google пользователя {user.username}: {is_google}")
        return is_google
    except Exception as e:
        logger.debug(f"⚠️ Ошибка проверки Google пользователя: {e}")
        return False