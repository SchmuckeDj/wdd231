const params = new URLSearchParams(window.location.search);
const dl = document.getElementById('submitted-data');

const fields = [
  { key: 'fname', label: 'First Name' },
  { key: 'lname', label: 'Last Name' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'orgname', label: 'Organization' },
  { key: 'timestamp', label: 'Submitted' },
];

fields.forEach(({ key, label }) => {
  const value = params.get(key);
  if (value) {
    const dt = document.createElement('dt');
    dt.textContent = label;
    const dd = document.createElement('dd');
    dd.textContent = value;
    dl.appendChild(dt);
    dl.appendChild(dd);
  }
});
