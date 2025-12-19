// ============================================
// ИГРА "ПРАВИЛЬНО/НЕПРАВИЛЬНО — АНИМЕ ФАКТЫ"
// ============================================

// Конфигурация игры
const CONFIG = {
    TOTAL_ROUNDS: 10,
    TIME_PER_ROUND: 30,
    BASE_POINTS: 100,
    TIME_BONUS_MULTIPLIER: 3,
    HINT_COST: 50,
    SKIP_COST: 25,
    HINT_DELAY: 10,
    DIFFICULTY_MULTIPLIERS: {
        easy: 0.8,
        medium: 1.0,
        hard: 1.5
    }
};

// База данных фактов об аниме С ИЗОБРАЖЕНИЯМИ
const FACTS_DATABASE = [
    // Легкая сложность
    {
        id: 1,
        anime: "Наруто",
        fact: "Наруто Узумаки мечтает стать Хокаге своей деревни",
        isTrue: true,
        explanation: "Это основная цель Наруто на протяжении всего сериала",
        hint: "Это главная цель персонажа",
        difficulty: "easy",
        image: "/static/images/naruto.jpg",
        character: "Наруто Узумаки"
    },
    {
        id: 2,
        anime: "Ван Пис",
        fact: "Монки Д. Луффи может растягиваться благодаря фрукту Гум-Гум",
        isTrue: true,
        explanation: "Луффи съел плод Гум-Гум (Резина-Резина), который дал ему резиновое тело",
        hint: "Фрукт дьявола дал ему эластичность",
        difficulty: "easy",
        image: "/static/images/luffy.jpg",
        character: "Монки Д. Луффи"
    },
    {
        id: 3,
        anime: "Атака Титанов",
        fact: "Эрен Йегер может превращаться в титана",
        isTrue: true,
        explanation: "Эрен обладает способностью превращаться в Титана-Разрушителя",
        hint: "Он обладает особой способностью",
        difficulty: "easy",
        image: "/static/images/eren.jpg",
        character: "Эрен Йегер"
    },
    {
        id: 4,
        anime: "Токийский гуль",
        fact: "Кен Канеки с самого рождения был гулем",
        isTrue: false,
        explanation: "Канеки стал гуглем после пересадки органов от гуля Рисе",
        hint: "Он стал гуглем после операции",
        difficulty: "easy",
        image: "/static/images/kaneki.jpg",
        character: "Кен Канеки"
    },
    {
        id: 5,
        anime: "Моя геройская академия",
        fact: "Изуку Мидория получил причуду от Аллайта",
        isTrue: true,
        explanation: "Аллайт передал свою причуду 'Один за всех' Мидории",
        hint: "Причуда была передана ему",
        difficulty: "easy",
        image: "/static/images/deku.jpg",
        character: "Изуку Мидория"
    },
    
    // Средняя сложность
    {
        id: 6,
        anime: "Магическая битва",
        fact: "Юджи Итадори является реинкарнацией могущественного мага Сукуны",
        isTrue: false,
        explanation: "Юджи — носитель пальцев Сукуны, но не его реинкарнация",
        hint: "Он является носителем, но не реинкарнацией",
        difficulty: "medium",
        image: "/static/images/yuji.jpg",
        character: "Юджи Итадори"
    },
    {
        id: 7,
        anime: "Истребитель демонов",
        fact: "Танджиро Камадо использует технику дыхания огня",
        isTrue: false,
        explanation: "Танджиро использует технику дыхания воды, а не огня",
        hint: "Его дыхание связано с водой",
        difficulty: "medium",
        image: "/static/images/tanjiro.jpg",
        character: "Танджиро Камадо"
    },
    {
        id: 8,
        anime: "Блич",
        fact: "Ичиго Куросаки — наполовину человек, наполовину синигами",
        isTrue: true,
        explanation: "Его отец — синигами, а мать — человек",
        hint: "Его происхождение смешанное",
        difficulty: "medium",
        image: "/static/images/ichigo.jpg",
        character: "Ичиго Куросаки"
    },
    {
        id: 9,
        anime: "Стальной алхимик",
        fact: "Эдвард Элрик потерял руку и ногу в попытке воскресить свою мать",
        isTrue: false,
        explanation: "Он потерял руку и ногу в попытке воскресить своего брата Альфонса",
        hint: "Жертва была связана с братом",
        difficulty: "medium",
        image: "/static/images/edward.jpg",
        character: "Эдвард Элрик"
    },
    {
        id: 10,
        anime: "Евангелион",
        fact: "Синдзи Икари — самый молодой пилот Евангелиона",
        isTrue: true,
        explanation: "Синдзи — пилот Евы-01 в возрасте 14 лет",
        hint: "Он очень молод для пилота",
        difficulty: "medium",
        image: "/static/images/shinji.jpg",
        character: "Синдзи Икари"
    },
    
    // Сложные факты
    {
        id: 11,
        anime: "Ходячий замок",
        fact: "Хаул подарил свое сердце Софи для защиты ее от ведьмы Пустоши",
        isTrue: false,
        explanation: "Хаул подарил свое сердце Кальциферу, огненному демону",
        hint: "Сердце было отдано демону",
        difficulty: "hard",
        image: "/static/images/howl.jpg",
        character: "Хаул"
    },
    {
        id: 12,
        anime: "Сага о Винланде",
        fact: "Торфинн Карлсефни является историческим персонажем",
        isTrue: true,
        explanation: "Торфинн Карлсефни — реальный исторический исследователь викинг",
        hint: "Это реальная историческая личность",
        difficulty: "hard",
        image: "/static/images/thorfinn.jpg",
        character: "Торфинн Карлсефни"
    },
    {
        id: 13,
        anime: "Берсерк",
        fact: "Гатс родился со шрамом на шее в форме креста",
        isTrue: false,
        explanation: "Гатс получил шрам-крест на шее во время жертвоприношения",
        hint: "Шрам появился позже",
        difficulty: "hard",
        image: "/static/images/guts.jpg",
        character: "Гатс"
    },
    {
        id: 14,
        anime: "ДжоДжо",
        fact: "Все части ДжоДжо происходят в одной и той же вселенной",
        isTrue: true,
        explanation: "Хотя каждая часть имеет разных героев, они связаны в одной вселенной",
        hint: "Вселенная одна, но разные эпохи",
        difficulty: "hard",
        image: "/static/images/jojo.jpg",
        character: "Джонатан Джостар"
    },
    {
        id: 15,
        anime: "Ванпанчмен",
        fact: "Сайтама стал сильнейшим после 1000 отжиманий в день",
        isTrue: false,
        explanation: "Сайтама стал сильнейшим после 3 лет интенсивных тренировок по собственной системе",
        hint: "Тренировка была более комплексной",
        difficulty: "hard",
        image: "/static/images/saitama.jpg",
        character: "Сайтама"
    },
    {
        id: 16,
        anime: "Драгонболл",
        fact: "Гоку может превращаться в суперсайянина с рождения",
        isTrue: false,
        explanation: "Гоку впервые превратился в суперсайянина во время битвы с Фризой",
        hint: "Превращение произошло в определенный момент",
        difficulty: "hard",
        image: "/static/images/goku.jpg",
        character: "Сон Гоку"
    },
    {
        id: 17,
        anime: "Семь смертных грехов",
        fact: "Мелиодас — предводитель ордена рыцарей 'Семь смертных грехов'",
        isTrue: true,
        explanation: "Мелиодас является капитаном и основателем ордена",
        hint: "Он лидер команды",
        difficulty: "hard",
        image: "/static/images/meliodas.jpg",
        character: "Мелиодас"
    },
    {
        id: 18,
        anime: "Ковбой Бибоп",
        fact: "Спайк Шпигель — бывший член мафиозного синдиката",
        isTrue: true,
        explanation: "Спайк был членом синдиката Красного Дракона до того, как стал охотником за головами",
        hint: "Его прошлое связано с преступным миром",
        difficulty: "hard",
        image: "/static/images/spike.jpg",
        character: "Спайк Шпигель"
    },
    {
        id: 19,
        anime: "Хеллсинг",
        fact: "Алукард является чистокровным вампиром",
        isTrue: false,
        explanation: "Алукард — вампир-гибрид, сын Дракулы и человеческой женщины",
        hint: "Он не чистокровный вампир",
        difficulty: "hard",
        image: "/static/images/alucard.jpg",
        character: "Алукард"
    },
    {
        id: 20,
        anime: "Судьба/Ночь схватки",
        fact: "Эмия Сиро может использовать только один тип магии",
        isTrue: false,
        explanation: "Сиро специализируется на укреплении и проекции, но изучал и другие виды магии",
        hint: "Он владеет несколькими типами магии",
        difficulty: "hard",
        image: "/static/images/shirou.jpg",
        character: "Эмия Сиро"
    }
];

