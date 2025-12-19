// subjects-detail.js - идентичный quiz-detail.js но для предметов

class TopicQuiz {
    constructor() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.selectedAnswers = {};
        this.startTime = null;
        this.timerInterval = null;
        this.timeSpent = 0;
        this.isQuizActive = false;
        
        this.initElements();
        this.bindEvents();
        
        // Проверяем авторизацию
        if (!window.isAuthenticated) {
            this.showNotification('Для прохождения викторины необходимо войти в аккаунт', 'error');
        }
    }

    initElements() {
        this.elements = {
            startBtn: document.getElementById('startTopicBtn'),
            descriptionSection: document.getElementById('descriptionSection'),
            topicContainer: document.getElementById('topicContainer'),
            resultsContainer: document.getElementById('resultsContainer'),
            questionsContainer: document.getElementById('questionsContainer'),
            progressFill: document.getElementById('progressFill'),
            currentQuestion: document.getElementById('currentQuestion'),
            totalQuestions: document.getElementById('totalQuestions'),
            timer: document.getElementById('timer'),
            prevBtn: document.getElementById('prevBtn'),
            nextBtn: document.getElementById('nextBtn'),
            skipBtn: document.getElementById('skipBtn'),
            submitBtn: document.getElementById('submitBtn'),
            restartBtn: document.getElementById('restartBtn'),
            reviewBtn: document.getElementById('reviewBtn'),
            finalScore: document.getElementById('finalScore'),
            correctAnswers: document.getElementById('correctAnswers'),
            wrongAnswers: document.getElementById('wrongAnswers'),
            timeSpent: document.getElementById('timeSpent'),
            accuracy: document.getElementById('accuracy'),
            resultsStars: document.getElementById('resultsStars'),
            resultsMessage: document.getElementById('resultsMessage'),
            totalPoints: document.getElementById('totalPoints'),
            pointsBreakdown: document.getElementById('pointsBreakdown')
        };
    }

    bindEvents() {
        this.elements.startBtn?.addEventListener('click', () => this.startQuiz());
        this.elements.prevBtn?.addEventListener('click', () => this.prevQuestion());
        this.elements.nextBtn?.addEventListener('click', () => this.nextQuestion());
        this.elements.skipBtn?.addEventListener('click', () => this.skipQuestion());
        this.elements.submitBtn?.addEventListener('click', () => this.submitQuiz());
        this.elements.restartBtn?.addEventListener('click', () => this.restartQuiz());
        this.elements.reviewBtn?.addEventListener('click', () => this.showReview());
    }

    async startQuiz() {
        try {
            if (!window.isAuthenticated) {
                this.showNotification('Для прохождения викторины необходимо войти в аккаунт', 'error');
                return;
            }

            this.showNotification('Загрузка вопросов...', 'success');
            
            const response = await fetch(`/subjects/api/${window.SUBJECT_SLUG}/${window.TOPIC_SLUG}/questions/`);
            if (!response.ok) throw new Error('Ошибка загрузки вопросов');
            
            const data = await response.json();
            this.questions = data.questions;
            
            // Прячем описание и показываем викторину
            this.elements.descriptionSection.style.display = 'none';
            this.elements.topicContainer.style.display = 'block';
            this.elements.resultsContainer.style.display = 'none';
            
            // Обновляем информацию
            this.elements.totalQuestions.textContent = `из ${this.questions.length}`;
            
            // Инициализируем викторину
            this.currentQuestionIndex = 0;
            this.selectedAnswers = {};
            this.startTime = Date.now();
            this.timeSpent = 0;
            this.isQuizActive = true;
            
            // Запускаем таймер
            this.startTimer();
            
            // Показываем первый вопрос
            this.showQuestion(this.currentQuestionIndex);
            
            this.showNotification('Викторина началась! Удачи!', 'success');
            
        } catch (error) {
            console.error('Error starting quiz:', error);
            this.showNotification('Ошибка загрузки вопросов', 'error');
        }
    }

    startTimer() {
        if (this.timerInterval) clearInterval(this.timerInterval);
        
        this.timerInterval = setInterval(() => {
            this.timeSpent = Math.floor((Date.now() - this.startTime) / 1000);
            this.updateTimerDisplay();
        }, 1000);
        
        this.updateTimerDisplay();
    }

    updateTimerDisplay() {
        if (!this.elements.timer) return;
        
        const minutes = Math.floor(this.timeSpent / 60);
        const seconds = this.timeSpent % 60;
        this.elements.timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    showQuestion(index) {
        if (index < 0 || index >= this.questions.length) return;
        
        this.currentQuestionIndex = index;
        
        // Обновляем прогресс
        const progress = ((index + 1) / this.questions.length) * 100;
        this.elements.progressFill.style.width = `${progress}%`;
        this.elements.currentQuestion.textContent = `Вопрос ${index + 1}`;
        
        // Обновляем навигацию
        this.elements.prevBtn.disabled = index === 0;
        this.elements.nextBtn.style.display = index === this.questions.length - 1 ? 'none' : 'inline-flex';
        this.elements.submitBtn.style.display = index === this.questions.length - 1 ? 'inline-flex' : 'none';
        
        // Отображаем вопрос
        this.renderQuestion(this.questions[index]);
    }

    renderQuestion(question) {
        if (!this.elements.questionsContainer) return;
        
        const questionHTML = `
            <div class="question-container active">
                <div class="question-card">
                    <div class="question-text">${question.text}</div>
                    <div class="answers-grid" id="answersGrid-${question.id}">
                        ${question.answers.map((answer, idx) => `
                            <div class="answer-option" data-question-id="${question.id}" data-answer-id="${answer.id}">
                                <div class="answer-radio"></div>
                                <div class="answer-text">${answer.text}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        
        this.elements.questionsContainer.innerHTML = questionHTML;
        
        // Добавляем обработчики для вариантов ответов
        const answerOptions = this.elements.questionsContainer.querySelectorAll('.answer-option');
        answerOptions.forEach(option => {
            option.addEventListener('click', (e) => this.selectAnswer(e));
        });
        
        // Восстанавливаем выбранный ответ, если он есть
        const selectedAnswerId = this.selectedAnswers[question.id];
        if (selectedAnswerId) {
            const selectedOption = this.elements.questionsContainer.querySelector(
                `.answer-option[data-answer-id="${selectedAnswerId}"]`
            );
            if (selectedOption) {
                selectedOption.classList.add('selected');
            }
        }
    }

    selectAnswer(event) {
        if (!this.isQuizActive) return;
        
        const answerOption = event.currentTarget;
        const questionId = parseInt(answerOption.dataset.questionId);
        const answerId = parseInt(answerOption.dataset.answerId);
        
        // Снимаем выделение с других вариантов
        const allOptions = answerOption.parentElement.querySelectorAll('.answer-option');
        allOptions.forEach(opt => opt.classList.remove('selected'));
        
        // Выделяем выбранный вариант
        answerOption.classList.add('selected');
        
        // Сохраняем ответ
        this.selectedAnswers[questionId] = answerId;
        
        // Активируем кнопку "Далее", если это не последний вопрос
        if (this.currentQuestionIndex < this.questions.length - 1) {
            setTimeout(() => {
                if (this.elements.nextBtn) {
                    this.elements.nextBtn.disabled = false;
                }
            }, 300);
        }
    }

    prevQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.showQuestion(this.currentQuestionIndex - 1);
        }
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.showQuestion(this.currentQuestionIndex + 1);
        }
    }

    skipQuestion() {
        // Помечаем вопрос как пропущенный
        const currentQuestion = this.questions[this.currentQuestionIndex];
        this.selectedAnswers[currentQuestion.id] = null;
        
        // Переходим к следующему вопросу
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.showQuestion(this.currentQuestionIndex + 1);
        } else {
            this.submitQuiz();
        }
    }

    async submitQuiz() {
        if (!this.isQuizActive) return;
        
        this.isQuizActive = false;
        clearInterval(this.timerInterval);
        
        // Отправляем результаты на сервер
        try {
            const response = await fetch(`/subjects/api/${window.SUBJECT_SLUG}/${window.TOPIC_SLUG}/submit/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': window.CSRF_TOKEN
                },
                body: JSON.stringify({
                    answers: this.selectedAnswers,
                    time_spent: this.timeSpent
                })
            });
            
            if (!response.ok) throw new Error('Ошибка отправки результатов');
            
            const result = await response.json();
            
            // Показываем результаты
            this.showResults(result);
            
        } catch (error) {
            console.error('Error submitting quiz:', error);
            this.showNotification('Ошибка отправки результатов', 'error');
        }
    }

    showResults(result) {
        // Прячем контейнер викторины и показываем результаты
        this.elements.topicContainer.style.display = 'none';
        this.elements.resultsContainer.style.display = 'block';
        
        // Обновляем результаты
        this.elements.finalScore.textContent = `${result.score}%`;
        this.elements.correctAnswers.textContent = result.correct;
        this.elements.wrongAnswers.textContent = result.total - result.correct;
        this.elements.timeSpent.textContent = `${result.time_spent}с`;
        this.elements.accuracy.textContent = result.total > 0 ? 
            `${Math.round((result.correct / result.total) * 100)}%` : '0%';
        
        // Обновляем звёзды
        this.updateStars(result.score);
        
        // Обновляем сообщение
        this.updateMessage(result.score);
        
        // Рассчитываем очки
        this.calculatePoints(result);
        
        // Сохраняем детали результатов для просмотра
        this.quizResult = result;
    }

    updateStars(score) {
        const starsCount = Math.min(5, Math.ceil(score / 20));
        const stars = '★'.repeat(starsCount) + '☆'.repeat(5 - starsCount);
        this.elements.resultsStars.textContent = stars;
    }

    updateMessage(score) {
        let message = '';
        if (score >= 90) {
            message = 'Отличный результат! Вы настоящий эксперт! 🎉';
        } else if (score >= 70) {
            message = 'Хороший результат! Вы хорошо разбираетесь в теме! 👍';
        } else if (score >= 50) {
            message = 'Неплохо! Есть что повторить 📚';
        } else {
            message = 'Попробуйте еще раз! У вас обязательно получится! 💪';
        }
        this.elements.resultsMessage.textContent = message;
    }

    calculatePoints(result) {
        let totalPoints = 0;
        const breakdown = [];
        
        // Очки за правильные ответы
        const correctPoints = result.correct * 100;
        totalPoints += correctPoints;
        breakdown.push({
            label: 'За правильные ответы',
            points: `+${correctPoints}`
        });
        
        // Бонус за скорость (меньше времени = больше очков)
        const maxTime = 300; // 5 минут
        const timeBonus = Math.max(0, 500 - Math.floor(result.time_spent / 10));
        totalPoints += timeBonus;
        if (timeBonus > 0) {
            breakdown.push({
                label: 'Бонус за скорость',
                points: `+${timeBonus}`
            });
        }
        
        // Бонус за точность
        if (result.score >= 90) {
            totalPoints += 1000;
            breakdown.push({
                label: 'Бонус за отличный результат',
                points: '+1000'
            });
        } else if (result.score >= 70) {
            totalPoints += 500;
            breakdown.push({
                label: 'Бонус за хороший результат',
                points: '+500'
            });
        }
        
        // Отображаем очки
        this.elements.totalPoints.textContent = `+${totalPoints}`;
        
        // Отображаем детализацию
        this.elements.pointsBreakdown.innerHTML = breakdown.map(item => `
            <div class="points-item">
                <span class="points-label">${item.label}</span>
                <span class="points-value">${item.points}</span>
            </div>
        `).join('');
    }

    showReview() {
        if (!this.quizResult?.details) return;
        
        const modalHTML = `
            <div class="modal-overlay" id="reviewModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Просмотр ответов</h3>
                        <button class="modal-close" id="closeReviewModal">×</button>
                    </div>
                    <div class="modal-body">
                        <div class="answers-review">
                            ${this.quizResult.details.map((detail, index) => `
                                <div class="review-item ${detail.is_correct ? 'correct' : 'incorrect'}">
                                    <div class="review-question">
                                        <strong>Вопрос ${index + 1}:</strong> ${detail.question_text}
                                    </div>
                                    <div class="review-answers">
                                        <div class="user-answer">
                                            <strong>Ваш ответ:</strong> ${detail.selected_answer || 'Нет ответа'}
                                        </div>
                                        ${!detail.is_correct ? `
                                            <div class="correct-answer">
                                                <strong>Правильный ответ:</strong> ${detail.correct_answer}
                                            </div>
                                        ` : ''}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="modal-close-btn" id="closeModalBtn">Закрыть</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Добавляем обработчики закрытия
        document.getElementById('closeReviewModal')?.addEventListener('click', () => {
            document.getElementById('reviewModal')?.remove();
        });
        
        document.getElementById('closeModalBtn')?.addEventListener('click', () => {
            document.getElementById('reviewModal')?.remove();
        });
        
        // Закрытие по клику на оверлей
        document.getElementById('reviewModal')?.addEventListener('click', (e) => {
            if (e.target.id === 'reviewModal') {
                e.target.remove();
            }
        });
    }

    restartQuiz() {
        // Сбрасываем все переменные
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.selectedAnswers = {};
        this.startTime = null;
        this.timeSpent = 0;
        this.isQuizActive = false;
        this.quizResult = null;
        
        // Очищаем интервалы
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        
        // Сбрасываем отображение
        this.elements.resultsContainer.style.display = 'none';
        this.elements.descriptionSection.style.display = 'block';
        
        // Прокручиваем к началу
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        this.showNotification('Готовы начать заново? Нажмите "Начать обучение"', 'success');
    }

    showNotification(message, type = 'info') {
        // Удаляем старые уведомления
        const oldNotifications = document.querySelectorAll('.notification');
        oldNotifications.forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Автоматическое удаление через 5 секунд
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.4s ease';
            setTimeout(() => notification.remove(), 400);
        }, 5000);
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    window.topicQuiz = new TopicQuiz();
});