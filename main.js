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
    .from('#hero-main-visual', {
      scale: 1.2,
      opacity: 0,
      duration: 2.5,
      ease: 'expo.out',
      filter: 'blur(30px) brightness(0)'
    }, '-=1.8');

  // Mouse Parallax for Hero Main Visual
  const heroSection = document.querySelector('#hero');
  const heroVisual = document.querySelector('#hero-main-visual');

  if (heroSection && heroVisual) {
    heroSection.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xPercent = (clientX / innerWidth - 0.5) * 2;
      const yPercent = (clientY / innerHeight - 0.5) * 2;

      gsap.to(heroVisual, {
        x: xPercent * 15,
        y: yPercent * 15,
        duration: 1.5,
        ease: 'power2.out'
      });
    });
  }

  // Handle Nav Scroll Effect
  const nav = document.getElementById('main-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Reveal on Scroll Animations
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

  // Scroll-based depth effect
  gsap.to('#hero-main-visual', {
    scale: 1.2,
    y: 100,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });
});
