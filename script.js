// Active nav state on scroll
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

const setActive = () => {
  let current = sections[0]?.id;
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 120) current = section.id;
  });
  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
};
window.addEventListener('scroll', setActive);
setActive();

// Mobile menu (simple: just scroll-to on tap, sidebar hidden on mobile by CSS)
const menuToggle = document.getElementById('menuToggle');
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
  });
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Contact form (placeholder — wire to Formspree/Netlify Forms before launch)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('This form is not connected yet. Wire it to Formspree, Netlify Forms, or a mailto fallback before going live.');
  });
}
