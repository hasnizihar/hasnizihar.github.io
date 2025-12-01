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

// Theme
const themeToggle = document.getElementById('themeToggle');

// Local dataset referencing images/ folder so the site is fully static
const IMAGES = [
  // {id:1,name:'Misty Mountain',category:'Photography',src:'images/photo-1.svg',year:2025},

  // {id:2,name:'City Lines',category:'Architecture',src:'images/photo-2.svg',year:2024},
  // {id:9,name:'Modern Bridge',category:'Architecture',src:'images/photo-9.svg',year:2025},

  // {id:3,name:'Smiling Faces',category:'People',src:'images/photo-3.svg',year:2023},

  // {id:4,name:'Desert Fox',category:'Animals',src:'images/photo-4.svg',year:2025},
  // {id:11,name:'Golden Retriever',category:'Animals',src:'images/photo-11.svg',year:2021},

  // {id:5,name:'Coastal Road',category:'Travel',src:'images/photo-5.svg',year:2022},
  // {id:10,name:'Waves',category:'Travel',src:'images/photo-10.svg',year:2023},

  // {id:6,name:'Cherry Feast',category:'Food',src:'images/photo-6.svg',year:2024},

  {id:7,name:'Bicycle - Abstract Art',category:'Abstract',src:'images/ab1.jpg',year:2023},
  {id:13,name:'Hi - Abstract Art',category:'Abstract',src:'images/ab2.jpg',year:2023},

  // {id:8,name:'Forest Trail',category:'Nature',src:'images/photo-8.svg',year:2021},
  
  // {id:12,name:'Street Food',category:'Logo',src:'images/photo-12.svg',year:2019},

  // grouped project demo: Hzgpd (single project card; variants live in GROUPS)
  {id:100,name:'Hzgpd — Logo Project',category:'Logo',src:'images/hzgpd-1.svg',year:2024, group:'Hzgpd'},
  {id:200,name:'Hacton — Logo Project',category:'Logo',src:'images/hacton/8.jpg',year:2023, group:'Hacton'},
  {id:300,name:'StarLoc — Logo Project',category:'Logo',src:'images/starloc/1.jpg',year:2024, group:'StarLoc'},
  {id:400,name:'Aizat - Logo Project',category:'Logo',src:'images/aizat/1.jpg',year:2022, group:'Aizat'},
  {id:500,name:'Hasni Zihar - Text Art',category:'Abstract',src:'images/hz/1.jpg',year:2020, group:'Hasni Zihar'},

];

