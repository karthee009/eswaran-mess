import { useMemo, useState } from 'react';
import { categories, items, isSample } from '../data/menuData';
import { Heading, Dish } from './Sections';
export default function Menu() {
  const [q, setQ] = useState(''), [cat, setCat] = useState('All');
  const list = useMemo(() => items.filter((i) => (cat === 'All' || i.category === cat) && i.name.toLowerCase().includes(q.trim().toLowerCase())), [q, cat]);
  return (<section id="menu" className="sec"><div className="wrap"><Heading eyebrow="Our Menu" ta="உணவுப் பட்டியல்" title="Explore the Menu" />
    {isSample && <p className="note">Sample menu – replace in src/data/menuData.js before publishing.</p>}
    <div className="menu-bar"><div className="tools"><label className="search"><span className="sr">Search dishes</span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
      <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search dishes…" /></label>
      {q && <button className="btn btn-ghost-d" onClick={() => setQ('')}>Clear</button>}</div>
    <div className="chips" role="group" aria-label="Filter by category">{['All', ...categories].map((c) =>
      <button key={c} className="chip" aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>)}</div></div>
    <p className="count" aria-live="polite">{list.length} {list.length === 1 ? 'dish' : 'dishes'}{cat !== 'All' ? ` in ${cat}` : ''}</p>
    {list.length ? <div className="grid menu">{list.map((d) => <Dish key={`${cat}-${d.id}`} d={d} />)}</div>
      : <p className="empty">No dishes match your search. <button className="link" onClick={() => { setQ(''); setCat('All'); }}>Reset filters</button></p>}
  </div></section>);
}
