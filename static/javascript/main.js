// Слайдер
let currentSlide = 0;
let slideInterval;
const slides = document.querySelectorAll('.slide');
const backgrounds = document.querySelectorAll('.slide-bg');

function showSlide(index) {
    // Убираем активные классы у всех слайдов и фонов
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    backgrounds.forEach(bg => {
        bg.classList.remove('active');
        bg.style.opacity = '';
        bg.style.filter = '';
    });

    // Добавляем активные классы
    slides[index].classList.add('active');
    backgrounds[index].classList.add('active');
    
    // Применяем стили - ФОН ВСЕГДА ОДИНАКОВЫЙ КАК В ТЕМНОЙ ТЕМЕ
    updateActiveBackgroundStyle();
    
    currentSlide = index;
    
    // Отправляем событие о смене слайда
    const event = new CustomEvent('slideChanged', { detail: { index: index } });
    document.dispatchEvent(event);
}

// Функция для обновления стилей активного фона
function updateActiveBackgroundStyle() {
    const activeBg = document.querySelector('.slide-bg.active');
    if (!activeBg) return;
    
    // ФОН ВСЕГДА ОДИНАКОВЫЙ В ОБЕИХ ТЕМАХ - КАК В ТЕМНОЙ ТЕМЕ
    activeBg.style.opacity = '0.6';
    activeBg.style.filter = 'none';
}

// Функция для обновления всех фонов при смене темы
function updateAllBackgroundsForTheme() {
    backgrounds.forEach(bg => {
        if (bg.classList.contains('active')) {
            // ФОН ВСЕГДА ОДИНАКОВЫЙ - КАК В ТЕМНОЙ ТЕМЕ
            bg.style.opacity = '0.6';
            bg.style.filter = 'none';
        } else {
            bg.style.opacity = '0';
            bg.style.filter = 'none';
        }
    });
}

function changeSlide(direction) {
    let newIndex = currentSlide + direction;
    
    if (newIndex < 0) {
        newIndex = slides.length - 1;
    } else if (newIndex >= slides.length) {
        newIndex = 0;
    }
    
    showSlide(newIndex);
}

function startAutoSlide() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

// ПРОСТАЯ И НАДЕЖНАЯ ФУНКЦИЯ ДЛЯ КАРУСЕЛЕЙ
function initCarousels() {
    console.log('🔄 Инициализация каруселей...');
    
    const carouselContainers = document.querySelectorAll('.carousel-container');
    console.log(`Найдено контейнеров каруселей: ${carouselContainers.length}`);
    
    carouselContainers.forEach((container, index) => {
        console.log(`🔍 Обрабатываем контейнер ${index + 1}:`, container);
        
        const carousel = container.querySelector('.quizzes-carousel');
        const prevBtn = container.querySelector('.carousel-prev');
        const nextBtn = container.querySelector('.carousel-next');
        
        console.log(`Карусель: ${carousel ? 'найдена' : 'не найдена'}`);
        console.log(`Кнопка prev: ${prevBtn ? 'найдена' : 'не найдена'}`);
        console.log(`Кнопка next: ${nextBtn ? 'найдена' : 'не найдена'}`);
        
        if (carousel && prevBtn && nextBtn) {
            // ОЧИСТКА СТАРЫХ ОБРАБОТЧИКОВ
            prevBtn.replaceWith(prevBtn.cloneNode(true));
            nextBtn.replaceWith(nextBtn.cloneNode(true));
            
            // ПОЛУЧАЕМ ОБНОВЛЕННЫЕ КНОПКИ
            const newPrevBtn = container.querySelector('.carousel-prev');
            const newNextBtn = container.querySelector('.carousel-next');
            
            // ДОБАВЛЯЕМ ОБРАБОТЧИКИ
            newPrevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('⬅️ Кнопка PREV нажата');
                carousel.scrollBy({ left: -400, behavior: 'smooth' });
            });
            
            newNextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('➡️ Кнопка NEXT нажата');
                carousel.scrollBy({ left: 400, behavior: 'smooth' });
            });
            
            console.log(`✅ Карусель ${index + 1} инициализирована`);
        } else {
            console.log('❌ Не удалось инициализировать карусель:', { carousel, prevBtn, nextBtn });
        }
    });
}

// Анимации и интерактивность
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎮 Kirava - Аниме платформа загружена!');
    console.log('📊 Статистика:');
    console.log(`- Слайдов: ${slides.length}`);
    console.log(`- Контейнеров каруселей: ${document.querySelectorAll('.carousel-container').length}`);

    // Инициализация слайдера
    if (slides.length > 0) {
        showSlide(0);
        startAutoSlide();

        const sliderContainer = document.querySelector('.slider-container');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });

            sliderContainer.addEventListener('mouseleave', () => {
                startAutoSlide();
            });
        }
        
        // Слушаем события смены темы
        document.addEventListener('themeChanged', function() {
            updateAllBackgroundsForTheme();
        });
        
        // Слушаем события смены слайда
        document.addEventListener('slideChanged', function() {
            updateActiveBackgroundStyle();
        });
    }
    
    // ИНИЦИАЛИЗАЦИЯ КАРУСЕЛЕЙ С ЗАДЕРЖКОЙ
    setTimeout(() => {
        console.log('🚀 Запускаем инициализацию каруселей...');
        initCarousels();
        
        // ДОПОЛНИТЕЛЬНАЯ ПРОВЕРКА ЧЕРЕЗ 1 СЕКУНДУ
        setTimeout(() => {
            console.log('🔍 Проверка состояния каруселей:');
            document.querySelectorAll('.carousel-btn').forEach((btn, index) => {
                console.log(`Кнопка ${index + 1}:`, btn);
            });
        }, 1000);
    }, 500);

    // Анимация появления элементов при скролле
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

    // Наблюдаем за карточками
    document.querySelectorAll('.feature-card, .quiz-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Обработка кнопок (анимация нажатия)
    document.querySelectorAll('.btn-primary, .btn-secondary, .btn-quiz, .btn-login, .btn-register').forEach(btn => {
        btn.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        btn.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Плавная прокрутка для навигации
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Обработка кнопок викторин
    document.querySelectorAll('.btn-quiz').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.quiz-card');
            const title = card.querySelector('h3')?.textContent || 'Викторина';
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            console.log(`Запуск викторины: ${title}`);
        });
    });
});

// Делаем функции глобальными
window.changeSlide = changeSlide;
window.initCarousels = initCarousels;
window.updateAllBackgroundsForTheme = updateAllBackgroundsForTheme;

// Переинициализация при изменении размера окна
window.addEventListener('resize', function() {
    console.log('🔄 Переинициализация из-за изменения размера');
    setTimeout(initCarousels, 300);
});

// Принудительная инициализация при полной загрузке страницы
window.addEventListener('load', function() {
    console.log('📄 Страница полностью загружена');
    setTimeout(() => {
        console.log('🔄 Финальная инициализация каруселей');
        initCarousels();
    }, 1000);
});

// ОБРАБОТКА ОШИБОК
window.addEventListener('error', function(e) {
    console.error('❌ Глобальная ошибка:', e.error);
});