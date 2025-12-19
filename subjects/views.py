from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Avg, Count
from django.contrib.auth.decorators import login_required
from .models import Subject, Topic, TopicQuestion, TopicResult, TopicComment
from .forms import TopicCommentForm


def subjects_page(request):
    subjects = Subject.objects.all().prefetch_related("topics")
    return render(request, "subjects.html", {"subjects": subjects})


def get_topic_stats(topic):
    """Получение статистики по теме (как в викторине по аниме)"""
    stats = {
        'total_completions': 0,
        'average_score': 0,
    }
    
    if TopicResult.objects.filter(topic=topic).exists():
        stats['total_completions'] = TopicResult.objects.filter(topic=topic).count()
        avg_result = TopicResult.objects.filter(topic=topic).aggregate(
            Avg('percentage')
        )
        stats['average_score'] = round(avg_result['percentage__avg'] or 0, 1)
        
    return stats


def topic_detail(request, subject_slug, topic_slug):
    subject = get_object_or_404(Subject, slug=subject_slug)
    topic = get_object_or_404(Topic, subject=subject, slug=topic_slug)
    
    # Обработка отправки комментария
    if request.method == 'POST' and request.user.is_authenticated:
        form = TopicCommentForm(request.POST)
        if form.is_valid():
            TopicComment.objects.create(
                topic=topic,
                user=request.user,
                text=form.cleaned_data['text']
            )
            return redirect('subjects:topic_detail', 
                          subject_slug=subject_slug, 
                          topic_slug=topic_slug)
    
    # Получаем статистику
    stats = get_topic_stats(topic)
    
    # Лучший результат пользователя
    best_result = None
    if request.user.is_authenticated:
        best_result = TopicResult.objects.filter(
            user=request.user, 
            topic=topic
        ).order_by('-percentage').first()
    
    comment_form = TopicCommentForm()
    comments = (
        TopicComment.objects.filter(topic=topic)
        .select_related("user")
        .order_by("-created_at")
    )
    
    return render(
        request,
        "subjects-detail.html",
        {
            "subject": subject,
            "topic": topic,
            "comment_form": comment_form,
            "comments": comments,
            "total_completions": stats['total_completions'],
            "average_score": stats['average_score'],
            "best_result": best_result,
        },
    )


def topic_questions_api(request, subject_slug, topic_slug):
    subject = get_object_or_404(Subject, slug=subject_slug)
    topic = get_object_or_404(Topic, subject=subject, slug=topic_slug)

    questions = (
        TopicQuestion.objects.filter(topic=topic)
        .prefetch_related("answers")
        .order_by("order")
    )

    data = []
    for q in questions:
        answers = [{"id": a.id, "text": a.text} for a in q.answers.all()]
        data.append(
            {
                "id": q.id,
                "text": q.text,
                "answers": answers,
            }
        )

    return JsonResponse(
        {
            "topic": {"id": topic.id, "title": topic.title},
            "questions": data,
        }
    )


@require_POST
@csrf_exempt
def submit_topic_result_api(request, subject_slug, topic_slug):
    subject = get_object_or_404(Subject, slug=subject_slug)
    topic = get_object_or_404(Topic, subject=subject, slug=topic_slug)

    try:
        import json
        payload = json.loads(request.body.decode("utf-8"))
    except Exception:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    answers_map = payload.get("answers", {})  # {"question_id": "answer_id"}
    time_spent = int(payload.get("time_spent", 0))

    questions = TopicQuestion.objects.filter(topic=topic).prefetch_related("answers")

    total = questions.count()
    correct = 0
    correct_answers = []
    user_answers = []

    # Собираем информацию о правильных ответах
    for q in questions:
        selected_answer_id = answers_map.get(str(q.id)) or answers_map.get(q.id)
        if not selected_answer_id:
            user_answer = None
        else:
            selected_answer_id = int(selected_answer_id)
            user_answer = q.answers.filter(id=selected_answer_id).first()
        
        # Находим правильный ответ
        correct_answer = q.answers.filter(is_correct=True).first()
        
        user_answers.append({
            "question_id": q.id,
            "question_text": q.text,
            "selected_answer": user_answer.text if user_answer else None,
            "selected_answer_id": user_answer.id if user_answer else None,
            "correct_answer": correct_answer.text if correct_answer else None,
            "correct_answer_id": correct_answer.id if correct_answer else None,
            "is_correct": user_answer and user_answer.is_correct
        })
        
        if user_answer and user_answer.is_correct:
            correct += 1
            correct_answers.append(q.id)

    score = int((correct / total) * 100) if total else 0

    # сохраняем результат (если пользователь вошёл)
    if request.user.is_authenticated:
        TopicResult.objects.create(
            user=request.user,
            topic=topic,
            score=score,
            correct=correct,
            total=total,
            percentage=score,
            time_spent=time_spent,
        )

    return JsonResponse(
        {
            "success": True,
            "score": score,
            "correct": correct,
            "total": total,
            "time_spent": time_spent,
            "correct_answers": correct_answers,
            "details": user_answers,
        }
    )