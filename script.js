/* ── Portfolio JS — Darshan Hoolikatti ── */
'use strict';

/* ════════════════════════════════════════
   PARTICLES
════════════════════════════════════════ */
(function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = 18;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 3 + 2; // 2px – 5px
    const left = Math.random() * 100;
    const dur  = Math.random() * 18 + 12; // 12s – 30s
    const del  = Math.random() * 15;       // 0s – 15s delay
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      bottom: 0;
      animation-duration: ${dur}s;
      animation-delay: -${del}s;
      opacity: 0;
    `;
    container.appendChild(p);
  }
})();


/* ════════════════════════════════════════
   NAVBAR — SCROLL STATE
════════════════════════════════════════ */
const navbar = document.getElementById('navbar');

function handleNavScroll() {
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll();


/* ════════════════════════════════════════
   HAMBURGER MENU
════════════════════════════════════════ */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  navLinks.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

// Close on nav link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});


/* ════════════════════════════════════════
   SMOOTH SCROLL FOR NAV LINKS
════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href').slice(1);
    const target   = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      const navH   = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'));
      const offset = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});


/* ════════════════════════════════════════
   ACTIVE NAV LINK ON SCROLL
════════════════════════════════════════ */
const sections  = document.querySelectorAll('section[id]');
const navItems  = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navItems.forEach(link => {
        link.classList.toggle('active', link.dataset.section === id);
      });
    }
  });
}, { threshold: 0.45 });

sections.forEach(sec => sectionObserver.observe(sec));


/* ════════════════════════════════════════
   SECTION REVEAL ON SCROLL
════════════════════════════════════════ */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));


/* ════════════════════════════════════════
   SKILL BAR ANIMATION
════════════════════════════════════════ */
const skillFills   = document.querySelectorAll('.skill-fill');
const skillSection = document.getElementById('skills');

// Pre-set CSS custom property so transition works
skillFills.forEach(fill => {
  const w = fill.dataset.width;
  fill.style.setProperty('--target-width', w + '%');
});

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      skillFills.forEach(fill => fill.classList.add('animate'));
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

if (skillSection) skillObserver.observe(skillSection);


/* ════════════════════════════════════════
   SCROLL TO TOP BUTTON
════════════════════════════════════════ */
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 300);
}, { passive: true });

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ════════════════════════════════════════
   MOUSE PARALLAX ON ORBS
════════════════════════════════════════ */
const orb1 = document.getElementById('orb1');
const orb2 = document.getElementById('orb2');
const orb3 = document.getElementById('orb3');

let mouseX = 0, mouseY = 0;
let currentX = 0, currentY = 0;
let rafId = null;

document.addEventListener('mousemove', (e) => {
  // Normalise to -0.5…0.5
  mouseX = (e.clientX / window.innerWidth  - 0.5);
  mouseY = (e.clientY / window.innerHeight - 0.5);
});

function animateOrbs() {
  // Lerp towards mouse position for smooth feel
  currentX += (mouseX - currentX) * 0.06;
  currentY += (mouseY - currentY) * 0.06;

  if (orb1) orb1.style.transform = `translate(${currentX * 15}px, ${currentY * 15}px)`;
  if (orb2) orb2.style.transform = `translate(${currentX * 20}px, ${currentY * 20}px)`;
  if (orb3) orb3.style.transform = `translate(${currentX * 10}px, ${currentY * 10}px)`;

  rafId = requestAnimationFrame(animateOrbs);
}

animateOrbs();

console.log('%c Darshan Hoolikatti — Portfolio Loaded ', 'background:#00ffe0;color:#050810;font-family:monospace;padding:4px 8px;border-radius:4px;font-weight:bold;');
