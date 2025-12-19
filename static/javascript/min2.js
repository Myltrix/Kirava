// ============================================
// ИГРА "ЧЕЙ ЭТО ЛОГОТИП?"
// Версия с логотипами брендов, компаний и игр
// ============================================

// Конфигурация игры
const CONFIG = {
    TOTAL_ROUNDS: 10,
    TIME_PER_ROUND: 60,
    BASE_POINTS: 100,
    HINT_COST: 50,
    SKIP_COST: 25,
    HINT_DELAY: 15
};

// База данных логотипов (ДЛЯ DJANGO)
const LOGOS_DATABASE = [
    {
        id: 1,
        brand: "Discord",
        image: "/static/images/discord.png",
        category: "Социальные сети",
        year: 2015,
        country: "США",
        description: "Популярный мессенджер для геймеров",
        hint: "Геймеры, чат, серверы",
        difficulty: "easy"
    },
    {
        id: 2,
        brand: "Adobe Photoshop",
        image: "/static/images/photoshop.png",
        category: "Программное обеспечение",
        year: 1990,
        country: "США",
        description: "Редактор растровой графики",
        hint: "Фото, дизайн, слои",
        difficulty: "easy"
    },
    {
        id: 3,
        brand: "Spotify",
        image: "/static/images/spotify.png",
        category: "Музыка",
        year: 2006,
        country: "Швеция",
        description: "Стриминговый музыкальный сервис",
        hint: "Музыка, плейлисты, зелёный",
        difficulty: "easy"
    },
    {
        id: 4,
        brand: "Tesla",
        image: "/static/images/tesla.png",
        category: "Автомобили",
        year: 2003,
        country: "США",
        description: "Электрические автомобили и энергия",
        hint: "Маск, электромобили, космос",
        difficulty: "medium"
    },
    {
        id: 5,
        brand: "Unity",
        image: "/static/images/unity.png",
        category: "Игровые движки",
        year: 2004,
        country: "США",
        description: "Игровой движок для разработки",
        hint: "Игры, куб, движок",
        difficulty: "medium"
    },
    {
        id: 6,
        brand: "Epic Games",
        image: "/static/images/epic.png",
        category: "Игры",
        year: 1991,
        country: "США",
        description: "Fortnite, Unreal Engine, магазин игр",
        hint: "Fortnite, Unreal, магазин игр",
        difficulty: "medium"
    },
    {
        id: 7,
        brand: "Figma",
        image: "/static/images/figma.png",
        category: "Дизайн",
        year: 2012,
        country: "США",
        description: "Онлайн-инструмент для дизайна",
        hint: "Дизайн, интерфейсы, онлайн",
        difficulty: "medium"
    },
    {
        id: 8,
        brand: "Notion",
        image: "/static/images/notion.png",
        category: "Продуктивность",
        year: 2013,
        country: "США",
        description: "Рабочее пространство для заметок",
        hint: "Заметки, базы данных, планирование",
        difficulty: "hard"
    },
    {
        id: 9,
        brand: "Linear",
        image: "/static/images/linear.png",
        category: "Разработка",
        year: 2019,
        country: "США",
        description: "Трекер задач для разработчиков",
        hint: "Задачи, разработка, минимализм",
        difficulty: "hard"
    },
    {
        id: 10,
        brand: "Vercel",
        image: "/static/images/vercel.png",
        category: "Хостинг",
        year: 2015,
        country: "США",
        description: "Платформа для фронтенд-разработки",
        hint: "Деплой, Next.js, облако",
        difficulty: "hard"
    },
    {
        id: 11,
        brand: "Miro",
        image: "/static/images/miro.png",
        category: "Совместная работа",
        year: 2011,
        country: "Россия/США",
        description: "Онлайн-доска для совместной работы",
        hint: "Доска, мозговой штурм, стикеры",
        difficulty: "hard"
    },
    {
        id: 12,
        brand: "Calendly",
        image: "/static/images/calendly.png",
        category: "Планирование",
        year: 2013,
        country: "США",
        description: "Сервис для планирования встреч",
        hint: "Встречи, календарь, планирование",
        difficulty: "hard"
    },
    {
        id: 13,
        brand: "Duolingo",
        image: "/static/images/duolingo.png",
        category: "Образование",
        year: 2011,
        country: "США",
        description: "Приложение для изучения языков",
        hint: "Языки, зелёная сова, геймификация",
        difficulty: "medium"
    },
    {
        id: 14,
        brand: "GitLab",
        image: "/static/images/gitlab.png",
        category: "Разработка",
        year: 2011,
        country: "США",
        description: "Платформа DevOps",
        hint: "Git, CI/CD, оранжевый лис",
        difficulty: "hard"
    },
    {
        id: 15,
        brand: "Twitch",
        image: "/static/images/twitch.png",
        category: "Стриминг",
        year: 2011,
        country: "США",
        description: "Платформа для видеотрансляций",
        hint: "Стримы, игры, фиолетовый",
        difficulty: "medium"
    }
];

