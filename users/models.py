# users/models.py
from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now
from django.contrib.auth.hashers import make_password, check_password
from django.utils.translation import gettext_lazy as _
import os
from PIL import Image


def user_avatar_path(instance, filename):
    """Генерирует путь для сохранения аватара"""
    ext = filename.split('.')[-1]
    new_filename = f'avatar_{int(now().timestamp())}.{ext}'
    return f'avatars/user_{instance.user.id}/{new_filename}'


class Achievement(models.Model):
    """Модель достижения"""
    code = models.SlugField(
        max_length=64, 
        unique=True,
        verbose_name=_("Код")
    )
    title = models.CharField(
        max_length=120,
        verbose_name=_("Название")
    )
    description = models.CharField(
        max_length=255, 
        blank=True, 
        default="",
        verbose_name=_("Описание")
    )
    points = models.IntegerField(
        default=0,
        verbose_name=_("Очки")
    )
    
    # Тип достижения (для категорий)
    TYPE_CHOICES = (
        ('gold', _('Золотое')),
        ('silver', _('Серебряное')),
        ('bronze', _('Бронзовое')),
        ('platinum', _('Платиновое')),
    )
    
    achievement_type = models.CharField(
        max_length=20,
        choices=TYPE_CHOICES,
        default='bronze',
        verbose_name=_("Тип достижения")
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
        verbose_name = _("Достижение")
        verbose_name_plural = _("Достижения")
        ordering = ['-points', 'title']

    def __str__(self):
        return f"{self.code} — {self.title}"


class UserAchievement(models.Model):
    """Связь пользователя и достижения"""
    user = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name="user_achievements",
        verbose_name=_("Пользователь")
    )
    achievement = models.ForeignKey(
        Achievement, 
        on_delete=models.CASCADE, 
        related_name="user_achievements",
        verbose_name=_("Достижение")
    )
    awarded_at = models.DateTimeField(
        default=now,
        verbose_name=_("Дата получения")
    )

    class Meta:
        unique_together = ("user", "achievement")
        ordering = ("-awarded_at",)
        verbose_name = _("Достижение пользователя")
        verbose_name_plural = _("Достижения пользователей")

    def __str__(self):
        return f"{self.user.username}: {self.achievement.code}"


class UserSettings(models.Model):
    """Настройки пользователя"""
    user = models.OneToOneField(
        User, 
        on_delete=models.CASCADE, 
        related_name="settings",
        verbose_name=_("Пользователь")
    )

    public_profile = models.BooleanField(
        default=True,
        verbose_name=_("Публичный профиль")
    )
    show_statistics = models.BooleanField(
        default=True,
        verbose_name=_("Показывать статистику")
    )

    dark_theme = models.BooleanField(
        default=False,
        verbose_name=_("Темная тема")
    )

    two_factor_enabled = models.BooleanField(
        default=False,
        verbose_name=_("Двухфакторная аутентификация")
    )
    two_factor_code_hash = models.CharField(
        max_length=128, 
        blank=True, 
        default="",
        verbose_name=_("Хэш кода 2FA")
    )

    email_notifications = models.BooleanField(
        default=True,
        verbose_name=_("Email уведомления")
    )
    push_notifications = models.BooleanField(
        default=True,
        verbose_name=_("Push уведомления")
    )

    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name=_("Дата обновления")
    )

    class Meta:
        verbose_name = _("Настройка пользователя")
        verbose_name_plural = _("Настройки пользователей")

    def set_two_factor_code(self, raw_code: str):
        """Устанавливает код двухфакторной аутентификации"""
        self.two_factor_code_hash = make_password(raw_code)
        self.two_factor_enabled = True

    def check_two_factor_code(self, raw_code: str) -> bool:
        """Проверяет код двухфакторной аутентификации"""
        if not self.two_factor_code_hash:
            return False
        return check_password(raw_code, self.two_factor_code_hash)

    def disable_two_factor(self):
        """Отключает двухфакторную аутентификацию"""
        self.two_factor_enabled = False
        self.two_factor_code_hash = ""

    def __str__(self):
        return f"Settings({self.user.username})"