// Состояние игры
const GameState = {
    currentRound: 1,
    score: 0,
    highScore: 0,
    timeLeft: CONFIG.TIME_PER_ROUND,
    currentFact: null,
    usedFactIds: [],
    gameActive: false,
    roundStartTime: null,
    timer: null,
    hintTimer: null,
    correctAnswers: 0,
    hintsUsed: 0,
    skipsUsed: 0,
    totalTime: 0,
    roundDots: []
};

// DOM элементы
const Elements = {
    scoreValue: document.getElementById('scoreValue'),
    timerValue: document.getElementById('timerValue'),
    roundValue: document.getElementById('roundValue'),
    highScoreValue: document.getElementById('highScoreValue'),
    animeTitle: document.getElementById('animeTitle'),
    factText: document.getElementById('factText'),
    hintText: document.getElementById('hintText'),
    difficultyBadge: document.getElementById('difficultyText'),
    characterImage: document.getElementById('characterImage'),
    characterPlaceholder: document.getElementById('characterPlaceholder'),
    trueBtn: document.getElementById('trueBtn'),
    falseBtn: document.getElementById('falseBtn'),
    skipBtn: document.getElementById('skipBtn'),
    hintBtn: document.getElementById('hintBtn'),
    restartBtn: document.getElementById('restartBtn'),
    resultOverlay: document.getElementById('resultOverlay'),
    resultPopup: document.getElementById('resultPopup'),
    progressFill: document.getElementById('progressFill'),
    progressPercent: document.getElementById('progressPercent'),
    roundDots: document.getElementById('roundDots'),
    resultModal: document.getElementById('resultModal'),
    modalTitle: document.getElementById('modalTitle'),
    modalBody: document.getElementById('modalBody'),
    closeModal: document.getElementById('closeModal'),
    playAgainBtn: document.getElementById('playAgainBtn'),
    shareResultsBtn: document.getElementById('shareResultsBtn')
};

