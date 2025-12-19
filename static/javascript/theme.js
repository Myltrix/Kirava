// Функция для переключения темы
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const darkThemeToggle = document.getElementById('darkThemeToggle');
    const body = document.body;
    
    // Функция для применения темы
    function applyTheme(theme) {
        if (theme === 'light') {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
            updateAllThemeControls('light');
            console.log('✅ Применена светлая тема');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
            updateAllThemeControls('dark');
            console.log('✅ Применена темная тема');
        }
    }
    
    // Функция для обновления всех элементов управления темой
    function updateAllThemeControls(theme) {
        // Обновляем кнопку в хедере (если есть)
        if (themeToggle) {
            updateThemeButton(theme);
        }
        
        // Обновляем чекбокс в настройках (если есть)
        if (darkThemeToggle) {
            darkThemeToggle.checked = theme === 'dark';
        }
    }
    
    // Функция для обновления кнопки темы в хедере
    function updateThemeButton(theme) {
        const sunIcon = themeToggle.querySelector('.fa-sun');
        const moonIcon = themeToggle.querySelector('.fa-moon');
        
        if (sunIcon && moonIcon) {
            if (theme === 'dark') {
                sunIcon.style.opacity = '0';
                moonIcon.style.opacity = '1';
            } else {
                sunIcon.style.opacity = '1';
                moonIcon.style.opacity = '0';
            }
        }
    }
    
    // Проверяем сохраненную тему
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Если тема не сохранена, используем системную
    if (!savedTheme) {
        if (prefersDark) {
            applyTheme('dark');
        } else {
            applyTheme('light');
        }
    } else {
        // Используем сохраненную тему
        applyTheme(savedTheme);
    }
    
    // Обработчик клика по кнопке переключения темы в хедере
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            // Анимация нажатия
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Меняем тему
            if (body.classList.contains('dark-theme')) {
                applyTheme('light');
            } else {
                applyTheme('dark');
            }
        });
    }
    
    // Обработчик изменения чекбокса в настройках
    if (darkThemeToggle) {
        darkThemeToggle.addEventListener('change', function() {
            // Анимация нажатия
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Меняем тему в зависимости от состояния чекбокса
            if (this.checked) {
                applyTheme('dark');
            } else {
                applyTheme('light');
            }
        });
    }
    
    // Слушатель изменения системной темы
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                applyTheme('dark');
            } else {
                applyTheme('light');
            }
        }
    });
    
    // Синхронизация между вкладками браузера
    window.addEventListener('storage', function(e) {
        if (e.key === 'theme' && e.newValue) {
            const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
            if (e.newValue !== currentTheme) {
                applyTheme(e.newValue);
            }
        }
    });
}

// Инициализируем переключение темы при загрузке страницы
document.addEventListener('DOMContentLoaded', initThemeToggle);