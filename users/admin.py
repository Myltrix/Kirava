# users/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from django.utils.html import format_html
from .models import UserProfile, UserSettings, Achievement, UserAchievement


class UserProfileInline(admin.StackedInline):
    """Inline для профиля пользователя"""
    model = UserProfile
    can_delete = False
    verbose_name_plural = 'Профиль'
    fields = ('avatar_preview', 'avatar', 'status', 'country', 'bio', 'points', 'level')
    readonly_fields = ('avatar_preview', 'registration_date', 'created_at', 'updated_at')
    
    def avatar_preview(self, obj):
        if obj.avatar:
            return format_html('<img src="{}" style="max-height: 50px; max-width: 50px; border-radius: 50%;" />', obj.avatar.url)
        return "Нет аватара"
    avatar_preview.short_description = "Аватар"


class UserSettingsInline(admin.StackedInline):
    """Inline для настроек пользователя"""
    model = UserSettings
    can_delete = False
    verbose_name_plural = 'Настройки'
    fields = ('public_profile', 'show_statistics', 'dark_theme', 'two_factor_enabled')


class CustomUserAdmin(UserAdmin):
    """Кастомный админ для пользователей"""
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'is_active', 'profile_country', 'profile_level')
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'groups', 'profile__country')
    search_fields = ('username', 'email', 'first_name', 'last_name')
    inlines = [UserProfileInline, UserSettingsInline]
    
    def profile_country(self, obj):
        try:
            return obj.profile.get_country_display()
        except:
            return "Нет профиля"
    profile_country.short_description = "Страна"
    
    def profile_level(self, obj):
        try:
            return obj.profile.level
        except:
            return 0
    profile_level.short_description = "Уровень"


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    """Админка для профилей пользователей"""
    list_display = ('user', 'avatar_preview', 'country_display', 'registration_date', 'level', 'points', 'achievements_count')
    list_filter = ('country', 'registration_date', 'level')
    search_fields = ('user__username', 'user__email', 'country', 'status')
    readonly_fields = ('avatar_preview', 'registration_date', 'ip_address', 'created_at', 'updated_at')
    list_editable = ('level', 'points')
    list_per_page = 25
    fieldsets = (
        ('Основная информация', {
            'fields': ('user', 'avatar', 'avatar_preview', 'status', 'bio')
        }),
        ('Геолокация', {
            'fields': ('country', 'ip_address')
        }),
        ('Статистика', {
            'fields': ('points', 'level', 'rank', 'achievements_count')
        }),
        ('Активность', {
            'fields': ('games_played', 'quizzes_completed', 'courses_completed', 'total_time_played')
        }),
        ('Социальные сети', {
            'fields': ('vk_url', 'telegram_url', 'instagram_url', 'youtube_url')
        }),
        ('Достижения', {
            'fields': ('displayed_achievements',)
        }),
        ('Даты', {
            'fields': ('registration_date', 'created_at', 'updated_at')
        }),
    )
    filter_horizontal = ('displayed_achievements',)
    
    def avatar_preview(self, obj):
        if obj.avatar:
            return format_html('<img src="{}" style="max-height: 100px; max-width: 100px; border-radius: 8px;" />', obj.avatar.url)
        return "Нет аватара"
    avatar_preview.short_description = "Превью аватара"
    
    def country_display(self, obj):
        return obj.get_country_display()
    country_display.short_description = "Страна"


@admin.register(UserSettings)
class UserSettingsAdmin(admin.ModelAdmin):
    """Админка для настроек пользователей"""
    list_display = ("user", "public_profile", "show_statistics", "dark_theme", "two_factor_enabled", "updated_at")
    list_filter = ("public_profile", "show_statistics", "dark_theme", "two_factor_enabled")
    search_fields = ("user__username", "user__email")
    readonly_fields = ("updated_at",)


@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    """Админка для достижений"""
    list_display = ("code", "title", "achievement_type", "points", "created_at")
    list_filter = ("achievement_type", "points")
    search_fields = ("code", "title", "description")
    list_editable = ("points", "achievement_type")
    ordering = ("-points",)


@admin.register(UserAchievement)
class UserAchievementAdmin(admin.ModelAdmin):
    """Админка для достижений пользователей"""
    list_display = ("user", "achievement", "awarded_at")
    list_filter = ("achievement__achievement_type", "awarded_at")
    search_fields = ("user__username", "achievement__code", "achievement__title")
    readonly_fields = ("awarded_at",)
    date_hierarchy = "awarded_at"


# Перерегистрируем UserAdmin
admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)

