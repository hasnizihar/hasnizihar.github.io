# 🔗 Personal Link-Card

A premium, glassmorphism-style personal link page. Simple, static, and easy to customize.

## 🚀 Quick Start

1. **Clone or Download** this folder.
2. Open `index.html` in your browser to verify it works.

## 🛠 Customization

### 1. Change Content (Name, Links, Bio)
Open `scripts/data.js` in any text editor. You will see a `pageData` object at the top.
Modify the values inside quotes.

**Example:**
```javascript
profile: {
    name: "Zainy Zihar", 
    ...
}
```

### 2. Change Colors & Theme
Open `styles/main.css`. at the top, look for `:root`.
Change the `background:` or colors there.

```css
:root {
    /* Change background gradient */
    --bg-gradient: linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%);
}
```

### 3. Change Profile Image
Place your image in `assets/images/`.
Update the path in `scripts/data.js`:
```javascript
image: "assets/images/my-photo.jpg"
```

## 📱 Mobile features
- Optimized tap targets.
- Interactions simplified (no hover effects on touch).

## 📄 License
Personal Use.
