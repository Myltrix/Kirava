# anime/forms.py
from django import forms
from .models import AnimeComment, QuizComment, AnimeUserProfile

class CommentForm(forms.ModelForm):
    class Meta:
        model = AnimeComment
        fields = ['text']
        widgets = {
            'text': forms.Textarea(attrs={
                'class': 'comment-input',
                'placeholder': 'Напишите ваш комментарий...',
                'rows': 3,
                'style': 'resize: vertical; min-height: 80px;'
            })
        }
        labels = {
            'text': ''
        }

class QuizCommentForm(forms.ModelForm):
    class Meta:
        model = QuizComment
        fields = ['text']
        widgets = {
            'text': forms.Textarea(attrs={
                'class': 'comment-input',
                'placeholder': 'Напишите ваш комментарий о викторине...',
                'rows': 3,
                'style': 'resize: vertical; min-height: 80px;'
            })
        }
        labels = {
            'text': ''
        }

class AnimeProfileForm(forms.ModelForm):
    class Meta:
        model = AnimeUserProfile
        fields = ['favorite_anime']
        widgets = {
            'favorite_anime': forms.SelectMultiple(attrs={
                'class': 'form-control',
                'size': 5
            })
        }