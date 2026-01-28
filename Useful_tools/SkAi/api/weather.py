import httpx
from datetime import datetime

GEOCODE_URL = "https://geocoding-api.open-meteo.com/v1/search"
WEATHER_URL = "https://api.open-meteo.com/v1/forecast"

async def get_geocode(name: str):
    """
    Search for a location by name.
    """
    params = {
        "name": name,
        "count": 5,
        "language": "en",
        "format": "json"
    }
    async with httpx.AsyncClient() as client:
        response = await client.get(GEOCODE_URL, params=params)
        response.raise_for_status()
        return response.json()

async def fetch_weather_data(lat: float, lon: float, units: str = "metric"):
    """
    Fetches raw forecast data from Open-Meteo.
    """
    wind_unit = "kmh" if units == "metric" else "mph"
    temp_unit = "celsius" if units == "metric" else "fahrenheit"
    precip_unit = "mm" if units == "metric" else "inch"

    params = {
        "latitude": lat,
        "longitude": lon,
        "current_weather": "true",
        "hourly": "temperature_2m,precipitation,wind_speed_10m,relative_humidity_2m,weather_code",
        "daily": "temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,weather_code",
        "timezone": "auto",
        "wind_speed_unit": wind_unit,
        "temperature_unit": temp_unit,
        "precipitation_unit": precip_unit
    }

    async with httpx.AsyncClient() as client:
        try:
            print(f"Fetching weather from: {WEATHER_URL} with params: {params}")
            response = await client.get(WEATHER_URL, params=params, timeout=10.0)
            print(f"Weather API Status: {response.status_code}")
            response.raise_for_status()
            return response.json()
        except httpx.HTTPStatusError as e:
            err_msg = f"Weather API returned {e.response.status_code}: {e.response.text}"
            print(err_msg)
            raise Exception(err_msg)
        except httpx.ConnectError:
            err_msg = "Could not connect to Weather API. Check your internet connection."
            print(err_msg)
            raise Exception(err_msg)
        except Exception as e:
            err_msg = f"Unexpected error fetching weather: {str(e)}"
            print(err_msg)
            raise Exception(err_msg)

def normalize_weather(raw_data):
    """
    Extracts key facts from raw weather data.
    """
    current = raw_data.get("current_weather", {})
    hourly = raw_data.get("hourly", {})
    daily = raw_data.get("daily", {})

    # Hourly Facts (Next 24h)
    temp_24h = hourly.get("temperature_2m", [])[:24]
    precip_24h = hourly.get("precipitation", [])[:24]
    wind_24h = hourly.get("wind_speed_10m", [])[:24]
    hum_24h = hourly.get("relative_humidity_2m", [])[:24]
    times = hourly.get("time", [])[:24]

    facts = {
        "current": {
            "temp": current.get("temperature"),
            "wind": current.get("windspeed"),
            "code": current.get("weathercode"),
            "time": current.get("time")
        },
        "next_24h": {
            "temp_max": max(temp_24h) if temp_24h else None,
            "temp_min": min(temp_24h) if temp_24h else None,
            "precip_total": sum(precip_24h) if precip_24h else 0,
            "peak_precip": max(precip_24h) if precip_24h else 0,
            "peak_wind": max(wind_24h) if wind_24h else 0,
            "rainy_hours": len([p for p in precip_24h if p > 0.1]),
            "humidity_avg": round(sum(hum_24h) / len(hum_24h)) if hum_24h else 0,
            "hourly_temp": temp_24h,
            "hourly_precip": precip_24h,
            "hourly_times": [t.split("T")[-1] for t in times[:24]] # Add times for chart
        },
        "next_7d": {
            "temp_max": daily.get("temperature_2m_max", []),
            "temp_min": daily.get("temperature_2m_min", []),
            "precip_sum": daily.get("precipitation_sum", []),
            "wind_max": daily.get("wind_speed_10m_max", []),
            "codes": daily.get("weather_code", [])
        }
    }
    return facts
