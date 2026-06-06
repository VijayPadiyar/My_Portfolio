// =========================================
//  VIJAY PADIYAR — PORTFOLIO SCRIPT
// =========================================

// ---- NAV SCROLL EFFECT ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// ---- HAMBURGER MENU ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && !mobileMenu.contains(e.target)) {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  }
});

// ---- ACTIVE NAV LINK ON SCROLL ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observerOptions = { root: null, rootMargin: '-40% 0px -50% 0px', threshold: 0 };

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}`
          ? 'var(--accent)'
          : '';
      });
    }
  });
}, observerOptions);

sections.forEach(s => sectionObserver.observe(s));

// ---- SCROLL REVEAL FOR CARDS ----
const revealElements = document.querySelectorAll(
  '.project-card, .cert-card, .activity-card, .pub-card, .skill-group, .stat'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = `fadeUp 0.5s ease ${i * 0.07}s forwards`;
      entry.target.style.opacity = '0';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => {
  el.style.opacity = '0';
  revealObserver.observe(el);
});

// ---- TERMINAL RE-ANIMATE ON SCROLL ----
const terminal = document.querySelector('.skills-terminal');
let terminalAnimated = false;

if (terminal) {
  const terminalObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !terminalAnimated) {
        terminalAnimated = true;
        const lines = terminal.querySelectorAll('.t-line');
        lines.forEach((line, i) => {
          line.style.animation = 'none';
          line.style.opacity = '0';
          setTimeout(() => {
            line.style.animation = `terminalReveal 0.4s ease ${i * 0.55}s forwards`;
          }, 10);
        });
      }
    });
  }, { threshold: 0.3 });

  terminalObserver.observe(terminal);
}

// ---- SMOOTH SCROLL OFFSET FOR FIXED NAV ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---- PILL HOVER SOUND (subtle, optional — comment out if unwanted) ----
// Uncomment below for a tiny click feedback effect on skill pills:
/*
document.querySelectorAll('.pill').forEach(pill => {
  pill.addEventListener('mouseenter', () => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.start(); osc.stop(ctx.currentTime + 0.08);
  });
});
*/

// ---- CURRENT YEAR IN FOOTER ----
const footerCopy = document.querySelector('.footer-copy');
if (footerCopy) {
  footerCopy.innerHTML = footerCopy.innerHTML.replace(
    /\d{4}/,
    new Date().getFullYear()
  );
}

console.log('%c vijay.dev ', 'background:#e8ff47;color:#000;font-weight:bold;font-size:14px;padding:4px 8px;border-radius:2px;');
console.log('%c Built with HTML, CSS & vanilla JS.', 'color:#666;font-size:11px;');