// Состояние игры
const GameState = {
    currentRound: 1,
    score: 0,
    highScore: 0,
    timeLeft: CONFIG.TIME_PER_ROUND,
    currentLogo: null,
    usedLogoIds: [],
    gameActive: false,
    roundStartTime: null,
    timer: null,
    hintTimer: null,
    correctAnswers: 0,
    hintsUsed: 0,
    skipsUsed: 0,
    totalTime: 0
};

// DOM элементы
const Elements = {
    scoreValue: document.getElementById('scoreValue'),
    timerValue: document.getElementById('timerValue'),
    roundValue: document.getElementById('roundValue'),
    highScoreValue: document.getElementById('highScoreValue'),
    logoImage: document.getElementById('logoImage'),
    logoPlaceholder: document.getElementById('logoPlaceholder'),
    hintText: document.getElementById('hintText'),
    difficultyText: document.getElementById('difficultyText'),
    answerInput: document.getElementById('answerInput'),
    timerDisplay: document.getElementById('timerDisplay'),
    submitAnswer: document.getElementById('submitAnswer'),
    skipBtn: document.getElementById('skipBtn'),
    hintBtn: document.getElementById('hintBtn'),
    restartBtn: document.getElementById('restartBtn'),
    optionsGrid: document.getElementById('optionsGrid'),
    resultOverlay: document.getElementById('resultOverlay'),
    resultPopup: document.getElementById('resultPopup'),
    progressFill: document.getElementById('progressFill'),
    progressPercent: document.getElementById('progressPercent'),
    roundDots: document.getElementById('roundDots'),
    resultModal: document.getElementById('resultModal'),
    modalBody: document.getElementById('modalBody'),
    closeModal: document.getElementById('closeModal'),
    playAgainBtn: document.getElementById('playAgainBtn'),
    shareResultsBtn: document.getElementById('shareResultsBtn')
};

// Инициализация игры
function initGame() {
    console.log('🎮 Игра "Чей это логотип?" запущена');
    
    // Загрузка сохраненных данных
    loadGameData();
    
    // Настройка обработчиков событий
    setupEventListeners();
    
    // Генерация точек раундов
    generateRoundDots();
    
    // Начало первого раунда
    setTimeout(startNewRound, 1000);
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Отправка ответа
    Elements.submitAnswer.addEventListener('click', handleAnswerSubmit);
    Elements.answerInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleAnswerSubmit();
    });
    
    // Пропуск вопроса
    Elements.skipBtn.addEventListener('click', () => {
        if (GameState.gameActive && GameState.score >= CONFIG.SKIP_COST) {
            GameState.score -= CONFIG.SKIP_COST;
            GameState.skipsUsed++;
            updateScore();
            showNotification(`Пропущено! -${CONFIG.SKIP_COST} очков`, 'warning');
            endRound(false);
        } else if (GameState.gameActive) {
            showNotification('Недостаточно очков для пропуска!', 'error');
        }
    });
    
    // Покупка подсказки
    Elements.hintBtn.addEventListener('click', () => {
        if (GameState.gameActive && GameState.score >= CONFIG.HINT_COST) {
            GameState.score -= CONFIG.HINT_COST;
            GameState.hintsUsed++;
            updateScore();
            showHint('extra');
            showNotification(`Подсказка! -${CONFIG.HINT_COST} очков`, 'info');
        } else if (GameState.gameActive) {
            showNotification('Недостаточно очков для подсказки!', 'error');
        }
    });
    
    // Быстрые подсказки
    document.querySelectorAll('.hint-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const hintType = btn.dataset.type;
            showQuickHint(hintType);
        });
    });
    
    // Перезапуск игры
    Elements.restartBtn.addEventListener('click', resetGame);
    
    // Модальное окно
    Elements.closeModal.addEventListener('click', () => {
        Elements.resultModal.style.display = 'none';
    });
    
    Elements.playAgainBtn.addEventListener('click', () => {
        Elements.resultModal.style.display = 'none';
        resetGame();
    });
    
    Elements.shareResultsBtn.addEventListener('click', shareResults);
    
    // Клик по варианту ответа
    Elements.optionsGrid.addEventListener('click', (e) => {
        if (e.target.closest('.option-btn')) {
            const answer = e.target.closest('.option-btn').querySelector('span').textContent;
            Elements.answerInput.value = answer;
            handleAnswerSubmit();
        }
    });
}

