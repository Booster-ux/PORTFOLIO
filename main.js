import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// Initialize Smooth Scrolling
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Hero Animations
window.addEventListener('load', () => {
  const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.5 } });

  tl.to('#hero-title', { opacity: 1, y: 0, delay: 0.5 })
    .to('#hero-subtitle', { opacity: 1, y: 0 }, '-=1.2')
    .to('#hero-cta', { opacity: 1, y: 0 }, '-=1.2')
    .to('#hero-character', { opacity: 1, x: 0 }, '-=1.5');

  // Parallax for Hero
  gsap.to('.hero-character', {
    yPercent: 15,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });

  gsap.to('.hero-background', {
    yPercent: -10,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });
});

// Navigation scroll effect
window.addEventListener('scroll', () => {
  const nav = document.getElementById('main-nav');
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Reveal Animations
const reveals = document.querySelectorAll('.reveal');
reveals.forEach((el) => {
  gsap.fromTo(el,
    { opacity: 0, y: 50 },
    {
      opacity: 1, y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  );
});

// Service Card Interactions
const cards = document.querySelectorAll('.service-card');
cards.forEach((card) => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card, { scale: 1.05, duration: 0.4, ease: 'power2.out' });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, { scale: 1, duration: 0.4, ease: 'power2.out' });
  });

  // Future Link to Service Page
  card.addEventListener('click', () => {
    const service = card.dataset.service;
    console.log(`Navigating to ${service} page...`);
    // Page transition logic will go here
    document.body.style.overflow = 'hidden';
    gsap.to('main', {
      opacity: 0, y: -20, duration: 0.5, ease: 'power2.inOut', onComplete: () => {
        window.location.href = `./services/${service}.html`;
      }
    });
  });
});
