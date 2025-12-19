// Фильтрация по навыкам
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const gameCards = document.querySelectorAll('.game-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Убираем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Фильтрация карточек
            gameCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Обработка кнопок "Начать тренировку"
    const playButtons = document.querySelectorAll('.play-btn');
    playButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const gameName = this.getAttribute('data-game');
            alert(`Запуск тренировки: ${gameName}\n\nЭта функция находится в разработке. Скоро вы сможете развивать навыки будущего!`);
            
            // В будущем здесь будет переход на конкретную игру
            // window.location.href = `games/${gameName}.html`;
        });
    });
    
    // Клик по карточке игры
    gameCards.forEach(card => {
        card.addEventListener('click', function() {
            const gameTitle = this.querySelector('h3').textContent;
            alert(`Подробнее о тренировке: ${gameTitle}\n\nЗдесь будет подробное описание навыка и его важности для будущего.`);
        });
    });
});