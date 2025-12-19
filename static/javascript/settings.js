// settings.js - Полный рабочий функционал настроек с исправлениями
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация
    console.log('🔧 Инициализация настроек Kirava...');
    console.log('🔄 URL настроек:', window.KIRAVA_SETTINGS);
    console.log('👤 Google пользователь:', window.IS_GOOGLE_USER);
    
    initSettings();
    initEventListeners();
    // Убрана инициализация темы из settings.js
    // initThemeToggle(); // УДАЛЕНО
    
    // Скрываем модальные окна при загрузке
    hideModal('passwordModal');
    hideModal('deleteModal');
});

function initSettings() {
    console.log('✅ Настройки инициализированы');
    
    // Проверяем, авторизован ли пользователь
    const settingsData = window.KIRAVA_SETTINGS;
    if (!settingsData) {
        console.error('❌ Ошибка: URL для настроек не загружены');
        showNotification('Ошибка загрузки настроек', 'error');
        return;
    }
    
    // Проверяем CSRF токен
    const csrfToken = getCSRFToken();
    if (!csrfToken) {
        console.error('❌ CSRF токен не найден!');
        showNotification('Ошибка безопасности. Пожалуйста, обновите страницу.', 'error');
    } else {
        console.log('🔐 CSRF токен найден');
    }
}

function initEventListeners() {
    // Сохранение основных настроек
    const saveBtn = document.getElementById('saveSettings');
    if (saveBtn) {
        saveBtn.addEventListener('click', handleSaveSettings);
    }

    // Отмена - возврат на профиль
    const cancelBtn = document.querySelector('.btn-cancel');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = '/profile/';
        });
    }

    // Смена пароля (если кнопка существует и не disabled)
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    if (changePasswordBtn && !changePasswordBtn.disabled) {
        changePasswordBtn.addEventListener('click', function() {
            console.log('🔑 Открытие модального окна смены пароля');
            openModal('passwordModal');
        });
    }

    // Удаление аккаунта
    const deleteAccountBtn = document.getElementById('deleteAccountBtn');
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', function() {
            console.log('🗑️ Открытие модального окна удаления аккаунта');
            openModal('deleteModal');
        });
    }

    // Модальное окно смены пароля
    initPasswordModal();
    
    // Модальное окно удаления аккаунта
    initDeleteModal();
}

function initPasswordModal() {
    const passwordModal = document.getElementById('passwordModal');
    const closePasswordBtn = document.getElementById('closePasswordModal');
    const cancelPasswordBtn = document.getElementById('cancelPassword');
    const submitPasswordBtn = document.getElementById('submitPasswordChange');
    
    if (!passwordModal) {
        console.error('❌ Модальное окно пароля не найдено');
        return;
    }
    
    // Кнопки закрытия
    if (closePasswordBtn) {
        closePasswordBtn.addEventListener('click', function() {
            console.log('❌ Закрытие окна смены пароля');
            closeModal('passwordModal');
        });
    }
    
    if (cancelPasswordBtn) {
        cancelPasswordBtn.addEventListener('click', function() {
            console.log('❌ Отмена смены пароля');
            closeModal('passwordModal');
        });
    }
    
    // Отправка формы смены пароля
    if (submitPasswordBtn) {
        submitPasswordBtn.addEventListener('click', handlePasswordChange);
    }
    
    // Переключение видимости пароля
    initPasswordToggle('toggleCurrentPassword', 'currentPassword');
    initPasswordToggle('toggleNewPassword', 'newPassword');
    initPasswordToggle('toggleConfirmPassword', 'confirmPassword');
    
    // Закрытие при клике на фон
    passwordModal.addEventListener('click', function(e) {
        if (e.target === passwordModal) {
            closeModal('passwordModal');
        }
    });
    
    // Закрытие при нажатии Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && passwordModal.style.display === 'flex') {
            closeModal('passwordModal');
        }
    });
}

