import { useEffect, useRef, useState } from 'react';
const S = [['home', 'Home'], ['story', 'Story'], ['menu', 'Menu'], ['branches', 'Branches'], ['reviews', 'Reviews'], ['functions', 'Functions'], ['contact', 'Contact']];
export default function ScrollUI() {
  const bar = useRef(null), [active, setActive] = useState('home');
  useEffect(() => {
    const on = () => { const h = document.documentElement.scrollHeight - innerHeight; if (bar.current) bar.current.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`; };
    on(); addEventListener('scroll', on, { passive: true });
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' });
    S.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => { removeEventListener('scroll', on); io.disconnect(); };
  }, []);
  return (<>
    <div className="scroll-progress" ref={bar} aria-hidden="true" />
    <nav className="side-dots" aria-label="Page sections">{S.map(([id, l]) => <a key={id} href={`#${id}`} className={active === id ? 'on' : ''} aria-label={l} data-label={l} />)}</nav>
  </>);
}
