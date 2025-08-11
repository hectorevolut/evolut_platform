document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('y');
  if (y) y.textContent = new Date().getFullYear();

  const btn = document.getElementById('menuBtn');
  const nav = document.getElementById('mobileNav');
  btn?.addEventListener('click', () => {
    const open = nav.style.display === 'block';
    nav.style.display = open ? 'none' : 'block';
    btn.setAttribute('aria-expanded', String(!open));
  });
});