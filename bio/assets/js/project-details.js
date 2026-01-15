// ===================================
// Lightbox Gallery Functionality
// ===================================

// Gallery images are loaded from project-template-data.js
// The galleryImages variable is set globally by that file

let currentImageIndex = 0;

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');

    lightbox.classList.add('active');
    lightboxImg.src = galleryImages[index].src;
    lightboxCaption.textContent = galleryImages[index].caption;

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');

    // Restore body scroll
    document.body.style.overflow = '';
}

function changeImage(direction) {
    currentImageIndex += direction;

    // Loop around
    if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    }

    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');

    lightboxImg.src = galleryImages[currentImageIndex].src;
    lightboxCaption.textContent = galleryImages[currentImageIndex].caption;
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            changeImage(-1);
        } else if (e.key === 'ArrowRight') {
            changeImage(1);
        }
    }
});
// ===================================
// Render Functions
// ===================================

function renderProjectData() {
    // Update page title and meta
    document.title = projectData.meta.title;
    document.querySelector('meta[name="description"]').content = projectData.meta.description;

    // Update cover image
    const coverImg = document.querySelector('.project-cover-hero img');
    if (coverImg) {
        coverImg.src = projectData.cover.image;
        coverImg.alt = projectData.cover.alt;
    }

    // Update header
    const category = document.querySelector('.project-category');
    const date = document.querySelector('.project-date');
    const title = document.querySelector('.project-title-main');
    const subtitle = document.querySelector('.project-subtitle');

    if (category) category.textContent = projectData.header.category;
    if (date) date.textContent = projectData.header.date;
    if (title) title.textContent = projectData.header.title;
    if (subtitle) subtitle.textContent = projectData.header.subtitle;

    // Update info grid
    const infoItems = document.querySelectorAll('.info-item');
    if (infoItems.length >= 4) {
        infoItems[0].querySelector('p').textContent = projectData.info.client;
        infoItems[1].querySelector('p').textContent = projectData.info.duration;
        infoItems[2].querySelector('p').textContent = projectData.info.role;
        infoItems[3].querySelector('p').textContent = projectData.info.tools;
    }

    // Update description
    renderDescription();

    // Update gallery
    renderGallery();

    // Update files
    renderFiles();

    // Update conclusion
    renderConclusion();
}

function renderGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    if (!galleryGrid) return;

    // Set global galleryImages for lightbox
    window.galleryImages = projectData.gallery;

    // Clear existing content
    galleryGrid.innerHTML = '';

    // Generate gallery items
    projectData.gallery.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.onclick = () => openLightbox(index);

        galleryItem.innerHTML = `
            <img src="${image.src}" alt="${image.alt}">
            <div class="gallery-overlay">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                    <line x1="11" y1="8" x2="11" y2="14"></line>
                    <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
            </div>
        `;

        galleryGrid.appendChild(galleryItem);
    });
}

function renderDescription() {
    const descBox = document.querySelector('.project-description-box');
    if (!descBox) return;

    let html = '<h2>Project Overview</h2>';

    // Overview paragraphs
    projectData.description.overview.forEach(para => {
        html += `<p>${para}</p>`;
    });

    // Objectives
    html += '<h3>Objectives</h3><ul>';
    projectData.description.objectives.forEach(obj => {
        html += `<li>${obj}</li>`;
    });
    html += '</ul>';

    // Challenges
    html += `<h3>Challenges</h3><p>${projectData.description.challenges}</p>`;

    // Solution
    html += `<h3>Solution & Approach</h3><p>${projectData.description.solution}</p>`;

    descBox.innerHTML = html;
}

function renderFiles() {
    const filesGrid = document.querySelector('.files-grid');
    if (!filesGrid) return;

    filesGrid.innerHTML = '';

    projectData.files.forEach(file => {
        const fileCard = document.createElement('a');
        fileCard.href = file.path;
        fileCard.className = 'file-card';
        fileCard.download = true;

        fileCard.innerHTML = `
            <svg class="file-icon" width="32" height="32" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                ${file.type === 'PDF' ? '<line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line>' : ''}
                ${file.type === 'XLSX' ? '<rect x="8" y="12" width="8" height="8"></rect>' : ''}
            </svg>
            <div class="file-info">
                <h4>${file.name}</h4>
                <p>${file.type} • ${file.size}</p>
            </div>
            <svg class="download-icon" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
        `;

        filesGrid.appendChild(fileCard);
    });
}

function renderConclusion() {
    const conclusionBox = document.querySelector('.project-conclusion');
    if (!conclusionBox) return;

    let html = '<h2>Results & Conclusion</h2>';
    html += `<p>${projectData.conclusion.summary}</p>`;
    html += '<p>Key achievements include:</p><ul>';

    projectData.conclusion.achievements.forEach(achievement => {
        html += `<li>${achievement}</li>`;
    });

    html += '</ul>';
    conclusionBox.innerHTML = html;
}

// ===================================
// Initialize on DOM Load
// ===================================

document.addEventListener('DOMContentLoaded', renderProjectData);

// Export for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { projectData, renderProjectData };
}
