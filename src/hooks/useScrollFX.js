import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useScrollFX(ref) {
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const $ = (selector) => gsap.utils.toArray(selector, root);
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Cinematic hero: layered zoom, image drift and copy fade tied to scroll.
        const hero = root.querySelector('.hero');
        const heroImg = root.querySelector('.hero-image');
        if (hero && heroImg) {
          gsap.fromTo(heroImg, { scale: 1.02 }, {
            scale: 1.18, ease: 'none',
            scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.8 }
          });
          gsap.to(heroImg, {
            yPercent: 12, ease: 'none',
            scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.8 }
          });
        }
        gsap.to('.hero-copy', {
          yPercent: -14, scale: 0.94, opacity: 0, ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom 18%', scrub: 0.7 }
        });
        gsap.to('.hero-stamp', {
          rotation: 200, scale: 0.86, ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.8 }
        });

        // Editorial heading wipes and copy reveals.
        $('.story-heading h2,.section-top h2,.branch-head h2,.review-copy h2,.contact-heading h2,.function-section h2,.experience-heading h2').forEach((heading) => {
          gsap.fromTo(heading, { clipPath: 'inset(0 100% 0 0)', y: 24 }, {
            clipPath: 'inset(0 0% 0 0)', y: 0, duration: 1.05, ease: 'power3.out',
            scrollTrigger: { trigger: heading, start: 'top 88%', once: true },
            onComplete: () => gsap.set(heading, { clearProps: 'clipPath,transform' })
          });
        });

        // Photos reveal like a curtain, with restrained depth/parallax.
        $('.story-photo,.review-art,.branch-image,.experience-photo').forEach((frame) => {
          gsap.fromTo(frame, { clipPath: 'inset(10% 8% 10% 8%)', borderRadius: '2px' }, {
            clipPath: 'inset(0% 0% 0% 0%)', borderRadius: '0px', duration: 1.15, ease: 'power3.out',
            scrollTrigger: { trigger: frame, start: 'top 90%', once: true },
            onComplete: () => gsap.set(frame, { clearProps: 'clipPath,borderRadius' })
          });
          const img = frame.querySelector('img');
          if (img) gsap.fromTo(img, { yPercent: -5, scale: 1.12 }, {
            yPercent: 5, scale: 1.12, ease: 'none',
            scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: 0.7 }
          });
        });

        // New immersive food story: pinned horizontal journey on wide screens;
        // mobile keeps native swipe scrolling and does not hijack vertical scroll.
        mm.add('(min-width: 900px)', () => {
          const section = root.querySelector('.experience-section');
          const viewport = section?.querySelector('.experience-viewport');
          const track = section?.querySelector('.experience-track');
          if (!section || !viewport || !track) return;
          const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
          gsap.to(track, {
            x: () => -distance(), ease: 'none',
            scrollTrigger: {
              trigger: section, start: 'top top', end: () => `+=${Math.max(distance(), window.innerWidth * 1.15)}`,
              pin: true, scrub: 0.8, anticipatePin: 1, invalidateOnRefresh: true,
              onUpdate: (self) => {
                const progress = section.querySelector('.experience-progress span');
                if (progress) progress.style.transform = `scaleX(${self.progress})`;
              }
            }
          });
          return () => { gsap.set(track, { clearProps: 'transform' }); };
        });

        // Count-up statistic.
        $('.stat-big').forEach((el) => {
          const node = el.firstChild;
          if (!node || node.nodeType !== 3) return;
          if (!el.dataset.end) el.dataset.end = node.nodeValue;
          const end = parseInt(el.dataset.end, 10) || 0;
          const state = { value: 0 };
          node.nodeValue = '0';
          gsap.to(state, {
            value: end, duration: 1.7, ease: 'power2.out',
            onUpdate: () => { node.nodeValue = String(Math.round(state.value)); },
            scrollTrigger: { trigger: el, start: 'top 85%', once: true }
          });
        });

        // Staggered menu and branch entry, only a small travel distance for readability.
        $('.dish-card,.meal-price-card,.branch-card,.contact-action,.experience-panel').forEach((card, index) => {
          gsap.fromTo(card, { y: 24, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.7, delay: (index % 5) * 0.055, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 93%', once: true },
            onComplete: () => gsap.set(card, { clearProps: 'transform,opacity' })
          });
        });

        // Draw kolam linework as it enters view.
        $('.kolam').forEach((ornament) => {
          const strokes = ornament.querySelectorAll('path,circle,ellipse,line,polyline,polygon');
          strokes.forEach((stroke) => {
            if (typeof stroke.getTotalLength !== 'function') return;
            const length = stroke.getTotalLength();
            gsap.set(stroke, { strokeDasharray: length, strokeDashoffset: length });
          });
          if (strokes.length) {
            gsap.to(strokes, {
              strokeDashoffset: 0, duration: 1.1, stagger: 0.065, ease: 'power2.out',
              scrollTrigger: { trigger: ornament, start: 'top 92%', once: true },
              onComplete: () => gsap.set(strokes, { clearProps: 'strokeDasharray,strokeDashoffset' })
            });
          }
        });

        const functionDeco = root.querySelector('.function-deco');
        if (functionDeco) gsap.to(functionDeco, {
          rotation: 180, scale: 1.12, ease: 'none',
          scrollTrigger: { trigger: '.function-section', start: 'top bottom', end: 'bottom top', scrub: 0.7 }
        });

        // The heritage ticker subtly responds to scroll velocity.
        const track = root.querySelector('.ticker-track');
        let lastY = window.scrollY;
        const tick = () => {
          const animation = track && track.getAnimations()[0];
          const delta = Math.abs(window.scrollY - lastY);
          lastY = window.scrollY;
          if (animation) animation.playbackRate += (1 + Math.min(5, delta / 7) - animation.playbackRate) * 0.08;
        };
        gsap.ticker.add(tick);
        return () => gsap.ticker.remove(tick);
      });
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    const fontsReady = document.fonts?.ready;
    if (fontsReady) fontsReady.then(refresh).catch(() => {});
    return () => {
      window.removeEventListener('load', refresh);
      ctx.revert();
    };
  }, [ref]);
}
