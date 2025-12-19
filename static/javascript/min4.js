// ============================================
// ИГРА "УГАДАЙ ТЕРМИН ПО ОПРЕДЕЛЕНИЮ"
// Полная версия с терминами и определениями
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

// База данных терминов и определений
const TERMS_DATABASE = [
    {
        id: 1,
        term: "Алгоритм",
        definition: "Конечная последовательность четко определенных действий для решения некоторого класса задач.",
        category: "Программирование",
        synonym: "Процедура, метод, программа",
        difficulty: "easy",
        firstLetter: "А",
        example: "Сортировка пузырьком - это пример алгоритма"
    },
    {
        id: 2,
        term: "Биосфера",
        definition: "Оболочка Земли, заселенная живыми организмами и преобразованная ими.",
        category: "Биология",
        synonym: "Живая оболочка, экосфера",
        difficulty: "medium",
        firstLetter: "Б",
        example: "Включает в себя гидросферу, литосферу и атмосферу"
    },
    {
        id: 3,
        term: "Гипотеза",
        definition: "Предположение или догадка, утверждение, которое требует доказательства.",
        category: "Наука",
        synonym: "Предположение, допущение, теория",
        difficulty: "easy",
        firstLetter: "Г",
        example: "Научная гипотеза должна быть проверяемой"
    },
    {
        id: 4,
        term: "Демократия",
        definition: "Форма правления, при которой власть принадлежит народу и осуществляется через выборные органы.",
        category: "Политика",
        synonym: "Народовластие, республика",
        difficulty: "medium",
        firstLetter: "Д",
        example: "Прямая демократия предполагает прямое участие граждан"
    },
    {
        id: 5,
        term: "Энтропия",
        definition: "Мера неупорядоченности системы, степень хаоса или неопределенности.",
        category: "Физика",
        synonym: "Беспорядок, хаотичность",
        difficulty: "hard",
        firstLetter: "Э",
        example: "Второй закон термодинамики: энтропия изолированной системы не убывает"
    },
    {
        id: 6,
        term: "Фотосинтез",
        definition: "Процесс преобразования энергии света в химическую энергию органических соединений.",
        category: "Биология",
        synonym: "Световое питание",
        difficulty: "medium",
        firstLetter: "Ф",
        example: "Происходит в хлоропластах растений"
    },
    {
        id: 7,
        term: "Инфляция",
        definition: "Устойчивый рост общего уровня цен на товары и услуги в экономике.",
        category: "Экономика",
        synonym: "Обесценивание денег, рост цен",
        difficulty: "medium",
        firstLetter: "И",
        example: "Высокая инфляция снижает покупательную способность"
    },
    {
        id: 8,
        term: "Квант",
        definition: "Наименьшая возможная порция какой-либо физической величины в квантовой теории.",
        category: "Физика",
        synonym: "Порция, дискретная величина",
        difficulty: "hard",
        firstLetter: "К",
        example: "Квант света - фотон"
    },
    {
        id: 9,
        term: "Метафора",
        definition: "Слово или выражение, употребляемое в переносном значении для образного описания.",
        category: "Литература",
        synonym: "Иносказание, образное выражение",
        difficulty: "easy",
        firstLetter: "М",
        example: "«Золотые руки» - метафора, означающая умелого человека"
    },
    {
        id: 10,
        term: "Оксиморон",
        definition: "Стилистическая фигура, сочетающая противоположные по смыслу слова.",
        category: "Литература",
        synonym: "Сочетание несочетаемого",
        difficulty: "hard",
        firstLetter: "О",
        example: "«Живой труп», «горячий снег»"
    },
    {
        id: 11,
        term: "Парадигма",
        definition: "Система фундаментальных научных установок, представлений и терминов.",
        category: "Философия",
        synonym: "Модель, образец, концепция",
        difficulty: "hard",
        firstLetter: "П",
        example: "Научная парадигма определяет методы исследования"
    },
    {
        id: 12,
        term: "Рефракция",
        definition: "Преломление световых лучей при переходе из одной среды в другую.",
        category: "Физика",
        synonym: "Преломление",
        difficulty: "hard",
        firstLetter: "Р",
        example: "Рефракция объясняет, почему ложка в стакане воды кажется сломанной"
    },
    {
        id: 13,
        term: "Синоним",
        definition: "Слово, близкое или тождественное по значению другому слову.",
        category: "Лингвистика",
        synonym: "Эквивалент, аналог",
        difficulty: "easy",
        firstLetter: "С",
        example: "«Быстрый» и «скорый» - синонимы"
    },
    {
        id: 14,
        term: "Толерантность",
        definition: "Терпимость к чужому мнению, поведению, обычаям.",
        category: "Психология",
        synonym: "Терпимость, принятие",
        difficulty: "medium",
        firstLetter: "Т",
        example: "Социальная толерантность важна в многонациональном обществе"
    },
    {
        id: 15,
        term: "Утопия",
        definition: "Вымышленное идеальное общество или место.",
        category: "Философия",
        synonym: "Идеальное общество, мечта",
        difficulty: "medium",
        firstLetter: "У",
        example: "«Утопия» Томаса Мора"
    }
];