function initDeleteModal() {
    const deleteModal = document.getElementById('deleteModal');
    const closeDeleteBtn = document.getElementById('closeDeleteModal');
    const cancelDeleteBtn = document.getElementById('cancelDelete');
    const submitDeleteBtn = document.getElementById('submitDeleteAccount');
    
    if (!deleteModal) {
        console.error('❌ Модальное окно удаления не найдено');
        return;
    }
    
    // Кнопки закрытия
    if (closeDeleteBtn) {
        closeDeleteBtn.addEventListener('click', function() {
            console.log('❌ Закрытие окна удаления аккаунта');
            closeModal('deleteModal');
        });
    }
    
    if (cancelDeleteBtn) {
        cancelDeleteBtn.addEventListener('click', function() {
            console.log('❌ Отмена удаления аккаунта');
            closeModal('deleteModal');
        });
    }
    
    // Отправка запроса на удаление
    if (submitDeleteBtn) {
        submitDeleteBtn.addEventListener('click', handleDeleteAccount);
    }
    
    // Закрытие при клике на фон
    deleteModal.addEventListener('click', function(e) {
        if (e.target === deleteModal) {
            closeModal('deleteModal');
        }
    });
    
    // Закрытие при нажатии Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && deleteModal.style.display === 'flex') {
            closeModal('deleteModal');
        }
    });
}

function initPasswordToggle(toggleId, passwordId) {
    const toggleBtn = document.getElementById(toggleId);
    const passwordInput = document.getElementById(passwordId);
    
    if (toggleBtn && passwordInput) {
        toggleBtn.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            toggleBtn.classList.toggle('fa-eye');
            toggleBtn.classList.toggle('fa-eye-slash');
        });
    }
}

// Универсальные функции для работы с модальными окнами
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Запрещаем скролл страницы
        
        // Небольшая задержка для анимации
        setTimeout(() => {
            modal.classList.add('active');
            
            // Фокус на первое поле ввода
            const firstInput = modal.querySelector('input');
            if (firstInput) {
                firstInput.focus();
            }
        }, 10);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Возвращаем скролл
            
            // Очищаем поля если это модальное окно пароля
            if (modalId === 'passwordModal') {
                clearPasswordFields();
                hideError('passwordError');
            } else if (modalId === 'deleteModal') {
                document.getElementById('confirmDelete').value = '';
                hideError('deleteError');
            }
        }, 300);
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('active');
    }
}

async function handleSaveSettings() {
    const saveBtn = document.getElementById('saveSettings');
    const originalText = saveBtn.innerHTML;
    
    try {
        // Показываем состояние загрузки
        saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Сохранение...';
        saveBtn.classList.add('loading');
        saveBtn.disabled = true;
        
        // Больше не отправляем настройки темы, так как блока "Тема" нет
        const settingsData = {
            // Пустой объект, так как настроек больше нет
        };
        
        console.log('📤 Отправка настроек:', settingsData);
        
        // Отправляем запрос на сервер
        const response = await fetch(window.KIRAVA_SETTINGS.updateSettingsUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCSRFToken()
            },
            body: JSON.stringify(settingsData)
        });
        
        const data = await response.json();
        console.log('📥 Ответ сервера:', data);
        
        if (data.ok) {
            showNotification('Настройки успешно сохранены!', 'success');
        } else {
            throw new Error(data.error || 'Ошибка сохранения настроек');
        }
        
    } catch (error) {
        console.error('❌ Ошибка сохранения настроек:', error);
        showNotification(error.message, 'error');
        
    } finally {
        // Восстанавливаем кнопку
        saveBtn.innerHTML = originalText;
        saveBtn.classList.remove('loading');
        saveBtn.disabled = false;
    }
}

