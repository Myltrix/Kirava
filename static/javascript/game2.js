// ============================================
// ИГРА "УГАДАЙ АНИМЕ ПО ПЕРСОНАЖУ"
// Полная версия с персонажами аниме
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

// База данных персонажей аниме
const CHARACTERS_DATABASE = [
    {
        id: 1,
        anime: "Наруто",
        character: "Наруто Узумаки",
        image: "/static/images/naruto.jpg",
        ability: "Расенган, Режим Мудреца",
        quote: "Я буду Хокаге, поверь мне!",
        year: 2002,
        genre: "Сёнэн, Экшен, Приключения",
        studio: "Studio Pierrot",
        hint: "Ниндзя с демоном-лисом внутри",
        description: "Синий костюм, оранжевые волосы, повязка на лбу",
        difficulty: "easy"
    },
    {
        id: 2,
        anime: "Ван Пис",
        character: "Манки Д. Луффи",
        image: "/static/images/luffy.jpg",
        ability: "Резиновое тело, Гир Гир но Ми",
        quote: "Я стану Королём Пиратов!",
        year: 1999,
        genre: "Сёнэн, Приключения, Комедия",
        studio: "Toei Animation",
        hint: "Пират с резиновыми способностями",
        description: "Соломенная шляпа, шрам под глазом",
        difficulty: "easy"
    },
    {
        id: 3,
        anime: "Моя геройская академия",
        character: "Изуку Мидория",
        image: "/static/images/deku.jpg",
        ability: "Один За Всех",
        quote: "Теперь твоя очередь!",
        year: 2016,
        genre: "Сёнэн, Супергерои, Школа",
        studio: "Bones",
        hint: "Зелёные волосы, костюм героя",
        description: "Зелёный костюм, веснушки",
        difficulty: "easy"
    },
    {
        id: 4,
        anime: "Токийский гуль",
        character: "Кен Канеки",
        image: "/static/images/kaneki.jpg",
        ability: "Кагуне",
        quote: "Я не монстр...",
        year: 2014,
        genre: "Драма, Ужасы, Сверхъестественное",
        studio: "Studio Pierrot",
        hint: "Белые волосы, повязка на лице",
        description: "Белые волосы, красные глаза",
        difficulty: "medium"
    },
    {
        id: 5,
        anime: "Истребитель демонов",
        character: "Танджиро Камадо",
        image: "/static/images/tanjiro.jpg",
        ability: "Дыхание Воды",
        quote: "Я верну тебя в человека, Незуко!",
        year: 2019,
        genre: "Сёнэн, Экшен, Сверхъестественное",
        studio: "ufotable",
        hint: "Носит серьгу в ухе",
        description: "Зелёно-чёрная форма, меч",
        difficulty: "medium"
    },
    {
        id: 6,
        anime: "Блич",
        character: "Ичиго Куросаки",
        image: "/static/images/ichigo.jpg",
        ability: "Дзанпакто, Заместитель синигами",
        quote: "Я защищу всех!",
        year: 2004,
        genre: "Сёнэн, Экшен, Сверхъестественное",
        studio: "Studio Pierrot",
        hint: "Оранжевые волосы, огромный меч",
        description: "Оранжевые волосы, чёрная форма",
        difficulty: "medium"
    },
    {
        id: 7,
        anime: "Атака Титанов",
        character: "Эрен Йегер",
        image: "/static/images/eren.jpg",
        ability: "Титан-Разрушитель",
        quote: "Я уничтожу всех титанов!",
        year: 2013,
        genre: "Тёмное фэнтези, Постапокалипсис",
        studio: "Wit Studio, MAPPA",
        hint: "Главный герой с яростью в сердце",
        description: "Длинные волосы, повязка на руке",
        difficulty: "medium"
    },
    {
        id: 8,
        anime: "Магическая битва",
        character: "Юджи Итадори",
        image: "/static/images/yuji.jpg",
        ability: "Проклятая энергия",
        quote: "Я съем этот палец!",
        year: 2020,
        genre: "Сёнэн, Сверхъестественное, Ужасы",
        studio: "MAPPA",
        hint: "Розовые волосы, сила Сукуны",
        description: "Розовые волосы, школьная форма",
        difficulty: "hard"
    },
    {
        id: 9,
        anime: "Стальной алхимик",
        character: "Эдвард Элрик",
        image: "/static/images/edward.jpg",
        ability: "Алхимия без круга",
        quote: "Человек не может получить что-то, не отдав что-то взамен!",
        year: 2003,
        genre: "Сёнэн, Приключения, Фэнтези",
        studio: "Bones",
        hint: "Золотые волосы, металлические руки и ноги",
        description: "Золотые волосы, красный плащ",
        difficulty: "hard"
    },
    {
        id: 10,
        anime: "Евангелион",
        character: "Синдзи Икари",
        image: "/static/images/shinji.jpg",
        ability: "Пилотирование Евы",
        quote: "Я не должен бежать...",
        year: 1995,
        genre: "Меха, Психологическое, Драма",
        studio: "Gainax",
        hint: "Пилот робота, комплексы",
        description: "Коричневые волосы, школьная форма",
        difficulty: "hard"
    },
    {
        id: 11,
        anime: "Ходячий замок",
        character: "Хаул",
        image: "/static/images/howl.jpg",
        ability: "Магия",
        quote: "Вот мое сердце. Оно твое.",
        year: 2004,
        genre: "Фэнтези, Приключения, Романтика",
        studio: "Studio Ghibli",
        hint: "Волшебник с замком",
        description: "Длинные светлые волосы, элегантная одежда",
        difficulty: "hard"
    },
    {
        id: 12,
        anime: "Сага о Винланде",
        character: "Торфинн",
        image: "/static/images/thorfinn.jpg",
        ability: "Мастер меча",
        quote: "У меня нет врагов...",
        year: 2019,
        genre: "Сёнэн, Исторический, Драма",
        studio: "Wit Studio",
        hint: "Викинг, ищет месть",
        description: "Светлые волосы, шрамы, одежда викинга",
        difficulty: "hard"
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
    console.log('🎮 Игра "Угадай аниме по персонажу" запущена');
    
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
    const savedHighScore = localStorage.getItem('animeCharacterHighScore');
    if (savedHighScore) {
        GameState.highScore = parseInt(savedHighScore);
        Elements.highScoreValue.textContent = GameState.highScore;
    }
}

// Сохранение данных игры
function saveGameData() {
    if (GameState.score > GameState.highScore) {
        GameState.highScore = GameState.score;
        localStorage.setItem('animeCharacterHighScore', GameState.highScore);
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
            <span>${GameState.currentCharacter.character}</span>
        `;
    };
    
    // Обновление сложности
    updateDifficultyDisplay();
    
    // Генерация вариантов ответов
    generateAnimeOptions();
    
    // Запуск таймеров
    startTimers();
    
    // Сброс подсказки
    Elements.hintText.textContent = 'Подсказка появится через 15 секунд';
    
    // Фокус на поле ввода
    setTimeout(() => {
        Elements.answerInput.focus();
    }, 300);
}

// Получение случайного персонажа
function getRandomCharacter() {
    // Фильтрация по сложности
    let availableCharacters = CHARACTERS_DATABASE.filter(character => {
        if (GameState.usedCharacterIds.includes(character.id)) return false;
        
        // Прогрессивная сложность
        if (GameState.currentRound <= 3) return character.difficulty === 'easy';
        if (GameState.currentRound <= 7) return ['easy', 'medium'].includes(character.difficulty);
        if (GameState.currentRound <= 9) return ['medium', 'hard'].includes(character.difficulty);
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
        hard: 'Сложный'
    };
    
    const difficultyColors = {
        easy: '#10b981',
        medium: '#f59e0b',
        hard: '#ef4444'
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
function generateAnimeOptions() {
    Elements.optionsGrid.innerHTML = '';
    
    const correctAnime = GameState.currentCharacter.anime;
    
    // Получаем уникальные названия аниме
    const allAnime = CHARACTERS_DATABASE
        .map(char => char.anime)
        .filter((value, index, self) => self.indexOf(value) === index);
    
    // Исключаем правильный ответ
    const wrongAnime = allAnime
        .filter(anime => anime !== correctAnime)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
    
    // Смешиваем правильный и неправильные ответы
    const allOptions = [correctAnime, ...wrongAnime]
        .sort(() => Math.random() - 0.5);
    
    allOptions.forEach((anime, index) => {
        const option = document.createElement('div');
        option.className = 'option-btn';
        option.innerHTML = `
            <i class="fas fa-film"></i>
            <span>${anime}</span>
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
        showNotification('Введите название аниме!', 'error');
        return;
    }
    
    const isCorrect = checkAnswer(userAnswer);
    endRound(isCorrect);
}

// Проверка ответа
function checkAnswer(userAnswer) {
    const correctAnswer = GameState.currentCharacter.anime.toLowerCase();
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
    const character = GameState.currentCharacter;
    
    // Настройка панели результатов
    Elements.resultOverlay.style.display = 'flex';
    
    if (isCorrect) {
        Elements.resultPopup.className = 'result-popup success';
        Elements.resultPopup.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <h3>Правильно!</h3>
            <p>Персонаж: <strong>${character.character}</strong></p>
            <p>Аниме: <strong>"${character.anime}"</strong></p>
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
            <p>Это было аниме: <strong>"${character.anime}"</strong></p>
            <p>Персонаж: ${character.character}</p>
            <div style="margin-top: 15px; padding: 10px; background: rgba(239, 68, 68, 0.1); border-radius: 10px;">
                Год: ${character.year}<br>
                Жанр: ${character.genre}
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
    const character = GameState.currentCharacter;
    let hint = '';
    
    if (type === 'auto') {
        hint = `💡 ${character.hint}`;
    } else {
        const hints = [
            `🎭 Жанр: ${character.genre}`,
            `🎬 Год: ${character.year}`,
            `🏢 Студия: ${character.studio}`,
            `⚡ Способность: ${character.ability}`
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
        case 'character': 
            hint = `👤 Имя: ${character.character}`; 
            break;
        case 'ability': 
            hint = `⚡ Способность: ${character.ability}`; 
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
        localStorage.setItem('animeCharacterHighScore', GameState.highScore);
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
        level = 'БОГ АНИМЕ';
        levelIcon = 'fas fa-crown';
        levelColor = '#fbbf24';
        message = 'Ты знаешь персонажей лучше всех! 👑';
    } else if (accuracy >= 90) {
        level = 'Эксперт';
        levelIcon = 'fas fa-graduation-cap';
        levelColor = '#10b981';
        message = 'Потрясающий результат! 🌟';
    } else if (accuracy >= 75) {
        level = 'Знаток';
        levelIcon = 'fas fa-user-ninja';
        levelColor = '#3b82f6';
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
    Elements.timerValue.textContent = '60';
    Elements.timerDisplay.textContent = '60';
    Elements.roundValue.textContent = '1/10';
    Elements.answerInput.value = '';
    Elements.hintText.textContent = 'Подсказка появится через 15 секунд';
    Elements.resultOverlay.style.display = 'none';
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
    const text = `Я набрал ${GameState.score} очков в игре "Угадай аниме по персонажу"! Точность: ${accuracy}%. Попробуй и ты! 🎮 #аниме #персонажи #kirava`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Мой результат в игре "Угадай аниме по персонажу"',
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
    console.log('🚀 Запуск игры "Угадай аниме по персонажу"');
    console.log('📊 Всего персонажей в базе:', CHARACTERS_DATABASE.length);
    
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