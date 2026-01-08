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

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Validate form
        if (!name || !email || !subject || !message) {
            NotificationModule.show('❌ Mohon isi semua kolom', 'error');
            return;
        }

        // Simulate form submission
        console.log('Form Data:', { name, email, subject, message });
        
        // Show success message
        NotificationModule.show('✅ Pesan Anda berhasil dikirim! Terima kasih telah menghubungi saya.', 'success');
        
        // Reset form
        contactForm.reset();
    };

    return { init };
})();

export default ContactFormModule;
