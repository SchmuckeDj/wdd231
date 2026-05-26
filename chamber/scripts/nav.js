document.getElementById('nav-toggle').addEventListener('click', function() {
  const nav = document.getElementById('primary-nav');
  const open = nav.classList.toggle('open');
  this.setAttribute('aria-expanded', open);
});
