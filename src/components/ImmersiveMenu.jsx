import { useEffect, useMemo, useState } from 'react';

const categories = [
  { id: 'idli', en: 'Idli & Tiffin', ta: 'இட்லி & டிபன்', note: 'Soft, warm, made fresh' },
  { id: 'dosa', en: 'Dosa Varieties', ta: 'தோசை வகைகள்', note: 'Crisp edges, golden roast' },
  { id: 'vadai', en: 'Vadai & Sides', ta: 'வடை & துணை உணவுகள்', note: 'Little bites, big flavour' },
  { id: 'meals', en: 'Traditional Meals', ta: 'பாரம்பரிய சாப்பாடு', note: 'A full leaf of comfort' },
  { id: 'night', en: 'Night Specials', ta: 'இரவு சிறப்புகள்', note: 'Evening favourites' },
  { id: 'egg', en: 'Egg Specials', ta: 'முட்டை வகைகள்', note: 'Fresh from the tawa' },
];

function getCategory(item) {
  const name = `${item.en} ${item.ta} ${item.kind || ''}`.toLowerCase();
  if (/meal|சாப்பாடு/.test(name)) return 'meals';
  if (/egg|omelette|half boil|முட்டை|ஆம்லேட்|ஆப்பாயில்/.test(name)) return 'egg';
  if (/vadai|வடை/.test(name)) return 'vadai';
  if (/dosai|dosa|roast|uthappam|oothappam|ஊத்தாப்பம்|தோசை|ரோஸ்ட்/.test(name)) return 'dosa';
  if (/idly|idli|pongal|poori|chapathi|idiyappam|இட்லி|பொங்கல்|பூரி|சப்பாத்தி|இடியாப்பம்/.test(name)) return 'idli';
  return 'night';
}

