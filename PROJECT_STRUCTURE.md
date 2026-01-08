# 📁 Project Structure

Portfolio project telah diorganisir menjadi struktur modular untuk memudahkan pengembangan dan maintenance.

## Struktur Folder

```
porto/
├── index.html                 # Main HTML file
├── README.md                  # Project documentation
├── package.json              # (optional) Dependencies
│
├── src/                       # Source files
│   ├── css/
│   │   └── style.css         # Main stylesheet dengan tema dark/light
│   │
│   ├── js/
│   │   ├── script.js         # Main JavaScript file (modular)
│   │   └── modules/          # JavaScript modules
│   │       ├── theme.js      # Theme toggle module
│   │       ├── navigation.js # Navigation & sidebar module
│   │       ├── notification.js # Notification system
│   │       ├── contact.js    # Contact form handling
│   │       ├── animation.js  # Animation & effects
│   │       └── utils.js      # Utility functions
│
└── public/                    # Static assets
    └── images/
        └── 202410370110122.jpg  # Profile image
```

## File Descriptions

### HTML
- **index.html** - Main portfolio structure dengan semantic HTML5

### CSS
- **src/css/style.css** - Complete styling dengan:
  - CSS Custom Properties untuk tema
  - Glassmorphism design
  - Responsive breakpoints
  - Dark/Light mode support

### JavaScript (Modular)
- **src/js/script.js** - Main entry point yang menginisialisasi semua modules:
  - ThemeModule - Theme toggle functionality
  - NavigationModule - Sidebar navigation
  - NotificationModule - Toast notifications
  - ContactFormModule - Form handling
  - AnimationModule - Scroll animations
  - UtilsModule - Utility functions

### Assets
- **public/images/** - Static images (profile photo, etc)

## Menggunakan Project

### Development
1. Edit HTML di `index.html`
2. Styling di `src/css/style.css`
3. JavaScript logic di `src/js/script.js` atau tambah module baru di `src/js/modules/`

### Menambah Feature Baru
1. Buat module baru di `src/js/modules/` (contoh: `src/js/modules/feature-name.js`)
2. Tambahkan inisialisasi di `src/js/script.js`
3. Import dan gunakan module

### Production
- Semua file sudah siap untuk diupload ke hosting
- Folder struktur harus dipertahankan agar path relatif tetap bekerja

## Features

✅ Dark/Light Mode dengan system preference detection
✅ Responsive design (mobile-first)
✅ Smooth animations & transitions
✅ Contact form dengan validation
✅ Theme toggle dengan keyboard shortcut (Ctrl+Shift+D)
✅ Notification system
✅ Scroll-to-top button
✅ Parallax effects

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes

- Semua modules menggunakan pattern IIFE (Immediately Invoked Function Expression)
- Tidak ada dependency eksternal (pure vanilla JavaScript)
- Responsive design tested pada breakpoints: 480px, 768px, 1024px

---

**Last Updated:** January 8, 2026
**Version:** 2.0 (Modular Structure)
