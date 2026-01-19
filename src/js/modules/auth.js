// ========== Authentication Module ==========

const AuthModule = (() => {
    const SESSION_KEY = 'userSession';
    const DEMO_ACCOUNTS = [
        { email: 'asepkurniawan5288@gmail.com', password: 'admin123' },
        { email: 'user@example.com', password: 'user123' },
        { email: 'test@email.com', password: 'test123' }
    ];

    let currentUser = null;

    const init = () => {
        // Check if user is already logged in
        const savedSession = localStorage.getItem(SESSION_KEY);
        if (savedSession) {
            currentUser = JSON.parse(savedSession);
        }
        
        attachEventListeners();
        updateAuthUI();
    };

    const attachEventListeners = () => {
        const loginBtn = document.getElementById('loginBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const loginModal = document.getElementById('loginModal');
        const loginOverlay = document.getElementById('loginOverlay');
        const loginForm = document.getElementById('loginForm');
        const closeLoginBtn = document.getElementById('closeLoginBtn');

        if (loginBtn) {
            loginBtn.addEventListener('click', openLoginModal);
        }
        
        if (logoutBtn) {
            logoutBtn.addEventListener('click', logout);
        }

        if (closeLoginBtn) {
            closeLoginBtn.addEventListener('click', closeLoginModal);
        }

        if (loginOverlay) {
            loginOverlay.addEventListener('click', closeLoginModal);
        }

        if (loginForm) {
            loginForm.addEventListener('submit', handleLogin);
        }

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && loginModal && loginModal.classList.contains('active')) {
                closeLoginModal();
            }
        });
    };

    const openLoginModal = () => {
        const loginModal = document.getElementById('loginModal');
        if (loginModal) {
            loginModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    const closeLoginModal = () => {
        const loginModal = document.getElementById('loginModal');
        if (loginModal) {
            loginModal.classList.remove('active');
            document.body.style.overflow = '';
            // Clear form
            const loginForm = document.getElementById('loginForm');
            if (loginForm) loginForm.reset();
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();

        const emailInput = document.getElementById('loginEmail');
        const passwordInput = document.getElementById('loginPassword');
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (!email || !password) {
            if (typeof NotificationUIModule !== 'undefined') {
                NotificationUIModule.addNotification(
                    'Validasi Gagal',
                    'Email dan password tidak boleh kosong',
                    'error',
                    'fa-times-circle'
                );
            }
            return;
        }

        // Check credentials
        const user = DEMO_ACCOUNTS.find(acc => acc.email === email && acc.password === password);

        if (user) {
            // Login successful
            currentUser = {
                email: user.email,
                loginTime: new Date().toISOString()
            };

            // Save session
            localStorage.setItem(SESSION_KEY, JSON.stringify(currentUser));

            // Show success notification
            if (typeof NotificationUIModule !== 'undefined') {
                NotificationUIModule.addNotification(
                    '✅ Login Berhasil!',
                    `Selamat datang, ${email}!`,
                    'success',
                    'fa-sign-in-alt'
                );
            }

            // Close modal and update UI
            closeLoginModal();
            updateAuthUI();
        } else {
            // Login failed
            if (typeof NotificationUIModule !== 'undefined') {
                NotificationUIModule.addNotification(
                    '❌ Login Gagal',
                    'Email atau password salah. Silakan coba lagi.',
                    'error',
                    'fa-exclamation-circle'
                );
            }
        }
    };

    const logout = () => {
        currentUser = null;
        localStorage.removeItem(SESSION_KEY);

        if (typeof NotificationUIModule !== 'undefined') {
            NotificationUIModule.addNotification(
                '👋 Logout Berhasil',
                'Anda telah keluar dari akun',
                'info',
                'fa-sign-out-alt'
            );
        }

        updateAuthUI();
    };

    const updateAuthUI = () => {
        const loginBtn = document.getElementById('loginBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const userInfo = document.getElementById('userInfo');
        const userEmail = document.getElementById('userEmail');

        if (currentUser) {
            if (loginBtn) loginBtn.style.display = 'none';
            if (logoutBtn) logoutBtn.style.display = 'flex';
            if (userInfo) userInfo.style.display = 'flex';
            if (userEmail) userEmail.textContent = currentUser.email;
        } else {
            if (loginBtn) loginBtn.style.display = 'flex';
            if (logoutBtn) logoutBtn.style.display = 'none';
            if (userInfo) userInfo.style.display = 'none';
        }
    };

    const isLoggedIn = () => {
        return currentUser !== null;
    };

    const getCurrentUser = () => {
        return currentUser;
    };

    const checkAuthForContact = () => {
        if (!isLoggedIn()) {
            if (typeof NotificationUIModule !== 'undefined') {
                NotificationUIModule.addNotification(
                    '🔒 Login Diperlukan',
                    'Silakan login terlebih dahulu untuk mengirim pesan',
                    'warning',
                    'fa-lock'
                );
            }
            openLoginModal();
            return false;
        }
        return true;
    };

    return {
        init,
        isLoggedIn,
        getCurrentUser,
        logout,
        openLoginModal,
        checkAuthForContact
    };
})();

export default AuthModule;
