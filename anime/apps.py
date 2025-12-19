# anime/apps.py
from django.apps import AppConfig

class AnimeConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'anime'
    
    def ready(self):
        # Импортируем сигналы только после загрузки приложения
        try:
            from . import signals  # noqa
        except ImportError as e:
            print(f"⚠️  Не удалось загрузить сигналы: {e}")