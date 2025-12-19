# anime/signals.py
from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from .models import AnimeUserProfile

@receiver(post_save, sender=User)
def create_user_anime_profile(sender, instance, created, **kwargs):
    """Создать аниме-профиль для нового пользователя"""
    if created:
        AnimeUserProfile.objects.create(user=instance)
        print(f"✓ Создан аниме-профиль для пользователя: {instance.username}")

@receiver(post_save, sender=User)
def save_user_anime_profile(sender, instance, **kwargs):
    """Сохранить аниме-профиль пользователя"""
    try:
        instance.anime_profile.save()
    except AnimeUserProfile.DoesNotExist:
        AnimeUserProfile.objects.create(user=instance)
        print(f"✓ Создан аниме-профиль для существующего пользователя: {instance.username}")