// Groups: mapping group id -> variants (these are not rendered as separate gallery cards)
const GROUPS = {
  'Hzgpd': [
    {id:100, name:'Hzgpd — Primary logo Black', category:'Logo', src:'images/hzgpd/1.jpg', year:2024},
    {id:101, name:'Hzgpd — Primary logo White', category:'Logo', src:'images/hzgpd/2.jpg', year:2024}
  ],
  'Hacton': [
    {id:200, name:'Hacton — T-Shirt Mockup Black', category:'Logo', src:'images/hacton/1.jpg', year:2023},
    {id:201, name:'Hacton — T-Shirt Mockup White', category:'Logo', src:'images/hacton/2.jpg', year:2023},
    {id:202, name:'Hacton — Cap Mockup White', category:'Logo', src:'images/hacton/3.jpg', year:2023},
    {id:203, name:'Hacton — Cap Mockup Black', category:'Logo', src:'images/hacton/4.jpg', year:2023},
    {id:204, name:'Hacton — Logo Pattern 1', category:'Logo', src:'images/hacton/5.jpg', year:2023},
    {id:205, name:'Hacton — Logo Pattern 2', category:'Logo', src:'images/hacton/6.jpg', year:2023},
    {id:206, name:'Hacton — Primary Logo White', category:'Logo', src:'images/hacton/7.jpg', year:2023},
    {id:207, name:'Hacton — Primary Logo Gray', category:'Logo', src:'images/hacton/8.jpg', year:2023},
    {id:208, name:'Hacton — H Logo White', category:'Logo', src:'images/hacton/9.jpg', year:2023},
    {id:209, name:'Hacton — H Logo Grey', category:'Logo', src:'images/hacton/10.jpg', year:2023}
  ],
  'StarLoc': [
    {id:300, name:'StarLoc — Primary Logo Icon', category:'Logo', src:'images/starloc/1.jpg', year:2024},
    {id:301, name:'StarLoc — Logo With Pattern', category:'Logo', src:'images/starloc/2.jpg', year:2024},
    {id:302, name:'StarLoc — Primary Logo Text', category:'Logo', src:'images/starloc/3.jpg', year:2024},
    {id:303, name:'StarLoc — Text Logo With Pattern', category:'Logo', src:'images/starloc/4.jpg', year:2024},
    {id:304, name:'StarLoc — Logo Pattern', category:'Logo', src:'images/starloc/5.jpg', year:2024},
    {id:305, name:'StarLoc — iPhone Mockup', category:'Logo', src:'images/starloc/6.jpg', year:2024},
    {id:306, name:'StarLoc — Bill Board Mockup', category:'Logo', src:'images/starloc/7.png', year:2024},
    {id:307, name:'StarLoc — Sticker Mockup', category:'Logo', src:'images/starloc/8.jpg', year:2024},
  ],
  'Aizat': [
    {id:400, name:'Aizat - Primary Logo', category:'Logo', src:'images/aizat/1.jpg', year:2022},
    {id:401, name:'Aizat - iPhone Mockup', category:'Logo', src:'images/aizat/2.jpg', year:2022},
    {id:402, name:'Aizat - Shopping Bag Mockup', category:'Logo', src:'images/aizat/3.jpg', year:2022}
  ],
  'Hasni Zihar': [
    {id:500, name:'Hasni Zihar - Text Art 1', category:'Abstract', src:'images/hz/1.jpg', year:2020},
    {id:501, name:'Hasni Zihar - Text Art 2', category:'Abstract', src:'images/hz/2.jpg', year:2020},
  ]
};

let state = {
  filter: 'all',
  query: '',
  sort: 'newest',
  items: IMAGES.slice(),
  currentIndex: -1,
};

function formatImgItem(item){
  // Use local images directly (SVG/JPG). data-src kept for lazy pattern.
  if(item.group){
    // Render inline slides for grouped project preview
    const group = GROUPS[item.group] || IMAGES.filter(i=>i.group===item.group);
    const slides = group.map((g,idx)=>`
      <div class="card-slide${idx===0? ' show' : ''}" data-src="${g.src}" data-id="${g.id}"><img loading="lazy" src="${g.src}" alt="${g.name}"/></div>
    `).join('');
    return `
      <article class="card show" data-id="${item.id}" data-category="${item.category}" data-name="${item.name}" data-group="${item.group || ''}" tabindex="0">
        <div class="card-slides" data-autoplay="true">${slides}</div>
        <div class="meta">
          <h4>${item.name}</h4>
          <p>${item.category} • ${item.year}</p>
        </div>
      </article>`;
  }
  return `
    <article class="card show" data-id="${item.id}" data-category="${item.category}" data-name="${item.name}" data-group="${item.group || ''}" tabindex="0">
      <img data-src="${item.src}" alt="${item.name}" loading="lazy" />
      <div class="meta">
        <h4>${item.name}</h4>
        <p>${item.category} • ${item.year}</p>
      </div>
    </article>`;
}

function renderGallery(items){
  galleryEl.innerHTML = items.map(formatImgItem).join('');
  // lazy-load images with fade-in
  galleryEl.querySelectorAll('img').forEach(img => {
    const ds = img.getAttribute('data-src');
    if(ds){
      img.onload = () => { img.style.opacity = '1' };
      img.src = ds;
    } else {
      // image already has a src (e.g. inline slide), mark visible
      img.style.opacity = '1';
    }
  });
  attachCardListeners();
}

