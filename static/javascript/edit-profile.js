// static/javascript/edit-profile.js
document.addEventListener('DOMContentLoaded', function() {
  const MAX_BIO_LENGTH = 80;

  // Функция для уведомлений
  function showNotification(msg, type = 'info') {
    const old = document.querySelectorAll('.notification');
    old.forEach(n => n.remove());

    const n = document.createElement('div');
    n.className = `notification ${type}`;
    n.style.cssText = `
      position: fixed; top: 100px; right: 20px; z-index: 10000;
      padding: 14px 18px; border-radius: 10px;
      background: ${type === 'success' ? '#2e7d32' : type === 'error' ? '#c62828' : '#0037ac'};
      color: #fff; box-shadow: 0 8px 20px rgba(0,0,0,.35);
      transform: translateX(120%); opacity: 0;
      transition: all .25s ease; max-width: 360px;
    `;
    n.textContent = msg;
    document.body.appendChild(n);

    requestAnimationFrame(() => {
      n.style.transform = 'translateX(0)';
      n.style.opacity = '1';
    });

    setTimeout(() => {
      n.style.transform = 'translateX(120%)';
      n.style.opacity = '0';
      setTimeout(() => n.remove(), 250);
    }, 3500);
  }

  // ---------- Счётчик символов в "О себе" ----------
  const bio = document.getElementById('bio');
  const bioChars = document.getElementById('bio-chars');
  
  if (bio && bioChars) {
    bio.maxLength = MAX_BIO_LENGTH;
    
    if (bio.value.length > MAX_BIO_LENGTH) {
      bio.value = bio.value.substring(0, MAX_BIO_LENGTH);
    }
    
    bioChars.textContent = bio.value.length;
    
    function updateCounterColor(len) {
      if (len >= MAX_BIO_LENGTH) {
        bioChars.style.color = '#ff6b6b';
      } else if (len >= MAX_BIO_LENGTH * 0.9) {
        bioChars.style.color = '#ff9800';
      } else {
        bioChars.style.color = '';
      }
    }
    
    updateCounterColor(bio.value.length);
    
    bio.addEventListener('input', function(e) {
      const currentLength = this.value.length;
      
      bioChars.textContent = currentLength;
      updateCounterColor(currentLength);
      
      if (currentLength >= MAX_BIO_LENGTH) {
        if (currentLength > MAX_BIO_LENGTH) {
          this.value = this.value.substring(0, MAX_BIO_LENGTH);
          bioChars.textContent = MAX_BIO_LENGTH;
        }
        
        if (currentLength === MAX_BIO_LENGTH) {
          showNotification('Достигнут лимит в 80 символов', 'error');
        }
      }
    });
    
    bio.addEventListener('paste', function(e) {
      const clipboardData = e.clipboardData || window.clipboardData;
      const pastedText = clipboardData.getData('text');
      
      if (pastedText.length + this.value.length > MAX_BIO_LENGTH) {
        e.preventDefault();
        
        const allowedLength = MAX_BIO_LENGTH - this.value.length;
        if (allowedLength > 0) {
          const textToPaste = pastedText.substring(0, allowedLength);
          document.execCommand('insertText', false, textToPaste);
        }
        
        showNotification(`Можно вставить только ${allowedLength} символов`, 'error');
      }
    });
    
    bio.addEventListener('keydown', function(e) {
      const allowedKeys = [
        'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 
        'ArrowUp', 'ArrowDown', 'Tab', 'Home', 'End',
        'Control', 'Alt', 'Meta', 'Shift'
      ];
      
      if (this.value.length >= MAX_BIO_LENGTH && 
          !allowedKeys.includes(e.key) &&
          !e.ctrlKey && !e.metaKey && !e.altKey) {
        
        const selection = window.getSelection();
        if (!selection.toString()) {
          e.preventDefault();
          
          if (navigator.vibrate) {
            navigator.vibrate(50);
          }
        }
      }
    });
  }

  // ---------- Аватар: предпросмотр и удаление ----------
  const avatarUpload = document.getElementById('avatar-upload');
  const removeAvatarBtn = document.getElementById('remove-avatar');

  if (avatarUpload) {
    avatarUpload.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const okTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!okTypes.includes(file.type)) {
        showNotification('Формат аватара: JPG/PNG/GIF/WEBP', 'error');
        avatarUpload.value = '';
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        showNotification('Максимальный размер файла: 5MB', 'error');
        avatarUpload.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onload = function(e) {
        const avatarContainer = document.querySelector('.avatar-circle.large');
        if (!avatarContainer) return;

        let img = avatarContainer.querySelector('img#avatar-preview');
        if (!img) {
          avatarContainer.querySelector('i')?.remove();
          img = document.createElement('img');
          img.id = 'avatar-preview';
          img.alt = 'Avatar';
          img.style.cssText = 'width:100%;height:100%;border-radius:50%;object-fit:cover;';
          avatarContainer.appendChild(img);
        }
        img.src = e.target.result;
        
        showNotification('Аватар выбран (сохранится после нажатия "Сохранить изменения")', 'success');
      };
      reader.readAsDataURL(file);
    });
  }

  if (removeAvatarBtn) {
    removeAvatarBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      if (avatarUpload) avatarUpload.value = '';

      const avatarContainer = document.querySelector('.avatar-circle.large');
      if (avatarContainer) {
        avatarContainer.querySelector('img#avatar-preview')?.remove();
        
        const icon = document.createElement('i');
        icon.id = 'avatar-preview-icon';
        icon.className = 'fas fa-user';
        icon.style.cssText = 'font-size:4rem;color:white;';
        avatarContainer.appendChild(icon);
      }

      showNotification('Аватар будет удалён после сохранения', 'success');
    });
  }

  // ---------- Социальные сети: модальное окно ----------
  const editSocialBtn = document.getElementById('editSocialBtn');
  const socialModal = document.getElementById('socialModal');
  const closeSocialModal = document.getElementById('closeSocialModal');
  const cancelSocialModal = document.getElementById('cancelSocialModal');
  const saveSocialModal = document.getElementById('saveSocialModal');

  // Элементы ввода в модальном окне
  const socialVkInput = document.getElementById('modal-social-vk-url');
  const socialTelegramInput = document.getElementById('modal-social-telegram-url');
  const socialInstagramInput = document.getElementById('modal-social-instagram-url');
  const socialYoutubeInput = document.getElementById('modal-social-youtube-url');

  // Скрытые поля в форме
  const vkUrlInput = document.getElementById('vk_url_input');
  const telegramUrlInput = document.getElementById('telegram_url_input');
  const instagramUrlInput = document.getElementById('instagram_url_input');
  const youtubeUrlInput = document.getElementById('youtube_url_input');

  // Загружаем текущие значения в модальное окно
  function loadSocialValues() {
    if (socialVkInput && vkUrlInput) {
      socialVkInput.value = vkUrlInput.value;
    }
    if (socialTelegramInput && telegramUrlInput) {
      socialTelegramInput.value = telegramUrlInput.value;
    }
    if (socialInstagramInput && instagramUrlInput) {
      socialInstagramInput.value = instagramUrlInput.value;
    }
    if (socialYoutubeInput && youtubeUrlInput) {
      socialYoutubeInput.value = youtubeUrlInput.value;
    }
  }

  // Сохраняем значения из модального окна
  function saveSocialValues() {
    if (vkUrlInput && socialVkInput) {
      vkUrlInput.value = socialVkInput.value;
    }
    if (telegramUrlInput && socialTelegramInput) {
      telegramUrlInput.value = socialTelegramInput.value;
    }
    if (instagramUrlInput && socialInstagramInput) {
      instagramUrlInput.value = socialInstagramInput.value;
    }
    if (youtubeUrlInput && socialYoutubeInput) {
      youtubeUrlInput.value = socialYoutubeInput.value;
    }
  }

  // Обновляем отображение социальных ссылок в карточке
  function updateSocialLinksDisplay() {
    const socialLinksView = document.getElementById('socialLinksView');
    if (!socialLinksView) return;

    // VK
    const vkItem = socialLinksView.querySelector('.social-link-item:first-child');
    if (vkItem && vkUrlInput) {
      if (vkUrlInput.value) {
        vkItem.href = vkUrlInput.value;
        vkItem.target = '_blank';
        vkItem.className = 'social-link-item';
        
        const usernameSpan = vkItem.querySelector('.social-username');
        if (usernameSpan) {
          if (vkUrlInput.value.includes("vk.com/")) {
            usernameSpan.textContent = '@' + vkUrlInput.value.split('vk.com/')[1];
          } else {
            usernameSpan.textContent = vkUrlInput.value;
          }
        }
        
        const plusIcon = vkItem.querySelector('.social-link-icon');
        if (plusIcon) {
          plusIcon.className = 'fas fa-external-link-alt social-external-icon';
        }
      } else {
        vkItem.href = '#';
        vkItem.onclick = openSocialModal;
        vkItem.removeAttribute('target');
        vkItem.className = 'social-link-item empty';
        
        const usernameSpan = vkItem.querySelector('.social-username');
        if (usernameSpan) {
          usernameSpan.textContent = 'Не добавлено';
        }
        
        const externalIcon = vkItem.querySelector('.social-external-icon');
        if (externalIcon) {
          externalIcon.className = 'fas fa-plus social-link-icon';
        }
      }
    }

    // Telegram
    const telegramItem = socialLinksView.querySelectorAll('.social-link-item')[1];
    if (telegramItem && telegramUrlInput) {
      if (telegramUrlInput.value) {
        telegramItem.href = telegramUrlInput.value;
        telegramItem.target = '_blank';
        telegramItem.className = 'social-link-item';
        
        const usernameSpan = telegramItem.querySelector('.social-username');
        if (usernameSpan) {
          if (telegramUrlInput.value.includes("t.me/")) {
            usernameSpan.textContent = '@' + telegramUrlInput.value.split('t.me/')[1];
          } else {
            usernameSpan.textContent = telegramUrlInput.value;
          }
        }
        
        const plusIcon = telegramItem.querySelector('.social-link-icon');
        if (plusIcon) {
          plusIcon.className = 'fas fa-external-link-alt social-external-icon';
        }
      } else {
        telegramItem.href = '#';
        telegramItem.onclick = openSocialModal;
        telegramItem.removeAttribute('target');
        telegramItem.className = 'social-link-item empty';
        
        const usernameSpan = telegramItem.querySelector('.social-username');
        if (usernameSpan) {
          usernameSpan.textContent = 'Не добавлено';
        }
        
        const externalIcon = telegramItem.querySelector('.social-external-icon');
        if (externalIcon) {
          externalIcon.className = 'fas fa-plus social-link-icon';
        }
      }
    }

    // Instagram
    const instagramItem = socialLinksView.querySelectorAll('.social-link-item')[2];
    if (instagramItem && instagramUrlInput) {
      if (instagramUrlInput.value) {
        instagramItem.href = instagramUrlInput.value;
        instagramItem.target = '_blank';
        instagramItem.className = 'social-link-item';
        
        const usernameSpan = instagramItem.querySelector('.social-username');
        if (usernameSpan) {
          if (instagramUrlInput.value.includes("instagram.com/")) {
            usernameSpan.textContent = '@' + instagramUrlInput.value.split('instagram.com/')[1];
          } else {
            usernameSpan.textContent = instagramUrlInput.value;
          }
        }
        
        const plusIcon = instagramItem.querySelector('.social-link-icon');
        if (plusIcon) {
          plusIcon.className = 'fas fa-external-link-alt social-external-icon';
        }
      } else {
        instagramItem.href = '#';
        instagramItem.onclick = openSocialModal;
        instagramItem.removeAttribute('target');
        instagramItem.className = 'social-link-item empty';
        
        const usernameSpan = instagramItem.querySelector('.social-username');
        if (usernameSpan) {
          usernameSpan.textContent = 'Не добавлено';
        }
        
        const externalIcon = instagramItem.querySelector('.social-external-icon');
        if (externalIcon) {
          externalIcon.className = 'fas fa-plus social-link-icon';
        }
      }
    }

    // YouTube
    const youtubeItem = socialLinksView.querySelectorAll('.social-link-item')[3];
    if (youtubeItem && youtubeUrlInput) {
      if (youtubeUrlInput.value) {
        youtubeItem.href = youtubeUrlInput.value;
        youtubeItem.target = '_blank';
        youtubeItem.className = 'social-link-item';
        
        const usernameSpan = youtubeItem.querySelector('.social-username');
        if (usernameSpan) {
          usernameSpan.textContent = youtubeUrlInput.value.split('youtube.com/')[1] || youtubeUrlInput.value;
        }
        
        const plusIcon = youtubeItem.querySelector('.social-link-icon');
        if (plusIcon) {
          plusIcon.className = 'fas fa-external-link-alt social-external-icon';
        }
      } else {
        youtubeItem.href = '#';
        youtubeItem.onclick = openSocialModal;
        youtubeItem.removeAttribute('target');
        youtubeItem.className = 'social-link-item empty';
        
        const usernameSpan = youtubeItem.querySelector('.social-username');
        if (usernameSpan) {
          usernameSpan.textContent = 'Не добавлено';
        }
        
        const externalIcon = youtubeItem.querySelector('.social-external-icon');
        if (externalIcon) {
          externalIcon.className = 'fas fa-plus social-link-icon';
        }
      }
    }
  }

  // Открытие модального окна социальных сетей
  function openSocialModal() {
    if (!socialModal) return;
    loadSocialValues();
    socialModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  // Закрытие модального окна социальных сетей
  function closeSocialModalFunc() {
    if (!socialModal) return;
    socialModal.style.display = 'none';
    document.body.style.overflow = '';
  }

  // Обработчики для социальных сетей
  if (editSocialBtn) {
    editSocialBtn.addEventListener('click', openSocialModal);
  }

  // Обработка кликов на пустые социальные ссылки
  document.querySelectorAll('.social-link-item.empty').forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      openSocialModal();
    });
  });

  if (closeSocialModal) {
    closeSocialModal.addEventListener('click', closeSocialModalFunc);
  }

  if (cancelSocialModal) {
    cancelSocialModal.addEventListener('click', (e) => {
      e.preventDefault();
      closeSocialModalFunc();
    });
  }

  if (saveSocialModal) {
    saveSocialModal.addEventListener('click', (e) => {
      e.preventDefault();
      saveSocialValues();
      updateSocialLinksDisplay();
      closeSocialModalFunc();
      showNotification('Социальные сети сохранены (сохранятся после нажатия "Сохранить изменения")', 'success');
    });
  }

  // Закрытие по клику вне модального окна
  if (socialModal) {
    socialModal.addEventListener('click', (e) => {
      if (e.target === socialModal) closeSocialModalFunc();
    });
  }

  // ---------- Выбор страны ----------
  const countryModal = document.getElementById('countryModal');
  const selectCountryBtn = document.getElementById('selectCountryBtn');
  const closeCountryModal = document.getElementById('closeCountryModal');
  const cancelCountryChange = document.getElementById('cancelCountryChange');
  const saveCountryChange = document.getElementById('saveCountryChange');
  const countryDisplay = document.getElementById('countryDisplay');
  const countryInput = document.getElementById('countryInput');
  const countryItems = document.querySelectorAll('.language-item');

  // Открытие модального окна стран
  function openCountryModal() {
    if (!countryModal) return;
    countryModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    const current = countryInput?.value || '';
    countryItems.forEach(item => {
      if (item.dataset.country === current) {
        item.classList.add('selected');
      } else {
        item.classList.remove('selected');
      }
    });
  }

  // Закрытие модального окна стран
  function closeCountryModalFunc() {
    if (!countryModal) return;
    countryModal.style.display = 'none';
    document.body.style.overflow = '';
  }

  // Обработчики для стран
  if (selectCountryBtn) {
    selectCountryBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openCountryModal();
    });
  }

  if (closeCountryModal) {
    closeCountryModal.addEventListener('click', closeCountryModalFunc);
  }

  if (cancelCountryChange) {
    cancelCountryChange.addEventListener('click', (e) => {
      e.preventDefault();
      closeCountryModalFunc();
    });
  }

  // Обработка выбора страны
  countryItems.forEach(item => {
    item.addEventListener('click', function() {
      countryItems.forEach(i => i.classList.remove('selected'));
      this.classList.add('selected');
    });
  });

  // Сохранение выбора страны
  if (saveCountryChange) {
    saveCountryChange.addEventListener('click', (e) => {
      e.preventDefault();
      const selectedItem = document.querySelector('.language-item.selected');
      if (selectedItem && countryInput) {
        countryInput.value = selectedItem.dataset.country || '';
        if (countryDisplay) {
          countryDisplay.textContent = selectedItem.dataset.name || 
                                      selectedItem.querySelector('.language-name')?.textContent || 
                                      'Не определена';
        }
        showNotification('Страна выбрана (сохранится после нажатия "Сохранить изменения")', 'success');
      }
      closeCountryModalFunc();
    });
  }

  // Закрытие по клику вне модального окна
  if (countryModal) {
    countryModal.addEventListener('click', (e) => {
      if (e.target === countryModal) closeCountryModalFunc();
    });
  }

  // Закрытие по Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (socialModal?.style.display === 'flex') closeSocialModalFunc();
      if (countryModal?.style.display === 'flex') closeCountryModalFunc();
    }
  });

  // ---------- Инициализация ----------
  updateSocialLinksDisplay();
});