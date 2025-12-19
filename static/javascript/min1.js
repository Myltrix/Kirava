// ============================================
// ИГРА "УГАДАЙ СТРАНУ ПО ФЛАГУ" - ДЛЯ DJANGO
// Полная версия с флагами стран
// ============================================

// Конфигурация игры
const CONFIG = {
    TOTAL_ROUNDS: 15,
    TIME_PER_ROUND: 60,
    BASE_POINTS: 100,
    HINT_COST: 50,
    SKIP_COST: 25,
    HINT_DELAY: 15
};

// База данных стран и флагов (ДЛЯ DJANGO)
const COUNTRIES_DATABASE = [
    {
        id: 1,
        country: "Россия",
        capital: "Москва",
        continent: "Европа/Азия",
        population: "146 млн",
        language: "Русский",
        image: "/static/images/russia.png",
        hint: "Самая большая страна в мире",
        description: "Белый, синий, красный - три горизонтальных полосы",
        year: 1993,
        difficulty: "easy"
    },
    {
        id: 2,
        country: "США",
        capital: "Вашингтон",
        continent: "Северная Америка",
        population: "331 млн",
        language: "Английский",
        image: "/static/images/usa.png",
        hint: "Страна с 50 звёздами на флаге",
        description: "Красно-белые полосы, синий прямоугольник со звёздами",
        year: 1960,
        difficulty: "easy"
    },
    {
        id: 3,
        country: "Франция",
        capital: "Париж",
        continent: "Европа",
        population: "67 млн",
        language: "Французский",
        image: "/static/images/france.png",
        hint: "Синий, белый, красный - вертикальные полосы",
        description: "Три вертикальные полосы: синяя, белая, красная",
        year: 1794,
        difficulty: "easy"
    },
    {
        id: 4,
        country: "Германия",
        capital: "Берлин",
        continent: "Европа",
        population: "83 млн",
        language: "Немецкий",
        image: "/static/images/germany.png",
        hint: "Чёрный, красный, золотой - горизонтальные полосы",
        description: "Три горизонтальные полосы: чёрная, красная, золотая",
        year: 1949,
        difficulty: "easy"
    },
    {
        id: 5,
        country: "Япония",
        capital: "Токио",
        continent: "Азия",
        population: "126 млн",
        language: "Японский",
        image: "/static/images/japan.png",
        hint: "Белое полотно с красным кругом",
        description: "Белое поле с красным кругом в центре",
        year: 1999,
        difficulty: "easy"
    },
    {
        id: 6,
        country: "Италия",
        capital: "Рим",
        continent: "Европа",
        population: "60 млн",
        language: "Итальянский",
        image: "/static/images/italy.png",
        hint: "Зелёный, белый, красный - вертикальные полосы",
        description: "Три вертикальные полосы: зелёная, белая, красная",
        year: 1948,
        difficulty: "medium"
    },
    {
        id: 7,
        country: "Бразилия",
        capital: "Бразилиа",
        continent: "Южная Америка",
        population: "213 млн",
        language: "Португальский",
        image: "/static/images/brazil.png",
        hint: "Зелёное поле с жёлтым ромбом и синим кругом",
        description: "Зелёное поле, жёлтый ромб, синий круг со звёздами",
        year: 1992,
        difficulty: "medium"
    },
    {
        id: 8,
        country: "Канада",
        capital: "Оттава",
        continent: "Северная Америка",
        population: "38 млн",
        language: "Английский, Французский",
        image: "/static/images/canada.png",
        hint: "Красно-белый флаг с кленовым листом",
        description: "Красные полосы по бокам, белая середина с красным кленовым листом",
        year: 1965,
        difficulty: "medium"
    },
    {
        id: 9,
        country: "Австралия",
        capital: "Канберра",
        continent: "Океания",
        population: "26 млн",
        language: "Английский",
        image: "/static/images/australia.png",
        hint: "Синий флаг с британским флагом и звёздами",
        description: "Синее поле, британский флаг в углу, белые звёзды",
        year: 1908,
        difficulty: "medium"
    },
    {
        id: 10,
        country: "Испания",
        capital: "Мадрид",
        continent: "Европа",
        population: "47 млн",
        language: "Испанский",
        image: "/static/images/spain.png",
        hint: "Красно-жёлто-красные горизонтальные полосы",
        description: "Две красные и одна жёлтая полоса, герб слева",
        year: 1981,
        difficulty: "medium"
    },
    {
        id: 11,
        country: "Южная Корея",
        capital: "Сеул",
        continent: "Азия",
        population: "52 млн",
        language: "Корейский",
        image: "/static/images/south-korea.png",
        hint: "Белое поле с инь-ян и триграммами",
        description: "Белое поле, сине-красный инь-ян, чёрные триграммы",
        year: 1948,
        difficulty: "hard"
    },
    {
        id: 12,
        country: "ЮАР",
        capital: "Претория",
        continent: "Африка",
        population: "59 млн",
        language: "11 официальных",
        image: "/static/images/south-africa.png",
        hint: "Шесть цветов, буква Y в центре",
        description: "Красный, синий, зелёный, чёрный, белый, жёлтый",
        year: 1994,
        difficulty: "hard"
    },
    {
        id: 13,
        country: "Мексика",
        capital: "Мехико",
        continent: "Северная Америка",
        population: "128 млн",
        language: "Испанский",
        image: "/static/images/mexico.png",
        hint: "Зелёный, белый, красный с орлом",
        description: "Три вертикальные полосы: зелёная, белая с гербом, красная",
        year: 1968,
        difficulty: "hard"
    },
    {
        id: 14,
        country: "Индия",
        capital: "Нью-Дели",
        continent: "Азия",
        population: "1.4 млрд",
        language: "Хинди, Английский",
        image: "/static/images/india.png",
        hint: "Оранжевый, белый, зелёный с колесом",
        description: "Три горизонтальные полосы: шафрановая, белая, зелёная, колесо в центре",
        year: 1947,
        difficulty: "hard"
    },
    {
        id: 15,
        country: "Швейцария",
        capital: "Берн",
        continent: "Европа",
        population: "8.6 млн",
        language: "Немецкий, Французский, Итальянский",
        image: "/static/images/switzerland.png",
        hint: "Красный квадрат с белым крестом",
        description: "Красное квадратное поле с белым крестом в центре",
        year: 1889,
        difficulty: "hard"
    },
    {
        id: 16,
        country: "Непал",
        capital: "Катманду",
        continent: "Азия",
        population: "30 млн",
        language: "Непали",
        image: "/static/images/nepal.png",
        hint: "Единственный непрямоугольный флаг",
        description: "Два треугольника, синее обрамление, солнце и луна",
        year: 1962,
        difficulty: "expert"
    },
    {
        id: 17,
        country: "Ватикан",
        capital: "Ватикан",
        continent: "Европа",
        population: "825",
        language: "Латинский, Итальянский",
        image: "/static/images/vatican.png",
        hint: "Самый маленький флаг государства",
        description: "Две вертикальные полосы: жёлтая и белая с гербом",
        year: 1929,
        difficulty: "expert"
    },
    {
        id: 18,
        country: "Кипр",
        capital: "Никосия",
        continent: "Европа",
        population: "1.2 млн",
        language: "Греческий, Турецкий",
        image: "/static/images/cyprus.png",
        hint: "Флаг с картой страны",
        description: "Белое поле с оранжевой картой страны и оливковыми ветвями",
        year: 1960,
        difficulty: "expert"
    },
    {
        id: 19,
        country: "Мозамбик",
        capital: "Мапуту",
        continent: "Африка",
        population: "31 млн",
        language: "Португальский",
        image: "/static/images/mozambique.png",
        hint: "Флаг с изображением автомата",
        description: "Три полосы, треугольник, звезда, книга, мотыга, автомат",
        year: 1983,
        difficulty: "expert"
    },
    {
        id: 20,
        country: "Бутан",
        capital: "Тхимпху",
        continent: "Азия",
        population: "771 тыс",
        language: "Дзонг-кэ",
        image: "/static/images/bhutan.png",
        hint: "Флаг с драконом",
        description: "Диагональные оранжевый и жёлтый, белый дракон",
        year: 1969,
        difficulty: "expert"
    }
];