function attachCardListeners(){
  galleryEl.querySelectorAll('.card').forEach((card, idx) => {
    card.addEventListener('click', ()=> openLightbox(parseInt(card.dataset.id)));
    card.addEventListener('keyup', e => { if(e.key==='Enter') openLightbox(parseInt(card.dataset.id)) });
  });
  // Initialize inline sliders for grouped previews
  galleryEl.querySelectorAll('.card .card-slides').forEach(slider => {
    const slides = slider.querySelectorAll('.card-slide');
    if(slides.length <= 1) return;
    let index = 0;
    let timer = setInterval(()=>{
      slides[index].classList.remove('show');
      index = (index + 1) % slides.length;
      slides[index].classList.add('show');
    }, 2500);
    slider.addEventListener('mouseenter', ()=> { if(timer) { clearInterval(timer); timer = null } });
    slider.addEventListener('mouseleave', ()=> { if(!timer) timer = setInterval(()=>{ slides[index].classList.remove('show'); index = (index + 1) % slides.length; slides[index].classList.add('show'); }, 2500) });
  });
}

function applyFilters(){
  let items = IMAGES.slice();
  if(state.filter !== 'all') items = items.filter(i => i.category === state.filter);
  if(state.query) items = items.filter(i => (i.name + ' ' + i.category).toLowerCase().includes(state.query.toLowerCase()));
  if(state.sort === 'newest') items.sort((a,b)=> b.year - a.year);
  if(state.sort === 'oldest') items.sort((a,b)=> a.year - b.year);
  if(state.sort === 'category') items.sort((a,b)=> a.category.localeCompare(b.category));
  state.items = items;
  // animate showing/hiding using classes
  renderGallery(items);
}

// Filters
filtersEl.addEventListener('click', e => {
  const btn = e.target.closest('.filter');
  if(!btn) return;
  Array.from(filtersEl.querySelectorAll('.filter')).forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  state.filter = btn.dataset.filter === 'all' ? 'all' : btn.dataset.filter;
  applyFilters();
});

// Search
let searchTimeout = null;
searchEl.addEventListener('input', e => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(()=>{
    state.query = e.target.value.trim();
    applyFilters();
  }, 220);
});

// Sort
sortEl.addEventListener('change', e => {
  state.sort = e.target.value;
  applyFilters();
});

// Lightbox controls
function openLightbox(id){
  // Find the clicked item from state.items
  const item = state.items.find(i => i.id === id);
  if(!item) return;

  // If item has a group, open a grouped slider showing all items with the same group
  if(item.group){
    const groupItems = GROUPS[item.group] || IMAGES.filter(i => i.group === item.group);
    if(groupItems && groupItems.length) {
      openGroupedSlider(groupItems, item.id);
      return;
    }
  }

  // Default single image lightbox
  const idx = state.items.findIndex(i=>i.id===id);
  if(idx < 0) return;
  state.currentIndex = idx;
  const sel = state.items[idx];
  lbImage.src = sel.src;
  lbImage.alt = sel.name;
  lbTitle.textContent = sel.name;
  lbCategory.textContent = sel.category;
  lightbox.setAttribute('aria-hidden','false');
}

function openGroupedSlider(items, startId){
  // Create a slider view inside the lightbox
  // Replace lbContent inner HTML with slider
  const sliderHtml = items.map((it, i) => `
    <div class="slide" data-id="${it.id}" style="display:${it.id===startId ? 'block' : 'none'}">
      <img src="${it.src}" alt="${it.name}" />
      <div class="lb-caption"><h3>${it.name}</h3><p>${it.category}</p></div>
    </div>
  `).join('');
  lbContent.innerHTML = sliderHtml;
  lightbox.setAttribute('aria-hidden','false');
  state.groupSlider = {items, index: items.findIndex(i=>i.id===startId)};
  updateGroupSlider();
  // Start autoplay for grouped slider
  if(state.groupSliderTimer) clearInterval(state.groupSliderTimer);
  state.groupSliderTimer = setInterval(()=>{
    showNext(1);
  }, 3000);
}

