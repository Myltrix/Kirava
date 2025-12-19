# users/forms.py
"""
Формы для пользователей.
"""
from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User
from django.core.validators import URLValidator, validate_email
from social_django.models import UserSocialAuth

from .models import UserProfile


class RegisterForm(UserCreationForm):
    email = forms.EmailField(
        required=True,
        widget=forms.EmailInput(attrs={
            'placeholder': 'your@email.com', 
            'class': 'form-input',
            'autocomplete': 'email'
        }),
        help_text='Обязательное поле. Введите действительный email адрес.'
    )

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']
        widgets = {
            'username': forms.TextInput(attrs={
                'placeholder': 'Придумайте логин', 
                'class': 'form-input',
                'autocomplete': 'username'
            }),
        }
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['password1'].widget.attrs.update({
            'placeholder': 'Пароль (мин. 8 символов)', 
            'class': 'form-input',
            'autocomplete': 'new-password'
        })
        self.fields['password2'].widget.attrs.update({
            'placeholder': 'Повторите пароль', 
            'class': 'form-input',
            'autocomplete': 'new-password'
        })
        
        # Убираем стандартные подсказки Django
        self.fields['password1'].help_text = ''
        self.fields['password2'].help_text = ''
        self.fields['username'].help_text = ''
        
    def clean_email(self):
        email = self.cleaned_data.get('email')
        
        # Проверяем валидность email
        try:
            validate_email(email)
        except forms.ValidationError:
            raise forms.ValidationError('Введите корректный email адрес.')
        
        # Проверяем, существует ли пользователь с таким email
        if User.objects.filter(email=email).exists():
            raise forms.ValidationError('Пользователь с таким email уже существует.')
        
        return email
    
    def clean_username(self):
        username = self.cleaned_data.get('username')
        
        # Проверяем, не является ли это email
        if '@' in username:
            raise forms.ValidationError('Имя пользователя не может содержать символ @.')
        
        # Проверяем, не используется ли уже такое имя пользователя
        if User.objects.filter(username=username).exists():
            raise forms.ValidationError('Пользователь с таким именем уже существует.')
        
        return username


class LoginForm(AuthenticationForm):
    username = forms.CharField(
        widget=forms.TextInput(attrs={
            'placeholder': 'Имя пользователя или email', 
            'class': 'form-input',
            'autocomplete': 'username'
        })
    )
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={
            'placeholder': 'Пароль', 
            'class': 'form-input',
            'autocomplete': 'current-password'
        })
    )
    
    def clean(self):
        cleaned_data = super().clean()
        username = cleaned_data.get('username')
        
        if username:
            # Проверяем, является ли это email
            if '@' in username:
                try:
                    user = User.objects.get(email=username)
                    username = user.username
                except User.DoesNotExist:
                    pass
            
            # Проверяем, является ли пользователь Google-пользователем
            try:
                user = User.objects.get(username=username)
                if UserSocialAuth.objects.filter(user=user, provider='google-oauth2').exists():
                    self.add_error(
                        'username',
                        'Этот пользователь зарегистрирован через Google. '
                        'Пожалуйста, используйте вход через Google.'
                    )
            except User.DoesNotExist:
                pass
        
        return cleaned_data


