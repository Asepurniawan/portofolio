// ========== PORTFOLIO MAIN SCRIPT ==========
// Modular structure for easy development and maintenance
// Each feature is organized into separate modules for better maintainability

// ========== Theme Module ==========
const ThemeModule = {
    init: function() {
        const themeToggle = document.getElementById('themeToggle');
        const html = document.documentElement;
        const themeBadge = document.getElementById('themeBadge');
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

        let currentTheme = localStorage.getItem('theme');
        if (!currentTheme) {
            currentTheme = prefersDarkScheme.matches ? 'dark' : 'light';
        }
        html.setAttribute('data-theme', currentTheme);
        this.updateThemeIcon(currentTheme);
        this.addTooltip(currentTheme);

        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        prefersDarkScheme.addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                const newTheme = e.matches ? 'dark' : 'light';
                html.setAttribute('data-theme', newTheme);
                this.updateThemeIcon(newTheme);
                NotificationModule.show(`🎨 Theme auto-switched to ${newTheme} mode`, 'info');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'D') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    },

    updateThemeIcon: function(theme) {
        const themeToggle = document.getElementById('themeToggle');
        const themeBadge = document.getElementById('themeBadge');
        if (themeToggle) {
            themeToggle.innerHTML = theme === 'light' 
                ? '<i class="fas fa-moon"></i>' 
                : '<i class="fas fa-sun"></i>';
        }
        if (themeBadge) {
            themeBadge.innerHTML = theme === 'light'
                ? '<i class="fas fa-sun"></i><span>Light Mode</span>'
                : '<i class="fas fa-moon"></i><span>Dark Mode</span>';
        }
    },

    toggleTheme: function() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.updateThemeIcon(newTheme);
        NotificationModule.show(
            `${newTheme === 'light' ? '☀️' : '🌙'} Switched to ${newTheme} mode`,
            'success'
        );
    },

    addTooltip: function(currentTheme) {
        const tooltip = document.createElement('div');
        tooltip.className = 'theme-tooltip';
        tooltip.textContent = currentTheme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode';
        tooltip.style.cssText = `
            position: fixed;
            top: 85px;
            right: 30px;
            background: var(--bg-secondary);
            color: var(--text-primary);
            padding: 0.5rem 1rem;
            border-radius: 8px;
            font-size: 0.875rem;
            box-shadow: var(--shadow-md);
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
            z-index: 999;
        `;
        document.body.appendChild(tooltip);

        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('mouseenter', () => {
                tooltip.style.opacity = '1';
            });
            themeToggle.addEventListener('mouseleave', () => {
                tooltip.style.opacity = '0';
            });
        }
    }
};

// ========== Navigation Module ==========
const NavigationModule = {
    init: function() {
        const sidebar = document.getElementById('sidebar');
        const menuToggle = document.getElementById('menuToggle');
        const sidebarLinks = document.querySelectorAll('.sidebar-link');

        if (menuToggle) {
            menuToggle.addEventListener('click', () => this.toggleSidebar());
        }

        sidebarLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                this.navigateToSection(section);
                this.setActiveLink(link);
                this.closeSidebarOnMobile();
            });
        });

        document.addEventListener('click', (e) => {
            if (window.innerWidth < 1024 && 
                sidebar && 
                !sidebar.contains(e.target) && 
                menuToggle &&
                !menuToggle.contains(e.target)) {
                this.closeSidebar();
            }
        });
    },

    toggleSidebar: function() {
        const sidebar = document.getElementById('sidebar');
        if (sidebar.classList.contains('active')) {
            this.closeSidebar();
        } else {
            this.openSidebar();
        }
    },

    openSidebar: function() {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) sidebar.classList.add('active');
    },

    closeSidebar: function() {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) sidebar.classList.remove('active');
    },

    closeSidebarOnMobile: function() {
        if (window.innerWidth < 1024) {
            this.closeSidebar();
        }
    },

    navigateToSection: function(sectionId) {
        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) {
            document.querySelectorAll('section').forEach(section => {
                section.classList.remove('section-active');
            });
            sectionElement.classList.add('section-active');
            sectionElement.scrollIntoView({ behavior: 'smooth' });
        }
    },

    setActiveLink: function(activeLink) {
        const sidebarLinks = document.querySelectorAll('.sidebar-link');
        sidebarLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }
};

