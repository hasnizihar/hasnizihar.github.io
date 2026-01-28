def compute_risks(facts, units="metric"):
    """
    Returns risk badges based on thresholds.
    Handles both metric and us (imperial) units.
    """
    risks = []
    n24 = facts.get("next_24h", {})
    curr_code = facts.get("current", {}).get("code", 0)
    
    # 1. Rain Risk
    rain_total = n24.get("precip_total", 0)
    # Thresholds: Metric (mm), US (inches)
    rain_high = 20 if units == "metric" else 0.8
    rain_med = 10 if units == "metric" else 0.4
    
    if rain_total >= rain_high:
        risks.append({"type": "rain", "level": "high", "reason": f"Heavy rain ({rain_total}{'mm' if units=='metric' else 'in'}) expected"})
    elif rain_total >= rain_med:
        risks.append({"type": "rain", "level": "med", "reason": f"Moderate rain ({rain_total}{'mm' if units=='metric' else 'in'}) expected"})
    
    # 2. Wind Risk
    peak_wind = n24.get("peak_wind", 0)
    # Thresholds: Metric (km/h), US (mph)
    wind_high = 50 if units == "metric" else 30
    wind_med = 35 if units == "metric" else 20
    
    if peak_wind >= wind_high:
        risks.append({"type": "wind", "level": "high", "reason": f"Dangerous winds ({peak_wind}{'km/h' if units=='metric' else 'mph'})"})
    elif peak_wind >= wind_med:
        risks.append({"type": "wind", "level": "med", "reason": f"Strong winds ({peak_wind}{'km/h' if units=='metric' else 'mph'})"})

    # 3. Temperature Risks (Heat/Cold)
    temp_max = n24.get("temp_max", 0)
    temp_min = n24.get("temp_min", 0)
    
    if units == "metric":
        if temp_max >= 38: risks.append({"type": "heat", "level": "high", "reason": f"Extreme heat ({temp_max}°C)"})
        elif temp_max >= 34: risks.append({"type": "heat", "level": "med", "reason": f"High heat ({temp_max}°C)"})
        
        if temp_min <= 0: risks.append({"type": "cold", "level": "high", "reason": f"Freeze warning ({temp_min}°C)"})
        elif temp_min <= 5: risks.append({"type": "cold", "level": "med", "reason": f"Frost risk ({temp_min}°C)"})
    else: # Imperial
        if temp_max >= 100: risks.append({"type": "heat", "level": "high", "reason": f"Extreme heat ({temp_max}°F)"})
        elif temp_max >= 93: risks.append({"type": "heat", "level": "med", "reason": f"High heat ({temp_max}°F)"})
        
        if temp_min <= 32: risks.append({"type": "cold", "level": "high", "reason": f"Freeze warning ({temp_min}°F)"})
        elif temp_min <= 41: risks.append({"type": "cold", "level": "med", "reason": f"Frost risk ({temp_min}°F)"})

    # 4. Thunderstorm Risk (Code based)
    if curr_code >= 95:
        risks.append({"type": "storm", "level": "high", "reason": "Thunderstorms active/likely"})

    return risks

def compute_impact_scores(facts):
    """
    Computes curiosity scores (1-10 scale). 10 is perfect.
    """
    n24 = facts.get("next_24h", {})
    rain = n24.get("precip_total", 0)
    wind = n24.get("peak_wind", 0)
    t_max = n24.get("temp_max", 25)
    
    # Outdoor Score
    outdoor = 10
    outdoor -= (rain / 2) # -5 for 10mm
    outdoor -= (wind / 5) # -7 for 35kmh
    if t_max > 32: outdoor -= (t_max - 32)
    if t_max < 15: outdoor -= (15 - t_max)
    outdoor = max(1, min(10, round(outdoor)))

    # Travel Score
    travel = 10
    travel -= (rain / 4)
    travel -= (wind / 10)
    if rain > 30: travel -= 3
    travel = max(1, min(10, round(travel)))

    # Comfort Score
    comfort = 10
    if t_max > 30: comfort -= (t_max - 30)
    if t_max < 18: comfort -= (18 - t_max) / 2
    comfort = max(1, min(10, round(comfort)))

    return {
        "outdoor": outdoor,
        "travel": travel,
        "comfort": comfort
    }

def find_best_windows(raw_hourly):
    """
    Finds best 3-hour windows for outdoor activity from hourly data.
    """
    temps = raw_hourly.get("temperature_2m", [])[:24]
    precips = raw_hourly.get("precipitation", [])[:24]
    winds = raw_hourly.get("wind_speed_10m", [])[:24]
    times = raw_hourly.get("time", [])[:24]

    windows = []
    # Slide a 3-hour window
    for i in range(len(temps) - 2):
        win_temps = temps[i:i+3]
        win_precip = sum(precips[i:i+3])
        win_wind = max(winds[i:i+3])
        
        avg_temp = sum(win_temps) / 3
        # Score calculation: lower precip, moderate temp, lower wind is better
        # Best temp is around 22-26
        temp_penalty = abs(avg_temp - 24)
        score = 100 - (win_precip * 20) - (win_wind * 2) - (temp_penalty * 3)
        
        start_time = times[i].split("T")[-1]
        end_time = times[i+2].split("T")[-1]
        
        windows.append({
            "range": f"{start_time} - {end_time}",
            "score": score,
            "precip": win_precip,
            "temp": round(avg_temp, 1)
        })

    # Sort by score and take top 3
    windows.sort(key=lambda x: x["score"], reverse=True)
    return windows[:3]
