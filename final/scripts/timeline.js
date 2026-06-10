// timeline.js — loads all 17 milestones with filter support

import { openModal } from './modal.js';

let allMilestones = [];

async function loadTimeline() {
  const container = document.getElementById('timeline-container');

  try {
    const response = await fetch('data/ai-history.json');
    const data = await response.json();
    allMilestones = data.milestones;

    // Save active filter to localStorage
    const savedFilter = localStorage.getItem('activeFilter') || 'all';
    renderCards(savedFilter);
    setActiveFilter(savedFilter);

  } catch (error) {
    container.innerHTML = `<p style="color:var(--pink)">Could not load data. Please try again.</p>`;
    console.error('Fetch error:', error);
  }
}

function renderCards(filter) {
  const container = document.getElementById('timeline-container');

  const filtered = filter === 'all'
    ? allMilestones
    : allMilestones.filter(m => m.category === filter);

  if (filtered.length === 0) {
    container.innerHTML = `<p style="color:var(--muted)">No results for this category.</p>`;
    return;
  }

  container.innerHTML = filtered.map(item => `
    <div class="milestone-card" data-id="${item.id}">
      <p class="milestone-year">${item.year}</p>
      <h2 class="milestone-title">${item.title}</h2>
      <p class="milestone-person">— ${item.person}</p>
      <p class="milestone-desc">${item.description}</p>
      <span class="category-badge cat-${item.category}">${item.category}</span>
    </div>
  `).join('');

  container.querySelectorAll('.milestone-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = parseInt(card.dataset.id);
      const item = allMilestones.find(m => m.id === id);
      openModal(item);
    });
  });
}

function setActiveFilter(filter) {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });
}

// Filter button clicks
document.getElementById('filters').addEventListener('click', (e) => {
  if (!e.target.matches('.filter-btn')) return;
  const filter = e.target.dataset.filter;
  localStorage.setItem('activeFilter', filter);
  setActiveFilter(filter);
  renderCards(filter);
});

loadTimeline();
