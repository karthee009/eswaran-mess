import { brand, telHref } from '../data/restaurantData';
import { items } from '../data/menuData';
export default function Hero({ shop }) {
  const tel = telHref(shop.phone), words = items.map((i) => i.name);
  return (<>
    <section id="home" className="nhero">
      <div className="doors" aria-hidden="true"><div className="door l" /><div className="door r" /><p className="doors-t ta-mark">ஈஸ்வரன் மெஸ்</p></div>
      <img className="nhero-img" src="/images/gopuram.webp" width="452" height="678" fetchpriority="high" decoding="async" alt="Rajagopuram of the Andal Temple, Srivilliputhur" />
      <div className="nhero-shade" aria-hidden="true" />
      <div className="nhero-copy">
        <div className="rule hero-in" />
        <p className="ta-mark hero-in" lang="ta">ஈஸ்வரன் மெஸ்</p>
        <h1 className="hero-in">ESWARAN MESS</h1>
        <p className="hero-tag hero-in">{brand.tagline}</p>
        <p className="hero-in hero-sub">{brand.heroSub}</p>
        <p className="hero-in hero-text">{brand.heroText}</p>
        <div className="hero-in cta"><a className="btn btn-gold" href="#menu">Explore Our Menu</a>
          <a className="btn btn-ghost" href={tel || '#shops'}>{tel ? 'Call Now' : 'Call Now · see shops'}</a></div>
      </div>
      <ul className="nhero-facts hero-in"><li>Pure Vegetarian</li><li aria-hidden="true">◆</li><li>Two Shops</li><li aria-hidden="true">◆</li><li>South Indian</li></ul>
    </section>
    <div className="marquee" aria-hidden="true"><div>{[...words, ...words, ...words, ...words].map((w, i) => <span key={i}>{w}</span>)}</div></div>
  </>);
}