// Инициализация игры
function initGame() {
    console.log('🎮 Инициализация игры "Правильно/Неправильно — Аниме факты" с изображениями...');
    
    loadGameData();
    setupEventListeners();
    generateRoundDots();
    setTimeout(startNewRound, 1000);
}

// Настройка обработчиков событий
function setupEventListeners() {
    Elements.trueBtn.addEventListener('click', () => handleAnswer(true));
    Elements.falseBtn.addEventListener('click', () => handleAnswer(false));
    
    document.addEventListener('keydown', (e) => {
        if (!GameState.gameActive) return;
        
        if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'ф') {
            handleAnswer(true);
        } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'в') {
            handleAnswer(false);
        } else if (e.key === ' ') {
            if (GameState.score >= CONFIG.SKIP_COST) {
                skipRound();
            }
        }
    });
    
    Elements.skipBtn.addEventListener('click', skipRound);
    Elements.hintBtn.addEventListener('click', buyHint);
    
    document.querySelectorAll('.hint-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const hintType = btn.dataset.type;
            showQuickHint(hintType);
        });
    });
    
    Elements.restartBtn.addEventListener('click', resetGame);
    Elements.closeModal.addEventListener('click', () => {
        Elements.resultModal.style.display = 'none';
    });
    
    Elements.playAgainBtn.addEventListener('click', () => {
        Elements.resultModal.style.display = 'none';
        resetGame();
    });
    
    Elements.shareResultsBtn.addEventListener('click', shareResults);
}

// Загрузка сохраненных данных
function loadGameData() {
    const savedHighScore = localStorage.getItem('animeFactsHighScore');
    
    if (savedHighScore) {
        GameState.highScore = parseInt(savedHighScore);
        Elements.highScoreValue.textContent = GameState.highScore;
    }
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.querySelector('i').className = 'fas fa-sun';
        }
    }
}

