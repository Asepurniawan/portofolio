// ========== PORTFOLIO MAIN SCRIPT ==========
// Orchestrator for all modules - clean version
// Each module is loaded separately from src/js/modules/

// ========== Social Links Module ==========
const SocialLinksModule = {
    init: function() {
        this.prunePlaceholders();
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
                const contactCard = container.closest('.contact-card');
                const sidebarFooter = container.closest('.sidebar-footer');
                const isFooterSocial = container.classList.contains('footer-social');

                if (contactCard) {
                    contactCard.style.display = 'none';
                } else if (sidebarFooter) {
                    sidebarFooter.style.display = 'none';
                } else if (isFooterSocial) {
                    container.style.display = 'none';
                } else {
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
    
    // Initialize all modules in order
    UtilsModule.showLoadingScreen();
    UtilsModule.updateYear();
    UtilsModule.logConsoleMessage();
    
    ThemeModule.init();
    AuthModule.init();
    NavigationModule.init();
    NotificationModule.init();
    NotificationUIModule.init();
    ContactFormModule.init();
    AnimationModule.init();
    SocialLinksModule.init();
    ContentGuardModule.init();

    console.log('✅ All modules initialized successfully');
});
