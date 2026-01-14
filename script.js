// ================================
// PORTFÓLIO PREMIUM - DAVI GABRIEL
// JavaScript com Efeitos Visuais
// ================================

let isMenuOpen = false;
let currentCertification = 0;
const certifications = document.querySelectorAll('.certification-item');
let scrollTicking = false;
let particleSystem = null;

// =============================================
// UTILITÁRIOS
// =============================================

// Debounce function para otimizar eventos
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function para scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// =============================================
// NAVEGAÇÃO E MENU
// =============================================

function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navSocial = document.querySelector('.nav-social');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Toggle menu mobile com animações premium
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            navToggle.classList.toggle('active');

            if (navMenu) {
                navMenu.classList.toggle('active');

                // Adicionar efeito de blur no fundo
                if (isMenuOpen) {
                    document.body.style.backdropFilter = 'blur(10px)';
                } else {
                    document.body.style.backdropFilter = 'none';
                }
            }

            if (navSocial) {
                navSocial.classList.toggle('active');
            }

            // Prevenir scroll quando menu está aberto
            document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';

            // Adicionar efeito visual no navbar
            if (isMenuOpen) {
                navbar.style.background = 'rgba(13, 17, 23, 0.98)';
            } else {
                navbar.style.background = 'rgba(13, 17, 23, 0.8)';
            }
        });
    }

    // Fechar menu ao clicar em links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                navToggle?.classList.remove('active');
                navMenu?.classList.remove('active');
                navSocial?.classList.remove('active');
                document.body.style.overflow = 'auto';
                isMenuOpen = false;
            }
        });
    });

    // Fechar menu ao redimensionar tela
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992 && isMenuOpen) {
            navToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
            navSocial?.classList.remove('active');
            document.body.style.overflow = 'auto';
            isMenuOpen = false;
        }
    });
}

// =============================================
// NAVEGAÇÃO ATIVA E SCROLL
// =============================================

function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNavigation() {
        const scrollY = window.pageYOffset;

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
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

    window.addEventListener('scroll', throttle(updateActiveNavigation, 100));
}

// =============================================
// SMOOTH SCROLLING
// =============================================

function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// =============================================
// ANIMAÇÕES DE SCROLL
// =============================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.classList.add('animate-in');

                // Adicionar efeito de glow para elementos especiais
                if (element.classList.contains('stat-item') ||
                    element.classList.contains('portfolio-item')) {
                    setTimeout(() => {
                        element.style.boxShadow = 'var(--shadow-glow)';
                    }, 300);
                }

                // Efeito de typewriter para títulos
                if (element.classList.contains('hero-title') ||
                    element.classList.contains('section-title')) {
                    typewriterEffect(element);
                }
            }
        });
    }, observerOptions);

    // Elementos para animar com classes CSS
    const animateElements = document.querySelectorAll(`
        .hero-content,
        .about-text,
        .skills-section,
        .skill-item,
        .experience-item,
        .portfolio-item,
        .stat-item,
        .contact-info,
        .contact-form,
        .certification-item
    `);

    animateElements.forEach((el, index) => {
        el.classList.add('animate-element');
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
}

// Efeito typewriter para títulos
function typewriterEffect(element) {
    const text = element.textContent;
    element.textContent = '';
    element.style.borderRight = '2px solid var(--primary-gold)';

    let i = 0;
    const typeInterval = setInterval(() => {
        element.textContent += text[i];
        i++;

        if (i >= text.length) {
            clearInterval(typeInterval);
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 1000);
        }
    }, 50);
}

// =============================================
// BARRAS DE HABILIDADES
// =============================================

function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');

                setTimeout(() => {
                    progressBar.style.width = width;
                }, 200);

                skillObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// =============================================
// CONTADOR ANIMADO (ESTATÍSTICAS)
// =============================================

