# 🚀 Liquid QR Studio 2.1 — GitHub Pages Deployment Audit

**Audit Date:** October 18, 2026  
**Auditor:** Antigravity Static-Site Deployment Specialist  
**Deployment Target:** GitHub Pages (`https://hasnizihar.github.io/Useful_tools/QR-code-generator/`)  
**Architecture:** 100% Static HTML/CSS/JS (Zero Node build dependencies)

---

## 1. Executive Summary

Static hosting environments like GitHub Pages frequently serve applications from repository subpaths rather than the domain root (e.g. `https://<user>.github.io/<repo>/<subpath>/`).

Any absolute-root references (such as `/main.css`, `/css/style.css`, `/main.js`) fail on subpath hosting because the browser attempts to fetch them from `https://<user>.github.io/main.css`.

This audit confirmed that all asset references in `index.html`, `main.css`, `sw.js`, and `manifest.webmanifest` are strictly relative or scoped to `./`, guaranteeing subpath hosting compatibility.

---

## 2. Deployment Integrity Checklist

| Check Item | Requirement | Verification Method | Status |
| :--- | :--- | :--- | :---: |
| **No Absolute Root Paths** | No `href="/..."` or `src="/..."` | Automated regex audit on `index.html` and `main.css` | **PASS** |
| **Relative Script Links** | All `<script src="...">` use relative `./` paths | Inspected `qrcode.min.js`, `jsQR.min.js`, `jszip.min.js`, `jspdf.umd.min.js`, `main.js` | **PASS** |
| **Relative CSS Links** | All `<link rel="stylesheet">` use relative paths | Inspected `main.css`, `css/components.css`, `css/responsive.css` | **PASS** |
| **Case-Sensitive Filenames** | Exact case matching on Linux/GitHub Pages servers | Verified actual filenames against code references (`jsQR.min.js`, `jspdf.umd.min.js`, etc.) | **PASS** |
| **Service Worker Scope** | Scoped to `./` rather than `/` | Inspected `navigator.serviceWorker.register('./sw.js', { scope: './' })` | **PASS** |
| **Manifest Start URL** | Scoped to `./` or `./index.html` | Inspected `manifest.webmanifest: "start_url": "./index.html"` | **PASS** |
| **MIME Types** | Standard static MIME types | Verified webmanifest (`.webmanifest`), JavaScript (`.js`), CSS (`.css`), SVG (`.svg`), PNG (`.png`) | **PASS** |
| **Self-Contained Local Icon** | Icon bundled locally in folder | Verified `./hzgpdfavicin.png` (6,532 bytes) exists directly in directory | **PASS** |

---

## 3. Subpath Hosting Compatibility Verification

### 3.1 Script and Style Asset Links (`index.html`)
```html
<link rel="stylesheet" href="./main.css">
<link rel="stylesheet" href="./css/components.css">
<link rel="stylesheet" href="./css/responsive.css">

<script src="./qrcode.min.js"></script>
<script src="./jsQR.min.js"></script>
<script src="./jszip.min.js"></script>
<script src="./jspdf.umd.min.js"></script>
<script src="./main.js" defer></script>
```
Every resource points to `./` relative to the current directory, ensuring that whether the studio is hosted at:
- `https://hasnizihar.github.io/Useful_tools/QR-code-generator/`
- `https://username.github.io/QR-code-generator/`
- Or accessed via local `file:///` protocol / local static HTTP server

All assets resolve correctly with zero 404 HTTP errors.

### 3.2 Case Sensitivity on GitHub Pages Linux Containers
GitHub Pages serves from Linux-based containers where filenames are strictly case-sensitive. The local files were verified on disk:
- `jsQR.min.js` $\leftrightarrow$ `src="./jsQR.min.js"` (Case-matched)
- `jspdf.umd.min.js` $\leftrightarrow$ `src="./jspdf.umd.min.js"` (Case-matched)
- `jszip.min.js` $\leftrightarrow$ `src="./jszip.min.js"` (Case-matched)
- `qrcode.min.js` $\leftrightarrow$ `src="./qrcode.min.js"` (Case-matched)
- `hzgpdfavicin.png` $\leftrightarrow$ `href="./hzgpdfavicin.png"` (Case-matched)