class ProfileEditForm(forms.ModelForm):
    remove_avatar = forms.BooleanField(
        required=False,
        widget=forms.HiddenInput(attrs={'value': 'false'})
    )
    
    displayed_achievements = forms.MultipleChoiceField(
        required=False,
        widget=forms.MultipleHiddenInput(),
        choices=[]
    )

    avatar = forms.ImageField(
        required=False,
        widget=forms.FileInput(attrs={
            'class': 'form-input-file', 
            'accept': 'image/*',
            'id': 'avatar-upload'
        }),
        label='Аватар профиля',
        help_text='Загрузите изображение для вашего профиля. Рекомендуемый размер: 400x400 пикселей.'
    )

    status = forms.CharField(
        required=False,
        max_length=200,
        widget=forms.TextInput(attrs={
            'placeholder': 'Например: Мастер викторин', 
            'class': 'form-input'
        }),
        label='Статус/звание',
        help_text='Краткое описание вашей роли или достижений.'
    )

    country = forms.CharField(
        required=False, 
        widget=forms.HiddenInput()
    )

    bio = forms.CharField(
        required=False,
        max_length=500,
        widget=forms.Textarea(attrs={
            'placeholder': 'Расскажите о себе...', 
            'class': 'form-textarea', 
            'rows': 4
        }),
        label='О себе',
        help_text='Максимум 500 символов.'
    )

    vk_url = forms.URLField(
        required=False, 
        widget=forms.URLInput(attrs={
            'class': 'form-input',
            'placeholder': 'https://vk.com/username'
        }), 
        label='VK'
    )
    
    telegram_url = forms.URLField(
        required=False, 
        widget=forms.URLInput(attrs={
            'class': 'form-input',
            'placeholder': 'https://t.me/username'
        }), 
        label='Telegram'
    )
    
    instagram_url = forms.URLField(
        required=False, 
        widget=forms.URLInput(attrs={
            'class': 'form-input',
            'placeholder': 'https://instagram.com/username'
        }), 
        label='Instagram'
    )
    
    youtube_url = forms.URLField(
        required=False, 
        widget=forms.URLInput(attrs={
            'class': 'form-input',
            'placeholder': 'https://youtube.com/c/username'
        }), 
        label='YouTube'
    )

    class Meta:
        model = UserProfile
        fields = [
            'avatar', 'status', 'country', 'bio', 
            'vk_url', 'telegram_url', 'instagram_url', 'youtube_url'
        ]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Инициализируем choices для достижений
        if self.instance and hasattr(self.instance, 'user'):
            from .models import Achievement
            achievements = Achievement.objects.all().order_by('title')
            self.fields['displayed_achievements'].choices = [
                (ach.id, ach.title) for ach in achievements
            ]

    def clean_bio(self):
        bio = self.cleaned_data.get('bio', '')
        if len(bio) > 500:
            raise forms.ValidationError('Текст "О себе" не должен превышать 500 символов.')
        return bio

    def clean_vk_url(self):
        url = self.cleaned_data.get('vk_url', '').strip()
        if url:
            if not url.startswith(('http://', 'https://')):
                url = 'https://' + url
            
            if 'vk.com/' not in url and 'vkontakte.ru/' not in url:
                raise forms.ValidationError('Введите корректную ссылку на ВКонтакте.')
            
            # Проверяем валидность URL
            try:
                URLValidator()(url)
            except forms.ValidationError:
                raise forms.ValidationError('Введите корректный URL.')
        
        return url

    def clean_telegram_url(self):
        url = self.cleaned_data.get('telegram_url', '').strip()
        if url:
            if not url.startswith(('http://', 'https://')):
                url = 'https://' + url
            
            if 't.me/' not in url and 'telegram.me/' not in url:
                raise forms.ValidationError('Введите корректную ссылку на Telegram.')
            
            try:
                URLValidator()(url)
            except forms.ValidationError:
                raise forms.ValidationError('Введите корректный URL.')
        
        return url

    def clean_instagram_url(self):
        url = self.cleaned_data.get('instagram_url', '').strip()
        if url:
            if not url.startswith(('http://', 'https://')):
                url = 'https://' + url
            
            if 'instagram.com/' not in url:
                raise forms.ValidationError('Введите корректную ссылку на Instagram.')
            
            try:
                URLValidator()(url)
            except forms.ValidationError:
                raise forms.ValidationError('Введите корректный URL.')
        
        return url

    def clean_youtube_url(self):
        url = self.cleaned_data.get('youtube_url', '').strip()
        if url:
            if not url.startswith(('http://', 'https://')):
                url = 'https://' + url
            
            if 'youtube.com/' not in url and 'youtu.be/' not in url:
                raise forms.ValidationError('Введите корректную ссылку на YouTube.')
            
            try:
                URLValidator()(url)
            except forms.ValidationError:
                raise forms.ValidationError('Введите корректный URL.')
        
        return url
    
    def clean_avatar(self):
        avatar = self.cleaned_data.get('avatar')
        
        if avatar:
            # Проверяем размер файла (максимум 5MB)
            max_size = 5 * 1024 * 1024  # 5MB
            if avatar.size > max_size:
                raise forms.ValidationError('Размер файла не должен превышать 5MB.')
            
            # Проверяем тип файла
            valid_extensions = ['.jpg', '.jpeg', '.png', '.gif']
            ext = avatar.name.lower()
            if not any(ext.endswith(extension) for extension in valid_extensions):
                raise forms.ValidationError('Поддерживаются только файлы изображений: JPG, PNG, GIF.')
        
        return avatar