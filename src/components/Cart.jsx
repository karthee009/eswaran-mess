import { useEffect, useState } from 'react';
const PHONE = '917810061172';
export const Qty = ({ item, qty, onAdd, onDec }) => qty
  ? <span className="qty"><button onClick={() => onDec(item)} aria-label={`Remove one ${item.en}`}>−</button><b>{qty}</b><button onClick={() => onAdd(item)} aria-label={`Add one ${item.en}`}>+</button></span>
  : <button className="qty-add" onClick={() => onAdd(item)} aria-label={`Add ${item.en}`}>+</button>;

export default function Cart({ cart, add, dec, clear, lang }) {
  const [open, setOpen] = useState(false), [name, setName] = useState(''), [mode, setMode] = useState('Parcel'), [note, setNote] = useState('');
  const lines = Object.values(cart), count = lines.reduce((n, l) => n + l.qty, 0), total = lines.reduce((n, l) => n + l.qty * l.item.price, 0), ta = lang === 'ta';
  useEffect(() => { if (!count) setOpen(false); }, [count]);
  useEffect(() => { if (!open) return; const k = (e) => e.key === 'Escape' && setOpen(false); addEventListener('keydown', k); return () => removeEventListener('keydown', k); }, [open]);
  if (!count) return null;
  const parts = ['Vanakkam Eswaran Idly Kadai! I would like to order:', '', ...lines.map((l) => `${l.qty} × ${l.item.en} — ₹${l.qty * l.item.price}`), '', `Total: ₹${total}`, `Type: ${mode}`];
  if (name) parts.push(`Name: ${name}`);
  if (note) parts.push(`Note: ${note}`);
  const msg = parts.join('\n');
  return (<>
    <button className="cart-bar" onClick={() => setOpen(true)}><span>{ta ? 'ஆர்டரைப் பார்க்க' : 'View order'}</span><span>{count} {ta ? 'உணவுகள்' : count === 1 ? 'item' : 'items'}</span><strong>₹{total}</strong></button>
    {open && <div className="cart-overlay" onClick={() => setOpen(false)}><aside className="cart-panel" role="dialog" aria-modal="true" aria-label="Your order" onClick={(e) => e.stopPropagation()}>
      <div className="cart-head"><h3>{ta ? 'உங்கள் ஆர்டர்' : 'Your order'}</h3><button onClick={() => setOpen(false)} aria-label="Close">×</button></div>
      <ul className="cart-lines">{lines.map((l) => <li key={l.item.en}><span><b>{ta ? l.item.ta : l.item.en}</b><small>₹{l.item.price} × {l.qty}</small></span><Qty item={l.item} qty={l.qty} onAdd={add} onDec={dec} /><strong>₹{l.qty * l.item.price}</strong></li>)}</ul>
      <div className="cart-total"><span>{ta ? 'மொத்தம்' : 'Total'}</span><strong>₹{total}</strong></div>
      <div className="cart-mode" role="group" aria-label="Order type">{['Parcel', 'Dine-in'].map((m) => <button key={m} className={mode === m ? 'on' : ''} onClick={() => setMode(m)}>{m === 'Parcel' ? (ta ? 'பார்சல்' : 'Parcel') : (ta ? 'கடையில்' : 'Dine-in')}</button>)}</div>
      <input className="cart-field" value={name} onChange={(e) => setName(e.target.value)} placeholder={ta ? 'உங்கள் பெயர் (விருப்பம்)' : 'Your name (optional)'} />
      <input className="cart-field" value={note} onChange={(e) => setNote(e.target.value)} placeholder={ta ? 'குறிப்பு / வரும் நேரம்' : 'Note / pickup time (optional)'} />
      <a className="button button-gold cart-send" href={`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`} target="_blank" rel="noreferrer">{ta ? 'WhatsApp-ல் ஆர்டர் அனுப்பு' : 'Send order on WhatsApp'}<span>↗</span></a>
      <button className="cart-clear" onClick={clear}>{ta ? 'அனைத்தையும் நீக்கு' : 'Clear order'}</button>
      <p className="cart-hint">{ta ? 'WhatsApp திறக்கும்; அங்கே “Send” அழுத்தினால் ஆர்டர் எங்களுக்கு வரும்.' : 'This opens WhatsApp with your order filled in. Press Send there to place it.'}</p>
    </aside></div>}
  </>);
}