// Сохранение данных игры
function saveGameData() {
    if (GameState.score > GameState.highScore) {
        GameState.highScore = GameState.score;
        localStorage.setItem('animeFactsHighScore', GameState.highScore);
        Elements.highScoreValue.textContent = GameState.highScore;
        
        Elements.highScoreValue.classList.add('pulse');
        setTimeout(() => Elements.highScoreValue.classList.remove('pulse'), 1000);
        
        showNotification('🏆 Новый рекорд!', 'success');
    }
}

// Генерация точек раундов
function generateRoundDots() {
    Elements.roundDots.innerHTML = '';
    GameState.roundDots = [];
    
    for (let i = 1; i <= CONFIG.TOTAL_ROUNDS; i++) {
        const dot = document.createElement('div');
        dot.className = 'round-dot';
        dot.textContent = i;
        dot.id = `roundDot${i}`;
        Elements.roundDots.appendChild(dot);
        GameState.roundDots.push(dot);
    }
    
    updateRoundDots();
}

// Обновление точек раундов
function updateRoundDots() {
    GameState.roundDots.forEach((dot, index) => {
        const roundNumber = index + 1;
        
        dot.classList.remove('active', 'completed');
        
        if (roundNumber < GameState.currentRound) {
            dot.classList.add('completed');
        } else if (roundNumber === GameState.currentRound) {
            dot.classList.add('active');
        }
    });
}

// Начало нового раунда
function startNewRound() {
    console.log(`🔄 Начало раунда ${GameState.currentRound}`);
    
    if (GameState.currentRound > CONFIG.TOTAL_ROUNDS) {
        endGame();
        return;
    }
    
    resetRoundState();
    GameState.currentFact = getRandomFact();
    if (!GameState.currentFact) {
        console.error('❌ Не удалось получить факт');
        return;
    }
    
    updateGameInterface();
    loadCharacterImage();
    startTimers();
}

// Получение случайного факта
function getRandomFact() {
    let availableFacts = FACTS_DATABASE.filter(fact => {
        if (GameState.usedFactIds.includes(fact.id)) return false;
        
        if (GameState.currentRound <= 3) {
            return fact.difficulty === 'easy';
        } else if (GameState.currentRound <= 7) {
            return fact.difficulty === 'easy' || fact.difficulty === 'medium';
        } else {
            return fact.difficulty === 'medium' || fact.difficulty === 'hard';
        }
    });
    
    if (availableFacts.length === 0) {
        GameState.usedFactIds = [];
        console.log('🔄 Сброс списка использованных фактов');
        return getRandomFact();
    }
    
    const randomIndex = Math.floor(Math.random() * availableFacts.length);
    const selectedFact = availableFacts[randomIndex];
    GameState.usedFactIds.push(selectedFact.id);
    
    console.log(`🎯 Выбран факт: "${selectedFact.fact}" из "${selectedFact.anime}" (${selectedFact.difficulty})`);
    return selectedFact;
}

// Обновление интерфейса игры
function updateGameInterface() {
    const fact = GameState.currentFact;
    
    Elements.animeTitle.querySelector('span').textContent = fact.anime;
    Elements.factText.textContent = fact.fact;
    updateDifficultyDisplay();
    Elements.roundValue.textContent = `${GameState.currentRound}/${CONFIG.TOTAL_ROUNDS}`;
    Elements.scoreValue.textContent = GameState.score;
    
    const progress = ((GameState.currentRound - 1) / CONFIG.TOTAL_ROUNDS) * 100;
    Elements.progressFill.style.width = `${progress}%`;
    Elements.progressPercent.textContent = `${Math.round(progress)}%`;
    updateRoundDots();
}

// Загрузка изображения персонажа
function loadCharacterImage() {
    const fact = GameState.currentFact;
    const img = Elements.characterImage;
    
    Elements.characterPlaceholder.style.display = 'none';
    img.src = fact.image;
    img.alt = fact.character;
    img.style.opacity = '0';
    
    img.onload = function() {
        img.style.transition = 'opacity 0.5s ease';
        img.style.opacity = '1';
        console.log(`🖼️ Изображение загружено: ${fact.image}`);
    };
    
    img.onerror = function() {
        console.error(`❌ Ошибка загрузки изображения: ${fact.image}`);
        Elements.characterPlaceholder.style.display = 'flex';
        Elements.characterPlaceholder.innerHTML = `
            <i class="fas fa-user-circle"></i>
            <span>${fact.character}</span>
            <span style="font-size: 0.9rem; color: var(--text-tertiary)">${fact.anime}</span>
        `;
    };
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
    
    const difficulty = GameState.currentFact.difficulty;
    Elements.difficultyBadge.textContent = `${difficultyText[difficulty]} уровень`;
    Elements.difficultyBadge.style.color = difficultyColors[difficulty];
    
    const badgeIcon = document.querySelector('.difficulty-badge i');
    if (badgeIcon) {
        badgeIcon.style.color = difficultyColors[difficulty];
    }
}

