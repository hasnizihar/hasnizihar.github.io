// WeatherSense App Logic
// If you are developing locally, it uses localhost. 
// Once you have your Render URL, replace 'YOUR_RENDER_URL' below.
const API_BASE = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:8000/api"
    : "https://ziharhasni-skai-api.hf.space/api";
let weatherChart = null;

// UI Elements
const el = {
    citySearch: document.getElementById('citySearch'),
    searchBtn: document.getElementById('searchBtn'),
    searchResults: document.getElementById('searchResults'),
    locateBtn: document.getElementById('locateBtn'),
    savedLocations: document.getElementById('savedLocations'),
    unitToggle: document.getElementById('unitToggle'),
    activityMode: document.getElementById('activityMode'),
    currentLocation: document.getElementById('currentLocation'),
    updatedTime: document.getElementById('updatedTime'),
    currentTemp: document.getElementById('currentTemp'),
    currentIcon: document.getElementById('currentIcon'),
    currentDesc: document.getElementById('currentDesc'),
    currentWind: document.getElementById('currentWind'),
    currentHum: document.getElementById('currentHum'),
    aiSummaryText: document.getElementById('aiSummaryText'),
    aiHighlights: document.getElementById('aiHighlights'),
    activityAdvice: document.getElementById('activityAdvice'),
    aiLoader: document.getElementById('aiLoader'),
    riskBadges: document.getElementById('riskBadges'),
    scoreOutdoor: document.getElementById('scoreOutdoor'),
    scoreTravel: document.getElementById('scoreTravel'),
    scoreComfort: document.getElementById('scoreComfort'),
    valOutdoor: document.getElementById('valOutdoor'),
    valTravel: document.getElementById('valTravel'),
    valComfort: document.getElementById('valComfort'),
    bestWindows: document.getElementById('bestWindows'),
    askInput: document.getElementById('askInput'),
    askBtn: document.getElementById('askBtn'),
    askResponse: document.getElementById('askResponse'),
    dailyForecast: document.getElementById('dailyForecast')
};

// State
let state = {
    lat: null,
    lon: null,
    locationName: "",
    units: "metric",
    activity: "general",
    weatherData: null,
    map: null,
    marker: null
};

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    loadSavedLocations();
    setupEventListeners();
    initMap();

    // Default to last location or try GPS
    const last = JSON.parse(localStorage.getItem('lastLocation'));
    if (last) {
        updateLocation(last.lat, last.lon, last.name);
    }
});

function setupEventListeners() {
    el.searchBtn.addEventListener('click', handleSearch);
    el.citySearch.addEventListener('keypress', (e) => e.key === 'Enter' && handleSearch());
    el.locateBtn.addEventListener('click', useGPS);
    el.unitToggle.addEventListener('change', (e) => {
        state.units = e.target.value;
        refreshData();
    });
    el.activityMode.addEventListener('change', (e) => {
        state.activity = e.target.value;
        refreshData();
    });
    el.askBtn.addEventListener('click', handleAsk);

    // Explain Toggle
    const explainBtn = document.getElementById('toggleExplain');
    const explainContent = document.getElementById('explainContent');
    if (explainBtn && explainContent) {
        explainBtn.addEventListener('click', () => {
            explainContent.classList.toggle('hidden');
        });
    }
}

// Location Functions
async function handleSearch() {
    const query = el.citySearch.value.trim();
    if (!query) return;

    try {
        const res = await fetch(`${API_BASE}/geocode?name=${encodeURIComponent(query)}`);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.detail || "Search failed");
        }

        showSearchResults(data.results);
    } catch (err) {
        console.error("Geocode error", err);
        el.searchResults.innerHTML = `<div class="search-item text-danger">Error: ${err.message}</div>`;
        el.searchResults.classList.remove('hidden');
    }
}

function showSearchResults(results) {
    el.searchResults.innerHTML = '';
    el.searchResults.classList.remove('hidden');

    if (!results || results.length === 0) {
        el.searchResults.innerHTML = '<div class="search-item">No results found</div>';
        return;
    }

    results.forEach(res => {
        const div = document.createElement('div');
        div.className = 'search-item';
        div.textContent = `${res.name}, ${res.country} (${res.admin1 || ""})`;
        div.onclick = () => {
            updateLocation(res.latitude, res.longitude, `${res.name}, ${res.country}`);
            el.searchResults.classList.add('hidden');
            el.citySearch.value = '';
        };
        el.searchResults.appendChild(div);
    });
}