// Загрузка сохраненных данных
function loadGameData() {
    const savedHighScore = localStorage.getItem('logoHighScore');
    if (savedHighScore) {
        GameState.highScore = parseInt(savedHighScore);
        Elements.highScoreValue.textContent = GameState.highScore;
    }
}

// Сохранение данных игры
function saveGameData() {
    if (GameState.score > GameState.highScore) {
        GameState.highScore = GameState.score;
        localStorage.setItem('logoHighScore', GameState.highScore);
        Elements.highScoreValue.textContent = GameState.highScore;
        showNotification('🏆 Новый рекорд!', 'success');
    }
}

// Генерация точек раундов
function generateRoundDots() {
    Elements.roundDots.innerHTML = '';
    for (let i = 1; i <= CONFIG.TOTAL_ROUNDS; i++) {
        const dot = document.createElement('div');
        dot.className = 'round-dot';
        dot.textContent = i;
        dot.id = `roundDot${i}`;
        Elements.roundDots.appendChild(dot);
    }
}

// Обновление точек раундов
function updateRoundDots() {
    for (let i = 1; i <= CONFIG.TOTAL_ROUNDS; i++) {
        const dot = document.getElementById(`roundDot${i}`);
        if (dot) {
            dot.classList.remove('active', 'completed');
            if (i < GameState.currentRound) {
                dot.classList.add('completed');
            } else if (i === GameState.currentRound) {
                dot.classList.add('active');
            }
        }
    }
}

