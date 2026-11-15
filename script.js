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

// Mobile menu
const menuToggle = document.getElementById('menuToggle');

const setMenu = (open) => {
  document.body.classList.toggle('nav-open', open);
  if (menuToggle) {
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
};

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    setMenu(!document.body.classList.contains('nav-open'));
  });
}

// Tapping a link closes the menu
navLinks.forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

// Escape closes the menu
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') setMenu(false);
});

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Contact form (opens the visitor's email app with the message ready to send)
const CONTACT_EMAIL = 'wycliffeomonge1@gmail.com';
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = contactForm.elements.name.value.trim();
    const email = contactForm.elements.email.value.trim();
    const message = contactForm.elements.message.value.trim();

    const subject = `Portfolio message from ${name}`;
    const body = `${message}\n\nFrom: ${name}\nReply to: ${email}`;

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    if (formNote) {
      formNote.textContent = `Your email app should be opening now. If it does not, write to ${CONTACT_EMAIL} directly.`;
    }
  });
}
