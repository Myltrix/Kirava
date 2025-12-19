// ФОРМА ВХОДА
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== ФОРМА ВХОДА ЗАГРУЖЕНА ===');
    
    // 1. Находим все элементы
    const form = document.getElementById('loginForm');
    const loginInput = document.getElementById('login');
    const passwordInput = document.getElementById('password');
    const rememberCheckbox = document.getElementById('remember');
    const submitBtn = document.getElementById('submitBtn');
    
    // 2. Функция проверки поля логина/email
    function validateLogin() {
        const login = loginInput.value.trim();
        const errorElement = document.getElementById('loginError');
        
        errorElement.textContent = '';
        errorElement.classList.remove('show');
        
        if (!login) {
            showError('loginError', 'Введите email или логин');
            return false;
        }
        
        if (login.length < 3) {
            showError('loginError', 'Минимум 3 символа');
            return false;
        }
        
        // Если введен email - проверяем формат
        if (login.includes('@')) {
            if (!login.includes('.') || login.length < 5) {
                showError('loginError', 'Введите правильный email');
                return false;
            }
        }
        
        return true;
    }
    
    // 3. Функция проверки пароля
    function validatePassword() {
        const password = passwordInput.value;
        const errorElement = document.getElementById('passwordError');
        
        errorElement.textContent = '';
        errorElement.classList.remove('show');
        
        if (!password) {
            showError('passwordError', 'Введите пароль');
            return false;
        }
        
        if (password.length < 8) {
            showError('passwordError', 'Минимум 8 символов');
            return false;
        }
        
        return true;
    }
    
    // 4. Функция проверки всей формы
    function validateForm() {
        const loginValid = validateLogin();
        const passwordValid = validatePassword();
        
        return loginValid && passwordValid;
    }
    
    // 5. Функция показа ошибок
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (!errorElement) return;
        
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
    
    // 6. Функция скрытия ошибок
    function hideError(elementId) {
        const errorElement = document.getElementById(elementId);
        if (!errorElement) return;
        
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
    
    // 7. Слушаем изменения в полях
    loginInput.addEventListener('input', function() {
        if (this.value.trim()) {
            validateLogin();
        } else {
            hideError('loginError');
        }
    });
    
    loginInput.addEventListener('blur', function() {
        if (this.value.trim()) {
            validateLogin();
        }
    });
    
    passwordInput.addEventListener('input', function() {
        if (this.value) {
            validatePassword();
        } else {
            hideError('passwordError');
        }
    });
    
    passwordInput.addEventListener('blur', function() {
        if (this.value) {
            validatePassword();
        }
    });
    
    // 8. Переключение видимости пароля - ИСПРАВЛЕННАЯ ВЕРСИЯ
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
    
    // 9. Обработка отправки формы
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        console.log('🔄 Попытка входа...');
        
        // Проверяем форму
        if (!validateForm()) {
            return;
        }
        
        // Показываем загрузку
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Вход...';
        submitBtn.disabled = true;
        
        // Получаем данные из формы
        const login = loginInput.value.trim();
        const password = passwordInput.value;
        const rememberMe = rememberCheckbox.checked;
        
        // Проверяем, есть ли зарегистрированный пользователь
        const storedUser = localStorage.getItem('kiravaUser');
        
        // Имитация задержки сервера
        setTimeout(() => {
            if (storedUser) {
                const userData = JSON.parse(storedUser);
                
                console.log('✅ Вход успешен!');
                
                // Сохраняем информацию о входе
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('currentUser', JSON.stringify(userData));
                
                // Если выбрано "Запомнить меня"
                if (rememberMe) {
                    localStorage.setItem('rememberMe', 'true');
                    localStorage.setItem('savedLogin', login);
                } else {
                    localStorage.removeItem('rememberMe');
                    localStorage.removeItem('savedLogin');
                }
                
                // Показываем успех
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Успешно!';
                
                // Переход на главную страницу
                setTimeout(() => {
                    window.location.href = 'main.html';
                }, 1500);
                
            } else {
                // Если нет зарегистрированного пользователя
                console.log('❌ Пользователь не найден');
                
                // Возвращаем кнопку в исходное состояние
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Показываем ошибки
                showError('loginError', 'Неверный логин или пароль');
                showError('passwordError', 'Неверный логин или пароль');
            }
            
        }, 2000);
    });
    
    // 10. Социальные кнопки
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            alert('Функция в разработке');
        });
    });
    
    // 11. Автозаполнение если выбрано "Запомнить меня"
    const rememberMe = localStorage.getItem('rememberMe');
    const savedLogin = localStorage.getItem('savedLogin');
    
    if (rememberMe === 'true' && savedLogin) {
        loginInput.value = savedLogin;
        rememberCheckbox.checked = true;
        console.log('Автозаполнение логина из памяти');
    }
    
    // 12. Проверяем, если пользователь уже вошел
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        console.log('Пользователь уже вошел. Перенаправление...');
    }
    
    console.log('=== ГОТОВО К РАБОТЕ ===');
});