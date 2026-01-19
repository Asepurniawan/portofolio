# Dokumentasi Sistem Notifikasi

## 📌 Ringkasan

Sistem notifikasi telah diimplementasikan dengan fitur-fitur lengkap untuk menampilkan dan mengelola notifikasi dalam portofolio.

## ✨ Fitur

### 1. **Logo Notifikasi (Bell Icon)**
- Ikon lonceng dengan animasi ring saat modal dibuka
- Badge merah menunjukkan jumlah notifikasi yang belum dibaca
- Responsive dan bekerja di semua ukuran layar

### 2. **Modal Notifikasi**
- Popup modal yang elegan dengan backdrop blur
- Menampilkan daftar notifikasi dengan detail lengkap
- Dapat ditutup dengan tombol X atau Escape key

### 3. **Notifikasi Item**
Setiap notifikasi menampilkan:
- Icon dengan warna sesuai tipe (success, warning, error, info)
- Judul notifikasi
- Pesan deskriptif
- Waktu notifikasi
- Tombol untuk menghapus notifikasi individual

### 4. **Tipe Notifikasi**
- **Success** (Hijau): Untuk pesan berhasil
- **Info** (Biru): Untuk informasi umum
- **Warning** (Orange): Untuk peringatan
- **Error** (Merah): Untuk pesan kesalahan

### 5. **Fungsi Tambahan**
- Tombol "Hapus Semua" untuk menghapus semua notifikasi
- Auto-remove notifikasi setelah 10 detik
- Animasi smooth saat membuka dan menutup modal
- Tema gelap dan terang yang responsif

## 🚀 Cara Menggunakan

### Menampilkan Notifikasi Baru

```javascript
// Dari mana saja dalam aplikasi, gunakan:
NotificationUIModule.addNotification(
    'Judul Notifikasi',
    'Pesan notifikasi',
    'success', // Tipe: success, info, warning, error
    'fa-check-circle' // Icon dari Font Awesome
);
```

### Contoh Penggunaan

```javascript
// Notifikasi Sukses
NotificationUIModule.addNotification(
    'Pesan Terkirim!',
    'Pesan Anda telah berhasil dikirim',
    'success',
    'fa-check-circle'
);

// Notifikasi Info
NotificationUIModule.addNotification(
    'Update Tersedia',
    'Versi terbaru dari aplikasi sudah siap',
    'info',
    'fa-info-circle'
);

// Notifikasi Peringatan
NotificationUIModule.addNotification(
    'Perhatian',
    'Konfigurasi belum lengkap',
    'warning',
    'fa-exclamation-circle'
);

// Notifikasi Error
NotificationUIModule.addNotification(
    'Terjadi Kesalahan',
    'Gagal memproses permintaan Anda',
    'error',
    'fa-times-circle'
);
```

### Menghapus Notifikasi

```javascript
// Menghapus notifikasi berdasarkan ID
NotificationUIModule.removeNotification(notificationId);

// Menghapus semua notifikasi
NotificationUIModule.clearAllNotifications();
```

## 🎨 Styling CSS

Beberapa class CSS yang digunakan:

```css
/* Logo Notifikasi */
.notification-btn          /* Tombol notifikasi utama */
.notification-badge        /* Badge dengan nomor notifikasi */

/* Modal */
.notification-modal        /* Container modal */
.notification-modal-content /* Konten modal */
.notification-modal-header /* Header modal */
.notification-modal-body   /* Body dengan daftar notifikasi */
.notification-modal-footer /* Footer dengan tombol hapus */

/* Notifikasi Item */
.notification-item         /* Container notifikasi */
.notification-icon         /* Icon notifikasi */
.notification-content      /* Konten notifikasi */
.notification-title        /* Judul notifikasi */
.notification-message      /* Pesan notifikasi */
.notification-time         /* Waktu notifikasi */
```

## 🔧 Integrasi dengan Form

Sistem notifikasi dapat diintegrasikan dengan form kontak:

```javascript
// Dalam ContactFormModule.js
// Saat form berhasil dikirim:
NotificationUIModule.addNotification(
    'Terima Kasih!',
    'Pesan Anda telah kami terima dan akan segera dibalas',
    'success',
    'fa-paper-plane'
);
```

## 📱 Responsivitas

Modal notifikasi otomatis menyesuaikan ukuran:
- **Desktop**: 400px width, centered
- **Mobile**: 90% width dengan max-width 400px
- **Tablet**: Responsive dengan padding yang tepat

## ⚡ Fitur Lanjutan

### Animasi
- **Bell Ring**: Icon berputar saat modal dibuka
- **Badge Pulse**: Badge berkedip saat ada notifikasi baru
- **Slide Up**: Modal muncul dengan animasi smooth dari bawah
- **Hover Effect**: Item notifikasi berubah warna saat di-hover

### Keyboard Support
- **Escape**: Tutup modal
- Semua tombol dapat diakses dengan Tab dan Enter

### Dark Mode
- Semua warna menggunakan CSS variables
- Otomatis menyesuaikan dengan tema gelap/terang

## 🔄 Update Data

Untuk mengubah notifikasi default yang ditampilkan saat loading:

Buka file `src/js/modules/notificationUI.js` dan modifikasi array `notifications`:

```javascript
let notifications = [
    {
        id: 1,
        title: 'Judul Custom',
        message: 'Pesan custom',
        type: 'success',
        time: 'Sekarang',
        icon: 'fa-star'
    },
    // ... tambah notifikasi lainnya
];
```

## 🎯 Best Practices

1. **Gunakan tipe notifikasi yang sesuai** untuk memberikan visual feedback yang jelas
2. **Jangan tampilkan terlalu banyak notifikasi** sekaligus (lebih dari 5)
3. **Gunakan pesan yang singkat dan jelas**
4. **Tambahkan icon yang relevan** untuk meningkatkan UX
5. **Test di berbagai browser** dan ukuran layar

## 📋 Checklist Implementasi

- ✅ HTML structure dengan modal
- ✅ CSS styling lengkap
- ✅ JavaScript functionality
- ✅ Integrasi dengan script.js
- ✅ Responsive design
- ✅ Dark mode support
- ✅ Keyboard accessibility
- ✅ Animasi smooth

## 🐛 Troubleshooting

### Modal tidak muncul
- Pastikan `notificationBtn` memiliki ID yang benar di HTML
- Cek console untuk error JavaScript

### Badge tidak tampil
- Pastikan CSS class `.notification-badge` loaded
- Cek nilai notifikasi di array

### Icon tidak muncul
- Pastikan Font Awesome sudah di-import di HTML
- Gunakan class icon yang benar (cek di FontAwesome.com)

---

**Dibuat untuk Portfolio Asep Kurniawan**
