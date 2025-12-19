# Rating System Implementation - Changes Summary

This document details all changes made to implement a working rating system where users can earn points and be displayed in a rating table.

---

## 📋 Overview

The rating system was previously showing hardcoded fake users. Now it displays real users based on points earned from:
- Completing quizzes
- Playing games
- Completing educational subjects

---

## 🔧 Files Modified

### 1. `users/models.py`

**Added Methods to `UserProfile` class:**

```python
def add_points(self, points: int, update_level: bool = True):
    """Добавляет очки пользователю и обновляет уровень"""
    # Adds points and updates level (every 100 points = new level)
    # Automatically updates rank after adding points

def update_rank(self):
    """Обновляет позицию пользователя в рейтинге на основе очков"""
    # Updates individual user's rank based on points

@staticmethod
def update_all_ranks():
    """Обновляет рейтинг всех пользователей"""
    # Updates ranks for all users (useful for bulk updates)
```

**Purpose:** 
- Centralized point management
- Automatic level calculation (1 level per 100 points)
- Automatic rank updates when points change

---

### 2. `anime/views.py`

**Modified `submit_quiz()` function:**

**Added:**
- Points are now added to main `UserProfile` (not just `AnimeUserProfile`)
- Updates `quizzes_completed` counter
- Points calculation:
  - Base: 10 points per correct answer
  - Accuracy bonus: 10-50 points based on percentage
  - Speed bonus: based on time spent
  - Difficulty bonus: 10-30 points based on quiz difficulty

**Code Added:**
```python
# Обновляем очки в основном профиле пользователя
try:
    from users.models import UserProfile
    user_profile, created = UserProfile.objects.get_or_create(user=request.user)
    user_profile.add_points(points_earned)
    # Обновляем счетчик пройденных викторин
    user_profile.quizzes_completed += 1
    user_profile.save(update_fields=['quizzes_completed'])
except Exception as e:
    print(f"Ошибка при обновлении основного профиля: {e}")
```

**Fixed:**
- Removed duplicate `JsonResponse` return statement (syntax error)

---

### 3. `game_app/views.py`

**Modified `api_submit_answer()` function:**

**Changed:**
- Removed per-round point addition to main profile (to avoid duplicates)
- Points are only added when game ends

**Modified `api_end_game()` function:**

**Added:**
- Points are added to main `UserProfile` when game completes
- Updates `games_played` counter
- Updates player statistics
- Final game score is added to user's total points

**Code Added:**
```python
# Обновляем очки в основном профиле пользователя
try:
    from users.models import UserProfile
    user_profile, created = UserProfile.objects.get_or_create(user=game_session.user)
    user_profile.add_points(game_session.score)
    # Обновляем счетчик сыгранных игр
    user_profile.games_played += 1
    user_profile.save(update_fields=['games_played'])
except Exception as e:
    print(f"Ошибка при обновлении основного профиля при завершении игры: {e}")
```

---

### 4. `subjects/views.py`

**Modified `submit_topic_result_api()` function:**

**Added:**
- Points calculation and addition to main `UserProfile`
- Updates `courses_completed` counter
- Points calculation:
  - Base: 10 points per correct answer
  - Accuracy bonus: 20-50 points based on percentage
  - Difficulty bonus: 10-30 points based on topic difficulty

**Code Added:**
```python
# Рассчитываем и добавляем очки
points_earned = correct * 10  # Базовые очки за правильные ответы

# Бонус за процент правильных ответов
if score >= 90:
    points_earned += 50
elif score >= 70:
    points_earned += 40
elif score >= 50:
    points_earned += 30
elif score >= 30:
    points_earned += 20

# Бонус за сложность темы
difficulty_bonus = {
    'easy': 10,
    'medium': 20,
    'hard': 30
}
points_earned += difficulty_bonus.get(topic.difficulty, 0)

# Обновляем очки в основном профиле пользователя
try:
    from users.models import UserProfile
    user_profile, created = UserProfile.objects.get_or_create(user=request.user)
    user_profile.add_points(points_earned)
    # Обновляем счетчик пройденных курсов
    user_profile.courses_completed += 1
    user_profile.save(update_fields=['courses_completed'])
except Exception as e:
    print(f"Ошибка при обновлении основного профиля из предметов: {e}")
```

---

### 5. `users/views.py`

**Modified `rating_page()` function:**

**Changed:**
- Now fetches real users from database ordered by points
- Updates all user ranks when page loads
- Calculates community statistics
- Shows current user's position

**Added:**
- Import for `User` model (was missing, caused NameError)