// ========== Notification Module ==========
const NotificationModule = {
    init: function() {
        const container = document.createElement('div');
        container.className = 'notification-container';
        container.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
            pointer-events: none;
        `;
        document.body.appendChild(container);
    },

    show: function(message, type = 'info', duration = 3000) {
        const container = document.querySelector('.notification-container');
        if (!container) this.init();

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            background: ${this.getBackgroundColor(type)};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            margin-bottom: 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            animation: slideIn 0.3s ease forwards;
            pointer-events: auto;
            cursor: pointer;
        `;
        notification.textContent = message;
        document.querySelector('.notification-container').appendChild(notification);

        if (duration > 0) {
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease forwards';
                setTimeout(() => notification.remove(), 300);
            }, duration);
        }

        notification.addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        });
    },

    getBackgroundColor: function(type) {
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        };
        return colors[type] || colors.info;
    }
};

// ========== Contact Form Module ==========
const ContactFormModule = {
    init: function() {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    },

    handleSubmit: function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        if (!name || !email || !subject || !message) {
            NotificationModule.show('❌ Mohon isi semua kolom', 'error');
            return;
        }

        console.log('Form Data:', { name, email, subject, message });
        NotificationModule.show('✅ Pesan Anda berhasil dikirim! Terima kasih telah menghubungi saya.', 'success');
        document.getElementById('contactForm').reset();
    }
};

