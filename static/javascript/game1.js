// ============================================
// ИГРА "УГАДАЙ АНИМЕ ПО КАДРУ"
// ============================================

// Конфигурация игры
const CONFIG = {
    TOTAL_ROUNDS: 10,
    TIME_PER_ROUND: 45,
    BASE_POINTS: 100,
    HINT_COST: 60,
    SKIP_COST: 30,
    HINT_DELAY: 10
};

// База данных кадров из аниме
const ANIME_FRAMES_DATABASE = [
    {
        id: 1,
        anime: "Наруто",
        title_en: "Naruto",
        image: "/static/images/naruto.jpg",
        year: 2002,
        genre: "Сёнэн, Экшен",
        studio: "Studio Pierrot",
        hint: "Ниндзя с оранжевыми волосами",
        difficulty: "easy",
        characters: ["Наруто Узумаки", "Саске Учиха"],
        rating: 8.3
    },
    {
        id: 2,
        anime: "Ван Пис",
        title_en: "One Piece",
        image: "/static/images/one-piece.jpg",
        year: 1999,
        genre: "Сёнэн, Приключения",
        studio: "Toei Animation",
        hint: "Пираты и соломенная шляпа",
        difficulty: "easy",
        characters: ["Манки Д. Луффи", "Ророноа Зоро"],
        rating: 8.7
    },
    {
        id: 3,
        anime: "Атака Титанов",
        title_en: "Attack on Titan",
        image: "/static/images/attack-on-titan.jpg",
        year: 2013,
        genre: "Тёмное фэнтези",
        studio: "Wit Studio",
        hint: "Гигантские стены и титаны",
        difficulty: "medium",
        characters: ["Эрен Йегер", "Микаса Аккерман"],
        rating: 9.0
    },
    {
        id: 4,
        anime: "Магическая битва",
        title_en: "Jujutsu Kaisen",
        image: "/static/images/jujutsu-kaisen.jpg",
        year: 2020,
        genre: "Сёнэн, Сверхъестественное",
        studio: "MAPPA",
        hint: "Проклятая энергия и демоны",
        difficulty: "medium",
        characters: ["Юджи Итадори", "Мегуми Фусигуро"],
        rating: 8.6
    },
    {
        id: 5,
        anime: "Токийский гуль",
        title_en: "Tokyo Ghoul",
        image: "/static/images/tokyo-ghoul.jpg",
        year: 2014,
        genre: "Драма, Ужасы",
        studio: "Studio Pierrot",
        hint: "Гули и белые волосы",
        difficulty: "medium",
        characters: ["Кен Канеки", "Тоука Киришима"],
        rating: 7.8
    },
    {
        id: 6,
        anime: "Истребитель демонов",
        title_en: "Demon Slayer",
        image: "/static/images/demon-slayer.jpg",
        year: 2019,
        genre: "Сёнэн, Экшен",
        studio: "ufotable",
        hint: "Мечи и дыхательные стили",
        difficulty: "medium",
        characters: ["Танджиро Камадо", "Незуко Камадо"],
        rating: 8.7
    },
    {
        id: 7,
        anime: "Стальной алхимик",
        title_en: "Fullmetal Alchemist",
        image: "/static/images/fullmetal-alchemist.jpg",
        year: 2003,
        genre: "Сёнэн, Приключения",
        studio: "Bones",
        hint: "Алхимия и металлические конечности",
        difficulty: "hard",
        characters: ["Эдвард Элрик", "Альфонс Элрик"],
        rating: 9.1
    },
    {
        id: 8,
        anime: "Блич",
        title_en: "Bleach",
        image: "/static/images/bleach.jpg",
        year: 2004,
        genre: "Сёнэн, Экшен",
        studio: "Studio Pierrot",
        hint: "Синигами и занпакто",
        difficulty: "hard",
        characters: ["Ичиго Куросаки", "Рукия Кучики"],
        rating: 8.2
    },
    {
        id: 9,
        anime: "Охотник х Охотник",
        title_en: "Hunter x Hunter",
        image: "/static/images/hunterx-hunter.jpg",
        year: 2011,
        genre: "Сёнэн, Приключения",
        studio: "Madhouse",
        hint: "Нен и экзамен охотника",
        difficulty: "hard",
        characters: ["Гон Фрикс", "Киллуа Золдик"],
        rating: 9.0
    },
    {
        id: 10,
        anime: "Моя геройская академия",
        title_en: "My Hero Academia",
        image: "/static/images/my-hero-academia.jpg",
        year: 2016,
        genre: "Сёнэн, Супергерои",
        studio: "Bones",
        hint: "Причуды и герои",
        difficulty: "medium",
        characters: ["Изуку Мидория", "Кацуки Бакуго"],
        rating: 8.4
    },
    {
        id: 11,
        anime: "Мастера меча онлайн",
        title_en: "Sword Art Online",
        image: "/static/images/sword-art-online.jpg",
        year: 2012,
        genre: "Приключения, Фантастика",
        studio: "A-1 Pictures",
        hint: "VRMMO и замок Айнкрад",
        difficulty: "medium",
        characters: ["Кирито", "Асуна"],
        rating: 7.6
    },
    {
        id: 12,
        anime: "Сейлор Мун",
        title_en: "Sailor Moon",
        image: "/static/images/sailor-moon.jpg",
        year: 1992,
        genre: "Махо-сёдзё",
        studio: "Toei Animation",
        hint: "Воин в матроске",
        difficulty: "hard",
        characters: ["Усаги Цукино", "Маморудзуко Чибиуса"],
        rating: 8.0
    }
];

