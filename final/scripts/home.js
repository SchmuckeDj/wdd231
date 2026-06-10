// home.js — loads 5 most recent milestones on the home page

import { openModal } from './modal.js';

async function loadRecentMilestones() {
  const container = document.getElementById('recent-milestones');

  try {
    const response = await fetch('data/ai-history.json');
    const data = await response.json();

    // Get last 5 milestones sorted by year descending
    const recent = data.milestones
      .sort((a, b) => b.year - a.year)
      .slice(0, 5);

    container.innerHTML = recent.map(item => `
      <div class="milestone-card" data-id="${item.id}">
        <p class="milestone-year">${item.year}</p>
        <h3 class="milestone-title">${item.title}</h3>
        <p class="milestone-person">— ${item.person}</p>
        <p class="milestone-desc">${item.description.slice(0, 100)}…</p>
        <span class="category-badge cat-${item.category}">${item.category}</span>
      </div>
    `).join('');

    // Save last visit to localStorage
    localStorage.setItem('lastVisit', new Date().toLocaleDateString());

    // Attach click → modal
    container.querySelectorAll('.milestone-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = parseInt(card.dataset.id);
        const item = data.milestones.find(m => m.id === id);
        openModal(item);
      });
    });

  } catch (error) {
    container.innerHTML = `<p style="color:var(--pink)">Could not load milestones. Please try again later.</p>`;
    console.error('Fetch error:', error);
  }
}

loadRecentMilestones();
