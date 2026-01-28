import httpx
import json
from config import config

# Note: This is an example for Groq API. Adjust based on user's choice in secrets.txt
# If using OpenAI, the endpoint/headers would change slightly.

SYSTEM_PROMPT = """
You are an expert weather analyst. You will receive structured weather facts.
Return a STRICT JSON response only. No conversational filler.
Schema:
{
  "summary": "Short punchy overview",
  "today": ["Bullet 1", "Bullet 2"],
  "next_24h": ["Bullet 1", "Bullet 2"],
  "next_7d": ["Bullet 1", "Bullet 2"],
  "activity_advice": ["Activity-specific tip based on mode"],
  "risks": [{"type":"rain|wind|heat|storm|flood","level":"low|med|high","reason":"string"}],
  "recommendations": ["Carry umbrella", "Wear sunscreen", etc],
  "best_time_windows": ["HH:MM-HH:MM (Reason)"],
  "confidence": 0.0-1.0
}
"""

async def get_ai_summary(facts, computed, activity_mode="general"):
    """
    Calls LLM to generate a weather summary.
    """
    if not config.LLM_API_KEY:
        return None, "Missing API Key"

    user_content = f"Activity Mode: {activity_mode}\nFacts: {json.dumps(facts)}\nComputed Metrics: {json.dumps(computed)}"
    
    url = f"https://api.groq.com/openai/v1/chat/completions" # Defaulting to Groq for this example
    headers = {
        "Authorization": f"Bearer {config.LLM_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": config.LLM_MODEL,
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_content}
        ],
        "response_format": {"type": "json_object"}
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(url, json=payload, headers=headers, timeout=30.0)
            if response.status_code != 200:
                print(f"LLM Error: {response.text}")
                return None, f"API Error: {response.status_code}"
            
            data = response.json()
            content = data["choices"][0]["message"]["content"]
            return json.loads(content), None
    except Exception as e:
        print(f"LLM Exception: {str(e)}")
        return None, str(e)

async def ask_weather_question(facts, question):
    """
    Answers a specific user question about the weather.
    """
    if not config.LLM_API_KEY:
        return {"answer": "AI features disabled (no key).", "confidence": 0}

    prompt = f"Answer this question based on these weather facts: {json.dumps(facts)}\nQuestion: {question}\n\nReturn JSON: {{'answer': 'string', 'confidence': float, 'supporting': {{'time': 'string', 'values': {{}}}}}}"
    
    url = f"https://api.groq.com/openai/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {config.LLM_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": config.LLM_MODEL,
        "messages": [
            {"role": "system", "content": "You are a direct weather assistant. Answer briefly and accurately."},
            {"role": "user", "content": prompt}
        ],
        "response_format": {"type": "json_object"}
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(url, json=payload, headers=headers)
            data = response.json()
            return json.loads(data["choices"][0]["message"]["content"])
    except Exception as e:
        return {"answer": f"Error communicating with AI: {str(e)}", "confidence": 0}
