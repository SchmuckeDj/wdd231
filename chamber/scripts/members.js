const gridBtn = document.getElementById('grid-btn');
const listBtn = document.getElementById('list-btn');
const container = document.getElementById('members-container');

async function loadMembers() {
  try {
    const response = await fetch('data/members.json');
    const data = await response.json();
    displayMembers(data.members);
  } catch (err) {
    container.innerHTML = '<p>Error loading members. Please try again.</p>';
    console.error(err);
  }
}

function badgeLabel(level) {
  if (level === 3) return ['badge-3', 'Gold Member'];
  if (level === 2) return ['badge-2', 'Silver Member'];
  return ['badge-1', 'Member'];
}

function displayMembers(members) {
  container.innerHTML = members.map(m => {
    const [badgeClass, badgeText] = badgeLabel(m.membership);
    return `
      <div class="member-card">
        <img src="images/${m.image}" alt="${m.name} logo" loading="lazy" onerror="this.onerror=null;this.style.background='#22263a'">
        <div class="member-info">
          <h3>${m.name}</h3>
          <p>📍 ${m.address}</p>
          <p>📞 ${m.phone}</p>
          <p><a href="${m.website}" target="_blank" rel="noopener">${m.website.replace('https://', '')}</a></p>
          <p class="member-desc">${m.description}</p>
          <span class="member-badge ${badgeClass}">${badgeText}</span>
        </div>
      </div>`;
  }).join('');
}

function setView(view) {
  container.className = view;
  gridBtn.classList.toggle('active', view === 'grid');
  listBtn.classList.toggle('active', view === 'list');
  localStorage.setItem('chamberView', view);
}

gridBtn.addEventListener('click', () => setView('grid'));
listBtn.addEventListener('click', () => setView('list'));

// Restore saved view or default to grid
const savedView = localStorage.getItem('chamberView') || 'grid';
setView(savedView);
loadMembers();
