# Link Hub - Single Page Link Dashboard

A modern, responsive, and interactive single-page link hub designed to organize useful links into clear categories. Built with a premium glassmorphism aesthetic.

## Features

- **Modern UI**: Clean typography (Inter) and a sleek dark-themed glassmorphism design.
- **Categorized Links**: Links are organized into logical groups for easy scanning.
- **Dynamic Search**: Real-time filtering of links and categories as you type.
- **Responsive Design**: Optimized for both mobile and desktop viewing.
- **Micro-interactions**: Subtle hover effects and animations for an interactive feel.
- **Easy Maintenance**: Data-driven structure in `main.js` allows for easy adding/removing of links.

## Technologies Used

- **HTML5**: Semantic structure.
- **CSS3**: Custom variables, Flexbox, Grid, and Glassmorphism.
- **JavaScript (ES6)**: Dynamic rendering and filtering logic.
- **Font Awesome**: High-quality icons.
- **Google Fonts**: Inter typography.

## How to Customize

To add or remove links, simply edit the `linkHubData` array in `main.js`:

```javascript
{
    category: "New Category",
    icon: "fa-solid fa-star",
    links: [
        { name: "My Link", url: "https://example.com", desc: "Short description.", icon: "fa-solid fa-link" }
    ]
}
```

## Credits

Created by HzGPD (2026).
