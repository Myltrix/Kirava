// Функционал для детальной страницы аниме
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация видео плеера
    const videoPlaceholder = document.querySelector('.video-placeholder');
    const playButton = document.querySelector('.play-button');
    const watchBtn = document.querySelector('.watch-btn');
    
    if (videoPlaceholder && playButton) {
        videoPlaceholder.addEventListener('click', function() {
            playVideo();
        });
    }
    
    if (watchBtn) {
        watchBtn.addEventListener('click', function() {
            playVideo();
        });
    }
    
    function playVideo() {
        // Здесь можно добавить логику для воспроизведения видео
        alert('Воспроизведение видео пересказа...');
        // В реальном проекте здесь будет интеграция с YouTube/Vimeo или свой видеоплеер
    }
    
    // Отправка комментария
    const commentBtn = document.querySelector('.comment-input-container .btn-quiz');
    const commentInput = document.querySelector('.comment-input');
    
    if (commentBtn && commentInput) {
        commentBtn.addEventListener('click', function() {
            const commentText = commentInput.value.trim();
            if (commentText) {
                addNewComment(commentText);
                commentInput.value = '';
            } else {
                alert('Пожалуйста, введите текст комментария');
            }
        });
        
        // Добавляем возможность отправки комментария по Enter
        commentInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                commentBtn.click();
            }
        });
    }
});

function addNewComment(text) {
    const commentsList = document.querySelector('.comments-list');
    if (!commentsList) return;
    
    const newComment = document.createElement('div');
    newComment.className = 'comment';
    newComment.innerHTML = `
        <div class="comment-avatar">
            <i class="fas fa-user-circle"></i>
        </div>
        <div class="comment-content">
            <div class="comment-header">
                <span class="comment-author">Вы</span>
                <span class="comment-date">только что</span>
            </div>
            <p class="comment-text">${text}</p>
        </div>
    `;
    
    commentsList.prepend(newComment);
    
    // Плавное появление нового комментария
    newComment.style.opacity = '0';
    newComment.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        newComment.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        newComment.style.opacity = '1';
        newComment.style.transform = 'translateY(0)';
    }, 10);
}