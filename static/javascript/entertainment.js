// Функции для страницы развлечений
function openGame(gameId) {
    alert(`Запускаем игру: ${gameId}`);
    // Здесь будет запуск игры
}

// Инициализация карусели для страницы развлечений
function initEntertainmentCarousels() {
    const carousels = document.querySelectorAll('.games-carousel');
    
    carousels.forEach(carousel => {
        const prevBtn = carousel.parentElement.querySelector('.carousel-prev');
        const nextBtn = carousel.parentElement.querySelector('.carousel-next');
        
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                carousel.scrollBy({ left: -325, behavior: 'smooth' });
            });
            
            nextBtn.addEventListener('click', () => {
                carousel.scrollBy({ left: 325, behavior: 'smooth' });
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎮 Страница развлечений загружена!');
    
    // Инициализация каруселей
    initEntertainmentCarousels();

    // Добавляем анимацию появления элементов
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
    document.querySelectorAll('.category-card, .game-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Glowing effect для кнопок
document.querySelectorAll('.glowing-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 0 20px rgba(0, 55, 172, 0.6)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
    });
});

// Делаем функции глобальными
window.openGame = openGame;
window.initEntertainmentCarousels = initEntertainmentCarousels;