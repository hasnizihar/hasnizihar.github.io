/* Gallery interactivity */
const galleryEl = document.getElementById('gallery');
const filtersEl = document.getElementById('filters');
const searchEl = document.getElementById('search');
const sortEl = document.getElementById('sort');
const preloader = document.getElementById('preloader');
const toTopBtn = document.getElementById('toTop');

// Lightbox
const lightbox = document.getElementById('lightbox');
let lbImage = document.getElementById('lbImage');
let lbTitle = document.getElementById('lbTitle');
let lbCategory = document.getElementById('lbCategory');
const lbContent = document.querySelector('.lb-content');
// Keep a copy of the original lightbox content so we can restore it after grouped slider
const lbContentOriginal = lbContent ? lbContent.innerHTML : '';
const lbPrev = document.getElementById('lbPrev');
const lbNext = document.getElementById('lbNext');
const lbClose = document.getElementById('lbClose');

// Ensure functions only run if elements exist
const hasGallery = !!galleryEl;

// Local dataset referencing images/ folder so the site is fully static
// Projects: Loaded from data.js

let state = {
  filter: 'all',
  query: '',
  sort: 'newest',
  items: PROJECTS.slice(),
  currentProjectId: null,
  currentImageIndex: 0,
  intervals: [],
};

function formatImgItem(project) {
  const imagesCount = project.images.length;
  const slides = project.images.map((img, idx) => `
    <div class="card-slide ${idx === 0 ? 'active' : ''}" data-index="${idx}">
      <img loading="lazy" src="${img.src}" alt="${img.alt}"/>
    </div>
  `).join('');

  const indicators = imagesCount > 1 ? `
    <div class="card-indicators">
      ${project.images.map((_, idx) => `<span class="indicator ${idx === 0 ? 'active' : ''}" data-index="${idx}"></span>`).join('')}
    </div>
    <div class="image-count">${imagesCount} Images</div>
  ` : '';

  return `
    <article class="card show" data-id="${project.id}" tabindex="0">
      <div class="card-slider-container">
        <div class="card-slides">${slides}</div>
        ${indicators}
        <div class="hover-overlay">
          <span class="view-gallery-icon">👁️ View Gallery</span>
        </div>
      </div>
      <div class="meta">
        <div class="meta-header">
          <h4>${project.title}</h4>
          <span class="category-tag">${project.category}</span>
        </div>
        <p class="project-date">${new Date(project.date).getFullYear()}</p>
      </div>
    </article>`;
}

function renderGallery(items) {
  if (!galleryEl) return;
  // Clear existing slider intervals
  state.intervals.forEach(clearInterval);
  state.intervals = [];

  galleryEl.innerHTML = items.map(formatImgItem).join('');
  attachCardListeners();
}

function attachCardListeners() {
  const cards = galleryEl.querySelectorAll('.card');
  cards.forEach(card => {
    const projectId = parseInt(card.dataset.id);
    const project = PROJECTS.find(p => p.id === projectId);
    if (!project) return;

    // Click to open lightbox
    card.addEventListener('click', () => openLightbox(projectId));
    card.addEventListener('keyup', e => { if (e.key === 'Enter') openLightbox(projectId) });

    // Slider logic
    const sliderContainer = card.querySelector('.card-slides');
    const slides = card.querySelectorAll('.card-slide');
    const indicators = card.querySelectorAll('.indicator');

    if (slides.length <= 1) return;

    let currentIndex = 0;
    let interval;

    const startSlider = () => {
      interval = setInterval(() => {
        slides[currentIndex].classList.remove('active');
        if (indicators[currentIndex]) indicators[currentIndex].classList.remove('active');

        currentIndex = (currentIndex + 1) % slides.length;

        slides[currentIndex].classList.add('active');
        if (indicators[currentIndex]) indicators[currentIndex].classList.add('active');
      }, 3000);
    };

    const stopSlider = () => {
      clearInterval(interval);
    };

    card.addEventListener('mouseenter', stopSlider);
    card.addEventListener('mouseleave', startSlider);

    // Initial start
    startSlider();
    state.intervals.push(interval);
  });
}

function applyFilters() {
  let items = PROJECTS.slice();

  if (state.filter !== 'all') {
    items = items.filter(p => p.category === state.filter);
  }

  if (state.query) {
    const q = state.query.toLowerCase();
    items = items.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  if (state.sort === 'newest') {
    items.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (state.sort === 'oldest') {
    items.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (state.sort === 'category') {
    items.sort((a, b) => a.category.localeCompare(b.category));
  }

  state.items = items;
  renderGallery(items);
}

// Filters
if (filtersEl) {
  filtersEl.addEventListener('click', e => {
    const btn = e.target.closest('.filter');
    if (!btn) return;
    Array.from(filtersEl.querySelectorAll('.filter')).forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.filter = btn.dataset.filter === 'all' ? 'all' : btn.dataset.filter;
    applyFilters();
  });
}

// Search
if (searchEl) {
  let searchTimeout = null;
  searchEl.addEventListener('input', e => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      state.query = e.target.value.trim();
      applyFilters();
    }, 220);
  });
}

