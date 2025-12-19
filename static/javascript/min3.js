// ============================================
// ИГРА "УГАДАЙ ПЛАНЕТУ"
// Версия с планетами Солнечной системы
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

// База данных планет (с путями Django)
const PLANETS_DATABASE = [
    {
        id: 1,
        name: "Меркурий",
        image: "/static/images/mercury.png",
        type: "Планета земной группы",
        position: 1,
        diameter: "4,879 км",
        satellites: 0,
        yearLength: "88 земных дней",
        temperature: "-173°C до 427°C",
        facts: "Самая маленькая планета",
        hint: "Ближайшая к Солнцу",
        difficulty: "easy"
    },
    {
        id: 2,
        name: "Венера",
        image: "/static/images/venus.png",
        type: "Планета земной группы",
        position: 2,
        diameter: "12,104 км",
        satellites: 0,
        yearLength: "225 земных дней",
        temperature: "462°C",
        facts: "Самая горячая планета",
        hint: "Утренняя и вечерняя звезда",
        difficulty: "easy"
    },
    {
        id: 3,
        name: "Земля",
        image: "/static/images/earth.png",
        type: "Планета земной группы",
        position: 3,
        diameter: "12,742 км",
        satellites: 1,
        yearLength: "365 дней",
        temperature: "-88°C до 58°C",
        facts: "Единственная планета с жизнью",
        hint: "Наш дом",
        difficulty: "easy"
    },
    {
        id: 4,
        name: "Марс",
        image: "/static/images/mars.png",
        type: "Планета земной группы",
        position: 4,
        diameter: "6,779 км",
        satellites: 2,
        yearLength: "687 земных дней",
        temperature: "-153°C до 20°C",
        facts: "Красная планета",
        hint: "Красный цвет из-за оксида железа",
        difficulty: "easy"
    },
    {
        id: 5,
        name: "Юпитер",
        image: "/static/images/jupiter.png",
        type: "Газовый гигант",
        position: 5,
        diameter: "139,820 км",
        satellites: 79,
        yearLength: "12 земных лет",
        temperature: "-108°C",
        facts: "Самая большая планета",
        hint: "Имеет Большое Красное Пятно",
        difficulty: "medium"
    },
    {
        id: 6,
        name: "Сатурн",
        image: "/static/images/saturn.png",
        type: "Газовый гигант",
        position: 6,
        diameter: "116,460 км",
        satellites: 82,
        yearLength: "29 земных лет",
        temperature: "-139°C",
        facts: "Имеет ярко выраженные кольца",
        hint: "Кольца изо льда и камней",
        difficulty: "medium"
    },
    {
        id: 7,
        name: "Уран",
        image: "/static/images/uranus.png",
        type: "Ледяной гигант",
        position: 7,
        diameter: "50,724 км",
        satellites: 27,
        yearLength: "84 земных года",
        temperature: "-197°C",
        facts: "Вращается на боку",
        hint: "Бледно-голубой цвет",
        difficulty: "hard"
    },
    {
        id: 8,
        name: "Нептун",
        image: "/static/images/neptune.png",
        type: "Ледяной гигант",
        position: 8,
        diameter: "49,244 км",
        satellites: 14,
        yearLength: "165 земных лет",
        temperature: "-201°C",
        facts: "Самый ветреный - ураганы до 2100 км/ч",
        hint: "Глубокая синяя планета",
        difficulty: "hard"
    },
    {
        id: 9,
        name: "Плутон",
        image: "/static/images/pluto.png",
        type: "Карликовая планета",
        position: 9,
        diameter: "2,377 км",
        satellites: 5,
        yearLength: "248 земных лет",
        temperature: "-229°C",
        facts: "Бывшая 9-я планета",
        hint: "Карликовая планета в Поясе Койпера",
        difficulty: "hard"
    },
    {
        id: 10,
        name: "Луна",
        image: "/static/images/moon.png",
        type: "Естественный спутник",
        position: 0,
        diameter: "3,474 км",
        satellites: 0,
        yearLength: "27.3 дня",
        temperature: "-173°C до 127°C",
        facts: "Естественный спутник Земли",
        hint: "Видна с Земли каждую ночь",
        difficulty: "medium"
    },
    {
        id: 11,
        name: "Титан",
        image: "/static/images/titan.png",
        type: "Спутник Сатурна",
        position: 0,
        diameter: "5,150 км",
        satellites: 0,
        yearLength: "16 земных дней",
        temperature: "-179°C",
        facts: "Имеет плотную атмосферу",
        hint: "Крупнейший спутник Сатурна",
        difficulty: "hard"
    },
    {
        id: 12,
        name: "Ио",
        image: "/static/images/io.png",
        type: "Спутник Юпитера",
        position: 0,
        diameter: "3,643 км",
        satellites: 0,
        yearLength: "1.8 земных дня",
        temperature: "-143°C",
        facts: "Самое вулканически активное тело",
        hint: "Спутник с вулканами",
        difficulty: "hard"
    },
    {
        id: 13,
        name: "Европа",
        image: "/static/images/europa.png",
        type: "Спутник Юпитера",
        position: 0,
        diameter: "3,122 км",
        satellites: 0,
        yearLength: "3.5 земных дня",
        temperature: "-160°C",
        facts: "Подледный океан с водой",
        hint: "Ледяной спутник Юпитера",
        difficulty: "hard"
    },
    {
        id: 14,
        name: "Ганимед",
        image: "/static/images/ganymede.png",
        type: "Спутник Юпитера",
        position: 0,
        diameter: "5,262 км",
        satellites: 0,
        yearLength: "7.2 земных дня",
        temperature: "-163°C",
        facts: "Крупнейший спутник в Солнечной системе",
        hint: "Больше планеты Меркурий",
        difficulty: "hard"
    }
];

