// ========== Theme Toggle Module ==========

const ThemeModule = (() => {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const themeBadge = document.getElementById('themeBadge');

    // Detect system preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Initialize theme
    const init = () => {
        let currentTheme = localStorage.getItem('theme');
        if (!currentTheme) {
            currentTheme = prefersDarkScheme.matches ? 'dark' : 'light';
        }
        html.setAttribute('data-theme', currentTheme);
        updateThemeIcon(currentTheme);
        addTooltip(currentTheme);
        attachEventListeners();
    };

    // Update theme icon
    const updateThemeIcon = (theme) => {
        if (themeToggle) {
            themeToggle.innerHTML = theme === 'light' 
                ? '<i class="fas fa-moon"></i>' 
                : '<i class="fas fa-sun"></i>';
            themeToggle.setAttribute('aria-label', 
                theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode');
        }
        updateThemeBadge(theme);
    };

    // Update theme badge
    const updateThemeBadge = (theme) => {
        if (themeBadge) {
            themeBadge.innerHTML = theme === 'light'
                ? '<i class="fas fa-sun"></i><span>Light Mode</span>'
                : '<i class="fas fa-moon"></i><span>Dark Mode</span>';
        }
    };

    // Add tooltip
    const addTooltip = (currentTheme) => {
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

        if (themeToggle) {
            themeToggle.addEventListener('mouseenter', () => {
                tooltip.style.opacity = '1';
            });
            themeToggle.addEventListener('mouseleave', () => {
                tooltip.style.opacity = '0';
            });
        }
    };

    // Attach event listeners
    const attachEventListeners = () => {
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }

        // Listen for system theme changes
        prefersDarkScheme.addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                const newTheme = e.matches ? 'dark' : 'light';
                html.setAttribute('data-theme', newTheme);
                updateThemeIcon(newTheme);
                NotificationModule.show(`🎨 Theme auto-switched to ${newTheme} mode`, 'info');
            }
        });

        // Keyboard shortcut: Ctrl+Shift+D
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'D') {
                e.preventDefault();
                toggleTheme();
            }
        });
    };

    // Toggle theme
    const toggleTheme = () => {
        const currentTheme = html.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);

        NotificationModule.show(
            `${newTheme === 'light' ? '☀️' : '🌙'} Switched to ${newTheme} mode`,
            'success'
        );
    };

    return {
        init,
        toggleTheme,
        getCurrentTheme: () => html.getAttribute('data-theme') || 'light'
    };
})();
