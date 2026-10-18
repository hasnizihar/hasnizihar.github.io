/**
 * Liquid QR Studio 2.1 - Core Application Logic
 * Minimalist UX & Progressive Disclosure
 * 100% Client-Side Static Architecture
 */

(function () {
  'use strict';

  // --- 1. UTF-8 Support for qrcode-generator ---
  if (window.qrcode && window.qrcode.stringToBytesFuncs) {
    window.qrcode.stringToBytes = window.qrcode.stringToBytesFuncs['UTF-8'];
  }

  // --- 2. PWA Service Worker Registration ---
  if ('serviceWorker' in navigator && (window.location.protocol === 'http:' || window.location.protocol === 'https:')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(err => console.log('SW note:', err));
    });
  }

  // --- 3. Preset SVG Icons for Logo Injection ---
  const PRESET_ICONS = {
    link: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    wifi: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>`,
    vcard: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    whatsapp: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#25D366" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`,
    email: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`
  };

  // --- 4. Curated Design Templates ---
  const TEMPLATES = [
    {
      id: 'restaurant-menu',
      name: 'Coffee & Bistro Menu',
      desc: 'Warm amber tones with rounded dot modules and a "VIEW MENU" frame.',
      config: {
        type: 'url',
        fgColor: '#b45309',
        bgColor: '#fffbeb',
        isTransparentBg: false,
        isGradient: true,
        gradColor: '#d97706',
        gradDir: '135',
        bodyShape: 'rounded',
        eyeShape: 'rounded',
        frameStyle: 'bottom-banner',
        frameLabel: 'VIEW MENU',
        frameBgColor: '#78350f',
        frameTextColor: '#ffffff',
        presetLogo: 'none',
        url: 'https://hasnizihar.github.io/menu'
      }
    },
    {
      id: 'executive-card',
      name: 'Executive Business Card',
      desc: 'Obsidian slate with classy diamond-cut modules and a "SAVE CONTACT" frame.',
      config: {
        type: 'vcard',
        fgColor: '#0f172a',
        bgColor: '#ffffff',
        isTransparentBg: false,
        isGradient: false,
        bodyShape: 'classy',
        eyeShape: 'square',
        customEyeColors: true,
        eyeOuterColor: '#0f172a',
        eyeInnerColor: '#0284c7',
        frameStyle: 'bottom-banner',
        frameLabel: 'SAVE CONTACT',
        frameBgColor: '#0f172a',
        frameTextColor: '#ffffff',
        presetLogo: 'vcard',
        vcardFn: 'Hasni',
        vcardLn: 'Zihar',
        vcardOrg: 'HzGPD',
        vcardTitle: 'Civil Engineer',
        vcardPhone: '+94 77 123 4567',
        vcardEmail: 'hasnizihar@example.com'
      }
    },
    {
      id: 'guest-wifi',
      name: 'High-Speed Guest Wi-Fi',
      desc: 'Mint to Cyan gradient with Wi-Fi center badge and "CONNECT WI-FI" CTA.',
      config: {
        type: 'wifi',
        fgColor: '#059669',
        bgColor: '#f0fdf4',
        isTransparentBg: false,
        isGradient: true,
        gradColor: '#06b6d4',
        gradDir: '135',
        bodyShape: 'circle',
        eyeShape: 'circle',
        frameStyle: 'top-banner',
        frameLabel: 'CONNECT WI-FI',
        frameBgColor: '#059669',
        frameTextColor: '#ffffff',
        presetLogo: 'wifi',
        wifiSsid: 'HzGPD_HighSpeed_Guest',
        wifiPass: 'Welcome2026!'
      }
    },
    {
      id: 'creative-portfolio',
      name: 'Creative Portfolio',
      desc: 'Royal violet with organic leaf patterns and full card display frame.',
      config: {
        type: 'url',
        fgColor: '#6d28d9',
        bgColor: '#faf5ff',
        isTransparentBg: false,
        isGradient: true,
        gradColor: '#8b5cf6',
        gradDir: '135',
        bodyShape: 'leaf',
        eyeShape: 'rounded',
        frameStyle: 'full-card',
        frameLabel: 'MY PORTFOLIO',
        frameBgColor: '#5b21b6',
        frameTextColor: '#ffffff',
        presetLogo: 'link',
        url: 'https://hasnizihar.github.io/'
      }
    },
    {
      id: 'instagram-social',
      name: 'Instagram & Social Hub',
      desc: 'Vibrant sunset rose gradient with rounded frames and social CTA.',
      config: {
        type: 'social',
        fgColor: '#e11d48',
        bgColor: '#fff1f2',
        isTransparentBg: false,
        isGradient: true,
        gradColor: '#f97316',
        gradDir: '135',
        bodyShape: 'rounded',
        eyeShape: 'rounded',
        frameStyle: 'bottom-banner',
        frameLabel: 'FOLLOW US',
        frameBgColor: '#be123c',
        frameTextColor: '#ffffff',
        socialPlatform: 'instagram',
        socialHandle: 'ziharhasni'
      }
    },
    {
      id: 'crypto-payment',
      name: 'Crypto & Web3 Payment',
      desc: 'Indigo gradient with modern circle frames and "PAY HERE" prompt.',
      config: {
        type: 'crypto',
        fgColor: '#4338ca',
        bgColor: '#eef2ff',
        isTransparentBg: false,
        isGradient: true,
        gradColor: '#6366f1',
        gradDir: '90',
        bodyShape: 'circle',
        eyeShape: 'circle',
        frameStyle: 'bottom-banner',
        frameLabel: 'PAY HERE',
        frameBgColor: '#312e81',
        frameTextColor: '#ffffff',
        cryptoCoin: 'bitcoin',
        cryptoAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'
      }
    },
    {
      id: 'product-packaging',
      name: 'Eco Packaging Label',
      desc: 'Deep forest green high-contrast standard QR for labels and boxes.',
      config: {
        type: 'url',
        fgColor: '#14532d',
        bgColor: '#ffffff',
        isTransparentBg: false,
        isGradient: false,
        bodyShape: 'square',
        eyeShape: 'square',
        frameStyle: 'border',
        frameLabel: 'SCAN FOR INFO',
        frameBgColor: '#14532d',
        frameTextColor: '#ffffff',
        url: 'https://hasnizihar.github.io/'
      }
    },
    {
      id: 'liquid-night',
      name: 'Liquid Dark Minimalist',
      desc: 'Pure crisp white dots over deep midnight slate with soft cyan accent.',
      config: {
        type: 'url',
        fgColor: '#ffffff',
        bgColor: '#0f2027',
        isTransparentBg: false,
        isGradient: true,
        gradColor: '#6ee7f9',
        gradDir: '135',
        bodyShape: 'rounded',
        eyeShape: 'rounded',
        frameStyle: 'none',
        frameLabel: 'SCAN ME',
        frameBgColor: '#0f2027',
        frameTextColor: '#6ee7f9',
        presetLogo: 'none',
        url: 'https://hasnizihar.github.io/'
      }
    }
  ];

  // --- 5. Application State ---
  const state = {
    type: 'url',
    fgColor: '#0f172a',
    bgColor: '#ffffff',
    isTransparentBg: false,
    isGradient: false,
    gradColor: '#6ee7f9',
    gradDir: '135',
    customEyeColors: false,
    eyeOuterColor: '#0f172a',
    eyeInnerColor: '#0284c7',
    bodyShape: 'square',
    eyeShape: 'square',
    frameStyle: 'none',
    frameLabel: 'SCAN ME',
    frameBgColor: '#0f172a',
    frameTextColor: '#ffffff',
    presetLogo: 'none',
    customLogoImg: null,
    logoSize: 0.22,
    logoBadgeBg: true,
    errorCorrection: 'M',
    margin: 2,
    exportSize: 800,
    currentPayload: '',
    qrMatrix: null,
    socialPlatform: 'instagram'
  };

  let hzgpdLogoImg = new Image();
  hzgpdLogoImg.src = '../../Src/favicon-HzGPD.png';

  // --- 6. Undo / Redo History Stack ---
  const history = {
    undoStack: [],
    redoStack: [],
    isApplying: false,

    push() {
      if (this.isApplying) return;
      const snapshot = JSON.stringify({
        ...state,
        customLogoImg: null
      });
      if (this.undoStack.length > 0 && this.undoStack[this.undoStack.length - 1] === snapshot) {
        return;
      }
      this.undoStack.push(snapshot);
      if (this.undoStack.length > 30) this.undoStack.shift();
      this.redoStack = [];
      this.updateUI();
    },

    undo() {
      if (this.undoStack.length <= 1) return;
      const current = this.undoStack.pop();
      this.redoStack.push(current);
      const prev = this.undoStack[this.undoStack.length - 1];
      this.apply(prev);
    },

    redo() {
      if (this.redoStack.length === 0) return;
      const next = this.redoStack.pop();
      this.undoStack.push(next);
      this.apply(next);
    },

    apply(jsonStr) {
      if (!jsonStr) return;
      this.isApplying = true;
      try {
        const obj = JSON.parse(jsonStr);
        Object.assign(state, obj);
        syncStateToDOM();
        generateAndDrawQR();
      } catch (e) {
        console.error('History restore error', e);
      } finally {
        this.isApplying = false;
        this.updateUI();
      }
    },

    updateUI() {
      const undoBtn = document.getElementById('undo-btn');
      const redoBtn = document.getElementById('redo-btn');
      if (undoBtn) undoBtn.disabled = this.undoStack.length <= 1;
      if (redoBtn) redoBtn.disabled = this.redoStack.length === 0;
    }
  };

  // --- 7. IndexedDB Project Storage ---
  const DB_NAME = 'LiquidQR_DB';
  const DB_VERSION = 1;
  const STORE_NAME = 'projects';

  function openDatabase() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  async function dbSaveProject(title) {
    const db = await openDatabase();
    const canvas = document.getElementById('qr-canvas');
    const previewDataUrl = canvas ? canvas.toDataURL('image/png', 0.6) : '';
    const project = {
      id: 'proj_' + Date.now(),
      title: title || 'Untitled Project',
      date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      preview: previewDataUrl,
      state: {
        ...state,
        customLogoImg: null
      }
    };

    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(project);
      req.onsuccess = () => resolve(project);
      req.onerror = () => reject(req.error);
    });
  }

  async function dbGetAllProjects() {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  }

  async function dbDeleteProject(id) {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(id);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  // --- 8. DOM Elements ---
  const el = {
    navbar: document.getElementById('navbar'),
    themeToggle: document.getElementById('theme-toggle'),
    resetAllBtn: document.getElementById('reset-all-btn'),
    canvas: document.getElementById('qr-canvas'),
    emptyState: document.getElementById('empty-state'),
    contrastPill: document.getElementById('contrast-pill'),
    contrastVal: document.getElementById('contrast-val'),
    scanValidatorPill: document.getElementById('scan-validator-pill'),
    scanValidatorText: document.getElementById('scan-validator-text'),
    draftStatus: document.getElementById('draft-status'),

    // Top Navigation Links for Modals
    openTemplatesBtn: document.getElementById('open-templates-btn'),
    openScannerBtn: document.getElementById('open-scanner-btn'),
    openBatchBtn: document.getElementById('open-batch-btn'),
    openPdfBtn: document.getElementById('open-pdf-btn'),
    openProjectsBtn: document.getElementById('open-projects-btn'),
    saveProjectQuickBtn: document.getElementById('save-project-quick-btn'),
    undoBtn: document.getElementById('undo-btn'),
    redoBtn: document.getElementById('redo-btn'),

    // Content Type Selector & More Dropdown
    typePills: document.querySelectorAll('.type-pill:not(.more-pill)'),
    moreTypesBtn: document.getElementById('more-types-btn'),
    morePillLabel: document.getElementById('more-pill-label'),
    moreTypesMenu: document.getElementById('more-types-menu'),
    moreMenuItems: document.querySelectorAll('.more-menu-item'),
    tabPanels: document.querySelectorAll('.tab-panel'),

    // Form Inputs
    inputUrl: document.getElementById('input-url'),
    inputText: document.getElementById('input-text'),
    textCharCount: document.getElementById('text-char-count'),
    wifiSsid: document.getElementById('wifi-ssid'),
    wifiAuth: document.getElementById('wifi-auth'),
    wifiPass: document.getElementById('wifi-pass'),
    wifiHidden: document.getElementById('wifi-hidden'),
    wifiPasswordGroup: document.getElementById('wifi-password-group'),
    vcardFn: document.getElementById('vcard-fn'),
    vcardLn: document.getElementById('vcard-ln'),
    vcardOrg: document.getElementById('vcard-org'),
    vcardTitle: document.getElementById('vcard-title'),
    vcardPhone: document.getElementById('vcard-phone'),
    vcardEmail: document.getElementById('vcard-email'),
    vcardUrl: document.getElementById('vcard-url'),
    waPhone: document.getElementById('wa-phone'),
    waMsg: document.getElementById('wa-msg'),
    socialPlatformBtns: document.querySelectorAll('#social-platform-grid .social-opt-btn'),
    socialHandle: document.getElementById('social-handle'),
    mailTo: document.getElementById('mail-to'),
    mailSubject: document.getElementById('mail-subject'),
    mailBody: document.getElementById('mail-body'),
    eventTitle: document.getElementById('event-title'),
    eventStart: document.getElementById('event-start'),
    eventEnd: document.getElementById('event-end'),
    eventLocation: document.getElementById('event-location'),
    locLat: document.getElementById('loc-lat'),
    locLng: document.getElementById('loc-lng'),
    getCurrentLocBtn: document.getElementById('get-current-loc-btn'),
    cryptoCoin: document.getElementById('crypto-coin'),
    cryptoAddress: document.getElementById('crypto-address'),
    cryptoAmount: document.getElementById('crypto-amount'),
    phoneActionRadios: document.querySelectorAll('input[name="phone-action"]'),
    phoneNumber: document.getElementById('phone-number'),
    smsMessage: document.getElementById('sms-message'),
    smsTextGroup: document.getElementById('sms-text-group'),

    // Appearance & Progressive Disclosures
    swatchBtns: document.querySelectorAll('.swatch-btn'),
    toggleLogoSectionBtn: document.getElementById('toggle-logo-section-btn'),
    inlineLogoPanel: document.getElementById('inline-logo-panel'),
    toggleFrameSectionBtn: document.getElementById('toggle-frame-section-btn'),
    inlineFramePanel: document.getElementById('inline-frame-panel'),
    toggleAdvancedBtn: document.getElementById('toggle-advanced-btn'),
    advancedAccordionBody: document.getElementById('advanced-accordion-body'),

    // Advanced Design Controls
    fgColor: document.getElementById('fg-color'),
    fgHex: document.getElementById('fg-hex'),
    bgColor: document.getElementById('bg-color'),
    bgHex: document.getElementById('bg-hex'),
    bgTransparent: document.getElementById('bg-transparent'),
    gradientMode: document.getElementById('gradient-mode'),
    gradientBox: document.getElementById('gradient-box'),
    gradColor: document.getElementById('grad-color'),
    gradHex: document.getElementById('grad-hex'),
    gradDirBtns: document.querySelectorAll('#grad-dir-selector .grad-dir-btn'),
    customEyeColorsToggle: document.getElementById('custom-eye-colors-toggle'),
    eyeColorsPickers: document.getElementById('eye-colors-pickers'),
    eyeOuterColor: document.getElementById('eye-outer-color'),
    eyeInnerColor: document.getElementById('eye-inner-color'),
    bodyShapeBtns: document.querySelectorAll('#body-shape-selector .shape-opt'),
    eyeShapeBtns: document.querySelectorAll('#eye-shape-selector .shape-opt'),

    // Frame Controls
    frameOpts: document.querySelectorAll('#frame-selector .frame-opt'),
    frameControlsBox: document.getElementById('frame-controls-box'),
    frameLabelInput: document.getElementById('frame-label-input'),
    ctaPills: document.querySelectorAll('.cta-pill'),
    frameBgColor: document.getElementById('frame-bg-color'),
    frameTextColor: document.getElementById('frame-text-color'),

    // Logo Controls
    logoPresets: document.querySelectorAll('.logo-preset'),
    dropZone: document.getElementById('drop-zone'),
    logoFileInput: document.getElementById('logo-file-input'),
    fileLabel: document.getElementById('file-label'),
    removeLogoBtn: document.getElementById('remove-logo-btn'),
    logoOptionsGroup: document.getElementById('logo-options-group'),
    logoSizeSlider: document.getElementById('logo-size-slider'),
    logoSizeVal: document.getElementById('logo-size-val'),
    logoBadgeBg: document.getElementById('logo-badge-bg'),

    // Export Controls
    exportSize: document.getElementById('export-size'),
    errorCorrection: document.getElementById('error-correction'),
    marginSlider: document.getElementById('margin-slider'),
    marginVal: document.getElementById('margin-val'),
    rawPayloadDisplay: document.getElementById('raw-payload-display'),
    copyRawBtn: document.getElementById('copy-raw-btn'),
    btnDownloadPng: document.getElementById('btn-download-png'),
    btnDownloadSvg: document.getElementById('btn-download-svg'),
    btnCopyImage: document.getElementById('btn-copy-image'),

    // Modals
    scannerModal: document.getElementById('scanner-modal'),
    templatesModal: document.getElementById('templates-modal'),
    projectsModal: document.getElementById('projects-modal'),
    batchModal: document.getElementById('batch-modal'),
    pdfModal: document.getElementById('pdf-modal'),
    templateGalleryGrid: document.getElementById('template-gallery-grid'),
    projectsListGrid: document.getElementById('projects-list-grid'),
    exportProjectsJsonBtn: document.getElementById('export-projects-json-btn'),
    importProjectsFile: document.getElementById('import-projects-file'),

    // Scanner Elements
    scanCameraTabBtn: document.getElementById('scan-camera-tab-btn'),
    scanUploadTabBtn: document.getElementById('scan-upload-tab-btn'),
    cameraScannerSection: document.getElementById('camera-scanner-section'),
    uploadScannerSection: document.getElementById('upload-scanner-section'),
    cameraVideo: document.getElementById('camera-video'),
    startCameraBtn: document.getElementById('start-camera-btn'),
    stopCameraBtn: document.getElementById('stop-camera-btn'),
    scanDropZone: document.getElementById('scan-drop-zone'),
    scanFileInput: document.getElementById('scan-file-input'),
    scanResultCard: document.getElementById('scan-result-card'),
    scanDecodedText: document.getElementById('scan-decoded-text'),
    copyScanResultBtn: document.getElementById('copy-scan-result-btn'),
    importScanResultBtn: document.getElementById('import-scan-result-btn'),
    openScanLinkBtn: document.getElementById('open-scan-link-btn'),

    // Batch Elements
    batchItemsInput: document.getElementById('batch-items-input'),
    batchPrefixInput: document.getElementById('batch-prefix-input'),
    batchResSelect: document.getElementById('batch-res-select'),
    startBatchBtn: document.getElementById('start-batch-btn'),
    batchProgressBox: document.getElementById('batch-progress-box'),
    batchProgressFill: document.getElementById('batch-progress-fill'),
    batchProgressNum: document.getElementById('batch-progress-num'),

    // PDF Elements
    pdfLayoutCards: document.querySelectorAll('#pdf-layout-selector .pdf-layout-card'),
    pdfPageTitle: document.getElementById('pdf-page-title'),
    generatePdfBtn: document.getElementById('generate-pdf-btn'),

    toastContainer: document.getElementById('toast-container')
  };

  // --- 9. Debounced Render Helper with Draft Autosave ---
  let debounceTimer = null;
  let autoSaveTimer = null;

  function triggerRender(saveToHistory = true) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      generateAndDrawQR();
      if (saveToHistory) history.push();
      scheduleAutoSave();
    }, 60);
  }

  function scheduleAutoSave() {
    clearTimeout(autoSaveTimer);
    if (el.draftStatus) {
      el.draftStatus.classList.add('saving');
      const label = el.draftStatus.querySelector('.draft-label');
      if (label) label.textContent = 'Saving...';
    }
    autoSaveTimer = setTimeout(() => {
      autoSaveDraft();
      if (el.draftStatus) {
        el.draftStatus.classList.remove('saving');
        const label = el.draftStatus.querySelector('.draft-label');
        if (label) label.textContent = 'Draft saved';
      }
    }, 400);
  }

  function autoSaveDraft() {
    try {
      const draft = {
        state: { ...state, customLogoImg: null },
        payloads: {
          url: el.inputUrl?.value,
          text: el.inputText?.value,
          wifiSsid: el.wifiSsid?.value,
          wifiPass: el.wifiPass?.value,
          wifiAuth: el.wifiAuth?.value,
          wifiHidden: el.wifiHidden?.checked,
          vcardFn: el.vcardFn?.value,
          vcardLn: el.vcardLn?.value,
          vcardOrg: el.vcardOrg?.value,
          vcardTitle: el.vcardTitle?.value,
          vcardPhone: el.vcardPhone?.value,
          vcardEmail: el.vcardEmail?.value,
          vcardUrl: el.vcardUrl?.value,
          waPhone: el.waPhone?.value,
          waMsg: el.waMsg?.value,
          socialHandle: el.socialHandle?.value,
          mailTo: el.mailTo?.value,
          mailSubject: el.mailSubject?.value,
          mailBody: el.mailBody?.value,
          eventTitle: el.eventTitle?.value,
          eventStart: el.eventStart?.value,
          eventEnd: el.eventEnd?.value,
          eventLocation: el.eventLocation?.value,
          locLat: el.locLat?.value,
          locLng: el.locLng?.value,
          cryptoCoin: el.cryptoCoin?.value,
          cryptoAddress: el.cryptoAddress?.value,
          cryptoAmount: el.cryptoAmount?.value,
          phoneNumber: el.phoneNumber?.value,
          smsMessage: el.smsMessage?.value
        }
      };
      localStorage.setItem('liquid_qr_draft_v2', JSON.stringify(draft));
      if (el.draftStatus) {
        el.draftStatus.style.opacity = '1';
      }
    } catch (e) {
      // Ignore localStorage exceptions (e.g., storage full or private mode)
    }
  }

  function restoreDraft() {
    try {
      const raw = localStorage.getItem('liquid_qr_draft_v2');
      if (!raw) return;
      const draft = JSON.parse(raw);
      if (draft && draft.state) {
        Object.assign(state, draft.state);
        syncStateToDOM();
      }
      if (draft && draft.payloads) {
        const p = draft.payloads;
        if (p.url && el.inputUrl) el.inputUrl.value = p.url;
        if (p.text && el.inputText) el.inputText.value = p.text;
        if (p.wifiSsid && el.wifiSsid) el.wifiSsid.value = p.wifiSsid;
        if (p.wifiPass && el.wifiPass) el.wifiPass.value = p.wifiPass;
        if (p.wifiAuth && el.wifiAuth) el.wifiAuth.value = p.wifiAuth;
        if (typeof p.wifiHidden === 'boolean' && el.wifiHidden) el.wifiHidden.checked = p.wifiHidden;
        if (p.vcardFn && el.vcardFn) el.vcardFn.value = p.vcardFn;
        if (p.vcardLn && el.vcardLn) el.vcardLn.value = p.vcardLn;
        if (p.vcardOrg && el.vcardOrg) el.vcardOrg.value = p.vcardOrg;
        if (p.vcardTitle && el.vcardTitle) el.vcardTitle.value = p.vcardTitle;
        if (p.vcardPhone && el.vcardPhone) el.vcardPhone.value = p.vcardPhone;
        if (p.vcardEmail && el.vcardEmail) el.vcardEmail.value = p.vcardEmail;
        if (p.vcardUrl && el.vcardUrl) el.vcardUrl.value = p.vcardUrl;
        if (p.waPhone && el.waPhone) el.waPhone.value = p.waPhone;
        if (p.waMsg && el.waMsg) el.waMsg.value = p.waMsg;
        if (p.socialHandle && el.socialHandle) el.socialHandle.value = p.socialHandle;
        if (p.mailTo && el.mailTo) el.mailTo.value = p.mailTo;
        if (p.mailSubject && el.mailSubject) el.mailSubject.value = p.mailSubject;
        if (p.mailBody && el.mailBody) el.mailBody.value = p.mailBody;
        if (p.eventTitle && el.eventTitle) el.eventTitle.value = p.eventTitle;
        if (p.eventStart && el.eventStart) el.eventStart.value = p.eventStart;
        if (p.eventEnd && el.eventEnd) el.eventEnd.value = p.eventEnd;
        if (p.eventLocation && el.eventLocation) el.eventLocation.value = p.eventLocation;
        if (p.locLat && el.locLat) el.locLat.value = p.locLat;
        if (p.locLng && el.locLng) el.locLng.value = p.locLng;
        if (p.cryptoCoin && el.cryptoCoin) el.cryptoCoin.value = p.cryptoCoin;
        if (p.cryptoAddress && el.cryptoAddress) el.cryptoAddress.value = p.cryptoAddress;
        if (p.cryptoAmount && el.cryptoAmount) el.cryptoAmount.value = p.cryptoAmount;
        if (p.phoneNumber && el.phoneNumber) el.phoneNumber.value = p.phoneNumber;
        if (p.smsMessage && el.smsMessage) el.smsMessage.value = p.smsMessage;
      }
    } catch (e) {
      console.warn('Draft restore note:', e);
    }
  }

  // --- 10. Contrast Ratio & WCAG Checker ---
  function hexToRgb(hex) {
    let clean = hex.replace('#', '');
    if (clean.length === 3) clean = clean.split('').map(c => c + c).join('');
    const num = parseInt(clean, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255
    };
  }

  function getLuminance(rgb) {
    const a = [rgb.r, rgb.g, rgb.b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }

  function getContrastRatio(hex1, hex2) {
    const l1 = getLuminance(hexToRgb(hex1));
    const l2 = getLuminance(hexToRgb(hex2));
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  }

  function updateContrastBadge() {
    const bg = state.isTransparentBg ? '#ffffff' : state.bgColor;
    const fg = state.fgColor;
    const ratio = getContrastRatio(fg, bg);
    const rounded = ratio.toFixed(1);

    el.contrastPill.className = 'metric-pill';
    if (ratio >= 4.5) {
      el.contrastPill.classList.add('success');
      el.contrastVal.textContent = `Contrast: Safe (${rounded}:1)`;
    } else if (ratio >= 2.8) {
      el.contrastPill.classList.add('warning');
      el.contrastVal.textContent = `Contrast: Moderate (${rounded}:1)`;
    } else {
      el.contrastPill.classList.add('danger');
      el.contrastVal.textContent = `Contrast: Low (${rounded}:1)`;
    }
  }

  // --- 11. Real-Time Scanability Verification via jsQR ---
  function verifyQRWithJsQR(canvas) {
    if (!window.jsQR || !canvas) return;
    try {
      const w = canvas.width;
      const h = canvas.height;
      if (w === 0 || h === 0) return;

      // Create a test canvas to composite transparent backgrounds onto white backing
      // so transparent PNG exports (intended for white print/surfaces) can be accurately analyzed
      let testImgData;
      if (state.isTransparentBg) {
        const testCanvas = document.createElement('canvas');
        testCanvas.width = w;
        testCanvas.height = h;
        const testCtx = testCanvas.getContext('2d');
        testCtx.fillStyle = '#ffffff';
        testCtx.fillRect(0, 0, w, h);
        testCtx.drawImage(canvas, 0, 0);
        testImgData = testCtx.getImageData(0, 0, w, h);
      } else {
        const ctx = canvas.getContext('2d');
        testImgData = ctx.getImageData(0, 0, w, h);
      }

      const code = window.jsQR(testImgData.data, w, h);
      el.scanValidatorPill.className = 'metric-pill';

      const contrastRatio = getContrastRatio(state.fgColor, state.isTransparentBg ? '#ffffff' : state.bgColor);

      if (code && code.data === state.currentPayload) {
        el.scanValidatorPill.classList.add('success');
        if (state.isTransparentBg) {
          el.scanValidatorText.textContent = '100% Readable (Light Surface)';
          el.scanValidatorPill.title = 'jsQR decoded payload accurately when placed against a light backing surface.';
        } else {
          el.scanValidatorText.textContent = '100% Readable';
          el.scanValidatorPill.title = 'jsQR decoded payload with 100% accuracy in real-time.';
        }
      } else {
        // Detailed failure diagnostics to help users fix issues
        if (contrastRatio < 2.8) {
          el.scanValidatorPill.classList.add('danger');
          el.scanValidatorText.textContent = 'Low Contrast Warning';
          el.scanValidatorPill.title = `Contrast ratio is only ${contrastRatio.toFixed(1)}:1. Standard cameras require at least 3:1 contrast.`;
        } else if (state.presetLogo !== 'none' || state.customLogoImg !== null) {
          el.scanValidatorPill.classList.add('warning');
          el.scanValidatorText.textContent = 'Logo Occlusion Warning';
          el.scanValidatorPill.title = 'Center logo may occlude critical matrix cells or finder patterns. Try reducing logo size.';
        } else if (contrastRatio >= 4.5 && state.fgColor === '#ffffff') {
          el.scanValidatorPill.classList.add('warning');
          el.scanValidatorText.textContent = 'Inverted QR Warning';
          el.scanValidatorPill.title = 'Inverted white-on-dark codes require a wide quiet zone (margin >= 4) for camera recognition.';
        } else {
          el.scanValidatorPill.classList.add('warning');
          el.scanValidatorText.textContent = 'Scan Unverified';
          el.scanValidatorPill.title = 'jsQR could not decode this design. Check colors, quiet zone, or module patterns.';
        }
      }
    } catch (e) {
      console.warn('Real-time scan analysis note:', e);
    }
  }

  // --- 12. Payload Construction Helper ---
  function computePayload() {
    switch (state.type) {
      case 'url':
        return el.inputUrl ? el.inputUrl.value.trim() : '';
      case 'text':
        return el.inputText ? el.inputText.value.trim() : '';
      case 'wifi': {
        const ssid = el.wifiSsid.value.trim();
        if (!ssid) return '';
        const auth = el.wifiAuth.value;
        const pass = el.wifiPass.value;
        const hidden = el.wifiHidden.checked;
        const esc = (s) => s.replace(/([\\;,:"])/g, '\\$1');
        let p = `WIFI:S:${esc(ssid)};T:${auth};`;
        if (auth !== 'nopass') p += `P:${esc(pass)};`;
        if (hidden) p += `H:true;`;
        p += ';';
        return p;
      }
      case 'vcard': {
        const fn = el.vcardFn.value.trim();
        const ln = el.vcardLn.value.trim();
        const org = el.vcardOrg.value.trim();
        const title = el.vcardTitle.value.trim();
        const phone = el.vcardPhone.value.trim();
        const email = el.vcardEmail.value.trim();
        const url = el.vcardUrl.value.trim();
        if (!fn && !ln && !phone && !email && !org) return '';
        let v = 'BEGIN:VCARD\nVERSION:3.0\n';
        v += `N:${ln};${fn};;;\n`;
        v += `FN:${[fn, ln].filter(Boolean).join(' ')}\n`;
        if (org) v += `ORG:${org}\n`;
        if (title) v += `TITLE:${title}\n`;
        if (phone) v += `TEL;TYPE=CELL:${phone}\n`;
        if (email) v += `EMAIL:${email}\n`;
        if (url) v += `URL:${url}\n`;
        v += 'END:VCARD';
        return v;
      }
      case 'whatsapp': {
        const phone = el.waPhone.value.replace(/[^0-9]/g, '');
        if (!phone) return '';
        const msg = el.waMsg.value.trim();
        return msg ? `https://wa.me/${phone}?text=${encodeURIComponent(msg)}` : `https://wa.me/${phone}`;
      }
      case 'social': {
        const handle = el.socialHandle.value.trim().replace(/^@/, '');
        if (!handle) return '';
        switch (state.socialPlatform) {
          case 'instagram': return `https://instagram.com/${handle}`;
          case 'linkedin': return `https://linkedin.com/in/${handle}`;
          case 'youtube': return `https://youtube.com/@${handle}`;
          case 'telegram': return `https://t.me/${handle}`;
          case 'github': return `https://github.com/${handle}`;
          case 'x': return `https://x.com/${handle}`;
          default: return `https://${handle}`;
        }
      }
      case 'email': {
        const to = el.mailTo.value.trim();
        if (!to) return '';
        const sub = el.mailSubject.value.trim();
        const body = el.mailBody.value.trim();
        let m = `mailto:${to}`;
        const params = [];
        if (sub) params.push(`subject=${encodeURIComponent(sub)}`);
        if (body) params.push(`body=${encodeURIComponent(body)}`);
        if (params.length) m += `?${params.join('&')}`;
        return m;
      }
      case 'event': {
        const title = el.eventTitle.value.trim();
        if (!title) return '';
        const start = el.eventStart.value ? el.eventStart.value.replace(/[-:]/g, '') + '00Z' : '';
        const end = el.eventEnd.value ? el.eventEnd.value.replace(/[-:]/g, '') + '00Z' : '';
        const loc = el.eventLocation.value.trim();
        let ev = 'BEGIN:VEVENT\n';
        ev += `SUMMARY:${title}\n`;
        if (start) ev += `DTSTART:${start}\n`;
        if (end) ev += `DTEND:${end}\n`;
        if (loc) ev += `LOCATION:${loc}\n`;
        ev += 'END:VEVENT';
        return ev;
      }
      case 'location': {
        const lat = el.locLat.value.trim();
        const lng = el.locLng.value.trim();
        if (!lat || !lng) return '';
        return `https://maps.google.com/?q=${lat},${lng}`;
      }
      case 'crypto': {
        const coin = el.cryptoCoin.value;
        const addr = el.cryptoAddress.value.trim();
        if (!addr) return '';
        const amt = el.cryptoAmount.value.trim();
        return amt ? `${coin}:${addr}?amount=${amt}` : `${coin}:${addr}`;
      }
      case 'phone': {
        const phone = el.phoneNumber.value.trim();
        if (!phone) return '';
        const action = document.querySelector('input[name="phone-action"]:checked')?.value || 'tel';
        if (action === 'sms') {
          const sms = el.smsMessage.value.trim();
          return `smsto:${phone}:${sms}`;
        }
        return `tel:${phone}`;
      }
      default:
        return '';
    }
  }

  function isFinderPattern(r, c, count) {
    if (r < 7 && c < 7) return true;
    if (r < 7 && c >= count - 7) return true;
    if (r >= count - 7 && c < 7) return true;
    return false;
  }

  // --- 13. QR Generation & Canvas Drawing ---
  function generateAndDrawQR() {
    const payload = computePayload();
    state.currentPayload = payload;

    if (!payload) {
      el.canvas.style.display = 'none';
      el.emptyState.style.display = 'flex';
      return;
    }

    el.canvas.style.display = 'block';
    el.emptyState.style.display = 'none';

    const hasLogo = (state.presetLogo !== 'none' || state.customLogoImg !== null);
    const ecLevel = hasLogo ? 'H' : state.errorCorrection;

    try {
      const qr = window.qrcode(0, ecLevel);
      qr.addData(payload);
      qr.make();
      state.qrMatrix = qr;
      drawQRWithFrame(el.canvas, 600);
      updateContrastBadge();
      verifyQRWithJsQR(el.canvas);
    } catch (err) {
      try {
        const qr = window.qrcode(40, 'L');
        qr.addData(payload);
        qr.make();
        state.qrMatrix = qr;
        drawQRWithFrame(el.canvas, 600);
        updateContrastBadge();
      } catch (e2) {
        console.error('QR creation failed', e2);
      }
    }

    if (el.rawPayloadDisplay) {
      el.rawPayloadDisplay.textContent = payload;
    }
  }

  // --- 14. Canvas Drawing with Frames & CTA ---
  function drawQRWithFrame(canvas, renderResolution) {
    const qr = state.qrMatrix;
    if (!qr) return;

    const count = qr.getModuleCount();
    const margin = state.margin;
    const totalModules = count + margin * 2;
    const qrSize = renderResolution;
    const modSize = qrSize / totalModules;

    const hasFrame = state.frameStyle !== 'none';
    const bannerHeight = Math.round(qrSize * 0.16);
    let canvasW = qrSize;
    let canvasH = qrSize;
    let qrOffsetY = 0;
    let qrOffsetX = 0;

    if (state.frameStyle === 'bottom-banner') {
      canvasH = qrSize + bannerHeight;
      qrOffsetY = 0;
    } else if (state.frameStyle === 'top-banner') {
      canvasH = qrSize + bannerHeight;
      qrOffsetY = bannerHeight;
    } else if (state.frameStyle === 'full-card') {
      const pad = Math.round(qrSize * 0.08);
      canvasW = qrSize + pad * 2;
      canvasH = qrSize + bannerHeight + pad * 2;
      qrOffsetX = pad;
      qrOffsetY = pad;
    } else if (state.frameStyle === 'bubble') {
      canvasH = qrSize + Math.round(bannerHeight * 0.9);
      qrOffsetY = 0;
    } else if (state.frameStyle === 'border') {
      const bPad = Math.round(qrSize * 0.06);
      canvasW = qrSize + bPad * 2;
      canvasH = qrSize + bPad * 2 + Math.round(bannerHeight * 0.6);
      qrOffsetX = bPad;
      qrOffsetY = bPad;
    }

    canvas.width = canvasW;
    canvas.height = canvasH;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // 1. Draw Outer Frame Background
    if (hasFrame) {
      ctx.fillStyle = state.frameBgColor;
      drawRoundedRect(ctx, 0, 0, canvasW, canvasH, 18);
    }

    // 2. Draw QR Background
    if (state.isTransparentBg && !hasFrame) {
      ctx.clearRect(0, 0, canvasW, canvasH);
    } else {
      ctx.fillStyle = state.bgColor;
      if (hasFrame) {
        drawRoundedRect(ctx, qrOffsetX, qrOffsetY, qrSize, qrSize, 14);
      } else {
        ctx.fillRect(0, 0, qrSize, qrSize);
      }
    }

    // 3. Prepare Foreground Paint (Gradient / Solid)
    let fillStyle;
    if (state.isGradient) {
      let grad;
      if (state.gradDir === 'radial') {
        const cx = qrOffsetX + qrSize / 2;
        const cy = qrOffsetY + qrSize / 2;
        grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, qrSize / 1.5);
      } else if (state.gradDir === '90') {
        grad = ctx.createLinearGradient(qrOffsetX, qrOffsetY, qrOffsetX + qrSize, qrOffsetY);
      } else if (state.gradDir === '180') {
        grad = ctx.createLinearGradient(qrOffsetX, qrOffsetY, qrOffsetX, qrOffsetY + qrSize);
      } else {
        grad = ctx.createLinearGradient(qrOffsetX, qrOffsetY, qrOffsetX + qrSize, qrOffsetY + qrSize);
      }
      grad.addColorStop(0, state.fgColor);
      grad.addColorStop(1, state.gradColor);
      fillStyle = grad;
    } else {
      fillStyle = state.fgColor;
    }

    // 4. Logo Exclusion Zone
    const hasLogo = (state.presetLogo !== 'none' || state.customLogoImg !== null);
    let logoModuleRadius = 0;
    const center = (count - 1) / 2;
    if (hasLogo) {
      logoModuleRadius = Math.ceil((count * state.logoSize) / 2) + 0.5;
    }

    function isInsideLogo(r, c) {
      if (!hasLogo) return false;
      return (Math.abs(r - center) <= logoModuleRadius && Math.abs(c - center) <= logoModuleRadius);
    }

    // 5. Draw Finder Pattern Eyes
    const outerEyeColor = state.customEyeColors ? state.eyeOuterColor : fillStyle;
    const innerEyeColor = state.customEyeColors ? state.eyeInnerColor : fillStyle;

    drawFinderEye(ctx, qrOffsetX, qrOffsetY, margin, margin, modSize, outerEyeColor, innerEyeColor, state.eyeShape);
    drawFinderEye(ctx, qrOffsetX, qrOffsetY, (margin + count - 7), margin, modSize, outerEyeColor, innerEyeColor, state.eyeShape);
    drawFinderEye(ctx, qrOffsetX, qrOffsetY, margin, (margin + count - 7), modSize, outerEyeColor, innerEyeColor, state.eyeShape);

    // 6. Draw Body Modules
    ctx.fillStyle = fillStyle;

    for (let r = 0; r < count; r++) {
      for (let c = 0; c < count; c++) {
        if (isFinderPattern(r, c, count)) continue;
        if (isInsideLogo(r, c)) continue;

        if (qr.isDark(r, c)) {
          const x = qrOffsetX + (c + margin) * modSize;
          const y = qrOffsetY + (r + margin) * modSize;

          switch (state.bodyShape) {
            case 'rounded':
              drawRoundedRect(ctx, x, y, modSize, modSize, modSize * 0.35);
              break;
            case 'circle':
              ctx.beginPath();
              ctx.arc(x + modSize / 2, y + modSize / 2, modSize * 0.44, 0, Math.PI * 2);
              ctx.fill();
              break;
            case 'classy':
              ctx.save();
              ctx.translate(x + modSize / 2, y + modSize / 2);
              ctx.rotate(Math.PI / 4);
              ctx.fillRect(-modSize * 0.38, -modSize * 0.38, modSize * 0.76, modSize * 0.76);
              ctx.restore();
              break;
            case 'leaf':
              ctx.beginPath();
              drawLeafTile(ctx, x, y, modSize, modSize * 0.5);
              ctx.fill();
              break;
            case 'connected':
              drawRoundedRect(ctx, x + 0.5, y + 0.5, modSize - 1, modSize - 1, modSize * 0.2);
              break;
            default:
              ctx.fillRect(x, y, modSize, modSize);
              break;
          }
        }
      }
    }

    // 7. Draw Logo & Center Badge
    if (hasLogo) {
      const qrPixelSize = count * modSize;
      const logoPixelSize = qrPixelSize * state.logoSize;
      const badgePixelSize = logoPixelSize + modSize * 1.6;
      const centerX = qrOffsetX + (qrSize / 2);
      const centerY = qrOffsetY + (qrSize / 2);

      if (state.logoBadgeBg) {
        ctx.fillStyle = state.isTransparentBg ? '#ffffff' : state.bgColor;
        const badgeX = centerX - badgePixelSize / 2;
        const badgeY = centerY - badgePixelSize / 2;
        drawRoundedRect(ctx, badgeX, badgeY, badgePixelSize, badgePixelSize, badgePixelSize * 0.25);
      }

      const logoX = centerX - logoPixelSize / 2;
      const logoY = centerY - logoPixelSize / 2;

      if (state.customLogoImg) {
        ctx.drawImage(state.customLogoImg, logoX, logoY, logoPixelSize, logoPixelSize);
      } else if (state.presetLogo === 'hzgpd') {
        if (hzgpdLogoImg.complete && hzgpdLogoImg.naturalWidth > 0) {
          ctx.drawImage(hzgpdLogoImg, logoX, logoY, logoPixelSize, logoPixelSize);
        }
      } else if (PRESET_ICONS[state.presetLogo]) {
        drawSvgStringToCanvas(ctx, PRESET_ICONS[state.presetLogo], logoX, logoY, logoPixelSize);
      }
    }

    // 8. Draw Frame Labels & Badges
    if (hasFrame) {
      ctx.fillStyle = state.frameTextColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = `700 ${Math.round(bannerHeight * 0.32)}px Inter, sans-serif`;

      const labelText = (state.frameLabel || 'SCAN ME').toUpperCase();

      if (state.frameStyle === 'bottom-banner') {
        const textY = qrSize + bannerHeight / 2;
        ctx.fillText(labelText, canvasW / 2, textY);
      } else if (state.frameStyle === 'top-banner') {
        const textY = bannerHeight / 2;
        ctx.fillText(labelText, canvasW / 2, textY);
      } else if (state.frameStyle === 'full-card') {
        const textY = qrOffsetY + qrSize + bannerHeight / 2;
        ctx.fillText(labelText, canvasW / 2, textY);
      } else if (state.frameStyle === 'bubble') {
        const textY = qrSize + (canvasH - qrSize) / 2;
        ctx.fillText(labelText, canvasW / 2, textY);
      } else if (state.frameStyle === 'border') {
        const textY = qrOffsetY + qrSize + (canvasH - (qrOffsetY + qrSize)) / 2;
        ctx.fillText(labelText, canvasW / 2, textY);
      }
    }
  }

  function drawLeafTile(ctx, x, y, size, r) {
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + size, y);
    ctx.lineTo(x + size, y + size - r);
    ctx.arcTo(x + size, y + size, x + size - r, y + size, r);
    ctx.lineTo(x, y + size);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
  }

  function drawFinderEye(ctx, offX, offY, col, row, modSize, outerColor, innerColor, shape) {
    const x = offX + col * modSize;
    const y = offY + row * modSize;
    const eyeSize = 7 * modSize;
    const border = modSize;

    ctx.save();

    if (shape === 'circle') {
      ctx.fillStyle = outerColor;
      ctx.beginPath();
      ctx.arc(x + eyeSize / 2, y + eyeSize / 2, eyeSize / 2, 0, Math.PI * 2);
      ctx.arc(x + eyeSize / 2, y + eyeSize / 2, eyeSize / 2 - border, 0, Math.PI * 2, true);
      ctx.fill();

      ctx.fillStyle = innerColor;
      ctx.beginPath();
      ctx.arc(x + eyeSize / 2, y + eyeSize / 2, 1.5 * modSize, 0, Math.PI * 2);
      ctx.fill();
    } else if (shape === 'rounded') {
      ctx.fillStyle = outerColor;
      ctx.beginPath();
      roundRectPath(ctx, x, y, eyeSize, eyeSize, modSize * 2);
      roundRectPath(ctx, x + border, y + border, eyeSize - border * 2, eyeSize - border * 2, modSize * 1.2, true);
      ctx.fill('evenodd');

      ctx.fillStyle = innerColor;
      drawRoundedRect(ctx, x + 2 * modSize, y + 2 * modSize, 3 * modSize, 3 * modSize, modSize * 1.1);
    } else {
      ctx.fillStyle = outerColor;
      ctx.fillRect(x, y, eyeSize, eyeSize);
      ctx.clearRect(x + border, y + border, eyeSize - border * 2, eyeSize - border * 2);
      if (!state.isTransparentBg) {
        ctx.fillStyle = state.bgColor;
        ctx.fillRect(x + border, y + border, eyeSize - border * 2, eyeSize - border * 2);
      }
      ctx.fillStyle = innerColor;
      ctx.fillRect(x + 2 * modSize, y + 2 * modSize, 3 * modSize, 3 * modSize);
    }

    ctx.restore();
  }

  function roundRectPath(ctx, x, y, w, h, r, reverse = false) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    ctx.moveTo(x + r, y);
    if (!reverse) {
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
    } else {
      ctx.arcTo(x, y, x, y + h, r);
      ctx.arcTo(x, y + h, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x + w, y, r);
      ctx.arcTo(x + w, y, x, y, r);
    }
    ctx.closePath();
  }

  function drawRoundedRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    roundRectPath(ctx, x, y, w, h, r);
    ctx.fill();
  }

  function drawSvgStringToCanvas(ctx, svgString, x, y, size) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, 'image/svg+xml');
    const svgElem = doc.querySelector('svg');
    if (!svgElem) return;

    const img = new Image();
    const xml = new XMLSerializer().serializeToString(svgElem);
    const svg64 = btoa(unescape(encodeURIComponent(xml)));
    img.onload = () => {
      ctx.drawImage(img, x, y, size, size);
    };
    img.src = 'data:image/svg+xml;base64,' + svg64;
  }

  function escapeXml(s) {
    return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // --- 15. Scalable SVG Vector Generator (100% Scannable) ---
  function generateSVGMarkup() {
    const qr = state.qrMatrix;
    if (!qr) return '';

    const count = qr.getModuleCount();
    const margin = state.margin;
    const qrSize = 600;
    const totalModules = count + margin * 2;
    const modSize = qrSize / totalModules;

    const hasFrame = state.frameStyle !== 'none';
    const bannerHeight = Math.round(qrSize * 0.16);

    let svgW = qrSize;
    let svgH = qrSize;
    let qrOffsetX = 0;
    let qrOffsetY = 0;

    if (state.frameStyle === 'bottom-banner') {
      svgH = qrSize + bannerHeight;
      qrOffsetY = 0;
    } else if (state.frameStyle === 'top-banner') {
      svgH = qrSize + bannerHeight;
      qrOffsetY = bannerHeight;
    } else if (state.frameStyle === 'full-card') {
      const pad = Math.round(qrSize * 0.08);
      svgW = qrSize + pad * 2;
      svgH = qrSize + bannerHeight + pad * 2;
      qrOffsetX = pad;
      qrOffsetY = pad;
    } else if (state.frameStyle === 'bubble') {
      svgH = qrSize + Math.round(bannerHeight * 0.9);
      qrOffsetY = 0;
    } else if (state.frameStyle === 'border') {
      const bPad = Math.round(qrSize * 0.06);
      svgW = qrSize + bPad * 2;
      svgH = qrSize + bPad * 2 + Math.round(bannerHeight * 0.6);
      qrOffsetX = bPad;
      qrOffsetY = bPad;
    }

    let svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${svgW} ${svgH}" width="${svgW}" height="${svgH}">\n`;
    svg += `  <defs>\n`;
    if (state.isGradient) {
      if (state.gradDir === 'radial') {
        svg += `    <radialGradient id="qrGrad" cx="50%" cy="50%" r="50%">\n`;
      } else if (state.gradDir === '90') {
        svg += `    <linearGradient id="qrGrad" x1="0%" y1="0%" x2="100%" y2="0%">\n`;
      } else if (state.gradDir === '180') {
        svg += `    <linearGradient id="qrGrad" x1="0%" y1="0%" x2="0%" y2="100%">\n`;
      } else {
        svg += `    <linearGradient id="qrGrad" x1="0%" y1="0%" x2="100%" y2="100%">\n`;
      }
      svg += `      <stop offset="0%" stop-color="${state.fgColor}" />\n`;
      svg += `      <stop offset="100%" stop-color="${state.gradColor}" />\n`;
      svg += (state.gradDir === 'radial') ? `    </radialGradient>\n` : `    </linearGradient>\n`;
    }
    svg += `  </defs>\n`;

    // 1. Draw Outer Frame Background
    if (hasFrame) {
      svg += `  <rect width="${svgW}" height="${svgH}" rx="18" fill="${state.frameBgColor || '#0f172a'}" />\n`;
    }

    // 2. Draw QR Background
    if (!state.isTransparentBg || hasFrame) {
      svg += `  <rect x="${qrOffsetX}" y="${qrOffsetY}" width="${qrSize}" height="${qrSize}" rx="${hasFrame ? 14 : 0}" fill="${state.bgColor || '#ffffff'}" />\n`;
    }

    const fillAttr = state.isGradient ? 'url(#qrGrad)' : state.fgColor;

    // 3. Draw 3 Finder Pattern Eyes (Outer frame, cutout, and pupil)
    const outerEyeColor = state.customEyeColors ? state.eyeOuterColor : fillAttr;
    const innerEyeColor = state.customEyeColors ? state.eyeInnerColor : fillAttr;
    const bgFill = state.isTransparentBg && !hasFrame ? '#ffffff' : (state.bgColor || '#ffffff');

    const eyes = [
      { col: margin, row: margin },
      { col: margin + count - 7, row: margin },
      { col: margin, row: margin + count - 7 }
    ];

    for (const eye of eyes) {
      const x = qrOffsetX + eye.col * modSize;
      const y = qrOffsetY + eye.row * modSize;
      const eyeSize = 7 * modSize;

      if (state.eyeShape === 'circle') {
        svg += `  <circle cx="${(x + eyeSize / 2).toFixed(2)}" cy="${(y + eyeSize / 2).toFixed(2)}" r="${(eyeSize / 2).toFixed(2)}" fill="${outerEyeColor}" />\n`;
        svg += `  <circle cx="${(x + eyeSize / 2).toFixed(2)}" cy="${(y + eyeSize / 2).toFixed(2)}" r="${(eyeSize / 2 - modSize).toFixed(2)}" fill="${bgFill}" />\n`;
        svg += `  <circle cx="${(x + eyeSize / 2).toFixed(2)}" cy="${(y + eyeSize / 2).toFixed(2)}" r="${(1.5 * modSize).toFixed(2)}" fill="${innerEyeColor}" />\n`;
      } else if (state.eyeShape === 'rounded') {
        svg += `  <rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${eyeSize.toFixed(2)}" height="${eyeSize.toFixed(2)}" rx="${(modSize * 2).toFixed(2)}" fill="${outerEyeColor}" />\n`;
        svg += `  <rect x="${(x + modSize).toFixed(2)}" y="${(y + modSize).toFixed(2)}" width="${(eyeSize - 2 * modSize).toFixed(2)}" height="${(eyeSize - 2 * modSize).toFixed(2)}" rx="${(modSize * 1.2).toFixed(2)}" fill="${bgFill}" />\n`;
        svg += `  <rect x="${(x + 2 * modSize).toFixed(2)}" y="${(y + 2 * modSize).toFixed(2)}" width="${(3 * modSize).toFixed(2)}" height="${(3 * modSize).toFixed(2)}" rx="${(modSize * 1.1).toFixed(2)}" fill="${innerEyeColor}" />\n`;
      } else {
        svg += `  <rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${eyeSize.toFixed(2)}" height="${eyeSize.toFixed(2)}" fill="${outerEyeColor}" />\n`;
        svg += `  <rect x="${(x + modSize).toFixed(2)}" y="${(y + modSize).toFixed(2)}" width="${(eyeSize - 2 * modSize).toFixed(2)}" height="${(eyeSize - 2 * modSize).toFixed(2)}" fill="${bgFill}" />\n`;
        svg += `  <rect x="${(x + 2 * modSize).toFixed(2)}" y="${(y + 2 * modSize).toFixed(2)}" width="${(3 * modSize).toFixed(2)}" height="${(3 * modSize).toFixed(2)}" fill="${innerEyeColor}" />\n`;
      }
    }

    // 4. Logo Exclusion Zone
    const hasLogo = (state.presetLogo !== 'none' || state.customLogoImg !== null);
    const center = (count - 1) / 2;
    const logoModuleRadius = hasLogo ? (Math.ceil((count * state.logoSize) / 2) + 0.5) : 0;

    // 5. Draw Body Modules
    for (let r = 0; r < count; r++) {
      for (let c = 0; c < count; c++) {
        if (isFinderPattern(r, c, count)) continue;
        if (hasLogo && Math.abs(r - center) <= logoModuleRadius && Math.abs(c - center) <= logoModuleRadius) continue;

        if (qr.isDark(r, c)) {
          const x = qrOffsetX + (c + margin) * modSize;
          const y = qrOffsetY + (r + margin) * modSize;

          if (state.bodyShape === 'circle') {
            svg += `  <circle cx="${(x + modSize / 2).toFixed(2)}" cy="${(y + modSize / 2).toFixed(2)}" r="${(modSize * 0.44).toFixed(2)}" fill="${fillAttr}" />\n`;
          } else if (state.bodyShape === 'rounded') {
            svg += `  <rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${modSize.toFixed(2)}" height="${modSize.toFixed(2)}" rx="${(modSize * 0.35).toFixed(2)}" fill="${fillAttr}" />\n`;
          } else if (state.bodyShape === 'connected') {
            svg += `  <rect x="${(x + 0.5).toFixed(2)}" y="${(y + 0.5).toFixed(2)}" width="${(modSize - 1).toFixed(2)}" height="${(modSize - 1).toFixed(2)}" rx="${(modSize * 0.2).toFixed(2)}" fill="${fillAttr}" />\n`;
          } else if (state.bodyShape === 'classy') {
            const cx = x + modSize / 2;
            const cy = y + modSize / 2;
            const s = modSize * 0.76;
            svg += `  <rect x="${(cx - s / 2).toFixed(2)}" y="${(cy - s / 2).toFixed(2)}" width="${s.toFixed(2)}" height="${s.toFixed(2)}" transform="rotate(45, ${cx.toFixed(2)}, ${cy.toFixed(2)})" fill="${fillAttr}" />\n`;
          } else {
            svg += `  <rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${modSize.toFixed(2)}" height="${modSize.toFixed(2)}" fill="${fillAttr}" />\n`;
          }
        }
      }
    }

    // 6. Center Logo Badge & Icon
    if (hasLogo) {
      const qrPixelSize = count * modSize;
      const logoPixelSize = qrPixelSize * state.logoSize;
      const badgePixelSize = logoPixelSize + modSize * 1.6;
      const centerX = qrOffsetX + (qrSize / 2);
      const centerY = qrOffsetY + (qrSize / 2);

      if (state.logoBadgeBg) {
        const badgeX = centerX - badgePixelSize / 2;
        const badgeY = centerY - badgePixelSize / 2;
        svg += `  <rect x="${badgeX.toFixed(2)}" y="${badgeY.toFixed(2)}" width="${badgePixelSize.toFixed(2)}" height="${badgePixelSize.toFixed(2)}" rx="${(badgePixelSize * 0.25).toFixed(2)}" fill="${bgFill}" />\n`;
      }

      const logoX = centerX - logoPixelSize / 2;
      const logoY = centerY - logoPixelSize / 2;

      if (state.customLogoImg && state.customLogoImg.src) {
        svg += `  <image x="${logoX.toFixed(2)}" y="${logoY.toFixed(2)}" width="${logoPixelSize.toFixed(2)}" height="${logoPixelSize.toFixed(2)}" href="${state.customLogoImg.src}" />\n`;
      } else if (state.presetLogo === 'hzgpd' && hzgpdLogoImg.src) {
        svg += `  <image x="${logoX.toFixed(2)}" y="${logoY.toFixed(2)}" width="${logoPixelSize.toFixed(2)}" height="${logoPixelSize.toFixed(2)}" href="${hzgpdLogoImg.src}" />\n`;
      } else if (PRESET_ICONS[state.presetLogo]) {
        // Embed preset SVG icon
        svg += `  <g transform="translate(${logoX.toFixed(2)}, ${logoY.toFixed(2)}) scale(${(logoPixelSize / 24).toFixed(3)})">\n`;
        svg += `    ${PRESET_ICONS[state.presetLogo]}\n`;
        svg += `  </g>\n`;
      }
    }

    // 7. Frame Labels & Badges
    if (hasFrame) {
      const labelText = escapeXml((state.frameLabel || 'SCAN ME').toUpperCase());
      const fontSize = Math.round(bannerHeight * 0.32);
      let textY = qrSize + bannerHeight / 2;

      if (state.frameStyle === 'top-banner') {
        textY = bannerHeight / 2;
      } else if (state.frameStyle === 'full-card') {
        textY = qrOffsetY + qrSize + bannerHeight / 2;
      } else if (state.frameStyle === 'bubble' || state.frameStyle === 'border') {
        textY = qrSize + (svgH - qrSize) / 2;
      }

      svg += `  <text x="${(svgW / 2).toFixed(2)}" y="${textY.toFixed(2)}" fill="${state.frameTextColor || '#ffffff'}" font-family="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="${fontSize}" text-anchor="middle" dominant-baseline="central">${labelText}</text>\n`;
    }

    svg += `</svg>`;
    return svg;
  }

  // --- 16. State Sync to DOM ---
  function syncStateToDOM() {
    if (el.fgColor) el.fgColor.value = state.fgColor;
    if (el.fgHex) el.fgHex.textContent = state.fgColor.toUpperCase();
    if (el.bgColor) el.bgColor.value = state.bgColor;
    if (el.bgHex) el.bgHex.textContent = state.bgColor.toUpperCase();
    if (el.bgTransparent) el.bgTransparent.checked = state.isTransparentBg;
    if (el.gradientMode) el.gradientMode.checked = state.isGradient;
    if (el.gradientBox) el.gradientBox.style.display = state.isGradient ? 'block' : 'none';
    if (el.gradColor) el.gradColor.value = state.gradColor;
    if (el.customEyeColorsToggle) el.customEyeColorsToggle.checked = state.customEyeColors;
    if (el.eyeColorsPickers) el.eyeColorsPickers.style.display = state.customEyeColors ? 'grid' : 'none';
    if (el.eyeOuterColor) el.eyeOuterColor.value = state.eyeOuterColor;
    if (el.eyeInnerColor) el.eyeInnerColor.value = state.eyeInnerColor;
    if (el.frameLabelInput) el.frameLabelInput.value = state.frameLabel;
    if (el.frameBgColor) el.frameBgColor.value = state.frameBgColor;
    if (el.frameTextColor) el.frameTextColor.value = state.frameTextColor;

    // Body Shapes
    el.bodyShapeBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-shape') === state.bodyShape));
    // Eye Shapes
    el.eyeShapeBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-eye') === state.eyeShape));
    // Frames
    el.frameOpts.forEach(b => b.classList.toggle('active', b.getAttribute('data-frame') === state.frameStyle));
    if (el.frameControlsBox) el.frameControlsBox.style.display = state.frameStyle !== 'none' ? 'block' : 'none';

    // Type Tabs (Top 5 + More items)
    const standardTypes = ['url', 'text', 'wifi', 'vcard', 'whatsapp'];
    if (standardTypes.includes(state.type)) {
      el.typePills.forEach(b => b.classList.toggle('active', b.getAttribute('data-type') === state.type));
      if (el.moreTypesBtn) el.moreTypesBtn.classList.remove('active');
      if (el.morePillLabel) el.morePillLabel.textContent = 'More';
    } else {
      el.typePills.forEach(b => b.classList.remove('active'));
      if (el.moreTypesBtn) el.moreTypesBtn.classList.add('active');
      const moreItem = document.querySelector(`.more-menu-item[data-type="${state.type}"]`);
      if (moreItem && el.morePillLabel) {
        el.morePillLabel.textContent = moreItem.textContent;
      }
    }
    el.moreMenuItems.forEach(m => m.classList.toggle('active', m.getAttribute('data-type') === state.type));
    el.tabPanels.forEach(p => p.classList.toggle('active', p.id === `panel-${state.type}`));
  }

  // --- 17. Batch Generation (JSZip) ---
  el.startBatchBtn.addEventListener('click', async () => {
    const rawLines = el.batchItemsInput.value.split('\n').map(l => l.trim()).filter(Boolean);
    if (!rawLines.length) {
      showToast('Please enter at least one URL or data entry', 'error');
      return;
    }

    if (!window.JSZip) {
      showToast('JSZip library not available', 'error');
      return;
    }

    const zip = new window.JSZip();
    const prefix = el.batchPrefixInput.value.trim() || 'qr-code';
    const res = parseInt(el.batchResSelect.value) || 600;

    el.batchProgressBox.style.display = 'block';
    el.startBatchBtn.disabled = true;

    const tempCanvas = document.createElement('canvas');

    for (let i = 0; i < rawLines.length; i++) {
      const entry = rawLines[i];
      const percent = Math.round(((i + 1) / rawLines.length) * 100);
      el.batchProgressFill.style.width = `${percent}%`;
      el.batchProgressNum.textContent = `${percent}%`;

      try {
        const qr = window.qrcode(0, 'M');
        qr.addData(entry);
        qr.make();
        state.qrMatrix = qr;
        drawQRWithFrame(tempCanvas, res);

        const dataUrl = tempCanvas.toDataURL('image/png');
        const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
        zip.file(`${prefix}-${i + 1}.png`, base64Data, { base64: true });
      } catch (err) {
        console.warn(`Failed entry ${i}:`, entry);
      }
    }

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `liquid-qr-batch-${Date.now()}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    el.batchProgressBox.style.display = 'none';
    el.startBatchBtn.disabled = false;
    closeAllModals();
    showToast(`Packaged ${rawLines.length} QR codes into ZIP!`, 'success');
  });

  // --- 18. PDF & Print Sheet Designer (jsPDF) ---
  let selectedPdfLayout = 'single';

  el.pdfLayoutCards.forEach(card => {
    card.addEventListener('click', () => {
      el.pdfLayoutCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      selectedPdfLayout = card.getAttribute('data-layout');
    });
  });

  el.generatePdfBtn.addEventListener('click', () => {
    if (!window.jspdf || !window.jspdf.jsPDF) {
      showToast('PDF generator library not loaded', 'error');
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = 210;
    const pageHeight = 297;

    const exportCanvas = document.createElement('canvas');
    drawQRWithFrame(exportCanvas, 800);
    const imgData = exportCanvas.toDataURL('image/png');
    const title = el.pdfPageTitle.value.trim() || 'Scan to Connect • HzGPD';

    if (selectedPdfLayout === 'single') {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.text(title, pageWidth / 2, 35, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(100);
      doc.text('Scan with your mobile camera to access content', pageWidth / 2, 43, { align: 'center' });

      const qrWidth = 110;
      const qrHeight = (exportCanvas.height / exportCanvas.width) * qrWidth;
      const qrX = (pageWidth - qrWidth) / 2;
      const qrY = 60;
      doc.addImage(imgData, 'PNG', qrX, qrY, qrWidth, qrHeight);

      doc.setFontSize(9);
      doc.setTextColor(140);
      doc.text('Generated with Liquid QR Studio • hasnizihar.github.io', pageWidth / 2, 280, { align: 'center' });

    } else if (selectedPdfLayout === 'stickers-12') {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text(title, pageWidth / 2, 16, { align: 'center' });

      const cols = 3;
      const rows = 4;
      const startX = 15;
      const startY = 24;
      const stickerW = 54;
      const stickerH = (exportCanvas.height / exportCanvas.width) * stickerW;
      const gapX = 9;
      const gapY = 8;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = startX + c * (stickerW + gapX);
          const y = startY + r * (stickerH + gapY);

          doc.setDrawColor(220);
          doc.setLineWidth(0.2);
          doc.rect(x - 2, y - 2, stickerW + 4, stickerH + 4);

          doc.addImage(imgData, 'PNG', x, y, stickerW, stickerH);
        }
      }
    } else if (selectedPdfLayout === 'tent') {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('Foldable Display Tent', pageWidth / 2, 20, { align: 'center' });

      doc.setDrawColor(180);
      doc.setLineDashPattern([2, 2], 0);
      doc.line(10, pageHeight / 2, pageWidth - 10, pageHeight / 2);
      doc.setFontSize(9);
      doc.setTextColor(140);
      doc.text('FOLD LINE', pageWidth / 2, pageHeight / 2 - 2, { align: 'center' });

      const qrW = 75;
      const qrH = (exportCanvas.height / exportCanvas.width) * qrW;
      doc.addImage(imgData, 'PNG', (pageWidth - qrW) / 2, pageHeight / 2 + 25, qrW, qrH);
      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.text(title, pageWidth / 2, pageHeight / 2 + 15, { align: 'center' });
    }

    doc.save(`liquid-qr-print-${Date.now()}.pdf`);
    closeAllModals();
    showToast('Print-ready PDF downloaded!', 'success');
  });

  // --- 19. QR Scanner & Decoder ---
  let cameraStream = null;
  let cameraAnimationId = null;

  el.scanCameraTabBtn.addEventListener('click', () => {
    el.scanCameraTabBtn.classList.add('active');
    el.scanUploadTabBtn.classList.remove('active');
    el.cameraScannerSection.style.display = 'block';
    el.uploadScannerSection.style.display = 'none';
  });

  el.scanUploadTabBtn.addEventListener('click', () => {
    el.scanUploadTabBtn.classList.add('active');
    el.scanCameraTabBtn.classList.remove('active');
    el.uploadScannerSection.style.display = 'block';
    el.cameraScannerSection.style.display = 'none';
    stopCameraStream();
  });

  el.startCameraBtn.addEventListener('click', async () => {
    try {
      cameraStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      el.cameraVideo.srcObject = cameraStream;
      await el.cameraVideo.play();
      el.startCameraBtn.style.display = 'none';
      el.stopCameraBtn.style.display = 'inline-flex';
      scanCameraFrameLoop();
    } catch (e) {
      showToast('Camera access denied or unavailable: ' + e.message, 'error');
    }
  });

  function stopCameraStream() {
    if (cameraAnimationId) cancelAnimationFrame(cameraAnimationId);
    if (cameraStream) {
      cameraStream.getTracks().forEach(t => t.stop());
      cameraStream = null;
    }
    el.startCameraBtn.style.display = 'inline-flex';
    el.stopCameraBtn.style.display = 'none';
  }

  el.stopCameraBtn.addEventListener('click', stopCameraStream);

  function scanCameraFrameLoop() {
    if (!cameraStream || el.cameraVideo.readyState !== el.cameraVideo.HAVE_ENOUGH_DATA) {
      cameraAnimationId = requestAnimationFrame(scanCameraFrameLoop);
      return;
    }

    const c = document.createElement('canvas');
    c.width = el.cameraVideo.videoWidth;
    c.height = el.cameraVideo.videoHeight;
    const ctx = c.getContext('2d');
    ctx.drawImage(el.cameraVideo, 0, 0, c.width, c.height);

    if (window.jsQR) {
      const imgData = ctx.getImageData(0, 0, c.width, c.height);
      const code = window.jsQR(imgData.data, c.width, c.height);
      if (code && code.data) {
        handleDecodedQR(code.data);
        stopCameraStream();
        return;
      }
    }
    cameraAnimationId = requestAnimationFrame(scanCameraFrameLoop);
  }

  // Upload decoding
  el.scanDropZone.addEventListener('click', () => el.scanFileInput.click());
  el.scanFileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      decodeUploadedFile(e.target.files[0]);
    }
  });

  function decodeUploadedFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const c = document.createElement('canvas');
        c.width = img.naturalWidth;
        c.height = img.naturalHeight;
        const ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0);

        if (window.jsQR) {
          const imgData = ctx.getImageData(0, 0, c.width, c.height);
          const code = window.jsQR(imgData.data, c.width, c.height);
          if (code && code.data) {
            handleDecodedQR(code.data);
          } else {
            showToast('No QR code detected in this image', 'error');
          }
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  function handleDecodedQR(text) {
    el.scanResultCard.style.display = 'block';
    el.scanDecodedText.textContent = text;

    if (text.startsWith('http://') || text.startsWith('https://')) {
      el.openScanLinkBtn.style.display = 'inline-flex';
      el.openScanLinkBtn.href = text;
    } else {
      el.openScanLinkBtn.style.display = 'none';
    }

    showToast('QR Code successfully decoded!', 'success');
  }

  el.copyScanResultBtn.addEventListener('click', async () => {
    const text = el.scanDecodedText.textContent;
    if (text) {
      await navigator.clipboard.writeText(text);
      showToast('Decoded text copied!', 'success');
    }
  });

  el.importScanResultBtn.addEventListener('click', () => {
    const text = el.scanDecodedText.textContent;
    if (!text) return;

    if (text.startsWith('http://') || text.startsWith('https://')) {
      state.type = 'url';
      el.inputUrl.value = text;
    } else if (text.startsWith('WIFI:')) {
      state.type = 'wifi';
      const sMatch = text.match(/S:([^;]+)/);
      const pMatch = text.match(/P:([^;]+)/);
      if (sMatch) el.wifiSsid.value = sMatch[1];
      if (pMatch) el.wifiPass.value = pMatch[1];
    } else {
      state.type = 'text';
      el.inputText.value = text;
    }

    syncStateToDOM();
    generateAndDrawQR();
    closeAllModals();
    showToast('Imported decoded content into Studio!', 'success');
  });

  // --- 20. Template Gallery Initialization ---
  function initTemplateGallery() {
    el.templateGalleryGrid.innerHTML = '';
    TEMPLATES.forEach(tpl => {
      const card = document.createElement('div');
      card.className = 'template-card';
      card.innerHTML = `
        <div class="template-thumb" style="background: ${tpl.config.bgColor}; border: 1px solid rgba(0,0,0,0.08);">
          <div style="width: 50px; height: 50px; background: ${tpl.config.fgColor}; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 0.68rem; font-weight: bold;">
            QR
          </div>
        </div>
        <div class="template-info">
          <h4>${tpl.name}</h4>
          <p>${tpl.desc}</p>
        </div>
      `;
      card.addEventListener('click', () => {
        applyTemplate(tpl);
        closeAllModals();
        showToast(`Applied "${tpl.name}" template!`, 'success');
      });
      el.templateGalleryGrid.appendChild(card);
    });
  }

  function applyTemplate(tpl) {
    Object.assign(state, tpl.config);
    if (tpl.config.url && el.inputUrl) el.inputUrl.value = tpl.config.url;
    if (tpl.config.wifiSsid && el.wifiSsid) el.wifiSsid.value = tpl.config.wifiSsid;
    if (tpl.config.wifiPass && el.wifiPass) el.wifiPass.value = tpl.config.wifiPass;
    if (tpl.config.vcardFn && el.vcardFn) el.vcardFn.value = tpl.config.vcardFn;
    if (tpl.config.vcardLn && el.vcardLn) el.vcardLn.value = tpl.config.vcardLn;
    if (tpl.config.vcardOrg && el.vcardOrg) el.vcardOrg.value = tpl.config.vcardOrg;
    if (tpl.config.vcardTitle && el.vcardTitle) el.vcardTitle.value = tpl.config.vcardTitle;
    if (tpl.config.vcardPhone && el.vcardPhone) el.vcardPhone.value = tpl.config.vcardPhone;
    if (tpl.config.vcardEmail && el.vcardEmail) el.vcardEmail.value = tpl.config.vcardEmail;
    if (tpl.config.socialPlatform) state.socialPlatform = tpl.config.socialPlatform;
    if (tpl.config.socialHandle && el.socialHandle) el.socialHandle.value = tpl.config.socialHandle;
    if (tpl.config.cryptoCoin && el.cryptoCoin) el.cryptoCoin.value = tpl.config.cryptoCoin;
    if (tpl.config.cryptoAddress && el.cryptoAddress) el.cryptoAddress.value = tpl.config.cryptoAddress;

    syncStateToDOM();
    generateAndDrawQR();
  }

  // --- 21. Project Library UI ---
  async function renderProjectsList() {
    const list = await dbGetAllProjects();
    el.projectsListGrid.innerHTML = '';

    if (!list.length) {
      el.projectsListGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 36px; color: var(--text-dim);">
          <p>No saved projects yet. Click "Save" below the preview to store your designs locally.</p>
        </div>
      `;
      return;
    }

    list.reverse().forEach(proj => {
      const card = document.createElement('div');
      card.className = 'project-item-card';
      card.innerHTML = `
        <div class="project-thumb-wrap">
          <img src="${proj.preview}" class="project-thumb-img" alt="${proj.title}">
        </div>
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 600; color: var(--text-main);">${proj.title}</h4>
          <span style="font-size: 0.7rem; color: var(--text-dim);">${proj.date}</span>
        </div>
        <div class="project-actions-row">
          <button class="primary-action-btn btn-load-proj" style="flex: 1; padding: 6px 10px; font-size: 0.75rem;">Load</button>
          <button class="secondary-btn btn-del-proj" style="padding: 6px 10px; font-size: 0.75rem; color: #ef4444;">Delete</button>
        </div>
      `;

      card.querySelector('.btn-load-proj').addEventListener('click', () => {
        Object.assign(state, proj.state);
        syncStateToDOM();
        generateAndDrawQR();
        closeAllModals();
        showToast(`Loaded: "${proj.title}"`, 'success');
      });

      card.querySelector('.btn-del-proj').addEventListener('click', async () => {
        if (confirm(`Delete project "${proj.title}"?`)) {
          await dbDeleteProject(proj.id);
          renderProjectsList();
          showToast('Project deleted', 'info');
        }
      });

      el.projectsListGrid.appendChild(card);
    });
  }

  el.saveProjectQuickBtn.addEventListener('click', async () => {
    const defaultTitle = (state.type.charAt(0).toUpperCase() + state.type.slice(1)) + ' QR - ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const title = prompt('Enter a name for this QR project:', defaultTitle);
    if (title && title.trim()) {
      const origContent = el.saveProjectQuickBtn.innerHTML;
      try {
        el.saveProjectQuickBtn.innerHTML = '<span>Saved!</span>';
        setTimeout(() => { el.saveProjectQuickBtn.innerHTML = origContent; }, 1400);

        await dbSaveProject(title.trim());
        showToast(`Saved "${title.trim()}" to project library!`, 'success');
      } catch (err) {
        el.saveProjectQuickBtn.innerHTML = origContent;
        showToast('Could not save project: ' + (err.message || 'Storage error'), 'error');
      }
    }
  });

  el.exportProjectsJsonBtn.addEventListener('click', async () => {
    const list = await dbGetAllProjects();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(list, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `liquid-qr-projects-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });

  el.importProjectsFile.addEventListener('change', async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = async (evt) => {
        try {
          const list = JSON.parse(evt.target.result);
          if (!Array.isArray(list)) {
            showToast('Import failed: File must contain a project list array', 'error');
            return;
          }
          if (list.length === 0) {
            showToast('Import note: The selected project list is empty', 'info');
            return;
          }
          const db = await openDatabase();
          const tx = db.transaction(STORE_NAME, 'readwrite');
          const store = tx.objectStore(STORE_NAME);
          let count = 0;

          list.forEach(p => {
            if (p && typeof p === 'object') {
              const sanitized = {
                id: (p.id && typeof p.id === 'string') ? p.id : 'proj_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
                title: (p.title && typeof p.title === 'string') ? p.title.trim() : 'Imported Project',
                date: p.date || new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
                preview: p.preview || '',
                state: (p.state && typeof p.state === 'object') ? p.state : {}
              };
              store.put(sanitized);
              count++;
            }
          });

          await new Promise((res, rej) => {
            tx.oncomplete = res;
            tx.onerror = () => rej(tx.error);
          });

          await renderProjectsList();
          showToast(`Imported ${count} project${count === 1 ? '' : 's'} successfully!`, 'success');
        } catch (err) {
          showToast('Import failed: ' + (err.message || 'Malformed JSON file'), 'error');
        } finally {
          el.importProjectsFile.value = '';
        }
      };
      reader.readAsText(file);
    }
  });

  // --- 22. Accessible Modals Control with Focus Trap ---
  let lastFocusedElement = null;

  function openModal(modalEl) {
    if (!modalEl) return;
    lastFocusedElement = document.activeElement;
    modalEl.classList.add('active');

    // Focus the close button or first interactive control inside modal
    const focusable = modalEl.querySelectorAll('button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])');
    if (focusable.length > 0) {
      setTimeout(() => focusable[0].focus(), 40);
    }
  }

  function closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
    stopCameraStream();
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
      lastFocusedElement = null;
    }
  }

  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-close');
      const target = document.getElementById(targetId);
      if (target) target.classList.remove('active');
      stopCameraStream();
      if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
        lastFocusedElement.focus();
        lastFocusedElement = null;
      }
    });
  });

  // Top Nav Modal Triggers
  el.openTemplatesBtn.addEventListener('click', () => {
    initTemplateGallery();
    openModal(el.templatesModal);
  });

  el.openScannerBtn.addEventListener('click', () => {
    openModal(el.scannerModal);
  });

  el.openBatchBtn.addEventListener('click', () => {
    openModal(el.batchModal);
  });

  el.openPdfBtn.addEventListener('click', () => {
    openModal(el.pdfModal);
  });

  el.openProjectsBtn.addEventListener('click', async () => {
    await renderProjectsList();
    openModal(el.projectsModal);
  });

  // History Controls
  el.undoBtn.addEventListener('click', () => history.undo());
  el.redoBtn.addEventListener('click', () => history.redo());

  // Keyboard Shortcuts & Accessible Focus Trap
  window.addEventListener('keydown', (e) => {
    // Escape closes modals
    if (e.key === 'Escape') {
      closeAllModals();
      if (el.moreTypesMenu) el.moreTypesMenu.classList.remove('open');
      return;
    }

    // Modal Focus Trap
    const activeModal = document.querySelector('.modal-overlay.active');
    if (activeModal && e.key === 'Tab') {
      const focusable = Array.from(activeModal.querySelectorAll('button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'));
      if (focusable.length > 0) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    // Don't trigger shortcuts when typing inside form inputs
    const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
    const isEditingText = activeTag === 'input' || activeTag === 'textarea';

    if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
      if (!isEditingText) {
        e.preventDefault();
        if (e.shiftKey) history.redo();
        else history.undo();
      }
    } else if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
      if (!isEditingText) {
        e.preventDefault();
        history.redo();
      }
    } else if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      el.saveProjectQuickBtn.click();
    } else if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
      e.preventDefault();
      el.btnDownloadPng.click();
    }
  });

  // --- 23. Content Type Selector & More Dropdown ---
  el.typePills.forEach(pill => {
    pill.addEventListener('click', () => {
      el.typePills.forEach(p => p.classList.remove('active'));
      el.moreTypesBtn.classList.remove('active');
      el.morePillLabel.textContent = 'More';
      pill.classList.add('active');
      state.type = pill.getAttribute('data-type');

      el.tabPanels.forEach(p => p.classList.remove('active'));
      const activePanel = document.getElementById(`panel-${state.type}`);
      if (activePanel) activePanel.classList.add('active');

      triggerRender();
    });
  });

  // More Dropdown
  el.moreTypesBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = el.moreTypesMenu.classList.contains('open');
    el.moreTypesMenu.classList.toggle('open', !isOpen);
    el.moreTypesBtn.setAttribute('aria-expanded', !isOpen);
  });

  document.addEventListener('click', (e) => {
    if (el.moreTypesMenu && !el.moreTypesMenu.contains(e.target)) {
      el.moreTypesMenu.classList.remove('open');
      el.moreTypesBtn.setAttribute('aria-expanded', 'false');
    }
  });

  el.moreMenuItems.forEach(item => {
    item.addEventListener('click', () => {
      el.typePills.forEach(p => p.classList.remove('active'));
      el.moreTypesBtn.classList.add('active');
      state.type = item.getAttribute('data-type');
      el.morePillLabel.textContent = item.textContent;
      el.moreTypesMenu.classList.remove('open');
      el.moreTypesBtn.setAttribute('aria-expanded', 'false');

      el.tabPanels.forEach(p => p.classList.remove('active'));
      const activePanel = document.getElementById(`panel-${state.type}`);
      if (activePanel) activePanel.classList.add('active');

      triggerRender();
    });
  });

  // Clear URL button
  const urlClearBtn = document.querySelector('#panel-url .input-clear-btn');
  if (urlClearBtn) {
    urlClearBtn.addEventListener('click', () => {
      el.inputUrl.value = '';
      el.inputUrl.focus();
      triggerRender();
    });
  }

  // Quick URL chip buttons
  document.querySelectorAll('.chip-btn[data-fill]').forEach(btn => {
    btn.addEventListener('click', () => {
      el.inputUrl.value = btn.getAttribute('data-fill');
      el.inputUrl.focus();
      triggerRender();
    });
  });

  // Social Platform Buttons
  el.socialPlatformBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      el.socialPlatformBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.socialPlatform = btn.getAttribute('data-platform');
      triggerRender();
    });
  });

  // Character counter for text
  if (el.inputText && el.textCharCount) {
    el.inputText.addEventListener('input', () => {
      const len = el.inputText.value.length;
      el.textCharCount.textContent = `${len} character${len === 1 ? '' : 's'}`;
    });
  }

  // --- 24. Progressive Appearance & Expandable Toggles ---
  el.toggleLogoSectionBtn.addEventListener('click', () => {
    const isVisible = el.inlineLogoPanel.style.display !== 'none';
    el.inlineLogoPanel.style.display = isVisible ? 'none' : 'block';
    el.toggleLogoSectionBtn.classList.toggle('active', !isVisible);
  });

  el.toggleFrameSectionBtn.addEventListener('click', () => {
    const isVisible = el.inlineFramePanel.style.display !== 'none';
    el.inlineFramePanel.style.display = isVisible ? 'none' : 'block';
    el.toggleFrameSectionBtn.classList.toggle('active', !isVisible);
  });

  el.toggleAdvancedBtn.addEventListener('click', () => {
    const isVisible = el.advancedAccordionBody.style.display !== 'none';
    el.advancedAccordionBody.style.display = isVisible ? 'none' : 'block';
    el.toggleAdvancedBtn.classList.toggle('open', !isVisible);
    el.toggleAdvancedBtn.setAttribute('aria-expanded', !isVisible);
  });

  // Swatches
  el.swatchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      state.fgColor = btn.getAttribute('data-fg');
      state.bgColor = btn.getAttribute('data-bg');
      el.fgColor.value = state.fgColor;
      el.fgHex.textContent = state.fgColor.toUpperCase();
      el.bgColor.value = state.bgColor;
      el.bgHex.textContent = state.bgColor.toUpperCase();
      state.isTransparentBg = false;
      el.bgTransparent.checked = false;
      el.bgColor.disabled = false;
      triggerRender();
    });
  });

  // Frame Styles
  el.frameOpts.forEach(btn => {
    btn.addEventListener('click', () => {
      el.frameOpts.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.frameStyle = btn.getAttribute('data-frame');
      el.frameControlsBox.style.display = state.frameStyle !== 'none' ? 'block' : 'none';
      triggerRender();
    });
  });

  el.frameLabelInput.addEventListener('input', (e) => {
    state.frameLabel = e.target.value;
    triggerRender();
  });

  el.ctaPills.forEach(pill => {
    pill.addEventListener('click', () => {
      state.frameLabel = pill.getAttribute('data-cta');
      el.frameLabelInput.value = state.frameLabel;
      triggerRender();
    });
  });

  el.frameBgColor.addEventListener('input', (e) => {
    state.frameBgColor = e.target.value;
    triggerRender();
  });

  el.frameTextColor.addEventListener('input', (e) => {
    state.frameTextColor = e.target.value;
    triggerRender();
  });

  // Colors & Gradients
  el.fgColor.addEventListener('input', (e) => {
    state.fgColor = e.target.value;
    el.fgHex.textContent = e.target.value.toUpperCase();
    triggerRender();
  });

  el.bgColor.addEventListener('input', (e) => {
    state.bgColor = e.target.value;
    el.bgHex.textContent = e.target.value.toUpperCase();
    triggerRender();
  });

  el.bgTransparent.addEventListener('change', (e) => {
    state.isTransparentBg = e.target.checked;
    el.bgColor.disabled = e.target.checked;
    triggerRender();
  });

  el.gradientMode.addEventListener('change', (e) => {
    state.isGradient = e.target.checked;
    el.gradientBox.style.display = e.target.checked ? 'block' : 'none';
    triggerRender();
  });

  el.gradColor.addEventListener('input', (e) => {
    state.gradColor = e.target.value;
    el.gradHex.textContent = e.target.value.toUpperCase();
    triggerRender();
  });

  el.gradDirBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      el.gradDirBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.gradDir = btn.getAttribute('data-dir');
      triggerRender();
    });
  });

  // Independent Eye Colors
  el.customEyeColorsToggle.addEventListener('change', (e) => {
    state.customEyeColors = e.target.checked;
    el.eyeColorsPickers.style.display = e.target.checked ? 'grid' : 'none';
    triggerRender();
  });

  el.eyeOuterColor.addEventListener('input', (e) => {
    state.eyeOuterColor = e.target.value;
    triggerRender();
  });

  el.eyeInnerColor.addEventListener('input', (e) => {
    state.eyeInnerColor = e.target.value;
    triggerRender();
  });

  // Shape Styles
  el.bodyShapeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      el.bodyShapeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.bodyShape = btn.getAttribute('data-shape');
      triggerRender();
    });
  });

  el.eyeShapeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      el.eyeShapeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.eyeShape = btn.getAttribute('data-eye');
      triggerRender();
    });
  });

  // Logo Presets & Uploads
  el.logoPresets.forEach(btn => {
    btn.addEventListener('click', () => {
      el.logoPresets.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.presetLogo = btn.getAttribute('data-logo');
      if (state.presetLogo !== 'none' && state.customLogoImg) {
        state.customLogoImg = null;
        el.fileLabel.textContent = 'Click or drop custom image';
        el.removeLogoBtn.style.display = 'none';
      }
      el.logoOptionsGroup.style.display = (state.presetLogo !== 'none' || state.customLogoImg) ? 'grid' : 'none';
      triggerRender();
    });
  });

  el.dropZone.addEventListener('click', () => el.logoFileInput.click());
  el.logoFileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (evt) => {
        const img = new Image();
        img.onload = () => {
          state.customLogoImg = img;
          el.fileLabel.textContent = file.name;
          el.removeLogoBtn.style.display = 'block';
          el.logoPresets.forEach(b => b.classList.remove('active'));
          const noneP = document.querySelector('.logo-preset[data-logo="none"]');
          if (noneP) noneP.classList.add('active');
          state.presetLogo = 'none';
          el.logoOptionsGroup.style.display = 'grid';
          triggerRender();
          showToast('Custom logo loaded!', 'success');
        };
        img.src = evt.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  el.removeLogoBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    state.customLogoImg = null;
    el.fileLabel.textContent = 'Click or drop custom image';
    el.removeLogoBtn.style.display = 'none';
    el.logoOptionsGroup.style.display = state.presetLogo !== 'none' ? 'grid' : 'none';
    triggerRender();
  });

  el.logoSizeSlider.addEventListener('input', (e) => {
    const val = parseInt(e.target.value);
    state.logoSize = val / 100;
    el.logoSizeVal.textContent = `${val}%`;
    triggerRender();
  });

  el.logoBadgeBg.addEventListener('change', (e) => {
    state.logoBadgeBg = e.target.checked;
    triggerRender();
  });

  // Advanced Precision
  el.errorCorrection.addEventListener('change', (e) => {
    state.errorCorrection = e.target.value;
    triggerRender();
  });

  el.marginSlider.addEventListener('input', (e) => {
    const val = parseInt(e.target.value);
    state.margin = val;
    el.marginVal.textContent = val;
    triggerRender();
  });

  el.exportSize.addEventListener('change', (e) => {
    state.exportSize = parseInt(e.target.value);
  });

  // Download Actions with Micro-Interaction States
  el.btnDownloadPng.addEventListener('click', () => {
    if (!state.currentPayload) {
      showToast('Please enter QR content first', 'error');
      return;
    }

    const origPngContent = el.btnDownloadPng.innerHTML;
    el.btnDownloadPng.classList.add('btn-loading');
    el.btnDownloadPng.innerHTML = `
      <svg class="spin-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10"></path>
      </svg>
      <span>Exporting...</span>
    `;

    const exportCanvas = document.createElement('canvas');
    drawQRWithFrame(exportCanvas, state.exportSize);
    exportCanvas.toBlob((blob) => {
      if (!blob) {
        el.btnDownloadPng.classList.remove('btn-loading');
        el.btnDownloadPng.innerHTML = origPngContent;
        return;
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `liquid-qr-${state.type}-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      el.btnDownloadPng.classList.remove('btn-loading');
      el.btnDownloadPng.classList.add('btn-success-micro');
      el.btnDownloadPng.innerHTML = `
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>Downloaded!</span>
      `;

      setTimeout(() => {
        el.btnDownloadPng.classList.remove('btn-success-micro');
        el.btnDownloadPng.innerHTML = origPngContent;
      }, 1600);

      showToast(`Downloaded PNG (${state.exportSize}×${state.exportSize})`, 'success');
    }, 'image/png');
  });

  el.btnDownloadSvg.addEventListener('click', () => {
    if (!state.currentPayload) {
      showToast('Please enter QR content first', 'error');
      return;
    }
    const origSvgContent = el.btnDownloadSvg.innerHTML;
    el.btnDownloadSvg.innerHTML = '<span>Exported!</span>';
    setTimeout(() => { el.btnDownloadSvg.innerHTML = origSvgContent; }, 1400);

    const svgMarkup = generateSVGMarkup();
    const blob = new Blob([svgMarkup], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `liquid-qr-${state.type}-${Date.now()}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Downloaded scalable vector SVG!', 'success');
  });

  el.btnCopyImage.addEventListener('click', async () => {
    if (!state.currentPayload) {
      showToast('Please enter QR content first', 'error');
      return;
    }
    const origCopyContent = el.btnCopyImage.innerHTML;
    try {
      const copyCanvas = document.createElement('canvas');
      drawQRWithFrame(copyCanvas, 800);
      copyCanvas.toBlob(async (blob) => {
        if (!blob) throw new Error('Blob creation failed');
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        el.btnCopyImage.innerHTML = '<span>Copied!</span>';
        setTimeout(() => { el.btnCopyImage.innerHTML = origCopyContent; }, 1400);
        showToast('QR Code copied to clipboard!', 'success');
      }, 'image/png');
    } catch (err) {
      showToast('Clipboard image write not supported in this browser', 'error');
    }
  });

  el.copyRawBtn.addEventListener('click', async () => {
    if (state.currentPayload) {
      await navigator.clipboard.writeText(state.currentPayload);
      showToast('Raw payload copied to clipboard!', 'success');
    }
  });

  // Current Geolocation
  if (el.getCurrentLocBtn) {
    el.getCurrentLocBtn.addEventListener('click', () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            el.locLat.value = pos.coords.latitude.toFixed(6);
            el.locLng.value = pos.coords.longitude.toFixed(6);
            triggerRender();
            showToast('Current GPS coordinates fetched!', 'success');
          },
          (err) => showToast('Could not retrieve location: ' + err.message, 'error')
        );
      }
    });
  }

  // Theme Management
  function initTheme() {
    const saved = localStorage.getItem('hzgpd_qr_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
  }

  el.themeToggle.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('hzgpd_qr_theme', next);
    showToast(`Switched to ${next} theme`, 'info');
  });

  // Reset All
  el.resetAllBtn.addEventListener('click', () => {
    if (confirm('Reset all configurations to default?')) {
      localStorage.removeItem('liquid_qr_draft_v2');
      el.inputUrl.value = 'https://hasnizihar.github.io/';
      el.inputText.value = '';
      el.wifiSsid.value = '';
      el.wifiPass.value = '';
      state.fgColor = '#0f172a';
      state.bgColor = '#ffffff';
      state.isTransparentBg = false;
      state.isGradient = false;
      state.customEyeColors = false;
      state.bodyShape = 'square';
      state.eyeShape = 'square';
      state.frameStyle = 'none';
      state.frameLabel = 'SCAN ME';
      state.presetLogo = 'none';
      state.customLogoImg = null;
      syncStateToDOM();
      triggerRender();
      showToast('All configurations reset', 'info');
    }
  });

  // Live input change listeners
  const liveInputs = [
    el.inputUrl, el.inputText, el.wifiSsid, el.wifiPass, el.wifiHidden, el.wifiAuth,
    el.vcardFn, el.vcardLn, el.vcardOrg, el.vcardTitle, el.vcardPhone, el.vcardEmail, el.vcardUrl,
    el.waPhone, el.waMsg, el.socialHandle, el.mailTo, el.mailSubject, el.mailBody,
    el.eventTitle, el.eventStart, el.eventEnd, el.eventLocation, el.locLat, el.locLng,
    el.cryptoCoin, el.cryptoAddress, el.cryptoAmount, el.phoneNumber, el.smsMessage
  ];

  liveInputs.forEach(inp => {
    if (inp) {
      inp.addEventListener('input', () => triggerRender());
      inp.addEventListener('change', () => triggerRender());
    }
  });

  // Toast Notification System
  function showToast(msg, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    let iconSvg = '';
    if (type === 'success') {
      iconSvg = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;
    } else if (type === 'error') {
      iconSvg = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
    } else {
      iconSvg = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
    }
    toast.innerHTML = `${iconSvg}<span>${msg}</span>`;
    el.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      setTimeout(() => { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 250);
    }, 2600);
  }

  // --- 25. Initialization ---
  initTheme();
  restoreDraft();
  hzgpdLogoImg.onload = () => {
    if (state.presetLogo === 'hzgpd') triggerRender();
  };
  triggerRender();
  history.push();

})();
