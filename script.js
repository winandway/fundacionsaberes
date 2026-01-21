/**
 * SABERES FOUNDATION - JavaScript Principal
 */

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar todos los módulos
    initNavigation();
    initScrollEffects();
    initModal();
    initForms();
    initPasswordToggle();
    initNeuralNetwork();
    initSmoothScroll();
});

/**
 * Navegación móvil
 */
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Cerrar menú al hacer clic en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

/**
 * Efectos de scroll
 */
function initScrollEffects() {
    const header = document.getElementById('header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Header con fondo al hacer scroll
        if (header) {
            if (currentScrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        lastScrollY = currentScrollY;
    });

    // Animaciones de entrada para elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos para animaciones
    document.querySelectorAll('.benefit-card, .program-item, .about__card, .partner-logo').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

/**
 * Modal de inicio de sesión
 */
function initModal() {
    const modal = document.getElementById('login-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.getElementById('modal-close');
    const btnLogin = document.getElementById('btn-login');
    const showLogin = document.getElementById('show-login');
    const modalToRegister = document.getElementById('modal-to-register');
    const heroRegister = document.getElementById('hero-register');
    const btnRegister = document.getElementById('btn-register');
    const ctaRegister = document.getElementById('cta-register');

    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Botones para abrir modal de login
    [btnLogin, showLogin].forEach(btn => {
        if (btn) btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    });

    // Botones para ir a registro
    [heroRegister, btnRegister, ctaRegister].forEach(btn => {
        if (btn) btn.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal();
            document.getElementById('register').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Cerrar modal
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

    // Ir a registro desde modal
    if (modalToRegister) {
        modalToRegister.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal();
            document.getElementById('register').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/**
 * Manejo de formularios
 */
function initForms() {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');

    // Formulario de registro
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(registerForm);
            const password = formData.get('password');
            const confirmPassword = formData.get('confirm-password');

            // Validar contraseñas
            if (password !== confirmPassword) {
                showNotification('Las contraseñas no coinciden', 'error');
                return;
            }

            if (password.length < 8) {
                showNotification('La contraseña debe tener al menos 8 caracteres', 'error');
                return;
            }

            // Simular envío
            const submitBtn = registerForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Procesando...';
            submitBtn.disabled = true;

            setTimeout(() => {
                showNotification('¡Cuenta creada exitosamente! Bienvenido a SABERES FOUNDATION', 'success');
                registerForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // Formulario de login
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = loginForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Iniciando sesión...';
            submitBtn.disabled = true;

            setTimeout(() => {
                showNotification('¡Bienvenido de nuevo!', 'success');
                loginForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;

                // Cerrar modal
                const modal = document.getElementById('login-modal');
                if (modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }, 1500);
        });
    }
}

/**
 * Toggle de contraseña visible
 */
function initPasswordToggle() {
    const toggleButtons = document.querySelectorAll('.password-toggle');

    toggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.previousElementSibling;
            const type = input.getAttribute('type');

            input.setAttribute('type', type === 'password' ? 'text' : 'password');
            btn.classList.toggle('active');
        });
    });
}

/**
 * Red neuronal animada en el hero
 */
function initNeuralNetwork() {
    const container = document.getElementById('neural-network');
    if (!container) return;

    const canvas = document.createElement('canvas');
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let width, height;
    let particles = [];
    let animationId;

    function resize() {
        width = container.offsetWidth;
        height = container.offsetHeight;
        canvas.width = width;
        canvas.height = height;
    }

    function createParticles() {
        particles = [];
        const numParticles = Math.floor((width * height) / 15000);

        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1
            });
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, width, height);

        // Dibujar conexiones
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 * (1 - distance / 150)})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            });
        });

        // Dibujar partículas
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(139, 92, 246, 0.6)';
            ctx.fill();
        });
    }

    function updateParticles() {
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;
        });
    }

    function animate() {
        updateParticles();
        drawParticles();
        animationId = requestAnimationFrame(animate);
    }

    // Inicializar
    resize();
    createParticles();
    animate();

    // Responsive
    window.addEventListener('resize', () => {
        resize();
        createParticles();
    });

    // Pausar animación cuando no es visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });
}

/**
 * Scroll suave para enlaces internos
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Sistema de notificaciones
 */
function showNotification(message, type = 'info') {
    // Remover notificación existente
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    // Crear notificación
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <span class="notification__icon">
                ${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}
            </span>
            <span class="notification__message">${message}</span>
        </div>
        <button class="notification__close" aria-label="Cerrar">×</button>
    `;

    // Estilos inline para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 500;
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        transform: translateX(120%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;

    notification.querySelector('.notification__content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
    `;

    notification.querySelector('.notification__icon').style.cssText = `
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        font-weight: bold;
    `;

    notification.querySelector('.notification__close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0 0 0 10px;
        opacity: 0.8;
    `;

    document.body.appendChild(notification);

    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Cerrar con botón
    notification.querySelector('.notification__close').addEventListener('click', () => {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto cerrar
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(120%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

/**
 * Contador animado para estadísticas
 */
function animateCounters() {
    const counters = document.querySelectorAll('.hero__stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const suffix = counter.textContent.replace(/[0-9]/g, '');
        let current = 0;
        const increment = target / 50;
        const duration = 1500;
        const stepTime = duration / 50;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current) + suffix;
                setTimeout(updateCounter, stepTime);
            } else {
                counter.textContent = target + suffix;
            }
        };

        updateCounter();
    });
}

// Activar contadores cuando sean visibles
const heroSection = document.getElementById('hero');
if (heroSection) {
    const counterObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateCounters();
            counterObserver.disconnect();
        }
    }, { threshold: 0.5 });

    counterObserver.observe(heroSection);
}
