# users/apps.py
from django.apps import AppConfig
import logging

logger = logging.getLogger(__name__)

class UsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'users'
    verbose_name = 'Пользователи'

    def ready(self):
        """Инициализация приложения"""
        # Импортируем сигналы
        try:
            import users.signals
            logger.info("✅ Сигналы пользователей загружены")
        except ImportError as e:
            logger.error(f"❌ Ошибка загрузки сигналов: {e}")
        
        # Создаем базовые достижения при запуске
        self.create_default_achievements()
    
    def create_default_achievements(self):
        """Создает базовые достижения при запуске приложения"""
        from django.db.models.signals import post_migrate
        from django.dispatch import receiver
        
        @receiver(post_migrate)
        def create_initial_achievements(sender, **kwargs):
            if sender.name == self.name:
                from .models import Achievement
                
                default_achievements = [
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
                
                created_count = 0
                for achievement_data in default_achievements:
                    obj, created = Achievement.objects.get_or_create(
                        code=achievement_data['code'],
                        defaults=achievement_data
                    )
                    if created:
                        created_count += 1
                
                logger.info(f"✅ Создано {created_count} базовых достижений")