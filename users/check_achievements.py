# check_achievements.py
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'your_project.settings')
django.setup()

from django.contrib.auth.models import User
from users.models import Achievement, UserAchievement

def check_achievements():
    print("=" * 60)
    print("ПРОВЕРКА ДОСТИЖЕНИЙ В СИСТЕМЕ")
    print("=" * 60)
    
    # 1. Проверяем все достижения в базе
    print("\n1. Все достижения в системе:")
    achievements = Achievement.objects.all()
    for ach in achievements:
        print(f"  • {ach.code}: {ach.title} ({ach.points} очков)")
    
    # 2. Проверяем достижение set_avatar
    print("\n2. Достижение 'set_avatar':")
    set_avatar = Achievement.objects.filter(code="set_avatar").first()
    if set_avatar:
        print(f"  Найдено: {set_avatar.title} ({set_avatar.code})")
    else:
        print("  Достижение НЕ НАЙДЕНО! Создаем...")
        set_avatar = Achievement.objects.create(
            code="set_avatar",
            title="Первый аватар",
            description="Вы установили аватар в профиле",
            points=10,
            achievement_type="bronze"
        )
        print(f"  Создано: {set_avatar.title}")
    
    # 3. Проверяем всех пользователей
    print("\n3. Проверяем пользователей:")
    users = User.objects.all()
    for user in users:
        print(f"\n  Пользователь: {user.username}")
        
        # Проверяем профиль
        try:
            profile = user.profile
            print(f"    • Аватар: {'Есть' if profile.avatar else 'Нет'}")
            print(f"    • Страна: {profile.country or 'Не указана'}")
        except:
            print("    • Профиль: Нет профиля")
        
        # Проверяем достижения пользователя
        user_achievements = UserAchievement.objects.filter(user=user)
        print(f"    • Всего достижений: {user_achievements.count()}")
        
        # Проверяем наличие set_avatar
        has_set_avatar = user_achievements.filter(achievement__code="set_avatar").exists()
        print(f"    • Достижение 'set_avatar': {'Есть' if has_set_avatar else 'Нет'}")
        
        # Если у пользователя есть аватар, но нет достижения - выдаем
        try:
            if user.profile.avatar and not has_set_avatar and set_avatar:
                print(f"    ⚠️  У пользователя есть аватар, но нет достижения! Выдаем...")
                UserAchievement.objects.create(user=user, achievement=set_avatar)
                print(f"    ✅ Достижение выдано!")
        except:
            pass
    
    print("\n" + "=" * 60)
    print("ПРОВЕРКА ЗАВЕРШЕНА")
    print("=" * 60)

if __name__ == "__main__":
    check_achievements()