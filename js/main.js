/* ═══════════════════════════════════════
   MARACUMANGO STUDIO · main.js
   ═══════════════════════════════════════ */

/* ── Navbar: scroll effect ───────────── */
const navbar = document.getElementById('navbar');
const navLinks = document.getElementById('navLinks');
const hamburger = document.getElementById('hamburger');
const allLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  updateActiveLink();
});

/* ── Hamburger menu ──────────────────── */
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu when any nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ── Active nav link on scroll ─────────── */
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    }
  });
}

/* ── Smooth scroll for anchor links ──── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'));
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ── Reveal on scroll ────────────────── */
const reveals = document.querySelectorAll(
  '.svc-card, .testi-card, .step, .clink, .logo-chip, .sec-header'
);
reveals.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // stagger children
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, Number(delay));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach((el, i) => {
  el.dataset.delay = (i % 4) * 80;
  observer.observe(el);
});

/* ── Contact form (demo) ─────────────── */
const form = document.getElementById('contactForm');
const formOk = document.getElementById('formOk');

form.addEventListener('submit', (e) => {
  e.preventDefault();


  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const servicio = document.getElementById('servicio').value;
  const mensaje = document.getElementById('mensaje').value;

  const destinatario = "maracumango.studio@gmail.com";
  const asunto = servicio;

  const cuerpo =
    "Nombre: " + nombre + "%0D%0A" +
    "Email: " + email + "%0D%0A" +
    "Servicio: " + servicio + "%0D%0A%0D%0A" +
    "Mensaje:%0D%0A" + mensaje;

  const mailtoLink = `mailto:${destinatario}?subject=${asunto}&body=${mensaje}`;

  window.open(mailtoLink, '_blank');


  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Enviando...';
  btn.disabled = true;

  // Simulate async send (replace with real backend / formspree / emailjs)
  setTimeout(() => {
    formOk.classList.add('visible');
    form.reset();
    btn.textContent = 'Enviar mensaje 🚀';
    btn.disabled = false;

    // Optionally hide success after 5s
    setTimeout(() => formOk.classList.remove('visible'), 5000);
  }, 1000);
});

/* ── Input focus style polish ─────────── */
document.querySelectorAll('.fgroup input, .fgroup select, .fgroup textarea').forEach(el => {
  el.addEventListener('focus', () => el.parentElement.classList.add('focused'));
  el.addEventListener('blur', () => el.parentElement.classList.remove('focused'));
});
