
---

## Project Title

**WeatherSense — AI Weather Summary & Analysis Website**

## Objective

Build a site that:

1. gets user location (GPS) or city search
2. fetches weather data from a free weather API
3. extracts key “facts” + computes risks/scores
4. sends facts to an LLM for a structured summary + advice
5. renders a modern dashboard with charts, modes, and personalization
6. works reliably with caching, fallbacks, and safe key handling

---

# 0) Key Security Rule (MUST FOLLOW)

### ✅ Store all personal keys in a text file (never hardcode)

* Create a file: **`secrets.txt`** (or `.env` if allowed, but user asked text file, so use `secrets.txt`)
* This file must **NOT** be committed to git.
* Add to `.gitignore`: `secrets.txt`

**Format example (`secrets.txt`):**

```
LLM_PROVIDER=groq
LLM_API_KEY=YOUR_KEY_HERE
LLM_MODEL=llama-3.1-70b-versatile
APP_ENV=dev
```

Backend must read this file at startup and load to environment variables or config object.

---

# 1) Tech Stack (Fixed)

### Frontend

* HTML + CSS + Vanilla JavaScript
* Optional: Chart.js (recommended for charts)

### Backend

* Python + FastAPI (recommended)
* Requests or httpx for API calls

---

# 2) Feature Set (Expanded — to be “Best”)

## A) Core Features

1. Use my location (GPS permission)
2. City search with multiple results list
3. Current conditions + hourly + 7-day forecast
4. AI summary in human language
5. Risks + recommendations
6. Responsive UI (mobile-first)

## B) “Best” Differentiators

7. **Activity Mode**: user selects (Running / Picnic / Travel / Work commute / Photography)

   * AI returns advice specific to that activity
8. **Best Time Window Finder**

   * Finds the best 2–3 hour windows with low rain + moderate temp + low wind
   * Shows “Best time today: 10:00–13:00”
9. **Impact Scores (1–10)**

   * Outdoor score
   * Travel score
   * Comfort score
10. **Ask the Weather (Chat Question Box)**

* User asks: “Will it rain at 6 PM?”
* Backend answers using same forecast facts + LLM

11. **Explainability Toggle**

* “Why this summary?” shows the key metrics used

12. **Saved Locations**

* Save Home/Work/Favorites in localStorage

13. **Units toggle**

* Metric/Imperial switch (default metric)

14. **Data freshness & confidence**

* Show updated time + AI confidence %

15. **Offline-friendly**

* If weather fetch fails, show last cached result (if exists)

## C) Nice-to-Have Premium

16. Weekly comparison (“This week vs last week” if data exists)
17. Seasonal anomaly hints (if simple climatology data available later)
18. Shareable summary card (copy text / generate link)

---

# 3) System Architecture

### Frontend (Browser)

* Collects user input (GPS/city/activity/question)
* Calls backend endpoints
* Renders dashboard sections + charts + “assistant” results
* Stores saved locations in localStorage

### Backend (Python)

* Protects LLM API key
* Fetches weather + geocode
* Extracts facts and computes:

  * next 24h totals, peaks
  * risk levels
  * scores
  * best time windows
* Calls LLM with strict prompt for JSON output
* Provides fallbacks if LLM fails

---

# 4) User Flows

## Flow 1: Use My Location

1. Click “Use my location”
2. Browser obtains lat/lon
3. Frontend POST `/api/weather-summary` with `{lat, lon, activity_mode, units}`
4. Backend responds with weather + facts + AI JSON
5. UI renders everything

## Flow 2: Search City

1. User types city and clicks search
2. Frontend GET `/api/geocode?name=...`
3. Display list of matches
4. User chooses one
5. Frontend POST `/api/weather-summary`

## Flow 3: Activity Mode

1. User chooses activity (dropdown)
2. UI calls `/api/weather-summary` again (same location) but with activity_mode
3. AI response includes tailored advice

## Flow 4: Ask the Weather

1. User types question (“Will it rain at 6 PM?”)
2. Frontend POST `/api/ask` with `{lat, lon, question, units}`
3. Backend uses cached weather facts + calls LLM
4. Returns short direct answer + supporting data

## Flow 5: Save Locations

1. User clicks “Save as Home”
2. Store in localStorage
3. Quick access buttons load that location without searching again

---

# 5) Backend Endpoints (Full Contract)

## 5.1 GET /api/health

Returns:

```json
{"ok": true, "env": "dev"}
```

## 5.2 GET /api/geocode?name=Colombo

Response:

```json
{
  "results": [
    {"name":"Colombo","country":"Sri Lanka","admin1":"Western","latitude":6.9271,"longitude":79.8612,"timezone":"Asia/Colombo"}
  ]
}
```

## 5.3 POST /api/weather-summary

Request:

```json
{
  "lat": 6.9271,
  "lon": 79.8612,
  "location_name": "Colombo, Sri Lanka",
  "units": "metric",
  "activity_mode": "travel"
}
```

Response:

```json
{
  "location": {
    "name":"Colombo, Sri Lanka",
    "lat":6.9271,
    "lon":79.8612,
    "timezone":"Asia/Colombo",
    "generated_at":"ISO_STRING"
  },
  "weather": {
    "current": {...},
    "hourly_24h": {...},
    "daily_7d": {...}
  },
  "facts": {...},
  "computed": {
    "risk_badges": [...],
    "impact_scores": {...},
    "best_time_windows": [...]
  },
  "ai": {
    "summary_json": {...},
    "error": false
  }
}
```

