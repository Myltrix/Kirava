// static/javascript/profile.js
document.addEventListener('DOMContentLoaded', function() {
  // Переход к редактированию профиля
  const editBtn = document.querySelector('.btn-edit');
  if (editBtn) {
    editBtn.addEventListener('click', function(e) {
      // Если это не ссылка, предотвращаем поведение по умолчанию
      if (this.tagName !== 'A') {
        e.preventDefault();
        window.location.href = '/edit-profile/';
      }
    });
  }

  // Переход к настройкам
  const settingsBtn = document.querySelector('.btn-settings');
  if (settingsBtn) {
    settingsBtn.addEventListener('click', function(e) {
      if (this.tagName !== 'A') {
        e.preventDefault();
        window.location.href = '/settings/';
      }
    });
  }

  // Анимация появления элементов при скролле
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Применяем анимацию к элементам
  const animatedElements = [
    '.info-card',
    '.category-item', 
    '.profile-card',
    '.achievement-item',
    '.activity-item',
    '.social-link-item'
  ];

  animatedElements.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'all 0.6s ease';
      observer.observe(el);
    });
  });

  // Плавный скролл для якорей
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Подсветка активного раздела при скролле
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');
  
  function highlightNavOnScroll() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (scrollY >= sectionTop - 100) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
  
  // Вызываем при загрузке и скролле
  window.addEventListener('scroll', highlightNavOnScroll);
  highlightNavOnScroll();

  // Обработка кликов по социальным сетям
  document.querySelectorAll('.social-link-item').forEach(item => {
    item.addEventListener('click', function(e) {
      // Если ссылка ведет на внешний ресурс, можно добавить tracking
      if (this.href && this.target === '_blank') {
        // Здесь можно добавить Google Analytics или другую аналитику
        console.log(`Переход в социальную сеть: ${this.href}`);
      }
    });
  });
});