// Начало нового раунда
function startNewRound() {
    // Проверка окончания игры
    if (GameState.currentRound > CONFIG.TOTAL_ROUNDS) {
        endGame();
        return;
    }
    
    // Сброс состояния раунда
    GameState.gameActive = true;
    GameState.timeLeft = CONFIG.TIME_PER_ROUND;
    Elements.answerInput.value = '';
    Elements.resultOverlay.style.display = 'none';
    Elements.timerValue.textContent = GameState.timeLeft;
    Elements.timerDisplay.textContent = GameState.timeLeft;
    Elements.roundValue.textContent = `${GameState.currentRound}/${CONFIG.TOTAL_ROUNDS}`;
    
    // Сброс цвета таймера
    const timerBadge = document.querySelector('.timer-badge');
    if (timerBadge) timerBadge.classList.remove('low-time');
    
    // Обновление прогресса
    const progress = ((GameState.currentRound - 1) / CONFIG.TOTAL_ROUNDS) * 100;
    Elements.progressFill.style.width = `${progress}%`;
    Elements.progressPercent.textContent = `${Math.round(progress)}%`;
    
    // Обновление точек прогресса
    updateRoundDots();
    
    // Выбор случайного логотипа
    GameState.currentLogo = getRandomLogo();
    if (!GameState.currentLogo) {
        alert('Ошибка: не удалось загрузить логотипы!');
        return;
    }
    
    // Загрузка изображения
    const logoImg = Elements.logoImage;
    logoImg.src = GameState.currentLogo.image;
    logoImg.onload = () => {
        Elements.logoPlaceholder.style.display = 'none';
        logoImg.style.opacity = '1';
    };
    logoImg.onerror = () => {
        Elements.logoPlaceholder.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <span>Ошибка загрузки логотипа</span>
            <span>${GameState.currentLogo.brand}</span>
        `;
    };
    
    // Обновление сложности
    updateDifficultyDisplay();
    
    // Генерация вариантов ответов
    generateBrandOptions();
    
    // Запуск таймеров
    startTimers();
    
    // Сброс подсказки
    Elements.hintText.textContent = 'Подсказка появится через 15 секунд';
    
    // Фокус на поле ввода
    setTimeout(() => {
        Elements.answerInput.focus();
    }, 300);
}

// Получение случайного логотипа
function getRandomLogo() {
    // Фильтрация по сложности
    let availableLogos = LOGOS_DATABASE.filter(logo => {
        if (GameState.usedLogoIds.includes(logo.id)) return false;
        
        // Прогрессивная сложность
        if (GameState.currentRound <= 3) return logo.difficulty === 'easy';
        if (GameState.currentRound <= 7) return ['easy', 'medium'].includes(logo.difficulty);
        if (GameState.currentRound <= 9) return ['medium', 'hard'].includes(logo.difficulty);
        return true;
    });
    
    // Если все логотипы использованы, сбросить список
    if (availableLogos.length === 0) {
        GameState.usedLogoIds = [];
        return getRandomLogo();
    }
    
    // Выбор случайного логотипа
    const randomIndex = Math.floor(Math.random() * availableLogos.length);
    const selectedLogo = availableLogos[randomIndex];
    
    // Добавление в использованные
    GameState.usedLogoIds.push(selectedLogo.id);
    
    return selectedLogo;
}

// Обновление отображения сложности
function updateDifficultyDisplay() {
    const difficultyText = {
        easy: 'Легкий',
        medium: 'Средний',
        hard: 'Сложный'
    };
    
    const difficultyColors = {
        easy: '#10b981',
        medium: '#f59e0b',
        hard: '#ef4444'
    };
    
    const difficulty = GameState.currentLogo.difficulty;
    Elements.difficultyText.textContent = `${difficultyText[difficulty]} уровень`;
    
    // Обновление цвета
    const badgeIcon = document.querySelector('.difficulty-badge i');
    if (badgeIcon) {
        badgeIcon.style.color = difficultyColors[difficulty];
    }
}

// Генерация вариантов ответов
function generateBrandOptions() {
    Elements.optionsGrid.innerHTML = '';
    
    const correctBrand = GameState.currentLogo.brand;
    
    // Получаем уникальные названия брендов
    const allBrands = LOGOS_DATABASE
        .map(logo => logo.brand)
        .filter((value, index, self) => self.indexOf(value) === index);
    
    // Исключаем правильный ответ
    const wrongBrands = allBrands
        .filter(brand => brand !== correctBrand)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
    
    // Смешиваем правильный и неправильные ответы
    const allOptions = [correctBrand, ...wrongBrands]
        .sort(() => Math.random() - 0.5);
    
    allOptions.forEach((brand, index) => {
        const option = document.createElement('div');
        option.className = 'option-btn';
        option.innerHTML = `
            <i class="fas fa-briefcase"></i>
            <span>${brand}</span>
        `;
        option.style.animationDelay = `${index * 0.1}s`;
        Elements.optionsGrid.appendChild(option);
    });
}

// Запуск таймеров
function startTimers() {
    // Очистка старых таймеров
    clearInterval(GameState.timer);
    clearTimeout(GameState.hintTimer);
    
    // Сохранение времени начала раунда
    GameState.roundStartTime = Date.now();
    
    // Основной таймер
    GameState.timer = setInterval(() => {
        GameState.timeLeft--;
        Elements.timerValue.textContent = GameState.timeLeft;
        Elements.timerDisplay.textContent = GameState.timeLeft;
        
        // Визуальное предупреждение при малом времени
        const timerBadge = document.querySelector('.timer-badge');
        if (timerBadge) {
            if (GameState.timeLeft <= 10) {
                timerBadge.classList.add('low-time');
            } else {
                timerBadge.classList.remove('low-time');
            }
        }
        
        // Время вышло
        if (GameState.timeLeft <= 0) {
            clearInterval(GameState.timer);
            timeUp();
        }
    }, 1000);
    
    // Таймер автоподсказки
    GameState.hintTimer = setTimeout(() => {
        if (GameState.gameActive) {
            showHint('auto');
        }
    }, CONFIG.HINT_DELAY * 1000);
}

// Обработка отправки ответа
function handleAnswerSubmit() {
    if (!GameState.gameActive) return;
    
    const userAnswer = Elements.answerInput.value.trim();
    
    if (!userAnswer) {
        showNotification('Введите название бренда!', 'error');
        return;
    }
    
    const isCorrect = checkAnswer(userAnswer);
    endRound(isCorrect);
}

// Проверка ответа
function checkAnswer(userAnswer) {
    const correctAnswer = GameState.currentLogo.brand.toLowerCase();
    const userAnswerLower = userAnswer.toLowerCase();
    
    // Прямое совпадение
    if (userAnswerLower === correctAnswer) return true;
    
    // Удаление спецсимволов
    const cleanUser = userAnswerLower.replace(/[^\w\sа-яё]/gi, '').replace(/\s+/g, ' ').trim();
    const cleanCorrect = correctAnswer.replace(/[^\w\sа-яё]/gi, '').replace(/\s+/g, ' ').trim();
    
    if (cleanUser === cleanCorrect) return true;
    
    // Частичное совпадение
    return calculateSimilarity(cleanUser, cleanCorrect) >= 0.85;
}

// Расчет схожести строк
function calculateSimilarity(str1, str2) {
    if (str1.length === 0 || str2.length === 0) return 0;
    
    const matrix = [];
    for (let i = 0; i <= str2.length; i++) matrix[i] = [i];
    for (let j = 0; j <= str1.length; j++) matrix[0][j] = j;
    
    for (let i = 1; i <= str2.length; i++) {
        for (let j = 1; j <= str1.length; j++) {
            const cost = str1[j-1] === str2[i-1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i-1][j] + 1,
                matrix[i][j-1] + 1,
                matrix[i-1][j-1] + cost
            );
        }
    }
    
    const distance = matrix[str2.length][str1.length];
    const maxLength = Math.max(str1.length, str2.length);
    return maxLength === 0 ? 1 : 1 - distance / maxLength;
}

// Завершение раунда
function endRound(isCorrect) {
    // Остановка таймеров
    clearInterval(GameState.timer);
    clearTimeout(GameState.hintTimer);
    GameState.gameActive = false;
    
    // Сброс цвета таймера
    const timerBadge = document.querySelector('.timer-badge');
    if (timerBadge) timerBadge.classList.remove('low-time');
    
    // Расчет времени ответа
    const answerTime = Math.round((Date.now() - GameState.roundStartTime) / 1000);
    GameState.totalTime += answerTime;
    
    // Расчет очков
    let roundScore = 0;
    let timeBonus = 0;
    
    if (isCorrect) {
        GameState.correctAnswers++;
        
        // Базовые очки
        roundScore = CONFIG.BASE_POINTS;
        
        // Бонус за скорость
        timeBonus = Math.max(0, Math.floor((CONFIG.TIME_PER_ROUND - answerTime) * 2));
        
        // Итоговые очки за раунд
        const totalRoundScore = roundScore + timeBonus;
        GameState.score += totalRoundScore;
        
        // Показ правильного результата
        showResult(true, totalRoundScore, roundScore, timeBonus, answerTime);
    } else {
        // Штраф за неправильный ответ
        const penalty = Math.floor(CONFIG.BASE_POINTS * 0.3);
        GameState.score = Math.max(0, GameState.score - penalty);
        showResult(false, 0, 0, 0, answerTime);
    }
    
    // Обновление счета
    updateScore();
    
    // Переход к следующему раунду через 3 секунды
    setTimeout(() => {
        GameState.currentRound++;
        startNewRound();
    }, 3000);
}

// Показать результат
function showResult(isCorrect, totalScore, baseScore, timeBonus, answerTime) {
    const logo = GameState.currentLogo;
    
    // Настройка панели результатов
    Elements.resultOverlay.style.display = 'flex';
    
    if (isCorrect) {
        Elements.resultPopup.className = 'result-popup success';
        Elements.resultPopup.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <h3>Правильно!</h3>
            <p>Бренд: <strong>${logo.brand}</strong></p>
            <p>Категория: <strong>${logo.category}</strong></p>
            <div style="margin-top: 15px; padding: 10px; background: rgba(16, 185, 129, 0.1); border-radius: 10px;">
                Время: <strong>${answerTime}с</strong><br>
                Очки: <strong>+${totalScore}</strong>
            </div>
        `;
    } else {
        Elements.resultPopup.className = 'result-popup error';
        Elements.resultPopup.innerHTML = `
            <i class="fas fa-times-circle"></i>
            <h3>Неправильно!</h3>
            <p>Это: <strong>${logo.brand}</strong></p>
            <p>Категория: ${logo.category}</p>
            <div style="margin-top: 15px; padding: 10px; background: rgba(239, 68, 68, 0.1); border-radius: 10px;">
                Год: ${logo.year}<br>
                Страна: ${logo.country}
            </div>
        `;
    }
    
    // Скрыть панель через 2.5 секунды
    setTimeout(() => {
        Elements.resultOverlay.style.display = 'none';
    }, 2500);
}