// Sort
if (sortEl) {
  sortEl.addEventListener('change', e => {
    state.sort = e.target.value;
    applyFilters();
  });
}

// Lightbox
const lbCounter = document.getElementById('lbCounter');
const lbDescription = document.getElementById('lbDescription');

function openLightbox(projectId, imageIndex = 0) {
  const project = PROJECTS.find(p => p.id === projectId);
  if (!project) return;

  state.currentProjectId = projectId;
  state.currentImageIndex = imageIndex;

  updateLightboxContent();
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function updateLightboxContent() {
  const project = PROJECTS.find(p => p.id === state.currentProjectId);
  if (!project) return;

  const image = project.images[state.currentImageIndex];

  lbImage.src = image.src;
  lbImage.alt = image.alt;
  lbTitle.textContent = project.title;
  lbCategory.textContent = project.category;
  lbDescription.textContent = project.description || '';
  lbCounter.textContent = `${state.currentImageIndex + 1} / ${project.images.length}`;

  // Hide nav arrows if only one image
  lbPrev.style.display = project.images.length > 1 ? 'flex' : 'none';
  lbNext.style.display = project.images.length > 1 ? 'flex' : 'none';
}

function closeLightbox() {
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  state.currentProjectId = null;
  state.currentImageIndex = 0;
}

function showNext(delta = 1) {
  const project = PROJECTS.find(p => p.id === state.currentProjectId);
  if (!project) return;

  state.currentImageIndex = (state.currentImageIndex + delta + project.images.length) % project.images.length;
  updateLightboxContent();
}

if (lightbox) {
  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', () => showNext(-1));
  lbNext.addEventListener('click', () => showNext(1));
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

  // Swipe support for lightbox
  let touchstartX = 0;
  let touchendX = 0;

  lightbox.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchendX < touchstartX - swipeThreshold) {
      showNext(1); // Swipe left -> Next
    }
    if (touchendX > touchstartX + swipeThreshold) {
      showNext(-1); // Swipe right -> Prev
    }
  }

  document.addEventListener('keydown', e => {
    if (lightbox.getAttribute('aria-hidden') === 'false') {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext(1);
      if (e.key === 'ArrowLeft') showNext(-1);
    }
  });
}

// Theme toggle logic removed. Site is permanently dark.

// Preloader and initial render
window.addEventListener('load', () => {
  // simulate small delay to show preloader
  setTimeout(() => {
    if (preloader) preloader.style.display = 'none';
    if (hasGallery) applyFilters();
  }, 600);
});

// Scroll to top button
if (toTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) toTopBtn.classList.add('show'); else toTopBtn.classList.remove('show');
  });
  toTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// Initialize small animation triggers for header text
setTimeout(() => {
  document.querySelector('.site-title').style.animationDelay = '0s';
  document.querySelector('.tagline').style.animationDelay = '.08s';
}, 200);

// Expose applyFilters for debugging
window._applyFilters = applyFilters;

// Header Scroll Interaction
let lastScrollY = window.scrollY;
const siteHeader = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  const scrollThreshold = 100;

  if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
    // Scrolling down
    siteHeader.classList.add('header-hidden');
  } else if (currentScrollY < lastScrollY) {
    // Scrolling up
    siteHeader.classList.remove('header-hidden');
  }

  lastScrollY = currentScrollY;
});

// Filter Bar Scroll Indicators
const filtersContainer = document.getElementById('filters');
const filterBar = filtersContainer?.parentElement;
if (filtersContainer && filterBar) {
  const updateScrollIndicators = () => {
    const scrollLeft = filtersContainer.scrollLeft;
    const maxScroll = filtersContainer.scrollWidth - filtersContainer.clientWidth;

    if (scrollLeft > 10) {
      filterBar.classList.add('can-scroll-left');
    } else {
      filterBar.classList.remove('can-scroll-left');
    }

    if (scrollLeft < maxScroll - 10) {
      filterBar.classList.add('can-scroll-right');
    } else {
      filterBar.classList.remove('can-scroll-right');
    }
  };

  filtersContainer.addEventListener('scroll', updateScrollIndicators);
  window.addEventListener('resize', updateScrollIndicators);
  // Initial check after content is likely rendered
  setTimeout(updateScrollIndicators, 1000);
}