function useGPS() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(pos => {
            updateLocation(pos.coords.latitude, pos.coords.longitude, "My Location");
        }, err => {
            alert("Could not get location. Please search manually.");
        });
    }
}

function initMap() {
    const defaultLat = 0, defaultLon = 0;
    state.map = L.map('map').setView([defaultLat, defaultLon], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(state.map);

    state.map.on('click', (e) => {
        const { lat, lng } = e.latlng;
        updateLocation(lat, lng, `Loc: ${lat.toFixed(2)}, ${lng.toFixed(2)}`);
    });

    // Fix for Leaflet initialization in narrow containers
    setTimeout(() => {
        state.map.invalidateSize();
    }, 500);
}

function updateMapMarker(lat, lon) {
    if (!state.map) return;

    if (state.marker) {
        state.marker.setLatLng([lat, lon]);
    } else {
        state.marker = L.marker([lat, lon]).addTo(state.map);
    }

    state.map.setView([lat, lon], 10);
}

function updateLocation(lat, lon, name) {
    state.lat = lat;
    state.lon = lon;
    state.locationName = name;
    el.currentLocation.textContent = name;

    localStorage.setItem('lastLocation', JSON.stringify({ lat, lon, name }));
    saveToHistory(name, lat, lon);
    updateMapMarker(lat, lon);
    refreshData();
}

async function refreshData() {
    if (!state.lat || !state.lon) return;

    // Show Loaders
    el.aiLoader.classList.remove('hidden');
    el.aiHighlights.innerHTML = '';

    const payload = {
        lat: state.lat,
        lon: state.lon,
        location_name: state.locationName,
        units: state.units,
        activity_mode: state.activity
    };

    try {
        const res = await fetch(`${API_BASE}/weather-summary`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.detail || `Server Error ${res.status}`);
        }

        state.weatherData = data;
        renderDashboard(data);
    } catch (err) {
        console.error("Fetch error", err);
        el.aiSummaryText.textContent = `Error: ${err.message}`;
        el.aiHighlights.innerHTML = '<li class="text-danger">Failed to connect to backend or weather service.</li>';
    } finally {
        el.aiLoader.classList.add('hidden');
    }
}

// Rendering Logic
function renderDashboard(data) {
    const w = data.weather;
    const c = data.computed;
    const ai = data.ai;

    // Current Weather
    el.currentTemp.textContent = Math.round(w.current.temp);
    el.currentWind.textContent = `${w.current.wind} ${state.units === 'metric' ? 'km/h' : 'mph'}`;
    el.currentHum.textContent = `${w.next_24h.humidity_avg || '--'}%`;
    el.updatedTime.textContent = `Updated: ${new Date().toLocaleTimeString()}`;
    el.currentIcon.textContent = getWeatherIcon(w.current.code);
    el.currentDesc.textContent = getWeatherDesc(w.current.code);

    // AI Summary
    el.aiSummaryText.textContent = ai.summary || "Summary unavailable.";
    el.aiHighlights.innerHTML = (ai.today || []).map(h => `<li>${h}</li>`).join('');
    el.activityAdvice.textContent = ai.activity_advice ? ai.activity_advice[0] : "";

    // Risks
    el.riskBadges.innerHTML = (c.risk_badges || []).map(r =>
        `<span class="risk-badge ${r.level}">${r.type.toUpperCase()}: ${r.reason}</span>`
    ).join('') || '<span>No significant risks</span>';

    // Scores
    updateScoreBar(el.scoreOutdoor, el.valOutdoor, c.impact_scores.outdoor);
    updateScoreBar(el.scoreTravel, el.valTravel, c.impact_scores.travel);
    updateScoreBar(el.scoreComfort, el.valComfort, c.impact_scores.comfort);

    // Best Windows
    el.bestWindows.innerHTML = (c.best_time_windows || []).map(win => `
        <div class="window-item">
            <span class="window-time">${win.range}</span>
            <span class="window-score">${win.temp}°C | Score: ${Math.round(win.score)}</span>
        </div>
    `).join('');

    // Forecast Chart
    renderChart(w.next_24h);

    // 7 Day Forecast Cards
    renderDaily(w.next_7d);
}

function updateScoreBar(bar, label, score) {
    bar.style.width = `${score * 10}%`;
    label.textContent = score;
    // Color based on score
    if (score > 7) bar.style.background = 'var(--success)';
    else if (score > 4) bar.style.background = 'var(--warning)';
    else bar.style.background = 'var(--danger)';
}