async function handlePasswordChange() {
    const submitBtn = document.getElementById('submitPasswordChange');
    const originalText = submitBtn.innerHTML;
    
    try {
        // Проверяем, Google ли пользователь
        if (window.IS_GOOGLE_USER) {
            throw new Error('Google пользователи не могут менять пароль через эту форму. Используйте настройки Google аккаунта.');
        }
        
        // Показываем состояние загрузки
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Смена...';
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Получаем значения полей
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Валидация на клиенте
        const errors = [];
        
        if (!currentPassword) errors.push('Введите текущий пароль');
        if (!newPassword) errors.push('Введите новый пароль');
        if (!confirmPassword) errors.push('Подтвердите новый пароль');
        
        if (errors.length > 0) {
            throw new Error(errors.join('. '));
        }
        
        if (newPassword !== confirmPassword) {
            throw new Error('Новые пароли не совпадают');
        }
        
        if (newPassword.length < 8) {
            throw new Error('Пароль должен быть не менее 8 символов');
        }
        
        // Собираем данные
        const passwordData = {
            current_password: currentPassword,
            new_password: newPassword,
            confirm_password: confirmPassword
        };
        
        console.log('📤 Отправка смены пароля');
        
        // Отправляем запрос
        const response = await fetch(window.KIRAVA_SETTINGS.changePasswordUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCSRFToken()
            },
            body: JSON.stringify(passwordData)
        });
        
        const data = await response.json();
        console.log('📥 Ответ сервера:', data);
        
        if (data.ok) {
            showNotification('Пароль успешно изменен!', 'success');
            
            // Закрываем модальное окно через 1.5 секунды
            setTimeout(() => {
                closeModal('passwordModal');
            }, 1500);
            
        } else {
            throw new Error(data.error || 'Ошибка смены пароля');
        }
        
    } catch (error) {
        console.error('❌ Ошибка смены пароля:', error);
        showError('passwordError', error.message);
        showNotification(error.message, 'error');
        
    } finally {
        // Восстанавливаем кнопку
        submitBtn.innerHTML = originalText;
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
}

async function handleDeleteAccount() {
    const submitBtn = document.getElementById('submitDeleteAccount');
    const originalText = submitBtn.innerHTML;
    
    try {
        // Показываем состояние загрузки
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Удаление...';
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Проверяем подтверждение
        const confirmInput = document.getElementById('confirmDelete');
        const confirmText = confirmInput.value.trim();
        
        if (confirmText !== 'УДАЛИТЬ') {
            throw new Error('Для подтверждения введите "УДАЛИТЬ"');
        }
        
        console.log('📤 Отправка запроса на удаление аккаунта');
        
        // Отправляем запрос
        const response = await fetch(window.KIRAVA_SETTINGS.deleteAccountUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCSRFToken()
            },
            body: JSON.stringify({})
        });
        
        const data = await response.json();
        console.log('📥 Ответ сервера:', data);
        
        if (data.ok) {
            showNotification('Аккаунт успешно удален', 'success');
            
            // Закрываем модальное окно
            closeModal('deleteModal');
            
            // Перенаправляем на главную страницу через 2 секунды
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
            
        } else {
            throw new Error(data.error || 'Ошибка удаления аккаунта');
        }
        
    } catch (error) {
        console.error('❌ Ошибка удаления аккаунта:', error);
        showError('deleteError', error.message);
        showNotification(error.message, 'error');
        
    } finally {
        // Восстанавливаем кнопку
        submitBtn.innerHTML = originalText;
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
}

function clearPasswordFields() {
    const fields = ['currentPassword', 'newPassword', 'confirmPassword'];
    fields.forEach(id => {
        const field = document.getElementById(id);
        if (field) {
            field.value = '';
            // Возвращаем тип password на случай если был изменен
            field.setAttribute('type', 'password');
        }
    });
    
    // Возвращаем иконки глазок
    const eyeIcons = document.querySelectorAll('.password-eye');
    eyeIcons.forEach(icon => {
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    });
}

function getCSRFToken() {
    // Пробуем разные способы получения CSRF токена
    let csrfToken = '';
    
    // 1. Из мета-тега
    const metaToken = document.querySelector('meta[name="csrf-token"]');
    if (metaToken) {
        csrfToken = metaToken.getAttribute('content');
    }
    
    // 2. Из скрытого поля
    if (!csrfToken) {
        const inputToken = document.querySelector('input[name="csrfmiddlewaretoken"]');
        if (inputToken) {
            csrfToken = inputToken.value;
        }
    }
    
    // 3. Из глобальной переменной
    if (!csrfToken && window.KIRAVA_SETTINGS && window.KIRAVA_SETTINGS.csrfToken) {
        csrfToken = window.KIRAVA_SETTINGS.csrfToken;
    }
    
    // 4. Из cookies (последний способ)
    if (!csrfToken) {
        const name = 'csrftoken';
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    csrfToken = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
    }
    
    if (!csrfToken) {
        console.warn('⚠️ CSRF токен не найден!');
    }
    
    return csrfToken;
}

