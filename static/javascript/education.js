// Функции для страницы обучения
function openCourse(courseId) {
    alert(`Открываем курс: ${courseId}`);
    // Здесь будет открытие курса
}

// Инициализация плавного появления элементов
function initEducationAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Наблюдаем за карточками категорий
    document.querySelectorAll('.category-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Наблюдаем за элементами преимуществ
    document.querySelectorAll('.feature-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    // Наблюдаем за заголовками секций
    document.querySelectorAll('.section-title').forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(20px)';
        title.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(title);
    });
}

// Glowing effect для кнопок
function initGlowingButtons() {
    document.querySelectorAll('.glowing-btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 20px rgba(0, 55, 172, 0.6)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('📚 Страница обучения загружена!');
    
    // Инициализация анимаций
    initEducationAnimations();
    
    // Инициализация glowing кнопок
    initGlowingButtons();
});

// Делаем функции глобальными
window.openCourse = openCourse;
window.initEducationAnimations = initEducationAnimations;