# 🧊 Bio Folder - Portfolio Assets & Project Data

This directory contains the core assets and data management logic for the KR Hasni Zihar portfolio.

## 📁 Directory Structure

```text
/bio/
├── assets/             # Core UI assets
│   ├── css/            # Custom styles (liquid glass theme, project details)
│   ├── js/             # UI logic (scroll animations, lightbox, form handling)
│   └── image/          # Global images (hero, software icons, etc.)
└── project/            # Project-specific content
    ├── projects-data.js # Central registry for main index project cards
    └── [project-name]/  # Individual project folders (e.g., mora-sports-complex)
        ├── project-template.html      # Reusable HTML shell for project details
        ├── project-template-data.js   # Project-specific data (single source of truth)
        └── image/                     # Images specific to this project
```

## 🚀 Managing Projects

### High-Level Workflow
The portfolio uses a **Data-Driven Approach**. You rarely need to touch the HTML for individual projects.

1. **Global Projects**: To add a card to the home page, update `/bio/project/projects-data.js`.
2. **Project Details**: Each project folder contains a `project-template.html` and a `project-template-data.js`. The HTML is a shell that dynamically renders content from the JS data file.

### Adding a New Project
1. Copy an existing project folder (e.g., `/bio/project/mora-sports-complex/`) to a new folder.
2. Replace imagery in the new folder's `/image/` directory.
3. Update `project-template-data.js` with your new structural data, descriptions, and file links.
4. Add the new project reference to `/bio/project/projects-data.js` to show it on the home page.

## ✨ Technical Highlights
- **Liquid Glass Theme**: Custom glassmorphism implementation using `backdrop-filter`.
- **Dynamic Rendering**: JavaScript-based population of HTML templates for maintainability.
- **Optimized UI**: Responsive sidebar, fast animations, and interactive lightbox galleries.

---
*For development help, refer to the root repository documentation.*
