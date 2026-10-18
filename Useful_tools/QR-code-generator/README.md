# 🧊 Liquid QR Studio 2.1 — Minimalist UX & Interface Refinement

**Liquid QR Studio 2.1** refines the powerful QR design studio into an effortless, quiet, editorial utility. By adopting a **"Simple by default, powerful when needed"** philosophy, it eliminates UI cockpit clutter while preserving 100% of the advanced creative toolset—all running **100% client-side with zero backend dependencies**, deployed cleanly on GitHub Pages.

Designed and engineered by **[KR Hasni Zihar](https://hasnizihar.github.io/)** as part of the **[HzGPD](https://hasnizihar.github.io/)** collection, strictly adhering to the **Liquid Glass CSS Theme Design Plan** with quiet, warm neutral surfaces and restraint.

---

## 🎯 What's New in 2.1 (Minimalist UX Refinement)

1. **Quiet, Editorial Interface**:
   - Replaced decorative glass on primary controls with warm neutral surfaces, restrained borders, and generous whitespace.
   - Blur and glassmorphic depth are strictly reserved for elevated modals and floating overlays.
2. **One Primary Action**:
   - Prominent live preview paired with an unmistakable `Download PNG` primary action button and resolution selector (400px, 800px HD, 1600px Print, 2400px Ultra).
3. **Progressive Disclosure**:
   - **Top 5 Content Types** (`URL`, `Text`, `Wi-Fi`, `Contact`, `WhatsApp`) always accessible at a single click.
   - **Searchable More Dropdown** houses secondary types (`Social`, `Email`, `Calendar Event`, `Location/Maps`, `Crypto`, `Call/SMS`).
   - **Compact Appearance Bar**: 6 curated one-click swatches (`Classic Obsidian`, `Aqua Cyan`, `Emerald Mint`, `Royal Violet`, `Sunset Rose`, `Liquid Night`) plus inline `+ Logo` and `+ Frame` drawers.
   - **Advanced Design & Quality Accordion**: Deep customization (6 body shapes, 3 corner eye shapes, independent eye colors, gradient directions, error recovery, quiet zone margins, payload inspector) stays tucked away until needed.
4. **Local Draft Autosave**:
   - Automatically saves in-progress drafts to local storage, quietly restoring state on page refresh.
5. **Real-time Camera & Contrast Diagnostics**:
   - Integrated WCAG relative luminance check and automated real-time `jsQR` decode validation.

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

### 5. 💾 Local Project Library (IndexedDB)
- **Zero Cloud / No Login Needed**: Stores designs privately in your browser's IndexedDB.
- **Features**:
  - Save project with custom title and live thumbnail preview.
  - Load, duplicate, and delete saved projects.
  - 📤 **Export JSON**: Download your entire project library as a `.json` backup file.
  - 📥 **Import JSON**: Restore or transfer your designs across browsers.

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
