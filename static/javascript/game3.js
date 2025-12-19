// ============================================
// ИГРА "УГАДАЙ ПЕРСОНАЖА ПО ФРАЗЕ"
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

// База данных цитат персонажей
const QUOTES_DATABASE = [
    {
        id: 1,
        anime: "Наруто",
        character: "Наруто Узумаки",
        quote: "Я буду Хокаге, поверь мне!",
        image: "/static/images/naruto.jpg",
        ability: "Расенган, Режим Мудреца",
        appearance: "Оранжевые волосы, синий костюм, повязка на лбу",
        year: 2002,
        genre: "Сёнэн, Экшен, Приключения",
        studio: "Studio Pierrot",
        hint: "Ниндзя с демоном-лисом внутри",
        difficulty: "easy"
    },
    {
        id: 2,
        anime: "Ван Пис",
        character: "Манки Д. Луффи",
        quote: "Я стану Королём Пиратов!",
        image: "/static/images/luffy.jpg",
        ability: "Резиновое тело, Гир Гир но Ми",
        appearance: "Соломенная шляпа, шрам под глазом, красная рубашка",
        year: 1999,
        genre: "Сёнэн, Приключения, Комедия",
        studio: "Toei Animation",
        hint: "Пират с резиновыми способностями",
        difficulty: "easy"
    },
    {
        id: 3,
        anime: "Атака Титанов",
        character: "Эрен Йегер",
        quote: "Я уничтожу всех титанов!",
        image: "/static/images/eren.jpg",
        ability: "Титан-Разрушитель",
        appearance: "Длинные волосы, зелёные глаза, повязка на руке",
        year: 2013,
        genre: "Тёмное фэнтези, Постапокалипсис",
        studio: "Wit Studio, MAPPA",
        hint: "Мстит за маму, становится титаном",
        difficulty: "easy"
    },
    {
        id: 4,
        anime: "Тетрадь смерти",
        character: "Лайт Ягами",
        quote: "Я стану богом нового мира!",
        image: "/static/images/light.jpg",
        ability: "Тетрадь смерти, Страх Киры",
        appearance: "Каштановые волосы, очки, белая рубашка",
        year: 2006,
        genre: "Детектив, Психологический триллер",
        studio: "Madhouse",
        hint: "Студент с тетрадью, которая убивает",
        difficulty: "medium"
    },
    {
        id: 5,
        anime: "Стальной алхимик",
        character: "Эдвард Элрик",
        quote: "Человек не может получить что-то, не отдав что-то взамен!",
        image: "/static/images/edward.jpg",
        ability: "Алхимия без круга",
        appearance: "Золотые волосы, красный плащ, металлические конечности",
        year: 2003,
        genre: "Сёнэн, Приключения, Фэнтези",
        studio: "Bones",
        hint: "Ищет философский камень, младший брат в доспехах",
        difficulty: "medium"
    },
    {
        id: 6,
        anime: "Магическая битва",
        character: "Сатору Годжо",
        quote: "Я самый сильный ведьмак",
        image: "/static/images/gojo.jpg",
        ability: "Бесконечность, Шесть глаз",
        appearance: "Белые волосы, чёрная повязка на глазах",
        year: 2020,
        genre: "Сёнэн, Сверхъестественное, Экшен",
        studio: "MAPPA",
        hint: "Учитель, самый сильный ведьмак",
        difficulty: "hard"
    },
    {
        id: 7,
        anime: "Берсерк",
        character: "Гатс",
        quote: "Я не буду молиться... Никогда!",
        image: "/static/images/guts.jpg",
        ability: "Мастер меча, Берсерк",
        appearance: "Чёрные волосы, огромный меч, шрам на носу",
        year: 1997,
        genre: "Тёмное фэнтези, Ужасы, Драма",
        studio: "OLM",
        hint: "Наёмник с огромным мечом, метка жертвы",
        difficulty: "hard"
    },
    {
        id: 8,
        anime: "Блич",
        character: "Ичиго Куросаки",
        quote: "Я защищу всех!",
        image: "/static/images/ichigo.jpg",
        ability: "Дзанпакто, Заместитель синигами",
        appearance: "Оранжевые волосы, чёрная форма синигами",
        year: 2004,
        genre: "Сёнэн, Экшен, Сверхъестественное",
        studio: "Studio Pierrot",
        hint: "Подросток, видящий призраков, становится синигами",
        difficulty: "medium"
    },
    {
        id: 9,
        anime: "Клинок, рассекающий демонов",
        character: "Танджиро Камадо",
        quote: "Я верну тебя в человека, Незуко!",
        image: "/static/images/tanjiro.jpg",
        ability: "Дыхание Воды",
        appearance: "Зелёно-чёрная форма, серьга, шрам на лбу",
        year: 2019,
        genre: "Сёнэн, Экшен, Сверхъестественное",
        studio: "ufotable",
        hint: "Истребитель демонов с сестрой-демоном",
        difficulty: "medium"
    },
    {
        id: 10,
        anime: "Моя геройская академия",
        character: "Изуку Мидория",
        quote: "Теперь твоя очередь!",
        image: "/static/images/deku.jpg",
        ability: "Один За Всех",
        appearance: "Зелёные волосы, зелёный костюм, веснушки",
        year: 2016,
        genre: "Сёнэн, Супергерои, Школа",
        studio: "Bones",
        hint: "Безпричудовый становится величайшим героем",
        difficulty: "easy"
    }
];

