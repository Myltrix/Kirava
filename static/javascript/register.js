// ФОРМА РЕГИСТРАЦИИ
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== ФОРМА РЕГИСТРАЦИИ ЗАГРУЖЕНА ===');
    
    // Флаг для отслеживания попытки отправки
    let formSubmitted = false;
    
    // 1. Находим все элементы
    const form = document.getElementById('registerForm');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const terms = document.getElementById('terms');
    const submitBtn = document.getElementById('submitBtn');
    const termsError = document.getElementById('termsError');
    
    // 2. Функция проверки полей и показа ошибок
    function validateField(field, value) {
        const fieldId = field.id;
        const errorElement = document.getElementById(fieldId + 'Error');
        
        // Очищаем предыдущую ошибку
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }
        
        // Проверяем в зависимости от поля
        if (fieldId === 'username') {
            const usernameValue = value.trim();
            if (!usernameValue) {
                return false;
            }
            if (usernameValue.length < 3) {
                showError('usernameError', 'Минимум 3 символа');
                return false;
            }
            if (usernameValue.length > 30) {
                showError('usernameError', 'Максимум 30 символов');
                return false;
            }
            return true;
        }
        
        if (fieldId === 'email') {
            const emailValue = value.trim();
            if (!emailValue) {
                return false;
            }
            if (!emailValue.includes('@') || !emailValue.includes('.')) {
                showError('emailError', 'Введите правильный email');
                return false;
            }
            return true;
        }
        
        if (fieldId === 'password') {
            if (!value) {
                return false;
            }
            if (value.length < 8) {
                showError('passwordError', 'Минимум 8 символов');
                return false;
            }
            return true;
        }
        
        if (fieldId === 'confirmPassword') {
            if (!value) {
                return false;
            }
            if (value !== password.value) {
                showError('confirmPasswordError', 'Пароли не совпадают');
                return false;
            }
            return true;
        }
        
        return false;
    }
    
    // 3. Функция показа ошибок
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (!errorElement) return;
        
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
    
    // 4. Функция скрытия ошибок
    function hideError(elementId) {
        const errorElement = document.getElementById(elementId);
        if (!errorElement) return;
        
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
    
    // 5. Функция проверки чекбокса
    function checkTerms() {
        if (!terms.checked && formSubmitted) {
            showError('termsError', 'Примите условия соглашения');
            return false;
        } else {
            hideError('termsError');
            return true;
        }
    }
    
    // 6. Функция проверки всех полей (для кнопки)
    function checkAllFieldsForButton() {
        const usernameValue = username.value.trim();
        const emailValue = email.value.trim();
        const passwordValue = password.value;
        const confirmValue = confirmPassword.value;
        
        return (
            usernameValue.length >= 3 &&
            usernameValue.length <= 30 &&
            emailValue.includes('@') &&
            emailValue.includes('.') &&
            emailValue.length > 5 &&
            passwordValue.length >= 8 &&
            passwordValue === confirmValue &&
            confirmValue.length > 0
        );
    }
    
    // 7. Функция обновления кнопки
    function updateSubmitButton() {
        const inputsValid = checkAllFieldsForButton();
        submitBtn.disabled = !inputsValid;
        
        submitBtn.classList.remove('success');
        
        if (inputsValid) {
            console.log('✅ Все поля заполнены правильно. Кнопка активна.');
        }
    }
    
    // 8. Слушаем изменения во всех полях
    username.addEventListener('input', function() {
        validateField(this, this.value);
        updateSubmitButton();
    });
    
    email.addEventListener('input', function() {
        validateField(this, this.value);
        updateSubmitButton();
    });
    
    password.addEventListener('input', function() {
        validateField(this, this.value);
        if (confirmPassword.value) {
            validateField(confirmPassword, confirmPassword.value);
        }
        updateSubmitButton();
    });
    
    confirmPassword.addEventListener('input', function() {
        validateField(this, this.value);
        updateSubmitButton();
    });
    
    // 9. Слушаем blur событие (когда поле теряет фокус)
    username.addEventListener('blur', function() {
        if (this.value.trim()) {
            validateField(this, this.value);
        }
    });
    
    email.addEventListener('blur', function() {
        if (this.value.trim()) {
            validateField(this, this.value);
        }
    });
    
    password.addEventListener('blur', function() {
        if (this.value) {
            validateField(this, this.value);
        }
    });
    
    confirmPassword.addEventListener('blur', function() {
        if (this.value) {
            validateField(this, this.value);
        }
    });
    
    // 10. Переключение видимости пароля - ИСПРАВЛЕННАЯ ВЕРСИЯ
    document.querySelectorAll('.password-toggle').forEach(button => {
        button.addEventListener('click', function() {
            console.log('Глазок нажат');
            
            // Находим ближайшее поле ввода пароля
            const inputContainer = this.closest('.input-container');
            const input = inputContainer.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.className = 'fas fa-eye-slash';
                console.log('Пароль показан');
            } else {
                input.type = 'password';
                icon.className = 'fas fa-eye';
                console.log('Пароль скрыт');
            }
            
            // Фокусируемся на поле ввода
            input.focus();
        });
    });
    
    // 11. Обработка отправки формы
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Устанавливаем флаг, что была попытка отправки
        formSubmitted = true;
        
        console.log('🔄 Попытка отправки формы...');
        
        // Проверяем все поля перед отправкой
        let allValid = true;
        
        // Проверяем каждое поле
        if (!validateField(username, username.value)) {
            if (!username.value.trim()) {
                showError('usernameError', 'Введите имя пользователя');
            }
            allValid = false;
        }
        
        if (!validateField(email, email.value)) {
            if (!email.value.trim()) {
                showError('emailError', 'Введите email');
            }
            allValid = false;
        }
        
        if (!validateField(password, password.value)) {
            if (!password.value) {
                showError('passwordError', 'Введите пароль');
            }
            allValid = false;
        }
        
        if (!validateField(confirmPassword, confirmPassword.value)) {
            if (!confirmPassword.value) {
                showError('confirmPasswordError', 'Подтвердите пароль');
            }
            allValid = false;
        }
        
        // Проверяем чекбокс
        if (!checkTerms()) {
            allValid = false;
        }
        
        if (!allValid) {
            return;
        }
        
        // Все проверки пройдены - начинаем регистрацию
        console.log('✅ Все проверки пройдены. Начинаем регистрацию...');
        
        // Показываем загрузку
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Регистрация...';
        submitBtn.disabled = true;
        
        // Сохраняем данные пользователя
        const userData = {
            username: username.value.trim(),
            email: email.value.trim(),
            registeredAt: new Date().toISOString()
        };
        
        localStorage.setItem('kiravaUser', JSON.stringify(userData));
        localStorage.setItem('isLoggedIn', 'true');
        
        // Имитация задержки сервера
        setTimeout(() => {
            console.log('✅ Регистрация успешна!');
            
            // Показываем успех
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Успешно!';
            
            // Переход на главную страницу
            setTimeout(() => {
                window.location.href = 'main.html';
            }, 1500);
            
        }, 2000);
    });
    
    // 12. При изменении чекбокса
    terms.addEventListener('change', function() {
        if (this.checked && formSubmitted) {
            hideError('termsError');
            console.log('✅ Чекбокс отмечен - ошибка скрыта');
        }
    });
    
    // 13. Социальные кнопки
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Оставил только уведомление для социальных кнопок
            alert('Функция в разработке');
        });
    });
    
    // 15. Инициализация
    updateSubmitButton();
    
    console.log('=== ГОТОВО К РАБОТЕ ===');
});