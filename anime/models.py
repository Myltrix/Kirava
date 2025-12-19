# anime/models.py
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Anime(models.Model):
    title = models.CharField(max_length=200, verbose_name="Название аниме")
    slug = models.SlugField(max_length=200, unique=True, verbose_name="URL идентификатор")
    description = models.TextField(verbose_name="Описание")
    year = models.IntegerField(verbose_name="Год выхода")
    episodes = models.IntegerField(default=1, verbose_name="Количество серий")
    video_duration = models.IntegerField(default=45, verbose_name="Длительность видео (минуты)")
    rating = models.FloatField(default=0.0, verbose_name="Рейтинг")
    youtube_url = models.URLField(max_length=500, verbose_name="YouTube ссылка")
    poster_url = models.URLField(max_length=500, verbose_name="Ссылка на постер")
    genres = models.CharField(max_length=200, verbose_name="Жанры")
    author = models.CharField(max_length=100, verbose_name="Автор")
    studio = models.CharField(max_length=100, verbose_name="Студия")
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "Аниме"
        verbose_name_plural = "Аниме"
    
    def __str__(self):
        return self.title

class AnimeCharacter(models.Model):
    anime = models.ForeignKey(Anime, on_delete=models.CASCADE, related_name='characters')
    name = models.CharField(max_length=100, verbose_name="Имя персонажа")
    role = models.CharField(max_length=100, verbose_name="Роль")
    description = models.TextField(verbose_name="Описание")
    image_url = models.URLField(max_length=500, verbose_name="Ссылка на изображение")
    
    class Meta:
        verbose_name = "Персонаж"
        verbose_name_plural = "Персонажи"
    
    def __str__(self):
        return f"{self.name} ({self.anime.title})"

class AnimeComment(models.Model):
    anime = models.ForeignKey(Anime, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='anime_comments')
    text = models.TextField(verbose_name="Текст комментария")
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "Комментарий"
        verbose_name_plural = "Комментарии"
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Комментарий от {self.user.username}"

# УДАЛИТЬ ЭТУ МОДЕЛЬ Profile, если уже есть UserProfile в приложении users
# ИЛИ изменить её на другую, если нужна отдельная модель для аниме-профиля

class AnimeUserProfile(models.Model):
    """Модель профиля пользователя для аниме-приложения"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='anime_profile')
    favorite_anime = models.ManyToManyField(Anime, blank=True, verbose_name="Любимые аниме")
    anime_points = models.IntegerField(default=0, verbose_name="Очки за аниме")
    quiz_points = models.IntegerField(default=0, verbose_name="Очки за викторины")
    total_points = models.IntegerField(default=0, verbose_name="Всего очков")
    anime_level = models.IntegerField(default=1, verbose_name="Уровень в аниме")
    experience = models.IntegerField(default=0, verbose_name="Опыт")
    achievements = models.JSONField(default=list, blank=True, verbose_name="Достижения")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Аниме профиль"
        verbose_name_plural = "Аниме профили"
    
    def __str__(self):
        return f"{self.user.username} - {self.total_points} очков"
    
    def add_points(self, points, type='quiz'):
        """Добавить очки и обновить уровень"""
        if type == 'quiz':
            self.quiz_points += points
        elif type == 'anime':
            self.anime_points += points
        
        self.total_points = self.quiz_points + self.anime_points
        self.experience += points
        
        # Каждые 100 очков - новый уровень
        new_level = self.experience // 100 + 1
        if new_level > self.anime_level:
            self.anime_level = new_level
        
        self.save()
        
        return {
            'new_points': self.total_points,
            'new_level': self.anime_level,
            'points_earned': points
        }

class Quiz(models.Model):
    """Модель для викторины"""
    anime = models.ForeignKey(Anime, on_delete=models.CASCADE, related_name='quizzes')
    title = models.CharField(max_length=200, verbose_name="Название викторины")
    slug = models.SlugField(max_length=200, unique=True, verbose_name="URL идентификатор")
    description = models.TextField(verbose_name="Описание викторины")
    difficulty = models.CharField(max_length=20, choices=[
        ('easy', 'Легкий'),
        ('medium', 'Средний'),
        ('hard', 'Сложный')
    ], verbose_name="Сложность")
    time_limit = models.IntegerField(default=15, verbose_name="Лимит времени на вопрос (секунды)")
    total_questions = models.IntegerField(default=10, verbose_name="Количество вопросов")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Викторина"
        verbose_name_plural = "Викторины"
    
    def __str__(self):
        return f"{self.title} ({self.anime.title})"
    
    def get_difficulty_display(self):
        difficulty_map = {
            'easy': 'Легкий',
            'medium': 'Средний',
            'hard': 'Сложный'
        }
        return difficulty_map.get(self.difficulty, 'Средний')

class QuizQuestion(models.Model):
    """Модель для вопроса викторины"""
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='questions')
    text = models.TextField(verbose_name="Текст вопроса")
    image_url = models.URLField(max_length=500, blank=True, null=True, verbose_name="Ссылка на изображение")
    order = models.IntegerField(default=0, verbose_name="Порядок")
    explanation = models.TextField(blank=True, null=True, verbose_name="Объяснение ответа")
    
    class Meta:
        verbose_name = "Вопрос викторины"
        verbose_name_plural = "Вопросы викторины"
        ordering = ['order']
    
    def __str__(self):
        return f"Вопрос {self.order}: {self.text[:50]}..."

class QuizAnswer(models.Model):
    """Модель для ответа на вопрос викторины"""
    question = models.ForeignKey(QuizQuestion, on_delete=models.CASCADE, related_name='answers')
    text = models.CharField(max_length=500, verbose_name="Текст ответа")
    is_correct = models.BooleanField(default=False, verbose_name="Правильный ответ")
    
    class Meta:
        verbose_name = "Ответ викторины"
        verbose_name_plural = "Ответы викторины"
    
    def __str__(self):
        return f"{self.text[:50]}... {'✓' if self.is_correct else '✗'}"

class QuizResult(models.Model):
    """Модель для результатов прохождения викторины"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='quiz_results')
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='results')
    score = models.IntegerField(default=0, verbose_name="Количество правильных ответов")
    total_questions = models.IntegerField(default=0, verbose_name="Всего вопросов")
    percentage = models.FloatField(default=0.0, verbose_name="Процент правильных ответов")
    time_spent = models.IntegerField(default=0, verbose_name="Затраченное время (секунды)")
    points_earned = models.IntegerField(default=0, verbose_name="Заработанные очки")
    completed_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "Результат викторины"
        verbose_name_plural = "Результаты викторин"
        ordering = ['-completed_at']
    
    def __str__(self):
        return f"{self.user.username} - {self.quiz.title}: {self.percentage}%"

class QuizComment(models.Model):
    """Модель для комментариев к викторинам"""
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='quiz_comments')
    text = models.TextField(verbose_name="Текст комментария")
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "Комментарий к викторине"
        verbose_name_plural = "Комментарии к викторинам"
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Комментарий от {self.user.username} к {self.quiz.title}"