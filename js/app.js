(() => {
  'use strict';

  document.documentElement.classList.add('js');

  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');
  const desktop = window.matchMedia('(min-width: 768px)');

  if (toggle && nav) {
    const setMenu = (open, restoreFocus = false) => {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      toggle.classList.toggle('is-open', open);
      nav.classList.toggle('is-open', open);
      document.body.classList.toggle('menu-open', open);
      nav.inert = !desktop.matches && !open;
      if (restoreFocus) toggle.focus();
    };

    toggle.addEventListener('click', () => {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false, true);
      }
    });
    document.addEventListener('click', (event) => {
      if (!nav.contains(event.target) && !toggle.contains(event.target)) setMenu(false);
    });
    desktop.addEventListener('change', () => setMenu(false));
    setMenu(false);
  }

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());

  // All content starts visible. Motion is an optional enhancement, including
  // when the library is unavailable or the visitor prefers reduced motion.
  const gsap = window.gsap;
  if (!gsap) return;

  const motion = gsap.matchMedia();
  motion.add('(prefers-reduced-motion: no-preference)', () => {
    const hero = gsap.utils.toArray('[data-hero-reveal]');
    if (hero.length) {
      gsap.from(hero, {
        opacity: 0,
        y: 28,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        clearProps: 'opacity,transform',
      });
    }

    const sections = gsap.utils.toArray('[data-reveal]');
    let observer;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          gsap.fromTo(entry.target, { opacity: 0, y: 28 }, {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            clearProps: 'opacity,transform',
          });
        });
      }, { threshold: 0.12 });
      sections.forEach((section) => observer.observe(section));
    }

    // A small response to the pointer adds depth without moving the layout.
    const image = document.querySelector('[data-motion-image]');
    const surface = image?.closest('[data-motion-surface]') || image?.parentElement;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    let onMove;
    let onLeave;
    if (image && surface && finePointer.matches) {
      const xTo = gsap.quickTo(image, 'x', { duration: 1.2, ease: 'power3.out' });
      const yTo = gsap.quickTo(image, 'y', { duration: 1.2, ease: 'power3.out' });
      onMove = (event) => {
        const bounds = surface.getBoundingClientRect();
        xTo(((event.clientX - bounds.left) / bounds.width - 0.5) * 12);
        yTo(((event.clientY - bounds.top) / bounds.height - 0.5) * 12);
      };
      onLeave = () => { xTo(0); yTo(0); };
      surface.addEventListener('pointermove', onMove);
      surface.addEventListener('pointerleave', onLeave);
    }

    return () => {
      observer?.disconnect();
      if (surface && onMove) {
        surface.removeEventListener('pointermove', onMove);
        surface.removeEventListener('pointerleave', onLeave);
      }
    };
  });
})();