// Запуск таймеров
function startTimers() {
    clearInterval(GameState.timer);
    clearTimeout(GameState.hintTimer);
    
    GameState.timeLeft = CONFIG.TIME_PER_ROUND;
    Elements.timerValue.textContent = GameState.timeLeft;
    GameState.roundStartTime = Date.now();
    Elements.timerValue.style.color = '';
    Elements.timerValue.classList.remove('pulse');
    
    GameState.timer = setInterval(() => {
        GameState.timeLeft--;
        Elements.timerValue.textContent = GameState.timeLeft;
        
        if (GameState.timeLeft <= 10) {
            Elements.timerValue.style.color = '#ef4444';
            if (GameState.timeLeft <= 5) {
                Elements.timerValue.classList.add('pulse');
            }
        }
        
        if (GameState.timeLeft <= 0) {
            clearInterval(GameState.timer);
            timeUp();
        }
    }, 1000);
    
    GameState.hintTimer = setTimeout(() => {
        if (GameState.gameActive) {
            showHint('auto');
        }
    }, CONFIG.HINT_DELAY * 1000);
}

// Обработка ответа
function handleAnswer(userAnswer) {
    if (!GameState.gameActive) return;
    
    const isCorrect = (userAnswer === GameState.currentFact.isTrue);
    endRound(isCorrect);
}

// Пропуск раунда
function skipRound() {
    if (GameState.gameActive && GameState.score >= CONFIG.SKIP_COST) {
        GameState.score -= CONFIG.SKIP_COST;
        GameState.skipsUsed++;
        updateScore();
        showNotification(`Пропущено! -${CONFIG.SKIP_COST} очков`, 'warning');
        endRound(false);
    } else if (GameState.gameActive) {
        showNotification('Недостаточно очков для пропуска!', 'error');
        Elements.skipBtn.classList.add('shake');
        setTimeout(() => Elements.skipBtn.classList.remove('shake'), 500);
    }
}

// Покупка подсказки
function buyHint() {
    if (GameState.gameActive && GameState.score >= CONFIG.HINT_COST) {
        GameState.score -= CONFIG.HINT_COST;
        GameState.hintsUsed++;
        updateScore();
        showHint('extra');
        showNotification(`Подсказка! -${CONFIG.HINT_COST} очков`, 'info');
    } else if (GameState.gameActive) {
        showNotification('Недостаточно очков для подсказки!', 'error');
        Elements.hintBtn.classList.add('shake');
        setTimeout(() => Elements.hintBtn.classList.remove('shake'), 500);
    }
}

// Показать подсказку
function showHint(type) {
    const fact = GameState.currentFact;
    let hint = '';
    
    switch (type) {
        case 'auto':
            hint = `💡 ${fact.hint}`;
            break;
        case 'extra':
            const hints = [
                `🔍 ${fact.explanation.substring(0, 80)}...`,
                `📊 Шанс того, что это правда: ${fact.isTrue ? 'Высокий' : 'Низкий'}`,
                `🎯 Сложность: ${fact.difficulty === 'easy' ? 'Легкая' : fact.difficulty === 'medium' ? 'Средняя' : 'Сложная'}`
            ];
            hint = `💎 ${hints[Math.floor(Math.random() * hints.length)]}`;
            break;
    }
    
    Elements.hintText.innerHTML = `<strong>${hint}</strong>`;
    Elements.hintText.parentElement.classList.add('pulse');
    setTimeout(() => {
        Elements.hintText.parentElement.classList.remove('pulse');
    }, 1000);
}

