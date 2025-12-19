// Глобальные переменные для ответов на сообщения
let replyingTo = null;
let selectedMessage = null;

// Обновленная функция инициализации чата
function initChat() {
    const messagesContainer = document.getElementById('messages-container');
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');
    const typingIndicator = document.getElementById('typing-indicator');
    const typingUsers = document.getElementById('typing-users');
    const photoBtn = document.getElementById('photo-btn');
    const photoInput = document.getElementById('photo-input');
    const replyBtn = document.getElementById('btn-reply');
    const cancelReplyBtn = document.getElementById('cancel-reply');
    const privateMessageInfo = document.getElementById('private-message-info');
    const replyToUser = document.getElementById('reply-to-user');
    
    // Фокус на поле ввода при загрузке
    if (messageInput) {
        messageInput.focus();
    }
    
    // Отправка сообщения по нажатию Enter
    if (messageInput) {
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Отправка сообщения по клику на кнопку
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }
    
    // Открытие выбора фото
    if (photoBtn) {
        photoBtn.addEventListener('click', function() {
            if (photoInput) {
                photoInput.click();
            }
        });
    }
    
    // Обработка выбора фото
    if (photoInput) {
        photoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                if (file.size > 5 * 1024 * 1024) { // 5MB limit
                    showNotification('Файл слишком большой. Максимальный размер: 5MB', 'warning');
                    return;
                }
                
                const reader = new FileReader();
                reader.onload = function(event) {
                    // Добавление фото в чат
                    addPhotoMessage(event.target.result, file.name);
                    
                    // Очистка input
                    photoInput.value = '';
                    
                    // Прокрутка вниз
                    scrollToBottom();
                    
                    // Имитация ответа
                    setTimeout(() => {
                        simulateBotResponse('Крутое фото! 😎');
                    }, 1000 + Math.random() * 2000);
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Кнопка ответа на сообщение
    if (replyBtn) {
        replyBtn.addEventListener('click', function() {
            if (!selectedMessage) {
                showNotification('Выберите сообщение для ответа, кликнув на него', 'info');
                return;
            }
            
            const username = selectedMessage.getAttribute('data-username');
            if (username) {
                startReply(username);
            }
        });
    }
    
    // Отмена ответа
    if (cancelReplyBtn) {
        cancelReplyBtn.addEventListener('click', function() {
            cancelReply();
        });
    }
    
    // Показ индикатора набора текста
    let typingTimeout;
    if (messageInput) {
        messageInput.addEventListener('input', function() {
            if (messageInput.value.trim() !== '') {
                showTypingIndicator(currentUser);
            }
            
            clearTimeout(typingTimeout);
            typingTimeout = setTimeout(() => {
                hideTypingIndicator();
            }, 1500);
        });
    }
    
    // Добавляем обработчики кликов на сообщения для ответа
    if (messagesContainer) {
        messagesContainer.addEventListener('click', function(e) {
            const message = e.target.closest('.message');
            if (message) {
                // Убираем выделение с предыдущего сообщения
                document.querySelectorAll('.message.selected').forEach(msg => {
                    msg.classList.remove('selected');
                });
                
                // Выделяем текущее сообщение
                message.classList.add('selected');
                selectedMessage = message;
                
                const username = message.getAttribute('data-username');
                if (username && username !== currentUser) {
                    startReply(username);
                }
            }
        });
    }
    
    // Функция отправки сообщения
    function sendMessage() {
        if (!messageInput) return;
        
        const text = messageInput.value.trim();
        
        if (text === '') {
            messageInput.focus();
            return;
        }
        
        // Добавление сообщения в чат
        addMessage({
            id: Date.now(),
            user: {
                name: currentUser,
                role: 'user',
                avatar: getInitials(currentUser)
            },
            time: getCurrentTime(),
            content: text,
            replyTo: replyingTo
        });
        
        // Очистка поля ввода и сброс ответа
        messageInput.value = '';
        cancelReply();
        hideTypingIndicator();
        
        // Прокрутка вниз
        scrollToBottom();
        
        // Имитация ответа от другого пользователя
        setTimeout(() => {
            simulateBotResponse();
        }, 1000 + Math.random() * 2000);
    }
    
    // Функция начала ответа на сообщение
    function startReply(username) {
        replyingTo = username;
        if (privateMessageInfo && replyToUser) {
            replyToUser.textContent = username;
            privateMessageInfo.style.display = 'block';
            messageInput.focus();
            showNotification(`Вы отвечаете ${username}. Напишите сообщение и нажмите Enter`, 'info');
        }
    }
    
    // Функция отмены ответа
    function cancelReply() {
        replyingTo = null;
        selectedMessage = null;
        if (privateMessageInfo) {
            privateMessageInfo.style.display = 'none';
        }
        document.querySelectorAll('.message.selected').forEach(msg => {
            msg.classList.remove('selected');
        });
    }
    
    // Обновленная функция добавления сообщения
    function addMessage(message) {
        if (!messagesContainer) return;
        
        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.setAttribute('data-username', message.user.name);
        
        if (message.user.name === currentUser) {
            messageElement.classList.add('current-user');
        }
        
        let replyContent = '';
        if (message.replyTo) {
            replyContent = `
                <div class="reply-info">
                    <i class="fas fa-reply"></i>
                    Ответ ${message.user.name} пользователю ${message.replyTo}
                </div>
            `;
        }
        
        messageElement.innerHTML = `
            <div class="message-header">
                <div class="message-user">
                    <div class="user-avatar">${message.user.avatar}</div>
                    <span class="user-name">${message.user.name}</span>
                    <span class="user-role ${message.user.role}">${
                        message.user.role === 'admin' ? 'Администратор' :
                        message.user.role === 'moderator' ? 'Модератор' : 'Участник'
                    }</span>
                </div>
                <span class="message-time">${message.time}</span>
            </div>
            <div class="message-content">
                ${replyContent}
                ${message.content}
            </div>
        `;
        
        messagesContainer.appendChild(messageElement);
    }
    
    // Обновленная функция добавления фото
    function addPhotoMessage(photoData, fileName) {
        if (!messagesContainer) return;
        
        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.setAttribute('data-username', currentUser);
        messageElement.classList.add('current-user');
        
        let replyContent = '';
        if (replyingTo) {
            replyContent = `
                <div class="reply-info">
                    <i class="fas fa-reply"></i>
                    Ответ ${currentUser} пользователю ${replyingTo}
                </div>
            `;
        }
        
        messageElement.innerHTML = `
            <div class="message-header">
                <div class="message-user">
                    <div class="user-avatar">${getInitials(currentUser)}</div>
                    <span class="user-name">${currentUser}</span>
                    <span class="user-role user">Участник</span>
                </div>
                <span class="message-time">${getCurrentTime()}</span>
            </div>
            <div class="message-content">
                ${replyContent}
                <div>Отправлено фото</div>
                <img src="${photoData}" alt="Фото" class="message-photo">
            </div>
        `;
        
        // Добавляем обработчик клика для увеличения фото
        const photoElement = messageElement.querySelector('.message-photo');
        if (photoElement) {
            photoElement.addEventListener('click', function() {
                showPhotoModal(this.src, fileName);
            });
        }
        
        messagesContainer.appendChild(messageElement);
        
        // Сбрасываем ответ после отправки
        cancelReply();
    }
}

// Обновленная функция инициализации поиска групп
function initGroupSearch() {
    const searchInput = document.getElementById('group-search');
    const searchBtn = document.getElementById('search-btn');
    const clearSearchBtn = document.getElementById('clear-search');
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    const resultsCount = document.getElementById('results-count');
    const noResults = document.getElementById('no-results');
    
    // Обновляем опции селекторов
    if (categoryFilter) {
        // Убираем "Все категории" и меняем текст
        categoryFilter.innerHTML = `
            <option value="all">Категория</option>
            <option value="anime">Аниме</option>
            <option value="education">Обучение</option>
            <option value="entertainment">Развлечения</option>
            <option value="gaming">Игры</option>
            <option value="art">Искусство</option>
        `;
    }
    
    if (sortFilter) {
        // Убираем "По популярности" и меняем текст
        sortFilter.innerHTML = `
            <option value="name">Сортировка</option>
            <option value="new">Новые</option>
            <option value="members">По участникам</option>
            <option value="name">По названию</option>
        `;
    }
    
    // Функция поиска групп (остается такой же)
    function searchGroups() {
        // ... существующий код ...
    }
}

// JavaScript для функциональности сообщества Kirava

// Глобальные переменные
let allGroups = [];
let currentUser = 'Вы';

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация чата
    initChat();
    
    // Инициализация навигационных точек
    initSectionNav();
    
    // Инициализация кнопок
    initButtons();
    
    // Инициализация модального окна
    initModal();
    
    // Инициализация поиска групп
    initGroupSearch();
    
    // Загрузка тестовых данных
    loadSampleData();
    
    // Инициализация кнопок групп
    initGroupButtons();
});

