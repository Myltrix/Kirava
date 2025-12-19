# users/urls.py
from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
    # Главная страница
    path("", views.home, name="home"),
    
    # Аутентификация
    path("register/", views.register_view, name="register"),
    path("login/", views.login_view, name="login"),
    path("logout/", views.logout_view, name="logout"),
    path("google-login/", views.google_login, name="google_login"),
    
    # Восстановление пароля (дополнительно)
    path('password-reset/', 
         auth_views.PasswordResetView.as_view(
             template_name='users/password_reset.html'
         ), 
         name='password_reset'),
    path('password-reset/done/', 
         auth_views.PasswordResetDoneView.as_view(
             template_name='users/password_reset_done.html'
         ), 
         name='password_reset_done'),
    path('password-reset-confirm/<uidb64>/<token>/', 
         auth_views.PasswordResetConfirmView.as_view(
             template_name='users/password_reset_confirm.html'
         ), 
         name='password_reset_confirm'),
    path('password-reset-complete/', 
         auth_views.PasswordResetCompleteView.as_view(
             template_name='users/password_reset_complete.html'
         ), 
         name='password_reset_complete'),
    
    # Профиль
    path("profile/", views.profile_page, name="profile"),
    path("edit-profile/", views.edit_profile_page, name="edit_profile"),
    path("settings/", views.settings_page, name="settings"),
    
    # Основные разделы
    path("entertainment/", views.entertainment_page, name="entertainment"),
    path("education/", views.education_page, name="education"),
    path("rating/", views.rating_page, name="rating"),
    path("community/", views.community_page, name="community"),
    
    # Дополнительные страницы
    path("anime/", views.anime_page, name="anime"),
    path("minigames/", views.minigames_page, name="minigames"),
    path("quizzes/", views.quizzes_page, name="quizzes"),
    path("school-subjects/", views.school_subjects_page, name="school_subjects"),
    path("future-skills/", views.future_skills_page, name="future_skills"),
    
    # API endpoints
    path("api/settings/update/", views.api_update_settings, name="api_update_settings"),
    path("api/settings/change-password/", views.api_change_password, name="api_change_password"),
    path("api/settings/twofactor/", views.api_twofactor, name="api_twofactor"),
    path("api/settings/delete-account/", views.api_delete_account, name="api_delete_account"),
    
    # Отладочные пути
    path("debug/achievements/", views.debug_achievements, name="debug_achievements"),
    path("debug/create-achievements/", views.debug_create_achievements, name="debug_create_achievements"),
    path("check-user-type/", views.check_user_type, name="check_user_type"),
    
    # Google OAuth обработчики
    path("google-auth-error/", views.google_auth_error, name="google_auth_error"),
    path("google-auth-callback/", views.google_auth_callback, name="google_auth_callback"),
]