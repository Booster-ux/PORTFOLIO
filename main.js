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

// Animation Orchestration
window.addEventListener('load', () => {
  const tlEntrance = gsap.timeline();

  // Page Loader transition
  tlEntrance.to('#page-loader', {
    opacity: 0,
    duration: 1,
    ease: 'expo.inOut',
    onComplete: () => {
      document.getElementById('page-loader').style.display = 'none';
    }
  });

  // Hero Section Entrance - Settles permanently
  tlEntrance.to('.hero-entrance', {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    duration: 1.4,
    stagger: 0.15,
    ease: 'expo.out'
  }, '-=0.4');

  // Background Atmosphere: Living Orbs
  const orbs = ['.orb-1', '.orb-2', '.orb-3', '.orb-4', '.orb-5'];
  orbs.forEach((orb, i) => {
    gsap.to(orb, {
      x: (i % 2 === 0 ? '15%' : '-15%'),
      y: (i % 3 === 0 ? '10%' : '-10%'),
      duration: 10 + (i * 2),
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  });

  // Mascot: Breathing Motion
  gsap.to('#mascot-main', {
    y: -15,
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  // Mouse Parallax for Hero Visual
  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual) {
    window.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const xMoved = (clientX / window.innerWidth - 0.5) * 30;
      const yMoved = (clientY / window.innerHeight - 0.5) * 30;

      gsap.to('#mascot-main', {
        x: xMoved,
        y: yMoved - 15,
        duration: 2,
        ease: 'power2.out'
      });
    });
  }

  // Scroll Reveal (Filtered to ignore hero elements)
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(el => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 92%',
        toggleActions: 'play none none none'
      }
    });
  });

  // Nav Background on scroll
  const nav = document.getElementById('main-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Global Scroll Parallax depth for background scene
  gsap.to('.bg-scene', {
    yPercent: -10,
    ease: 'none',
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true
    }
  });
});
