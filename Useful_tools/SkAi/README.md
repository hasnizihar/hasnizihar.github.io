# 🌤️ WeatherSense User Guide

Welcome to **WeatherSense**, your modern AI-powered weather dashboard. This guide will help you set up and make the most of our predictive insights and analysis tools.

---

## 🚀 Quick Start

### 1. Prerequisites
- **Python 3.8+** installed on your system.
- An API Key from an LLM provider (e.g., **Groq**).

### 2. Backend Setup
1. **Install Dependencies**:
   ```powershell
   pip install -r requirements.txt
   ```
2. **Configure API Key**:
   Create a `secrets.txt` file in the root directory (if not present) and add:
   ```text
   LLM_API_KEY=your_actual_key_here
   LLM_PROVIDER=groq
   LLM_MODEL=llama-3.3-70b-versatile
   ```
3. **Run Server**:
   ```powershell
   python server.py
   ```
   *The server is ready when you see: `Uvicorn running on http://0.0.0.0:8000`*

### 3. Frontend Access
Simply open `index.html` in your favorite web browser!

---

## 🛠️ Core Features Guide

### 📍 Finding Your Weather
- **Search Bar**: Type any city name (e.g., "Paris") and select from the dropdown.
- **GPS Locate**: Click the 🛰️ icon to use your current coordinates.
- **Interactive Map**: Click anywhere on the map to instantly fetch weather for that spot.
- **Recent Locations**: Your last 5 searches are saved in the sidebar for quick access.

### 🤖 AI Summary & Insights
- **Human-Style Summary**: Read a natural-language breakdown of today's conditions.
- **Activity Advice**: Personalized recommendations based on your selected mode (Running, Picnic, etc.).
- **Ask the Weather**: Use the chat box at the bottom to ask specific questions like *"Should I carry an umbrella at 4 PM?"*

### 📊 Understanding Metrics
- **Risk Badges**: Clear alerts for high heat, heavy rain, or strong winds.
- **Impact Scores**: 1-10 ratings for **Outdoor Activity**, **Travel Safety**, and **Personal Comfort**.
- **Best Windows**: Highlights the specific hours today with the most pleasant conditions.
- **Explainability**: Click "How are these calculated?" to see the raw metrics used for scores.

---

## ❓ Troubleshooting

### "Failed to fetch" Error
This usually means the Python backend is not running.
1. Ensure you have run `python server.py`.
2. Check that the terminal window shows no errors.
3. Refresh the browser page.

### AI Summary Unavailable
- Verify your `LLM_API_KEY` is correct in `secrets.txt`.
- Check your internet connection.
- The app will automatically fall back to rule-based summaries if the AI is offline.

---

## 🔒 Privacy & Security
- Your API keys are stored **locally** in `secrets.txt` and are never exposed to the browser or the internet.
- Location data is stored only in your browser's `localStorage`.