function updateGroupSlider(){
  const {items, index} = state.groupSlider || {};
  if(!items) return;
  const slides = document.querySelectorAll('.lb-content .slide');
  slides.forEach((s,i)=> s.style.display = (i===index ? 'block' : 'none'));
}

function closeLightbox(){
  lightbox.setAttribute('aria-hidden','true');
  // stop grouped autoplay if running
  if(state.groupSliderTimer){ clearInterval(state.groupSliderTimer); state.groupSliderTimer = null }
  // restore original lightbox content (single image layout) if it was replaced
  if(lbContent && lbContentOriginal){
    lbContent.innerHTML = lbContentOriginal;
    // re-query nodes that live inside lbContent
    lbImage = document.getElementById('lbImage');
    lbTitle = document.getElementById('lbTitle');
    lbCategory = document.getElementById('lbCategory');
    if(lbImage) lbImage.src = '';
  }
}

function showNext(delta=1){
  // If a grouped slider is active, navigate that
  if(state.groupSlider){
    const gs = state.groupSlider;
    gs.index = (gs.index + delta + gs.items.length) % gs.items.length;
    state.groupSlider = gs;
    updateGroupSlider();
    return;
  }

  if(state.currentIndex === -1) return;
  state.currentIndex = (state.currentIndex + delta + state.items.length) % state.items.length;
  const item = state.items[state.currentIndex];
  lbImage.src = item.src;
  lbTitle.textContent = item.name; lbCategory.textContent = item.category;
}

lbClose.addEventListener('click', ()=>{ closeLightbox(); state.groupSlider = null; });
lbPrev.addEventListener('click', ()=> showNext(-1));
lbNext.addEventListener('click', ()=> showNext(1));
lightbox.addEventListener('click', e => { if(e.target === lightbox) { closeLightbox(); state.groupSlider = null; } });
document.addEventListener('keydown', e => {
  if(lightbox.getAttribute('aria-hidden') === 'false'){
    if(e.key === 'Escape') { closeLightbox(); state.groupSlider = null; }
    if(e.key === 'ArrowRight') showNext(1);
    if(e.key === 'ArrowLeft') showNext(-1);
  }
});

// Theme toggle
function setTheme(isLight){
  document.documentElement.classList.toggle('light', isLight);
  themeToggle.setAttribute('aria-pressed', isLight ? 'true' : 'false');
}
themeToggle.addEventListener('click', ()=>{
  const isLight = !document.documentElement.classList.contains('light');
  setTheme(isLight);
  try{ localStorage.setItem('gallery_light', isLight ? '1' : '0') }catch(e){}
});
// read saved theme
try{ if(localStorage.getItem('gallery_light') === '1') setTheme(true) }catch(e){}

// Preloader and initial render
window.addEventListener('load', ()=>{
  // simulate small delay to show preloader
  setTimeout(()=>{
    preloader.style.display = 'none';
    applyFilters();
  }, 600);
});

// Scroll to top button
window.addEventListener('scroll', ()=>{
  if(window.scrollY > 400) toTopBtn.classList.add('show'); else toTopBtn.classList.remove('show');
});
toTopBtn.addEventListener('click', ()=> window.scrollTo({top:0,behavior:'smooth'}));

// Initialize small animation triggers for header text
setTimeout(()=>{
  document.querySelector('.site-title').style.animationDelay = '0s';
  document.querySelector('.tagline').style.animationDelay = '.08s';
}, 200);

// Expose applyFilters for debugging
window._applyFilters = applyFilters;
