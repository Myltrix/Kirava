from django.contrib import admin
from django.utils.html import format_html
from .models import Anime, GameSession, GameRound, PlayerStatistic, GameSettings

@admin.register(Anime)
class AnimeAdmin(admin.ModelAdmin):
    list_display = ('title_ru', 'difficulty', 'year', 'genre', 'studio', 'rating', 'is_active', 'image_preview')
    list_filter = ('difficulty', 'year', 'is_active')
    search_fields = ('title_ru', 'title_en', 'genre', 'studio')
    list_editable = ('is_active', 'rating')
    readonly_fields = ('image_preview', 'created_at')
    
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="max-height: 100px; max-width: 150px;" />', obj.image.url)
        return "Нет изображения"
    image_preview.short_description = "Предпросмотр"

@admin.register(GameSession)
class GameSessionAdmin(admin.ModelAdmin):
    list_display = ('session_key_short', 'user', 'score', 'current_round', 'correct_answers', 'is_active', 'start_time')
    list_filter = ('is_active', 'is_completed', 'start_time')
    search_fields = ('session_key', 'user__username')
    readonly_fields = ('start_time', 'end_time')
    
    def session_key_short(self, obj):
        return obj.session_key[:8] + '...' if obj.session_key else ''
    session_key_short.short_description = 'Сессия'

@admin.register(GameRound)
class GameRoundAdmin(admin.ModelAdmin):
    list_display = ('game_session_short', 'round_number', 'anime', 'is_correct', 'points_earned', 'time_spent')
    list_filter = ('is_correct', 'hint_used', 'skipped')
    search_fields = ('game_session__session_key', 'anime__title_ru', 'user_answer')
    
    def game_session_short(self, obj):
        return obj.game_session.session_key[:8] + '...' if obj.game_session.session_key else ''
    game_session_short.short_description = 'Сессия'

@admin.register(PlayerStatistic)
class PlayerStatisticAdmin(admin.ModelAdmin):
    list_display = ('user', 'games_played', 'total_score', 'highest_score', 'average_accuracy', 'last_played')
    search_fields = ('user__username',)
    readonly_fields = ('created_at', 'updated_at')

@admin.register(GameSettings)
class GameSettingsAdmin(admin.ModelAdmin):
    list_display = ('total_rounds', 'time_per_round', 'base_points', 'hint_cost', 'skip_cost')