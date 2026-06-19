import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// Initialize Smooth Scroll (Lenis)
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

// Page Loader & Entrance Sequences
window.addEventListener('load', () => {
  const tl = gsap.timeline();

  tl.to('#page-loader', {
    opacity: 0,
    duration: 0.8,
    ease: 'power2.inOut',
    onComplete: () => document.getElementById('page-loader').style.display = 'none'
  })
    .from('.hero-badge', { y: 20, opacity: 0, duration: 1, ease: 'expo.out' }, '-=0.2')
    .from('.hero-title', { y: 40, opacity: 0, duration: 1.2, ease: 'expo.out' }, '-=0.8')
    .from('.hero-subtitle', { y: 20, opacity: 0, duration: 1, ease: 'expo.out' }, '-=0.8')
    .from('.hero-actions', { y: 20, opacity: 0, duration: 1, ease: 'expo.out' }, '-=0.8')
    .from('#hero-mascot', {
      scale: 0.9,
      opacity: 0,
      duration: 2,
      ease: 'power2.out',
      filter: 'blur(20px)'
    }, '-=1.5');

  // Subtle drifting animation for the mascot
  gsap.to('#hero-mascot', {
    y: 20,
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
  });

  // Handle Nav Scroll Effect
  const nav = document.getElementById('main-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Reveal on Scroll Animations (Standardized for all .reveal elements)
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(el => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1.4,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 92%',
        toggleActions: 'play none none none'
      }
    });
  });

  // Subtle Parallax for hero background image
  gsap.to('.city-bg', {
    yPercent: 15,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });
});
