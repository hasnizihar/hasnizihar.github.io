# Stellar Gallery — Static HTML/CSS/JS

This is a static, responsive image gallery built with plain HTML, CSS and JavaScript.

Files of interest:
- `index.html` — main page structure (header, filters, gallery, lightbox, footer)
- `styles.css` — styles, theme variables and responsive rules
- `script.js` — gallery interactivity: filters, search, sort, lightbox, theme toggle
- `images/` — local image assets used by the demo (SVG placeholders)

How to run (Windows PowerShell):

1. Open the folder `D:\INDEX\web development\Tests` in File Explorer.
2. Double-click `index.html` to open it in your default browser.

Or from PowerShell in that folder:

```powershell
Start-Process index.html
```

Notes:
- The site is fully static — it references local images in the `images/` folder. Replace the SVGs with JPG/PNG files if you want real photos.
- Theme preference is stored in localStorage (key `gallery_light`).

If you'd like, I can:
- Replace placeholders with real photos and add an `images/optimized/` folder with webp/jpg variants, or
- Add a tiny `package.json` with an npm `start` script (static server) for a one-command dev server.