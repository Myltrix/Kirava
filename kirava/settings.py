"""
Настройки Django проекта Kirava.
"""

import os
import sys
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Добавляем apps в путь Python
sys.path.append(str(BASE_DIR / 'apps'))

# Загружаем переменные окружения из .env файла
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    print("⚠️  python-dotenv не установлен. Установите: pip install python-dotenv")

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv('SECRET_KEY', 'django-insecure-kirava-secret-key-2024')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.getenv('DEBUG', 'True').lower() == 'true'

ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', 'localhost,127.0.0.1').split(',')

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.humanize',
    
    'social_django',
    
    'users',
    'groups',
    'anime',
    'subjects',
    'game_app',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    
    # Social Auth middleware
    'social_django.middleware.SocialAuthExceptionMiddleware',
    
    # Пользовательские middleware
    'users.middleware.GeoIPProfileMiddleware',
    'users.middleware.ProfileCompletionMiddleware',
    'users.middleware.ThemeMiddleware',
]

ROOT_URLCONF = 'kirava.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            BASE_DIR / 'templates',
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                
                # Social Auth context processors
                'social_django.context_processors.backends',
                'social_django.context_processors.login_redirect',
                
                # Пользовательские context processors
                'users.context_processors.user_profile_processor',
                'users.context_processors.theme_processor',
                'users.context_processors.kirava_settings_processor',
                'users.context_processors.notifications_processor',
            ],
        },
    },
]

WSGI_APPLICATION = 'kirava.wsgi.application'

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        'OPTIONS': {
            'min_length': 8,
        }
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
LANGUAGE_CODE = 'ru-ru'
TIME_ZONE = 'Asia/Almaty'
USE_I18N = True
USE_L10N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATICFILES_DIRS = [
    BASE_DIR / 'static',
]
STATIC_ROOT = BASE_DIR / 'staticfiles'

# Media files
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Настройки аутентификации
LOGIN_URL = '/login/'
LOGIN_REDIRECT_URL = '/profile/'
LOGOUT_REDIRECT_URL = '/'
AUTHENTICATION_BACKENDS = [
    'social_core.backends.google.GoogleOAuth2',
    'django.contrib.auth.backends.ModelBackend',
]

# Google OAuth настройки
SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = ''
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = ''

SOCIAL_AUTH_GOOGLE_OAUTH2_SCOPE = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'openid'
]

# URL для редиректа
SOCIAL_AUTH_LOGIN_REDIRECT_URL = '/profile/'
SOCIAL_AUTH_NEW_USER_REDIRECT_URL = '/profile/'
SOCIAL_AUTH_LOGIN_ERROR_URL = '/login/'
SOCIAL_AUTH_BACKEND_ERROR_URL = '/login/'

# Настройки pipeline для Google OAuth
SOCIAL_AUTH_PIPELINE = (
    'social_core.pipeline.social_auth.social_details',
    'social_core.pipeline.social_auth.social_uid',
    'social_core.pipeline.social_auth.auth_allowed',
    'social_core.pipeline.social_auth.social_user',
    'social_core.pipeline.user.get_username',
    'users.pipeline.create_user_via_google',
    'social_core.pipeline.social_auth.associate_user',
    'social_core.pipeline.social_auth.load_extra_data',
    'social_core.pipeline.user.user_details',
    'users.pipeline.save_google_avatar',
    'users.pipeline.create_google_user_profile',
    'users.pipeline.award_google_registration_achievement',
)

# Настройки Social Auth
SOCIAL_AUTH_USERNAME_IS_FULL_EMAIL = False
SOCIAL_AUTH_SLUGIFY_USERNAMES = True
SOCIAL_AUTH_CLEAN_USERNAMES = True
SOCIAL_AUTH_PROTECTED_USER_FIELDS = ['email']
SOCIAL_AUTH_GOOGLE_OAUTH2_USE_UNIQUE_USER_ID = True
SOCIAL_AUTH_GOOGLE_OAUTH2_EXTRA_DATA = ['picture', 'locale']

# Для разработки
SOCIAL_AUTH_REDIRECT_IS_HTTPS = False
SOCIAL_AUTH_URLOPEN_TIMEOUT = 30