// Состояние игры
const GameState = {
    currentRound: 1,
    score: 0,
    highScore: 0,
    timeLeft: CONFIG.TIME_PER_ROUND,
    currentFrame: null,
    usedFrameIds: [],
    gameActive: false,
    roundStartTime: null,
    timer: null,
    hintTimer: null,
    correctAnswers: 0,
    hintsUsed: 0,
    skipsUsed: 0,
    availableFrames: [...ANIME_FRAMES_DATABASE]
};

// Инициализация игры
function initGame() {
    console.log('🎮 Игра "Угадай аниме по кадру" запущена');
    
    const savedHighScore = localStorage.getItem('animeGuessHighScore');
    if (savedHighScore) {
        GameState.highScore = parseInt(savedHighScore);
        document.getElementById('highScoreValue').textContent = GameState.highScore;
    }
    
    setupEventListeners();
    generateProgressDots();
    setTimeout(startNewRound, 1000);
}

// Настройка обработчиков событий
function setupEventListeners() {
    document.getElementById('submitAnswer').addEventListener('click', handleAnswerSubmit);
    document.getElementById('answerInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleAnswerSubmit();
    });
    
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
    
    document.querySelectorAll('.hint-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const hintType = btn.dataset.type;
            showQuickHint(hintType);
        });
    });
    
    document.getElementById('restartBtn').addEventListener('click', resetGame);
    document.getElementById('closeModal').addEventListener('click', () => {
        document.getElementById('resultModal').style.display = 'none';
    });
    
    document.getElementById('playAgainBtn').addEventListener('click', () => {
        document.getElementById('resultModal').style.display = 'none';
        resetGame();
    });
    
    document.getElementById('optionsGrid').addEventListener('click', (e) => {
        if (e.target.closest('.option-btn')) {
            const answer = e.target.closest('.option-btn').querySelector('span').textContent;
            document.getElementById('answerInput').value = answer;
            handleAnswerSubmit();
        }
    });
    
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
    if (GameState.currentRound > CONFIG.TOTAL_ROUNDS) {
        endGame();
        return;
    }
    
    GameState.gameActive = true;
    GameState.timeLeft = CONFIG.TIME_PER_ROUND;
    document.getElementById('answerInput').value = '';
    document.getElementById('resultOverlay').style.display = 'none';
    document.getElementById('timerValue').textContent = GameState.timeLeft;
    document.getElementById('timerDisplay').textContent = GameState.timeLeft;
    document.getElementById('roundValue').textContent = `${GameState.currentRound}/${CONFIG.TOTAL_ROUNDS}`;
    
    resetTimerColor();
    
    const progressPercent = Math.round(((GameState.currentRound - 1) / CONFIG.TOTAL_ROUNDS) * 100);
    document.getElementById('progressPercent').textContent = `${progressPercent}%`;
    document.getElementById('progressFill').style.width = `${progressPercent}%`;
    
    updateProgressDots();
    
    GameState.currentFrame = getRandomFrame();
    if (!GameState.currentFrame) {
        alert('Ошибка: не удалось загрузить кадры аниме!');
        return;
    }
    
    const frameImg = document.getElementById('animeFrame');
    frameImg.src = GameState.currentFrame.image;
    frameImg.onload = () => {
        document.getElementById('framePlaceholder').style.display = 'none';
        frameImg.style.opacity = '1';
    };
    frameImg.onerror = () => {
        document.getElementById('framePlaceholder').innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <span>Ошибка загрузки кадра</span>
            <span>${GameState.currentFrame.anime}</span>
        `;
    };
    
    updateDifficultyDisplay();
    generateAnswerOptions();
    startTimers();
    document.getElementById('hintText').textContent = 'Подсказка появится через 10 секунд';
    
    setTimeout(() => {
        document.getElementById('answerInput').focus();
    }, 300);
    
    console.log(`Раунд ${GameState.currentRound}: ${GameState.currentFrame.anime}`);
}

// Получение случайного кадра
function getRandomFrame() {
    if (GameState.usedFrameIds.length >= ANIME_FRAMES_DATABASE.length) {
        GameState.usedFrameIds = [];
        GameState.availableFrames = [...ANIME_FRAMES_DATABASE];
    }
    
    let availableFrames = GameState.availableFrames.filter(frame => {
        if (GameState.usedFrameIds.includes(frame.id)) return false;
        
        if (GameState.currentRound <= 3) return frame.difficulty === 'easy';
        if (GameState.currentRound <= 6) return ['easy', 'medium'].includes(frame.difficulty);
        if (GameState.currentRound <= 9) return ['medium', 'hard'].includes(frame.difficulty);
        return true;
    });
    
    if (availableFrames.length === 0) {
        availableFrames = GameState.availableFrames.filter(frame => 
            !GameState.usedFrameIds.includes(frame.id)
        );
    }
    
    const randomIndex = Math.floor(Math.random() * availableFrames.length);
    const selectedFrame = availableFrames[randomIndex];
    
    GameState.usedFrameIds.push(selectedFrame.id);
    
    const frameIndex = GameState.availableFrames.findIndex(f => f.id === selectedFrame.id);
    if (frameIndex > -1) {
        GameState.availableFrames.splice(frameIndex, 1);
    }
    
    return selectedFrame;
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
        <span id="difficultyText">${difficultyText[GameState.currentFrame.difficulty]}</span>
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
    
    const correctAnime = GameState.currentFrame.anime;
    
    const wrongAnime = ANIME_FRAMES_DATABASE
        .filter(frame => frame.anime !== correctAnime && !GameState.usedFrameIds.includes(frame.id))
        .map(frame => frame.anime)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
    
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
        optionsGrid.appendChild(option);
    });
}

// Запуск таймеров
function startTimers() {
    clearInterval(GameState.timer);
    clearTimeout(GameState.hintTimer);
    
    GameState.roundStartTime = Date.now();
    
    GameState.timer = setInterval(() => {
        GameState.timeLeft--;
        document.getElementById('timerValue').textContent = GameState.timeLeft;
        document.getElementById('timerDisplay').textContent = GameState.timeLeft;
        
        if (GameState.timeLeft <= 10) {
            setLowTimerColor();
        } else {
            resetTimerColor();
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
        showNotification('Введите название аниме!', 'error');
        return;
    }
    
    const isCorrect = checkAnswer(userAnswer);
    endRound(isCorrect);
}

// Проверка ответа
function checkAnswer(userAnswer) {
    const correctAnswer = GameState.currentFrame.anime.toLowerCase();
    const userAnswerLower = userAnswer.toLowerCase();
    
    if (userAnswerLower === correctAnswer) return true;
    
    if (GameState.currentFrame.title_en) {
        if (userAnswerLower === GameState.currentFrame.title_en.toLowerCase()) return true;
    }
    
    const cleanUser = userAnswerLower.replace(/[^\w\sа-яё]/gi, '').replace(/\s+/g, ' ').trim();
    const cleanCorrect = correctAnswer.replace(/[^\w\sа-яё]/gi, '').replace(/\s+/g, ' ').trim();
    
    if (cleanUser === cleanCorrect) return true;
    
    return calculateSimilarity(cleanUser, cleanCorrect) >= 0.8;
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
    clearInterval(GameState.timer);
    clearTimeout(GameState.hintTimer);
    GameState.gameActive = false;
    
    resetTimerColor();
    
    const answerTime = Math.round((Date.now() - GameState.roundStartTime) / 1000);
    
    let pointsEarned = 0;
    let timeBonus = 0;
    
    if (isCorrect) {
        GameState.correctAnswers++;
        
        pointsEarned = CONFIG.BASE_POINTS;
        timeBonus = Math.max(0, 50 - Math.floor(answerTime / 3));
        pointsEarned += timeBonus;
        GameState.score += pointsEarned;
    } else {
        const penalty = Math.floor(CONFIG.BASE_POINTS * 0.3);
        GameState.score = Math.max(0, GameState.score - penalty);
    }
    
    updateScore();
    showRoundResult(isCorrect, pointsEarned, timeBonus, answerTime);
    
    setTimeout(() => {
        GameState.currentRound++;
        startNewRound();
    }, 3000);
}

// Показать результат раунда НА КАДРЕ
function showRoundResult(isCorrect, pointsEarned, timeBonus, answerTime) {
    const resultOverlay = document.getElementById('resultOverlay');
    const resultPopup = document.getElementById('resultPopup');
    
    if (isCorrect) {
        resultPopup.className = 'result-popup success';
        resultPopup.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <h3>Правильно!</h3>
            <p>Это <strong>${GameState.currentFrame.anime}</strong></p>
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
            <p>Это было аниме: <strong>${GameState.currentFrame.anime}</strong></p>
            <p>Год выхода: <strong>${GameState.currentFrame.year}</strong></p>
            <p>Жанр: <strong>${GameState.currentFrame.genre}</strong></p>
            <p>Студия: <strong>${GameState.currentFrame.studio}</strong></p>
        `;
    }
    
    resultOverlay.style.display = 'flex';
}