// Быстрые подсказки
function showQuickHint(type) {
    if (!GameState.gameActive) return;
    
    const fact = GameState.currentFact;
    let hint = '';
    
    switch (type) {
        case 'character':
            hint = `👤 Персонаж: ${fact.character}`;
            break;
        case 'trivia':
            hint = `📚 Факт об аниме "${fact.anime}"`;
            break;
        case 'author':
            const studios = {
                "Наруто": "Studio Pierrot",
                "Ван Пис": "Toei Animation",
                "Атака Титанов": "Wit Studio, MAPPA",
                "Токийский гуль": "Studio Pierrot",
                "Моя геройская академия": "Bones",
                "Магическая битва": "MAPPA",
                "Истребитель демонов": "ufotable",
                "Блич": "Studio Pierrot",
                "Стальной алхимик": "Bones",
                "Евангелион": "Gainax",
                "Ходячий замок": "Studio Ghibli",
                "Сага о Винланде": "Wit Studio",
                "Берсерк": "OLM, Inc.",
                "ДжоДжо": "David Production",
                "Ванпанчмен": "Madhouse",
                "Драгонболл": "Toei Animation",
                "Семь смертных грехов": "A-1 Pictures",
                "Ковбой Бибоп": "Sunrise",
                "Хеллсинг": "Gonzo",
                "Судьба/Ночь схватки": "ufotable"
            };
            hint = `🎬 Студия: ${studios[fact.anime] || "Известная студия"}`;
            break;
    }
    
    if (hint) {
        Elements.hintText.innerHTML = `<strong>${hint}</strong>`;
        
        const hintBtn = document.querySelector(`[data-type="${type}"]`);
        if (hintBtn) {
            hintBtn.classList.add('pulse');
            setTimeout(() => hintBtn.classList.remove('pulse'), 1000);
        }
    }
}

// Завершение раунда
function endRound(isCorrect) {
    clearInterval(GameState.timer);
    clearTimeout(GameState.hintTimer);
    GameState.gameActive = false;
    
    const answerTime = Math.round((Date.now() - GameState.roundStartTime) / 1000);
    GameState.totalTime += answerTime;
    
    let roundScore = 0;
    let timeBonus = 0;
    
    if (isCorrect) {
        GameState.correctAnswers++;
        roundScore = CONFIG.BASE_POINTS;
        const difficultyMultiplier = CONFIG.DIFFICULTY_MULTIPLIERS[GameState.currentFact.difficulty];
        roundScore = Math.floor(roundScore * difficultyMultiplier);
        timeBonus = Math.floor((CONFIG.TIME_PER_ROUND - answerTime) * CONFIG.TIME_BONUS_MULTIPLIER);
        if (timeBonus < 0) timeBonus = 0;
        const totalRoundScore = roundScore + timeBonus;
        GameState.score += totalRoundScore;
        showResult(true, totalRoundScore, roundScore, timeBonus, answerTime);
    } else {
        const penalty = Math.floor(CONFIG.BASE_POINTS * 0.3);
        GameState.score = Math.max(0, GameState.score - penalty);
        showResult(false, 0, 0, 0, answerTime);
    }
    
    updateScore();
    
    setTimeout(() => {
        GameState.currentRound++;
        startNewRound();
    }, 3000);
}

