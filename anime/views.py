# anime/views.py
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.urls import reverse
import json
import urllib.parse
import re

from .models import (
    Anime, AnimeCharacter, AnimeComment,
    Quiz, QuizQuestion, QuizAnswer, QuizResult, QuizComment,
    AnimeUserProfile
)
from .forms import CommentForm, QuizCommentForm
from django.contrib.auth.models import User
from django.db.models import Q, Count, Avg, F
from django.core.paginator import Paginator
from datetime import datetime, timedelta


def extract_youtube_id(url: str) -> str | None:
    """
    Достаёт ID ролика YouTube из разных форматов ссылок:
    - https://youtu.be/<id>
    - https://www.youtube.com/watch?v=<id>
    - https://www.youtube.com/embed/<id>
    - https://www.youtube.com/shorts/<id>
    + запасной regex на всякий случай
    """
    if not url:
        return None

    url = url.strip()

    # youtu.be/<id>
    if "youtu.be/" in url:
        part = url.split("youtu.be/")[-1]
        vid = part.split("?")[0].split("/")[0]
        return vid or None

    parsed = urllib.parse.urlparse(url)
    host = (parsed.netloc or "").lower()
    path = parsed.path or ""

    # youtube domains
    if host in ("youtube.com", "www.youtube.com", "m.youtube.com"):
        # /watch?v=<id>
        if path == "/watch":
            qs = urllib.parse.parse_qs(parsed.query)
            vid = qs.get("v", [None])[0]
            return vid or None

        # /embed/<id>
        if path.startswith("/embed/"):
            vid = path.split("/embed/")[-1].split("/")[0]
            return vid or None

        # /shorts/<id>
        if path.startswith("/shorts/"):
            vid = path.split("/shorts/")[-1].split("/")[0]
            return vid or None

    # запасной вариант: вытащить 11-символьный id
    m = re.search(r"(?:v=|\/embed\/|\/shorts\/|youtu\.be\/)([A-Za-z0-9_-]{11})", url)
    return m.group(1) if m else None


def anime_page(request):
    """Страница со всеми аниме"""
    animes = Anime.objects.all().order_by('-rating', 'title')

    # Пагинация
    page = request.GET.get('page', 1)
    paginator = Paginator(animes, 12)
    animes_page = paginator.get_page(page)

    context = {
        'animes': animes_page,
        'paginator': paginator
    }
    return render(request, 'anime.html', context)


def anime_detail(request, anime_slug):
    """Детальная страница аниме"""
    anime = get_object_or_404(Anime, slug=anime_slug)
    characters = anime.characters.all()
    comments = anime.comments.all().order_by('-created_at')[:10]

    # Получаем ID видео для встраивания (исправлено)
    youtube_id = extract_youtube_id(anime.youtube_url)

    # Обработка формы комментария
    if request.method == 'POST' and request.user.is_authenticated:
        form = CommentForm(request.POST)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.anime = anime
            comment.user = request.user
            comment.save()

            # Начисляем очки за комментарий
            try:
                profile, created = AnimeUserProfile.objects.get_or_create(user=request.user)
                profile.add_points(5, type='anime')
            except Exception as e:
                print(f"Ошибка при начислении очков: {e}")

            return redirect('anime_detail', anime_slug=anime_slug)
    else:
        form = CommentForm()

    # Получаем викторины для этого аниме
    quizzes = anime.quizzes.all()

    # Получаем лучшие результаты пользователя
    user_best_results = {}
    if request.user.is_authenticated:
        for quiz in quizzes:
            best_result = QuizResult.objects.filter(
                user=request.user,
                quiz=quiz
            ).order_by('-percentage').first()
            if best_result:
                user_best_results[quiz.id] = best_result

    context = {
        'anime': anime,
        'characters': characters,
        'comments': comments,
        'form': form,
        'youtube_id': youtube_id,
        'quizzes': quizzes,
        'user_best_results': user_best_results,
    }
    return render(request, 'anime-detail.html', context)


def quizzes_page(request):
    """Страница со всеми викторинами"""
    quizzes = Quiz.objects.all().select_related('anime').order_by('-created_at')

    # Фильтрация по сложности
    difficulty = request.GET.get('difficulty', '')
    if difficulty in ['easy', 'medium', 'hard']:
        quizzes = quizzes.filter(difficulty=difficulty)

    # Поиск
    search_query = request.GET.get('search', '')
    if search_query:
        quizzes = quizzes.filter(
            Q(title__icontains=search_query) |
            Q(anime__title__icontains=search_query) |
            Q(description__icontains=search_query)
        )

    # Пагинация
    page = request.GET.get('page', 1)
    paginator = Paginator(quizzes, 9)
    quizzes_page = paginator.get_page(page)

    # Статистика
    total_quizzes = Quiz.objects.count()
    average_questions = QuizQuestion.objects.aggregate(Avg('quiz'))['quiz__avg'] or 0

    context = {
        'quizzes': quizzes_page,
        'total_quizzes': total_quizzes,
        'average_questions': round(average_questions, 1),
        'search_query': search_query,
        'difficulty_filter': difficulty,
    }
    return render(request, 'quizzes.html', context)


