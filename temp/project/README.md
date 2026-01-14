# 🧊 Project Details Template — Liquid Glass Theme

A premium project portfolio page template featuring a sophisticated liquid glass design aesthetic.

---

## 📋 Template Structure

### ✅ Included Components

1. **Top Cover Image**
   - Full-width hero section with landscape image
   - Subtle gradient overlay
   - Glass-styled "Back to Projects" button

2. **Project Header**
   - Category and date badges
   - Main project title
   - Subtitle/tagline

3. **Project Info Grid**
   - Client information
   - Project duration
   - Your role
   - Tools used

4. **Detailed Description Section**
   - Project overview
   - Objectives (bulleted list)
   - Challenges faced
   - Solution & approach

5. **2×2 Image Gallery (Landscape)**
   - Four landscape images in grid layout
   - Click to open lightbox popup
   - Keyboard navigation (arrow keys, ESC)
   - Smooth zoom animations

6. **Project Files Section**
   - Downloadable file cards
   - File type icons
   - File size display
   - Glass-styled download buttons

7. **Results & Conclusion**
   - Project outcomes
   - Key achievements

---

## 🎨 Design Features

### Liquid Glass Aesthetics

- **Frosted glass cards** with backdrop blur
- **Subtle light reflections** on glass surfaces
- **Soft gradients** throughout
- **Restrained color palette** (dark background + cyan accent)
- **Desktop-only hover effects** for performance
- **Smooth animations** (200-300ms)

### Typography

- **Font**: Inter (Google Fonts)
- **Hierarchy**: Clear heading structure
- **Readability**: High contrast with soft white text

---

## 🛠️ How to Use This Template

### Step 1: Duplicate the Template

Create a new project folder:

```
bio/projects/your-project-name/
```

Copy these files:
- `project-template.html` → rename to `portfolio-details.html`
- `project-details.css`
- `project-details.js`

### Step 2: Add Your Images

Create an `image` folder inside your project directory:

```
bio/projects/your-project-name/image/
```

Add these images:
- `Cover-img.png` — Hero cover image (recommended: 1920×1080)
- `image1.jpg` — Gallery image 1 (landscape, 16:9 ratio)
- `image2.jpg` — Gallery image 2
- `image3.jpg` — Gallery image 3
- `image4.jpg` — Gallery image 4

### Step 3: Customize Content

#### Update Project Header (Lines 148-153)

```html
<span class="project-category">Your Category</span>
<span class="project-date">Month Year</span>
<h1 class="project-title-main">Your Project Name</h1>
<p class="project-subtitle">Your project tagline</p>
```

#### Update Project Info Grid (Lines 158-173)

```html
<div class="info-item">
    <h3>Client</h3>
    <p>Your Client Name</p>
</div>
<!-- Repeat for Duration, Role, Tools -->
```

#### Update Description (Lines 177-216)

Replace the lorem ipsum text with your actual project details.

#### Update Gallery Images (Lines 222-269)

The JavaScript automatically handles the gallery. Just ensure your images are in the `image/` folder.

#### Update File Links (Lines 277-333)

```html
<a href="files/your-file.pdf" class="file-card" download>
    <!-- Update file name and size -->
    <h4>Your File Name</h4>
    <p>PDF • X.X MB</p>
</a>
```

### Step 4: Add Project Files (Optional)

If you have downloadable files:

1. Create a `files` folder:
   ```
   bio/projects/your-project-name/files/
   ```

2. Add your files (PDFs, DWG, XLSX, etc.)

3. Update the file card links in the HTML

---

## 📱 Responsive Design

- **Desktop**: Full liquid glass effects with hover animations
- **Tablet**: Optimized grid layouts
- **Mobile**: Single column layout, reduced blur for performance

---

## 🎯 Key Features

### Lightbox Gallery

- Click any gallery image to open fullscreen view
- Navigate with:
  - **Arrow keys** (← →)
  - **Navigation buttons**
  - **ESC** to close
- Smooth zoom-in animation
- Image captions displayed

### Glass Effects

All major sections use the `.glass` class from `styles.css`:

```css
.glass {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(16px) saturate(160%);
    border: 1px solid rgba(255, 255, 255, 0.25);
    border-radius: 20px;
}
```

### Hover Interactions (Desktop Only)

```css
@media (hover: hover) {
    /* Hover effects only on devices that support hover */
}
```

---

## 🔗 Navigation

The sidebar navigation is shared across all pages. Update these paths if needed:

```html
<a href="../../index.html#home" class="nav-item">
<a href="../../index.html#about" class="nav-item">
<!-- etc. -->
```

---

## ✨ Customization Tips

### Change Accent Color

In your main `styles.css`, update:

```css
--accent: #6ee7f9; /* Default cyan */
```

Try:
- `#a78bfa` — Soft purple
- `#86efac` — Mint green
- `#60a5fa` — Sky blue

### Adjust Glass Intensity

In `project-details.css`, modify:

```css
background: rgba(255, 255, 255, 0.15); /* Increase for lighter glass */
backdrop-filter: blur(16px); /* Increase for more blur */
```

### Add More Gallery Images

1. Add images to the `image/` folder
2. Update `project-details.js`:

```javascript
const galleryImages = [
    { src: 'image/image1.jpg', caption: 'Image 1' },
    { src: 'image/image2.jpg', caption: 'Image 2' },
    { src: 'image/image3.jpg', caption: 'Image 3' },
    { src: 'image/image4.jpg', caption: 'Image 4' },
    { src: 'image/image5.jpg', caption: 'Image 5' }, // Add more
];
```

3. Add corresponding HTML in the gallery grid

---

## 📁 File Structure

```
your-project-name/
├── portfolio-details.html
├── project-details.css
├── project-details.js
├── image/
│   ├── Cover-img.png
│   ├── image1.jpg
│   ├── image2.jpg
│   ├── image3.jpg
│   └── image4.jpg
└── files/ (optional)
    ├── project-report.pdf
    ├── drawings.dwg
    └── calculations.xlsx
```

---

## 🚀 Quick Start Checklist

- [ ] Copy template files to new project folder
- [ ] Rename `project-template.html` to `portfolio-details.html`
- [ ] Add cover image (`Cover-img.png`)
- [ ] Add 4 gallery images (landscape, 16:9)
- [ ] Update project title and metadata
- [ ] Write project description
- [ ] Update info grid (client, duration, role, tools)
- [ ] Add downloadable files (optional)
- [ ] Update file links and sizes
- [ ] Test lightbox gallery
- [ ] Test on mobile devices

---

## 💡 Best Practices

### Image Optimization

- **Cover image**: 1920×1080px, optimized JPEG/PNG
- **Gallery images**: 1280×720px minimum, landscape orientation
- **File size**: Keep under 500KB per image for fast loading

### Content Writing

- **Title**: Clear and descriptive (4-8 words)
- **Subtitle**: One-line summary
- **Description**: 2-3 paragraphs minimum
- **Objectives**: 3-5 bullet points
- **Results**: Quantifiable achievements when possible

### Accessibility

- All images have `alt` attributes
- Keyboard navigation supported
- High contrast text
- Semantic HTML structure

---

## 🎨 Design Philosophy

> **Liquid Glass = Restraint**
>
> If it looks impressive at first glance, it's probably too much.  
> If it feels calm and premium — you nailed it.

---

## 📞 Need Help?

If you encounter issues:

1. Check that all file paths are correct
2. Ensure images are in the `image/` folder
3. Verify `styles.css` is properly linked
4. Test in different browsers
5. Check browser console for errors

---

**Created with the Liquid Glass Design System**  
*Premium • Minimal • Sophisticated*