# Дополнительные настройки Social Auth
SOCIAL_AUTH_ADMIN_USER_SEARCH_FIELDS = ['username', 'first_name', 'last_name', 'email']
SOCIAL_AUTH_USER_FIELDS = ['username', 'email', 'first_name', 'last_name']

# Настройки сессии
SESSION_COOKIE_AGE = 1209600  # 2 недели
SESSION_SAVE_EVERY_REQUEST = True
SESSION_COOKIE_SECURE = False  # True в продакшене

# ВАЖНО: Настройки CSRF для разработки
CSRF_COOKIE_SECURE = False
CSRF_COOKIE_HTTPONLY = False
CSRF_USE_SESSIONS = False
CSRF_COOKIE_SAMESITE = 'Lax'
CSRF_COOKIE_NAME = 'csrftoken'
CSRF_HEADER_NAME = 'HTTP_X_CSRFTOKEN'
CSRF_TRUSTED_ORIGINS = [
    'http://localhost:8000',
    'http://127.0.0.1:8000',
    'http://0.0.0.0:8000',
]

# Настройки безопасности
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'

# Social Auth security
SOCIAL_AUTH_SANITIZE_REDIRECTS = True
SOCIAL_AUTH_RAISE_EXCEPTIONS = False

# Пользовательские настройки Kirava
KIRAVA_CONFIG = {
    'SITE_NAME': 'Kirava',
    'SITE_DESCRIPTION': 'Образовательно-развлекательная платформа',
    'MAX_AVATAR_SIZE': 5 * 1024 * 1024,
    'SUPPORTED_IMAGE_FORMATS': ['jpg', 'jpeg', 'png', 'gif'],
    'DEFAULT_THEME': 'dark',
    'POINTS_PER_LEVEL': 100,
    'MAX_DISPLAYED_ACHIEVEMENTS': 4,
}

# Настройки аватара
AVATAR_MAX_FILE_SIZE = KIRAVA_CONFIG['MAX_AVATAR_SIZE']
AVATAR_DEFAULT_URL = '/static/images/default-avatar.png'

# Email настройки (для разработки)
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# Логирование
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'INFO',
        },
        'social': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': False,
        },
        'users': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': False,
        },
        'groups': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': False,
        },
    },
}

# Настройки для файлов
FILE_UPLOAD_MAX_MEMORY_SIZE = 10 * 1024 * 1024
DATA_UPLOAD_MAX_MEMORY_SIZE = 10 * 1024 * 1024

# Настройки времени
DATE_FORMAT = 'd.m.Y'
DATETIME_FORMAT = 'd.m.Y H:i'
TIME_FORMAT = 'H:i'

# Настройки для сессий
SESSION_ENGINE = 'django.contrib.sessions.backends.db'
SESSION_COOKIE_NAME = 'kirava_sessionid'
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SAMESITE = 'Lax'

# Настройки для сообщений
MESSAGE_STORAGE = 'django.contrib.messages.storage.session.SessionStorage'

# Настройки для админки
ADMIN_SITE_HEADER = 'Kirava Администрация'
ADMIN_SITE_TITLE = 'Kirava Admin'
ADMIN_INDEX_TITLE = 'Панель управления'

# Настройки для времени жизни пароля
PASSWORD_RESET_TIMEOUT = 86400

print("=" * 60)
print("🚀 НАСТРОЙКИ ПРОЕКТА KIRAVA")
print("=" * 60)
print(f"📱 Режим отладки: {'✅ ВКЛЮЧЕН' if DEBUG else '❌ ВЫКЛЮЧЕН'}")
print(f"🔑 Google OAuth: {'✅ НАСТРОЕН' if SOCIAL_AUTH_GOOGLE_OAUTH2_KEY else '❌ НЕ НАСТРОЕН'}")
print(f"🗄️  База данных: {DATABASES['default']['ENGINE']}")
print(f"⏰ Часовой пояс: {TIME_ZONE}")
print(f"🌐 Язык: {LANGUAGE_CODE}")
print(f"🔒 CSRF Cookie Secure: {'✅ ON' if CSRF_COOKIE_SECURE else '❌ OFF'}")
print(f"🔒 CSRF Trusted Origins: {CSRF_TRUSTED_ORIGINS}")
print("=" * 60)