// Состояние игры
const GameState = {
    currentRound: 1,
    score: 0,
    highScore: 0,
    timeLeft: CONFIG.TIME_PER_ROUND,
    currentPlanet: null,
    usedPlanetIds: [],
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
    planetImage: document.getElementById('planetImage'),
    planetPlaceholder: document.getElementById('planetPlaceholder'),
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
    console.log('🚀 Игра "Угадай планету" запущена');
    
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
    const savedHighScore = localStorage.getItem('planetHighScore');
    if (savedHighScore) {
        GameState.highScore = parseInt(savedHighScore);
        Elements.highScoreValue.textContent = GameState.highScore;
    }
}

// Сохранение данных игры
function saveGameData() {
    if (GameState.score > GameState.highScore) {
        GameState.highScore = GameState.score;
        localStorage.setItem('planetHighScore', GameState.highScore);
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
    
    // Выбор случайной планеты
    GameState.currentPlanet = getRandomPlanet();
    if (!GameState.currentPlanet) {
        alert('Ошибка: не удалось загрузить планеты!');
        return;
    }
    
    // Загрузка изображения
    const planetImg = Elements.planetImage;
    planetImg.src = GameState.currentPlanet.image;
    planetImg.onload = () => {
        Elements.planetPlaceholder.style.display = 'none';
        planetImg.style.opacity = '1';
    };
    planetImg.onerror = () => {
        Elements.planetPlaceholder.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <span>Ошибка загрузки планеты</span>
            <span>${GameState.currentPlanet.name}</span>
        `;
    };
    
    // Обновление сложности
    updateDifficultyDisplay();
    
    // Генерация вариантов ответов
    generatePlanetOptions();
    
    // Запуск таймеров
    startTimers();
    
    // Сброс подсказки
    Elements.hintText.textContent = 'Подсказка появится через 15 секунд';
    
    // Фокус на поле ввода
    setTimeout(() => {
        Elements.answerInput.focus();
    }, 300);
}

// Получение случайной планеты
function getRandomPlanet() {
    // Фильтрация по сложности
    let availablePlanets = PLANETS_DATABASE.filter(planet => {
        if (GameState.usedPlanetIds.includes(planet.id)) return false;
        
        // Прогрессивная сложность
        if (GameState.currentRound <= 3) return planet.difficulty === 'easy';
        if (GameState.currentRound <= 7) return ['easy', 'medium'].includes(planet.difficulty);
        if (GameState.currentRound <= 9) return ['medium', 'hard'].includes(planet.difficulty);
        return true;
    });
    
    // Если все планеты использованы, сбросить список
    if (availablePlanets.length === 0) {
        GameState.usedPlanetIds = [];
        return getRandomPlanet();
    }
    
    // Выбор случайной планеты
    const randomIndex = Math.floor(Math.random() * availablePlanets.length);
    const selectedPlanet = availablePlanets[randomIndex];
    
    // Добавление в использованные
    GameState.usedPlanetIds.push(selectedPlanet.id);
    
    return selectedPlanet;
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
    
    const difficulty = GameState.currentPlanet.difficulty;
    Elements.difficultyText.textContent = `${difficultyText[difficulty]} уровень`;
    
    // Обновление цвета
    const badgeIcon = document.querySelector('.difficulty-badge i');
    if (badgeIcon) {
        badgeIcon.style.color = difficultyColors[difficulty];
    }
}

// Генерация вариантов ответов
function generatePlanetOptions() {
    Elements.optionsGrid.innerHTML = '';
    
    const correctPlanet = GameState.currentPlanet.name;
    
    // Получаем уникальные названия планет
    const allPlanets = PLANETS_DATABASE
        .map(planet => planet.name)
        .filter((value, index, self) => self.indexOf(value) === index);
    
    // Исключаем правильный ответ
    const wrongPlanets = allPlanets
        .filter(planet => planet !== correctPlanet)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
    
    // Смешиваем правильный и неправильные ответы
    const allOptions = [correctPlanet, ...wrongPlanets]
        .sort(() => Math.random() - 0.5);
    
    allOptions.forEach((planet, index) => {
        const option = document.createElement('div');
        option.className = 'option-btn';
        
        // Выбор иконки в зависимости от типа планеты
        const planetData = PLANETS_DATABASE.find(p => p.name === planet);
        let icon = 'fas fa-globe';
        if (planetData) {
            if (planetData.type.includes('спутник')) icon = 'fas fa-moon';
            else if (planetData.type.includes('гигант')) icon = 'fas fa-expand-arrows-alt';
            else if (planetData.type.includes('земной')) icon = 'fas fa-globe-americas';
            else if (planetData.type.includes('карлик')) icon = 'fas fa-asterisk';
        }
        
        option.innerHTML = `
            <i class="${icon}"></i>
            <span>${planet}</span>
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
        showNotification('Введите название планеты!', 'error');
        return;
    }
    
    const isCorrect = checkAnswer(userAnswer);
    endRound(isCorrect);
}

// Проверка ответа
function checkAnswer(userAnswer) {
    const correctAnswer = GameState.currentPlanet.name.toLowerCase();
    const userAnswerLower = userAnswer.toLowerCase();
    
    // Прямое совпадение
    if (userAnswerLower === correctAnswer) return true;
    
    // Удаление спецсимволов
    const cleanUser = userAnswerLower.replace(/[^\w\sа-яё]/gi, '').replace(/\s+/g, ' ').trim();
    const cleanCorrect = correctAnswer.replace(/[^\w\sа-яё]/gi, '').replace(/\s+/g, ' ').trim();
    
    if (cleanUser === cleanCorrect) return true;
    
    // Частичное совпадение для планет
    const planetSynonyms = {
        'меркурий': ['меркурий'],
        'венера': ['венера'],
        'земля': ['земля', 'наша планета'],
        'марс': ['марс', 'красная планета'],
        'юпитер': ['юпитер'],
        'сатурн': ['сатурн'],
        'уран': ['уран'],
        'нептун': ['нептун'],
        'плутон': ['плутон'],
        'луна': ['луна', 'спутник земли']
    };
    
    if (planetSynonyms[cleanCorrect]?.includes(cleanUser)) {
        return true;
    }
    
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
    const planet = GameState.currentPlanet;
    
    // Настройка панели результатов
    Elements.resultOverlay.style.display = 'flex';
    
    if (isCorrect) {
        Elements.resultPopup.className = 'result-popup success';
        Elements.resultPopup.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <h3>Правильно!</h3>
            <p>Планета: <strong>${planet.name}</strong></p>
            <p>Тип: <strong>${planet.type}</strong></p>
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
            <p>Это: <strong>${planet.name}</strong></p>
            <p>Тип: ${planet.type}</p>
            <div style="margin-top: 15px; padding: 10px; background: rgba(239, 68, 68, 0.1); border-radius: 10px;">
                Диаметр: ${planet.diameter}<br>
                Спутники: ${planet.satellites}
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
    const planet = GameState.currentPlanet;
    let hint = '';
    
    if (type === 'auto') {
        hint = `💡 ${planet.hint}`;
    } else {
        const hints = [
            `🌌 Тип: ${planet.type}`,
            `📍 Позиция: ${planet.position || 'спутник'}`,
            `📏 Диаметр: ${planet.diameter}`,
            `🛰️ Спутники: ${planet.satellites}`,
            `📅 Год: ${planet.yearLength}`,
            `🌡️ Температура: ${planet.temperature}`,
            `✨ Факт: ${planet.facts}`
        ];
        hint = `💎 ${hints[Math.floor(Math.random() * hints.length)]}`;
    }
    
    Elements.hintText.innerHTML = `<strong>${hint}</strong>`;
}

// Быстрая подсказка
function showQuickHint(type) {
    const planet = GameState.currentPlanet;
    let hint = '';
    
    switch(type) {
        case 'type': 
            hint = `🌌 Тип: ${planet.type}`; 
            break;
        case 'position': 
            hint = `📍 Позиция от Солнца: ${planet.position || 'спутник'}`; 
            break;
        case 'satellites': 
            hint = `🛰️ Спутники: ${planet.satellites}`; 
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
        localStorage.setItem('planetHighScore', GameState.highScore);
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
    let levelIcon = 'fas fa-rocket';
    let levelColor = '#94a3b8';
    let message = 'Попробуй ещё раз!';
    
    if (accuracy === 100) {
        level = 'КОСМИЧЕСКИЙ ГЕНИЙ';
        levelIcon = 'fas fa-user-astronaut';
        levelColor = '#fbbf24';
        message = 'Ты настоящий эксперт по планетам! 👨‍🚀';
    } else if (accuracy >= 90) {
        level = 'Астроном';
        levelIcon = 'fas fa-telescope';
        levelColor = '#10b981';
        message = 'Потрясающие знания планет! 🌟';
    } else if (accuracy >= 75) {
        level = 'Космический путешественник';
        levelIcon = 'fas fa-space-shuttle';
        levelColor = '#3b82f6';
        message = 'Отлично разбираешься в космосе! 🚀';
    } else if (accuracy >= 60) {
        level = 'Любитель астрономии';
        levelIcon = 'fas fa-star';
        levelColor = '#8b5cf6';
        message = 'Хороший результат! 📚';
    } else if (accuracy >= 40) {
        level = 'Начинающий космонавт';
        levelIcon = 'fas fa-user';
        levelColor = '#f59e0b';
        message = 'Неплохо! Изучай планеты дальше! 🔭';
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
                    Изучено планет: ${GameState.correctAnswers} | Подсказок: ${GameState.hintsUsed} | Пропущено: ${GameState.skipsUsed}
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
    GameState.currentPlanet = null;
    GameState.usedPlanetIds = [];
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
    Elements.planetPlaceholder.style.display = 'flex';
    Elements.planetImage.src = '';
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
    const text = `Я набрал ${GameState.score} очков в игре "Угадай планету"! Точность: ${accuracy}%. Попробуй и ты! 🪐 #планеты #космос #kirava`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Мой результат в игре "Угадай планету"',
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
        warning: { bg: 'linear-gradient(135deg, #0037ac, #002a8a)', color: 'white' },
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
    console.log('🚀 Запуск игры "Угадай планету"');
    console.log('🪐 Всего планет в базе:', PLANETS_DATABASE.length);
    
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