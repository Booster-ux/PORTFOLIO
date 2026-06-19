import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// Initialize Smooth Scroll
const lenis = new Lenis({
  lerp: 0.1,
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Global Entrance & Performance Orchestration
window.addEventListener('load', () => {
  const tl = gsap.timeline();

  // Loader sequence
  tl.to('#page-loader', {
    opacity: 0,
    duration: 1,
    ease: 'expo.inOut',
    onComplete: () => {
      document.getElementById('page-loader').style.display = 'none';
    }
  });

  // Hero Split Entrance (Linear Style)
  tl.from('.hero-badge', { y: 20, opacity: 0, duration: 1, ease: 'expo.out' }, '-=0.4')
    .from('h1', { y: 40, opacity: 0, duration: 1.2, ease: 'expo.out' }, '-=0.8')
    .from('.hero-subtitle', { y: 20, opacity: 0, duration: 1, ease: 'expo.out' }, '-=0.9')
    .from('.hero-actions', { y: 20, opacity: 0, duration: 1, ease: 'expo.out' }, '-=0.8')
    .from('.hero-trust', { y: 20, opacity: 0, duration: 1, ease: 'expo.out' }, '-=0.8')
    .from('.hero-visual', {
      x: 60,
      opacity: 0,
      scale: 0.95,
      duration: 1.8,
      ease: 'expo.out'
    }, '-=1.4');

  // Living Background: Orb Drift
  gsap.to('.orb-1', {
    x: '20%',
    y: '15%',
    duration: 15,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  gsap.to('.orb-2', {
    x: '-10%',
    y: '-20%',
    duration: 12,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  gsap.to('.orb-3', {
    x: '15%',
    y: '25%',
    duration: 18,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  // Mascot Breathing & Subtle Mouse Parallax
  gsap.to('#mascot-main', {
    y: -20,
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual) {
    window.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 40;
      const yPos = (clientY / window.innerHeight - 0.5) * 40;

      gsap.to('#mascot-main', {
        x: xPos,
        y: yPos - 20, // offset for breathing
        duration: 2,
        ease: 'power2.out'
      });
    });
  }

  // Unified Scroll Revelation Flow
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(el => {
    gsap.fadeReveal = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1.4,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        toggleActions: 'play none none none'
      }
    });
  });

  // Navigation Logic
  const nav = document.getElementById('main-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Global Parallax depth for background city (if users re-add it) or orbs
  gsap.to('.bg-scene', {
    yPercent: -15,
    ease: 'none',
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true
    }
  });
});
