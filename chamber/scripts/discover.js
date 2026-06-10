import { places } from '../data/places.mjs';

// ── Build cards ──────────────────────────────────────────────
const grid = document.getElementById('discover-grid');

grid.innerHTML = places.map((place, i) => `
  <div class="place-card" style="grid-area: p${i + 1}">
    <h2>${place.name}</h2>
    <figure>
      <img src="${place.image}" alt="${place.alt}" loading="lazy" width="300" height="200">
    </figure>
    <address>${place.address}</address>
    <p>${place.description}</p>
    <button type="button">Learn More</button>
  </div>
`).join('');

// ── Last visit message (localStorage) ────────────────────────
const msgEl = document.getElementById('visit-msg');
const lastVisit = localStorage.getItem('discoverLastVisit');
const now = Date.now();

if (!lastVisit) {
  msgEl.textContent = 'Welcome! Let us know if you have any questions.';
} else {
  const diffMs = now - Number(lastVisit);
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 1) {
    msgEl.textContent = 'Back so soon! Awesome!';
  } else if (diffDays === 1) {
    msgEl.textContent = 'You last visited 1 day ago.';
  } else {
    msgEl.textContent = `You last visited ${diffDays} days ago.`;
  }
}

localStorage.setItem('discoverLastVisit', now);
