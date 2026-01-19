// ========== Notification UI Module ==========

const NotificationUIModule = (() => {
    // Sample notifications data
    let notifications = [
        {
            id: 1,
            title: 'Selamat datang!',
            message: 'Terima kasih telah mengunjungi portofolio saya',
            type: 'success',
            time: '5 menit yang lalu',
            icon: 'fa-check-circle'
        },
        {
            id: 2,
            title: 'Fitur baru',
            message: 'Sistem notifikasi telah diperbarui dengan fitur terbaru',
            type: 'info',
            time: '1 jam yang lalu',
            icon: 'fa-info-circle'
        },
        {
            id: 3,
            title: 'Peringatan',
            message: 'Pastikan browser Anda selalu diperbarui untuk performa terbaik',
            type: 'warning',
            time: '3 jam yang lalu',
            icon: 'fa-exclamation-circle'
        }
    ];

    // DOM Elements
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationModal = document.getElementById('notificationModal');
    const notificationOverlay = document.getElementById('notificationOverlay');
    const notificationClose = document.getElementById('notificationClose');
    const notificationList = document.getElementById('notificationList');
    const notificationBadge = document.getElementById('notificationBadge');
    const clearAllBtn = document.getElementById('clearAllBtn');

    // Initialize
    const init = () => {
        attachEventListeners();
        renderNotifications();
        updateBadge();
    };

    // Attach event listeners
    const attachEventListeners = () => {
        notificationBtn.addEventListener('click', toggleModal);
        notificationClose.addEventListener('click', closeModal);
        notificationOverlay.addEventListener('click', closeModal);
        clearAllBtn.addEventListener('click', clearAllNotifications);

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && notificationModal.classList.contains('active')) {
                closeModal();
            }
        });
    };

    // Toggle modal
    const toggleModal = () => {
        if (notificationModal.classList.contains('active')) {
            closeModal();
        } else {
            openModal();
        }
    };

    // Open modal
    const openModal = () => {
        notificationModal.classList.add('active');
        notificationBtn.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    // Close modal
    const closeModal = () => {
        notificationModal.classList.remove('active');
        notificationBtn.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Render notifications
    const renderNotifications = () => {
        notificationList.innerHTML = '';

        if (notifications.length === 0) {
            const emptyMsg = document.createElement('div');
            emptyMsg.className = 'notification-empty';
            emptyMsg.innerHTML = '<p style="padding: 40px 20px; text-align: center; color: var(--text-muted);">Tidak ada notifikasi</p>';
            notificationList.appendChild(emptyMsg);
            clearAllBtn.disabled = true;
            return;
        }

        clearAllBtn.disabled = false;

        notifications.forEach((notif) => {
            const notifItem = createNotificationItem(notif);
            notificationList.appendChild(notifItem);
        });
    };

    // Create notification item element
    const createNotificationItem = (notif) => {
        const item = document.createElement('div');
        item.className = 'notification-item';
        item.setAttribute('data-id', notif.id);

        item.innerHTML = `
            <div class="notification-icon ${notif.type}">
                <i class="fas ${notif.icon}"></i>
            </div>
            <div class="notification-content">
                <div class="notification-title">${notif.title}</div>
                <div class="notification-message">${notif.message}</div>
                <div class="notification-time">${notif.time}</div>
            </div>
            <button class="notification-close-item" data-id="${notif.id}" aria-label="Tutup notifikasi">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Add click handler to close button
        const closeBtn = item.querySelector('.notification-close-item');
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            removeNotification(notif.id);
        });

        return item;
    };

    // Remove notification
    const removeNotification = (id) => {
        notifications = notifications.filter((notif) => notif.id !== id);
        renderNotifications();
        updateBadge();
    };

    // Clear all notifications
    const clearAllNotifications = () => {
        notifications = [];
        renderNotifications();
        updateBadge();
    };

    // Update badge
    const updateBadge = () => {
        const count = notifications.length;
        if (count === 0) {
            notificationBadge.classList.add('hidden');
        } else {
            notificationBadge.classList.remove('hidden');
            notificationBadge.textContent = count > 9 ? '9+' : count;
        }
    };

    // Add new notification
    const addNotification = (title, message, type = 'info', icon = 'fa-bell') => {
        const newNotif = {
            id: Date.now(),
            title,
            message,
            type,
            time: 'Baru saja',
            icon
        };

        notifications.unshift(newNotif);
        renderNotifications();
        updateBadge();

        // Optional: automatically remove after 10 seconds
        setTimeout(() => {
            removeNotification(newNotif.id);
        }, 10000);
    };

    return {
        init,
        addNotification,
        removeNotification,
        clearAllNotifications
    };
})();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        NotificationUIModule.init();
    });
} else {
    NotificationUIModule.init();
}

export default NotificationUIModule;
