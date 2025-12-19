// ============================================
// ИГРА "КТО ИЗ НАРУТО?" - ДЛЯ DJANGO
// База данных персонажей вселенной Наруто
// ============================================

// Конфигурация игры
const CONFIG = {
    TOTAL_ROUNDS: 15,
    TIME_PER_ROUND: 45,
    BASE_POINTS: 120,
    TIME_BONUS_MULTIPLIER: 2.5,
    HINT_COST: 30,
    SKIP_COST: 15,
    HINT_DELAY: 10,
    DIFFICULTY_MULTIPLIERS: {
        easy: 0.7,
        medium: 1.0,
        hard: 1.4,
        expert: 2.0
    }
};

// БАЗА ДАННЫХ ПЕРСОНАЖЕЙ НАРУТО (ДЛЯ DJANGO)
const NARUTO_CHARACTERS = [
    // Легкие персонажи
    {
        id: 1,
        name: "Наруто Узумаки",
        image: "/static/images/naruto.jpg",
        ability: "Расенган, Режим Мудреца, Курама",
        clan: "Узумаки (Коноха)",
        quote: "Я буду Хокаге, поверь мне!",
        rank: "Хокаге",
        arc: "Основной герой",
        hint: "Главный герой, оранжевая одежда",
        difficulty: "easy"
    },
    {
        id: 2,
        name: "Саске Учиха",
        image: "/static/images/sasuke.jpg",
        ability: "Шаринган, Чидори, Аматерасу",
        clan: "Учиха (Коноха)",
        quote: "Моя месть... это всё, что у меня есть.",
        rank: "Ронин",
        arc: "Основной герой",
        hint: "Друг Наруто, чёрные волосы, шаринган",
        difficulty: "easy"
    },
    {
        id: 3,
        name: "Сакура Харуно",
        image: "/static/images/sakura.jpg",
        ability: "Медицинские техники, Супер сила",
        clan: "Харуно (Коноха)",
        quote: "Наруто... спасибо.",
        rank: "Джоунин",
        arc: "Основной герой",
        hint: "Розовые волосы, команда 7",
        difficulty: "easy"
    },
    {
        id: 4,
        name: "Какаши Хатаке",
        image: "/static/images/kakashi.jpg",
        ability: "Шаринган, Чидори, 1000 джутсу",
        clan: "Хатаке (Коноха)",
        quote: "Те, кто нарушают правила - отбросы, но те, кто бросают друзей - хуже чем отбросы.",
        rank: "Хокаге (6-й)",
        arc: "Какаши-сэнсей",
        hint: "Маска, серебряные волосы, копирующий ниндзя",
        difficulty: "easy"
    },
    {
        id: 5,
        name: "Хината Хьюга",
        image: "/static/images/hinata.jpg",
        ability: "Бякуган, Нежный Кулак",
        clan: "Хьюга (Коноха)",
        quote: "Благодаря тебе, я нашла себя.",
        rank: "Чунин",
        arc: "Романтический интерес",
        hint: "Белые глаза, застенчивая, любит Наруто",
        difficulty: "easy"
    },
    
    // Средние персонажи
    {
        id: 6,
        name: "Шикамару Нара",
        image: "/static/images/shikamaru.jpg",
        ability: "Теневые техники, Гениальный стратег",
        clan: "Нара (Коноха)",
        quote: "Какая обуза...",
        rank: "Джоунин",
        arc: "Стратег Конохи",
        hint: "Ленивый гений, техника теней",
        difficulty: "medium"
    },
    {
        id: 7,
        name: "Рок Ли",
        image: "/static/images/rocklee.jpg",
        ability: "Восемь Врат, Тайдзютсу",
        clan: "Нет (Коноха)",
        quote: "Гений — это 1% таланта и 99% труда!",
        rank: "Джоунин",
        arc: "Мастер тайдзютсу",
        hint: "Бровей, зелёный костюм, не использует ниндзютсу",
        difficulty: "medium"
    },
    {
        id: 8,
        name: "Неджи Хьюга",
        image: "/static/images/neji.jpg",
        ability: "Бякуган, Нежный Кулак, 64 ладони",
        clan: "Хьюга (Коноха)",
        quote: "Судьба нельзя изменить... или можно?",
        rank: "Джоунин",
        arc: "Гений клана Хьюга",
        hint: "Гений клана Хьюга, белые глаза",
        difficulty: "medium"
    },
    {
        id: 9,
        name: "Гаара",
        image: "/static/images/gaara.jpg",
        ability: "Песочные техники, Шукаку",
        clan: "Нет (Солнечная)",
        quote: "Я защищаю тех, кто мне дорог.",
        rank: "Кадзекэ (5-й)",
        arc: "Из Солнечной, друг Наруто",
        hint: "Песочный ниндзя, бывший джинчуурики",
        difficulty: "medium"
    },
    {
        id: 10,
        name: "Киба Инузука",
        image: "/static/images/kiba.jpg",
        ability: "Техники с Акамару, Человек-зверь",
        clan: "Инузука (Коноха)",
        quote: "Чувствуй запах страха!",
        rank: "Джоунин",
        arc: "Команда Кибы",
        hint: "Парень с собакой, отметины на лице",
        difficulty: "medium"
    },
    
    // Сложные персонажи
    {
        id: 11,
        name: "Орочимару",
        image: "/static/images/orochimaru.jpg",
        ability: "Бессмертие, Змеиные техники",
        clan: "Нет (Беглый ниндзя)",
        quote: "Жизнь не имеет смысла, если не найти что-то вечное.",
        rank: "Саннин",
        arc: "Легендарный Саннин",
        hint: "Змеиный Саннин, ищет бессмертие",
        difficulty: "hard"
    },
    {
        id: 12,
        name: "Цунаде",
        image: "/static/images/tsunade.jpg",
        ability: "Медицинские техники, Супер сила",
        clan: "Сенджу (Коноха)",
        quote: "Я буду Хокаге Пятой!",
        rank: "Хокаге (5-я)",
        arc: "Легендарный Саннин",
        hint: "Величайший ниндзя-медик, Хокаге",
        difficulty: "hard"
    },
    {
        id: 13,
        name: "Джирайя",
        image: "/static/images/jiraiya.jpg",
        ability: "Техники жаб, Расенган",
        clan: "Нет (Коноха)",
        quote: "Настоящая сила приходит, когда ты защищаешь кого-то дорогого.",
        rank: "Саннин",
        arc: "Легендарный Саннин",
        hint: "Мастер жаб, учитель Наруто",
        difficulty: "hard"
    },
    {
        id: 14,
        name: "Итачи Учиха",
        image: "/static/images/itachi.jpg",
        ability: "Мангекё Шаринган, Цукуёми, Аматерасу",
        clan: "Учиха (Коноха)",
        quote: "Иногда нужно жертвовать собой ради мира.",
        rank: "Акацуки",
        arc: "Трагедия клана Учиха",
        hint: "Брат Саске, член Акацуки",
        difficulty: "hard"
    },
    {
        id: 15,
        name: "Пейн",
        image: "/static/images/pain.jpg",
        ability: "Риннеган, Шинра Тенсей",
        clan: "Нет (Деревня Дождя)",
        quote: "Боль... поможет тебе понять мир.",
        rank: "Лидер Акацуки",
        arc: "Нагато/Пейн",
        hint: "Лидер Акацуки, риннеган",
        difficulty: "hard"
    },
    
    // Экспертные персонажи
    {
        id: 16,
        name: "Мадара Учиха",
        image: "/static/images/madara.jpg",
        ability: "Вечный Мангекё, Сусанно, Лимубо",
        clan: "Учиха",
        quote: "Wake up to reality!",
        rank: "Основатель Конохи",
        arc: "Война Ниндзя",
        hint: "Легендарный Учиха, вечный враг Хаширамы",
        difficulty: "expert"
    },
    {
        id: 17,
        name: "Хаширама Сенджу",
        image: "/static/images/hashirama.jpg",
        ability: "Деревянный релиз, Режим Мудреца",
        clan: "Сенджу",
        quote: "Дети - это будущее.",
        rank: "Хокаге (1-й)",
        arc: "Эпоха Войн",
        hint: "Первый Хокаге, Бог ниндзя",
        difficulty: "expert"
    },
    {
        id: 18,
        name: "Минато Намиказе",
        image: "/static/images/minato.jpg",
        ability: "Летящий Бог Грома, Расенган",
        clan: "Намиказе (Коноха)",
        quote: "Я всегда буду защищать тебя.",
        rank: "Хокаге (4-й)",
        arc: "Отец Наруто",
        hint: "Четвертый Хокаге, отец Наруто",
        difficulty: "expert"
    },
    {
        id: 19,
        name: "Шисуи Учиха",
        image: "/static/images/shishui.jpg",
        ability: "Котоамацуками, Телепортация",
        clan: "Учиха (Коноха)",
        quote: "Иногда, чтобы защитить деревню, нужно пожертвовать собой.",
        rank: "Анбу",
        arc: "Лучший друг Итачи",
        hint: "Друг Итачи, телепортация",
        difficulty: "expert"
    },
    {
        id: 20,
        name: "Саи",
        image: "/static/images/sai.jpg",
        ability: "Техники чернил",
        clan: "Нет (Коноха)",
        quote: "Улыбка - это способ показать дружелюбие.",
        rank: "Анбу",
        arc: "Замена Саске",
        hint: "Художник, замена Саске в команде 7",
        difficulty: "medium"
    }
];

