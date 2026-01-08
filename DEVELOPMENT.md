# 🚀 Development Guide

Guide lengkap untuk mengembangkan dan maintain portfolio.

## Quick Start

1. **Buka project:**
   ```
   cd porto
   ```

2. **Jalankan di browser:**
   - Double-click `index.html` atau
   - Drag & drop ke browser, atau
   - Gunakan Live Server extension di VS Code

3. **Mulai edit:**
   - HTML: `index.html`
   - CSS: `src/css/style.css`
   - JavaScript: `src/js/script.js` atau modules di `src/js/modules/`

## Project Architecture

### Module System

Setiap fitur diorganisir dalam module terpisah untuk maintainability:

```javascript
// Module template
const FeatureModule = {
    init: function() {
        // Initialize feature
    },
    
    method1: function() {
        // Feature logic
    },
    
    method2: function() {
        // Feature logic
    }
};
```

### Current Modules

1. **ThemeModule** - Theme switching (light/dark)
2. **NavigationModule** - Sidebar & menu navigation
3. **NotificationModule** - Toast notifications
4. **ContactFormModule** - Form handling
5. **AnimationModule** - Scroll animations & parallax
6. **UtilsModule** - Utility functions

## Adding New Features

### 1. Create New Module

**Contoh: Membuat Search Module**

```javascript
// src/js/modules/search.js
const SearchModule = {
    init: function() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e));
        }
    },
    
    handleSearch: function(e) {
        const query = e.target.value;
        console.log('Searching for:', query);
        // Add search logic here
    }
};
```

### 2. Register Module in Main Script

```javascript
// src/js/script.js - di bagian INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    // ... modules lainnya
    SearchModule.init();  // Add this line
    console.log('✅ All modules initialized successfully');
});
```

### 3. Add HTML Elements

```html
<!-- Add to index.html where needed -->
<input type="text" id="searchInput" placeholder="Search...">
```

## CSS Structure

### Custom Properties (Variables)

Located at the top of `src/css/style.css`:

```css
:root[data-theme="light"] {
    --bg-primary: #ffffff;
    --text-primary: #1a1a1a;
    /* ... more variables */
}

:root[data-theme="dark"] {
    --bg-primary: #1a1a2e;
    --text-primary: #ffffff;
    /* ... more variables */
}
```

### Adding New Theme Variable

1. Tambah di `:root[data-theme="light"]`
2. Tambah di `:root[data-theme="dark"]`
3. Gunakan dengan `var(--variable-name)`

### Responsive Breakpoints

```css
/* Mobile First Approach */
/* Base styles for mobile */

@media (min-width: 768px) {
    /* Tablet and up */
}

@media (min-width: 1024px) {
    /* Desktop and up */
}
```

## JavaScript Best Practices

### 1. Use Module Pattern
- Encapsulate related functions
- Avoid global variables
- Easy to test and debug

### 2. Naming Conventions
- Modules: `PascalCase` (e.g., `ThemeModule`)
- Functions: `camelCase` (e.g., `handleSearch`)
- Constants: `UPPER_CASE` (e.g., `API_URL`)
- CSS Classes: `kebab-case` (e.g., `glass-card`)

### 3. Comments
```javascript
// ========== Module Name ==========
// Used for: Describe purpose
// Example: Show how to use

const MyModule = {
    // Feature description
    method: function() {
        // Implementation
    }
};
```

## Testing Changes

### Dark/Light Mode
```javascript
// In browser console
const html = document.documentElement;
html.setAttribute('data-theme', 'dark');  // Test dark mode
html.setAttribute('data-theme', 'light'); // Test light mode
```

### Notifications
```javascript
// In browser console
NotificationModule.show('Test message', 'success');
NotificationModule.show('Error message', 'error');
NotificationModule.show('Warning message', 'warning');
```

### Navigation
```javascript
// In browser console
NavigationModule.navigateToSection('about');
NavigationModule.navigateToSection('contact');
```

## Performance Tips

1. **Lazy Load Images**
   - Use `loading="lazy"` attribute

2. **Minimize HTTP Requests**
   - Combine CSS files if needed

3. **Use CSS Variables**
   - Reduces CSS file size
   - Easier theme switching

4. **Optimize JavaScript**
   - Defer non-critical scripts
   - Use event delegation

## Debugging

### Browser DevTools
1. F12 to open DevTools
2. Check Console for errors/logs
3. Use breakpoints in Sources tab
4. Inspect elements in Elements tab

### Common Issues

| Issue | Solution |
|-------|----------|
| Dark mode not working | Check localStorage theme value |
| Images not showing | Verify image path is correct |
| Styles not applying | Check CSS selector specificity |
| Form not submitting | Check input IDs match form |

## Deployment

### Before Deploy
- [ ] Test all links work
- [ ] Check responsiveness on mobile
- [ ] Test dark/light mode
- [ ] Verify contact form
- [ ] Check console for errors

### File Paths
- Keep folder structure same
- Use relative paths (`src/css/style.css`)
- Don't change file names

### Hosting Options
- GitHub Pages (free)
- Netlify (free tier)
- Vercel (free tier)
- Traditional hosting

## Resources

- [MDN Web Docs](https://developer.mozilla.org)
- [CSS Variables Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [Glassmorphism CSS](https://css-tricks.com/backdrop-filter/)
- [ES6 JavaScript](https://es6.io/)

## Version History

**v2.0** (Current)
- Modular JavaScript structure
- Organized file system
- Documentation

**v1.0**
- Initial single-file setup

---

**Need Help?** Check PROJECT_STRUCTURE.md for folder organization details.
