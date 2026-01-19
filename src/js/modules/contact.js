// ========== Contact Form Module ==========

const ContactFormModule = (() => {
    const contactForm = document.getElementById('contactForm');

    const init = () => {
        if (contactForm) {
            contactForm.addEventListener('submit', handleSubmit);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if user is logged in
        if (typeof AuthModule !== 'undefined' && !AuthModule.checkAuthForContact()) {
            return;
        }

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Validate form
        if (!name || !email || !subject || !message) {
            NotificationModule.show('❌ Mohon isi semua kolom', 'error');
            if (typeof NotificationUIModule !== 'undefined') {
                NotificationUIModule.addNotification(
                    'Validasi Gagal',
                    'Mohon isi semua kolom yang diperlukan',
                    'error',
                    'fa-times-circle'
                );
            }
            return;
        }

        // Get current user info if logged in
        let userInfo = 'Guest';
        if (typeof AuthModule !== 'undefined' && AuthModule.isLoggedIn()) {
            const user = AuthModule.getCurrentUser();
            userInfo = user.email;
        }

        // Simulate form submission
        console.log('Form Data:', { name, email, subject, message, sentBy: userInfo });
        
        // Show success message
        NotificationModule.show('✅ Pesan Anda berhasil dikirim! Terima kasih telah menghubungi saya.', 'success');
        
        // Add notification to UI module
        if (typeof NotificationUIModule !== 'undefined') {
            NotificationUIModule.addNotification(
                '✉️ Pesan Terkirim',
                `Terima kasih ${name}! Pesan Anda telah kami terima dan akan segera dibalas.`,
                'success',
                'fa-paper-plane'
            );
        }
        
        // Reset form
        contactForm.reset();
    };

    return { init };
})();

// Make it available globally
window.ContactFormModule = ContactFormModule;