def quiz_detail(request, quiz_slug):
    """Страница деталей викторины"""
    quiz = get_object_or_404(Quiz, slug=quiz_slug)
    questions = quiz.questions.all().order_by('order')
    comments = quiz.comments.all().order_by('-created_at')[:10]

    # Получаем лучший результат
    best_result = None
    user_results = []
    recent_results = []

    if request.user.is_authenticated:
        # Результаты текущего пользователя
        user_results = QuizResult.objects.filter(
            user=request.user,
            quiz=quiz
        ).order_by('-percentage')[:5]

        if user_results.exists():
            best_result = user_results.first()

    # Последние результаты всех пользователей
    recent_results = QuizResult.objects.filter(
        quiz=quiz
    ).select_related('user').order_by('-completed_at')[:5]

    # Статистика викторины
    total_completions = QuizResult.objects.filter(quiz=quiz).count()
    average_score = QuizResult.objects.filter(quiz=quiz).aggregate(Avg('percentage'))['percentage__avg'] or 0

    # Обработка формы комментария
    if request.method == 'POST' and request.user.is_authenticated:
        form = QuizCommentForm(request.POST)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.quiz = quiz
            comment.user = request.user
            comment.save()

            # Начисляем очки за комментарий
            try:
                profile, created = AnimeUserProfile.objects.get_or_create(user=request.user)
                profile.add_points(3, type='quiz')
            except Exception as e:
                print(f"Ошибка при начислении очков: {e}")

            return redirect('quiz_detail', quiz_slug=quiz_slug)
    else:
        form = QuizCommentForm()

    context = {
        'quiz': quiz,
        'questions': questions,
        'comments': comments,
        'form': form,
        'best_result': best_result,
        'user_results': user_results,
        'recent_results': recent_results,
        'total_completions': total_completions,
        'average_score': round(average_score, 1),
    }
    return render(request, 'quiz-detail.html', context)


@login_required
def start_quiz(request, quiz_slug):
    """Начало прохождения викторины"""
    try:
        quiz = get_object_or_404(Quiz, slug=quiz_slug)
        questions = quiz.questions.all().order_by('order')

        print(f"🎮 Начало викторины: {quiz.title}")
        print(f"📊 Количество вопросов в базе: {questions.count()}")

        if not questions.exists():
            return JsonResponse({
                'success': False,
                'error': 'В этой викторине нет вопросов'
            })

        # Подготавливаем данные вопросов
        questions_data = []
        for question in questions:
            answers = question.answers.all()

            question_data = {
                'id': question.id,
                'text': question.text,
                'image_url': question.image_url if question.image_url else None,
                'explanation': question.explanation if question.explanation else None,
                'answers': []
            }

            for answer in answers:
                question_data['answers'].append({
                    'id': answer.id,
                    'text': answer.text,
                    'is_correct': answer.is_correct
                })

            questions_data.append(question_data)

        print(f"✅ Подготовлено {len(questions_data)} вопросов")

        return JsonResponse({
            'success': True,
            'quiz': {
                'id': quiz.id,
                'title': quiz.title,
                'total_questions': quiz.total_questions,
                'time_limit': quiz.time_limit
            },
            'questions': questions_data,
            'count': len(questions_data)
        })

    except Exception as e:
        print(f"❌ Ошибка в start_quiz: {str(e)}")
        import traceback
        traceback.print_exc()
        return JsonResponse({
            'success': False,
            'error': str(e)
        })


