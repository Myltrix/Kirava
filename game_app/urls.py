from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('game1/', views.game1_view, name='game1'),
    path('game2/', views.game2_view, name='game2'), 
    path('game3/', views.game3_view, name='game3'), 
    path('game4/', views.game4_view, name='game4'),
    path('game5/', views.game5_view, name='game5'),
    path('game6/', views.game6_view, name='game6'),
    path('min1/', views.min1_view, name='min1'),
    path('min2/', views.min2_view, name='min2'),
    path('min3/', views.min3_view, name='min3'),
    path('min4/', views.min4_view, name='min4'),
]