# 🎨 CSS & Styling Guide

Complete guide untuk styling dan theme management dalam portfolio.

## Theme System

### How It Works

Portfolio menggunakan CSS Custom Properties dengan data-attribute untuk theme switching:

```html
<!-- Light Mode -->
<html data-theme="light">

<!-- Dark Mode -->
<html data-theme="dark">
```

Perubahan theme dilakukan via JavaScript:
```javascript
document.documentElement.setAttribute('data-theme', 'dark');
localStorage.setItem('theme', 'dark');
```

### CSS Variables

#### Base Colors

**Light Mode:**
```css
:root[data-theme="light"] {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --success-color: #48bb78;
    --error-color: #f56565;
    --warning-color: #ed8936;
    
    --bg-primary: #ffffff;
    --bg-secondary: #f7f7f7;
    --bg-tertiary: #e9e9e9;
    
    --text-primary: #1a1a1a;
    --text-secondary: #404040;
    --text-muted: #808080;
    
    --border-color: #e0e0e0;
}
```

**Dark Mode:**
```css
:root[data-theme="dark"] {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --success-color: #48bb78;
    --error-color: #f56565;
    --warning-color: #ed8936;
    
    --bg-primary: #1a1a2e;
    --bg-secondary: #16213e;
    --bg-tertiary: #0f3460;
    
    --text-primary: #ffffff;
    --text-secondary: #e0e0e0;
    --text-muted: #a0a0a0;
    
    --border-color: #2a2a4a;
}
```

## Design System

### Glassmorphism

```css
.glass-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    padding: var(--spacing-lg);
}
```

### Gradients

```css
--accent-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--primary-gradient: linear-gradient(135deg, #667eea 0%, #48bb78 100%);
```

Usage:
```css
background: var(--accent-gradient);
```

### Spacing System

```css
:root {
    --spacing-xs: 0.25rem;  /* 4px */
    --spacing-sm: 0.5rem;   /* 8px */
    --spacing-md: 1rem;     /* 16px */
    --spacing-lg: 1.5rem;   /* 24px */
    --spacing-xl: 2rem;     /* 32px */
}
```

### Shadows

```css
:root {
    --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.15);
}
```

## Component Patterns

### Button

```css
.btn {
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-base);
    border: none;
}

.btn-primary {
    background: var(--accent-gradient);
    color: white;
}

.btn-secondary {
    background: var(--bg-tertiary);
    color: var(--text-primary);
    border: 1px solid var(--border-color);
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}
```

### Card

```css
.glass-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    padding: var(--spacing-lg);
    transition: all var(--transition-base);
}

.glass-card:hover {
    transform: translateY(-8px);
    background: rgba(255, 255, 255, 0.15);
}
```

### Form Input

```css
input,
textarea {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid var(--border-color);
    background: var(--bg-secondary);
    color: var(--text-primary);
    border-radius: 8px;
    transition: all var(--transition-base);
}

input:focus,
textarea:focus {
    outline: none;
    border-color: var(--accent-primary);
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}
```

## Animations

### Keyframes

```css
@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
}
```

### Usage

```css
.element {
    animation: slideIn 0.3s ease forwards;
}
```

## Responsive Design

### Mobile First Approach

```css
/* Base: Mobile (< 768px) */
.container {
    padding: 1rem;
    grid-template-columns: 1fr;
}

/* Tablet (768px+) */
@media (min-width: 768px) {
    .container {
        padding: 2rem;
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
    .container {
        padding: 2rem;
        grid-template-columns: repeat(3, 1fr);
    }
}
```

### Breakpoints

| Name | Size | Device |
|------|------|--------|
| Mobile | 480px | Phones |
| Tablet | 768px | Tablets |
| Desktop | 1024px | Laptops |
| Large | 1440px | Large screens |

## Customization

### Changing Primary Color

Find in `src/css/style.css`:
```css
--primary-color: #667eea;
--accent-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

Replace with your color:
```css
--primary-color: #your-color;
--accent-gradient: linear-gradient(135deg, #your-color 0%, #accent-color 100%);
```

### Adding Custom Font

```css
@import url('https://fonts.googleapis.com/css2?family:YourFont');

:root {
    --font-primary: 'Your Font', sans-serif;
}

body {
    font-family: var(--font-primary);
}
```

### Modifying Theme Colors

Edit color values dalam:
```css
:root[data-theme="light"] { }
:root[data-theme="dark"] { }
```

## Tips & Best Practices

### 1. Use CSS Variables for Everything
```css
/* ❌ Bad */
.button {
    padding: 10px;
    background: #667eea;
    color: #ffffff;
}

/* ✅ Good */
.button {
    padding: var(--spacing-md);
    background: var(--accent-primary);
    color: var(--text-light);
}
```

### 2. Consistent Spacing
```css
/* Use spacing scale consistently */
margin: var(--spacing-lg);
padding: var(--spacing-md) var(--spacing-lg);
gap: var(--spacing-sm);
```

### 3. Smooth Transitions
```css
/* Add transition to interactive elements */
.interactive {
    transition: all var(--transition-base);
    /* or */
    transition: background 0.3s ease, transform 0.3s ease;
}
```

### 4. Accessibility
```css
/* Ensure sufficient color contrast */
.text {
    color: var(--text-primary);
    background: var(--bg-primary);
}

/* Focus states for keyboard navigation */
button:focus-visible {
    outline: 2px solid var(--accent-primary);
    outline-offset: 2px;
}
```

## Browser Support

- **Chrome/Edge**: ✅ Full support
- **Firefox**: ✅ Full support
- **Safari**: ✅ Full support
- **Mobile browsers**: ✅ Full support

All features use standard CSS without vendor prefixes needed.

---

**Last Updated:** January 8, 2026
**Version:** 2.0