// Инициализация чата
function initChat() {
    const messagesContainer = document.getElementById('messages-container');
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');
    const typingIndicator = document.getElementById('typing-indicator');
    const typingUsers = document.getElementById('typing-users');
    const photoBtn = document.getElementById('photo-btn');
    const photoInput = document.getElementById('photo-input');
    
    // Фокус на поле ввода при загрузке
    if (messageInput) {
        messageInput.focus();
    }
    
    // Отправка сообщения по нажатию Enter
    if (messageInput) {
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Отправка сообщения по клику на кнопку
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }
    
    // Открытие выбора фото
    if (photoBtn) {
        photoBtn.addEventListener('click', function() {
            if (photoInput) {
                photoInput.click();
            }
        });
    }
    
    // Обработка выбора фото
    if (photoInput) {
        photoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                if (file.size > 5 * 1024 * 1024) { // 5MB limit
                    showNotification('Файл слишком большой. Максимальный размер: 5MB', 'warning');
                    return;
                }
                
                const reader = new FileReader();
                reader.onload = function(event) {
                    // Добавление фото в чат
                    addPhotoMessage(event.target.result, file.name);
                    
                    // Очистка input
                    photoInput.value = '';
                    
                    // Прокрутка вниз
                    scrollToBottom();
                    
                    // Имитация ответа
                    setTimeout(() => {
                        simulateBotResponse('Крутое фото! 😎');
                    }, 1000 + Math.random() * 2000);
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Показ индикатора набора текста
    let typingTimeout;
    if (messageInput) {
        messageInput.addEventListener('input', function() {
            if (messageInput.value.trim() !== '') {
                showTypingIndicator(currentUser);
            }
            
            clearTimeout(typingTimeout);
            typingTimeout = setTimeout(() => {
                hideTypingIndicator();
            }, 1500);
        });
    }
    
    // Функция отправки сообщения
    function sendMessage() {
        if (!messageInput) return;
        
        const text = messageInput.value.trim();
        
        if (text === '') {
            messageInput.focus();
            return;
        }
        
        // Добавление сообщения в чат
        addMessage({
            id: Date.now(),
            user: {
                name: currentUser,
                role: 'user',
                avatar: getInitials(currentUser)
            },
            time: getCurrentTime(),
            content: text
        });
        
        // Очистка поля ввода
        messageInput.value = '';
        hideTypingIndicator();
        
        // Прокрутка вниз
        scrollToBottom();
        
        // Имитация ответа от другого пользователя
        setTimeout(() => {
            simulateBotResponse();
        }, 1000 + Math.random() * 2000);
    }
    
    // Имитация ответа бота
    function simulateBotResponse(customMessage = null) {
        const botUsers = [
            { name: 'АнимеФан', role: 'user', avatar: 'А' },
            { name: 'Учитель', role: 'moderator', avatar: 'У' },
            { name: 'Геймер', role: 'user', avatar: 'Г' },
            { name: 'Админ', role: 'admin', avatar: 'А' },
            { name: 'Новичок', role: 'user', avatar: 'Н' },
            { name: 'Косплейщик', role: 'user', avatar: 'К' },
            { name: 'МангаКлуб', role: 'moderator', avatar: 'М' }
        ];
        
        const botUser = botUsers[Math.floor(Math.random() * botUsers.length)];
        
        const responses = customMessage ? [customMessage] : [
            'Интересная мысль!',
            'Согласен!',
            'Хорошая тема!',
            'Интересно, а что думают другие?',
            'Никогда об этом не задумывался...',
            'Спасибо, что поделились!',
            'Отличное предложение!',
            'Интересная точка зрения!',
            'А я думаю по-другому...',
            'Может обсудим это в группе?',
            'Отличный вопрос!',
            'Кто-нибудь еще что-то добавит?',
            'Интересно было бы узнать мнение других участников',
            'Это действительно важная тема для обсуждения',
            'Спасибо за ваше мнение!'
        ];
        
        const response = responses[Math.floor(Math.random() * responses.length)];
        
        addMessage({
            id: Date.now(),
            user: botUser,
            time: getCurrentTime(),
            content: response
        });
        
        scrollToBottom();
    }
    
    // Добавление сообщения в чат
    function addMessage(message) {
        if (!messagesContainer) return;
        
        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.innerHTML = `
            <div class="message-header">
                <div class="message-user">
                    <div class="user-avatar">${message.user.avatar}</div>
                    <span class="user-name">${message.user.name}</span>
                    <span class="user-role ${message.user.role}">${
                        message.user.role === 'admin' ? 'Администратор' :
                        message.user.role === 'moderator' ? 'Модератор' : 'Участник'
                    }</span>
                </div>
                <span class="message-time">${message.time}</span>
            </div>
            <div class="message-content">${message.content}</div>
        `;
        
        messagesContainer.appendChild(messageElement);
    }
    
    // Добавление фото в чат
    function addPhotoMessage(photoData, fileName) {
        if (!messagesContainer) return;
        
        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.innerHTML = `
            <div class="message-header">
                <div class="message-user">
                    <div class="user-avatar">${getInitials(currentUser)}</div>
                    <span class="user-name">${currentUser}</span>
                    <span class="user-role user">Участник</span>
                </div>
                <span class="message-time">${getCurrentTime()}</span>
            </div>
            <div class="message-content">
                <div>Отправлено фото</div>
                <img src="${photoData}" alt="Фото" class="message-photo">
            </div>
        `;
        
        // Добавляем обработчик клика для увеличения фото
        const photoElement = messageElement.querySelector('.message-photo');
        if (photoElement) {
            photoElement.addEventListener('click', function() {
                showPhotoModal(this.src, fileName);
            });
        }
        
        messagesContainer.appendChild(messageElement);
    }
    
    // Показать фото в модальном окне
    function showPhotoModal(photoSrc, fileName) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay active';
        modal.innerHTML = `
            <div class="modal-content photo-modal">
                <div class="modal-header">
                    <h3>Фото</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <img src="${photoSrc}" alt="Фото" class="full-photo">
                </div>
                <div class="modal-footer">
                    <button class="btn-modal-cancel">Закрыть</button>
                    <button class="btn-modal-create" id="download-photo">
                        <i class="fas fa-download"></i> Скачать
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Добавляем стили для модального окна с фото
        const style = document.createElement('style');
        style.textContent = `
            .photo-modal {
                max-width: 800px;
            }
            .full-photo {
                width: 100%;
                max-height: 60vh;
                object-fit: contain;
                border-radius: 8px;
            }
        `;
        document.head.appendChild(style);
        
        // Обработчики закрытия
        modal.querySelector('.modal-close').addEventListener('click', () => {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        });
        
        modal.querySelector('.btn-modal-cancel').addEventListener('click', () => {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        });
        
        // Клик по оверлею
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
                document.head.removeChild(style);
            }
        });
        
        // Скачивание фото
        modal.querySelector('#download-photo').addEventListener('click', function() {
            const link = document.createElement('a');
            link.href = photoSrc;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
    
    // Показать индикатор набора текста
    function showTypingIndicator(user) {
        if (!typingIndicator || !typingUsers) return;
        
        typingUsers.textContent = user;
        typingIndicator.classList.add('active');
    }
    
    // Скрыть индикатор набора текста
    function hideTypingIndicator() {
        if (!typingIndicator) return;
        
        typingIndicator.classList.remove('active');
    }
    
    // Получить текущее время
    function getCurrentTime() {
        const now = new Date();
        return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    }
    
    // Получить инициалы для аватара
    function getInitials(name) {
        return name.charAt(0).toUpperCase();
    }
    
    // Прокрутить чат вниз
    function scrollToBottom() {
        if (!messagesContainer) return;
        
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

// Инициализация навигационных точек
function initSectionNav() {
    const navDots = document.querySelectorAll('.nav-dot');
    const sections = document.querySelectorAll('.community-section');
    
    navDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            
            // Обновление активной точки
            navDots.forEach(d => d.classList.remove('active'));
            this.classList.add('active');
            
            // Прокрутка к секции
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Отслеживание прокрутки для обновления активной точки
    window.addEventListener('scroll', function() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });
        
        navDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('data-section') === currentSection) {
                dot.classList.add('active');
            }
        });
    });
}

// Инициализация модального окна
function initModal() {
    const createGroupBtn = document.getElementById('create-group-btn');
    const groupModal = document.getElementById('group-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const cancelModalBtn = document.getElementById('cancel-modal');
    const createModalBtn = document.getElementById('create-modal');
    const uploadAvatarBtn = document.getElementById('upload-avatar');
    const avatarInput = document.getElementById('avatar-input');
    const avatarPreview = document.getElementById('avatar-preview');
    const groupNameInput = document.getElementById('group-name');
    const groupDescInput = document.getElementById('group-description');
    
    // Открытие модального окна
    if (createGroupBtn) {
        createGroupBtn.addEventListener('click', function() {
            if (groupModal) {
                groupModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }
    
    // Закрытие модального окна
    function closeModal() {
        if (groupModal) {
            groupModal.classList.remove('active');
            document.body.style.overflow = '';
            
            // Сброс формы
            if (groupNameInput) groupNameInput.value = '';
            if (groupDescInput) groupDescInput.value = '';
            if (avatarPreview) {
                avatarPreview.innerHTML = '<i class="fas fa-users"></i>';
                avatarPreview.style.background = '#2d2d2d';
            }
            if (avatarInput) avatarInput.value = '';
        }
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    if (cancelModalBtn) {
        cancelModalBtn.addEventListener('click', closeModal);
    }
    
    // Клик по оверлею
    if (groupModal) {
        groupModal.addEventListener('click', function(e) {
            if (e.target === groupModal) {
                closeModal();
            }
        });
    }
    
    // Загрузка аватарки
    if (uploadAvatarBtn) {
        uploadAvatarBtn.addEventListener('click', function() {
            if (avatarInput) {
                avatarInput.click();
            }
        });
    }
    
    if (avatarInput) {
        avatarInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                if (file.size > 2 * 1024 * 1024) { // 2MB limit
                    showNotification('Файл слишком большой. Максимальный размер: 2MB', 'warning');
                    return;
                }
                
                const reader = new FileReader();
                reader.onload = function(event) {
                    if (avatarPreview) {
                        avatarPreview.innerHTML = `<img src="${event.target.result}" alt="Аватарка группы">`;
                        avatarPreview.style.background = 'none';
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Создание группы
    if (createModalBtn) {
        createModalBtn.addEventListener('click', function() {
            if (!groupNameInput || !groupDescInput) return;
            
            const groupName = groupNameInput.value.trim();
            const groupDesc = groupDescInput.value.trim();
            const groupCategory = document.getElementById('group-category') ? 
                                 document.getElementById('group-category').value : 'general';
            const privacy = document.querySelector('input[name="privacy"]:checked') ? 
                           document.querySelector('input[name="privacy"]:checked').value : 'public';
            
            if (!groupName) {
                showNotification('Пожалуйста, введите название группы', 'warning');
                return;
            }
            
            if (!groupDesc) {
                showNotification('Пожалуйста, добавьте описание группы', 'warning');
                return;
            }
            
            // Создание новой карточки группы
            createNewGroup({
                name: groupName,
                description: groupDesc,
                category: groupCategory,
                privacy: privacy,
                avatar: avatarPreview && avatarPreview.querySelector('img') ? 
                        avatarPreview.querySelector('img').src : null
            });
            
            // Закрытие модального окна
            closeModal();
        });
    }
    
    // Функция создания новой группы
    function createNewGroup(groupData) {
        const newGroup = {
            id: Date.now(),
            name: groupData.name,
            description: groupData.description,
            category: groupData.category,
            members: 1,
            discussions: 0,
            joined: true,
            privacy: groupData.privacy,
            avatar: groupData.avatar,
            createdAt: Date.now()
        };
        
        // Добавляем в массив всех групп
        allGroups.unshift(newGroup);
        
        // Перезапускаем поиск для обновления отображения
        if (typeof searchGroups === 'function') {
            searchGroups();
        }
        
        // Показываем уведомление
        showNotification(`Группа "${groupData.name}" успешно создана!`, 'success');
    }
}

// Инициализация поиска групп
function initGroupSearch() {
    const searchInput = document.getElementById('group-search');
    const searchBtn = document.getElementById('search-btn');
    const clearSearchBtn = document.getElementById('clear-search');
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    const resultsCount = document.getElementById('results-count');
    const noResults = document.getElementById('no-results');
    
    // Функция поиска групп
    function searchGroups() {
        if (!searchInput || !resultsCount || !noResults) return;
        
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter ? categoryFilter.value : 'all';
        const sortBy = sortFilter ? sortFilter.value : 'popular';
        
        let filteredGroups = allGroups.filter(group => {
            const matchesSearch = group.name.toLowerCase().includes(searchTerm) || 
                               group.description.toLowerCase().includes(searchTerm) ||
                               getCategoryName(group.category).toLowerCase().includes(searchTerm);
            const matchesCategory = category === 'all' || group.category === category;
            
            return matchesSearch && matchesCategory;
        });
        
        // Сортировка
        filteredGroups.sort((a, b) => {
            switch(sortBy) {
                case 'new':
                    return b.createdAt - a.createdAt;
                case 'members':
                    return b.members - a.members;
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'popular':
                default:
                    return (b.members + b.discussions) - (a.members + a.discussions);
            }
        });
        
        // Обновление счетчика результатов
        resultsCount.textContent = `Найдено ${filteredGroups.length} групп`;
        
        // Показать/скрыть сообщение "ничего не найдено"
        if (filteredGroups.length === 0) {
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
        }
        
        // Отображение отфильтрованных групп
        displayGroups(filteredGroups);
    }
    
    // Отображение групп
    function displayGroups(groups) {
        const groupsContainer = document.getElementById('groups-container');
        if (!groupsContainer) return;
        
        groupsContainer.innerHTML = '';
        
        groups.forEach(group => {
            const groupCard = document.createElement('div');
            groupCard.className = 'group-card';
            groupCard.dataset.category = group.category;
            
            groupCard.innerHTML = `
                ${group.privacy === 'private' ? 
                    '<span class="group-status private"><i class="fas fa-lock"></i> Приватная</span>' : 
                    '<span class="group-status public"><i class="fas fa-globe"></i> Публичная</span>'
                }
                <div class="group-header">
                    <div class="group-avatar">
                        ${group.avatar ? 
                            `<img src="${group.avatar}" alt="${group.name}" style="width:100%;height:100%;object-fit:cover;border-radius:15px;">` : 
                            `<i class="fas ${getCategoryIcon(group.category)}"></i>`
                        }
                    </div>
                    <div class="group-info">
                        <h4 class="group-title">${group.name}</h4>
                        <span class="group-category">${getCategoryName(group.category)}</span>
                    </div>
                </div>
                <p class="group-desc">${group.description}</p>
                <div class="group-meta">
                    <span class="member-count">
                        <i class="fas fa-user-friends"></i> ${formatNumber(group.members)} участников
                    </span>
                    <span><i class="fas fa-comment"></i> ${group.discussions} обсуждений</span>
                </div>
                <button class="btn-group ${group.joined ? 'joined' : ''}" 
                        data-group-id="${group.id}">
                    ${group.joined ? '<i class="fas fa-check"></i> Вы в группе' : 'Вступить'}
                </button>
            `;
            
            groupsContainer.appendChild(groupCard);
        });
        
        // Добавляем обработчики для кнопок вступления
        initGroupButtons();
    }
    
    // Получение иконки категории
    function getCategoryIcon(category) {
        const icons = {
            'anime': 'fa-tv',
            'education': 'fa-graduation-cap',
            'entertainment': 'fa-gamepad',
            'gaming': 'fa-gamepad',
            'art': 'fa-palette',
            'general': 'fa-users'
        };
        return icons[category] || 'fa-users';
    }
    
    // Получение названия категории
    function getCategoryName(category) {
        const names = {
            'anime': 'Аниме',
            'education': 'Обучение',
            'entertainment': 'Развлечения',
            'gaming': 'Игры',
            'art': 'Искусство',
            'general': 'Общее'
        };
        return names[category] || 'Общее';
    }
    
    // Форматирование чисел
    function formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'к';
        }
        return num.toString();
    }
    
    // Загрузка тестовых данных групп
    function loadGroups() {
        allGroups = [
            {
                id: 1,
                name: 'Аниме-энтузиасты',
                description: 'Обсуждаем новые релизы, делимся рекомендациями и теориями',
                category: 'anime',
                members: 1200,
                discussions: 45,
                joined: false,
                privacy: 'public',
                createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000
            },
            {
                id: 2,
                name: 'Изучаем японский',
                description: 'Помогаем друг другу в изучении языка и культуры Японии',
                category: 'education',
                members: 856,
                discussions: 32,
                joined: false,
                privacy: 'public',
                createdAt: Date.now() - 15 * 24 * 60 * 60 * 1000
            },
            {
                id: 3,
                name: 'Геймеры Kirava',
                description: 'Обсуждаем игры, проходим викторины и соревнуемся в рейтингах',
                category: 'gaming',
                members: 743,
                discussions: 28,
                joined: false,
                privacy: 'public',
                createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000
            },
            {
                id: 4,
                name: 'Идеи для Kirava',
                description: 'Предлагаем улучшения и новые функции для платформы',
                category: 'general',
                members: 521,
                discussions: 67,
                joined: false,
                privacy: 'public',
                createdAt: Date.now() - 45 * 24 * 60 * 60 * 1000
            },
            {
                id: 5,
                name: 'Романтика и драма',
                description: 'Для любителей эмоциональных и трогательных историй',
                category: 'anime',
                members: 489,
                discussions: 23,
                joined: false,
                privacy: 'private',
                createdAt: Date.now() - 20 * 24 * 60 * 60 * 1000
            },
            {
                id: 6,
                name: 'Аниме OST',
                description: 'Делимся любимыми саундтреками и обсуждаем композиторов',
                category: 'art',
                members: 412,
                discussions: 19,
                joined: false,
                privacy: 'public',
                createdAt: Date.now() - 10 * 24 * 60 * 60 * 1000
            },
            {
                id: 7,
                name: 'Манга комьюнити',
                description: 'Читаем, обсуждаем и переводим мангу вместе',
                category: 'anime',
                members: 625,
                discussions: 41,
                joined: false,
                privacy: 'public',
                createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000
            },
            {
                id: 8,
                name: 'Косплей мастерская',
                description: 'Делимся опытом создания костюмов и проводим фотосессии',
                category: 'art',
                members: 318,
                discussions: 15,
                joined: false,
                privacy: 'public',
                createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000
            }
        ];
        
        displayGroups(allGroups);
        searchGroups();
    }
    
    // Обработчики событий
    if (searchBtn) {
        searchBtn.addEventListener('click', searchGroups);
    }
    
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', function() {
            if (searchInput) searchInput.value = '';
            if (categoryFilter) categoryFilter.value = 'all';
            if (sortFilter) sortFilter.value = 'popular';
            searchGroups();
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchGroups();
            }
        });
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', searchGroups);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', searchGroups);
    }
    
    // Загрузка групп при инициализации
    loadGroups();
}

// Инициализация кнопок
function initButtons() {
    // Кнопки вступления в группы (существующие)
    document.querySelectorAll('.btn-group:not(.joined)').forEach(btn => {
        btn.addEventListener('click', function() {
            const groupTitle = this.closest('.group-card')?.querySelector('.group-title')?.textContent;
            if (groupTitle) {
                showNotification(`Вы вступили в группу: "${groupTitle}"`, 'success');
                this.innerHTML = '<i class="fas fa-check"></i> Вы в группе';
                this.classList.add('joined');
                this.disabled = true;
            }
        });
    });
}

// Инициализация кнопок групп
function initGroupButtons() {
    document.querySelectorAll('.btn-group:not(.joined)').forEach(btn => {
        btn.addEventListener('click', function() {
            const groupId = this.getAttribute('data-group-id');
            const group = allGroups.find(g => g.id === parseInt(groupId));
            
            if (group) {
                group.joined = true;
                group.members += 1;
                
                this.innerHTML = '<i class="fas fa-check"></i> Вы в группе';
                this.classList.add('joined');
                
                // Обновляем счетчик в реальном времени
                const memberCount = this.closest('.group-card')?.querySelector('.member-count');
                if (memberCount) {
                    memberCount.innerHTML = `<i class="fas fa-user-friends"></i> ${formatNumber(group.members)} участников`;
                }
                
                showNotification(`Вы успешно вступили в группу "${group.name}"!`, 'success');
            }
        });
    });
}

// Функция показа уведомлений
function showNotification(message, type = 'info') {
    // Удаляем предыдущие уведомления
    document.querySelectorAll('.notification').forEach(notification => {
        notification.remove();
    });
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    document.body.appendChild(notification);
    
    // Автоматическое закрытие через 5 секунд
    setTimeout(() => {
        closeNotification(notification);
    }, 5000);
    
    // Ручное закрытие
    notification.querySelector('.notification-close').addEventListener('click', function() {
        closeNotification(notification);
    });
    
    // Функция закрытия уведомления
    function closeNotification(notif) {
        notif.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notif.parentNode) {
                document.body.removeChild(notif);
            }
        }, 300);
    }
}

// Форматирование чисел (для использования в других функциях)
function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'к';
    }
    return num.toString();
}

// Загрузка тестовых данных
function loadSampleData() {
    // Тестовые сообщения для общего чата Kirava
    const sampleMessages = [
        {
            id: 1,
            user: { name: 'Админ', role: 'admin', avatar: 'А' },
            time: '09:30',
            content: 'Добро пожаловать в общий чат сообщества Kirava!'
        },
        {
            id: 2,
            user: { name: 'АнимеФан', role: 'user', avatar: 'А' },
            time: '10:15',
            content: 'Привет всем! Кто проходил новую викторину по аниме "Человек-бензопила"?'
        },
        {
            id: 3,
            user: { name: 'Учитель', role: 'moderator', avatar: 'У' },
            time: '10:22',
            content: 'Напоминаю, что сегодня вечером начинается вебинар по основам японского языка.'
        },
        {
            id: 4,
            user: { name: 'Геймер', role: 'user', avatar: 'Г' },
            time: '10:30',
            content: 'Кто играет в аниме-игры? Хочу порекомендовать новую игру по мотивам "Токийский гуль"'
        },
        {
            id: 5,
            user: { name: 'Новичок', role: 'user', avatar: 'Н' },
            time: '10:45',
            content: 'Только присоединился к Kirava. Какие разделы посоветуете изучить в первую очередь?'
        },
        {
            id: 6,
            user: { name: 'АнимеФан', role: 'user', avatar: 'А' },
            time: '10:50',
            content: 'Обязательно загляни в раздел "Обучение" - там много полезных материалов'
        },
        {
            id: 7,
            user: { name: 'Косплейщик', role: 'user', avatar: 'К' },
            time: '11:05',
            content: 'Вчера закончил костюм из "Атаки титанов", скоро выложу фото!'
        },
        {
            id: 8,
            user: { name: 'МангаКлуб', role: 'moderator', avatar: 'М' },
            time: '11:20',
            content: 'В эту субботу проводим совместное чтение новой манги, присоединяйтесь!'
        }
    ];
    
    // Добавление тестовых сообщений
    const messagesContainer = document.getElementById('messages-container');
    if (messagesContainer) {
        sampleMessages.forEach(msg => {
            const messageElement = document.createElement('div');
            messageElement.className = 'message';
            messageElement.innerHTML = `
                <div class="message-header">
                    <div class="message-user">
                        <div class="user-avatar">${msg.user.avatar}</div>
                        <span class="user-name">${msg.user.name}</span>
                        <span class="user-role ${msg.user.role}">${
                            msg.user.role === 'admin' ? 'Администратор' :
                            msg.user.role === 'moderator' ? 'Модератор' : 'Участник'
                        }</span>
                    </div>
                    <span class="message-time">${msg.time}</span>
                </div>
                <div class="message-content">${msg.content}</div>
            `;
            
            messagesContainer.appendChild(messageElement);
        });
        
        // Прокрутка вниз
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}