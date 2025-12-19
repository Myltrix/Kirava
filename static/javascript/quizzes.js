    // Функции для карусели
    document.addEventListener('DOMContentLoaded', function() {
      // Инициализация всех каруселей
      initCarousels();
      
      // Навигация по точкам
      initSectionNavigation();
      
      // Активация секций при скролле
      activateSectionsOnScroll();
    });

    function initCarousels() {
      const carousels = document.querySelectorAll('.quizzes-carousel');
      
      carousels.forEach(carousel => {
        const container = carousel.closest('.carousel-container');
        const prevBtn = container.querySelector('.carousel-prev');
        const nextBtn = container.querySelector('.carousel-next');
        
        if (prevBtn) {
          prevBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: -300, behavior: 'smooth' });
          });
        }
        
        if (nextBtn) {
          nextBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: 300, behavior: 'smooth' });
          });
        }
      });
    }

    function initSectionNavigation() {
      const navDots = document.querySelectorAll('.nav-dot');
      
      navDots.forEach(dot => {
        dot.addEventListener('click', () => {
          const sectionId = dot.getAttribute('data-section');
          const section = document.getElementById(sectionId);
          
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            
            // Обновляем активную точку
            navDots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
          }
        });
      });
    }

    function activateSectionsOnScroll() {
      const sections = document.querySelectorAll('.quizzes');
      const navDots = document.querySelectorAll('.nav-dot');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            
            // Обновляем активную точку
            navDots.forEach(dot => {
              if (dot.getAttribute('data-section') === sectionId) {
                dot.classList.add('active');
              } else {
                dot.classList.remove('active');
              }
            });
            
            // Активируем секцию
            entry.target.classList.add('active');
          }
        });
      }, { threshold: 0.3 });
      
      sections.forEach(section => observer.observe(section));
    }

    // Базовая функция для открытия деталей аниме
    function openAnimeDetails(title, image, type) {
      alert(`Открываем детали: ${title}`);
      // Здесь будет логика открытия модального окна или перехода на страницу
    }