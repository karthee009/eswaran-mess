import { brand, shops, telHref } from '../data/restaurantData';
import { items, formatPrice, isSample } from '../data/menuData';
import Kolam from './Kolam';
export const Heading = ({ eyebrow, title, ta }) => (<div className="sh" data-reveal><p className="eyebrow">{eyebrow}{ta && <span className="ta"> · {ta}</span>}</p><h2>{title}</h2><Kolam /></div>);
export function Intro() {
  return (<section id="story" className="sec"><div className="wrap split">
    <div data-reveal><p className="eyebrow">Welcome</p><h2>{brand.introTitle}</h2><Kolam /><p>{brand.introText}</p></div>
    <div className="frame" data-mask><div data-parallax className="art"><img src="/images/gopuram.webp" width="452" height="678" loading="lazy" decoding="async" alt="Gopuram of the Andal Temple, Srivilliputhur" /></div></div>
  </div></section>);
}
export function Dish({ d }) {
  return (<article className="card"><div className="thumb" aria-hidden="true">{d.name[0]}</div><div className="card-top"><h3>{d.name}</h3>{d.veg && <span className="veg" role="img" aria-label="Vegetarian"><i /></span>}</div>
    <p>{d.description}</p><p className="meta"><span className="price">{formatPrice(d.price)}</span><span className="tag">{d.category}</span></p></article>);
}
export function Signature() {
  return (<section className="sec alt"><div className="wrap"><Heading eyebrow="Signature Dishes" ta="சிறப்பு உணவுகள்" title="Favourites to begin with" />
    {isSample && <p className="note">Sample menu – to be replaced with the restaurant's verified dishes and prices.</p>}
    <div className="grid">{items.filter((i) => i.featured).map((d) => <Dish key={d.id} d={d} />)}</div>
    <p className="center"><a className="btn btn-green" href="#menu">View Full Menu</a></p></div></section>);
}
export function Heritage() {
  return (<section className="sec heritage"><div className="wrap center"><Heading eyebrow="Andal Heritage" ta="ஆண்டாள் பாரம்பரியம்" title={brand.heritageTitle} />
    <p className="lead" data-reveal>{brand.heritageText}</p>{brand.storyNote && <p className="lead" data-reveal>{brand.storyNote}</p>}</div></section>);
}
export function Contact({ onPick }) {
  return (<section id="contact" className="sec alt"><div className="wrap"><Heading eyebrow="Visit Us" ta="வருகை தாருங்கள்" title="Contact & Locations" />
    <div className="grid two">{shops.map((s) => { const t = telHref(s.phone); return (
      <div key={s.id} className="card" data-reveal><h3>Eswaran Mess – {s.name}</h3>
        <p>{s.address || 'Address to be added'}</p><p>{s.phone || 'Phone to be added'}</p><p>{s.hours || 'Opening hours to be added'}</p>
        <div className="row">{t && <a className="btn btn-green" href={t} onClick={() => onPick(s.id)}>Call {s.name}</a>}
          {s.mapsUrl && <a className="btn btn-ghost-d" href={s.mapsUrl} target="_blank" rel="noopener noreferrer">Directions</a>}
          {s.reviewsUrl && <a className="btn btn-ghost-d" href={s.reviewsUrl} target="_blank" rel="noopener noreferrer">Google Listing</a>}</div></div>); })}</div></div></section>);
}
export function Footer() {
  return (<footer className="footer"><div className="wrap foot"><div><p className="logo">ESWARAN <span>MESS</span></p><p>Tradition in Every Bite.</p><Kolam /></div>
    <nav aria-label="Footer"><a href="#home">Home</a><a href="#story">Our Story</a><a href="#menu">Menu</a><a href="#shops">Our Shops</a><a href="#contact">Contact</a></nav>
    <nav aria-label="Shops">{shops.map((s) => <a key={s.id} href="#shops">{s.name}</a>)}</nav></div>
    <p className="copy">© {new Date().getFullYear()} Eswaran Mess, Srivilliputhur</p></footer>);
}
