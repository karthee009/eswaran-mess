import { shops, telHref } from '../data/restaurantData';
import { Heading } from './Sections';
export default function Shops({ selected, onPick }) {
  return (<section id="shops" className="sec heritage"><div className="wrap"><Heading eyebrow="Two Shops" ta="எங்கள் கடைகள்" title="Choose Your Shop" />
    <div className="grid two" role="radiogroup" aria-label="Select a shop">{shops.map((s, i) => { const on = selected === s.id, t = telHref(s.phone); return (
      <article key={s.id} className={`card shop ${on ? 'on' : ''} v${i}`} data-reveal>
        <h3>{s.name}</h3><p>{s.address || 'Address to be added'}</p><p>{s.hours || 'Opening hours to be added'}</p>
        <button role="radio" aria-checked={on} className={`btn ${on ? 'btn-green' : 'btn-ghost-d'}`} onClick={() => onPick(s.id)}>{on ? '✓ Selected' : 'Select this shop'}</button>
        <div className="row">{t ? <a className="btn btn-gold-d" href={t}>Call This Shop</a> : <span className="btn disabled" aria-disabled="true">Phone to be added</span>}
          {s.mapsUrl && <a className="btn btn-ghost-d" href={s.mapsUrl} target="_blank" rel="noopener noreferrer" aria-label={`Get directions to ${s.name}`}>Get Directions</a>}
          {s.reviewsUrl && <a className="btn btn-ghost-d" href={s.reviewsUrl} target="_blank" rel="noopener noreferrer">View Google Listing</a>}</div>
      </article>); })}</div></div></section>);
}
