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

// Particle Background System
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let width, height;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.init();
    }

    init() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.4 + 0.1;
      this.depth = Math.random() * 1.5 + 0.5;
    }

    update() {
      this.x += this.speedX * this.depth;
      this.y += this.speedY * this.depth;

      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(165, 180, 252, ${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 110; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();

  // Subtle Mouse Parallax for Particles
  window.addEventListener('mousemove', (e) => {
    const mouseX = (e.clientX / width - 0.5) * 30;
    const mouseY = (e.clientY / height - 0.5) * 30;

    particles.forEach(p => {
      gsap.to(p, {
        x: p.x + (mouseX * p.depth * 0.05),
        y: p.y + (mouseY * p.depth * 0.05),
        duration: 3,
        ease: 'power2.out',
        overwrite: true
      });
    });
  });
}

// Global Entrance & Interaction Logic
window.addEventListener('load', () => {
  initParticles();

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

  // High-Performance Snap Browser System
  function initPortfolioBrowser() {
    const viewport = document.getElementById('portfolio-browser');
    const track = viewport.querySelector('.browser-track');
    const items = track.querySelectorAll('.browser-item');
    const btnPrev = document.getElementById('browser-prev');
    const btnNext = document.getElementById('browser-next');
    const pagination = document.getElementById('pagination-dots');

    if (!viewport) return;

    // Generate Pagination Dots
    const itemsPerView = window.innerWidth > 1200 ? 8 : (window.innerWidth > 991 ? 6 : (window.innerWidth > 767 ? 4 : 2));
    const pageCount = Math.ceil(items.length / itemsPerView);

    for (let i = 0; i < pageCount; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        const scrollAmount = i * (viewport.offsetWidth + 16);
        viewport.scrollTo({ left: scrollAmount, behavior: 'smooth' });
      });
      pagination.appendChild(dot);
    }

    const dots = pagination.querySelectorAll('.dot');

    // Navigation Buttons
    btnNext.addEventListener('click', () => {
      viewport.scrollBy({ left: viewport.offsetWidth / 2, behavior: 'smooth' });
    });

    btnPrev.addEventListener('click', () => {
      viewport.scrollBy({ left: -viewport.offsetWidth / 2, behavior: 'smooth' });
    });

    // Update Dots on Scroll
    viewport.addEventListener('scroll', () => {
      const scrollIndex = Math.round(viewport.scrollLeft / (viewport.offsetWidth + 16));
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === scrollIndex);
      });
    });

    // Lightbox Binding
    items.forEach(item => {
      item.addEventListener('click', () => {
        const imgTarget = item.querySelector('img');
        if (!imgTarget) return;

        document.getElementById('modal-category').textContent = 'STUDIO SHOWCASE';
        document.getElementById('modal-title').textContent = imgTarget.alt;

        const lightboxContent = document.getElementById('lightbox-content');
        lightboxContent.innerHTML = '';
        const img = document.createElement('img');
        img.src = imgTarget.src;
        lightboxContent.appendChild(img);

        document.getElementById('lightbox').classList.add('active');
        lenis.stop();
      });
    });
  }

  initPortfolioBrowser();

  // Lightbox Logic (Old grid binding removed)
  const lightbox = document.getElementById('lightbox');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxOverlay = document.querySelector('.lightbox-overlay');

  function closeLightbox() {
    lightbox.classList.remove('active');
    lenis.start();
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxOverlay.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
  });

  // Unified Scroll Revelation Flow (remainders)
  const reveals = document.querySelectorAll('.reveal:not(.grid-item)');
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