## 5.4 POST /api/ask

Request:

```json
{
  "lat": 6.9271,
  "lon": 79.8612,
  "question": "Will it rain at 6 PM?",
  "units": "metric"
}
```

Response:

```json
{
  "answer": "Likely light rain around 6 PM. Carry an umbrella.",
  "confidence": 0.78,
  "supporting": {
    "hour": "18:00",
    "precip_mm": 1.4,
    "wind_kmh": 22,
    "temp_c": 28
  }
}
```

---

# 6) Weather Fetch & Normalization Rules

## Weather API call

Use Open-Meteo Forecast with:

* current_weather=true
* timezone=auto
* hourly: temperature_2m, precipitation, wind_speed_10m, relative_humidity_2m, weather_code
* daily: temperature_2m_max, temperature_2m_min, precipitation_sum, wind_speed_10m_max, weather_code

## Extract these:

### Current

* temp, wind, humidity, code

### Next 24 hours

* temp min/max
* precipitation total
* peak precipitation per hour
* peak wind
* count of “rainy” hours (precip > 0.1mm)

### Next 7 days

* daily highs/lows
* daily rain totals
* daily max wind
* condition code

---

# 7) Computed Features (Rules Engine)

## A) Risk Badges

Define thresholds:

* heavy rain next 24h: ≥ 20mm → high
* moderate rain: 10–19mm → med
* high wind: ≥ 35km/h → high
* hot day: daily max ≥ 34°C → med/high

Return:

```json
[
  {"type":"rain","level":"med","reason":"12.4mm expected in next 24h"},
  {"type":"wind","level":"low","reason":"Peak wind 32km/h"}
]
```

## B) Impact Scores (1–10)

Example scoring logic:

* Outdoor score decreases with rain hours, heavy rain, high wind, extreme heat
* Travel score decreases with heavy rain + high wind
* Comfort score decreases with high humidity + high temps

## C) Best Time Windows

From the hourly array:

* Find 2–3 hour windows with:

  * lowest precipitation
  * moderate temps (e.g., 24–31°C)
  * wind below threshold
    Return top 3 windows.

---

# 8) LLM Prompts (Strict JSON)

## Summary Prompt Output Schema

```json
{
  "summary": "string",
  "today": ["string"],
  "next_24h": ["string"],
  "next_7d": ["string"],
  "activity_advice": ["string"],
  "risks": [{"type":"rain|wind|heat|storm|flood","level":"low|med|high","reason":"string"}],
  "recommendations": ["string"],
  "best_time_windows": ["string"],
  "confidence": 0.0
}
```

## Prompt rules:

* Return JSON only
* Don’t invent values
* Use computed windows + scores if provided
* Tailor activity advice if activity_mode is set
* If uncertain → say so and lower confidence

## Ask Prompt Output Schema

```json
{"answer":"string","confidence":0.0,"supporting":{"time":"string","values":{}}}
```

---

# 9) Frontend UI Requirements (Detailed)

## Layout Sections

1. Header: location + updated time + unit toggle
2. Controls:

   * Use my location
   * City search + results list
   * Activity dropdown
3. Current card (big temp + icon)
4. Next 24 hours card (bullets + mini chart)
5. 7-day forecast list (cards)
6. AI Summary section:

   * summary line
   * Today + Next24 + Next7 bullets
   * Best time windows
   * activity advice
7. Risks badges row
8. Impact score meters (3 meters)
9. Ask box (question + answer)
10. Saved locations row (Home/Work/Favorites)

## UI States

* Loading spinner while fetching
* Permission denied state (show city search)
* API error state (show cached if available)
* LLM error state (fallback summary shown)

---

# 10) Caching + Rate Limiting

## Cache keys

* `weather:{lat}:{lon}` TTL 10 min
* `summary:{lat}:{lon}:{activity}:{units}` TTL 15–30 min
* `ask:{lat}:{lon}:{hash(question)}` TTL 5 min (optional)

If weather API fails:

* Return last cached weather if exists

## Rate limiting

* 30 requests/min per IP on summary endpoint
* 60 requests/min per IP on geocode (lower cost)
* 20 requests/min per IP on ask endpoint

---

# 11) Fallback Summaries (No LLM)

If LLM fails, generate:

* “Temp range today: X–Y°C”
* “Rain expected: Z mm in 24h”
* “Wind peak: W km/h”
* Risks computed from thresholds
* Confidence low (0.35)

---

# 12) File/Folder Deliverables (Must Produce)

## Frontend

* `index.html`
* `styles.css`
* `app.js`

## Backend

* `server.py` (FastAPI app)
* `weather.py` (fetch + normalize)
* `compute.py` (risk + windows + scores)
* `llm.py` (LLM client + prompt)
* `config.py` (reads secrets.txt)
* `secrets.txt` (not committed)
* `.gitignore` includes secrets.txt

## Documentation

* `README.md` with:

  * how to run backend
  * how to run frontend
  * secrets format
  * endpoints

---

# 13) Acceptance Criteria (Testing)

✅ Works on mobile
✅ City search returns results and selection works
✅ GPS works and falls back gracefully
✅ Forecast shows current + 24h + 7d
✅ AI summary always renders JSON or fallback
✅ Best time windows display correctly
✅ Activity mode changes advice
✅ Ask box answers using forecast
✅ Saved locations persist after refresh
✅ No API keys appear in frontend code

---

