# groups/urls.py
from django.urls import path
from . import views

urlpatterns = [
    # Главная страница сообщества
    path('', views.community, name='community'),
    
    # AJAX создание группы
    path('create/ajax/', views.create_group_ajax, name='create_group_ajax'),
    
    # AJAX получение списка групп (для обновления)
    path('ajax/groups/', views.get_groups_ajax, name='get_groups_ajax'),
    
    # Страница создания группы (не AJAX версия)
    path('create/', views.create_group, name='create_group'),
    
    # Детальная страница группы
    path('<int:group_id>/', views.group_detail, name='group_detail'),
    
    # Управление участием в группе
    path('<int:group_id>/join/', views.join_group, name='join_group'),
    path('<int:group_id>/leave/', views.leave_group, name='leave_group'),
    
    # Сообщения в группе
    path('<int:group_id>/message/send/', views.send_message, name='send_message'),
    path('<int:group_id>/messages/', views.get_messages, name='get_messages'),
    
    # Управление группой
    path('<int:group_id>/delete/', views.delete_group, name='delete_group'),
    path('<int:group_id>/edit/', views.edit_group, name='edit_group'),
]