from django.shortcuts import render

def home(request):
    """Главная страница с игрой"""
    return render(request, 'main.html')

def game1_view(request):
    """Представление для игры Угадай аниме"""
    return render(request, 'game1.html')

def game2_view(request):
    """Представление для игры Угадай аниме по персонажу"""
    return render(request, 'game2.html')

def game3_view(request):
    """Представление для игры Угадай персонажа по фразе"""
    return render(request, 'game3.html')

def game4_view(request):
    """Представление для игры Правильно/Неправильно"""
    return render(request, 'game4.html')

def game5_view(request):
    """Представление для игры Кто сильнее?"""
    return render(request, 'game5.html')

def game6_view(request):
    """Угадай логитипы"""
    return render(request, 'game6.html')

def min1_view(request):
    """Представление для игры Угадай страну по флагу"""
    return render(request, 'min1.html')

def min2_view(request):
    """Представление для игры Угадай страну по флагу"""
    return render(request, 'min2.html')

def min3_view(request):
    """Представление для игры Угадай страну по флагу"""
    return render(request, 'min3.html')

def min4_view(request):
    """Представление для игры Угадай страну по флагу"""
    return render(request, 'min4.html')