from django import forms

class TopicCommentForm(forms.Form):
    text = forms.CharField(
        label="Комментарий",
        widget=forms.Textarea(attrs={
            "rows": 3, 
            "placeholder": "Напишите комментарий...",
            "class": "comment-input"
        }),
        max_length=1000,
        required=True
    )