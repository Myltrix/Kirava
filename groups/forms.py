# groups/forms.py
from django import forms
from django.core.exceptions import ValidationError
from .models import Group, GroupMessage


class GroupCreateForm(forms.ModelForm):
    class Meta:
        model = Group
        fields = ['name', 'description', 'avatar']
        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'form-input',
                'placeholder': 'Введите название группы',
                'maxlength': '100',
                'required': True
            }),
            'description': forms.Textarea(attrs={
                'class': 'form-textarea',
                'placeholder': 'Опишите тематику вашей группы...',
                'rows': 4,
                'maxlength': '150',
                'required': True
            }),
        }
    
    def clean_name(self):
        name = self.cleaned_data.get('name')
        if len(name) > 100:
            raise ValidationError('Название группы не должно превышать 100 символов.')
        if not name.strip():
            raise ValidationError('Название группы обязательно.')
        return name.strip()
    
    def clean_description(self):
        description = self.cleaned_data.get('description')
        if len(description) > 150:
            raise ValidationError('Описание группы не должно превышать 150 символов.')
        if not description.strip():
            raise ValidationError('Описание группы обязательно.')
        return description.strip()


class GroupEditForm(forms.ModelForm):
    remove_avatar = forms.BooleanField(required=False, widget=forms.HiddenInput())
    
    class Meta:
        model = Group
        fields = ['name', 'description', 'avatar']
        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'form-input',
                'maxlength': '100',
                'required': True
            }),
            'description': forms.Textarea(attrs={
                'class': 'form-textarea',
                'rows': 4,
                'maxlength': '150',
                'required': True
            }),
        }
    
    def clean_name(self):
        name = self.cleaned_data.get('name')
        if len(name) > 100:
            raise ValidationError('Название группы не должно превышать 100 символов.')
        if not name.strip():
            raise ValidationError('Название группы обязательно.')
        return name.strip()
    
    def clean_description(self):
        description = self.cleaned_data.get('description')
        if len(description) > 150:
            raise ValidationError('Описание группы не должно превышать 150 символов.')
        if not description.strip():
            raise ValidationError('Описание группы обязательно.')
        return description.strip()


class GroupMessageForm(forms.ModelForm):
    class Meta:
        model = GroupMessage
        fields = ['content', 'image']
        widgets = {
            'content': forms.Textarea(attrs={
                'class': 'message-input',
                'placeholder': 'Введите сообщение...',
                'rows': 3
            }),
            'image': forms.FileInput(attrs={
                'class': 'image-input',
                'accept': 'image/*'
            })
        }
    
    def clean(self):
        cleaned_data = super().clean()
        content = cleaned_data.get('content')
        image = cleaned_data.get('image')
        
        if not content and not image:
            raise ValidationError('Сообщение не может быть пустым')
        
        return cleaned_data