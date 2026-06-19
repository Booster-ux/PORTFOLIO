import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// Initialize Smooth Scroll (Lenis)
const lenis = new Lenis({
  lerp: 0.1,
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Page Entrance & Scroll Animations (Linear style)
window.addEventListener('load', () => {
  // Reveal animations on scroll
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach((el, index) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
      },
      delay: 0.05
    });
  });

  // Navigation highlight
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('main-nav');
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Hero special stagger
  gsap.from('#hero .reveal', {
    opacity: 0,
    y: 40,
    duration: 1.5,
    stagger: 0.15,
    ease: 'expo.out'
  });
});

// Horizontal Parallax for hero background (Subtle)
gsap.to('#hero', {
  backgroundPositionY: '20%',
  ease: 'none',
  scrollTrigger: {
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  }
});
