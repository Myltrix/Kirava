from django.urls import path
from . import views

app_name = "subjects"

urlpatterns = [
    # API
    path("api/<slug:subject_slug>/<slug:topic_slug>/questions/", 
         views.topic_questions_api, name="topic_questions_api"),
    path("api/<slug:subject_slug>/<slug:topic_slug>/submit/", 
         views.submit_topic_result_api, name="submit_topic_result_api"),
    
    # Страницы
    path("", views.subjects_page, name="subjects_page"),
    path("<slug:subject_slug>/<slug:topic_slug>/", 
         views.topic_detail, name="topic_detail"),
]