// Показать подсказку
function showHint(type) {
    const frame = GameState.currentFrame;
    let hint = '';
    
    if (type === 'auto') {
        hint = frame.hint;
    } else {
        const hints = [
            `Жанр: ${frame.genre}`,
            `Год выхода: ${frame.year}`,
            `Студия: ${frame.studio}`,
            `Рейтинг: ${frame.rating}/10`,
            `Главные персонажи: ${frame.characters.slice(0, 2).join(', ')}`
        ];
        hint = hints[Math.floor(Math.random() * hints.length)];
    }
    
    document.getElementById('hintText').innerHTML = `<strong>💡 ${hint}</strong>`;
}

// Быстрая подсказка
function showQuickHint(type) {
    const frame = GameState.currentFrame;
    let hint = '';
    
    switch(type) {
        case 'year': 
            hint = `📅 Год выхода: ${frame.year}`; 
            break;
        case 'genre': 
            hint = `🏷️ Жанр: ${frame.genre}`; 
            break;
        case 'studio': 
            hint = `🎬 Студия: ${frame.studio}`; 
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
    
    if (GameState.score > GameState.highScore) {
        GameState.highScore = GameState.score;
        document.getElementById('highScoreValue').textContent = GameState.highScore;
        localStorage.setItem('animeGuessHighScore', GameState.highScore);
        
        if (GameState.score > 0) {
            showNotification('🎉 Новый рекорд!', 'success');
        }
    }
}

// Конец игры
function endGame() {
    clearInterval(GameState.timer);
    clearTimeout(GameState.hintTimer);
    
    const accuracy = Math.round((GameState.correctAnswers / CONFIG.TOTAL_ROUNDS) * 100);
    const totalTime = (CONFIG.TOTAL_ROUNDS * CONFIG.TIME_PER_ROUND) - GameState.timeLeft;
    const avgTime = Math.round(totalTime / CONFIG.TOTAL_ROUNDS);
    
    let level = 'Новичок';
    let levelColor = '#94a3b8';
    let message = 'Попробуй ещё раз!';
    let icon = 'fas fa-seedling';
    
    if (accuracy === 100) {
        level = 'БОГ АНИМЕ';
        levelColor = '#fbbf24';
        message = 'Ты знаешь аниме лучше всех! 👑';
        icon = 'fas fa-crown';
    } else if (accuracy >= 90) {
        level = 'Легенда';
        levelColor = '#8b5cf6';
        message = 'Невероятный результат! 🤯';
        icon = 'fas fa-dragon';
    } else if (accuracy >= 80) {
        level = 'Эксперт';
        levelColor = '#10b981';
        message = 'Отличный результат! 💪';
        icon = 'fas fa-graduation-cap';
    } else if (accuracy >= 70) {
        level = 'Знаток';
        levelColor = '#3b82f6';
        message = 'Хорошо разбираешься в аниме!';
        icon = 'fas fa-user-ninja';
    } else if (accuracy >= 60) {
        level = 'Фанат';
        levelColor = '#f59e0b';
        message = 'Неплохо, но можно лучше!';
        icon = 'fas fa-heart';
    } else if (accuracy >= 50) {
        level = 'Зритель';
        levelColor = '#ef4444';
        message = 'Продолжай смотреть аниме!';
        icon = 'fas fa-user';
    }
    
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
    GameState.currentRound = 1;
    GameState.score = 0;
    GameState.timeLeft = CONFIG.TIME_PER_ROUND;
    GameState.currentFrame = null;
    GameState.usedFrameIds = [];
    GameState.gameActive = false;
    GameState.correctAnswers = 0;
    GameState.hintsUsed = 0;
    GameState.skipsUsed = 0;
    GameState.availableFrames = [...ANIME_FRAMES_DATABASE];
    
    clearInterval(GameState.timer);
    clearTimeout(GameState.hintTimer);
    
    document.getElementById('scoreValue').textContent = '0';
    document.getElementById('timerValue').textContent = '45';
    document.getElementById('timerDisplay').textContent = '45';
    document.getElementById('roundValue').textContent = '1/10';
    document.getElementById('answerInput').value = '';
    document.getElementById('hintText').textContent = 'Подсказка появится через 10 секунд';
    document.getElementById('resultOverlay').style.display = 'none';
    document.getElementById('progressPercent').textContent = '0%';
    document.getElementById('progressFill').style.width = '0%';
    document.getElementById('framePlaceholder').style.display = 'flex';
    document.getElementById('animeFrame').src = '';
    document.getElementById('optionsGrid').innerHTML = '';
    
    resetTimerColor();
    updateProgressDots();
    
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
    const text = `Я набрал ${GameState.score} очков в игре "Угадай аниме по кадру" на Kirava Games! 🎮\nПопробуй и ты: ${window.location.href}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Мой результат в игре "Угадай аниме"',
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