// Показать подсказку
function showHint(type) {
    const logo = GameState.currentLogo;
    let hint = '';
    
    if (type === 'auto') {
        hint = `💡 ${logo.hint}`;
    } else {
        const hints = [
            `🏷️ Категория: ${logo.category}`,
            `📅 Год: ${logo.year}`,
            `🌍 Страна: ${logo.country}`,
            `📝 Описание: ${logo.description}`
        ];
        hint = `💎 ${hints[Math.floor(Math.random() * hints.length)]}`;
    }
    
    Elements.hintText.innerHTML = `<strong>${hint}</strong>`;
}

// Быстрая подсказка
function showQuickHint(type) {
    const logo = GameState.currentLogo;
    let hint = '';
    
    switch(type) {
        case 'category': 
            hint = `🏷️ Категория: ${logo.category}`; 
            break;
        case 'year': 
            hint = `📅 Год основания: ${logo.year}`; 
            break;
        case 'country': 
            hint = `🌍 Страна: ${logo.country}`; 
            break;
    }
    
    Elements.hintText.innerHTML = `<strong>${hint}</strong>`;
}

// Время вышло
function timeUp() {
    if (!GameState.gameActive) return;
    
    showNotification('⏰ Время вышло!', 'error');
    endRound(false);
}

// Обновление счета
function updateScore() {
    Elements.scoreValue.textContent = GameState.score;
    
    // Обновление рекорда
    if (GameState.score > GameState.highScore) {
        GameState.highScore = GameState.score;
        Elements.highScoreValue.textContent = GameState.highScore;
        localStorage.setItem('logoHighScore', GameState.highScore);
    }
}

