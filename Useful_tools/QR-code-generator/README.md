# 🧊 Liquid QR Studio 2.2 — Reliability, Accessibility & Micro-Interactions

**Liquid QR Studio 2.2** builds upon the minimalist 2.1 UX foundation with rigorous quality assurance, true vector export fidelity, full WCAG 2.2 accessibility, responsive micro-interactions, and storage resilience. It operates **100% client-side with zero backend or paid API dependencies**, deployed natively on GitHub Pages.

Designed and engineered by **[KR Hasni Zihar](https://hasnizihar.github.io/)** as part of the **[HzGPD](https://hasnizihar.github.io/)** collection, strictly adhering to the **Liquid Glass CSS Theme Design Plan** with quiet, warm neutral surfaces and restraint.

---

## 🚀 Key Improvements in Version 2.2

### 1. 🔍 True Vector SVG Fidelity & 100% Scannability
- **Complete Finder Pattern Eyes in SVG**: Scalable vector exports now generate all 3 corner finder eyes (outer frames, cutouts, and inner pupils) matching selected shapes (`Square`, `Rounded`, `Circle`) and independent eye colors.
- **Frames, Gradients & CTA Text in SVG**: Exported SVGs accurately preserve banner frames (`Bottom Banner`, `Top Banner`, `Full Card`, `Bubble`, `Border Badge`), linear/radial gradients, and centered CTA text labels.
- **Center Logo Vector Embedding**: SVGs embed preset vector icons and custom logos with badge background protection.
- **XML Sanitization**: Full XML entity escaping (`&`, `<`, `>`, `"`) prevents vector export corruption.

### 2. ⚡ Real-Time Scanability Diagnostics & Zero False Positives
- **Transparent Background Compositing**: Accurately analyzes transparent QR codes against light surfaces, preventing false scan failures.
- **Actionable Diagnostics**: When scanning is difficult, specific feedback identifies the root cause:
  - *Low Contrast Warning* (< 2.8:1 ratio)
  - *Logo Occlusion Warning* (large logos obscuring finder patterns)
  - *Inverted QR Warning* (white on dark requiring wider quiet zones)
- **Zero False Successes**: Automatically verifies that decoded data exactly matches the target payload.

### 3. ✨ Micro-Interactions & Clear Visual States
- **Action Button Feedback**: Instant feedback transitions on `Download PNG` (*Exporting...* ➔ *Downloaded!*), `SVG` (*Exported!*), `Copy` (*Copied!*), and `Save` (*Saved!*).
- **Draft Autosave Status**: Subtle live pulse transition (*Saving...* ➔ *Draft saved*) while editing.

### 4. ♿ Accessibility & Focus Management (WCAG 2.2)
- **Modal Focus Trap**: Traps keyboard <kbd>Tab</kbd> navigation within active dialog modals and restores focus to trigger elements upon modal close.
- **Keyboard Shortcuts**: <kbd>Escape</kbd> to close modals, <kbd>Ctrl+Z</kbd> (Undo), <kbd>Ctrl+Y</kbd> (Redo), <kbd>Ctrl+S</kbd> (Save), <kbd>Ctrl+E</kbd> (Export PNG).
- **Reduced Motion Support**: Full `@media (prefers-reduced-motion: reduce)` support.
- **High-Contrast Focus Rings**: Accessible `:focus-visible` outlines on all interactive controls.

### 5. 🛡️ Storage Resilience & Offline PWA
- **Corrupted JSON Import Protection**: Project library safely sanitizes dirty or malformed JSON files without throwing unhandled exceptions.
- **Draft & Project Isolation**: Working drafts (`localStorage`) and saved project databases (`IndexedDB`) are strictly separated.
- **Resilient Service Worker (`v2.2`)**: Isolated asset precaching prevents single-file network hiccups from breaking offline functionality.
- **Automated Regression Test Suite**: 59 automated test assertions passing across payloads, SVG vector logic, jsQR decoding, and accessibility.

### 1. 🎨 Advanced QR Style Editor
- **Rich Body Module Patterns**:
  - `Square`: Classic crisp pixel blocks.
  - `Rounded`: Smooth squircle tiles.
  - `Dots`: Modern circular dots.
  - `Classy`: 45-degree diamond-cut modules.
  - `Leaf`: Asymmetric organic rounded tiles.
  - `Connected`: Seamlessly linked adjacent modules.
- **Independent Corner Eye Styling**:
  - Choose outer eye frame shape (`Square`, `Rounded`, `Circle`).
  - Choose inner eye pupil shape (`Square`, `Rounded`, `Circle`).
  - **Independent Eye Colors**: Customize eye outer frame color and inner pupil color independently from the QR body!
- **Gradients & Backgrounds**:
  - Linear gradients with direction controls (45°, 90°, 135°, 180°) and radial gradients.
  - Transparent background support.
  - Curated one-click theme swatches (*Classic Obsidian, Aqua Cyan, Emerald Mint, Royal Violet, Sunset Rose, Liquid Night*).
- **Real-Time Contrast Safety Ratio**:
  - WCAG-compliant relative luminance calculations.
  - Live contrast badge (*Safe >= 4.5:1*, *Moderate >= 2.8:1*, *Low Contrast Warning*).
- **Automated Scanability Verification**:
  - Embedded background scan engine powered by `jsQR`.
  - Verifies in real-time whether cameras will be able to read the generated code before exporting!

### 2. 🏷️ QR Frames & Call-to-Action (CTA) Designer
- **Frame Styles**:
  - `Bottom Banner`: Prominent bottom CTA pill.
  - `Top Banner`: Clean top header bar.
  - `Full Card`: Elegant surrounding border card with custom padding.
  - `Speech Bubble`: Interactive pointer bubble.
  - `Badge Border`: Crisp double border line frame.
- **CTA Presets & Customization**:
  - Presets: *"SCAN ME"*, *"CONNECT WI-FI"*, *"VIEW MENU"*, *"SAVE CONTACT"*, *"PAY HERE"*, *"FOLLOW US"*, *"VISIT WEBSITE"*.
  - Full control over frame background color, text color, and custom label strings.

### 3. 📷 Built-in QR Scanner & Decoder
- **Live Camera Scanner**: Streams camera video (`facingMode: environment`) and scans frames in real time.
- **Image Upload Decoder**: Drag & drop or upload any saved image containing a QR code.
- **Result Inspector**:
  - Displays decoded payload text.
  - 📋 **Copy Decoded Text**
  - 🔗 **Open Link** (with safe URL confirmation)
  - ✏️ **Load into Studio** (instantly imports the decoded QR code into the editor for restyling!)

### 4. 📚 Curated Template Gallery
- 1-click apply pre-styled templates:
  1. ☕ *Coffee & Bistro Menu* (Amber gradient, rounded dots, "VIEW MENU" frame)
  2. 💼 *Executive Business Card* (Obsidian slate, classy diamond dots, dual eye colors, "SAVE CONTACT")
  3. 📶 *High-Speed Guest Wi-Fi* (Mint/Cyan gradient, Wi-Fi logo, "CONNECT WI-FI")
  4. 🎨 *Creative Portfolio* (Royal violet, leaf dots, full card frame)
  5. 📸 *Instagram & Social Hub* (Sunset rose gradient, social CTA)
  6. 💰 *Crypto & Web3 Payment* (Indigo gradient, circle frames, "PAY HERE")
  7. 🛍️ *Eco Packaging Label* (Deep forest green, high contrast)
  8. 🌙 *Liquid Night Minimalist* (White dots on deep dark gradient)

### 5. 💾 Automatic Draft Persistence & Design State
- **Zero Cloud / No Login Needed**: Your active work is saved automatically in local storage (`liquid_qr_draft_v2`).
- **Features**:
  - Automatically restores your customized QR state (content type, colors, patterns, frames, and logo) upon page reload.
  - Reset confirmation safeguards against accidental loss of customizations.
  - Seamless memory optimization with bounded undo/redo history.

### 6. 📦 QR Batch Generator (ZIP Export)
- Generate dozens or hundreds of QR codes at once from a list of URLs or CSV entries.
- Automatically applies your active design styles, colors, shapes, and frames.
- Packages all generated high-res PNG files into a single `.zip` file using `JSZip`!

### 7. 📄 Print-Ready PDF & Sheet Designer
- Powered by `jsPDF`:
  - **Single A4 Display Card**: Centered presentation card with title and scan instructions.
  - **Sticker Sheet (3 × 4 Grid)**: 12 stickers on an A4 sheet with cut guides, ready for sticker paper.
  - **Foldable Table Tent**: Dual-sided table display card with fold guides for restaurant tables or reception desks.

### 8. ↩️ Undo / Redo & Keyboard Shortcuts
- Full design history stack with memory optimization.
- **Shortcuts**:
  - `Ctrl + Z`: Undo design change
  - `Ctrl + Y` or `Ctrl + Shift + Z`: Redo
  - `Ctrl + S`: Quick Save Project
  - `Ctrl + E`: Quick Download PNG

### 9. 📱 Progressive Web App (PWA) & Offline Caching
- Registered `sw.js` service worker and `manifest.webmanifest`.
- Fully offline functional: works without an internet connection once loaded!

---

## 🏗️ Architecture & File Structure

```
Useful_tools/QR-code-generator/
├── index.html              # Studio 2.0 3-part layout (Tool Rail, Canvas Stage, Settings Inspector)
├── main.css                # Liquid Glass core design tokens and base classes
├── main.js                 # Unified client-side logic (Renderers, State, History, Modals)
├── qrcode.min.js           # Pure JS QR matrix engine (UTF-8 enabled)
├── jsQR.min.js             # Client-side QR scanner and real-time decode validator
├── jszip.min.js            # In-browser ZIP archive generator for batch output
├── jspdf.umd.min.js        # In-browser PDF generator for print sheets and labels
├── manifest.webmanifest    # PWA installable web app manifest
├── sw.js                   # PWA offline cache service worker
├── css/
│   ├── components.css      # Rail, canvas stage, frame controls, modals, templates
│   └── responsive.css      # Tablet, mobile layout adjustments, and @media print
├── README.md               # Documentation
└── hzgpdfavicin.png        # Brand asset
```

---

## 🔒 Privacy & Static Guarantee

- **No Tracking**: No telemetry, analytics, or third-party tracking scripts.
- **Private Data**: Your Wi-Fi passwords, contact details, notes, and crypto addresses never leave your browser.
- **Static Hosting**: Deployable directly to GitHub Pages, Cloudflare Pages, Vercel, or Netlify with zero build step.
