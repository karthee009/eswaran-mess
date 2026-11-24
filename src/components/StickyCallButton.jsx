import { useEffect, useState } from 'react';
import { telHref } from '../data/restaurantData';
export default function StickyCallButton({ shop }) {
  const [show, setShow] = useState(false), tel = telHref(shop.phone);
  useEffect(() => { const f = () => setShow(window.scrollY > window.innerHeight * 0.8); f(); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f); }, []);
  if (!tel) return null;
  return <a className={`sticky-call ${show ? 'show' : ''}`} href={tel} aria-label={`Call Eswaran Mess ${shop.name}`}>Call {shop.name}</a>;
}
