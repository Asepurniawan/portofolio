// ========== Contact Form Module ==========

const ContactFormModule = (() => {
    let contactForm = null;
    let submitButton = null;

    const init = () => {
        contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            submitButton = contactForm.querySelector('button[type="submit"]');
            contactForm.addEventListener('submit', handleSubmit);
            
            // Add real-time validation
            const inputs = contactForm.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => validateField(input));
                input.addEventListener('input', () => clearFieldError(input));
            });
            
            console.log('Contact form initialized');
        }
    };

    const validateField = (field) => {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        if (!value) {
            isValid = false;
            errorMessage = 'Field ini wajib diisi';
        } else if (field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Format email tidak valid';
            }
        } else if (field.id === 'name' && value.length < 3) {
            isValid = false;
            errorMessage = 'Nama minimal 3 karakter';
        } else if (field.id === 'message' && value.length < 10) {
            isValid = false;
            errorMessage = 'Pesan minimal 10 karakter';
        }

        if (!isValid) {
            showFieldError(field, errorMessage);
        } else {
            clearFieldError(field);
        }

        return isValid;
    };

    const showFieldError = (field, message) => {
        const formGroup = field.closest('.form-group');
        let errorElement = formGroup.querySelector('.field-error');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        field.classList.add('error');
    };

    const clearFieldError = (field) => {
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.field-error');
        
        if (errorElement) {
            errorElement.remove();
        }
        field.classList.remove('error');
    };

    const validateForm = () => {
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');

        const fields = [name, email, subject, message];
        let isValid = true;

        fields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    };

    const setLoading = (loading) => {
        if (submitButton) {
            if (loading) {
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
            } else {
                submitButton.disabled = false;
                submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Kirim Pesan';
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate all fields
        if (!validateForm()) {
            showNotification('❌ Mohon perbaiki kesalahan pada form', 'error');
            return;
        }

        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim(),
            timestamp: new Date().toISOString()
        };

        // Get current user if logged in
        if (typeof AuthModule !== 'undefined' && AuthModule.isLoggedIn()) {
            const user = AuthModule.getCurrentUser();
            formData.sentBy = user.email;
        }

        try {
            setLoading(true);

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Save to localStorage for demonstration
            saveContactMessage(formData);

            // Show success notification
            showNotification(`✅ Terima kasih ${formData.name}! Pesan Anda berhasil dikirim.`, 'success');

            // Add to notification UI if available
            if (typeof NotificationUIModule !== 'undefined') {
                NotificationUIModule.addNotification(
                    '✉️ Pesan Terkirim',
                    `Pesan dari ${formData.name} telah dikirim. Kami akan segera merespons.`,
                    'success',
                    'fa-paper-plane'
                );
            }

            // Reset form
            contactForm.reset();
            
            // Optional: Scroll to top of form or show thank you message
            showThankYouMessage(formData.name);

        } catch (error) {
            console.error('Error sending message:', error);
            showNotification('❌ Terjadi kesalahan. Silakan coba lagi.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const saveContactMessage = (data) => {
        try {
            const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
            messages.push(data);
            localStorage.setItem('contactMessages', JSON.stringify(messages));
            console.log('Message saved:', data);
        } catch (error) {
            console.error('Error saving message:', error);
        }
    };

    const showNotification = (message, type) => {
        if (typeof NotificationModule !== 'undefined') {
            NotificationModule.show(message, type);
        } else {
            alert(message);
        }
    };

    const showThankYouMessage = (name) => {
        const formCard = contactForm.closest('.glass-card');
        const thankYouDiv = document.createElement('div');
        thankYouDiv.className = 'thank-you-message';
        thankYouDiv.innerHTML = `
            <div class="thank-you-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>Pesan Terkirim!</h3>
            <p>Terima kasih ${name}! Saya akan segera merespons pesan Anda.</p>
        `;
        
        formCard.style.position = 'relative';
        thankYouDiv.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: var(--glass-bg);
            backdrop-filter: blur(10px);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 2rem;
            border-radius: 20px;
            animation: fadeIn 0.3s ease;
        `;
        
        formCard.appendChild(thankYouDiv);
        
        setTimeout(() => {
            thankYouDiv.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => thankYouDiv.remove(), 300);
        }, 3000);
    };

    // Public API
    return {
        init,
        validateForm
    };
})();
