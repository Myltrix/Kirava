// static/javascript/quiz-detail.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('Quiz detail script loaded');
    
    // Элементы DOM
    const startQuizBtn = document.getElementById('startQuizBtn');
    const quizContainer = document.getElementById('quizContainer');
    const resultsContainer = document.getElementById('resultsContainer');
    const descriptionSection = document.getElementById('descriptionSection');
    
    // Переменные состояния викторины
    let currentQuiz = null;
    let currentQuestionIndex = 0;
    let userAnswers = {};
    let quizTimer = null;
    let timeLeft = 0;
    let totalTimeSpent = 0;
    let quizStartTime = null;
    let questionTimes = [];
    let questionsData = [];
    
    // Если пользователь не авторизован
    if (!window.isAuthenticated) {
        if (startQuizBtn) startQuizBtn.style.display = 'none';
        return;
    }
    
    // Проверяем наличие элементов
    if (!startQuizBtn) {
        console.error('❌ Кнопка "Начать викторину" не найдена');
        return;
    }
    
    if (!quizContainer) {
        console.error('❌ Контейнер викторины не найден');
        return;
    }
    
    if (!descriptionSection) {
        console.error('❌ Секция описания не найдена');
        return;
    }
    
    console.log('✅ Все элементы найдены, готовы к работе');
    
    // Начало викторины
    startQuizBtn.addEventListener('click', startQuiz);
    
    async function startQuiz() {
        try {
            console.log('🟡 Начинаем загрузку викторины...');
            
            // Показываем индикатор загрузки
            startQuizBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Загрузка...';
            startQuizBtn.disabled = true;
            
            // Получаем quizSlug из глобальной переменной
            if (!window.quizSlug) {
                showNotification('Ошибка: не найден идентификатор викторины', 'error');
                resetStartButton();
                return;
            }
            
            console.log('📡 Отправляем запрос на /quiz/' + window.quizSlug + '/start/');
            
            const response = await fetch(`/quiz/${window.quizSlug}/start/`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            console.log('📥 Ответ получен, статус:', response.status);
            
            if (!response.ok) {
                throw new Error(`HTTP ошибка! Статус: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('📊 Данные получены:', data);
            
            if (!data.success) {
                showNotification('Ошибка при загрузке викторины: ' + (data.error || 'Неизвестная ошибка'), 'error');
                resetStartButton();
                return;
            }
            
            if (!data.questions || data.questions.length === 0) {
                showNotification('В этой викторине нет вопросов', 'error');
                resetStartButton();
                return;
            }
            
            console.log('✅ Викторина загружена:', data.quiz.title);
            console.log('✅ Вопросов:', data.questions.length);
            
            currentQuiz = data.quiz;
            questionsData = data.questions;
            userAnswers = {};
            currentQuestionIndex = 0;
            totalTimeSpent = 0;
            questionTimes = [];
            quizStartTime = Date.now();
            
            // Скрываем описание и показываем контейнер викторины
            descriptionSection.style.display = 'none';
            quizContainer.style.display = 'block';
            
            if (resultsContainer) {
                resultsContainer.style.display = 'none';
            }
            
            // Устанавливаем заголовок
            const quizCurrentTitle = document.getElementById('quizCurrentTitle');
            const totalQuestionsElement = document.getElementById('totalQuestions');
            
            if (quizCurrentTitle && currentQuiz.title) {
                quizCurrentTitle.textContent = currentQuiz.title;
            }
            
            if (totalQuestionsElement && currentQuiz.total_questions) {
                totalQuestionsElement.textContent = `из ${currentQuiz.total_questions}`;
            }
            
            // Загружаем первый вопрос
            loadQuestion(currentQuestionIndex);
            updateProgress();
            startTimer();
            
            console.log('✅ Викторина успешно начата');
            
        } catch (error) {
            console.error('❌ Ошибка при начале викторины:', error);
            showNotification('Ошибка при загрузке викторины: ' + error.message, 'error');
        } finally {
            resetStartButton();
        }
    }
    
    function resetStartButton() {
        if (startQuizBtn) {
            startQuizBtn.innerHTML = '<i class="fas fa-play"></i> Начать викторину';
            startQuizBtn.disabled = false;
        }
    }
    
    function loadQuestion(index) {
        const questionsContainer = document.getElementById('questionsContainer');
        
        if (!questionsContainer) {
            console.error('❌ Контейнер вопросов не найден');
            return;
        }
        
        if (!questionsData || index >= questionsData.length) {
            console.error('❌ Нет данных вопросов или индекс вне диапазона');
            return;
        }
        
        const question = questionsData[index];
        console.log(`📝 Загружаем вопрос ${index + 1}: ${question.text.substring(0, 50)}...`);
        
        // Создаем HTML для вопроса
        let html = `
            <div class="question-container active" data-index="${index}">
                <div class="question-card">
                    <div class="question-text">${index + 1}. ${question.text}</div>
        `;
        
        if (question.image_url) {
            html += `<img src="${question.image_url}" alt="Изображение вопроса" class="question-image">`;
        }
        
        html += `<div class="answers-grid">`;
        
        // Перемешиваем ответы для каждого вопроса
        const shuffledAnswers = shuffleArray([...question.answers]);
        
        shuffledAnswers.forEach((answer, i) => {
            const isSelected = userAnswers[question.id] === answer.id;
            
            html += `
                <div class="answer-option ${isSelected ? 'selected' : ''}" 
                     data-question="${question.id}" 
                     data-answer="${answer.id}"
                     data-is-correct="${answer.is_correct}">
                    <div class="answer-radio"></div>
                    <div class="answer-text">${answer.text}</div>
                </div>
            `;
        });
        
        html += `</div></div></div>`;
        
        questionsContainer.innerHTML = html;
        
        // Добавляем обработчики для ответов
        document.querySelectorAll('.answer-option').forEach(option => {
            option.addEventListener('click', selectAnswer);
        });
        
        // Обновляем навигацию
        updateNavigation();
        
        // Сбрасываем таймер
        resetTimer();
        
        console.log(`✅ Вопрос ${index + 1} загружен`);
    }
    
    function selectAnswer(e) {
        const option = e.currentTarget;
        const questionId = option.dataset.question;
        const answerId = option.dataset.answer;
        
        console.log(`📝 Выбран ответ для вопроса ${questionId}: ${answerId}`);
        
        // Сохраняем время ответа
        questionTimes[currentQuestionIndex] = timeLeft;
        
        // Снимаем выделение с других ответов этого вопроса
        document.querySelectorAll(`[data-question="${questionId}"]`).forEach(opt => {
            opt.classList.remove('selected');
        });
        
        // Выделяем выбранный ответ
        option.classList.add('selected');
        
        // Сохраняем ответ
        userAnswers[questionId] = answerId;
        
        // Показываем анимацию выбора
        option.style.animation = 'pulse 0.3s ease';
        setTimeout(() => {
            option.style.animation = '';
        }, 300);
        
        // Автоматически переходим к следующему вопросу через 1 секунду
        setTimeout(() => {
            if (currentQuestionIndex < currentQuiz.total_questions - 1) {
                goToNextQuestion();
            } else {
                // Если это последний вопрос, показываем кнопку завершения
                document.getElementById('nextBtn').style.display = 'none';
                document.getElementById('submitBtn').style.display = 'inline-flex';
            }
        }, 1000);
    }
    
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    function updateProgress() {
        const progress = ((currentQuestionIndex + 1) / currentQuiz.total_questions) * 100;
        const progressFill = document.getElementById('progressFill');
        const currentQuestion = document.getElementById('currentQuestion');
        
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
        
        if (currentQuestion) {
            currentQuestion.textContent = `Вопрос ${currentQuestionIndex + 1}`;
        }
    }
    
    function updateNavigation() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const submitBtn = document.getElementById('submitBtn');
        const skipBtn = document.getElementById('skipBtn');
        
        if (!prevBtn || !nextBtn || !submitBtn || !skipBtn) {
            console.error('❌ Не найдены кнопки навигации');
            return;
        }
        
        // Кнопка "Назад"
        prevBtn.disabled = currentQuestionIndex === 0;
        
        // Кнопка "Пропустить" (только не для последнего вопроса)
        skipBtn.style.display = currentQuestionIndex < currentQuiz.total_questions - 1 ? 'inline-flex' : 'none';
        
        // Кнопка "Далее" / "Завершить"
        if (currentQuestionIndex === currentQuiz.total_questions - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-flex';
        } else {
            nextBtn.style.display = 'inline-flex';
            submitBtn.style.display = 'none';
        }
        
        // Обработчики
        prevBtn.onclick = goToPreviousQuestion;
        nextBtn.onclick = goToNextQuestion;
        submitBtn.onclick = submitQuiz;
        skipBtn.onclick = skipQuestion;
    }
    
    function goToPreviousQuestion() {
        if (currentQuestionIndex > 0) {
            // Сохраняем время текущего вопроса
            questionTimes[currentQuestionIndex] = timeLeft;
            
            currentQuestionIndex--;
            loadQuestion(currentQuestionIndex);
            updateProgress();
            
            // Восстанавливаем таймер из сохраненного времени
            if (questionTimes[currentQuestionIndex] !== undefined) {
                timeLeft = questionTimes[currentQuestionIndex];
                updateTimerDisplay();
            }
        }
    }
    
    function goToNextQuestion() {
        if (currentQuestionIndex < currentQuiz.total_questions - 1) {
            // Сохраняем время текущего вопроса
            questionTimes[currentQuestionIndex] = timeLeft;
            
            currentQuestionIndex++;
            loadQuestion(currentQuestionIndex);
            updateProgress();
            
            // Восстанавливаем таймер из сохраненного времени
            if (questionTimes[currentQuestionIndex] !== undefined) {
                timeLeft = questionTimes[currentQuestionIndex];
                updateTimerDisplay();
            }
        }
    }
    
    function skipQuestion() {
        if (currentQuestionIndex < currentQuiz.total_questions - 1) {
            // Сохраняем, что вопрос пропущен
            const question = questionsData[currentQuestionIndex];
            userAnswers[question.id] = null;
            questionTimes[currentQuestionIndex] = timeLeft;
            
            currentQuestionIndex++;
            loadQuestion(currentQuestionIndex);
            updateProgress();
        }
    }
    
    // Таймер
    function startTimer() {
        if (timeLeft <= 0) {
            timeLeft = currentQuiz.time_limit;
        }
        updateTimerDisplay();
        
        quizTimer = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            
            if (timeLeft <= 0) {
                clearInterval(quizTimer);
                // Автоматически переходим к следующему вопросу
                if (currentQuestionIndex < currentQuiz.total_questions - 1) {
                    skipQuestion();
                } else {
                    submitQuiz();
                }
            }
        }, 1000);
    }
    
    function resetTimer() {
        clearInterval(quizTimer);
        startTimer();
    }
    
    function updateTimerDisplay() {
        const timerElement = document.getElementById('timer');
        
        if (!timerElement) return;
        
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Меняем цвет при низком времени
        if (timeLeft <= 5) {
            timerElement.style.color = '#e53e3e';
            timerElement.style.animation = 'pulse 0.5s infinite';
        } else if (timeLeft <= 10) {
            timerElement.style.color = '#ed8936';
            timerElement.style.animation = '';
        } else {
            timerElement.style.color = 'white';
            timerElement.style.animation = '';
        }
    }
    
    async function submitQuiz() {
        clearInterval(quizTimer);
        
        // Рассчитываем общее время
        totalTimeSpent = Math.floor((Date.now() - quizStartTime) / 1000);
        
        try {
            // Показываем индикатор загрузки
            const submitBtn = document.getElementById('submitBtn');
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Обработка...';
                submitBtn.disabled = true;
            }
            
            console.log('📤 Отправляем результаты викторины...');
            
            const response = await fetch(`/quiz/${window.quizSlug}/submit/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': window.csrfToken
                },
                body: JSON.stringify({
                    answers: userAnswers,
                    time_spent: totalTimeSpent
                })
            });
            
            console.log('📥 Ответ от сервера получен');
            
            const result = await response.json();
            console.log('📊 Результаты:', result);
            
            if (result.success) {
                showResults(result.result);
                console.log('✅ Результаты сохранены');
            } else {
                showNotification('Ошибка при сохранении результатов: ' + result.error, 'error');
            }
            
        } catch (error) {
            console.error('❌ Ошибка при отправке результатов:', error);
            showNotification('Ошибка при отправке результатов', 'error');
        } finally {
            const submitBtn = document.getElementById('submitBtn');
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Завершить';
                submitBtn.disabled = false;
            }
        }
    }
    
    function showResults(result) {
        if (quizContainer) {
            quizContainer.style.display = 'none';
        }
        
        if (resultsContainer) {
            resultsContainer.style.display = 'block';
        }
        
        console.log('📊 Показываем результаты:', result);
        
        // Отображаем результаты
        const scoreElement = document.getElementById('finalScore');
        const percentage = result.percentage;
        
        // Добавляем звезды рейтинга
        let stars = '';
        let message = '';
        if (percentage >= 90) {
            stars = '★★★★★';
            message = 'Отлично! Вы настоящий эксперт!';
        } else if (percentage >= 70) {
            stars = '★★★★☆';
            message = 'Очень хорошо! Отличный результат!';
        } else if (percentage >= 50) {
            stars = '★★★☆☆';
            message = 'Хорошо! Есть куда стремиться!';
        } else if (percentage >= 30) {
            stars = '★★☆☆☆';
            message = 'Неплохо! Попробуйте еще раз!';
        } else {
            stars = '★☆☆☆☆';
            message = 'Попробуйте пройти викторину еще раз!';
        }
        
        if (scoreElement) scoreElement.innerHTML = `${result.percentage}%`;
        
        const resultsStars = document.getElementById('resultsStars');
        if (resultsStars) resultsStars.textContent = stars;
        
        const resultsMessage = document.getElementById('resultsMessage');
        if (resultsMessage) resultsMessage.textContent = message;
        
        const correctAnswers = document.getElementById('correctAnswers');
        if (correctAnswers) correctAnswers.textContent = result.score;
        
        const wrongAnswers = document.getElementById('wrongAnswers');
        if (wrongAnswers) wrongAnswers.textContent = result.total - result.score;
        
        const timeSpent = document.getElementById('timeSpent');
        if (timeSpent) timeSpent.textContent = `${result.time_spent}с`;
        
        const accuracy = document.getElementById('accuracy');
        if (accuracy) accuracy.textContent = `${result.percentage}%`;
        
        const totalPoints = document.getElementById('totalPoints');
        if (totalPoints) totalPoints.textContent = `+${result.points_earned}`;
        
        // Детали очков
        const pointsBreakdown = document.getElementById('pointsBreakdown');
        if (pointsBreakdown) {
            pointsBreakdown.innerHTML = `
                <div class="points-item">
                    <span class="points-label">Правильные ответы (${result.score} × 10)</span>
                    <span class="points-value">+${result.score * 10}</span>
                </div>
                <div class="points-item">
                    <span class="points-label">Бонус за точность</span>
                    <span class="points-value">+${result.points_earned - (result.score * 10 + result.time_bonus + result.difficulty_bonus)}</span>
                </div>
                <div class="points-item">
                    <span class="points-label">Бонус за скорость</span>
                    <span class="points-value">+${result.time_bonus}</span>
                </div>
                <div class="points-item">
                    <span class="points-label">Бонус за сложность</span>
                    <span class="points-value">+${result.difficulty_bonus}</span>
                </div>
            `;
        }
        
        // Обработчики для кнопок
        const reviewBtn = document.getElementById('reviewBtn');
        if (reviewBtn) {
            reviewBtn.onclick = () => {
                reviewAnswers();
            };
        }
        
        const restartBtn = document.getElementById('restartBtn');
        if (restartBtn) {
            restartBtn.onclick = () => {
                location.reload();
            };
        }
        
        // Показываем уведомление о получении очков
        if (result.points_earned > 0) {
            setTimeout(() => {
                showNotification(`Получено ${result.points_earned} очков!`, 'success');
            }, 500);
        }
    }
    
    function reviewAnswers() {
        // Создаем модальное окно с ответами
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Правильные ответы</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="answers-review">
                        ${questionsData.map((question, index) => {
                            const userAnswerId = userAnswers[question.id];
                            const userAnswer = question.answers.find(a => a.id == userAnswerId);
                            const correctAnswer = question.answers.find(a => a.is_correct);
                            
                            return `
                                <div class="review-item ${userAnswerId && userAnswer && userAnswer.is_correct ? 'correct' : 'incorrect'}">
                                    <div class="review-question">
                                        <strong>Вопрос ${index + 1}:</strong> ${question.text}
                                    </div>
                                    <div class="review-answers">
                                        <div class="user-answer">
                                            <strong>Ваш ответ:</strong> ${userAnswer ? userAnswer.text : 'Не отвечено'}
                                            ${userAnswerId ? (userAnswer && userAnswer.is_correct ? ' ✓' : ' ✗') : ''}
                                        </div>
                                        <div class="correct-answer">
                                            <strong>Правильный ответ:</strong> ${correctAnswer ? correctAnswer.text : 'Не найден'}
                                        </div>
                                    </div>
                                    ${question.explanation ? `
                                        <div class="explanation">
                                            <strong>Объяснение:</strong> ${question.explanation}
                                        </div>
                                    ` : ''}
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-quiz modal-close-btn">Закрыть</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Закрытие модального окна
        const closeModal = () => {
            document.body.removeChild(modal);
        };
        
        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.querySelector('.modal-close-btn').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }
    
    function showNotification(message, type = 'success') {
        // Удаляем старые уведомления
        const oldNotifications = document.querySelectorAll('.notification');
        oldNotifications.forEach(notif => notif.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Автоматическое удаление через 5 секунд
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideIn 0.3s ease reverse';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }
        }, 5000);
        
        // Закрытие по клику
        notification.addEventListener('click', () => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        });
    }
    
    // Горячие клавиши
    document.addEventListener('keydown', (e) => {
        // Проверяем, видна ли викторина
        const quizContainer = document.getElementById('quizContainer');
        if (!quizContainer || quizContainer.style.display === 'none') return;
        
        switch(e.key) {
            case 'ArrowLeft':
                const prevBtn = document.getElementById('prevBtn');
                if (prevBtn && !prevBtn.disabled) {
                    goToPreviousQuestion();
                }
                break;
            case 'ArrowRight':
            case ' ':
                const nextBtn = document.getElementById('nextBtn');
                if (nextBtn && nextBtn.style.display !== 'none') {
                    goToNextQuestion();
                }
                break;
            case 'Enter':
                const submitBtn = document.getElementById('submitBtn');
                if (submitBtn && submitBtn.style.display !== 'none') {
                    submitQuiz();
                }
                break;
            case '1':
            case '2':
            case '3':
            case '4':
                const index = parseInt(e.key) - 1;
                const answers = document.querySelectorAll('.answer-option');
                if (answers[index]) {
                    answers[index].click();
                }
                break;
        }
    });
});