export default function ImmersiveMenu({ open, onClose, lang, breakfast, lunch, night, eggs }) {
  const [activeCategory, setActiveCategory] = useState('idli');
  const [activeDish, setActiveDish] = useState(null);
  const isTa = lang === 'ta';
  const allItems = useMemo(() => [...breakfast, ...lunch, ...night, ...eggs].filter((item, index, arr) => arr.findIndex(other => other.en === item.en) === index), [breakfast, lunch, night, eggs]);
  const categoryItems = useMemo(() => activeCategory === 'night' ? night : activeCategory === 'egg' ? eggs : allItems.filter(item => getCategory(item) === activeCategory), [allItems, activeCategory, night, eggs]);
  const chosenDish = categoryItems.find(item => item.en === activeDish) || categoryItems[0] || allItems[0];

  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = event => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = previous; window.removeEventListener('keydown', onKey); };
  }, [open, onClose]);

  useEffect(() => { setActiveDish(null); }, [activeCategory]);
  if (!open) return null;

  return (
    <div className="feast-overlay" role="dialog" aria-modal="true" aria-label={isTa ? 'உணவு பட்டியல்' : 'Explore the menu'}>
      <div className="feast-grain" aria-hidden="true" />
      <header className="feast-topbar">
        <a className="feast-brand" href="#home" onClick={onClose}><span className="feast-seal">ஈ</span><span><b>ESWARAN</b><small>IDLY KADAI · SRIVILLIPUTHUR</small></span></a>
        <div className="feast-top-label"><span className="feast-live-dot" /> {isTa ? 'பாரம்பரிய சுவை · 23 ஆண்டுகள்' : 'TRADITIONAL TASTE · 23 YEARS'}</div>
        <button className="feast-close" onClick={onClose} aria-label={isTa ? 'மூடு' : 'Close menu'}><span>{isTa ? 'மூடு' : 'CLOSE'}</span><b>×</b></button>
      </header>

      <div className="feast-layout">
        <aside className="feast-categories" aria-label="Menu categories">
          <p className="feast-kicker">{isTa ? 'உணவு வகைகள்' : 'THE MENU'}</p>
          <h2>{isTa ? 'எதைச் சுவைக்கலாம்?' : 'What are you craving?'}</h2>
          <div className="feast-category-list">
            {categories.map((category, index) => (
              <button key={category.id} className={`feast-category ${activeCategory === category.id ? 'active' : ''}`} onClick={() => setActiveCategory(category.id)} aria-pressed={activeCategory === category.id}>
                <span className="feast-category-number">0{index + 1}</span><span className="feast-category-name">{isTa ? category.ta : category.en}<small>{isTa ? category.en : category.note}</small></span><span className="feast-category-arrow">↗</span>
              </button>
            ))}
          </div>
          <div className="feast-footnote"><span>✳</span>{isTa ? 'புதிதாகத் தயாரித்து அன்புடன் பரிமாறுகிறோம்' : 'Freshly made. Lovingly served.'}</div>
        </aside>

        <section className="feast-stage" aria-label="Featured dish">
          <div className="feast-stage-heading"><span>{isTa ? 'இன்றைய பாரம்பரிய விருந்து' : 'A TRADITIONAL FEAST'}</span><span>EST. 2003</span></div>
          <div className={`feast-plate feast-plate-${activeCategory}`}>
            <div className="feast-leaf"><div className="feast-leaf-vein" /><div className="feast-leaf-ribs" /></div>
            <div className="feast-food-photo" key={chosenDish?.en} />
            <div className="feast-plate-rim" />
            <span className="feast-orbit orbit-one" /><span className="feast-orbit orbit-two" />
          </div>
          <div className="feast-stage-caption"><span className="feast-caption-line" /><div><small>{isTa ? 'பரிந்துரைக்கப்படும் உணவு' : 'FEATURED FROM THIS CATEGORY'}</small><h3>{chosenDish ? (isTa ? chosenDish.ta : chosenDish.en) : (isTa ? 'பாரம்பரிய விருந்து' : 'Traditional Feast')}</h3><p>{chosenDish ? (isTa ? chosenDish.en : chosenDish.ta) : 'Made fresh, served with love'}</p></div><strong>{chosenDish ? `₹${chosenDish.price}` : ''}</strong></div>
          <div className="feast-stage-bottom"><span>01 — {isTa ? 'பாரம்பரியம்' : 'ROOTED IN TRADITION'}</span><span>DRAG YOUR EYES, FOLLOW YOUR CRAVING <i>✳</i></span></div>
        </section>

        <aside className="feast-dishes">
          <div className="feast-dishes-head"><p className="feast-kicker">{isTa ? 'தேர்ந்தெடுங்கள்' : 'PICK YOUR PLATE'}</p><span>{String(categoryItems.length).padStart(2, '0')} {isTa ? 'வகைகள்' : 'DISHES'}</span></div>
          <h2>{categories.find(c => c.id === activeCategory)?.[isTa ? 'ta' : 'en']}</h2>
          <p className="feast-dishes-intro">{categories.find(c => c.id === activeCategory)?.note}</p>
          <div className="feast-dish-list">
            {categoryItems.map((item, index) => (
              <button key={item.en} className={`feast-dish-option ${chosenDish?.en === item.en ? 'active' : ''}`} onClick={() => setActiveDish(item.en)} aria-pressed={chosenDish?.en === item.en}>
                <span className="feast-dish-index">{String(index + 1).padStart(2, '0')}</span><span className="feast-dish-title">{isTa ? item.ta : item.en}<small>{isTa ? item.en : item.ta}</small></span><strong>₹{item.price}</strong><span className="feast-dish-arrow">↗</span>
              </button>
            ))}
            {!categoryItems.length && <p className="feast-empty">{isTa ? 'இந்த வகையில் உணவு இல்லை.' : 'More dishes coming to this category soon.'}</p>}
          </div>
          <a className="feast-order-link" href={`https://wa.me/917810061172?text=${encodeURIComponent(`Vanakkam Eswaran Idly Kadai! I would like to enquire about ${chosenDish?.en || 'your menu'}.`)}`} target="_blank" rel="noreferrer"><span>{isTa ? 'இந்த உணவைப் பற்றி விசாரிக்கவும்' : 'Enquire about this dish'}</span><b>↗</b></a>
        </aside>
      </div>
      <div className="feast-bottom-mobile"><span>ESWARAN IDLY KADAI</span><span>✳ MADE WITH TRADITION</span></div>
    </div>
  );
}
