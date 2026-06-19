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

  // Combined Scroll & Staggered Reveal for Portfolio
  gsap.from('.portfolio-card', {
    opacity: 0,
    y: 60,
    duration: 1.2,
    stagger: 0.15,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '#portfolio-grid',
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  });

  // Lightbox Logic
  const lightbox = document.getElementById('lightbox');
  const lightboxContent = document.getElementById('lightbox-content');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxOverlay = document.querySelector('.lightbox-overlay');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  portfolioCards.forEach(card => {
    card.addEventListener('click', () => {
      const src = card.getAttribute('data-src');
      const type = card.getAttribute('data-type');
      const category = card.getAttribute('data-category');
      const title = card.getAttribute('data-title');

      document.getElementById('modal-category').textContent = category.toUpperCase();
      document.getElementById('modal-title').textContent = title;

      lightboxContent.innerHTML = '';

      if (type === 'image') {
        const img = document.createElement('img');
        img.src = src;
        lightboxContent.appendChild(img);
      } else if (type === 'video') {
        const video = document.createElement('video');
        video.src = src;
        video.controls = true;
        video.autoplay = true;
        lightboxContent.appendChild(video);
      }

      lightbox.classList.add('active');
      lenis.stop();
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    lenis.start();
    const video = lightboxContent.querySelector('video');
    if (video) video.pause();
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxOverlay.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // Unified Scroll Revelation Flow (remainders)
  const reveals = document.querySelectorAll('.reveal:not(.portfolio-card)');
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