**Code Added:**
```python
from django.contrib.auth.models import User  # Added import

def rating_page(request):
    """Страница рейтинга"""
    from django.db.models import Count, Q
    from .models import UserProfile
    
    # Получаем топ пользователей по очкам
    top_users = UserProfile.objects.select_related('user').order_by('-points', 'id')[:50]
    
    # Обновляем рейтинг всех пользователей (на случай если он устарел)
    UserProfile.update_all_ranks()
    
    # Получаем позицию текущего пользователя
    user_rank = None
    user_position = None
    if request.user.is_authenticated:
        try:
            user_profile = request.user.profile
            user_rank = user_profile.rank
            # Находим позицию в списке
            for idx, profile in enumerate(top_users, start=1):
                if profile.user == request.user:
                    user_position = idx
                    break
        except UserProfile.DoesNotExist:
            pass
    
    # Статистика сообщества
    total_users = User.objects.count()
    total_games = sum(profile.games_played for profile in UserProfile.objects.all())
    total_courses = sum(profile.courses_completed for profile in UserProfile.objects.all())
    total_achievements = sum(profile.achievements_count for profile in UserProfile.objects.all())
    
    context = {
        'top_users': top_users,
        'user_rank': user_rank,
        'user_position': user_position,
        'total_users': total_users,
        'total_games': total_games,
        'total_courses': total_courses,
        'total_achievements': total_achievements,
    }
    
    return render(request, "rating.html", context)
```

---

### 6. `templates/rating.html`

**Replaced hardcoded users with dynamic template:**

**Before:**
- 10 hardcoded fake users (NarutoUzumaki, SakuraHaruno, etc.)
- Static points and usernames

**After:**
- Dynamic loop displaying real users from database
- Shows user avatars (or default icon)
- Displays real usernames and points
- Shows medals for top 3 users (crown, medal, award)
- Dynamic user titles based on position/level
- Real community statistics

**Code Changed:**
```django
<!-- Before: 10 hardcoded user divs -->

<!-- After: -->
{% if top_users %}
    {% for profile in top_users|slice:":50" %}
        {% with position=forloop.counter %}
        <div class="leaderboard-user {% if position == 1 %}first-place{% elif position == 2 %}second-place{% elif position == 3 %}third-place{% endif %}">
            <!-- Dynamic user display -->
        </div>
        {% endwith %}
    {% endfor %}
{% else %}
    <div class="no-users-message">
        <p>Пока нет пользователей в рейтинге. Станьте первым!</p>
    </div>
{% endif %}
```

**Also Updated:**
- Community statistics now show real numbers instead of 0
- Added `{% load humanize %}` for number formatting

---

### 7. `kirava/settings.py`

**Added:**
```python
'django.contrib.humanize',  # For number formatting (intcomma filter)
```

**Purpose:** Enables number formatting in templates (e.g., 1000 → 1,000)

---

## 📊 Points System

### How Users Earn Points:

1. **Quizzes:**
   - Base: 10 points per correct answer
   - Accuracy bonus: 10-50 points (based on percentage)
   - Speed bonus: based on completion time
   - Difficulty bonus: 10-30 points

2. **Games:**
   - Points = final game score
   - Added only when game completes (not per round)

3. **Educational Subjects:**
   - Base: 10 points per correct answer
   - Accuracy bonus: 20-50 points (based on percentage)
   - Difficulty bonus: 10-30 points

### Level System:
- 1 level = 100 points
- Automatically calculated when points are added

### Rank System:
- Rank = position in leaderboard (1 = highest points)
- Automatically updated when points change
- Can be bulk updated with `UserProfile.update_all_ranks()`

---

## 🐛 Bugs Fixed

1. **Syntax Error in `anime/views.py`:**
   - Removed duplicate `JsonResponse` return statement

2. **NameError in `users/views.py`:**
   - Added missing `User` import from `django.contrib.auth.models`

3. **Double Point Addition in Games:**
   - Removed per-round point addition (was adding points twice)

---

## ✅ Testing Checklist

After these changes, verify:

- [x] Users can earn points from quizzes
- [x] Users can earn points from games
- [x] Users can earn points from subjects
- [x] Points are displayed correctly in user profiles
- [x] Rating page shows real users
- [x] Top 3 users have medals displayed
- [x] Community statistics show real numbers
- [x] User ranks update automatically
- [x] Levels calculate correctly (100 points = 1 level)

---

## 🚀 Usage

### To Update All User Ranks (if needed):
```python
python manage.py shell
>>> from users.models import UserProfile
>>> UserProfile.update_all_ranks()
```

### To Add Points Manually (for testing):
```python
python manage.py shell
>>> from users.models import UserProfile
>>> from django.contrib.auth.models import User
>>> user = User.objects.get(username='testuser')
>>> profile = user.profile
>>> profile.add_points(100)  # Adds 100 points and updates rank
```

---

## 📝 Notes

- Points are stored in `UserProfile.points` field
- Ranks are stored in `UserProfile.rank` field
- Levels are stored in `UserProfile.level` field
- All updates are automatic - no manual intervention needed
- The rating page shows top 50 users by default
- Ranks are recalculated every time the rating page is loaded (for accuracy)

---

**Date:** 2025
**Status:** ✅ Complete and Working