// Конец игры
function endGame() {
    clearInterval(GameState.timer);
    clearTimeout(GameState.hintTimer);
    
    // Сохранение данных
    saveGameData();
    
    // Расчет статистики
    const accuracy = Math.round((GameState.correctAnswers / CONFIG.TOTAL_ROUNDS) * 100);
    const totalTime = Math.round(GameState.totalTime);
    const avgTime = Math.round(totalTime / CONFIG.TOTAL_ROUNDS);
    
    // Определение уровня
    let level = 'Новичок';
    let levelIcon = 'fas fa-seedling';
    let levelColor = '#94a3b8';
    let message = 'Попробуй ещё раз!';
    
    if (accuracy === 100) {
        level = 'БОГ БРЕНДОВ';
        levelIcon = 'fas fa-crown';
        levelColor = '#fbbf24';
        message = 'Ты знаешь логотипы лучше всех! 👑';
    } else if (accuracy >= 90) {
        level = 'Эксперт';
        levelIcon = 'fas fa-graduation-cap';
        levelColor = '#10b981';
        message = 'Потрясающий результат! 🌟';
    } else if (accuracy >= 75) {
        level = 'Знаток';
        levelIcon = 'fas fa-user-tie';
        levelColor = '#3b82f6';
        message = 'Отлично разбираешься в брендах! 💪';
    } else if (accuracy >= 60) {
        level = 'Фанат';
        levelIcon = 'fas fa-heart';
        levelColor = '#8b5cf6';
        message = 'Хороший результат! 📚';
    } else if (accuracy >= 40) {
        level = 'Начинающий';
        levelIcon = 'fas fa-user';
        levelColor = '#f59e0b';
        message = 'Неплохо! Продолжай тренироваться! 🔄';
    }
    
    // Показать результаты
    Elements.modalBody.innerHTML = `
        <div class="results-summary">
            <div class="level-badge" style="background: ${levelColor}20; border-color: ${levelColor}; color: ${levelColor}">
                <i class="${levelIcon}"></i> ${level}
            </div>
            
            <div class="results-grid">
                <div class="result-item">
                    <div class="result-value">${GameState.score}</div>
                    <div class="result-label">ОЧКИ</div>
                </div>
                
                <div class="result-item">
                    <div class="result-value">${accuracy}%</div>
                    <div class="result-label">ТОЧНОСТЬ</div>
                </div>
                
                <div class="result-item">
                    <div class="result-value">${GameState.correctAnswers}/${CONFIG.TOTAL_ROUNDS}</div>
                    <div class="result-label">ПРАВИЛЬНО</div>
                </div>
                
                <div class="result-item">
                    <div class="result-value">${avgTime}с</div>
                    <div class="result-label">СРЕДНЕЕ ВРЕМЯ</div>
                </div>
            </div>
            
            <div class="results-message">
                <p style="font-size: 1.2rem; font-weight: 600; color: ${levelColor}">${message}</p>
                <p style="margin-top: 15px; font-size: 0.95rem; color: var(--text-tertiary)">
                    Подсказок использовано: ${GameState.hintsUsed} | Пропущено: ${GameState.skipsUsed}
                </p>
            </div>
        </div>
    `;
    
    Elements.resultModal.style.display = 'flex';
}

