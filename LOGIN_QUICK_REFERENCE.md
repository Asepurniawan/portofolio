# 🔐 LOGIN SYSTEM - QUICK REFERENCE

## 🚀 5 Menit Quick Start

### Demo Credentials:
```
Email:    asepkurniawan5288@gmail.com
Password: admin123
```

### Cara Login:
1. Klik "Login" button di header
2. Masukkan email dan password
3. Klik "Login"
4. Sekarang bisa send message

### Cara Logout:
Klik button X di header

---

## 💻 Menggunakan dalam Kode

### Check Login Status:
```javascript
if (AuthModule.isLoggedIn()) {
    console.log('User sudah login');
}
```

### Get User Info:
```javascript
const user = AuthModule.getCurrentUser();
console.log(user.email);  // Output: user@example.com
```

### Check Before Action:
```javascript
if (AuthModule.checkAuthForContact()) {
    // Send message...
}
```

### Manual Login Modal:
```javascript
AuthModule.openLoginModal();
```

### Logout:
```javascript
AuthModule.logout();
```

---

## 📋 Demo Accounts

| Email | Password | Akses |
|-------|----------|-------|
| asepkurniawan5288@gmail.com | admin123 | Full |
| user@example.com | user123 | Limited |
| test@email.com | test123 | Limited |

---

## 📁 File Structure

```
src/js/modules/
├── auth.js          ← New auth module (200+ lines)
├── contact.js       ← Updated (auth check)
├── notification.js  ← Notifications
└── ...
```

---

## 🎯 What's Protected

✅ **Contact Form** - Require login untuk send message
✅ **Session** - Persist across refreshes
✅ **UI** - Show/hide based on login state
✅ **Notifications** - Real-time feedback

---

## 🔑 Available Methods

```javascript
AuthModule.init()                    // Initialize
AuthModule.isLoggedIn()              // Check login
AuthModule.getCurrentUser()          // Get user
AuthModule.logout()                  // Logout
AuthModule.openLoginModal()          // Open modal
AuthModule.checkAuthForContact()     // Check for form
```

---

## 📱 Mobile Header

**Before Login:**
```
[☰] AK [Login] [🔔]
```

**After Login:**
```
[☰] AK [user@example.com] [X] [🔔]
```

---

## 🎨 Styling Classes

```css
.login-modal           /* Modal container */
.login-modal.active    /* Modal aktif */
.login-modal-content   /* Modal content */
.auth-btn              /* Login/logout button */
.user-info             /* User info container */
.user-email            /* Email display */
```

---

## 🧪 Quick Tests

- [ ] Click "Login" button
- [ ] Try login dengan salah password
- [ ] Login dengan demo credentials
- [ ] See user email di header
- [ ] Try send message
- [ ] Klik logout
- [ ] Refresh halaman - session hilang

---

## 📚 Documentation

Full docs: **LOGIN_SYSTEM.md**

---

**Ready to use! 🚀**
