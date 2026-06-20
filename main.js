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

  // High-End Interactive Carousel System
  function initShowcaseCarousel() {
    const viewport = document.getElementById('showcase-carousel');
    const track = viewport.querySelector('.carousel-track');
    const slides = Array.from(track.querySelectorAll('.carousel-slide'));

    // Duplicate slides for seamless loop
    slides.forEach(slide => {
      const clone = slide.cloneNode(true);
      track.appendChild(clone);
    });

    let totalWidth = 0;
    const updateWidths = () => {
      totalWidth = track.scrollWidth / 2;
    };
    updateWidths();
    window.addEventListener('resize', updateWidths);

    let xPos = 0;
    let isDragging = false;
    let velocity = 0.8; // Constant drift speed

    function loop() {
      if (!isDragging) {
        xPos -= velocity;
        if (xPos <= -totalWidth) xPos = 0;
        if (xPos > 0) xPos = -totalWidth;
        track.style.transform = `translateX(${xPos}px)`;
      }
      requestAnimationFrame(loop);
    }
    loop();

    // Interaction Handlers
    let startX, currentSwipeX;

    viewport.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX - xPos;
      velocity = 0;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      currentSwipeX = e.pageX - startX;
      xPos = currentSwipeX;
      track.style.transform = `translateX(${xPos}px)`;
    });

    window.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        velocity = 0.8; // Resume drift
      }
    });

    // Touch Support
    viewport.addEventListener('touchstart', (e) => {
      isDragging = true;
      startX = e.touches[0].pageX - xPos;
    });

    viewport.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      currentSwipeX = e.touches[0].pageX - startX;
      xPos = currentSwipeX;
      track.style.transform = `translateX(${xPos}px)`;
    });

    viewport.addEventListener('touchend', () => {
      isDragging = false;
      velocity = 0.8;
    });

    // Hover Pause
    viewport.addEventListener('mouseenter', () => velocity = 0.2);
    viewport.addEventListener('mouseleave', () => {
      if (!isDragging) velocity = 0.8;
    });

    // Re-bind Lightbox to slides (including clones)
    track.querySelectorAll('.carousel-slide').forEach(item => {
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

  initShowcaseCarousel();

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
