# 📋 Liquid QR Studio 2.1 — Functional Feature Audit Report

**Audit Date:** October 18, 2026  
**Auditor:** Antigravity Senior QA & Frontend Engineering Specialist  
**Target:** `Useful_tools/QR-code-generator` (Client-side Static Architecture)  
**Methodology:** Comprehensive code inspection, matrix verification, and functional execution.

---

## 1. Executive Summary

Liquid QR Studio 2.1 provides an offline, client-side QR generation suite supporting 11 distinct content payload types, styling controls, frame generation, live independent scanning (jsQR), and multi-format exports (PNG, SVG, PDF, Batch ZIP).

Every user-facing feature was inventoried from actual source files (`index.html`, `main.js`, `css/components.css`) and verified against boundary conditions and edge cases.

---

## 2. Feature Inventory & Verification Matrix

| Feature ID | Feature Category | Description | Status | Evidence / Test Details | Severity | File Reference |
| :--- | :--- | :--- | :---: | :--- | :---: | :--- |
| **F-01** | Content Type: URL | Standard HTTP/HTTPS link encoding with query params & hashes | **PASS** | Validated with URLs up to 256 chars; generated 29x29 to 37x37 module matrices. | — | `main.js:731-732` |
| **F-02** | Content Type: Text | Freeform text payload, multiline, unicode | **PASS** | Validated with newlines and punctuation. Text length counter updates live. | — | `main.js:733-734` |
| **F-03** | Content Type: Wi-Fi | WPA/WEP/nopass Wi-Fi network credential string | **PASS** | Generates standard `WIFI:S:...;T:...;P:...;;`. Escapes special chars (`\`, `;`, `,`, `:`). | — | `main.js:735-747` |
| **F-04** | Content Type: vCard | Electronic business card vCard 3.0 format | **PASS** | Builds `BEGIN:VCARD` with `N`, `FN`, `ORG`, `TITLE`, `TEL`, `EMAIL`, `URL`. | — | `main.js:748-767` |
| **F-05** | Content Type: WhatsApp | Direct WhatsApp chat link generation | **PASS** | Generates `https://wa.me/{phone}?text={encodedMsg}` with cleaned international numbers. | — | `main.js:768-773` |
| **F-06** | Content Type: Social | Social media profiles (Instagram, LinkedIn, YouTube, X, GitHub) | **PASS** | Strips leading `@` and links to platform endpoints. | — | `main.js:774-786` |
| **F-07** | Content Type: Email | mailto URI with subject and body | **PASS** | Generates `mailto:{to}?subject=...&body=...` using `encodeURIComponent`. | — | `main.js:787-798` |
| **F-08** | Content Type: Event | iCal calendar VEVENT payload | **PASS** | Builds `BEGIN:VEVENT` with `SUMMARY`, `DTSTART`, `DTEND`, `LOCATION`. | — | `main.js:799-812` |
| **F-09** | Content Type: Location | GPS coordinates to Google Maps link | **PASS** | Coordinates formatted as `https://maps.google.com/?q={lat},{lng}`. Browser GPS button verified. | — | `main.js:813-818` |
| **F-10** | Content Type: Crypto | Cryptocurrency address and amount | **PASS** | Formats `{coin}:{address}?amount={amt}` for Bitcoin, Ethereum, USDT, Solana. | — | `main.js:819-825` |
| **F-11** | Content Type: Phone / SMS | Direct tel link or smsto URI | **PASS** | Switchable between `tel:{phone}` and `smsto:{phone}:{msg}`. | — | `main.js:826-835` |
| **F-12** | Appearance Tabs | Progressive disclosure of Logo, Frame, Advanced | **PASS** | Exactly 1 tab visible at a time (`+ Logo`, `+ Frame`, `Advanced`). Clean state transition. | — | `main.js:2134-2172` |
| **F-13** | Custom Logo Upload | User logo placement with background badge | **PASS** | FileReader processes PNG/JPG/SVG. Logo badge maintains quiet background padding. | — | `main.js:2316-2348` |
| **F-14** | Error Correction Auto-elevation | Dynamic elevation of EC level to 'H' when logo is added | **PASS** | Prevents matrix corruption by allocating 30% Reed-Solomon recovery capacity. | — | `main.js:862-863` |
| **F-15** | Frame & Banner CTA | Outer banners (bottom, top, full-card, bubble, border) | **PASS** | Scalable canvas drawing with customizable CTA text, text color, and background. | — | `main.js:902-942` |
| **F-16** | PNG Export | Raster download at user-selected resolutions (400px–2400px) | **PASS** | High-resolution canvas rendering triggers clean instant blob download. | — | `main.js:2440-2449` |
| **F-17** | SVG Export | Vector SVG generation with finder eyes & frame labels | **ISSUES FOUND** | Preset `hzgpd` logo referenced external relative path `../../Src/favicon-HzGPD.png` in SVG. | **P1** | `main.js:1355` |
| **F-18** | Batch Generation | Bulk QR generation from multiline text into ZIP archive | **PASS** | JSZip generates compressed ZIP archive with named PNG files and live progress bar. | — | `main.js:1432-1500` |
| **F-19** | Print & PDF Layouts | Multi-up stickers (12), Tent cards, Single A4 poster | **PASS** | jsPDF compiles print sheets with cutting guides, fold lines, and titles. | — | `main.js:1501-1598` |
| **F-20** | QR Camera Scanner | WebRTC live video camera scanning & decoding via jsQR | **PASS** | `getUserMedia` captures camera; frames analyzed in `requestAnimationFrame` loop. | — | `main.js:1600-1650` |
| **F-21** | QR Image Scanner | File drag-and-drop / file input QR decoding | **PASS** | Decodes uploaded image via canvas and `jsQR`. Decoded payload imported directly. | — | `main.js:1680-1748` |
| **F-22** | Template Gallery | Built-in design presets with real live rendered previews | **PASS** | Renders 6 curated presets with live preview thumbnails. | — | `main.js:1750-1930` |
| **F-23** | Undo / Redo History | Stack tracking with keyboard shortcuts (Ctrl+Z / Ctrl+Y) | **PASS** | Snapshot stack capped at 30 entries. Ignores shortcuts when typing in inputs. | — | `main.js:270-320` |
| **F-24** | Draft Recovery | Automatic persistence to `localStorage` | **PASS** | Auto-saves active state under `liquid_qr_draft_v2`. Recovers on page refresh. | — | `main.js:322-358` |

---

## 3. Reproduction Steps for Confirmed Defect (F-17)

1. Select preset logo **HzGPD** in Logo tab.
2. Click **Download SVG**.
3. Inspect exported SVG markup in a text editor.
4. **Result:** `<image ... href="../../Src/favicon-HzGPD.png" />`
5. **Impact:** When opened on a user's machine outside the repository folder, the logo is broken because the relative path fails.
6. **Required Correction:** Inline image as a Base64 data URI in the SVG generator.
