// ========== Animation Module ==========

const AnimationModule = (() => {
    const init = () => {
        setupIntersectionObserver();
        addKeyframes();
    };

    const setupIntersectionObserver = () => {
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

        // Observe skill items
        document.querySelectorAll('.skill-item').forEach(item => {
            observer.observe(item);
            const skillValue = item.getAttribute('data-skill');
            item.style.setProperty('--skill-width', skillValue + '%');
        });

        // Observe cards
        document.querySelectorAll('.glass-card, .floating-card').forEach(card => {
            observer.observe(card);
        });

        // Observe sections
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    };

    const addKeyframes = () => {
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
    };

    return { init };
})();

export default AnimationModule;
