from django.contrib import admin
from .models import Subject, Topic, TopicQuestion, TopicAnswer, TopicResult, TopicComment


@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ("title", "slug")
    search_fields = ("title", "slug")
    prepopulated_fields = {"slug": ("title",)}


@admin.register(Topic)
class TopicAdmin(admin.ModelAdmin):
    list_display = ("title", "subject", "slug")
    list_filter = ("subject",)
    search_fields = ("title", "slug")
    prepopulated_fields = {"slug": ("title",)}


@admin.register(TopicQuestion)
class TopicQuestionAdmin(admin.ModelAdmin):
    list_display = ("id", "text", "topic", "order")
    search_fields = ("text",)
    list_filter = ("topic",)


@admin.register(TopicAnswer)
class TopicAnswerAdmin(admin.ModelAdmin):
    list_display = ("id", "text", "question", "is_correct", "order")
    list_filter = ("is_correct", "question")
    search_fields = ("text",)


@admin.register(TopicResult)
class TopicResultAdmin(admin.ModelAdmin):
    list_display = ("user", "topic", "correct", "total", "percentage", "created_at")
    list_filter = ("topic", "user")
    search_fields = ("user__username", "topic__title")


@admin.register(TopicComment)
class TopicCommentAdmin(admin.ModelAdmin):
    list_display = ("user", "topic", "created_at", "text_preview")
    list_filter = ("topic", "user")
    search_fields = ("user__username", "text")

    def text_preview(self, obj):
        return obj.text[:50] + "..." if len(obj.text) > 50 else obj.text
    text_preview.short_description = "Текст"