function showNotification(message, type = 'info') {
    const container = document.getElementById('notificationContainer');
    if (!container) {
        console.error('❌ Контейнер для уведомлений не найден');
        return;
    }
    
    // Создаем уведомление
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        opacity: 0;
        transform: translateX(100%);
        transition: opacity 0.3s, transform 0.3s;
        margin-bottom: 10px;
    `;
    
    // Иконка в зависимости от типа
    let icon = 'info-circle';
    let iconColor = '#3498db';
    
    if (type === 'success') {
        icon = 'check-circle';
        iconColor = '#2ecc71';
    } else if (type === 'error') {
        icon = 'exclamation-circle';
        iconColor = '#e74c3c';
    } else if (type === 'warning') {
        icon = 'exclamation-triangle';
        iconColor = '#f39c12';
    }
    
    notification.innerHTML = `
        <div class="notification-content" style="
            display: flex;
            align-items: center;
            padding: 12px 16px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            border-left: 4px solid ${iconColor};
        ">
            <i class="fas fa-${icon}" style="color: ${iconColor}; margin-right: 12px; font-size: 1.2em;"></i>
            <span style="flex: 1;">${message}</span>
            <button class="notification-close" style="
                background: none;
                border: none;
                color: #7f8c8d;
                cursor: pointer;
                font-size: 1em;
                margin-left: 10px;
            ">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Добавляем в контейнер
    container.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Кнопка закрытия
    const closeBtn = notification.querySelector('.notification-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
    }
    
    // Автоматическое удаление через 5 секунд
    const autoRemoveTimeout = setTimeout(() => {
        if (notification.parentNode) {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
    
    // Останавливаем таймер при наведении
    notification.addEventListener('mouseenter', () => {
        clearTimeout(autoRemoveTimeout);
    });
    
    notification.addEventListener('mouseleave', () => {
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.opacity = '0';
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }
        }, 5000);
    });
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        errorElement.style.cssText = `
            display: block;
            color: #e74c3c;
            background: #fdf2f2;
            border: 1px solid #f5c6cb;
            border-radius: 4px;
            padding: 10px;
            margin-top: 10px;
            font-size: 0.9em;
        `;
    }
}

function hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.style.display = 'none';
        errorElement.textContent = '';
    }
}

// Убраны функции связанные с темой:
// function initThemeToggle() { ... } // УДАЛЕНО
// function updateThemeToggle() { ... } // УДАЛЕНО
// async function saveThemePreference() { ... } // УДАЛЕНО

// Отладочная функция для проверки типа пользователя
async function checkUserType() {
    try {
        const response = await fetch(window.KIRAVA_SETTINGS.checkUserTypeUrl);
        const data = await response.json();
        
        const resultDiv = document.getElementById('debugResult');
        if (resultDiv) {
            resultDiv.innerHTML = `
                <pre style="background: #f5f5f5; padding: 10px; border-radius: 5px;">
👤 Имя: ${data.username}
📧 Email: ${data.email}
🔐 Google: ${data.is_google_user ? '✅ Да' : '❌ Нет'}
🔑 Пароль: ${data.has_password ? '✅ Есть' : '❌ Нет'}
🔓 Авторизован: ${data.is_authenticated ? '✅ Да' : '❌ Нет'}
                </pre>
            `;
        }
        
        console.log('👤 Информация о пользователе:', data);
    } catch (error) {
        console.error('❌ Ошибка проверки пользователя:', error);
    }
}

// Убрано обновление темы при загрузке
// updateThemeToggle(); // УДАЛЕНО

// Экспорт функций для отладки
window.KiravaSettings = {
    getCSRFToken,
    showNotification,
    checkUserType,
    openModal,
    closeModal
};

console.log('🚀 Настройки Kirava загружены и готовы к работе!');