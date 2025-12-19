// ============================================
// ИГРА "КТО СИЛЬНЕЕ?" - ДЛЯ DJANGO
// ============================================

// Конфигурация игры
const CONFIG = {
    TOTAL_BATTLES: 10,
    TIME_PER_BATTLE: 30,
    BASE_POINTS: 100,
    HINT_COST: 30,
    SKIP_COST: 20,
    STREAK_BONUS: 25,
    MAX_STREAK: 5,
    PERFECT_BONUS: 50,
    TIME_BONUS_MULTIPLIER: 2
};

// База данных персонажей с описаниями
const CHARACTERS_DATABASE = [
    // Гоку (Dragon Ball Z/Super) - СИЛЬНЕЕ ВСЕХ
    {
        id: 1,
        name: "Гоку",
        anime: "Dragon Ball Z/Super",
        image: "/static/images/goku.jpg",
        ability: "Супер Саян, Камехамеха, Ультра Инстинкт",
        powerDesc: "Способен достигать божественных форм, побеждал богов",
        strategy: "Любит драться на равных, постоянно совершенствуется",
        description: "Главный герой Dragon Ball, саянец, мастер боевых искусств",
        strengths: ["Невероятная сила", "Быстрое обучение", "Много трансформаций"],
        weaknesses: ["Излишняя самоуверенность", "Любит драться на равных"],
        difficulty: "hard",
        winsAgainst: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    // Саитама (One Punch Man) - СИЛЬНЕЕ ВСЕХ КРОМЕ ГОКУ
    {
        id: 2,
        name: "Саитама",
        anime: "One Punch Man",
        image: "/static/images/saitama.jpg",
        ability: "Непобедимый удар, абсолютная неуязвимость",
        powerDesc: "Побеждает любого противника одним ударом",
        strategy: "Прямолинейная атака, не использует сложные тактики",
        description: "Самый сильный герой, побеждает любого одним ударом",
        strengths: ["Непобедимая сила", "Неуязвимость"],
        weaknesses: ["Скучает в боях", "Ограниченные способности"],
        difficulty: "hard",
        winsAgainst: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    // Наруто (Naruto Shippuden)
    {
        id: 3,
        name: "Наруто Узумаки",
        anime: "Naruto Shippuden",
        image: "/static/images/naruto.jpg",
        ability: "Режим Мудреца, Расенган, клоны",
        powerDesc: "Хокаге, обладает силой Девятихвостого лиса",
        strategy: "Использует численное преимущество, хаки",
        description: "Хокаге Деревни Скрытого Листа, джинчуурики Девятихвостого",
        strengths: ["Неутомимость", "Умножение", "Девятихвостый лис"],
        weaknesses: ["Эмоциональность", "Прямолинейность"],
        difficulty: "medium",
        winsAgainst: [4, 5, 6, 8, 9, 10, 11, 12]
    },
    // Луффи (One Piece)
    {
        id: 4,
        name: "Манки Д. Луффи",
        anime: "One Piece",
        image: "/static/images/luffy.jpg",
        ability: "Резиновое тело, Гир 4, Король Хаки",
        powerDesc: "Будущий Король Пиратов, непобедимый дух",
        strategy: "Импульсивные атаки, адаптируется в бою",
        description: "Капитан пиратов Соломенной Шляпы, будущий Король Пиратов",
        strengths: ["Резиновое тело", "Сила воли", "Неуязвимость к ударам"],
        weaknesses: ["Вода", "Ограненное море"],
        difficulty: "medium",
        winsAgainst: [5, 6, 8, 9, 10, 11, 12]
    },
    // Ичиго (Bleach)
    {
        id: 5,
        name: "Ичиго Куросаки",
        anime: "Bleach",
        image: "/static/images/ichigo.jpg",
        ability: "Банкай, Гетсуга Теншо, маска Холлоу",
        powerDesc: "Заместитель синигами, гибридная сила",
        strategy: "Быстрая адаптация, духовное давление",
        description: "Заместитель синигами, обладатель духовной силы",
        strengths: ["Гибридная сила", "Быстрый рост", "Разнообразие форм"],
        weaknesses: ["Плохой контроль"],
        difficulty: "medium",
        winsAgainst: [6, 8, 9, 10, 11, 12]
    },
    // Эрен (Attack on Titan)
    {
        id: 6,
        name: "Эрен Йегер",
        anime: "Атака Титанов",
        image: "/static/images/eren.jpg",
        ability: "Титан-Разрушитель, контроль титанов",
        powerDesc: "Обладатель силы Основателя и Координатора",
        strategy: "Жесткая тактика, массовое уничтожение",
        description: "Обладатель силы Титана-Разрушителя и Координатора",
        strengths: ["Титаническая форма", "Контроль над титанами"],
        weaknesses: ["Эмоциональная нестабильность"],
        difficulty: "hard",
        winsAgainst: [7, 8, 9, 10, 11, 12]
    },
    // Леви (Attack on Titan)
    {
        id: 7,
        name: "Леви Аккерман",
        anime: "Атака Титанов",
        image: "/static/images/levi.jpg",
        ability: "Вертикальное маневрирование, мастер меча",
        powerDesc: "Самый сильный солдат человечества",
        strategy: "Молниеносные атаки, точность",
        description: "Самый сильный солдат человечества, капитан Разведкорпуса",
        strengths: ["Скорость", "Техника", "Хладнокровие"],
        weaknesses: ["Человеческие ограничения", "Травмы"],
        difficulty: "medium",
        winsAgainst: [8, 9, 10, 11, 12]
    },
    // Мидория (My Hero Academia)
    {
        id: 8,
        name: "Изуку Мидория",
        anime: "Моя геройская академия",
        image: "/static/images/deku.jpg",
        ability: "Один За Всех, Фа-Джин, воздушные щупальца",
        powerDesc: "Будущий символ мира, наследник силы",
        strategy: "Аналитический подход, использование окружения",
        description: "Обладатель причуды Один За Всех, будущий символ мира",
        strengths: ["Наследственная сила", "Аналитический ум"],
        weaknesses: ["Травмы тела", "Ограниченный контроль"],
        difficulty: "medium",
        winsAgainst: [9, 10, 11, 12]
    },
    // Танджиро (Demon Slayer)
    {
        id: 9,
        name: "Танджиро Камадо",
        anime: "Истребитель демонов",
        image: "/static/images/tanjiro.jpg",
        ability: "Дыхание Воды и Солнца, уникальное обоняние",
        powerDesc: "Мастер дыхательных техник, чистый дух",
        strategy: "Гибкая защита, использование слабостей",
        description: "Истребитель демонов, владеющий Дыханием Воды и Солнца",
        strengths: ["Сострадание", "Обоняние", "Быстрое обучение"],
        weaknesses: ["Человеческие ограничения"],
        difficulty: "medium",
        winsAgainst: [10, 11, 12]
    },
    // Аста (Black Clover)
    {
        id: 10,
        name: "Аста",
        anime: "Black Clover",
        image: "/static/images/asta.jpg",
        ability: "Антимагия, черная форма, демоническая сила",
        powerDesc: "Маг без магии, обладатель антимагии",
        strategy: "Прорыв через любые защиты, упорство",
        description: "Маг без магии, обладатель антимагии",
        strengths: ["Антимагия", "Неутомимость", "Сила воли"],
        weaknesses: ["Без магии", "Усталость"],
        difficulty: "medium",
        winsAgainst: [11, 12]
    },
    // Гон (Hunter x Hunter)
    {
        id: 11,
        name: "Гон Фрикс",
        anime: "Hunter x Hunter",
        image: "/static/images/gon.jpg",
        ability: "Нэн, Дзюнкен, взрослая форма",
        powerDesc: "Охотник с невероятным потенциалом",
        strategy: "Интуитивные атаки, жертвенность",
        description: "Охотник, использующий Нэн, сын Джина",
        strengths: ["Потенциал", "Жертвенность", "Интуиция"],
        weaknesses: ["Неопытность", "Эмоциональность"],
        difficulty: "medium",
        winsAgainst: [12]
    },
    // Киллуа (Hunter x Hunter)
    {
        id: 12,
        name: "Киллуа Золдик",
        anime: "Hunter x Hunter",
        image: "/static/images/killua.jpg",
        ability: "Богиpeed, электричество, техники убийцы",
        powerDesc: "Наследник семьи убийц, сверхчеловеческая скорость",
        strategy: "Молниеносные атаки, использование слабостей",
        description: "Наследник семьи убийц, лучший друг Гона",
        strengths: ["Скорость", "Техника убийцы", "Интеллект"],
        weaknesses: ["Страх", "Семейные проблемы"],
        difficulty: "medium",
        winsAgainst: [] // Слабее Гона
    }
];

// Состояние игры
const GameState = {
    currentBattle: 1,
    score: 0,
    highScore: 0,
    wins: 0,
    streak: 0,
    timeLeft: CONFIG.TIME_PER_BATTLE,
    leftCharacter: null,
    rightCharacter: null,
    battleActive: false,
    usedCharacterIds: [],
    gameActive: false,
    battleStartTime: null,
    timer: null,
    correctAnswers: 0,
    hintsUsed: 0,
    skipsUsed: 0,
    totalTime: 0
};

// DOM элементы
const Elements = {
    // Статистика
    scoreValue: document.getElementById('scoreValue'),
    winsValue: document.getElementById('winsValue'),
    battlesValue: document.getElementById('battlesValue'),
    highScoreValue: document.getElementById('highScoreValue'),
    timerDisplay: document.getElementById('timerDisplay'),
    
    // Левый персонаж
    leftCharacterImage: document.getElementById('leftCharacterImage'),
    leftCharacterPlaceholder: document.getElementById('leftCharacterPlaceholder'),
    leftCharacterName: document.getElementById('leftCharacterName'),
    leftCharacterAnime: document.getElementById('leftCharacterAnime'),
    leftAbility: document.getElementById('leftAbility'),
    leftPowerDesc: document.getElementById('leftPowerDesc'),
    leftStrategy: document.getElementById('leftStrategy'),
    
    // Правый персонаж
    rightCharacterImage: document.getElementById('rightCharacterImage'),
    rightCharacterPlaceholder: document.getElementById('rightCharacterPlaceholder'),
    rightCharacterName: document.getElementById('rightCharacterName'),
    rightCharacterAnime: document.getElementById('rightCharacterAnime'),
    rightAbility: document.getElementById('rightAbility'),
    rightPowerDesc: document.getElementById('rightPowerDesc'),
    rightStrategy: document.getElementById('rightStrategy'),
    
    // Кнопки
    voteLeftBtn: document.getElementById('voteLeftBtn'),
    voteRightBtn: document.getElementById('voteRightBtn'),
    drawBtn: document.getElementById('drawBtn'),
    hintBtn: document.getElementById('hintBtn'),
    skipBtn: document.getElementById('skipBtn'),
    restartBtn: document.getElementById('restartBtn'),
    
    // Результаты и прогресс
    resultOverlay: document.getElementById('resultOverlay'),
    resultPopup: document.getElementById('resultPopup'),
    progressFill: document.getElementById('progressFill'),
    progressPercent: document.getElementById('progressPercent'),
    roundDots: document.getElementById('roundDots'),
    
    // Модальное окно
    resultModal: document.getElementById('resultModal'),
    modalBody: document.getElementById('modalBody'),
    closeModal: document.getElementById('closeModal'),
    playAgainBtn: document.getElementById('playAgainBtn'),
    shareResultsBtn: document.getElementById('shareResultsBtn')
};

// Инициализация игры
function initGame() {
    console.log('🎮 Игра "Кто сильнее?" запущена');
    
    // Загрузка сохраненных данных
    loadGameData();
    
    // Настройка обработчиков событий
    setupEventListeners();
    
    // Генерация точек раундов
    generateRoundDots();
    
    // Начало первой битвы
    setTimeout(startNewBattle, 1000);
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Голосование
    Elements.voteLeftBtn.addEventListener('click', () => {
        if (GameState.battleActive) handleVote('left');
    });
    
    Elements.voteRightBtn.addEventListener('click', () => {
        if (GameState.battleActive) handleVote('right');
    });
    
    Elements.drawBtn.addEventListener('click', () => {
        if (GameState.battleActive) handleVote('draw');
    });
    
    // Покупка подсказки
    Elements.hintBtn.addEventListener('click', () => {
        if (GameState.battleActive && GameState.score >= CONFIG.HINT_COST) {
            GameState.score -= CONFIG.HINT_COST;
            GameState.hintsUsed++;
            updateScore();
            showHint();
            showNotification(`Подсказка! -${CONFIG.HINT_COST} очков`, 'info');
        } else if (GameState.battleActive) {
            showNotification('Недостаточно очков для подсказки!', 'error');
        }
    });
    
    // Пропуск битвы
    Elements.skipBtn.addEventListener('click', () => {
        if (GameState.battleActive && GameState.score >= CONFIG.SKIP_COST) {
            GameState.score -= CONFIG.SKIP_COST;
            GameState.skipsUsed++;
            updateScore();
            showNotification(`Пропущено! -${CONFIG.SKIP_COST} очков`, 'warning');
            endBattle('skip');
        } else if (GameState.battleActive) {
            showNotification('Недостаточно очков для пропуска!', 'error');
        }
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
    
    // Горячие клавиши
    document.addEventListener('keydown', (e) => {
        if (!GameState.battleActive) return;
        
        switch(e.key) {
            case 'ArrowLeft':
            case 'a':
            case 'A':
                Elements.voteLeftBtn.click();
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                Elements.voteRightBtn.click();
                break;
            case ' ':
            case 's':
            case 'S':
                Elements.drawBtn.click();
                break;
            case 'h':
            case 'H':
                Elements.hintBtn.click();
                break;
            case 'Escape':
                Elements.skipBtn.click();
                break;
        }
    });
}

// Загрузка сохраненных данных
function loadGameData() {
    const savedHighScore = localStorage.getItem('whoIsStrongerHighScore');
    if (savedHighScore) {
        GameState.highScore = parseInt(savedHighScore);
        Elements.highScoreValue.textContent = GameState.highScore;
    }
}

// Сохранение данных игры
function saveGameData() {
    if (GameState.score > GameState.highScore) {
        GameState.highScore = GameState.score;
        localStorage.setItem('whoIsStrongerHighScore', GameState.highScore);
        Elements.highScoreValue.textContent = GameState.highScore;
        showNotification('🏆 Новый рекорд!', 'success');
    }
}

// Генерация точек раундов
function generateRoundDots() {
    Elements.roundDots.innerHTML = '';
    for (let i = 1; i <= CONFIG.TOTAL_BATTLES; i++) {
        const dot = document.createElement('div');
        dot.className = 'round-dot';
        dot.textContent = i;
        dot.id = `roundDot${i}`;
        Elements.roundDots.appendChild(dot);
    }
}

// Обновление точек раундов
function updateRoundDots() {
    for (let i = 1; i <= CONFIG.TOTAL_BATTLES; i++) {
        const dot = document.getElementById(`roundDot${i}`);
        if (dot) {
            dot.classList.remove('active', 'completed');
            if (i < GameState.currentBattle) {
                dot.classList.add('completed');
            } else if (i === GameState.currentBattle) {
                dot.classList.add('active');
            }
        }
    }
}

// Начало новой битвы
function startNewBattle() {
    // Проверка окончания игры
    if (GameState.currentBattle > CONFIG.TOTAL_BATTLES) {
        endGame();
        return;
    }
    
    // Сброс состояния битвы
    GameState.battleActive = true;
    GameState.timeLeft = CONFIG.TIME_PER_BATTLE;
    GameState.gameActive = true;
    Elements.timerDisplay.textContent = GameState.timeLeft;
    Elements.battlesValue.textContent = `${GameState.currentBattle}/${CONFIG.TOTAL_BATTLES}`;
    
    // Сброс цвета таймера
    const timerBadge = document.querySelector('.timer-badge');
    if (timerBadge) timerBadge.classList.remove('low-time');
    
    // Обновление прогресса
    const progress = ((GameState.currentBattle - 1) / CONFIG.TOTAL_BATTLES) * 100;
    Elements.progressFill.style.width = `${progress}%`;
    Elements.progressPercent.textContent = `${Math.round(progress)}%`;
    
    // Обновление точек прогресса
    updateRoundDots();
    
    // Выбор двух случайных персонажей
    const characters = getRandomCharacters();
    GameState.leftCharacter = characters[0];
    GameState.rightCharacter = characters[1];
    
    // Обновление интерфейса
    updateBattleInterface();
    
    // Запуск таймера
    startTimer();
    
    // Сброс результата
    Elements.resultOverlay.style.display = 'none';
    
    // Фокус на кнопках
    setTimeout(() => {
        Elements.voteLeftBtn.focus();
    }, 300);
}

// Получение двух случайных персонажей
function getRandomCharacters() {
    // Фильтрация по сложности (прогрессивная)
    let availableCharacters = CHARACTERS_DATABASE.filter(character => {
        if (GameState.usedCharacterIds.includes(character.id)) return false;
        
        // Прогрессивная сложность
        if (GameState.currentBattle <= 3) return ['easy', 'medium'].includes(character.difficulty);
        if (GameState.currentBattle <= 7) return ['medium'].includes(character.difficulty);
        return true;
    });
    
    // Если все персонажи использованы, сбросить список
    if (availableCharacters.length < 2) {
        GameState.usedCharacterIds = [];
        console.log('🔄 Сброс списка использованных персонажей');
        availableCharacters = CHARACTERS_DATABASE;
    }
    
    // Выбор двух случайных персонажей
    const shuffled = [...availableCharacters].sort(() => Math.random() - 0.5);
    const selectedCharacters = shuffled.slice(0, 2);
    
    // Добавление в использованные
    selectedCharacters.forEach(char => {
        GameState.usedCharacterIds.push(char.id);
    });
    
    console.log(`⚔️ Битва ${GameState.currentBattle}: ${selectedCharacters[0].name} vs ${selectedCharacters[1].name}`);
    return selectedCharacters;
}

// Обновление интерфейса битвы
function updateBattleInterface() {
    const left = GameState.leftCharacter;
    const right = GameState.rightCharacter;
    
    // Левый персонаж
    Elements.leftCharacterImage.src = left.image;
    Elements.leftCharacterImage.onload = () => {
        Elements.leftCharacterPlaceholder.style.display = 'none';
        Elements.leftCharacterImage.style.opacity = '1';
    };
    Elements.leftCharacterImage.onerror = () => {
        Elements.leftCharacterPlaceholder.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <span>Ошибка загрузки</span>
            <span>${left.name}</span>
        `;
        Elements.leftCharacterPlaceholder.style.display = 'flex';
    };
    
    Elements.leftCharacterName.textContent = left.name;
    Elements.leftCharacterAnime.textContent = left.anime;
    Elements.leftAbility.textContent = left.ability;
    Elements.leftPowerDesc.textContent = left.powerDesc;
    Elements.leftStrategy.textContent = left.strategy;
    
    // Правый персонаж
    Elements.rightCharacterImage.src = right.image;
    Elements.rightCharacterImage.onload = () => {
        Elements.rightCharacterPlaceholder.style.display = 'none';
        Elements.rightCharacterImage.style.opacity = '1';
    };
    Elements.rightCharacterImage.onerror = () => {
        Elements.rightCharacterPlaceholder.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <span>Ошибка загрузки</span>
            <span>${right.name}</span>
        `;
        Elements.rightCharacterPlaceholder.style.display = 'flex';
    };
    
    Elements.rightCharacterName.textContent = right.name;
    Elements.rightCharacterAnime.textContent = right.anime;
    Elements.rightAbility.textContent = right.ability;
    Elements.rightPowerDesc.textContent = right.powerDesc;
    Elements.rightStrategy.textContent = right.strategy;
    
    // Анимация появления
    [Elements.leftCharacterImage, Elements.rightCharacterImage].forEach(img => {
        img.style.opacity = '0.7';
        img.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            img.style.transition = 'all 0.5s ease';
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
        }, 200);
    });
}

// Запуск таймера
function startTimer() {
    // Очистка старого таймера
    clearInterval(GameState.timer);
    
    // Сохранение времени начала битвы
    GameState.battleStartTime = Date.now();
    
    // Основной таймер
    GameState.timer = setInterval(() => {
        GameState.timeLeft--;
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
}

// Обработка голосования
function handleVote(vote) {
    if (!GameState.battleActive) return;
    
    GameState.battleActive = false;
    clearInterval(GameState.timer);
    
    // Сброс цвета таймера
    const timerBadge = document.querySelector('.timer-badge');
    if (timerBadge) timerBadge.classList.remove('low-time');
    
    // Расчет времени ответа
    const answerTime = Math.round((Date.now() - GameState.battleStartTime) / 1000);
    GameState.totalTime += answerTime;
    
    // Определение правильного результата
    const correctResult = calculateBattleResult();
    
    // Проверка правильности ответа
    const isCorrect = (vote === correctResult);
    
    // Подсчет очков
    let battleScore = 0;
    
    if (isCorrect) {
        GameState.correctAnswers++;
        GameState.wins++;
        GameState.streak++;
        
        // Базовые очки
        battleScore = CONFIG.BASE_POINTS;
        
        // Бонус за серию побед
        if (GameState.streak > 1) {
            const streakBonus = Math.min(GameState.streak * CONFIG.STREAK_BONUS, CONFIG.MAX_STREAK * CONFIG.STREAK_BONUS);
            battleScore += streakBonus;
        }
        
        // Бонус за скорость
        if (answerTime < 10) {
            battleScore += Math.round((10 - answerTime) * CONFIG.TIME_BONUS_MULTIPLIER);
        }
        
        // Добавление очков
        GameState.score += battleScore;
        
        // Показ результата
        showBattleResult(true, battleScore, correctResult, answerTime);
    } else {
        // Сброс серии побед
        GameState.streak = 0;
        
        // Штраф за неправильный ответ
        const penalty = Math.floor(CONFIG.BASE_POINTS * 0.2);
        GameState.score = Math.max(0, GameState.score - penalty);
        
        // Показ результата
        showBattleResult(false, 0, correctResult, answerTime);
    }
    
    // Обновление счета
    updateScore();
    
    // Переход к следующей битве через 3 секунды
    setTimeout(() => {
        GameState.currentBattle++;
        startNewBattle();
    }, 3000);
}

// Расчет результата битвы
function calculateBattleResult() {
    const left = GameState.leftCharacter;
    const right = GameState.rightCharacter;
    
    // 1. Проверка, есть ли прямой победитель в базе данных
    if (left.winsAgainst && left.winsAgainst.includes(right.id)) {
        return 'left';
    }
    if (right.winsAgainst && right.winsAgainst.includes(left.id)) {
        return 'right';
    }
    
    // 2. Если оба могут победить друг друга или ни у кого нет побед
    const leftWinsRight = left.winsAgainst && left.winsAgainst.includes(right.id);
    const rightWinsLeft = right.winsAgainst && right.winsAgainst.includes(left.id);
    
    if ((leftWinsRight && rightWinsLeft) || (!leftWinsRight && !rightWinsLeft)) {
        // Сравнение по лору (аниме силе)
        // Гоку > Саитама > Наруто > Луффи > Ичиго > Эрен > Леви > Мидория > Танджиро > Аста > Гон > Киллуа
        const powerOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        
        const leftIndex = powerOrder.indexOf(left.id);
        const rightIndex = powerOrder.indexOf(right.id);
        
        if (leftIndex < rightIndex) return 'left';
        if (rightIndex < leftIndex) return 'right';
        return 'draw';
    }
    
    // 3. Если только один может победить другого
    if (leftWinsRight) return 'left';
    if (rightWinsLeft) return 'right';
    
    return 'draw';
}

// Показать результат битвы
function showBattleResult(isCorrect, score, correctResult, answerTime) {
    const left = GameState.leftCharacter;
    const right = GameState.rightCharacter;
    
    // Настройка панели результатов
    Elements.resultOverlay.style.display = 'flex';
    
    let resultHTML = '';
    let resultClass = '';
    
    // Определение описания результата
    let resultExplanation = '';
    if (correctResult === 'left') {
        resultExplanation = `${left.name} имеет более универсальные способности и достижения в боях.`;
    } else if (correctResult === 'right') {
        resultExplanation = `${right.name} превосходит в силе, скорости или тактике.`;
    } else {
        resultExplanation = "Персонажи примерно равны по силе - всё зависит от условий боя.";
    }
    
    if (isCorrect) {
        resultClass = 'success';
        resultHTML = `
            <i class="fas fa-check-circle"></i>
            <h3>ПРАВИЛЬНО!</h3>
            <p>Победитель: <strong>${
                correctResult === 'left' ? left.name : 
                correctResult === 'right' ? right.name : 
                'НИЧЬЯ'
            }</strong></p>
            <p style="font-size: 0.9rem; color: var(--text-tertiary); margin: 10px 0;">${resultExplanation}</p>
            <div style="margin-top: 20px; padding: 15px; background: rgba(16, 185, 129, 0.1); border-radius: 12px;">
                <strong>📊 Статистика битвы:</strong><br>
                • Время ответа: <strong>${answerTime}с</strong><br>
                • Получено очков: <strong>${score}</strong><br>
                • Серия побед: <strong>${GameState.streak}</strong><br>
                • Текущий счет: <strong style="color: #10b981;">${GameState.score}</strong>
            </div>
        `;
    } else {
        resultClass = 'error';
        resultHTML = `
            <i class="fas fa-times-circle"></i>
            <h3>НЕПРАВИЛЬНО!</h3>
            <p>Правильный ответ: <strong>${
                correctResult === 'left' ? left.name : 
                correctResult === 'right' ? right.name : 
                'НИЧЬЯ'
            }</strong></p>
            <p style="font-size: 0.9rem; color: var(--text-tertiary); margin: 10px 0;">${resultExplanation}</p>
            <div style="margin-top: 20px; padding: 15px; background: rgba(239, 68, 68, 0.1); border-radius: 12px;">
                <strong>📊 Анализ битвы:</strong><br>
                • <strong>${left.name}:</strong> ${left.powerDesc}<br>
                • <strong>${right.name}:</strong> ${right.powerDesc}<br>
                • Решающий фактор: ${getBattleFactor(left, right, correctResult)}
            </div>
        `;
    }
    
    if (correctResult === 'draw') {
        resultClass = 'draw';
        resultHTML = resultHTML.replace('Победитель', 'Результат');
    }
    
    Elements.resultPopup.className = `result-popup ${resultClass}`;
    Elements.resultPopup.innerHTML = resultHTML + `
        <p style="margin-top: 15px; color: var(--text-tertiary);">
            <i class="fas fa-forward"></i> Следующая битва через 3 секунды...
        </p>
    `;
    
    // Визуальное выделение победителя
    if (correctResult === 'left') {
        Elements.leftCharacterImage.style.boxShadow = '0 0 40px rgba(16, 185, 129, 0.5)';
        Elements.leftCharacterImage.style.border = '3px solid #10b981';
    } else if (correctResult === 'right') {
        Elements.rightCharacterImage.style.boxShadow = '0 0 40px rgba(16, 185, 129, 0.5)';
        Elements.rightCharacterImage.style.border = '3px solid #10b981';
    } else {
        Elements.leftCharacterImage.style.boxShadow = '0 0 40px rgba(245, 158, 11, 0.5)';
        Elements.rightCharacterImage.style.boxShadow = '0 0 40px rgba(245, 158, 11, 0.5)';
        Elements.leftCharacterImage.style.border = '3px solid #f59e0b';
        Elements.rightCharacterImage.style.border = '3px solid #f59e0b';
    }
    
    // Скрыть панель через 2.8 секунды и сбросить стили
    setTimeout(() => {
        Elements.resultOverlay.style.display = 'none';
        [Elements.leftCharacterImage, Elements.rightCharacterImage].forEach(img => {
            img.style.boxShadow = '';
            img.style.border = '';
        });
    }, 2800);
}

// Получение решающего фактора в битве
function getBattleFactor(left, right, result) {
    const factors = [
        "универсальность способностей",
        "божественная сила против физической",
        "тактическое превосходство",
        "скорость против силы",
        "эмоциональная устойчивость",
        "опыт в боях",
        "уникальные трансформации",
        "контроль над окружением",
        "умение использовать слабости",
        "духовная сила против физической"
    ];
    
    if (result === 'draw') {
        return "равная сила и способности";
    }
    
    return factors[Math.floor(Math.random() * factors.length)];
}

// Показать подсказку
function showHint() {
    const left = GameState.leftCharacter;
    const right = GameState.rightCharacter;
    
    const hints = [
        `💡 <strong>${left.name}</strong>: ${left.description}`,
        `💡 <strong>${right.name}</strong>: ${right.description}`,
        `⚡ <strong>${left.name}</strong>: ${left.strengths.slice(0, 2).join(', ')}`,
        `⚡ <strong>${right.name}</strong>: ${right.strengths.slice(0, 2).join(', ')}`,
        `⚠️ <strong>${left.name}</strong>: ${left.weaknesses.join(', ')}`,
        `⚠️ <strong>${right.name}</strong>: ${right.weaknesses.join(', ')}`,
        `🎯 <strong>${left.name}</strong>: ${left.strategy}`,
        `🎯 <strong>${right.name}</strong>: ${right.strategy}`
    ];
    
    const randomHint = hints[Math.floor(Math.random() * hints.length)];
    
    // Показ уведомления с подсказкой
    showNotification(randomHint, 'info');
    
    // Анимация кнопки подсказки
    Elements.hintBtn.classList.add('pulse');
    setTimeout(() => Elements.hintBtn.classList.remove('pulse'), 1000);
}

// Время вышло
function timeUp() {
    if (!GameState.battleActive) return;
    
    showNotification('⏰ Время вышло!', 'error');
    endBattle('timeout');
}

// Завершение битвы (при пропуске или времени)
function endBattle(reason) {
    GameState.battleActive = false;
    clearInterval(GameState.timer);
    
    // Расчет правильного результата
    const correctResult = calculateBattleResult();
    
    // Показ результата
    showBattleResult(false, 0, correctResult, CONFIG.TIME_PER_BATTLE);
    
    // Переход к следующей битве через 2 секунды
    setTimeout(() => {
        GameState.currentBattle++;
        startNewBattle();
    }, 2000);
}

// Обновление счета
function updateScore() {
    Elements.scoreValue.textContent = GameState.score;
    Elements.winsValue.textContent = GameState.wins;
    
    // Анимация обновления
    Elements.scoreValue.classList.add('pulse');
    setTimeout(() => Elements.scoreValue.classList.remove('pulse'), 300);
    
    // Обновление рекорда
    if (GameState.score > GameState.highScore) {
        GameState.highScore = GameState.score;
        Elements.highScoreValue.textContent = GameState.highScore;
        localStorage.setItem('whoIsStrongerHighScore', GameState.highScore);
    }
}

// Конец игры
function endGame() {
    console.log('🎮 Игра завершена');
    
    clearInterval(GameState.timer);
    
    // Сохранение данных
    saveGameData();
    
    // Расчет статистики
    const accuracy = Math.round((GameState.correctAnswers / CONFIG.TOTAL_BATTLES) * 100);
    const totalTime = Math.round(GameState.totalTime);
    const avgTime = Math.round(totalTime / CONFIG.TOTAL_BATTLES);
    
    // Показ результатов
    showGameResults(accuracy, totalTime, avgTime);
}

// Показать результаты игры
function showGameResults(accuracy, totalTime, avgTime) {
    // Определение уровня игрока
    let playerLevel = 'Новичок';
    let levelIcon = '👶';
    let levelColor = '#94a3b8';
    let levelMessage = 'Попробуй ещё раз!';
    
    if (accuracy === 100) {
        playerLevel = 'БОГ СИЛЫ';
        levelIcon = '👑';
        levelColor = '#fbbf24';
        levelMessage = 'Ты настоящий эксперт по силе персонажей! 💪';
    } else if (accuracy >= 90) {
        playerLevel = 'Эксперт';
        levelIcon = '🌟';
        levelColor = '#10b981';
        levelMessage = 'Потрясающее знание персонажей! 🎯';
    } else if (accuracy >= 80) {
        playerLevel = 'Мастер';
        levelIcon = '⭐';
        levelColor = '#3b82f6';
        levelMessage = 'Отлично разбираешься в силах персонажей! 🔥';
    } else if (accuracy >= 70) {
        playerLevel = 'Опытный';
        levelIcon = '🎯';
        levelColor = '#8b5cf6';
        levelMessage = 'Хороший результат! Продолжай тренироваться! 📚';
    } else if (accuracy >= 60) {
        playerLevel = 'Ученик';
        levelIcon = '📖';
        levelColor = '#f59e0b';
        levelMessage = 'Неплохо! Смотри больше аниме! 📺';
    }
    
    Elements.modalBody.innerHTML = `
        <div class="results-summary">
            <div class="level-badge" style="background: ${levelColor}20; border-color: ${levelColor}; color: ${levelColor};">
                ${levelIcon} ${playerLevel}
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
                    <div class="result-value">${GameState.wins}/${CONFIG.TOTAL_BATTLES}</div>
                    <div class="result-label">ПОБЕДЫ</div>
                </div>
                
                <div class="result-item">
                    <div class="result-value">${avgTime}с</div>
                    <div class="result-label">СРЕДНЕЕ ВРЕМЯ</div>
                </div>
            </div>
            
            <div class="results-message">
                <p>${levelMessage}</p>
                <p style="margin-top: 10px; font-size: 0.9rem; color: var(--text-tertiary);">
                    Максимальная серия побед: <strong>${GameState.streak}</strong><br>
                    Подсказок использовано: <strong>${GameState.hintsUsed}</strong><br>
                    Битв пропущено: <strong>${GameState.skipsUsed}</strong>
                </p>
            </div>
        </div>
    `;
    
    Elements.resultModal.style.display = 'flex';
}

// Сброс игры
function resetGame() {
    console.log('🔄 Сброс игры...');
    
    // Сброс состояния
    GameState.currentBattle = 1;
    GameState.score = 0;
    GameState.highScore = parseInt(localStorage.getItem('whoIsStrongerHighScore') || '0');
    GameState.wins = 0;
    GameState.streak = 0;
    GameState.timeLeft = CONFIG.TIME_PER_BATTLE;
    GameState.leftCharacter = null;
    GameState.rightCharacter = null;
    GameState.battleActive = false;
    GameState.usedCharacterIds = [];
    GameState.correctAnswers = 0;
    GameState.hintsUsed = 0;
    GameState.skipsUsed = 0;
    GameState.totalTime = 0;
    
    clearInterval(GameState.timer);
    
    // Сброс интерфейса
    Elements.scoreValue.textContent = '0';
    Elements.winsValue.textContent = '0';
    Elements.battlesValue.textContent = '0/10';
    Elements.highScoreValue.textContent = GameState.highScore;
    Elements.timerDisplay.textContent = CONFIG.TIME_PER_BATTLE;
    Elements.resultOverlay.style.display = 'none';
    Elements.progressFill.style.width = '0%';
    Elements.progressPercent.textContent = '0%';
    
    // Сброс изображений
    Elements.leftCharacterImage.src = '';
    Elements.rightCharacterImage.src = '';
    Elements.leftCharacterPlaceholder.style.display = 'flex';
    Elements.rightCharacterPlaceholder.style.display = 'flex';
    
    // Сброс текста
    Elements.leftCharacterName.textContent = 'Загрузка...';
    Elements.rightCharacterName.textContent = 'Загрузка...';
    Elements.leftAbility.textContent = 'Загрузка...';
    Elements.rightAbility.textContent = 'Загрузка...';
    
    // Обновление точек прогресса
    updateRoundDots();
    
    // Запуск новой игры
    setTimeout(startNewBattle, 1000);
}

// Поделиться результатами
function shareResults() {
    const accuracy = Math.round((GameState.correctAnswers / CONFIG.TOTAL_BATTLES) * 100);
    const text = `Я набрал ${GameState.score} очков в игре "Кто сильнее?"! Точность: ${accuracy}%. Попробуй и ты! ⚔️ #ктосильнее #аниме #kirava`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Мой результат в игре "Кто сильнее?"',
            text: text,
            url: window.location.href
        }).catch(console.error);
    } else {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('📋 Результат скопирован!', 'success');
        }).catch(() => {
            // Fallback для старых браузеров
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showNotification('📋 Результат скопирован!', 'success');
        });
    }
}

// Показать уведомление
function showNotification(message, type = 'info') {
    const colors = {
        info: { bg: 'linear-gradient(135deg, #3b82f6, #2563eb)', color: 'white' },
        success: { bg: 'linear-gradient(135deg, #10b981, #059669)', color: 'white' },
        warning: { bg: 'linear-gradient(135deg, #f59e0b, #d97706)', color: 'white' },
        error: { bg: 'linear-gradient(135deg, #ef4444, #dc2626)', color: 'white' }
    };
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = message;
    notification.style.background = colors[type].bg;
    notification.style.color = colors[type].color;
    
    document.body.appendChild(notification);
    
    // Автоматическое удаление
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Запуск игры при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Запуск игры "Кто сильнее?"');
    console.log('⚔️ Всего персонажей в базе:', CHARACTERS_DATABASE.length);
    
    // Скрыть загрузку через 2 секунды максимум
    setTimeout(() => {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay && loadingOverlay.style.display !== 'none') {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 500);
        }
    }, 2000);
    
    // Инициализация игры
    setTimeout(initGame, 500);
});