function renderDaily(daily) {
    el.dailyForecast.innerHTML = '';
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date().getDay();

    for (let i = 0; i < 7; i++) {
        const card = document.createElement('div');
        card.className = 'daily-card';
        card.innerHTML = `
            <div class="day">${days[(today + i) % 7]}</div>
            <div class="icon">${getWeatherIcon(daily.codes[i])}</div>
            <div class="temps">${Math.round(daily.temp_max[i])}°</div>
            <div class="min-temp">${Math.round(daily.temp_min[i])}°</div>
        `;
        el.dailyForecast.appendChild(card);
    }
}

// AI Question
async function handleAsk() {
    const question = el.askInput.value.trim();
    if (!question || !state.lat) return;

    el.askResponse.innerHTML = '<p>Thinking...</p>';

    try {
        const res = await fetch(`${API_BASE}/ask`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                lat: state.lat,
                lon: state.lon,
                question: question,
                units: state.units
            })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.detail || "AI error");
        el.askResponse.innerHTML = `<p>${data.answer}</p> <small>Confidence: ${Math.round(data.confidence * 100)}%</small>`;
    } catch (err) {
        el.askResponse.innerHTML = `<p>Error: ${err.message}</p>`;
    }
}

// Helpers
function getWeatherIcon(code) {
    if (code === 0) return '☀️'; // Clear
    if (code <= 3) return '⛅'; // Part cloudy
    if (code <= 48) return '🌫️'; // Fog
    if (code <= 67) return '🌦️'; // Rain
    if (code <= 77) return '❄️'; // Snow
    if (code <= 82) return '🌧️'; // Showers
    if (code <= 99) return '⛈️'; // Storm
    return '❓';
}

function getWeatherDesc(code) {
    if (code === 0) return 'Clear Sky';
    if (code <= 3) return 'Partly Cloudy';
    if (code <= 48) return 'Foggy';
    if (code <= 67) return 'Rainy';
    if (code <= 77) return 'Snowy';
    if (code <= 82) return 'Heavy Rain';
    if (code <= 99) return 'Thunderstorm';
    return 'Unknown';
}

function saveToHistory(name, lat, lon) {
    let history = JSON.parse(localStorage.getItem('weatherHistory') || '[]');
    // Avoid duplicates
    history = history.filter(h => h.name !== name);
    history.unshift({ name, lat, lon });
    history = history.slice(0, 5);
    localStorage.setItem('weatherHistory', JSON.stringify(history));
    loadSavedLocations();
}

function loadSavedLocations() {
    const history = JSON.parse(localStorage.getItem('weatherHistory') || '[]');
    el.savedLocations.innerHTML = history.map(h => `
        <div class="saved-item" onclick="updateLocation(${h.lat}, ${h.lon}, '${h.name}')">
            ${h.name}
        </div>
    `).join('') || '<p style="font-size: 0.8rem; color: var(--text-muted)">No saved locations</p>';
}

function renderChart(n24) {
    const ctx = document.getElementById('weatherChart').getContext('2d');
    if (weatherChart) weatherChart.destroy();

    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.4)');
    gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');

    weatherChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: n24.hourly_times,
            datasets: [
                {
                    label: 'Temp (°)',
                    data: n24.hourly_temp,
                    borderColor: '#6366f1',
                    borderWidth: 3,
                    pointBackgroundColor: '#6366f1',
                    pointBorderColor: 'rgba(255,255,255,0.2)',
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    backgroundColor: gradient,
                    fill: true,
                    tension: 0.4,
                    yAxisID: 'y'
                },
                {
                    label: 'Precip (mm)',
                    data: n24.hourly_precip,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                    borderWidth: 1,
                    borderRadius: 4,
                    type: 'bar',
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    grid: { color: 'rgba(255,255,255,0.05)', drawBorder: false },
                    ticks: { color: '#64748b', font: { family: 'Outfit', size: 11 } }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    grid: { display: false },
                    ticks: { color: '#10b981', font: { family: 'Outfit', size: 11 } }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#64748b', font: { family: 'Outfit', size: 11 } }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#0f172a',
                    titleFont: { family: 'Outfit', size: 13 },
                    bodyFont: { family: 'Outfit', size: 12 },
                    padding: 12,
                    cornerRadius: 12,
                    displayColors: true
                }
            }
        }
    });
}
