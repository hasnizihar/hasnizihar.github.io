---
trigger: always_on
---


---

# 🧊 Liquid Glass CSS Theme — Design Plan

## 1️⃣ Core Visual Principles

Liquid glass is based on **depth, blur, light, and softness**.

### Key characteristics

* **Translucent surfaces**
* **Background blur (backdrop-filter)**
* **Soft gradients**
* **Subtle borders**
* **Smooth motion**

> Rule: *Nothing should feel sharp or heavy.*

---

## 2️⃣ Color System 🎨

### Background

Use **soft gradients**, not flat colors.

```css
background: linear-gradient(
  135deg,
  #0f2027,
  #203a43,
  #2c5364
);
```

or light theme:

```css
background: linear-gradient(
  135deg,
  #eef2f3,
  #d9e2ec
);
```

---

### Glass Surface Color

Use **semi-transparent white** (or dark for dark mode).

```css
rgba(255, 255, 255, 0.15);  /* light glass */
rgba(0, 0, 0, 0.25);        /* dark glass */
```

---

### Accent Color

Use **1 main accent only**:

* Cyan
* Mint
* Soft blue
* Violet

Example:

```css
--accent: #6ee7f9;
```

---

## 3️⃣ Glass Card Base Style 🧩

This is your **core reusable class**.

```css
.glass {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(16px) saturate(160%);
  -webkit-backdrop-filter: blur(16px) saturate(160%);

  border-radius: 20px;

  border: 1px solid rgba(255, 255, 255, 0.25);

  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.2);

  padding: 20px;
}
```

✅ Use this for:

* Cards
* Header
* Buttons
* Modals
* Link blocks

---

## 4️⃣ Liquid Highlights ✨

Add a **soft light reflection** to glass.

```css
.glass::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(
    120deg,
    rgba(255,255,255,0.4),
    rgba(255,255,255,0.05),
    transparent
  );
  opacity: 0.3;
  pointer-events: none;
}
```

This gives the **“wet glass”** effect.

---

## 5️⃣ Hover & Motion (Desktop Only) 🖱️

💡 You already decided hover effects **desktop-only** — good choice.

```css
@media (hover: hover) {
  .glass:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow:
      0 12px 40px rgba(0, 0, 0, 0.35);
  }
}
```

### Motion rules

* Duration: **200–300ms**
* Timing: `ease-out`
* Never bounce or overshoot

---

## 6️⃣ Typography Style ✍️

### Font Choice

Best fonts for liquid glass:

* Inter
* SF Pro
* Poppins
* Manrope

```css
body {
  font-family: 'Inter', sans-serif;
  color: rgba(255, 255, 255, 0.9);
}
```

### Text Contrast

Avoid pure white.

```css
color: rgba(255,255,255,0.85);
```

---

## 7️⃣ Buttons & Links 🔘

```css
.glass-btn {
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 14px;
  padding: 12px 18px;
  color: white;
}
```

Hover glow:

```css
.glass-btn:hover {
  background: rgba(255,255,255,0.3);
}
```

---

## 8️⃣ Header Behavior (Glass Navigation) 🧭

### Default

* Transparent glass
* Small height

### On Scroll

* Increase blur
* Slightly darker
* Reduce height

```css
.header.scrolled {
  background: rgba(0,0,0,0.4);
  backdrop-filter: blur(20px);
}
```

---

## 9️⃣ Mobile Optimization 📱

❌ Avoid:

* Heavy blur
* Strong shadows
* Large hover effects

✔️ Use:

```css
@media (max-width: 768px) {
  .glass {
    backdrop-filter: blur(10px);
  }
}
```

---

## 🔟 Common Mistakes to Avoid ⚠️

❌ Too much blur
❌ Too many colors
❌ Thick borders
❌ High contrast text
❌ Sharp corners

---

## ✅ Recommended Component Set

| Component | Style              |
| --------- | ------------------ |
| Cards     | Frosted glass      |
| Header    | Glass + hide/show  |
| Buttons   | Glass pills        |
| Modals    | Heavy blur         |
| Links     | Soft glow on hover |

---

## 🔥 Final Tip (Very Important)

> **Liquid Glass = restraint**
>
> If it looks impressive at first glance, it’s probably too much.
> If it feels calm and premium — you nailed it.

---