@login_required
def submit_quiz(request, quiz_slug):
    """Отправка результатов викторины"""
    if request.method == 'POST':
        try:
            quiz = get_object_or_404(Quiz, slug=quiz_slug)
            data = json.loads(request.body)

            answers = data.get('answers', {})
            time_spent = data.get('time_spent', 0)

            # Проверяем ответы
            correct_count = 0
            total_questions = quiz.questions.count()

            for question_id, answer_id in answers.items():
                try:
                    question = QuizQuestion.objects.get(id=question_id, quiz=quiz)
                    answer = QuizAnswer.objects.get(id=answer_id, question=question)
                    if answer.is_correct:
                        correct_count += 1
                except (QuizQuestion.DoesNotExist, QuizAnswer.DoesNotExist):
                    continue

            # Рассчитываем процент
            percentage = (correct_count / total_questions * 100) if total_questions > 0 else 0

            # Рассчитываем очки
            points_earned = 0
            time_bonus = 0

            # Базовые очки за правильные ответы
            points_earned = correct_count * 10

            # Бонус за точность
            if percentage >= 90:
                points_earned += 50
            elif percentage >= 70:
                points_earned += 40
            elif percentage >= 50:
                points_earned += 30
            elif percentage >= 30:
                points_earned += 20
            else:
                points_earned += 10

            # Бонус за скорость
            ideal_time = total_questions * quiz.time_limit
            if time_spent < ideal_time:
                time_bonus = int((ideal_time - time_spent) / 10) * 5
                points_earned += time_bonus

            # Бонус за сложность
            difficulty_bonus = {
                'easy': 10,
                'medium': 20,
                'hard': 30
            }
            points_earned += difficulty_bonus.get(quiz.difficulty, 0)

            # Сохраняем результат
            result = QuizResult.objects.create(
                user=request.user,
                quiz=quiz,
                score=correct_count,
                total_questions=total_questions,
                percentage=percentage,
                time_spent=time_spent,
                points_earned=points_earned
            )

            # Обновляем очки пользователя в аниме-профиле
            try:
                profile, created = AnimeUserProfile.objects.get_or_create(user=request.user)
                profile_info = profile.add_points(points_earned, type='quiz')
            except Exception as e:
                print(f"Ошибка при обновлении профиля: {e}")
                profile_info = {'new_points': 0, 'new_level': 1, 'points_earned': points_earned}

            return JsonResponse({
                'success': True,
                'result': {
                    'score': correct_count,
                    'total': total_questions,
                    'percentage': round(percentage, 2),
                    'time_spent': time_spent,
                    'result_id': result.id,
                    'points_earned': points_earned,
                    'time_bonus': time_bonus,
                    'difficulty_bonus': difficulty_bonus.get(quiz.difficulty, 0),
                    'user_points': profile_info.get('new_points', 0),
                    'user_level': profile_info.get('new_level', 1)
                }
            })
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})

    return JsonResponse({'success': False, 'error': 'Invalid request method'})


@login_required
def quiz_results(request, result_id):
    """Просмотр результатов викторины"""
    result = get_object_or_404(QuizResult, id=result_id, user=request.user)

    # Получаем детали вопросов и ответов
    quiz = result.quiz
    questions = quiz.questions.all().order_by('order')

    context = {
        'result': result,
        'quiz': quiz,
        'questions': questions,
    }
    return render(request, 'anime/quiz-results.html', context)


@login_required
def anime_user_profile(request):
    """Профиль пользователя в аниме-приложении"""
    user = request.user
    try:
        anime_profile = AnimeUserProfile.objects.get(user=user)
    except AnimeUserProfile.DoesNotExist:
        anime_profile = AnimeUserProfile.objects.create(user=user)

    # Получаем последние результаты
    recent_results = QuizResult.objects.filter(user=user).select_related('quiz').order_by('-completed_at')[:10]

    # Статистика
    total_quizzes_taken = QuizResult.objects.filter(user=user).count()
    average_score = QuizResult.objects.filter(user=user).aggregate(Avg('percentage'))['percentage__avg'] or 0
    total_points = anime_profile.total_points

    # Любимые аниме
    favorite_anime = anime_profile.favorite_anime.all()[:5]

    # Достижения
    achievements = []
    if total_quizzes_taken >= 10:
        achievements.append({'name': 'Новичок', 'description': 'Пройдите 10 викторин', 'icon': '🥉'})
    if total_quizzes_taken >= 50:
        achievements.append({'name': 'Опытный игрок', 'description': 'Пройдите 50 викторин', 'icon': '🥈'})
    if total_quizzes_taken >= 100:
        achievements.append({'name': 'Мастер викторин', 'description': 'Пройдите 100 викторин', 'icon': '🥇'})
    if average_score >= 80:
        achievements.append({'name': 'Знаток', 'description': 'Средний результат 80%+', 'icon': '🏆'})
    if anime_profile.anime_level >= 10:
        achievements.append({'name': 'Легенда', 'description': 'Достигните 10 уровня', 'icon': '👑'})

    context = {
        'user': user,
        'anime_profile': anime_profile,
        'recent_results': recent_results,
        'total_quizzes_taken': total_quizzes_taken,
        'average_score': round(average_score, 1),
        'total_points': total_points,
        'favorite_anime': favorite_anime,
        'achievements': achievements,
    }
    return render(request, 'anime/profile.html', context)


def anime_leaderboard(request):
    """Таблица лидеров по аниме-очкам"""
    # По очкам в аниме-профиле
    top_by_points = AnimeUserProfile.objects.all().order_by('-total_points')[:20]

    # По количеству пройденных викторин
    top_by_quizzes = User.objects.annotate(
        quiz_count=Count('quiz_results')
    ).order_by('-quiz_count')[:20]

    # По среднему результату
    top_by_score = User.objects.annotate(
        avg_score=Avg('quiz_results__percentage'),
        quiz_count=Count('quiz_results')
    ).filter(quiz_count__gte=3).order_by('-avg_score')[:20]

    context = {
        'top_by_points': top_by_points,
        'top_by_quizzes': top_by_quizzes,
        'top_by_score': top_by_score,
    }
    return render(request, 'anime/leaderboard.html', context)