// Состояние игры
const GameState = {
    currentRound: 1,
    score: 0,
    highScore: 0,
    timeLeft: CONFIG.TIME_PER_ROUND,
    currentCharacter: null,
    usedCharacterIds: [],
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
    characterImage: document.getElementById('characterImage'),
    characterPlaceholder: document.getElementById('characterPlaceholder'),
    hintText: document.getElementById('hintText'),
    difficultyText: document.getElementById('difficultyText'),
    answerInput: document.getElementById('answerInput'),
    timerDisplay: document.getElementById('timerDisplay'),
    submitAnswer: document.getElementById('submitAnswer'),
    skipBtn: document.getElementById('skipBtn'),
    hintBtn: document.getElementById('hintBtn'),
    restartBtn: document.getElementById('restartBtn'),
    optionsGrid: document.getElementById('optionsGrid'),
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
    console.log('🎮 Игра "Кто из Наруто?" запущена');
    
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
    const savedHighScore = localStorage.getItem('narutoCharacterHighScore');
    if (savedHighScore) {
        GameState.highScore = parseInt(savedHighScore);
        Elements.highScoreValue.textContent = GameState.highScore;
    }
}

// Сохранение данных игры
function saveGameData() {
    if (GameState.score > GameState.highScore) {
        GameState.highScore = GameState.score;
        localStorage.setItem('narutoCharacterHighScore', GameState.highScore);
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
    
    // Выбор случайного персонажа
    GameState.currentCharacter = getRandomCharacter();
    if (!GameState.currentCharacter) {
        alert('Ошибка: не удалось загрузить персонажей!');
        return;
    }
    
    // Загрузка изображения
    const characterImg = Elements.characterImage;
    characterImg.src = GameState.currentCharacter.image;
    characterImg.onload = () => {
        Elements.characterPlaceholder.style.display = 'none';
        characterImg.style.opacity = '1';
    };
    characterImg.onerror = () => {
        Elements.characterPlaceholder.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <span>Ошибка загрузки персонажа</span>
            <span>${GameState.currentCharacter.name}</span>
        `;
    };
    
    // Обновление сложности
    updateDifficultyDisplay();
    
    // Генерация вариантов ответов
    generateCharacterOptions();
    
    // Запуск таймеров
    startTimers();
    
    // Сброс подсказки
    Elements.hintText.textContent = 'Подсказка появится через 10 секунд';
    
    // Фокус на поле ввода
    setTimeout(() => {
        Elements.answerInput.focus();
    }, 300);
}

// Получение случайного персонажа
function getRandomCharacter() {
    // Фильтрация по сложности
    let availableCharacters = NARUTO_CHARACTERS.filter(character => {
        if (GameState.usedCharacterIds.includes(character.id)) return false;
        
        // Прогрессивная сложность
        if (GameState.currentRound <= 3) return character.difficulty === 'easy';
        if (GameState.currentRound <= 7) return ['easy', 'medium'].includes(character.difficulty);
        if (GameState.currentRound <= 10) return ['medium', 'hard'].includes(character.difficulty);
        if (GameState.currentRound <= 13) return ['hard', 'expert'].includes(character.difficulty);
        return true;
    });
    
    // Если все персонажи использованы, сбросить список
    if (availableCharacters.length === 0) {
        GameState.usedCharacterIds = [];
        return getRandomCharacter();
    }
    
    // Выбор случайного персонажа
    const randomIndex = Math.floor(Math.random() * availableCharacters.length);
    const selectedCharacter = availableCharacters[randomIndex];
    
    // Добавление в использованные
    GameState.usedCharacterIds.push(selectedCharacter.id);
    
    return selectedCharacter;
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
        medium: '#0037ac',
        hard: '#f59e0b',
        expert: '#ef4444'
    };
    
    const difficulty = GameState.currentCharacter.difficulty;
    Elements.difficultyText.textContent = `${difficultyText[difficulty]} уровень`;
    
    // Обновление цвета
    const badgeIcon = document.querySelector('.difficulty-badge i');
    if (badgeIcon) {
        badgeIcon.style.color = difficultyColors[difficulty];
    }
}

// Генерация вариантов ответов
function generateCharacterOptions() {
    Elements.optionsGrid.innerHTML = '';
    
    const correctName = GameState.currentCharacter.name;
    
    // Получаем уникальные имена персонажей
    const allNames = NARUTO_CHARACTERS
        .map(char => char.name)
        .filter((value, index, self) => self.indexOf(value) === index);
    
    // Исключаем правильный ответ
    const wrongNames = allNames
        .filter(name => name !== correctName)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
    
    // Смешиваем правильный и неправильные ответы
    const allOptions = [correctName, ...wrongNames]
        .sort(() => Math.random() - 0.5);
    
    allOptions.forEach((name, index) => {
        const option = document.createElement('div');
        option.className = 'option-btn';
        option.innerHTML = `
            <i class="fas fa-user"></i>
            <span>${name}</span>
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
        showNotification('Введите имя персонажа!', 'error');
        return;
    }
    
    const isCorrect = checkAnswer(userAnswer);
    endRound(isCorrect);
}

// Проверка ответа
function checkAnswer(userAnswer) {
    const correctAnswer = GameState.currentCharacter.name.toLowerCase();
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
        
        // Множитель сложности
        const difficultyMultiplier = CONFIG.DIFFICULTY_MULTIPLIERS[GameState.currentCharacter.difficulty];
        roundScore = Math.floor(roundScore * difficultyMultiplier);
        
        // Бонус за скорость
        timeBonus = Math.max(0, Math.floor((CONFIG.TIME_PER_ROUND - answerTime) * 2.5));
        
        // Итоговые очки за раунд
        const totalRoundScore = roundScore + timeBonus;
        GameState.score += totalRoundScore;
        
        // Показ правильного результата
        showResult(true, totalRoundScore, roundScore, timeBonus, answerTime);
    } else {
        // Штраф за неправильный ответ
        const penalty = Math.floor(CONFIG.BASE_POINTS * 0.25);
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
    const character = GameState.currentCharacter;
    
    // Анимация изображения
    if (isCorrect) {
        Elements.characterImage.style.filter = 'brightness(1.2)';
        Elements.characterImage.style.boxShadow = '0 0 40px rgba(16, 185, 129, 0.5)';
    } else {
        Elements.characterImage.style.filter = 'brightness(0.7)';
        Elements.characterImage.style.boxShadow = '0 0 40px rgba(239, 68, 68, 0.5)';
    }
    
    // Показываем уведомление
    if (isCorrect) {
        showNotification(`✅ Правильно! +${totalScore} очков`, 'success');
    } else {
        showNotification(`❌ Неправильно! Это ${character.name}`, 'error');
    }
    
    // Сброс анимации через 2 секунды
    setTimeout(() => {
        Elements.characterImage.style.filter = '';
        Elements.characterImage.style.boxShadow = '';
    }, 2000);
}

// Показать подсказку
function showHint(type) {
    const character = GameState.currentCharacter;
    let hint = '';
    
    if (type === 'auto') {
        hint = `💡 ${character.hint}`;
    } else {
        const hints = [
            `🎭 Ранг: ${character.rank}`,
            `🏮 Клан: ${character.clan}`,
            `📜 Арка: ${character.arc}`
        ];
        hint = `💎 ${hints[Math.floor(Math.random() * hints.length)]}`;
    }
    
    Elements.hintText.innerHTML = `<strong>${hint}</strong>`;
}

// Быстрая подсказка
function showQuickHint(type) {
    const character = GameState.currentCharacter;
    let hint = '';
    
    switch(type) {
        case 'ability': 
            hint = `⚡ Способность: ${character.ability}`; 
            break;
        case 'clan': 
            hint = `🏮 Клан/Деревня: ${character.clan}`; 
            break;
        case 'quote': 
            hint = `💬 Цитата: "${character.quote}"`; 
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
        localStorage.setItem('narutoCharacterHighScore', GameState.highScore);
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
    
    if (accuracy === 100 && GameState.score >= 2000) {
        level = 'МАСТЕР НАРУТО';
        levelIcon = 'fas fa-crown';
        levelColor = '#fbbf24';
        message = 'Ты настоящий эксперт вселенной Наруто! 🎯';
    } else if (accuracy >= 90) {
        level = 'Эксперт';
        levelIcon = 'fas fa-graduation-cap';
        levelColor = '#10b981';
        message = 'Потрясающий результат! 🌟';
    } else if (accuracy >= 75) {
        level = 'Знаток';
        levelIcon = 'fas fa-user-ninja';
        levelColor = '#0037ac';
        message = 'Отлично разбираешься в персонажах! 💪';
    } else if (accuracy >= 60) {
        level = 'Фанат';
        levelIcon = 'fas fa-heart';
        levelColor = '#8b5cf6';
        message = 'Хороший результат! 📚';
    } else if (accuracy >= 40) {
        level = 'Зритель';
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
    GameState.currentCharacter = null;
    GameState.usedCharacterIds = [];
    GameState.gameActive = false;
    GameState.correctAnswers = 0;
    GameState.hintsUsed = 0;
    GameState.skipsUsed = 0;
    GameState.totalTime = 0;
    
    clearInterval(GameState.timer);
    clearTimeout(GameState.hintTimer);
    
    // Сброс интерфейса
    Elements.scoreValue.textContent = '0';
    Elements.timerValue.textContent = '45';
    Elements.timerDisplay.textContent = '45';
    Elements.roundValue.textContent = '1/15';
    Elements.answerInput.value = '';
    Elements.hintText.textContent = 'Подсказка появится через 10 секунд';
    Elements.progressFill.style.width = '0%';
    Elements.progressPercent.textContent = '0%';
    Elements.characterPlaceholder.style.display = 'flex';
    Elements.characterImage.src = '';
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
    const text = `Я набрал ${GameState.score} очков в игре "Кто из Наруто?"! Точность: ${accuracy}%. Попробуй и ты! 🎮 #наруто #персонажи #kirava`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Мой результат в игре "Кто из Наруто?"',
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
    console.log('🚀 Запуск игры "Кто из Наруто?"');
    console.log('👥 Всего персонажей в базе:', NARUTO_CHARACTERS.length);
    
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