class UserProfile(models.Model):
    """Профиль пользователя"""
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='profile',
        verbose_name=_("Пользователь")
    )

    avatar = models.ImageField(
        upload_to=user_avatar_path,
        null=True,
        blank=True,
        verbose_name=_("Аватар профиля"),
        help_text=_("Загрузите изображение для вашего профиля")
    )

    registration_date = models.DateTimeField(
        default=now, 
        verbose_name=_("Дата регистрации")
    )

    # Храним код страны (KZ/RU/US/...)
    country = models.CharField(
        max_length=16,
        blank=True,
        default="",
        verbose_name=_("Страна"),
        help_text=_("Страна определена автоматически по IP или выбрана вручную")
    )

    ip_address = models.GenericIPAddressField(
        blank=True,
        null=True,
        verbose_name=_("IP адрес"),
        help_text=_("IP адрес при регистрации/последнем входе")
    )

    status = models.CharField(
        max_length=200, 
        blank=True, 
        default="", 
        verbose_name=_("Статус/звание")
    )
    
    bio = models.TextField(
        max_length=500, 
        blank=True, 
        default="", 
        verbose_name=_("О себе")
    )

    vk_url = models.URLField(
        blank=True, 
        default="", 
        verbose_name=_("Ссылка на ВКонтакте")
    )
    
    telegram_url = models.URLField(
        blank=True, 
        default="", 
        verbose_name=_("Ссылка на Telegram")
    )
    
    instagram_url = models.URLField(
        blank=True, 
        default="", 
        verbose_name=_("Ссылка на Instagram")
    )
    
    youtube_url = models.URLField(
        blank=True, 
        default="", 
        verbose_name=_("Ссылка на YouTube")
    )

    points = models.IntegerField(
        default=0, 
        verbose_name=_("Очки")
    )
    
    achievements_count = models.IntegerField(
        default=0, 
        verbose_name=_("Количество достижений")
    )
    
    level = models.IntegerField(
        default=1, 
        verbose_name=_("Уровень")
    )
    
    rank = models.IntegerField(
        default=9999, 
        verbose_name=_("Рейтинг в общем зачете")
    )

    games_played = models.IntegerField(
        default=0, 
        verbose_name=_("Сыграно игр")
    )
    
    quizzes_completed = models.IntegerField(
        default=0, 
        verbose_name=_("Пройдено викторин")
    )
    
    courses_completed = models.IntegerField(
        default=0, 
        verbose_name=_("Пройдено курсов")
    )
    
    total_time_played = models.IntegerField(
        default=0, 
        verbose_name=_("Общее время (часы)")
    )

    displayed_achievements = models.ManyToManyField(
        Achievement,
        blank=True,
        related_name="displayed_by_profiles",
        verbose_name=_("Отображаемые достижения"),
        help_text=_("Выберите до 4 достижений для отображения в профиле")
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
        verbose_name = _('Профиль пользователя')
        verbose_name_plural = _('Профили пользователей')
        ordering = ['-points', 'level', 'rank']

    def __str__(self):
        return f'Профиль {self.user.username}'

    def get_registration_date_formatted(self):
        """Возвращает отформатированную дату регистрации"""
        if self.registration_date:
            return self.registration_date.strftime('%d.%m.%Y')
        return ""

    def get_country_display(self):
        """Возвращает отображаемое название страны"""
        COUNTRY_NAMES = {
            "KZ": "Казахстан",
            "RU": "Россия", 
            "BY": "Беларусь",
            "UA": "Украина",
            "US": "США",
            "JP": "Япония",
            "KR": "Корея",
            "CN": "Китай",
            "DE": "Германия",
            "FR": "Франция",
        }
        return COUNTRY_NAMES.get(self.country, self.country or "Не определена")

    def resize_avatar(self):
        """Изменяет размер аватара"""
        if not self.avatar:
            return False
        
        try:
            img = Image.open(self.avatar.path)

            # Конвертируем RGBA в RGB
            if img.mode in ('RGBA', 'LA', 'P'):
                img = img.convert('RGBA')
                background = Image.new('RGB', img.size, (255, 255, 255))
                background.paste(img, mask=img.split()[-1])
                img = background
            elif img.mode != 'RGB':
                img = img.convert('RGB')

            output_size = (400, 400)
            img.thumbnail(output_size, Image.Resampling.LANCZOS)

            # Создаем новое изображение с белым фоном
            new_img = Image.new('RGB', output_size, (255, 255, 255))
            img_width, img_height = img.size
            pos = ((output_size[0] - img_width) // 2, (output_size[1] - img_height) // 2)
            new_img.paste(img, pos)

            # Сохраняем с оптимизацией
            new_img.save(self.avatar.path, 'JPEG', quality=85, optimize=True)
            return True
        except Exception as e:
            print(f"Ошибка при изменении размера аватара: {e}")
            return False

    def delete_avatar(self):
        """Удаляет файл аватара"""
        if self.avatar:
            try:
                if os.path.isfile(self.avatar.path):
                    os.remove(self.avatar.path)
            except Exception as e:
                print(f"Ошибка при удалении файла аватара: {e}")
            
            try:
                self.avatar.delete(save=False)
            except Exception as e:
                print(f"Ошибка при удалении аватара из модели: {e}")

    def save(self, *args, **kwargs):
        """Сохраняет профиль с обработкой аватара"""
        # Удаляем старый файл если новый загружен
        if self.pk:
            try:
                old = UserProfile.objects.get(pk=self.pk)
                if old.avatar and old.avatar != self.avatar:
                    old.delete_avatar()
            except UserProfile.DoesNotExist:
                pass
        
        super().save(*args, **kwargs)
        
        # Изменяем размер аватара после сохранения
        if self.avatar:
            self.resize_avatar()

    def delete(self, *args, **kwargs):
        """Удаляет профиль с удалением аватара"""
        self.delete_avatar()
        super().delete(*args, **kwargs)

    def update_achievements_count(self):
        """Обновляет счетчик достижений"""
        count = self.user.user_achievements.count()
        if self.achievements_count != count:
            self.achievements_count = count
            self.save(update_fields=['achievements_count'])

    def get_displayed_achievements_limit(self):
        """Возвращает ограниченный список отображаемых достижений"""
        return self.displayed_achievements.all()[:4]
    
    def add_points(self, points: int, update_level: bool = True):
        """Добавляет очки пользователю и обновляет уровень"""
        if points <= 0:
            return
        
        self.points += points
        
        # Обновляем уровень (каждые 100 очков = новый уровень)
        if update_level:
            new_level = (self.points // 100) + 1
            if new_level > self.level:
                self.level = new_level
        
        self.save(update_fields=['points', 'level'])
        
        # Обновляем рейтинг после добавления очков
        self.update_rank()
    
    def update_rank(self):
        """Обновляет позицию пользователя в рейтинге на основе очков"""
        # Получаем всех пользователей, отсортированных по очкам
        profiles = UserProfile.objects.exclude(pk=self.pk).order_by('-points', 'id')
        
        rank = 1
        for profile in profiles:
            if profile.points > self.points:
                rank += 1
            elif profile.points == self.points and profile.id < self.id:
                rank += 1
        
        if self.rank != rank:
            self.rank = rank
            self.save(update_fields=['rank'])
    
    @staticmethod
    def update_all_ranks():
        """Обновляет рейтинг всех пользователей"""
        profiles = UserProfile.objects.all().order_by('-points', 'id')
        
        for rank, profile in enumerate(profiles, start=1):
            if profile.rank != rank:
                profile.rank = rank
                profile.save(update_fields=['rank'])
    
