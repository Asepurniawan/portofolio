// ========== Navigation Module ==========

const NavigationModule = (() => {
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menuToggle');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');

    const init = () => {
        attachEventListeners();
    };

    const attachEventListeners = () => {
        // Mobile menu toggle
        if (menuToggle) {
            menuToggle.addEventListener('click', toggleSidebar);
        }

        // Sidebar navigation
        sidebarLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                navigateToSection(section);
                setActiveLink(link);
                closeSidebarOnMobile();
            });
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth < 1024 && 
                sidebar && 
                !sidebar.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                closeSidebar();
            }
        });
    };

    const toggleSidebar = () => {
        if (sidebar.classList.contains('active')) {
            closeSidebar();
        } else {
            openSidebar();
        }
    };

    const openSidebar = () => {
        if (sidebar) sidebar.classList.add('active');
    };

    const closeSidebar = () => {
        if (sidebar) sidebar.classList.remove('active');
    };

    const closeSidebarOnMobile = () => {
        if (window.innerWidth < 1024) {
            closeSidebar();
        }
    };

    const navigateToSection = (sectionId) => {
        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) {
            // Remove active class from all sections
            document.querySelectorAll('section').forEach(section => {
                section.classList.remove('section-active');
            });
            // Add active class to current section
            sectionElement.classList.add('section-active');
            // Smooth scroll
            sectionElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const setActiveLink = (activeLink) => {
        sidebarLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    };

    return {
        init,
        navigateToSection,
        closeSidebar
    };
})();

export default NavigationModule;
