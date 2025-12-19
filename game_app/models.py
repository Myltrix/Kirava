from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
import json

class Anime(models.Model):
    DIFFICULTY_CHOICES = [
        ('easy', 'Легкий'),
        ('medium', 'Средний'),
        ('hard', 'Сложный'),
    ]
    
    title_ru = models.CharField(max_length=200, verbose_name="Название на русском")
    title_en = models.CharField(max_length=200, verbose_name="Название на английском", blank=True)
    image = models.ImageField(upload_to='anime_frames/', verbose_name="Изображение кадра")
    year = models.IntegerField(verbose_name="Год выхода")
    genre = models.CharField(max_length=200, verbose_name="Жанр")
    studio = models.CharField(max_length=100, verbose_name="Студия")
    description = models.TextField(verbose_name="Описание", blank=True)
    hint = models.TextField(verbose_name="Подсказка")
    difficulty = models.CharField(max_length=10, choices=DIFFICULTY_CHOICES, verbose_name="Сложность")
    characters = models.TextField(verbose_name="Персонажи (JSON)", help_text="Формат JSON: [\"Персонаж 1\", \"Персонаж 2\"]")
    rating = models.FloatField(
        validators=[MinValueValidator(0), MaxValueValidator(10)],
        verbose_name="Рейтинг",
        default=0
    )
    is_active = models.BooleanField(default=True, verbose_name="Активно")
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "Аниме"
        verbose_name_plural = "Аниме"
        ordering = ['title_ru']
    
    def __str__(self):
        return self.title_ru
    
    def get_characters_list(self):
        """Получить список персонажей"""
        try:
            return json.loads(self.characters)
        except:
            return []

class GameSession(models.Model):
    session_key = models.CharField(max_length=100, verbose_name="Ключ сессии", unique=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, verbose_name="Пользователь")
    score = models.IntegerField(default=0, verbose_name="Очки")
    current_round = models.IntegerField(default=1, verbose_name="Текущий раунд")
    total_rounds = models.IntegerField(default=10, verbose_name="Всего раундов")
    correct_answers = models.IntegerField(default=0, verbose_name="Правильные ответы")
    hints_used = models.IntegerField(default=0, verbose_name="Использовано подсказок")
    skips_used = models.IntegerField(default=0, verbose_name="Использовано пропусков")
    is_active = models.BooleanField(default=True, verbose_name="Активна")
    is_completed = models.BooleanField(default=False, verbose_name="Завершена")
    start_time = models.DateTimeField(auto_now_add=True, verbose_name="Время начала")
    end_time = models.DateTimeField(null=True, blank=True, verbose_name="Время окончания")
    
    class Meta:
        verbose_name = "Игровая сессия"
        verbose_name_plural = "Игровые сессии"
        ordering = ['-start_time']
    
    def __str__(self):
        return f"Сессия {self.session_key[:8]}... - {self.score} очков"
    
    @property
    def accuracy(self):
        """Точность ответов в процентах"""
        if self.current_round > 1:
            return round((self.correct_answers / (self.current_round - 1)) * 100, 1)
        return 0

class GameRound(models.Model):
    game_session = models.ForeignKey(GameSession, on_delete=models.CASCADE, related_name='rounds', verbose_name="Игровая сессия")
    anime = models.ForeignKey(Anime, on_delete=models.CASCADE, verbose_name="Аниме")
    round_number = models.IntegerField(verbose_name="Номер раунда")
    user_answer = models.CharField(max_length=200, blank=True, null=True, verbose_name="Ответ пользователя")
    is_correct = models.BooleanField(null=True, verbose_name="Правильный ответ")
    points_earned = models.IntegerField(default=0, verbose_name="Заработано очков")
    time_spent = models.IntegerField(default=0, verbose_name="Затраченное время (сек)")
    hint_used = models.BooleanField(default=False, verbose_name="Использована подсказка")
    skipped = models.BooleanField(default=False, verbose_name="Пропущено")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Создан")
    completed_at = models.DateTimeField(null=True, blank=True, verbose_name="Завершен")
    
    class Meta:
        verbose_name = "Раунд игры"
        verbose_name_plural = "Раунды игры"
        ordering = ['round_number']
    
    def __str__(self):
        return f"Раунд {self.round_number} - {self.anime.title_ru}"

class PlayerStatistic(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, verbose_name="Пользователь")
    games_played = models.IntegerField(default=0, verbose_name="Сыграно игр")
    total_score = models.IntegerField(default=0, verbose_name="Общий счет")
    highest_score = models.IntegerField(default=0, verbose_name="Лучший счет")
    total_correct_answers = models.IntegerField(default=0, verbose_name="Всего правильных ответов")
    total_hints_used = models.IntegerField(default=0, verbose_name="Всего использовано подсказок")
    total_skips_used = models.IntegerField(default=0, verbose_name="Всего использовано пропусков")
    average_accuracy = models.FloatField(default=0, verbose_name="Средняя точность")
    last_played = models.DateTimeField(null=True, blank=True, verbose_name="Последняя игра")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Статистика игрока"
        verbose_name_plural = "Статистика игроков"
    
    def __str__(self):
        return f"Статистика {self.user.username}"

class GameSettings(models.Model):
    total_rounds = models.IntegerField(default=10, verbose_name="Количество раундов")
    time_per_round = models.IntegerField(default=45, verbose_name="Время на раунд (сек)")
    base_points = models.IntegerField(default=100, verbose_name="Базовые очки")
    hint_cost = models.IntegerField(default=60, verbose_name="Стоимость подсказки")
    skip_cost = models.IntegerField(default=30, verbose_name="Стоимость пропуска")
    time_bonus_max = models.IntegerField(default=50, verbose_name="Максимальный бонус за время")
    hint_delay = models.IntegerField(default=10, verbose_name="Задержка автоподсказки (сек)")
    
    class Meta:
        verbose_name = "Настройка игры"
        verbose_name_plural = "Настройки игры"
    
    def __str__(self):
        return "Настройки игры"