function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');

    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                if (!counter.classList.contains('animated')) {
                    counter.classList.add('animated');
                    animateCounter(counter);
                }
            }
        });
    }, { threshold: 0.7 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// =============================================
// SLIDER DE CERTIFICAÇÕES
// =============================================

function initCertificationsSlider() {
    const prevBtn = document.getElementById('cert-prev');
    const nextBtn = document.getElementById('cert-next');
    const certificationItems = document.querySelectorAll('.certification-item');

    if (certificationItems.length === 0) return;

    function showCertification(index) {
        certificationItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
    }

    function nextCertification() {
        currentCertification = (currentCertification + 1) % certificationItems.length;
        showCertification(currentCertification);
    }

    function prevCertification() {
        currentCertification = (currentCertification - 1 + certificationItems.length) % certificationItems.length;
        showCertification(currentCertification);
    }

    // Event listeners
    nextBtn?.addEventListener('click', nextCertification);
    prevBtn?.addEventListener('click', prevCertification);

    // Auto-slide a cada 5 segundos
    setInterval(nextCertification, 5000);

    // Inicializar primeira certificação
    showCertification(0);
}

// =============================================
// FORMULÁRIO DE CONTATO
// =============================================

function initContactForm() {
    const form = document.getElementById('contactForm');

    if (!form) return;

    // Validação em tempo real
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearErrors);
    });

    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();

        // Remover mensagens de erro anteriores
        clearFieldError(field);

        // Validações específicas
        let isValid = true;
        let errorMessage = '';

        if (!value) {
            isValid = false;
            errorMessage = 'Este campo é obrigatório.';
        } else {
            switch (field.type) {
                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        isValid = false;
                        errorMessage = 'Por favor, insira um e-mail válido.';
                    }
                    break;

                case 'text':
                    if (field.name === 'nome' && value.length < 2) {
                        isValid = false;
                        errorMessage = 'Nome deve ter pelo menos 2 caracteres.';
                    }
                    break;

                default:
                    if (field.tagName === 'TEXTAREA' && value.length < 10) {
                        isValid = false;
                        errorMessage = 'Mensagem deve ter pelo menos 10 caracteres.';
                    }
            }
        }

        if (!isValid) {
            showFieldError(field, errorMessage);
        }

        return isValid;
    }

    function clearErrors(e) {
        clearFieldError(e.target);
    }

    function showFieldError(field, message) {
        field.style.borderBottomColor = '#FF6B6B';

        let errorDiv = field.parentNode.querySelector('.field-error');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.style.cssText = `
                color: #FF6B6B;
                font-size: 12px;
                margin-top: 8px;
                font-family: var(--font-secondary);
            `;
            field.parentNode.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
    }

    function clearFieldError(field) {
        field.style.borderBottomColor = '';
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    // Submissão do formulário
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validar todos os campos
        const fields = form.querySelectorAll('input, textarea');
        let isFormValid = true;

        fields.forEach(field => {
            const fieldValid = validateField({ target: field });
            if (!fieldValid) isFormValid = false;
        });

        if (!isFormValid) {
            showNotification('Por favor, corrija os erros no formulário.', 'error');
            return;
        }

        // Simular envio
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'ENVIANDO...';
        submitBtn.disabled = true;

        try {
            // Simular delay de envio
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Sucesso
            showNotification('Mensagem enviada com sucesso! Em breve entrarei em contato.', 'success');
            form.reset();

        } catch (error) {
            showNotification('Erro ao enviar mensagem. Tente novamente.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// =============================================
// NOTIFICAÇÕES
// =============================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#FF6B6B' : '#2196F3'};
        color: white;
        padding: 16px 24px;
        border-radius: 4px;
        z-index: 1000;
        font-family: var(--font-secondary);
        font-size: 14px;
        font-weight: 600;
        max-width: 400px;
        animation: slideInRight 0.3s ease, fadeOut 0.3s ease 4.7s forwards;
    `;

    notification.textContent = message;
    document.body.appendChild(notification);

    // Remover após 5 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// =============================================
// EFEITOS VISUAIS
// =============================================

function initVisualEffects() {
    // Parallax avançado no hero
    const hero = document.querySelector('.hero');
    const heroPattern = document.querySelector('.hero-pattern');

    if (hero && heroPattern) {
        window.addEventListener('scroll', throttle(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            const opacity = 1 - (scrolled / hero.offsetHeight);

            if (scrolled < hero.offsetHeight) {
                heroPattern.style.transform = `translateY(${rate}px) scale(${1 + scrolled * 0.0005})`;
                heroPattern.style.opacity = Math.max(0.1, opacity);
            }
        }, 16));
    }

    // Cursor personalizado
    initCustomCursor();

    // Efeito magnético nos botões
    initMagneticEffect();

    // Efeito hover premium nos portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', (e) => {
            item.style.transform = 'translateY(-15px) rotateX(5deg)';
            item.style.boxShadow = 'var(--shadow-glow-hover)';

            // Efeito de ripple
            createRipple(e, item);
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) rotateX(0deg)';
            item.style.boxShadow = 'var(--shadow-lg)';
        });
    });

    // Animação de flutuação nos elementos
    initFloatingElements();
}

// Cursor personalizado
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    document.body.appendChild(cursorFollower);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        const delay = 0.1;
        cursorX += (mouseX - cursorX) * delay;
        cursorY += (mouseY - cursorY) * delay;

        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';

        cursorFollower.style.left = cursorX + 'px';
        cursorFollower.style.top = cursorY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Efeitos especiais em elementos interativos
    const interactiveElements = document.querySelectorAll('a, button, .portfolio-item, .skill-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorFollower.classList.add('cursor-hover');
        });

        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorFollower.classList.remove('cursor-hover');
        });
    });
}

// Efeito magnético nos botões
function initMagneticEffect() {
    const buttons = document.querySelectorAll('.btn, .nav-social a, .portfolio-link');

    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const distance = Math.sqrt(x * x + y * y);
            const maxDistance = 100;

            if (distance < maxDistance) {
                const force = (maxDistance - distance) / maxDistance;
                const moveX = x * force * 0.3;
                const moveY = y * force * 0.3;

                button.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
            }
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0) scale(1)';
        });
    });
}

// Efeito ripple
function createRipple(e, element) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    element.appendChild(ripple);

    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    setTimeout(() => {
        ripple.remove();
    }, 1000);
}

// Elementos flutuantes
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.skill-item, .stat-item');

    floatingElements.forEach((el, index) => {
        const delay = index * 0.5;
        const duration = 3 + Math.random() * 2;

        el.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
    });
}

// =============================================
// NAVBAR SCROLL EFFECT
// =============================================

function initNavbarScrollEffect() {
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;

    if (!navbar) return;

    window.addEventListener('scroll', throttle(() => {
        const scrollTop = window.pageYOffset;

        // Adicionar background blur quando rolar
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        }

        lastScrollTop = scrollTop;
    }, 100));
}

// =============================================
// INICIALIZAÇÃO
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    // Verificar se o usuário prefere movimento reduzido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        // Desabilitar animações complexas
        document.documentElement.style.setProperty('--transition', 'none');
        return;
    }

    // Inicializar todas as funcionalidades
        initNavigation();
        initActiveNavigation();
        initSmoothScrolling();
        initScrollAnimations();
        initSkillBars();
        initCounterAnimation();
        initCertificationsSlider();
        initContactForm();
        initVisualEffects();
        initNavbarScrollEffect();

        // Adicionar partículas de fundo
        initParticleSystem();

        // Efeitos de loading premium
        initLoadingEffects();

    // Loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// =============================================
// CSS ANIMATIONS (Adicionado via JavaScript)
// =============================================

// Sistema de partículas
function initParticleSystem() {
    const canvas = document.createElement('canvas');
    canvas.className = 'particle-canvas';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        opacity: 0.3;
    `;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.2,
            color: `rgba(255, 215, 0, ${Math.random() * 0.3 + 0.1})`
        };
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < 50; i++) {
            particles.push(createParticle());
        }
    }

    function updateParticles() {
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        });
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
        });
    }

    function animate() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
}

