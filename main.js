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
    onComplete: () => {
      document.getElementById('page-loader').style.display = 'none';
    }
  })
    .from('.hero-badge', { y: 20, opacity: 0, duration: 1, ease: 'expo.out' }, '-=0.2')
    .from('.hero-title', { y: 40, opacity: 0, duration: 1.2, ease: 'expo.out' }, '-=0.8')
    .from('.hero-subtitle', { y: 20, opacity: 0, duration: 1, ease: 'expo.out' }, '-=0.8')
    .from('.hero-actions', { y: 20, opacity: 0, duration: 1, ease: 'expo.out' }, '-=0.8')
    .from('.hero-visual-side', {
      x: 40,
      opacity: 0,
      duration: 2,
      ease: 'power4.out'
    }, '-=1.2');

  // Background Glow Orb Animations (Linear-style)
  gsap.to('.orb-1', {
    x: '20%',
    y: '10%',
    duration: 12,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  gsap.to('.orb-2', {
    x: '-10%',
    y: '-15%',
    duration: 10,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  // Subtitling character floating
  gsap.to('#hero-main-visual', {
    y: -15,
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  // Mouse Parallax for Visual Side
  const heroVisualSide = document.querySelector('.hero-visual-side');
  if (heroVisualSide) {
    window.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 30;
      const yPos = (clientY / window.innerHeight - 0.5) * 30;

      gsap.to('#hero-main-visual', {
        x: xPos,
        y: yPos - 15, // keep floating offset
        duration: 2,
        ease: 'power2.out'
      });
    });
  }

  // Scroll Revelations
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

  // Subtle Nav Scroll
  const nav = document.getElementById('main-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Parallax effect on Section Scroll
  gsap.to('.hero-city-bg', {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-split',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });
});
