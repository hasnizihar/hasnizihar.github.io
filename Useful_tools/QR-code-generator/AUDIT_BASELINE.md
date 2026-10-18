# Liquid QR Studio 2.1 — Baseline Audit Report (`AUDIT_BASELINE.md`)

**Date:** 2026-10-18  
**Project:** Liquid QR Studio 2.1  
**Directory:** `d:\Hasnizihar git hub io\Useful_tools\QR-code-generator`  
**Architecture:** 100% Client-Side Static (Vanilla HTML5, CSS3, ES6+ JavaScript)  
**Host Target:** GitHub Pages (`https://<username>.github.io/<repo>/`)  
**Backend / Build Dependencies:** None (0 npm runtime/build dependencies, 0 external runtime CDNs)  

---

## 1. Project Structure & Asset Inventory

The audited directory contains 1 subdirectory (`css/`) and 11 files:

| File / Path | Size (Bytes) | Role & Architecture Notes |
| :--- | :--- | :--- |
| `index.html` | ~52 KB | Primary application single-page structure. Contains all workspace panels, tablists, modal dialogs, and SVG icons. |
| `main.js` | ~101 KB | Core application logic (IIFE architecture, 2,640+ lines). Handles payload computation, matrix creation, custom Canvas rendering, SVG vector generator, jsQR verification, batch ZIP packaging, PDF layout generation, and event lifecycle. |
| `main.css` | ~9.3 KB | Base design system tokens (CSS Custom Properties for `--accent`, `--surface-card`, `--border-card`, `--text-main`, light/dark themes, animations). |
| `css/components.css` | ~35.5 KB | Liquid Glass component styles: quiet cards, segmented tabs, color pickers, shape selectors, modal dialogs, right-side drawer, and full-screen workspaces. |
| `css/responsive.css` | ~5.3 KB | Dedicated responsive stylesheets audited for 1440px, 1024px, 768px, 640px, 375px, 320px viewports and `@media print`. |
| `qrcode.min.js` | 20,387 B | Bundled Kazuhiko Arase QR Code engine (client-side, UTF-8 patched). |
| `jsQR.min.js` | 130,594 B | Bundled jsQR engine for client-side camera scanning and real-time image decode verification. |
| `jszip.min.js` | 97,630 B | Bundled JSZip engine for client-side multi-image ZIP packaging. |
| `jspdf.umd.min.js` | 364,463 B | Bundled jsPDF (UMD) engine for client-side printable sheet creation. |
| `sw.js` | 1,671 B | Service Worker for offline PWA caching (`CacheStorage` API). |
| `manifest.webmanifest`| 541 B | Progressive Web App manifest. |
| `hzgpdfavicin.png` | 6,532 B | Local icon asset. |
| `README.md` | 9,688 B | Technical architecture documentation. |

---

## 2. Repository & Version Control State

- **Branch:** `main`
- **Working Tree Status:** Clean (no uncommitted modifications).
- **Commit History:** 12 recent commits implementing UI refinement, segmented tabs, full-screen scanner and batch views, right-side template drawer with live canvas previews, and removal of dead project code.
- **Git Policy:** Per instructions, **NO commits or pushes will be executed** without explicit user instruction.

---

## 3. Discovered Functionality & Core Components

1. **Content Types (11 Types)**:
   - Primary: `url`, `text`, `wifi`, `vcard`, `whatsapp`.
   - Secondary / Extended: `social` (Instagram, LinkedIn, YouTube, Telegram, GitHub, X), `email`, `event` (iCal), `location` (Geo coordinates), `crypto` (Bitcoin, Ethereum, Solana, USDT), `sms`.
2. **Appearance Customization**:
   - Foreground / Background solid colors.
   - Dual-color gradients (Linear 45°, 90°, 135°, 180°, Radial).
   - Independent eye finder colors (Outer ring & inner pupil).
   - Background transparency toggle.
   - 6 Body Module shapes: `square`, `rounded`, `circle`, `classy` (diamond), `leaf`, `connected`.
   - 4 Finder Eye shapes: `square`, `rounded`, `circle`, `leaf`.
   - 6 Decorative Frames: `none`, `bottom-banner`, `top-banner`, `full-card`, `bubble`, `border`.
   - Center Badge Logos: 5 presets (`link`, `wifi`, `vcard`, `whatsapp`, `hzgpd`) + custom user image upload with slider sizing.
3. **Template Gallery**:
   - 8 Curated design presets rendered in a slide-in right drawer with live canvas-generated QR previews.
4. **Export Engines**:
   - PNG download with customizable resolution (600px to 2000px).
   - Clean Scalable Vector SVG download.
   - Clipboard image copy (`navigator.clipboard.write`).
   - Batch ZIP generation (`JSZip`).
   - PDF Layout Designer (`jsPDF`: Single A4, 12-Sticker Grid, Foldable Table Tent).
5. **Scanner & Diagnostics**:
   - Fullscreen camera scanner (`getUserMedia` + `jsQR`).
   - Drag-and-drop file image decoder.
   - Real-time WCAG contrast ratio calculator.
   - Real-time jsQR readability analyzer (`100% Readable`, `Low Contrast Warning`, `Logo Occlusion Warning`, `Inverted QR Warning`).
6. **State & Autosave**:
   - Working draft auto-saved to `localStorage` (`liquid_qr_draft_v2`).
   - History stack for Undo (<kbd>Ctrl</kbd> + <kbd>Z</kbd>) and Redo (<kbd>Ctrl</kbd> + <kbd>Y</kbd>).

---

## 4. Pre-Audit Risks & Hypotheses

1. **Relative Asset Paths vs GitHub Pages**:
   - Header brand link `<a href="../../index.html">` assumes the repository root is 2 directory levels up.
   - Favicon link `<link rel="shortcut icon" href="../../Src/favicon-HzGPD.png">` and `hzgpdLogoImg.src = '../../Src/favicon-HzGPD.png'` depend on an external folder outside the generator directory. If deployed directly or copied standalone, this will fail.
2. **SVG Image Embedding**:
   - When the `hzgpd` logo is selected, the exported SVG links to `../../Src/favicon-HzGPD.png` instead of embedding an inlined raster/vector data URI. Standalone SVG viewers opening the file in isolation will show a broken image.
3. **Contrast vs Real Scannability**:
   - Some high-contrast inverted white-on-dark codes fail scanning on older mobile camera apps if quiet zones are too narrow (< 4 modules).
4. **jsPDF CDN vs Local**:
   - `jspdf.umd.min.js` is bundled locally (364 KB), ensuring zero CDN network dependency. We must verify that `window.jspdf` is instantiated without missing fonts or global leaks.
5. **JSZip Memory Ceiling**:
   - Generating 100+ high-resolution (2000×2000) canvas renderings in memory could cause browser memory pressure on mobile devices.
