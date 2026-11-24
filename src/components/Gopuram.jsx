// Original SVG illustration inspired by a South Indian rajagopuram (placeholder – swap for a licensed photo, see README).
export default function Gopuram({ className = '' }) {
  const tiers = [0,1,2,3,4,5,6,7];
  return (
    <svg className={className} viewBox="0 0 400 520" role="img" aria-label="Illustration inspired by the Andal Temple Rajagopuram" preserveAspectRatio="xMidYMax meet">
      <defs>
        <linearGradient id="gb" x1="0" x2="1"><stop offset="0" stopColor="#1c2a1f"/><stop offset=".5" stopColor="#4a6a4e"/><stop offset="1" stopColor="#1c2a1f"/></linearGradient>
        <linearGradient id="gg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#e6c98a"/><stop offset="1" stopColor="#a98543"/></linearGradient>
        <radialGradient id="gl"><stop offset="0" stopColor="#ffe3a3"/><stop offset="1" stopColor="#e9a94f"/></radialGradient>
      </defs>
      <g stroke="#B99A62" strokeWidth="1">
        <path d="M199 6h2v26h-2z" fill="url(#gg)"/>
        {[0,1,2].map(k => <ellipse key={k} cx={200+(k-1)*13} cy={k===1?30:38} rx="5" ry="8" fill="url(#gg)"/>)}
        <path d="M184 46h32l-6 14h-20z" fill="url(#gg)"/>
        {tiers.map((i) => {
          const w = 66 + i * 34, y = 62 + i * 46, h = 46, x = 200 - w / 2, n = 2 + i, gap = (w - 44) / (n - 1);
          return (<g key={i}>
            <path d={`M${x} ${y + h}L${x + 7} ${y}H${x + w - 7}L${x + w} ${y + h}Z`} fill="url(#gb)"/>
            <rect x={x - 6} y={y + h - 9} width={w + 12} height="9" fill="url(#gg)" stroke="none"/>
            <rect x={x - 3} y={y} width={w + 6} height="4" fill="url(#gg)" stroke="none"/>
            {Array.from({ length: n }, (_, j) => { const cx = x + 22 + j * gap; return (<g key={j}>
              <path d={`M${cx - 4} ${y + 31}V${y + 17}a4 4 0 0 1 8 0V${y + 31}z`} fill="url(#gl)" stroke="none"/>
              <rect x={cx - 7} y={y + 12} width="14" height="22" fill="none" strokeOpacity=".5"/></g>); })}
            {[x - 4, x + w + 4].map((cx, k) => <ellipse key={k} cx={cx} cy={y + h - 14} rx="3" ry="6" fill="url(#gg)" stroke="none"/>)}
          </g>);
        })}
        <rect x="30" y="430" width="340" height="90" fill="#1c2a1f"/>
        <rect x="24" y="426" width="352" height="8" fill="url(#gg)" stroke="none"/>
        {[60,100,300,340].map(px => <rect key={px} x={px-6} y="440" width="12" height="80" fill="#2a3e2e"/>)}
        <path d="M168 520V472q32-46 64 0v48z" fill="url(#gl)"/>
        <path d="M168 520V472q32-46 64 0" fill="none" strokeWidth="2"/>
      </g>
    </svg>
  );
}