// Состояние игры
const GameState = {
    currentRound: 1,
    score: 0,
    highScore: 0,
    timeLeft: CONFIG.TIME_PER_ROUND,
    currentTerm: null,
    usedTermIds: [],
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
    definitionText: document.getElementById('definitionText'),
    definitionPlaceholder: document.getElementById('definitionPlaceholder'),
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
    console.log('🎮 Игра "Угадай термин по определению" запущена');
    
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
    const savedHighScore = localStorage.getItem('termDefinitionHighScore');
    if (savedHighScore) {
        GameState.highScore = parseInt(savedHighScore);
        Elements.highScoreValue.textContent = GameState.highScore;
    }
}

// Сохранение данных игры
function saveGameData() {
    if (GameState.score > GameState.highScore) {
        GameState.highScore = GameState.score;
        localStorage.setItem('termDefinitionHighScore', GameState.highScore);
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
    
    // Выбор случайного термина
    GameState.currentTerm = getRandomTerm();
    if (!GameState.currentTerm) {
        alert('Ошибка: не удалось загрузить термины!');
        return;
    }
    
    // Отображение определения
    Elements.definitionPlaceholder.style.display = 'none';
    Elements.definitionText.innerHTML = `
        <div class="term-category">${GameState.currentTerm.category}</div>
        <div style="font-size: 1.4rem; font-weight: 600; margin-bottom: 20px; color: var(--accent-primary)">
            Определение:
        </div>
        <div style="margin-bottom: 25px; line-height: 1.7;">
            "${GameState.currentTerm.definition}"
        </div>
        ${GameState.currentTerm.example ? 
            `<div style="font-size: 1.1rem; color: var(--text-tertiary); font-style: italic; border-left: 3px solid var(--accent-primary); padding-left: 15px; margin-top: 20px;">
                <i class="fas fa-lightbulb" style="color: var(--warning); margin-right: 8px;"></i>
                ${GameState.currentTerm.example}
            </div>` 
            : ''
        }
    `;
    
    // Обновление сложности
    updateDifficultyDisplay();
    
    // Генерация вариантов ответов
    generateTermOptions();
    
    // Запуск таймеров
    startTimers();
    
    // Сброс подсказки
    Elements.hintText.textContent = 'Подсказка появится через 15 секунд';
    
    // Фокус на поле ввода
    setTimeout(() => {
        Elements.answerInput.focus();
    }, 300);
}

// Получение случайного термина
function getRandomTerm() {
    // Фильтрация по сложности
    let availableTerms = TERMS_DATABASE.filter(term => {
        if (GameState.usedTermIds.includes(term.id)) return false;
        
        // Прогрессивная сложность
        if (GameState.currentRound <= 3) return term.difficulty === 'easy';
        if (GameState.currentRound <= 7) return ['easy', 'medium'].includes(term.difficulty);
        if (GameState.currentRound <= 9) return ['medium', 'hard'].includes(term.difficulty);
        return true;
    });
    
    // Если все термины использованы, сбросить список
    if (availableTerms.length === 0) {
        GameState.usedTermIds = [];
        return getRandomTerm();
    }
    
    // Выбор случайного термина
    const randomIndex = Math.floor(Math.random() * availableTerms.length);
    const selectedTerm = availableTerms[randomIndex];
    
    // Добавление в использованные
    GameState.usedTermIds.push(selectedTerm.id);
    
    return selectedTerm;
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
    
    const difficulty = GameState.currentTerm.difficulty;
    Elements.difficultyText.textContent = `${difficultyText[difficulty]} уровень`;
    
    // Обновление цвета
    const badgeIcon = document.querySelector('.difficulty-badge i');
    if (badgeIcon) {
        badgeIcon.style.color = difficultyColors[difficulty];
    }
}

// Генерация вариантов ответов
function generateTermOptions() {
    Elements.optionsGrid.innerHTML = '';
    
    const correctTerm = GameState.currentTerm.term;
    
    // Получаем уникальные термины
    const allTerms = TERMS_DATABASE
        .map(term => term.term)
        .filter((value, index, self) => self.indexOf(value) === index);
    
    // Исключаем правильный ответ
    const wrongTerms = allTerms
        .filter(term => term !== correctTerm)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
    
    // Смешиваем правильный и неправильные ответы
    const allOptions = [correctTerm, ...wrongTerms]
        .sort(() => Math.random() - 0.5);
    
    allOptions.forEach((term, index) => {
        const option = document.createElement('div');
        option.className = 'option-btn';
        option.innerHTML = `
            <i class="fas fa-font"></i>
            <span>${term}</span>
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
        showNotification('Введите термин!', 'error');
        return;
    }
    
    const isCorrect = checkAnswer(userAnswer);
    endRound(isCorrect);
}

// Проверка ответа
function checkAnswer(userAnswer) {
    const correctAnswer = GameState.currentTerm.term.toLowerCase();
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
    const term = GameState.currentTerm;
    
    // Настройка панели результатов
    Elements.resultOverlay.style.display = 'flex';
    
    if (isCorrect) {
        Elements.resultPopup.className = 'result-popup success';
        Elements.resultPopup.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <h3>Правильно!</h3>
            <div class="correct-term">${term.term}</div>
            <p style="margin-top: 15px;">Категория: <strong>${term.category}</strong></p>
            <div style="margin-top: 15px; padding: 10px; background: rgba(16, 185, 129, 0.1); border-radius: 10px;">
                Время: <strong>${answerTime}с</strong><br>
                Очки: <strong>+${totalScore}</strong>
                ${term.synonym ? `<div class="synonyms">Синонимы: ${term.synonym}</div>` : ''}
            </div>
        `;
    } else {
        Elements.resultPopup.className = 'result-popup error';
        Elements.resultPopup.innerHTML = `
            <i class="fas fa-times-circle"></i>
            <h3>Неправильно!</h3>
            <div class="correct-term">${term.term}</div>
            <p style="margin-top: 10px;">Правильный ответ</p>
            <div style="margin-top: 15px; padding: 10px; background: rgba(239, 68, 68, 0.1); border-radius: 10px;">
                Категория: ${term.category}<br>
                ${term.synonym ? `Синонимы: ${term.synonym}<br>` : ''}
                ${term.example ? `Пример: ${term.example}` : ''}
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
    const term = GameState.currentTerm;
    let hint = '';
    
    if (type === 'auto') {
        // Случайная подсказка
        const hints = [
            `📚 Категория: ${term.category}`,
            `🔤 Первая буква: ${term.firstLetter}`,
            `📖 Длина слова: ${term.term.length} букв`,
            `💡 Пример: ${term.example || "Нет примера"}`
        ];
        hint = `💎 ${hints[Math.floor(Math.random() * hints.length)]}`;
    } else {
        // Подсказка за очки
        const hints = [
            `🎯 Термин состоит из ${term.term.length} букв`,
            `🏷️ Относится к области: ${term.category}`,
            `🔡 Начинается на букву: ${term.firstLetter}`,
            `🔄 Синонимы: ${term.synonym}`
        ];
        hint = `✨ ${hints[Math.floor(Math.random() * hints.length)]}`;
    }
    
    Elements.hintText.innerHTML = `<strong>${hint}</strong>`;
}

// Быстрая подсказка
function showQuickHint(type) {
    const term = GameState.currentTerm;
    let hint = '';
    
    switch(type) {
        case 'category': 
            hint = `🏷️ Категория: ${term.category}`; 
            break;
        case 'synonym': 
            hint = `🔄 Синонимы: ${term.synonym}`; 
            break;
        case 'firstletter': 
            hint = `🔤 Первая буква: <span class="letter-hint">${term.firstLetter}</span>`; 
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
        localStorage.setItem('termDefinitionHighScore', GameState.highScore);
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
        level = 'ЭРУДИТ';
        levelIcon = 'fas fa-graduation-cap';
        levelColor = '#fbbf24';
        message = 'Ты знаешь все термины! 👑';
    } else if (accuracy >= 90) {
        level = 'Эксперт';
        levelIcon = 'fas fa-brain';
        levelColor = '#10b981';
        message = 'Потрясающий результат! 🌟';
    } else if (accuracy >= 75) {
        level = 'Знаток';
        levelIcon = 'fas fa-user-graduate';
        levelColor = '#3b82f6';
        message = 'Отлично разбираешься в терминах! 💪';
    } else if (accuracy >= 60) {
        level = 'Умник';
        levelIcon = 'fas fa-lightbulb';
        levelColor = '#8b5cf6';
        message = 'Хороший результат! 📚';
    } else if (accuracy >= 40) {
        level = 'Ученик';
        levelIcon = 'fas fa-book-reader';
        levelColor = '#f59e0b';
        message = 'Неплохо! Продолжай учиться! 🔄';
    } else {
        level = 'Начинающий';
        levelIcon = 'fas fa-book';
        levelColor = '#ef4444';
        message = 'Есть куда расти! 📖';
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
    GameState.currentTerm = null;
    GameState.usedTermIds = [];
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
    Elements.definitionPlaceholder.style.display = 'flex';
    Elements.definitionText.innerHTML = '';
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
    const text = `Я набрал ${GameState.score} очков в игре "Угадай термин по определению"! Точность: ${accuracy}%. Попробуй и ты! 🎮 #термины #викторина #kirava`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Мой результат в игре "Угадай термин по определению"',
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
    console.log('🚀 Запуск игры "Угадай термин по определению"');
    console.log('📊 Всего терминов в базе:', TERMS_DATABASE.length);
    
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