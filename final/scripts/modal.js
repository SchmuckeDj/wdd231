// modal.js — shared modal logic used by all pages

const overlay = document.getElementById('modal-overlay');
const closeBtn = document.getElementById('modal-close');

export function openModal(item) {
  document.getElementById('modal-year').textContent = item.year;
  document.getElementById('modal-title').textContent = item.title;
  document.getElementById('modal-person').textContent = item.person;
  document.getElementById('modal-desc').textContent = item.description;
  document.getElementById('modal-impact').textContent = item.impact;
  overlay.classList.add('open');
}

if (closeBtn) {
  closeBtn.addEventListener('click', () => overlay.classList.remove('open'));
}

if (overlay) {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('open');
  });
}
