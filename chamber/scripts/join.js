// Set timestamp when form loads
const timestampField = document.getElementById('timestamp');
if (timestampField) {
  timestampField.value = new Date().toLocaleString();
}

// Modal logic
const modals = document.querySelectorAll('.membership-modal');
const infoButtons = document.querySelectorAll('.info-btn');
const closeButtons = document.querySelectorAll('.modal-close');

infoButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.modal;
    const modal = document.getElementById(targetId);
    if (modal) modal.showModal();
  });
});

closeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('dialog').close();
  });
});

modals.forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.close();
  });
});
