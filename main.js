import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// Initialize Smooth Scroll
let lenis = new Lenis({
  lerp: 0.1,
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Global Entrance & Interaction Logic
window.addEventListener('load', () => {
  const tlEntrance = gsap.timeline();

  // Loader sequence
  tlEntrance.to('#page-loader', {
    opacity: 0,
    duration: 1,
    ease: 'expo.inOut',
    onComplete: () => {
      document.getElementById('page-loader').style.display = 'none';
    }
  });

  // Hero Section Entrance
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
    y: -20,
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  // Mouse Parallax for Hero Visual
  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual && window.innerWidth > 1024) {
    window.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const xMoved = (clientX / window.innerWidth - 0.5) * 40;
      const yMoved = (clientY / window.innerHeight - 0.5) * 40;

      gsap.to('#mascot-main', {
        x: xMoved,
        y: yMoved - 20,
        duration: 2,
        ease: 'power2.out'
      });
    });
  }

  // Unified Scroll Revelation Flow
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

  // Navigation: Hamburger Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  function toggleMenu() {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');

    // Toggle scroll lock
    if (navMenu.classList.contains('active')) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }

  menuToggle.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        toggleMenu();
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

  // Global Parallax depth for background scene
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
