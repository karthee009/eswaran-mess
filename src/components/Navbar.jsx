import { useEffect, useRef, useState } from 'react';
import { nav, telHref } from '../data/restaurantData';

export default function Navbar({ shop }) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const bar = useRef(null);

  useEffect(() => {
    let previousSolid = false;

    const updateScroll = () => {
      const y = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const nextSolid = y > 40;

      if (nextSolid !== previousSolid) {
        previousSolid = nextSolid;
        setSolid(nextSolid);
      }

      if (bar.current) {
        const progress = maxScroll > 0 ? Math.min(1, Math.max(0, y / maxScroll)) : 0;
        bar.current.style.transform = `scaleX(${progress})`;
      }
    };

    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', updateScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-42% 0px -50% 0px' }
    );

    nav.forEach(([id]) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
      window.removeEventListener('keydown', handleKeyDown);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('lock', open);
    return () => document.documentElement.classList.remove('lock');
  }, [open]);

  const closeMenu = () => setOpen(false);
  const phoneHref = telHref(shop?.phone);

  return (
    <header className={`nav ${solid ? 'solid' : ''} ${open ? 'open' : ''}`}>
      <div className="nav-in">
        <a href="#home" className="logo" onClick={closeMenu} aria-label="Eswaran Idly Kadai home">
          <span className="logo-main">ESWARAN</span>
          <span className="logo-sub">IDLY KADAI</span>
        </a>

        <button
          className="burger"
          type="button"
          aria-expanded={open}
          aria-controls="navlinks"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setOpen((value) => !value)}
        >
          <i /><i /><i />
        </button>

        <nav id="navlinks" className={open ? 'open' : ''} aria-label="Main navigation">
          {nav.map(([id, label, tamilLabel], index) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? 'active' : ''}
              aria-current={active === id ? 'location' : undefined}
              style={{ '--nav-index': index }}
              onClick={closeMenu}
            >
              <small>{String(index + 1).padStart(2, '0')}</small>
              <span className="nav-label">{label}</span>
              {tamilLabel ? <em>{tamilLabel}</em> : null}
            </a>
          ))}
          <a
            className="btn btn-gold nav-call"
            href={phoneHref || '#shops'}
            onClick={closeMenu}
          >
            <span>Call Now</span><b aria-hidden="true">↗</b>
          </a>
        </nav>
      </div>
      <i className="progress" ref={bar} aria-hidden="true" />
    </header>
  );
}
