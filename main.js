import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { initParticles } from './particles.js';

gsap.registerPlugin(ScrollTrigger);

// Initialize Particles
initParticles();

// Initialize Smooth Scroll
const lenis = new Lenis({
  lerp: 0.1,
  duration: 1.5,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Page Loader & Entrance
window.addEventListener('load', () => {
  const tl = gsap.timeline();

  tl.to('#page-loader h2', { opacity: 0, y: -20, duration: 0.8, ease: 'power4.in' })
    .to('#page-loader', { yPercent: -100, duration: 1.2, ease: 'expo.inOut' })
    .from('#hero-tag', { opacity: 0, y: 30, duration: 1 }, '-=0.5')
    .from('#hero-title', { opacity: 0, y: 50, duration: 1.2 }, '-=0.8')
    .from('#hero-desc', { opacity: 0, y: 30, duration: 1 }, '-=1')
    .from('#hero-btns', { opacity: 0, y: 20, duration: 0.8 }, '-=0.8')
    .from('#hero-img', { opacity: 0, x: 100, scale: 0.9, duration: 1.5, ease: 'power4.out' }, '-=1.2');

  // Subtle breathing/floating for hero character
  gsap.to('#hero-img', {
    y: 15,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
  });

  // Parallax
  gsap.to('#hero-img', {
    y: 100,
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  gsap.to('#hero-title', {
    y: -150,
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });
});

// Navigation Highlight & Scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  const nav = document.getElementById('main-nav');
  if (window.scrollY > 100) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');

  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 150) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
});

// Reveal Animations (Reveal on Scroll)
const reveals = document.querySelectorAll('.reveal');
reveals.forEach(el => {
  gsap.from(el, {
    opacity: 0,
    y: 60,
    filter: 'blur(10px)',
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
    }
  });
});

// Lightbox logic
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const masonryItems = document.querySelectorAll('.masonry-item img');

masonryItems.forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightbox.style.display = 'flex';
    gsap.from('#lightbox-img', { scale: 0.8, opacity: 0, duration: 0.4 });
  });
});

lightbox.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

// Service Card Navigation
const serviceCards = document.querySelectorAll('.card-upgrade');
serviceCards.forEach(card => {
  card.addEventListener('click', (e) => {
    const service = card.dataset.service;
    console.log('Service clicked:', service);
    gsap.to('main', {
      opacity: 0, duration: 0.4, ease: 'power2.in', onComplete: () => {
        window.location.href = `./services/${service}.html`;
      }
    });
  });
});