// Состояние игры
const GameState = {
    currentRound: 1,
    score: 0,
    highScore: 0,
    timeLeft: CONFIG.TIME_PER_ROUND,
    currentCountry: null,
    usedCountryIds: [],
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
    flagImage: document.getElementById('flagImage'),
    hintText: document.getElementById('hintText'),
    difficultyText: document.getElementById('difficultyText'),
    timerDisplay: document.getElementById('timerDisplay'),
    answerInput: document.getElementById('answerInput'),
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
    console.log('🎮 Игра "Угадай страну по флагу" запущена');
    
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
    const savedHighScore = localStorage.getItem('flagGameHighScore');
    if (savedHighScore) {
        GameState.highScore = parseInt(savedHighScore);
        Elements.highScoreValue.textContent = GameState.highScore;
    }
}

// Сохранение данных игры
function saveGameData() {
    if (GameState.score > GameState.highScore) {
        GameState.highScore = GameState.score;
        localStorage.setItem('flagGameHighScore', GameState.highScore);
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
    
    // Выбор случайной страны
    GameState.currentCountry = getRandomCountry();
    if (!GameState.currentCountry) {
        alert('Ошибка: не удалось загрузить страны!');
        return;
    }
    
    // Загрузка изображения флага
    const flagImg = Elements.flagImage;
    flagImg.src = GameState.currentCountry.image;
    flagImg.onload = () => {
        document.getElementById('characterPlaceholder').style.display = 'none';
        flagImg.style.opacity = '1';
    };
    flagImg.onerror = () => {
        const placeholder = document.getElementById('characterPlaceholder');
        placeholder.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <span>Ошибка загрузки флага</span>
            <span>${GameState.currentCountry.country}</span>
        `;
    };
    
    // Обновление сложности
    updateDifficultyDisplay();
    
    // Генерация вариантов ответов
    generateCountryOptions();
    
    // Запуск таймеров
    startTimers();
    
    // Сброс подсказки
    Elements.hintText.textContent = 'Подсказка появится через 15 секунд';
    
    // Фокус на поле ввода
    setTimeout(() => {
        Elements.answerInput.focus();
    }, 300);
}

// Получение случайной страны
function getRandomCountry() {
    // Фильтрация по сложности
    let availableCountries = COUNTRIES_DATABASE.filter(country => {
        if (GameState.usedCountryIds.includes(country.id)) return false;
        
        // Прогрессивная сложность
        if (GameState.currentRound <= 5) return country.difficulty === 'easy';
        if (GameState.currentRound <= 10) return ['easy', 'medium'].includes(country.difficulty);
        if (GameState.currentRound <= 13) return ['medium', 'hard'].includes(country.difficulty);
        return true;
    });
    
    // Если все страны использованы, сбросить список
    if (availableCountries.length === 0) {
        GameState.usedCountryIds = [];
        return getRandomCountry();
    }
    
    // Выбор случайной страны
    const randomIndex = Math.floor(Math.random() * availableCountries.length);
    const selectedCountry = availableCountries[randomIndex];
    
    // Добавление в использованные
    GameState.usedCountryIds.push(selectedCountry.id);
    
    return selectedCountry;
}

// Обновление отображения сложности
function updateDifficultyDisplay() {
    const difficultyText = {
        easy: 'Легкий',
        medium: 'Средний',
        hard: 'Сложный',
        expert: 'Эксперт'
    };
    
    const difficultyColors = {
        easy: '#10b981',
        medium: '#f59e0b',
        hard: '#ef4444',
        expert: '#8b5cf6'
    };
    
    const difficulty = GameState.currentCountry.difficulty;
    Elements.difficultyText.textContent = `${difficultyText[difficulty]} уровень`;
    
    // Обновление цвета
    const badgeIcon = document.querySelector('.difficulty-badge i');
    if (badgeIcon) {
        badgeIcon.style.color = difficultyColors[difficulty];
    }
}

// Генерация вариантов ответов
function generateCountryOptions() {
    Elements.optionsGrid.innerHTML = '';
    
    const correctCountry = GameState.currentCountry.country;
    
    // Получаем уникальные названия стран
    const allCountries = COUNTRIES_DATABASE
        .map(country => country.country)
        .filter((value, index, self) => self.indexOf(value) === index);
    
    // Исключаем правильный ответ
    const wrongCountries = allCountries
        .filter(country => country !== correctCountry)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
    
    // Смешиваем правильный и неправильные ответы
    const allOptions = [correctCountry, ...wrongCountries]
        .sort(() => Math.random() - 0.5);
    
    allOptions.forEach((country, index) => {
        const option = document.createElement('div');
        option.className = 'option-btn';
        option.innerHTML = `
            <i class="fas fa-flag"></i>
            <span>${country}</span>
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
        showNotification('Введите название страны!', 'error');
        return;
    }
    
    const isCorrect = checkAnswer(userAnswer);
    endRound(isCorrect);
}

// Проверка ответа
function checkAnswer(userAnswer) {
    const correctAnswer = GameState.currentCountry.country.toLowerCase();
    const userAnswerLower = userAnswer.toLowerCase();
    
    // Прямое совпадение
    if (userAnswerLower === correctAnswer) return true;
    
    // Синонимы и альтернативные названия
    const synonyms = {
        'соединенные штаты': 'сша',
        'соединённые штаты': 'сша',
        'америка': 'сша',
        'соединенные штаты америки': 'сша',
        'великобритания': 'великобритания',
        'британия': 'великобритания',
        'соединенное королевство': 'великобритания',
        'англия': 'великобритания',
        'российская федерация': 'россия',
        'рф': 'россия',
        'корея': 'южная корея',
        'кнр': 'китай',
        'китайская народная республика': 'китай'
    };
    
    const normalizedUser = synonyms[userAnswerLower] || userAnswerLower;
    const normalizedCorrect = synonyms[correctAnswer] || correctAnswer;
    
    if (normalizedUser === normalizedCorrect) return true;
    
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
        
        // Множитель сложности
        const difficultyMultipliers = {
            easy: 0.8,
            medium: 1.0,
            hard: 1.3,
            expert: 1.5
        };
        const multiplier = difficultyMultipliers[GameState.currentCountry.difficulty];
        roundScore = Math.round(roundScore * multiplier);
        
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
    const country = GameState.currentCountry;
    
    // Настройка панели результатов
    Elements.resultOverlay.style.display = 'flex';
    
    if (isCorrect) {
        Elements.resultPopup.className = 'result-popup success';
        Elements.resultPopup.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <h3>Правильно!</h3>
            <p>Страна: <strong>${country.country}</strong></p>
            <p>Столица: <strong>${country.capital}</strong></p>
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
            <p>Это была страна: <strong>"${country.country}"</strong></p>
            <p>Столица: ${country.capital}</p>
            <div style="margin-top: 15px; padding: 10px; background: rgba(239, 68, 68, 0.1); border-radius: 10px;">
                Население: ${country.population}<br>
                Континент: ${country.continent}
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
    const country = GameState.currentCountry;
    let hint = '';
    
    if (type === 'auto') {
        hint = `💡 ${country.hint}`;
    } else {
        const hints = [
            `🌍 Континент: ${country.continent}`,
            `🏛️ Столица: ${country.capital}`,
            `👥 Население: ${country.population}`,
            `🗣️ Язык: ${country.language}`,
            `📅 Год принятия флага: ${country.year}`
        ];
        hint = `💎 ${hints[Math.floor(Math.random() * hints.length)]}`;
    }
    
    Elements.hintText.innerHTML = `<strong>${hint}</strong>`;
}

// Быстрая подсказка
function showQuickHint(type) {
    const country = GameState.currentCountry;
    let hint = '';
    
    switch(type) {
        case 'continent': 
            hint = `🌍 Континент: ${country.continent}`; 
            break;
        case 'capital': 
            hint = `🏛️ Столица: ${country.capital}`; 
            break;
        case 'population': 
            hint = `👥 Население: ${country.population}`; 
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
        localStorage.setItem('flagGameHighScore', GameState.highScore);
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
        level = 'ГЕОГРАФИЧЕСКИЙ ГЕНИЙ';
        levelIcon = 'fas fa-crown';
        levelColor = '#fbbf24';
        message = 'Ты знаешь флаги лучше всех! 👑';
    } else if (accuracy >= 90) {
        level = 'Эксперт';
        levelIcon = 'fas fa-graduation-cap';
        levelColor = '#10b981';
        message = 'Потрясающий результат! 🌟';
    } else if (accuracy >= 75) {
        level = 'Знаток';
        levelIcon = 'fas fa-globe-americas';
        levelColor = '#3b82f6';
        message = 'Отлично разбираешься в флагах! 💪';
    } else if (accuracy >= 60) {
        level = 'Путешественник';
        levelIcon = 'fas fa-passport';
        levelColor = '#8b5cf6';
        message = 'Хороший результат! 📚';
    } else if (accuracy >= 40) {
        level = 'Турист';
        levelIcon = 'fas fa-user';
        levelColor = '#f59e0b';
        message = 'Неплохо! Изучай географию дальше! 🔄';
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
    GameState.currentCountry = null;
    GameState.usedCountryIds = [];
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
    Elements.roundValue.textContent = '1/15';
    Elements.answerInput.value = '';
    Elements.hintText.textContent = 'Подсказка появится через 15 секунд';
    Elements.resultOverlay.style.display = 'none';
    Elements.progressFill.style.width = '0%';
    Elements.progressPercent.textContent = '0%';
    document.getElementById('characterPlaceholder').style.display = 'flex';
    Elements.flagImage.src = '';
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
    const text = `Я набрал ${GameState.score} очков в игре "Угадай страну по флагу"! Точность: ${accuracy}%. Проверь свои знания географии! 🏳️ #флаги #страны #география`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Мой результат в игре "Угадай страну по флагу"',
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
    console.log('🚀 Запуск игры "Угадай страну по флагу"');
    console.log('🏳️ Всего стран в базе:', COUNTRIES_DATABASE.length);
    
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