// Состояние игры
const GameState = {
    currentRound: 1,
    score: 0,
    highScore: 0,
    timeLeft: CONFIG.TIME_PER_ROUND,
    currentQuote: null,
    usedQuoteIds: [],
    gameActive: false,
    roundStartTime: null,
    timer: null,
    hintTimer: null,
    correctAnswers: 0,
    hintsUsed: 0,
    skipsUsed: 0,
    availableQuotes: [...QUOTES_DATABASE]
};

// Инициализация игры
function initGame() {
    console.log('🎮 Игра "Угадай персонажа по фразе" запущена');
    
    // Загрузка сохраненного рекорда
    const savedHighScore = localStorage.getItem('animeQuoteHighScore');
    if (savedHighScore) {
        GameState.highScore = parseInt(savedHighScore);
        document.getElementById('highScoreValue').textContent = GameState.highScore;
    }
    
    // Настройка обработчиков событий
    setupEventListeners();
    
    // Генерация прогресс-бара
    generateProgressDots();
    
    // Начало первого раунда
    setTimeout(startNewRound, 1000);
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Отправка ответа
    document.getElementById('submitAnswer').addEventListener('click', handleAnswerSubmit);
    document.getElementById('answerInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleAnswerSubmit();
    });
    
    // Пропуск вопроса
    document.getElementById('skipBtn').addEventListener('click', () => {
        if (GameState.gameActive && GameState.score >= CONFIG.SKIP_COST) {
            GameState.score -= CONFIG.SKIP_COST;
            GameState.skipsUsed++;
            updateScore();
            showNotification(`Пропущено! -${CONFIG.SKIP_COST} очков`, 'warning');
            endRound(false);
        } else if (GameState.score < CONFIG.SKIP_COST) {
            showNotification('Недостаточно очков для пропуска!', 'error');
        }
    });
    
    // Подсказка
    document.getElementById('hintBtn').addEventListener('click', () => {
        if (GameState.gameActive && GameState.score >= CONFIG.HINT_COST) {
            GameState.score -= CONFIG.HINT_COST;
            GameState.hintsUsed++;
            updateScore();
            showHint('extra');
            showNotification(`Подсказка! -${CONFIG.HINT_COST} очков`, 'info');
        } else if (GameState.score < CONFIG.HINT_COST) {
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
    document.getElementById('restartBtn').addEventListener('click', resetGame);
    
    // Модальное окно
    document.getElementById('closeModal').addEventListener('click', () => {
        document.getElementById('resultModal').style.display = 'none';
    });
    
    document.getElementById('playAgainBtn').addEventListener('click', () => {
        document.getElementById('resultModal').style.display = 'none';
        resetGame();
    });
    
    // Клик по варианту ответа
    document.getElementById('optionsGrid').addEventListener('click', (e) => {
        if (e.target.closest('.option-btn')) {
            const answer = e.target.closest('.option-btn').querySelector('span').textContent;
            document.getElementById('answerInput').value = answer;
            handleAnswerSubmit();
        }
    });
    
    // Кнопка поделиться
    document.getElementById('shareResultsBtn')?.addEventListener('click', shareResults);
}

// Генерация точек прогресса
function generateProgressDots() {
    const dotsContainer = document.getElementById('roundDots');
    dotsContainer.innerHTML = '';
    
    for (let i = 1; i <= CONFIG.TOTAL_ROUNDS; i++) {
        const dot = document.createElement('div');
        dot.className = 'round-dot';
        dot.textContent = i;
        dot.id = `roundDot${i}`;
        dotsContainer.appendChild(dot);
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
    document.getElementById('answerInput').value = '';
    document.getElementById('resultOverlay').style.display = 'none';
    document.getElementById('timerValue').textContent = GameState.timeLeft;
    document.getElementById('timerDisplay').textContent = GameState.timeLeft;
    document.getElementById('roundValue').textContent = `${GameState.currentRound}/${CONFIG.TOTAL_ROUNDS}`;
    
    // Сброс цвета таймера
    resetTimerColor();
    
    // Обновление прогресса
    const progressPercent = Math.round(((GameState.currentRound - 1) / CONFIG.TOTAL_ROUNDS) * 100);
    document.getElementById('progressPercent').textContent = `${progressPercent}%`;
    document.getElementById('progressFill').style.width = `${progressPercent}%`;
    
    // Обновление точек прогресса
    updateProgressDots();
    
    // Выбор случайной цитаты
    GameState.currentQuote = getRandomQuote();
    if (!GameState.currentQuote) {
        alert('Ошибка: не удалось загрузить цитаты!');
        return;
    }
    
    // Отображение цитаты
    const quoteText = document.getElementById('quoteText');
    const placeholder = document.getElementById('quotePlaceholder');
    
    quoteText.textContent = `"${GameState.currentQuote.quote}"`;
    placeholder.style.display = 'none';
    quoteText.style.display = 'block';
    
    // Анимация появления
    quoteText.style.opacity = '0';
    quoteText.style.transform = 'translateY(20px)';
    setTimeout(() => {
        quoteText.style.transition = 'all 0.5s ease';
        quoteText.style.opacity = '1';
        quoteText.style.transform = 'translateY(0)';
    }, 100);
    
    // Обновление сложности
    updateDifficultyDisplay();
    
    // Генерация вариантов ответов
    generateAnswerOptions();
    
    // Запуск таймеров
    startTimers();
    
    // Сброс подсказки
    document.getElementById('hintText').textContent = `Подсказка появится через ${CONFIG.HINT_DELAY} секунд`;
    
    // Фокус на поле ввода
    setTimeout(() => {
        document.getElementById('answerInput').focus();
    }, 300);
    
    console.log(`Раунд ${GameState.currentRound}: ${GameState.currentQuote.character}`);
}

// Получение случайной цитаты
function getRandomQuote() {
    // Если использованы все цитаты, сбросить список
    if (GameState.usedQuoteIds.length >= QUOTES_DATABASE.length) {
        GameState.usedQuoteIds = [];
        GameState.availableQuotes = [...QUOTES_DATABASE];
    }
    
    // Фильтрация по сложности
    let availableQuotes = GameState.availableQuotes.filter(quote => {
        if (GameState.usedQuoteIds.includes(quote.id)) return false;
        
        // Прогрессивная сложность
        if (GameState.currentRound <= 3) return quote.difficulty === 'easy';
        if (GameState.currentRound <= 6) return ['easy', 'medium'].includes(quote.difficulty);
        if (GameState.currentRound <= 9) return ['medium', 'hard'].includes(quote.difficulty);
        return true;
    });
    
    // Если нет доступных цитат нужной сложности, взять любую
    if (availableQuotes.length === 0) {
        availableQuotes = GameState.availableQuotes.filter(quote => 
            !GameState.usedQuoteIds.includes(quote.id)
        );
    }
    
    // Выбор случайной цитаты
    const randomIndex = Math.floor(Math.random() * availableQuotes.length);
    const selectedQuote = availableQuotes[randomIndex];
    
    // Добавление в использованные
    GameState.usedQuoteIds.push(selectedQuote.id);
    
    // Удаление из доступных
    const quoteIndex = GameState.availableQuotes.findIndex(q => q.id === selectedQuote.id);
    if (quoteIndex > -1) {
        GameState.availableQuotes.splice(quoteIndex, 1);
    }
    
    return selectedQuote;
}

// Обновление отображения сложности
function updateDifficultyDisplay() {
    const difficultyText = {
        easy: 'Легкий',
        medium: 'Средний',
        hard: 'Сложный'
    };
    
    const badge = document.getElementById('difficultyBadge');
    badge.innerHTML = `
        <i class="fas fa-signal"></i>
        <span id="difficultyText">${difficultyText[GameState.currentQuote.difficulty]}</span>
    `;
}

// Сброс цвета таймера
function resetTimerColor() {
    const timerBadge = document.getElementById('timerBadge');
    timerBadge.classList.remove('low-time');
}

// Установка цвета таймера для низкого времени
function setLowTimerColor() {
    const timerBadge = document.getElementById('timerBadge');
    timerBadge.classList.add('low-time');
}

// Генерация вариантов ответов
function generateAnswerOptions() {
    const optionsGrid = document.getElementById('optionsGrid');
    optionsGrid.innerHTML = '';
    
    const correctCharacter = GameState.currentQuote.character;
    
    // Получаем 3 случайных неверных ответа
    const wrongCharacters = QUOTES_DATABASE
        .filter(quote => quote.character !== correctCharacter && !GameState.usedQuoteIds.includes(quote.id))
        .map(quote => quote.character)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
    
    // Смешиваем правильный и неправильные ответы
    const allOptions = [correctCharacter, ...wrongCharacters]
        .sort(() => Math.random() - 0.5);
    
    allOptions.forEach((character, index) => {
        const option = document.createElement('div');
        option.className = 'option-btn';
        option.innerHTML = `
            <i class="fas fa-user"></i>
            <span>${character}</span>
        `;
        option.style.animationDelay = `${index * 0.1}s`;
        optionsGrid.appendChild(option);
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
        document.getElementById('timerValue').textContent = GameState.timeLeft;
        document.getElementById('timerDisplay').textContent = GameState.timeLeft;
        
        // Визуальное предупреждение при малом времени
        if (GameState.timeLeft <= 10) {
            setLowTimerColor();
        } else {
            resetTimerColor();
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

// Обновление прогресс-точек
function updateProgressDots() {
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

// Обработка отправки ответа
function handleAnswerSubmit() {
    if (!GameState.gameActive) return;
    
    const userAnswer = document.getElementById('answerInput').value.trim();
    
    if (!userAnswer) {
        showNotification('Введите имя персонажа!', 'error');
        return;
    }
    
    const isCorrect = checkAnswer(userAnswer);
    endRound(isCorrect);
}

// Проверка ответа
function checkAnswer(userAnswer) {
    const correctAnswer = GameState.currentQuote.character.toLowerCase();
    const userAnswerLower = userAnswer.toLowerCase();
    
    // Прямое совпадение
    if (userAnswerLower === correctAnswer) return true;
    
    // Удаление спецсимволов и лишних пробелов
    const cleanUser = userAnswerLower.replace(/[^\w\sа-яё]/gi, '').replace(/\s+/g, ' ').trim();
    const cleanCorrect = correctAnswer.replace(/[^\w\sа-яё]/gi, '').replace(/\s+/g, ' ').trim();
    
    if (cleanUser === cleanCorrect) return true;
    
    // Частичное совпадение (85% схожести)
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
    resetTimerColor();
    
    // Расчет времени ответа
    const answerTime = Math.round((Date.now() - GameState.roundStartTime) / 1000);
    
    // Расчет очков
    let pointsEarned = 0;
    let timeBonus = 0;
    
    if (isCorrect) {
        GameState.correctAnswers++;
        
        // Базовые очки
        pointsEarned = CONFIG.BASE_POINTS;
        
        // Бонус за скорость
        timeBonus = Math.max(0, 60 - answerTime);
        pointsEarned += timeBonus;
        
        // Добавление очков
        GameState.score += pointsEarned;
    } else {
        // Штраф за неправильный ответ
        const penalty = Math.floor(CONFIG.BASE_POINTS * 0.3);
        GameState.score = Math.max(0, GameState.score - penalty);
    }
    
    // Обновление счета
    updateScore();
    
    // Показать результат НА ЦИТАТЕ
    showRoundResult(isCorrect, pointsEarned, timeBonus, answerTime);
    
    // Переход к следующему раунду через 3 секунды
    setTimeout(() => {
        GameState.currentRound++;
        startNewRound();
    }, 3000);
}

// Показать результат раунда
function showRoundResult(isCorrect, pointsEarned, timeBonus, answerTime) {
    const resultOverlay = document.getElementById('resultOverlay');
    const resultPopup = document.getElementById('resultPopup');
    const quote = GameState.currentQuote;
    
    if (isCorrect) {
        resultPopup.className = 'result-popup success';
        resultPopup.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <h3>Правильно!</h3>
            <p>Это <strong>${quote.character}</strong></p>
            <p>Аниме: <strong>${quote.anime}</strong></p>
            <p>Время ответа: <strong>${answerTime} секунд</strong></p>
            <p>Базовые очки: <strong>+${CONFIG.BASE_POINTS}</strong></p>
            ${timeBonus > 0 ? `<p>Бонус за скорость: <strong>+${timeBonus}</strong></p>` : ''}
            <p>Всего заработано: <strong>+${pointsEarned} очков</strong></p>
        `;
    } else {
        resultPopup.className = 'result-popup error';
        resultPopup.innerHTML = `
            <i class="fas fa-times-circle"></i>
            <h3>Неправильно!</h3>
            <p>Правильный ответ: <strong>${quote.character}</strong></p>
            <p>Аниме: <strong>${quote.anime}</strong></p>
            <p>Год выхода: <strong>${quote.year}</strong></p>
            <p>Жанр: <strong>${quote.genre}</strong></p>
            <p>Способность: <strong>${quote.ability}</strong></p>
        `;
    }
    
    resultOverlay.style.display = 'flex';
}

// Показать подсказку
function showHint(type) {
    const quote = GameState.currentQuote;
    let hint = '';
    
    if (type === 'auto') {
        hint = quote.hint;
    } else {
        const hints = [
            `Жанр: ${quote.genre}`,
            `Год выхода: ${quote.year}`,
            `Студия: ${quote.studio}`,
            `Внешность: ${quote.appearance.split(',')[0]}...`,
            `Способность: ${quote.ability.split(',')[0]}...`
        ];
        hint = hints[Math.floor(Math.random() * hints.length)];
    }
    
    document.getElementById('hintText').innerHTML = `<strong>💡 ${hint}</strong>`;
}

// Быстрая подсказка
function showQuickHint(type) {
    const quote = GameState.currentQuote;
    let hint = '';
    
    switch(type) {
        case 'anime': 
            hint = `🎬 Аниме: ${quote.anime}`; 
            break;
        case 'ability': 
            hint = `⚡ Способность: ${quote.ability}`; 
            break;
        case 'appearance': 
            hint = `👤 Внешность: ${quote.appearance}`; 
            break;
    }
    
    document.getElementById('hintText').innerHTML = `<strong>${hint}</strong>`;
}

// Время вышло
function timeUp() {
    if (!GameState.gameActive) return;
    
    showNotification('⏰ Время вышло!', 'error');
    endRound(false);
}

// Обновление счета
function updateScore() {
    document.getElementById('scoreValue').textContent = GameState.score;
    
    // Обновление рекорда
    if (GameState.score > GameState.highScore) {
        GameState.highScore = GameState.score;
        document.getElementById('highScoreValue').textContent = GameState.highScore;
        localStorage.setItem('animeQuoteHighScore', GameState.highScore);
        
        if (GameState.score > 0) {
            showNotification('🎉 Новый рекорд!', 'success');
        }
    }
}

// Конец игры
function endGame() {
    clearInterval(GameState.timer);
    clearTimeout(GameState.hintTimer);
    
    // Расчет статистики
    const accuracy = Math.round((GameState.correctAnswers / CONFIG.TOTAL_ROUNDS) * 100);
    const totalTime = (CONFIG.TOTAL_ROUNDS * CONFIG.TIME_PER_ROUND) - GameState.timeLeft;
    const avgTime = Math.round(totalTime / CONFIG.TOTAL_ROUNDS);
    
    // Определение уровня
    let level = 'Новичок';
    let levelColor = '#94a3b8';
    let message = 'Попробуй ещё раз!';
    let icon = 'fas fa-seedling';
    
    if (accuracy === 100) {
        level = 'БОГ АНИМЕ';
        levelColor = '#fbbf24';
        message = 'Ты знаешь всех персонажей наизусть! 👑';
        icon = 'fas fa-crown';
    } else if (accuracy >= 90) {
        level = 'Эксперт';
        levelColor = '#10b981';
        message = 'Потрясающее знание аниме! 🌟';
        icon = 'fas fa-graduation-cap';
    } else if (accuracy >= 80) {
        level = 'Продвинутый';
        levelColor = '#3b82f6';
        message = 'Отлично разбираешься в персонажах! 💪';
        icon = 'fas fa-user-ninja';
    } else if (accuracy >= 70) {
        level = 'Средний';
        levelColor = '#8b5cf6';
        message = 'Хороший результат! 📚';
        icon = 'fas fa-medal';
    } else if (accuracy >= 60) {
        level = 'Начинающий';
        levelColor = '#f59e0b';
        message = 'Неплохо! Смотри больше аниме! 🔄';
        icon = 'fas fa-heart';
    } else if (accuracy >= 50) {
        level = 'Зритель';
        levelColor = '#ef4444';
        message = 'Продолжай смотреть аниме!';
        icon = 'fas fa-user';
    }
    
    // Показать результаты
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div class="results-summary">
            <div class="level-badge" style="background: ${levelColor}20; border-color: ${levelColor}; color: ${levelColor};">
                <i class="${icon}"></i>
                ${level}
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
                <p style="font-size: 1.2rem; font-weight: 600; color: ${levelColor};">${message}</p>
                <p style="margin-top: 15px; font-size: 0.95rem; color: var(--text-tertiary);">
                    Подсказок использовано: ${GameState.hintsUsed} | Пропущено: ${GameState.skipsUsed}
                </p>
            </div>
        </div>
    `;
    
    document.getElementById('resultModal').style.display = 'flex';
}

// Сброс игры
function resetGame() {
    // Сброс состояния
    GameState.currentRound = 1;
    GameState.score = 0;
    GameState.timeLeft = CONFIG.TIME_PER_ROUND;
    GameState.currentQuote = null;
    GameState.usedQuoteIds = [];
    GameState.gameActive = false;
    GameState.correctAnswers = 0;
    GameState.hintsUsed = 0;
    GameState.skipsUsed = 0;
    GameState.availableQuotes = [...QUOTES_DATABASE];
    
    clearInterval(GameState.timer);
    clearTimeout(GameState.hintTimer);
    
    // Сброс интерфейса
    document.getElementById('scoreValue').textContent = '0';
    document.getElementById('timerValue').textContent = '60';
    document.getElementById('timerDisplay').textContent = '60';
    document.getElementById('roundValue').textContent = '1/10';
    document.getElementById('answerInput').value = '';
    document.getElementById('hintText').textContent = `Подсказка появится через ${CONFIG.HINT_DELAY} секунд`;
    document.getElementById('resultOverlay').style.display = 'none';
    document.getElementById('progressPercent').textContent = '0%';
    document.getElementById('progressFill').style.width = '0%';
    document.getElementById('quotePlaceholder').style.display = 'flex';
    document.getElementById('quoteText').style.display = 'none';
    document.getElementById('optionsGrid').innerHTML = '';
    
    // Сброс цвета таймера
    resetTimerColor();
    
    // Обновление точек прогресса
    updateProgressDots();
    
    // Запуск новой игры
    setTimeout(startNewRound, 1000);
    
    showNotification('🔄 Игра перезапущена!', 'info');
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
        <span style="margin-left: 10px;">${message}</span>
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

// Поделиться результатами
function shareResults() {
    const accuracy = Math.round((GameState.correctAnswers / CONFIG.TOTAL_ROUNDS) * 100);
    const text = `Я набрал ${GameState.score} очков в игре "Угадай персонажа по фразе" на Kirava Games! 🎮\nТочность: ${accuracy}%\nПопробуй и ты: ${window.location.href}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Мой результат в игре "Угадай персонажа"',
            text: text,
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Результат скопирован в буфер обмена!', 'success');
        });
    }
}

// Запуск игры при загрузке страницы
document.addEventListener('DOMContentLoaded', initGame);