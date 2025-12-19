# groups/models.py
from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now
from django.utils.translation import gettext_lazy as _
import os


def group_avatar_path(instance, filename):
    """Генерирует путь для сохранения аватара группы"""
    ext = filename.split('.')[-1]
    new_filename = f'avatar_{int(now().timestamp())}.{ext}'
    return f'groups/group_{instance.id}/{new_filename}'


def message_image_path(instance, filename):
    """Генерирует путь для сохранения изображений сообщений"""
    ext = filename.split('.')[-1]
    new_filename = f'msg_{int(now().timestamp())}.{ext}'
    return f'group_messages/group_{instance.group.id}/{new_filename}'


class Group(models.Model):
    """Модель группы - все группы публичные"""
    
    name = models.CharField(
        max_length=100,
        verbose_name=_("Название группы")
    )
    
    description = models.CharField(
        max_length=150,
        verbose_name=_("Описание группы")
    )
    
    avatar = models.ImageField(
        upload_to=group_avatar_path,
        null=True,
        blank=True,
        verbose_name=_("Аватар группы"),
        help_text=_("Загрузите аватар для группы")
    )
    
    creator = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='created_groups',
        verbose_name=_("Создатель")
    )
    
    members = models.ManyToManyField(
        User,
        through='GroupMembership',
        related_name='joined_groups',
        verbose_name=_("Участники")
    )
    
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name=_("Дата создания")
    )
    
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name=_("Дата обновления")
    )
    
    class Meta:
        verbose_name = _("Группа")
        verbose_name_plural = _("Группы")
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['-created_at']),
        ]
    
    def __str__(self):
        return f"{self.name} ({self.get_members_count()})"
    
    def get_members_count(self):
        """Возвращает количество участников"""
        return self.members.count()
    
    def get_messages_count(self):
        """Возвращает количество сообщений в группе"""
        return self.messages.count()
    
    def is_member(self, user):
        """Проверяет, является ли пользователь участником группы"""
        if not user.is_authenticated:
            return False
        return self.members.filter(id=user.id).exists()
    
    def is_creator(self, user):
        """Проверяет, является ли пользователь создателем группы"""
        if not user.is_authenticated:
            return False
        return self.creator == user
    
    def delete_avatar(self):
        """Удаляет файл аватара"""
        if self.avatar:
            try:
                if os.path.isfile(self.avatar.path):
                    os.remove(self.avatar.path)
            except Exception as e:
                print(f"Ошибка при удалении файла аватара группы: {e}")
            
            try:
                self.avatar.delete(save=False)
            except Exception as e:
                print(f"Ошибка при удалении аватара из модели: {e}")
    
    def get_avatar_url(self):
        """Получить URL аватара"""
        if self.avatar:
            return self.avatar.url
        return None


class GroupMembership(models.Model):
    """Связь пользователя и группы"""
    ROLE_CHOICES = (
        ('member', _('Участник')),
        ('moderator', _('Модератор')),
        ('admin', _('Администратор')),
    )
    
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='group_memberships',
        verbose_name=_("Пользователь")
    )
    
    group = models.ForeignKey(
        Group,
        on_delete=models.CASCADE,
        related_name='group_memberships',
        verbose_name=_("Группа")
    )
    
    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default='member',
        verbose_name=_("Роль")
    )
    
    joined_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name=_("Дата вступления")
    )
    
    class Meta:
        unique_together = ('user', 'group')
        verbose_name = _("Участник группы")
        verbose_name_plural = _("Участники групп")
        indexes = [
            models.Index(fields=['group', 'role']),
        ]
    
    def __str__(self):
        return f"{self.user.username} - {self.group.name}"


class GroupMessage(models.Model):
    """Сообщение в групповом чате"""
    group = models.ForeignKey(
        Group,
        on_delete=models.CASCADE,
        related_name='messages',
        verbose_name=_("Группа")
    )
    
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='group_messages',
        verbose_name=_("Автор")
    )
    
    content = models.TextField(
        verbose_name=_("Текст сообщения"),
        blank=True
    )
    
    image = models.ImageField(
        upload_to=message_image_path,
        null=True,
        blank=True,
        verbose_name=_("Изображение")
    )
    
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name=_("Дата отправки")
    )
    
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name=_("Дата обновления")
    )
    
    class Meta:
        verbose_name = _("Сообщение группы")
        verbose_name_plural = _("Сообщения групп")
        ordering = ['created_at']
        indexes = [
            models.Index(fields=['group', '-created_at']),
        ]
    
    def __str__(self):
        return f"{self.user.username}: {self.content[:50]}"
    
    def has_image(self):
        """Проверяет, содержит ли сообщение изображение"""
        return bool(self.image)