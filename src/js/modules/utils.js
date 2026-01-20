// ========== Utils Module ==========

const UtilsModule = (() => {
    const showLoadingScreen = () => {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                document.querySelector('section').classList.add('section-active');
            }, 1000);
        }
    };

    const updateYear = () => {
        const yearElement = document.getElementById('currentYear');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const isScrolledToBottom = () => {
        return window.innerHeight + window.scrollY >= document.body.offsetHeight - 500;
    };

    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func(...args), delay);
        };
    };

    const logConsoleMessage = () => {
        console.log('%c🚀 Portfolio Website', 'color: #667eea; font-size: 20px; font-weight: bold;');
        console.log('%cDeveloped by Asep Kurniawan', 'color: #4a5568; font-size: 14px;');
    };

    return {
        showLoadingScreen,
        updateYear,
        scrollToTop,
        isScrolledToBottom,
        debounce,
        logConsoleMessage
    };
})();
