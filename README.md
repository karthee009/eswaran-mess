# Eswaran Idly Kadai — React + Vite

## Correct project root
Open this folder (`eswaran-mess`) in VS Code — **do not open only the `src` folder**.

The root folder must contain `index.html`, `package.json`, `vite.config.js`, and `src/`.

## Run locally
1. Install Node.js (LTS) if it is not already installed.
2. Open a terminal in this folder.
3. Run `npm install`.
4. Run `npm run dev` and open the local URL printed by Vite.

## Production build check
Run `npm run build`. The generated website is written to `dist/`.

## Run
`npm install` then `npm run dev` (build: `npm run build`).

## What's where
- `src/App.jsx` — all content, menu data (breakfast/lunch/night/eggs), phone + Google Maps links at the top.
- `src/components/Cart.jsx` — order cart; builds the WhatsApp message.
- `src/components/ScrollUI.jsx` — scroll progress bar + side dots.
- `src/hooks/useScrollFX.js` — GSAP scroll animations (cinematic hero zoom, heading wipes, image parallax, count-up, pinned horizontal story on desktop, ticker response).
- `src/styles/Polish.css` — scroll UI, readable font sizes, sticky fixes and existing premium interactions.
- `src/styles/ImmersiveExperience.css` — new horizontal food-story chapter, green/cream/gold styling, mobile swipe layout and reduced-motion support.

## Immersive scroll upgrade
- Desktop: the new “Eswaran Experience” chapter pins while its three story panels move horizontally with scroll.
- Mobile/tablet: the chapter becomes a native horizontal swipe gallery so vertical scrolling is not hijacked.
- Existing Tamil/English toggle, meal-time filters, menu search, branch maps, phone link and WhatsApp number are preserved.
- The WhatsApp enquiry link uses `+91 78100 61172`.
