from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import time
from datetime import datetime

from weather import get_geocode, fetch_weather_data, normalize_weather
from compute import compute_risks, compute_impact_scores, find_best_windows
from llm import get_ai_summary, ask_weather_question

app = FastAPI(title="WeatherSense API")

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory Cache (Simple dictionary)
# For a production app, use Redis.
weather_cache = {}
summary_cache = {}

class WeatherRequest(BaseModel):
    lat: float
    lon: float
    location_name: Optional[str] = "Unknown"
    units: Optional[str] = "metric"
    activity_mode: Optional[str] = "general"

class AskRequest(BaseModel):
    lat: float
    lon: float
    question: str
    units: Optional[str] = "metric"

@app.get("/api/health")
async def health():
    return {"ok": True, "time": datetime.now().isoformat()}

@app.get("/api/geocode")
async def geocode(name: str):
    try:
        data = await get_geocode(name)
        return {"results": data.get("results", [])}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/weather-summary")
async def weather_summary(req: WeatherRequest):
    cache_key = f"{req.lat}:{req.lon}:{req.units}"
    now = time.time()
    
    # 1. Fetch Weather (Check Cache)
    if cache_key in weather_cache and (now - weather_cache[cache_key]['time']) < 600:
        raw_weather = weather_cache[cache_key]['data']
    else:
        try:
            raw_weather = await fetch_weather_data(req.lat, req.lon, req.units)
            weather_cache[cache_key] = {'time': now, 'data': raw_weather}
        except Exception as e:
            import traceback
            traceback.print_exc()
            raise HTTPException(status_code=500, detail=f"Weather API Error: {str(e)}")

    # 2. Normalize and Compute
    facts = normalize_weather(raw_weather)
    risks = compute_risks(facts, req.units)
    scores = compute_impact_scores(facts)
    windows = find_best_windows(raw_weather.get("hourly", {}))
    
    computed = {
        "risk_badges": risks,
        "impact_scores": scores,
        "best_time_windows": windows
    }

    # 3. AI Summary (Check Cache)
    ai_cache_key = f"{cache_key}:{req.activity_mode}"
    if ai_cache_key in summary_cache and (now - summary_cache[ai_cache_key]['time']) < 900:
        ai_data = summary_cache[ai_cache_key]['data']
    else:
        ai_result, err = await get_ai_summary(facts, computed, req.activity_mode)
        if err:
            # Fallback
            ai_data = {
                "summary": "AI summary currently unavailable. See details below.",
                "today": [f"Temp range: {facts['next_24h']['temp_min']}° to {facts['next_24h']['temp_max']}°"],
                "next_24h": [f"Total rain: {facts['next_24h']['precip_total']}mm"],
                "risks": risks,
                "confidence": 0.3,
                "error": True
            }
        else:
            ai_data = ai_result
            summary_cache[ai_cache_key] = {'time': now, 'data': ai_data}

    return {
        "location": {
            "name": req.location_name,
            "lat": req.lat,
            "lon": req.lon,
            "timezone": raw_weather.get("timezone"),
            "generated_at": datetime.now().isoformat()
        },
        "weather": facts,
        "computed": computed,
        "ai": ai_data
    }

@app.post("/api/ask")
async def ask(req: AskRequest):
    # Fetch latest weather for context (using cache if possible)
    cache_key = f"{req.lat}:{req.lon}:{req.units}"
    if cache_key in weather_cache:
        raw_weather = weather_cache[cache_key]['data']
    else:
        raw_weather = await fetch_weather_data(req.lat, req.lon, req.units)
    
    facts = normalize_weather(raw_weather)
    answer = await ask_weather_question(facts, req.question)
    return answer

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