// Показать результат
function showResult(isCorrect, totalScore, baseScore, timeBonus, answerTime) {
    const fact = GameState.currentFact;
    
    if (isCorrect) {
        if (fact.isTrue) {
            Elements.trueBtn.style.boxShadow = '0 0 40px rgba(16, 185, 129, 0.5)';
            Elements.trueBtn.style.transform = 'scale(1.05)';
        } else {
            Elements.falseBtn.style.boxShadow = '0 0 40px rgba(16, 185, 129, 0.5)';
            Elements.falseBtn.style.transform = 'scale(1.05)';
        }
    } else {
        if (fact.isTrue) {
            Elements.falseBtn.style.boxShadow = '0 0 40px rgba(239, 68, 68, 0.5)';
            Elements.falseBtn.style.filter = 'brightness(0.7)';
        } else {
            Elements.trueBtn.style.boxShadow = '0 0 40px rgba(239, 68, 68, 0.5)';
            Elements.trueBtn.style.filter = 'brightness(0.7)';
        }
    }
    
    Elements.resultOverlay.style.display = 'flex';
    
    if (isCorrect) {
        Elements.resultPopup.className = 'result-popup success';
        Elements.resultPopup.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <h3>Правильно!</h3>
            <p>Персонаж: <strong>${fact.character}</strong></p>
            <p>Факт: <strong>"${fact.fact}"</strong></p>
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
            <p>Правильный ответ: <strong>${fact.isTrue ? 'ПРАВДА' : 'ЛОЖЬ'}</strong></p>
            <p>Факт: <strong>"${fact.fact}"</strong></p>
            <div style="margin-top: 15px; padding: 10px; background: rgba(239, 68, 68, 0.1); border-radius: 10px;">
                <strong>Объяснение:</strong><br>
                ${fact.explanation}
            </div>
        `;
    }
    
    setTimeout(() => {
        Elements.resultOverlay.style.display = 'none';
        Elements.trueBtn.style.boxShadow = '';
        Elements.trueBtn.style.transform = '';
        Elements.trueBtn.style.filter = '';
        Elements.falseBtn.style.boxShadow = '';
        Elements.falseBtn.style.transform = '';
        Elements.falseBtn.style.filter = '';
    }, 2800);
}

// Время вышло
function timeUp() {
    if (!GameState.gameActive) return;
    
    showNotification('⏰ Время вышло!', 'error');
    endRound(false);
}

// Сброс состояния раунда
function resetRoundState() {
    GameState.gameActive = true;
    Elements.hintText.textContent = `Подсказка появится через ${CONFIG.HINT_DELAY} секунд`;
    Elements.resultOverlay.style.display = 'none';
    Elements.timerValue.style.color = '';
    Elements.timerValue.classList.remove('pulse');
    
    Elements.trueBtn.style.boxShadow = '';
    Elements.trueBtn.style.transform = '';
    Elements.trueBtn.style.filter = '';
    Elements.falseBtn.style.boxShadow = '';
    Elements.falseBtn.style.transform = '';
    Elements.falseBtn.style.filter = '';
    
    const characterContainer = document.querySelector('.character-container');
    if (characterContainer) {
        characterContainer.style.opacity = '0.7';
        characterContainer.style.transform = 'scale(0.98)';
        
        setTimeout(() => {
            characterContainer.style.transition = 'all 0.5s ease';
            characterContainer.style.opacity = '1';
            characterContainer.style.transform = 'scale(1)';
        }, 100);
    }
}

// Обновление счета
function updateScore() {
    Elements.scoreValue.textContent = GameState.score;
    Elements.scoreValue.classList.add('pulse');
    setTimeout(() => Elements.scoreValue.classList.remove('pulse'), 300);
}

// Конец игры
function endGame() {
    console.log('🎮 Игра завершена');
    
    clearInterval(GameState.timer);
    clearTimeout(GameState.hintTimer);
    saveGameData();
    
    const accuracy = Math.round((GameState.correctAnswers / CONFIG.TOTAL_ROUNDS) * 100);
    const totalTime = Math.round(GameState.totalTime);
    const avgTime = Math.round(totalTime / CONFIG.TOTAL_ROUNDS);
    showGameResults(accuracy, totalTime, avgTime);
}

// Показать результаты игры
function showGameResults(accuracy, totalTime, avgTime) {
    Elements.modalTitle.querySelector('span').textContent = 'Игра завершена!';
    
    let playerLevel = 'Новичок';
    let levelIcon = '👶';
    let levelColor = '#94a3b8';
    let levelMessage = 'Попробуй ещё раз!';
    
    if (accuracy === 100) {
        playerLevel = 'ЭКСПЕРТ АНИМЕ';
        levelIcon = '👑';
        levelColor = '#fbbf24';
        levelMessage = 'Ты настоящий знаток аниме! 🎯';
    } else if (accuracy >= 90) {
        playerLevel = 'Эксперт';
        levelIcon = '🌟';
        levelColor = '#10b981';
        levelMessage = 'Потрясающий результат! 🌟';
    } else if (accuracy >= 75) {
        playerLevel = 'Продвинутый';
        levelIcon = '⭐';
        levelColor = '#3b82f6';
        levelMessage = 'Отлично разбираешься в аниме! 💪';
    } else if (accuracy >= 60) {
        playerLevel = 'Средний';
        levelIcon = '🎯';
        levelColor = '#8b5cf6';
        levelMessage = 'Хороший результат! 📚';
    } else if (accuracy >= 40) {
        playerLevel = 'Начинающий';
        levelIcon = '🌱';
        levelColor = '#f59e0b';
        levelMessage = 'Неплохо! Продолжай тренироваться! 🔄';
    } else {
        levelMessage = 'С каждой игрой будет лучше! 🎮';
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
                    <div class="result-value">${GameState.correctAnswers}/${CONFIG.TOTAL_ROUNDS}</div>
                    <div class="result-label">ПРАВИЛЬНО</div>
                </div>
                
                <div class="result-item">
                    <div class="result-value">${avgTime}с</div>
                    <div class="result-label">СРЕДНЕЕ ВРЕМЯ</div>
                </div>
            </div>
            
            <div class="results-message">
                <p>${levelMessage}</p>
                <p style="margin-top: 15px; font-size: 0.9rem; color: var(--text-tertiary)">
                    Подсказок использовано: ${GameState.hintsUsed} | Пропущено: ${GameState.skipsUsed}
                </p>
            </div>
        </div>
    `;
    
    Elements.resultModal.style.display = 'flex';
}

// Сброс игры
function resetGame() {
    console.log('🔄 Сброс игры...');
    
    GameState.currentRound = 1;
    GameState.score = 0;
    GameState.timeLeft = CONFIG.TIME_PER_ROUND;
    GameState.currentFact = null;
    GameState.usedFactIds = [];
    GameState.gameActive = false;
    GameState.correctAnswers = 0;
    GameState.hintsUsed = 0;
    GameState.skipsUsed = 0;
    GameState.totalTime = 0;
    
    clearInterval(GameState.timer);
    clearTimeout(GameState.hintTimer);
    
    Elements.scoreValue.textContent = '0';
    Elements.timerValue.textContent = CONFIG.TIME_PER_ROUND;
    Elements.roundValue.textContent = '1/10';
    Elements.hintText.textContent = `Подсказка появится через ${CONFIG.HINT_DELAY} секунд`;
    Elements.resultOverlay.style.display = 'none';
    Elements.factText.textContent = 'Здесь появится интересный факт об аниме...';
    Elements.animeTitle.querySelector('span').textContent = 'Название аниме';
    Elements.progressFill.style.width = '10%';
    Elements.progressPercent.textContent = '10%';
    Elements.timerValue.style.color = '';
    Elements.timerValue.classList.remove('pulse');
    
    Elements.characterImage.src = '';
    Elements.characterPlaceholder.style.display = 'flex';
    Elements.characterPlaceholder.innerHTML = `
        <i class="fas fa-user-circle"></i>
        <span>Сейчас появится изображение</span>
    `;
    
    Elements.trueBtn.style.boxShadow = '';
    Elements.trueBtn.style.transform = '';
    Elements.trueBtn.style.filter = '';
    Elements.falseBtn.style.boxShadow = '';
    Elements.falseBtn.style.transform = '';
    Elements.falseBtn.style.filter = '';
    
    updateRoundDots();
    setTimeout(startNewRound, 1000);
}

// Поделиться результатами
function shareResults() {
    const accuracy = Math.round((GameState.correctAnswers / CONFIG.TOTAL_ROUNDS) * 100);
    const text = `Я набрал ${GameState.score} очков в игре "Правильно/Неправильно — Аниме факты"! Точность: ${accuracy}%. Попробуй и ты! 🎮 #аниме #факты #kirava`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Мой результат в игре "Правильно/Неправильно — Аниме факты"',
            text: text,
            url: window.location.href
        }).catch(console.error);
    } else {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('📋 Результат скопирован!', 'success');
        }).catch(() => {
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
    notification.textContent = message;
    notification.style.background = colors[type].bg;
    notification.style.color = colors[type].color;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Запуск игры при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Запуск игры "Правильно/Неправильно — Аниме факты"');
    console.log('📊 Всего фактов в базе:', FACTS_DATABASE.length);
    console.log('🖼️ Всего изображений:', FACTS_DATABASE.filter(f => f.image).length);
    
    setTimeout(() => {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay && loadingOverlay.style.display !== 'none') {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 500);
        }
    }, 2000);
    
    setTimeout(initGame, 500);
});