import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// 1. Premium Smooth Scroll
const lenis = new Lenis({
  lerp: 0.1,
  duration: 1.5,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 2. Entrance Animation Sequence
window.addEventListener('load', () => {
  const tl = gsap.timeline();

  // Smooth fade out of loader
  tl.to('#page-loader', {
    opacity: 0,
    duration: 1,
    ease: 'power3.inOut',
    onComplete: () => {
      document.getElementById('page-loader').style.display = 'none';
    }
  })
    // Sequential entrance using premium cubic-bezier easing (expo.out)
    .from('.hero-badge', { y: 20, opacity: 0, duration: 1, ease: 'expo.out' }, '-=0.3')
    .from('.hero-title', { y: 40, opacity: 0, duration: 1.2, ease: 'expo.out' }, '-=0.9')
    .from('.hero-subtitle', { y: 30, opacity: 0, duration: 1, ease: 'expo.out' }, '-=1.0')
    .from('.hero-actions', { y: 20, opacity: 0, duration: 1, ease: 'expo.out' }, '-=0.9')
    .from('.hero-visual-side', {
      x: 60,
      opacity: 0,
      duration: 1.8,
      ease: 'power4.out',
      clearProps: 'all' // Ensures it stays in correct final state
    }, '-=1.3');

  // 3. Persistent Global Atmosphere Animations
  gsap.to('.atmosphere-1', {
    x: '15vw', y: '10vh',
    duration: 20, repeat: -1, yoyo: true, ease: 'sine.inOut'
  });

  gsap.to('.atmosphere-2', {
    x: '-20vw', y: '-15vh',
    duration: 25, repeat: -1, yoyo: true, ease: 'sine.inOut'
  });

  gsap.to('.atmosphere-3', {
    x: '10vw', y: '20vh',
    duration: 18, repeat: -1, yoyo: true, ease: 'sine.inOut'
  });

  // 4. Subtle Character Interaction (Breathing + Mouse Parallax)
  const mascot = document.getElementById('hero-main-visual');
  if (mascot) {
    // Subtle Breathing
    gsap.to(mascot, {
      scale: 1.02,
      y: -10,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Mouse Parallax Logic
    window.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const xOffset = (clientX / window.innerWidth - 0.5) * 40;
      const yOffset = (clientY / window.innerHeight - 0.5) * 40;

      gsap.to(mascot, {
        x: xOffset,
        y: yOffset - 10, // Maintain breathing offset
        duration: 2,
        ease: 'power3.out'
      });
    });
  }

  // 5. Scroll Reveals
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(el => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        toggleActions: 'play none none none'
      }
    });
  });

  // 6. Navigation Scroll Effect
  const nav = document.getElementById('main-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // 7. Background Parallax
  gsap.to('.hero-city-bg', {
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
