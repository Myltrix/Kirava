from django.conf import settings
from django.db import models


class Subject(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=120, unique=True)

    def __str__(self):
        return self.title


class Topic(models.Model):
    DIFFICULTY_CHOICES = [
        ("easy", "Легкий"),
        ("medium", "Средний"),
        ("hard", "Сложный"),
    ]

    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name="topics")
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=140)
    description = models.TextField(blank=True)
    difficulty = models.CharField(max_length=10, choices=DIFFICULTY_CHOICES, default="medium")
    poster_url = models.URLField(blank=True)

    class Meta:
        unique_together = ("subject", "slug")

    def __str__(self):
        return f"{self.subject.title} — {self.title}"


class TopicQuestion(models.Model):
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name="questions")
    text = models.TextField()
    order = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"Q{self.order}: {self.text[:40]}"


class TopicAnswer(models.Model):
    question = models.ForeignKey(TopicQuestion, on_delete=models.CASCADE, related_name="answers")
    text = models.CharField(max_length=300)
    is_correct = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.text


class TopicResult(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="topic_results")
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name="results")
    score = models.PositiveIntegerField(default=0)
    correct = models.PositiveIntegerField(default=0)
    total = models.PositiveIntegerField(default=0)
    percentage = models.FloatField(default=0)
    time_spent = models.PositiveIntegerField(default=0)  # секунды
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
    
    def __str__(self):
        return f"{self.user.username} - {self.topic.title}: {self.percentage}%"


class TopicComment(models.Model):
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name="comments")
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="topic_comments")
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]