// ========== Animation Module ==========
const AnimationModule = {
    init: function() {
        this.setupIntersectionObserver();
        this.addKeyframes();
        this.setupParallax();
        this.setupScrollToTop();
    },

    setupIntersectionObserver: function() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.skill-item').forEach(item => {
            observer.observe(item);
            const skillValue = item.getAttribute('data-skill');
            item.style.setProperty('--skill-width', skillValue + '%');
        });

        document.querySelectorAll('.glass-card, .floating-card').forEach(card => {
            observer.observe(card);
        });

        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    },

    addKeyframes: function() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }

            @keyframes fadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    },

    setupParallax: function() {
        window.addEventListener('scroll', () => {
            const heroSection = document.querySelector('.hero');
            if (heroSection) {
                const scrolled = window.pageYOffset;
                const parallaxSpeed = 0.5;
                heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    },

    setupScrollToTop: function() {
        const scrollTopBtn = document.createElement('button');
        scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollTopBtn.className = 'scroll-top-btn';
        scrollTopBtn.setAttribute('aria-label', 'Scroll to top');

        scrollTopBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--accent-gradient);
            color: white;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
            box-shadow: var(--shadow-lg);
            opacity: 0;
            visibility: hidden;
            transition: all var(--transition-base);
            z-index: 999;
        `;

        document.body.appendChild(scrollTopBtn);

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                scrollTopBtn.style.opacity = '1';
                scrollTopBtn.style.visibility = 'visible';
            } else {
                scrollTopBtn.style.opacity = '0';
                scrollTopBtn.style.visibility = 'hidden';
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        scrollTopBtn.addEventListener('mouseenter', () => {
            scrollTopBtn.style.transform = 'scale(1.1) translateY(-3px)';
        });

        scrollTopBtn.addEventListener('mouseleave', () => {
            scrollTopBtn.style.transform = 'scale(1) translateY(0)';
        });
    }
};

// ========== Utils Module ==========
const UtilsModule = {
    showLoadingScreen: function() {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                const firstSection = document.querySelector('section');
                if (firstSection) firstSection.classList.add('section-active');
            }, 1000);
        }
    },

    updateYear: function() {
        const yearElement = document.getElementById('currentYear');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    },

    logConsoleMessage: function() {
        console.log('%c👋 Hello Developer!', 'color: #667eea; font-size: 20px; font-weight: bold;');
        console.log('%cLooking for something? Feel free to reach out!', 'color: #764ba2; font-size: 14px;');
        console.log('%c📧 asepkurniawan5288@gmail.com', 'color: #48bb78; font-size: 12px;');
    }
};

// ========== Social Links Module ==========
const SocialLinksModule = {
    init: function() {
        // First, remove placeholder links and hide empty containers/cards
        this.prunePlaceholders();

        // Then, attach click handlers to remaining links for safety
        const links = document.querySelectorAll('.social-icons a, .footer-social a');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const url = link.getAttribute('href') || '';
                const platform = link.getAttribute('aria-label') || 'Sosial Media';
                if (this.isPlaceholder(url)) {
                    e.preventDefault();
                    NotificationModule.show(`⚠️ Akun ${platform} belum tersedia.`, 'warning');
                }
            });
        });
    },

    isPlaceholder: function(url) {
        if (!url || url === '#') return true;
        const patterns = [/yourusername/i, /@yourchannel/i, /@yourusername/i];
        return patterns.some(re => re.test(url));
    },

    prunePlaceholders: function() {
        // Handle containers with social icons
        const containers = [
            ...document.querySelectorAll('.social-icons'),
            ...document.querySelectorAll('.footer-social')
        ];

        containers.forEach(container => {
            const anchors = Array.from(container.querySelectorAll('a'));
            anchors.forEach(a => {
                const href = a.getAttribute('href') || '';
                if (this.isPlaceholder(href)) {
                    a.remove();
                }
            });

            const remaining = container.querySelectorAll('a').length;

            if (remaining === 0) {
                // Hide specific wrappers to avoid empty space
                const contactCard = container.closest('.contact-card');
                const sidebarFooter = container.closest('.sidebar-footer');
                const isFooterSocial = container.classList.contains('footer-social');

                if (contactCard) {
                    // Hide the entire contact card if no social links
                    contactCard.style.display = 'none';
                } else if (sidebarFooter) {
                    // Hide sidebar footer if no social links
                    sidebarFooter.style.display = 'none';
                } else if (isFooterSocial) {
                    // Hide footer social wrapper
                    container.style.display = 'none';
                } else {
                    // Fallback: remove empty container
                    container.remove();
                }
            }
        });
    }
};

// ========== Content Guard Module ==========
const ContentGuardModule = {
    init: function() {
        this.hideEmptyContainers();
        this.hideEmptySections();
        this.syncNavLinks();
        this.ensureActiveSection();
    },

    hideEmptyContainers: function() {
        const rules = [
            { container: '.achievement-grid', item: '.achievement-card', wrapper: '.achievement-section' },
            { container: '.experience-timeline-work', item: '.work-experience-item', wrapper: '.experience-section' },
            { container: '.education-timeline', item: '.education-item', wrapper: '#education' },
            { container: '.hero-stats', item: '.stat-item', wrapper: '.hero-stats' },
            { container: '.footer-social', item: 'a', wrapper: '.footer-social' },
        ];

        rules.forEach(rule => {
            document.querySelectorAll(rule.container).forEach(cont => {
                const count = cont.querySelectorAll(rule.item).length;
                if (count === 0) {
                    const wrap = rule.wrapper === rule.container
                        ? cont
                        : cont.closest(rule.wrapper) || cont;
                    wrap.style.display = 'none';
                }
            });
        });
    },

    hideEmptySections: function() {
        const meaningfulSelectors = [
            '.glass-card', '.timeline-item', '.education-item', '.achievement-card',
            '.work-experience-item', '.contact-card', '.learning-message',
            '.hero-content', '.hero-stats'
        ];

        document.querySelectorAll('section').forEach(sec => {
            const hasContent = meaningfulSelectors.some(sel => sec.querySelector(sel));
            if (!hasContent) {
                sec.style.display = 'none';
            }
        });
    },

    syncNavLinks: function() {
        const links = document.querySelectorAll('.sidebar-link[data-section]');
        links.forEach(link => {
            const id = link.getAttribute('data-section');
            const sec = document.getElementById(id);
            if (!sec || getComputedStyle(sec).display === 'none') {
                link.remove();
            }
        });
    },

    ensureActiveSection: function() {
        const active = document.querySelector('section.section-active');
        const visibleSections = Array.from(document.querySelectorAll('section'))
            .filter(s => getComputedStyle(s).display !== 'none');
        if (!active || getComputedStyle(active).display === 'none') {
            if (visibleSections.length > 0) {
                visibleSections.forEach(s => s.classList.remove('section-active'));
                visibleSections[0].classList.add('section-active');
            }
        }
    }
};

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Portfolio Application...');
    
    // Initialize all modules
    UtilsModule.showLoadingScreen();
    UtilsModule.updateYear();
    UtilsModule.logConsoleMessage();
    
    ThemeModule.init();
    NavigationModule.init();
    NotificationModule.init();
    ContactFormModule.init();
    AnimationModule.init();
    SocialLinksModule.init();
    ContentGuardModule.init();

    console.log('✅ All modules initialized successfully');
});
