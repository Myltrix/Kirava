# anime/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('anime/', views.anime_page, name='anime'),
    path('anime/<slug:anime_slug>/', views.anime_detail, name='anime_detail'),
    path('quizzes/', views.quizzes_page, name='quizzes'),
    path('quiz/<slug:quiz_slug>/', views.quiz_detail, name='quiz_detail'),
    path('quiz/<slug:quiz_slug>/start/', views.start_quiz, name='start_quiz'),
    path('quiz/<slug:quiz_slug>/submit/', views.submit_quiz, name='submit_quiz'),
    path('quiz/results/<int:result_id>/', views.quiz_results, name='quiz_results'),
]