// Сброс игры
function resetGame() {
    // Сброс состояния
    GameState.currentRound = 1;
    GameState.score = 0;
    GameState.timeLeft = CONFIG.TIME_PER_ROUND;
    GameState.currentLogo = null;
    GameState.usedLogoIds = [];
    GameState.gameActive = false;
    GameState.correctAnswers = 0;
    GameState.hintsUsed = 0;
    GameState.skipsUsed = 0;
    GameState.totalTime = 0;
    
    clearInterval(GameState.timer);
    clearTimeout(GameState.hintTimer);
    
    // Сброс интерфейса
    Elements.scoreValue.textContent = '0';
    Elements.timerValue.textContent = '60';
    Elements.timerDisplay.textContent = '60';
    Elements.roundValue.textContent = '1/10';
    Elements.answerInput.value = '';
    Elements.hintText.textContent = 'Подсказка появится через 15 секунд';
    Elements.resultOverlay.style.display = 'none';
    Elements.progressFill.style.width = '0%';
    Elements.progressPercent.textContent = '0%';
    Elements.logoPlaceholder.style.display = 'flex';
    Elements.logoImage.src = '';
    Elements.optionsGrid.innerHTML = '';
    
    // Сброс цвета таймера
    const timerBadge = document.querySelector('.timer-badge');
    if (timerBadge) timerBadge.classList.remove('low-time');
    
    // Обновление точек прогресса
    updateRoundDots();
    
    // Запуск новой игры
    setTimeout(startNewRound, 1000);
}

// Поделиться результатами
function shareResults() {
    const accuracy = Math.round((GameState.correctAnswers / CONFIG.TOTAL_ROUNDS) * 100);
    const text = `Я набрал ${GameState.score} очков в игре "Чей это логотип?"! Точность: ${accuracy}%. Попробуй и ты! 🎮 #логотипы #бренды #kirava`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Мой результат в игре "Чей это логотип?"',
            text: text,
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('📋 Результат скопирован!', 'success');
        });
    }
}

// Показать уведомление
function showNotification(message, type = 'info') {
    const colors = {
        info: { bg: 'linear-gradient(135deg, #0037ac, #002a8a)', color: 'white' },
        success: { bg: 'linear-gradient(135deg, #10b981, #059669)', color: 'white' },
        warning: { bg: 'linear-gradient(135deg, #f59e0b, #d97706)', color: 'white' },
        error: { bg: 'linear-gradient(135deg, #ef4444, #dc2626)', color: 'white' }
    };
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-${type === 'info' ? 'info-circle' : type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'exclamation-circle'}"></i>
        <span style="margin-left: 10px">${message}</span>
    `;
    notification.style.background = colors[type].bg;
    notification.style.color = colors[type].color;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%) scale(0.8)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Запуск игры при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Запуск игры "Чей это логотип?"');
    console.log('📊 Всего логотипов в базе:', LOGOS_DATABASE.length);
    
    // Скрыть загрузку
    setTimeout(() => {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 500);
        }
    }, 800);
    
    // Инициализация игры
    setTimeout(initGame, 500);
});