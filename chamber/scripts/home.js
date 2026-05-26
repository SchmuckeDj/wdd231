// ===== WEATHER =====
// Santo Domingo coordinates
const LAT = 18.4861;
const LON = -69.9312;
const API_KEY = '537f062506c5be127447c17ac2332472'; 
const UNITS = 'imperial'; 

async function loadWeather() {
  try {
    // Current weather
    const currentRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=${UNITS}&appid=${API_KEY}`
    );
    if (!currentRes.ok) throw new Error('Weather fetch failed');
    const current = await currentRes.json();

    // 5-day / 3-hour forecast
    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=${UNITS}&appid=${API_KEY}`
    );
    const forecastData = await forecastRes.json();

    renderCurrentWeather(current);
    renderForecast(forecastData.list);
  } catch (err) {
    document.getElementById('weather-now').innerHTML =
      '<p class="weather-error">Weather data unavailable.</p>';
    console.error('Weather error:', err);
  }
}

function renderCurrentWeather(data) {
  const temp = Math.round(data.main.temp);
  const desc = data.weather[0].description;
  const icon = data.weather[0].icon;
  

  document.getElementById('weather-now').innerHTML = `
    <div class="weather-current">
      <img
        src="https://openweathermap.org/img/wn/${icon}@2x.png"
        alt="${desc}"
        class="weather-icon"
        width="64" height="64">
      <div class="weather-main">
        <span class="weather-temp">${temp}°F</span>
        <span class="weather-desc">${capitalizeWords(desc)}</span>
      </div>
      <div class="weather-details">
        
      </div>
    </div>`;
}

function renderForecast(list) {
  // Get one entry per day (noon reading) for the next 3 days
  const today = new Date().getDate();
  const days = [];
  const seen = new Set();

  for (const item of list) {
    const d = new Date(item.dt * 1000);
    const day = d.getDate();
    const hour = d.getHours();
    if (day === today) continue;
    if (seen.has(day)) continue;
    if (hour >= 11 && hour <= 14) {
      seen.add(day);
      days.push(item);
    }
    if (days.length === 3) break;
  }

  // Fallback: if noon not found, take first entry of each day
  if (days.length < 3) {
    seen.clear();
    days.length = 0;
    for (const item of list) {
      const d = new Date(item.dt * 1000);
      const day = d.getDate();
      if (day === today) continue;
      if (!seen.has(day)) {
        seen.add(day);
        days.push(item);
      }
      if (days.length === 3) break;
    }
  }

  const container = document.getElementById('weather-forecast');
  container.innerHTML = days.map(item => {
    const d = new Date(item.dt * 1000);
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const temp = Math.round(item.main.temp);
    const icon = item.weather[0].icon;
    const desc = item.weather[0].description;
    return `
      <div class="forecast-day">
        <span class="forecast-label">${dayName}</span>
        <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${desc}" width="40" height="40">
        <span class="forecast-temp">${temp}°F</span>
      </div>`;
  }).join('');
}

function capitalizeWords(str) {
  return str.replace(/\b\w/g, c => c.toUpperCase());
}

// ===== SPOTLIGHTS =====
async function loadSpotlights() {
  try {
    const res = await fetch('data/members.json');
    const data = await res.json();

    // Filter gold (3) and silver (2) members
    const eligible = data.members.filter(m => m.membership >= 2);

    // Shuffle and pick 2 or 3
    const shuffled = eligible.sort(() => Math.random() - 0.5);
    const picks = shuffled.slice(0, Math.min(3, shuffled.length));

    renderSpotlights(picks);
  } catch (err) {
    document.getElementById('spotlights-container').innerHTML =
      '<p>Spotlight data unavailable.</p>';
    console.error('Spotlight error:', err);
  }
}

function membershipLabel(level) {
  if (level === 3) return ['badge-3', 'Gold Member'];
  return ['badge-2', 'Silver Member'];
}

function renderSpotlights(members) {
  const container = document.getElementById('spotlights-container');
  container.innerHTML = members.map(m => {
    const [badgeClass, badgeText] = membershipLabel(m.membership);
    return `
      <div class="spotlight-card">
        <img src="images/${m.image}" alt="${m.name} logo" loading="lazy"
             onerror="this.onerror=null;this.style.background='#22263a'">
        <div class="spotlight-info">
          <h3>${m.name}</h3>
          <p>📞 ${m.phone}</p>
          <p>📍 ${m.address}</p>
          <p><a href="${m.website}" target="_blank" rel="noopener">${m.website.replace('https://', '')}</a></p>
          <span class="member-badge ${badgeClass}">${badgeText}</span>
        </div>
      </div>`;
  }).join('');
}

// ===== INIT =====
loadWeather();
loadSpotlights();