// Efeitos de loading premium
function initLoadingEffects() {
    // Preloader personalizado
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="logo-loader">DG</div>
            <div class="loading-bar">
                <div class="loading-progress"></div>
            </div>
            <div class="loading-text">Carregando experiência premium...</div>
        </div>
    `;
    document.body.appendChild(preloader);

    // Simular carregamento
    let progress = 0;
    const progressBar = preloader.querySelector('.loading-progress');

    const loadingInterval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);

            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.remove();
                }, 500);
            }, 500);
        }

        progressBar.style.width = progress + '%';
    }, 200);
}

const styleSheet = document.createElement('style');
styleSheet.textContent = `
    /* Animações CSS Premium */
    @keyframes slideInRight {
        from { opacity: 0; transform: translateX(100px); }
        to { opacity: 1; transform: translateX(0); }
    }

    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }

    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-10px) rotate(1deg); }
    }

    .animate-element {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
    }

    .animate-element.animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    .custom-cursor {
        position: fixed;
        width: 10px;
        height: 10px;
        background: var(--primary-gold);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s;
    }

    .cursor-follower {
        position: fixed;
        width: 40px;
        height: 40px;
        border: 1px solid var(--primary-gold);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        opacity: 0.5;
    }

    .cursor-hover {
        transform: scale(2);
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 215, 0, 0.3);
        transform: scale(0);
        animation: rippleEffect 0.6s linear;
    }

    @keyframes rippleEffect {
        to { transform: scale(2); opacity: 0; }
    }

    .preloader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-darker);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    }

    .preloader-content {
        text-align: center;
        color: var(--text-primary);
    }

    .logo-loader {
        font-family: var(--font-primary);
        font-size: 4rem;
        font-weight: 700;
        background: var(--gradient-primary);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 2rem;
        animation: pulse 2s ease-in-out infinite;
    }

    .loading-bar {
        width: 300px;
        height: 4px;
        background: var(--bg-card);
        border-radius: 2px;
        overflow: hidden;
        margin: 2rem auto;
    }

    .loading-progress {
        height: 100%;
        background: var(--gradient-primary);
        border-radius: 2px;
        transition: width 0.3s ease;
        box-shadow: 0 0 10px var(--primary-gold);
    }

    .loading-text {
        font-family: var(--font-mono);
        font-size: 14px;
        color: var(--text-secondary);
        text-transform: uppercase;
        letter-spacing: 2px;
    }

    @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.7; transform: scale(1.05); }
    }

    .field-error {
        animation: fadeIn 0.3s ease;
    }
`;

document.head.appendChild(styleSheet);

// =============================================
// PERFORMANCE OPTIMIZATION
// =============================================

// Preload critical resources
function preloadResources() {
    const preloadLinks = [
        'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Source+Sans+Pro:wght@300;400;500;600;700&display=swap'
    ];

    preloadLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });
}

// Lazy load images (when added)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Inicializar otimizações de performance
window.addEventListener('load', () => {
    preloadResources();
    initLazyLoading();
});

// =============================================
// ERROR HANDLING
// =============================================

window.addEventListener('error', (e) => {
    console.error('Erro JavaScript:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Promise rejeitada:', e.reason);
});
