# anime/admin.py
from django.contrib import admin
from .models import (
    Anime, AnimeCharacter, AnimeComment,
    AnimeUserProfile, Quiz, QuizQuestion, QuizAnswer,
    QuizResult, QuizComment
)

@admin.register(Anime)
class AnimeAdmin(admin.ModelAdmin):
    list_display = ('title', 'year', 'rating', 'episodes', 'created_at')
    list_filter = ('year', 'genres', 'rating')
    search_fields = ('title', 'description', 'author')
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ('created_at',)
    fieldsets = (
        ('Основная информация', {
            'fields': ('title', 'slug', 'description', 'year', 'episodes', 'video_duration', 'rating')
        }),
        ('Ссылки', {
            'fields': ('youtube_url', 'poster_url')
        }),
        ('Дополнительно', {
            'fields': ('genres', 'author', 'studio')
        }),
    )

@admin.register(AnimeCharacter)
class AnimeCharacterAdmin(admin.ModelAdmin):
    list_display = ('name', 'anime', 'role')
    list_filter = ('anime', 'role')
    search_fields = ('name', 'description')
    raw_id_fields = ('anime',)

@admin.register(AnimeUserProfile)
class AnimeUserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'total_points', 'anime_level', 'quiz_points', 'anime_points', 'created_at')
    list_filter = ('anime_level', 'created_at')
    search_fields = ('user__username', 'user__email')
    readonly_fields = ('total_points', 'anime_level', 'experience', 'created_at', 'updated_at')
    filter_horizontal = ('favorite_anime',)
    fieldsets = (
        ('Пользователь', {
            'fields': ('user',)
        }),
        ('Статистика', {
            'fields': ('anime_points', 'quiz_points', 'total_points', 'anime_level', 'experience')
        }),
        ('Любимые аниме', {
            'fields': ('favorite_anime',)
        }),
        ('Достижения', {
            'fields': ('achievements',)
        }),
        ('Даты', {
            'fields': ('created_at', 'updated_at')
        }),
    )

@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_display = ('title', 'anime', 'difficulty', 'total_questions', 'time_limit', 'created_at')
    list_filter = ('difficulty', 'created_at', 'anime')
    search_fields = ('title', 'description', 'anime__title')
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ('created_at', 'updated_at')
    raw_id_fields = ('anime',)
    fieldsets = (
        ('Основная информация', {
            'fields': ('anime', 'title', 'slug', 'description')
        }),
        ('Настройки', {
            'fields': ('difficulty', 'time_limit', 'total_questions')
        }),
        ('Даты', {
            'fields': ('created_at', 'updated_at')
        }),
    )

@admin.register(QuizQuestion)
class QuizQuestionAdmin(admin.ModelAdmin):
    list_display = ('text', 'quiz', 'order', 'has_image')
    list_filter = ('quiz',)
    search_fields = ('text', 'explanation')
    raw_id_fields = ('quiz',)
    
    def has_image(self, obj):
        return bool(obj.image_url)
    has_image.boolean = True
    has_image.short_description = 'Есть изображение'

@admin.register(QuizAnswer)
class QuizAnswerAdmin(admin.ModelAdmin):
    list_display = ('text', 'question', 'is_correct')
    list_filter = ('is_correct', 'question__quiz')
    search_fields = ('text',)
    raw_id_fields = ('question',)
    list_editable = ('is_correct',)

@admin.register(QuizResult)
class QuizResultAdmin(admin.ModelAdmin):
    list_display = ('user', 'quiz', 'score', 'total_questions', 'percentage', 'points_earned', 'completed_at')
    list_filter = ('quiz', 'completed_at', 'percentage')
    search_fields = ('user__username', 'quiz__title')
    readonly_fields = ('completed_at',)
    raw_id_fields = ('user', 'quiz')
    fieldsets = (
        ('Пользователь и викторина', {
            'fields': ('user', 'quiz')
        }),
        ('Результаты', {
            'fields': ('score', 'total_questions', 'percentage', 'time_spent', 'points_earned')
        }),
        ('Дата', {
            'fields': ('completed_at',)
        }),
    )

@admin.register(AnimeComment)
class AnimeCommentAdmin(admin.ModelAdmin):
    list_display = ('user', 'anime', 'created_at', 'short_text')
    list_filter = ('created_at', 'anime')
    search_fields = ('text', 'user__username', 'anime__title')
    readonly_fields = ('created_at',)
    raw_id_fields = ('user', 'anime')
    
    def short_text(self, obj):
        return obj.text[:50] + '...' if len(obj.text) > 50 else obj.text
    short_text.short_description = 'Текст'

@admin.register(QuizComment)
class QuizCommentAdmin(admin.ModelAdmin):
    list_display = ('user', 'quiz', 'created_at', 'short_text')
    list_filter = ('created_at', 'quiz')
    search_fields = ('text', 'user__username', 'quiz__title')
    readonly_fields = ('created_at',)
    raw_id_fields = ('user', 'quiz')
    
    def short_text(self, obj):
        return obj.text[:50] + '...' if len(obj.text) > 50 else obj.text
    short_text.short_description = 'Текст'

# Настройки админ-панели
admin.site.site_header = 'Kirava - Администрирование аниме и викторин'
admin.site.site_title = 'Kirava Admin'
admin.site.index_title = 'Панель управления'