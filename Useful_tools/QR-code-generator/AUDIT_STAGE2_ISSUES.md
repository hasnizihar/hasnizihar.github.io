# 🛠️ Liquid QR Studio 2.1 — Stage 2 Confirmed Issues & Remediation Report

**Audit Phase:** Stage 2 — Behavioral QA & Optical Scanability  
**Audit Date:** October 18, 2026  
**Auditor:** Antigravity Senior Engineering Specialist  
**Target:** `Useful_tools/QR-code-generator`  
**Classification Standard:** P0 (Critical), P1 (High), P2 (Medium), P3 (Low)

---

## 1. Summary of All Confirmed & Remediated Issues

| Issue ID | Severity | Feature Category | Defect Title / Summary | Status |
| :---: | :---: | :--- | :--- | :---: |
| **ISS-01** | **P1 (High)** | Data Integrity & Optical Scan | Multilingual Unicode Byte Truncation in Kazuhiko Arase QR Engine | **FIXED** |
| **ISS-02** | **P1 (High)** | Vector SVG Export | Vector SVG Embedded Non-Portable Relative File Link | **FIXED** |
| **ISS-03** | **P2 (Med)** | PWA & Offline Precache | Manifest Icon Scope & Service Worker Precache Gap | **FIXED** |
| **ISS-04** | **P2 (Med)** | Optical QR Scanability | Circle Module Radius Underfill on Dense QR Payloads | **FIXED** |
| **ISS-05** | **P3 (Low)** | UI & XSS Hardening | Direct String Concatenation in Toast Notification innerHTML | **FIXED** |

---

## 2. Detailed Breakdown of Stage 2 Findings & Fixes

### ISS-04: Circle Module Radius Underfill on Dense QR Payloads
- **Severity:** P2 (Medium)
- **Affected Area:** Customization $\to$ Body Shapes (`circle`).
- **Discovered During:** Stage 2 Systematic QR Scanability Matrix testing (Test case `M-05`).
- **Evidence:** `jsQR` failed to decode circle-module QR codes on dense payloads (e.g., Wi-Fi network credentials with version 4+ matrices) when rendered with radius `modSize * 0.44`, despite passing on shorter URLs.
- **Root Cause:** When `radiusFactor` was set to `0.44`, adjacent dark modules had a 12% physical white gap between them. For dense matrices, optical binarization algorithms (Otsu's thresholding) misidentify these gaps as timing pattern disruptions.
- **Remediation:** In `main.js`, updated the circle radius calculation from `modSize * 0.44` to `modSize * 0.5` in both the Canvas drawing routine (`main.js:1032`) and the SVG generator (`main.js:1333`). At `modSize * 0.5`, adjacent modules touch tangentially at their perimeters, eliminating false pinhole gaps while preserving the modern circular aesthetic.
- **Verification:** Test case `M-05` and custom combo `WFC-02` now decode with 100% optical fidelity.

---

### ISS-01: Multilingual Unicode Byte Truncation in QR Engine
- **Severity:** P1 (High)
- **Affected Area:** Payload generation for all non-ASCII languages (Sinhala, Tamil, Japanese, Chinese, Arabic, Cyrillic, Accented Latin, Emojis).
- **Evidence:** Multi-script payloads produced invalid matrices that optical decoders failed to decode.
- **Root Cause:** `qrcode.min.js` defaults to Latin1 byte truncation (`255 & charCode`), which silently discards high bytes for characters with code points $> 255$.
- **Remediation:** Ensured `window.qrcode.stringToBytes = window.qrcode.stringToBytesFuncs['UTF-8']` is initialized at the top of the application scope.
- **Verification:** Test cases `WFA-03`, `WFB-01` through `WFB-11`, and `M-04` verified 100% decode match.

---

### ISS-02: Vector SVG Embedded Non-Portable Relative File Link
- **Severity:** P1 (High)
- **Affected Area:** Scalable Vector SVG Export (`main.js`).
- **Evidence:** Exported SVG output contained `<image ... href="../../Src/favicon-HzGPD.png" />`.
- **Root Cause:** The SVG compiler referenced the image element's relative `.src` path instead of embedding vector or inlined image data.
- **Remediation:** Updated `main.js` to convert the preset logo to a Base64 data URI (`data:image/png;base64,...`) via an offscreen canvas upon load, embedding the data URI directly into the exported SVG.
- **Verification:** Exported SVGs verified to be 100% self-contained and portable with 0 external dependencies.

---

### ISS-03: Manifest Icon Scope & Service Worker Precache Gap
- **Severity:** P2 (Medium)
- **Affected Area:** PWA installability and offline execution (`manifest.webmanifest`, `sw.js`).
- **Evidence:** `manifest.webmanifest` referenced an icon outside the application folder (`../../Src/favicon-HzGPD.png`), and `sw.js` did not list `./hzgpdfavicin.png` in its precache array.
- **Remediation:** Updated `manifest.webmanifest` to reference `./hzgpdfavicin.png`, added `./hzgpdfavicin.png` to `sw.js` cache array, and updated `index.html` favicon link.
- **Verification:** Verified all 12 core assets precache successfully with HTTP 200 responses.

---

### ISS-05: Direct String Concatenation in Toast Notification innerHTML
- **Severity:** P3 (Low)
- **Affected Area:** Notification UI system (`showToast()`).
- **Evidence:** `toast.innerHTML = ${iconSvg}<span>${msg}</span>;`.
- **Root Cause:** Concatenating dynamic message strings directly into `innerHTML` presented a theoretical injection risk if dynamic error messages contained metacharacters.
- **Remediation:** Created a dedicated `<span>` element and set `span.textContent = msg`, appending it cleanly as a DOM node.
- **Verification:** Toast notifications verified to render cleanly and safely without HTML parsing risks.
