// ================================
// GALLERY COMPONENT - PREMIUM
// Sistema de Galeria de Mídia Avançado
// ================================

class PremiumGallery {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.options = {
            // Configurações padrão
            autoplay: false,
            loop: true,
            showThumbnails: true,
            showCounter: true,
            showNavigation: true,
            keyboardNavigation: true,
            touchNavigation: true,
            lazyLoading: true,
            transition: 'fade', // 'fade', 'slide', 'zoom'
            transitionDuration: 500,
            autoplayDelay: 5000,
            thumbnailSize: {
                width: 80,
                height: 60
            },
            ...options
        };

        this.currentIndex = 0;
        this.items = [];
        this.isOpen = false;
        this.touchStartX = 0;
        this.touchEndX = 0;

        this.init();
    }

    init() {
        this.createGalleryStructure();
        this.bindEvents();
        this.loadItems();

        if (this.options.lazyLoading) {
            this.initLazyLoading();
        }
    }

    createGalleryStructure() {
        // Criar overlay principal
        this.overlay = document.createElement('div');
        this.overlay.className = 'gallery-overlay';
        this.overlay.innerHTML = `
            <div class="gallery-container">
                <!-- Header da galeria -->
                <div class="gallery-header">
                    <div class="gallery-title"></div>
                    <div class="gallery-counter" style="display: ${this.options.showCounter ? 'block' : 'none'}">
                        <span class="current">1</span> / <span class="total">1</span>
                    </div>
                    <button class="gallery-close" aria-label="Fechar galeria">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <!-- Conteúdo principal -->
                <div class="gallery-content">
                    <!-- Navegação -->
                    <div class="gallery-navigation" style="display: ${this.options.showNavigation ? 'flex' : 'none'}">
                        <button class="gallery-nav gallery-prev" aria-label="Anterior">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        <button class="gallery-nav gallery-next" aria-label="Próximo">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>

                    <!-- Área de mídia -->
                    <div class="gallery-media">
                        <div class="media-container">
                            <!-- Imagem principal -->
                            <img class="gallery-image" src="" alt="" style="display: none;">

                            <!-- Vídeo -->
                            <video class="gallery-video" controls style="display: none;">
                                <source src="" type="video/mp4">
                                Seu navegador não suporta vídeos HTML5.
                            </video>

                            <!-- Loading -->
                            <div class="gallery-loading">
                                <div class="loading-spinner"></div>
                                <p>Carregando mídia...</p>
                            </div>
                        </div>

                        <!-- Caption -->
                        <div class="gallery-caption">
                            <h3 class="caption-title"></h3>
                            <p class="caption-description"></p>
                            <div class="caption-tags"></div>
                        </div>
                    </div>
                </div>

                <!-- Thumbnails -->
                <div class="gallery-thumbnails" style="display: ${this.options.showThumbnails ? 'block' : 'none'}">
                    <div class="thumbnails-container">
                        <!-- Thumbnails serão inseridas dinamicamente -->
                    </div>
                </div>

                <!-- Controles de reprodução para vídeo -->
                <div class="gallery-video-controls" style="display: none;">
                    <button class="video-control play-pause">
                        <i class="fas fa-play"></i>
                    </button>
                    <div class="video-progress">
                        <div class="progress-bar">
                            <div class="progress-fill"></div>
                        </div>
                    </div>
                    <div class="video-time">
                        <span class="current-time">0:00</span> /
                        <span class="total-time">0:00</span>
                    </div>
                    <button class="video-control fullscreen">
                        <i class="fas fa-expand"></i>
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(this.overlay);
        this.initializeElements();
    }

    initializeElements() {
        // Elementos principais
        this.galleryContainer = this.overlay.querySelector('.gallery-container');
        this.mediaContainer = this.overlay.querySelector('.media-container');
        this.galleryImage = this.overlay.querySelector('.gallery-image');
        this.galleryVideo = this.overlay.querySelector('.gallery-video');
        this.galleryLoading = this.overlay.querySelector('.gallery-loading');

        // Navegação
        this.prevButton = this.overlay.querySelector('.gallery-prev');
        this.nextButton = this.overlay.querySelector('.gallery-next');
        this.closeButton = this.overlay.querySelector('.gallery-close');

        // Informações
        this.galleryTitle = this.overlay.querySelector('.gallery-title');
        this.currentCounter = this.overlay.querySelector('.current');
        this.totalCounter = this.overlay.querySelector('.total');

        // Caption
        this.captionTitle = this.overlay.querySelector('.caption-title');
        this.captionDescription = this.overlay.querySelector('.caption-description');
        this.captionTags = this.overlay.querySelector('.caption-tags');

        // Thumbnails
        this.thumbnailsContainer = this.overlay.querySelector('.thumbnails-container');

        // Controles de vídeo
        this.videoControls = this.overlay.querySelector('.gallery-video-controls');
        this.playPauseButton = this.overlay.querySelector('.play-pause');
        this.progressBar = this.overlay.querySelector('.progress-bar');
        this.progressFill = this.overlay.querySelector('.progress-fill');
        this.currentTimeSpan = this.overlay.querySelector('.current-time');
        this.totalTimeSpan = this.overlay.querySelector('.total-time');
        this.fullscreenButton = this.overlay.querySelector('.fullscreen');
    }

    bindEvents() {
        // Fechar galeria
        this.closeButton.addEventListener('click', () => this.close());
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) this.close();
        });

        // Navegação
        this.prevButton.addEventListener('click', () => this.prev());
        this.nextButton.addEventListener('click', () => this.next());

        // Teclado
        if (this.options.keyboardNavigation) {
            document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        }

        // Touch/Swipe
        if (this.options.touchNavigation) {
            this.mediaContainer.addEventListener('touchstart', (e) => this.handleTouchStart(e));
            this.mediaContainer.addEventListener('touchend', (e) => this.handleTouchEnd(e));
        }

        // Controles de vídeo
        this.playPauseButton.addEventListener('click', () => this.toggleVideoPlay());
        this.progressBar.addEventListener('click', (e) => this.seekVideo(e));
        this.fullscreenButton.addEventListener('click', () => this.toggleVideoFullscreen());

        // Eventos de vídeo
        this.galleryVideo.addEventListener('loadedmetadata', () => this.updateVideoTime());
        this.galleryVideo.addEventListener('timeupdate', () => this.updateVideoProgress());
        this.galleryVideo.addEventListener('ended', () => this.onVideoEnded());
    }

    loadItems() {
        // Carregar itens do container original
        const triggers = this.container.querySelectorAll('[data-gallery]');

        triggers.forEach((trigger, index) => {
            const item = {
                type: trigger.dataset.type || 'image',
                src: trigger.dataset.src || trigger.href,
                thumbnail: trigger.dataset.thumbnail,
                title: trigger.dataset.title || trigger.title,
                description: trigger.dataset.description || '',
                tags: trigger.dataset.tags ? trigger.dataset.tags.split(',') : [],
                duration: trigger.dataset.duration || '',
                element: trigger
            };

            this.items.push(item);

            // Adicionar evento de clique
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                this.open(index);
            });
        });

        this.createThumbnails();
    }

    createThumbnails() {
        if (!this.options.showThumbnails) return;

        this.thumbnailsContainer.innerHTML = '';

        this.items.forEach((item, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'gallery-thumbnail';
            thumbnail.dataset.index = index;

            const thumbnailSrc = item.thumbnail || item.src;

            thumbnail.innerHTML = `
                <div class="thumbnail-inner">
                    ${item.type === 'video' ? '<div class="thumbnail-play"><i class="fas fa-play"></i></div>' : ''}
                    <img src="${thumbnailSrc}" alt="${item.title}" loading="lazy">
                    ${item.duration ? `<div class="thumbnail-duration">${item.duration}</div>` : ''}
                </div>
            `;

            thumbnail.addEventListener('click', () => this.goTo(index));
            this.thumbnailsContainer.appendChild(thumbnail);
        });
    }

    open(index = 0) {
        this.currentIndex = index;
        this.isOpen = true;
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        this.updateDisplay();
        this.updateCounter();
        this.updateThumbnails();

        // Animação de entrada
        setTimeout(() => {
            this.overlay.classList.add('loaded');
        }, 50);
    }

    close() {
        this.isOpen = false;
        this.overlay.classList.remove('active', 'loaded');
        document.body.style.overflow = '';

        // Parar vídeo se estiver reproduzindo
        if (!this.galleryVideo.paused) {
            this.galleryVideo.pause();
        }
    }

    next() {
        if (this.currentIndex < this.items.length - 1) {
            this.currentIndex++;
        } else if (this.options.loop) {
            this.currentIndex = 0;
        }
        this.updateDisplay();
    }

    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        } else if (this.options.loop) {
            this.currentIndex = this.items.length - 1;
        }
        this.updateDisplay();
    }

    goTo(index) {
        this.currentIndex = index;
        this.updateDisplay();
    }

    updateDisplay() {
        const item = this.items[this.currentIndex];
        if (!item) return;

        // Mostrar loading
        this.showLoading();

        // Atualizar título
        this.galleryTitle.textContent = item.title;

        // Atualizar caption
        this.captionTitle.textContent = item.title;
        this.captionDescription.textContent = item.description;

        // Atualizar tags
        this.captionTags.innerHTML = '';
        if (item.tags.length > 0) {
            item.tags.forEach(tag => {
                const tagElement = document.createElement('span');
                tagElement.className = 'tag';
                tagElement.textContent = tag.trim();
                this.captionTags.appendChild(tagElement);
            });
        }

        // Carregar mídia
        if (item.type === 'video') {
            this.loadVideo(item);
        } else {
            this.loadImage(item);
        }

        this.updateCounter();
        this.updateThumbnails();
    }

    loadImage(item) {
        const img = new Image();

        img.onload = () => {
            this.galleryImage.src = item.src;
            this.galleryImage.alt = item.title;
            this.showImage();
            this.hideLoading();
        };

        img.onerror = () => {
            console.error('Erro ao carregar imagem:', item.src);
            this.showError('Erro ao carregar imagem');
        };

        img.src = item.src;
    }

    loadVideo(item) {
        this.galleryVideo.src = item.src;
        this.galleryVideo.load();

        this.galleryVideo.addEventListener('loadeddata', () => {
            this.showVideo();
            this.hideLoading();
        }, { once: true });

        this.galleryVideo.addEventListener('error', () => {
            console.error('Erro ao carregar vídeo:', item.src);
            this.showError('Erro ao carregar vídeo');
        }, { once: true });
    }

    showImage() {
        this.galleryImage.style.display = 'block';
        this.galleryVideo.style.display = 'none';
        this.videoControls.style.display = 'none';
    }

    showVideo() {
        this.galleryImage.style.display = 'none';
        this.galleryVideo.style.display = 'block';
        this.videoControls.style.display = 'flex';
    }

    showLoading() {
        this.galleryLoading.style.display = 'flex';
    }

    hideLoading() {
        this.galleryLoading.style.display = 'none';
    }

    showError(message) {
        this.galleryLoading.innerHTML = `
            <div class="error-icon">⚠️</div>
            <p>${message}</p>
        `;
    }

    updateCounter() {
        if (this.options.showCounter) {
            this.currentCounter.textContent = this.currentIndex + 1;
            this.totalCounter.textContent = this.items.length;
        }
    }

    updateThumbnails() {
        if (!this.options.showThumbnails) return;

        const thumbnails = this.thumbnailsContainer.querySelectorAll('.gallery-thumbnail');
        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === this.currentIndex);
        });
    }

    // Eventos de teclado
    handleKeyboard(e) {
        if (!this.isOpen) return;

        switch (e.key) {
            case 'Escape':
                this.close();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                this.prev();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.next();
                break;
            case ' ':
                e.preventDefault();
                if (this.items[this.currentIndex].type === 'video') {
                    this.toggleVideoPlay();
                }
                break;
        }
    }

    // Eventos de touch
    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
    }

    handleTouchEnd(e) {
        this.touchEndX = e.changedTouches[0].clientX;
        const diff = this.touchStartX - this.touchEndX;

        if (Math.abs(diff) > 50) { // Threshold mínimo
            if (diff > 0) {
                this.next();
            } else {
                this.prev();
            }
        }
    }

    // Controles de vídeo
    toggleVideoPlay() {
        if (this.galleryVideo.paused) {
            this.galleryVideo.play();
            this.playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            this.galleryVideo.pause();
            this.playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
        }
    }

    seekVideo(e) {
        const rect = this.progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        this.galleryVideo.currentTime = percent * this.galleryVideo.duration;
    }

    updateVideoProgress() {
        const percent = (this.galleryVideo.currentTime / this.galleryVideo.duration) * 100;
        this.progressFill.style.width = percent + '%';

        this.currentTimeSpan.textContent = this.formatTime(this.galleryVideo.currentTime);
    }

    updateVideoTime() {
        this.totalTimeSpan.textContent = this.formatTime(this.galleryVideo.duration);
    }

    onVideoEnded() {
        this.playPauseButton.innerHTML = '<i class="fas fa-play"></i>';

        if (this.options.autoplay && this.currentIndex < this.items.length - 1) {
            setTimeout(() => this.next(), 1000);
        }
    }

    toggleVideoFullscreen() {
        if (this.galleryVideo.requestFullscreen) {
            this.galleryVideo.requestFullscreen();
        }
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    initLazyLoading() {
        // Implementar lazy loading para thumbnails
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });

        this.thumbnailsContainer.querySelectorAll('img[data-src]').forEach(img => {
            observer.observe(img);
        });
    }

    // Métodos públicos para controle externo
    destroy() {
        this.overlay.remove();
        document.removeEventListener('keydown', this.handleKeyboard);
    }

    addItem(item) {
        this.items.push(item);
        this.createThumbnails();
    }

    removeItem(index) {
        this.items.splice(index, 1);
        this.createThumbnails();

        if (this.currentIndex >= this.items.length) {
            this.currentIndex = this.items.length - 1;
        }
    }

    updateItem(index, newItem) {
        this.items[index] = { ...this.items[index], ...newItem };
        this.createThumbnails();
    }
}

// Função de inicialização automática
document.addEventListener('DOMContentLoaded', () => {
    // Auto-inicializar galerias com data-auto-gallery
    document.querySelectorAll('[data-auto-gallery]').forEach(container => {
        const options = container.dataset.galleryOptions ?
            JSON.parse(container.dataset.galleryOptions) : {};

        new PremiumGallery(container.id, options);
    });
});

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.PremiumGallery = PremiumGallery;
}
