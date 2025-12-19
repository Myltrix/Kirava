// Фильтрация таблицы лидеров
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const leaderboardUsers = document.querySelectorAll('.leaderboard-user');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Убираем активный класс со всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс на нажатую кнопку
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Показываем/скрываем элементы
            if (filter === 'all') {
                leaderboardUsers.forEach(user => user.style.display = 'flex');
            } else {
                // Здесь можно добавить логику фильтрации по категориям
                // Пока просто показываем всех пользователей
                leaderboardUsers.forEach(user => user.style.display = 'flex');
            }
        });
    });

    // Пагинация
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    const paginationNext = document.querySelector('.pagination-next');
    
    paginationButtons.forEach(button => {
        button.addEventListener('click', function() {
            paginationButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    if (paginationNext) {
        paginationNext.addEventListener('click', function() {
            const activeButton = document.querySelector('.pagination-btn.active');
            const nextButton = activeButton.nextElementSibling;
            
            if (nextButton && nextButton.classList.contains('pagination-btn')) {
                paginationButtons.forEach(btn => btn.classList.remove('active'));
                nextButton.classList.add('active');
            }
        });
    }

    // Анимация появления элементов
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

    // Добавляем анимацию для карточек
    const animatedElements = document.querySelectorAll('.why-card, .stat-card, .leaderboard-user');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });

    // Плавная прокрутка к якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});