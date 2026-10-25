import { useRef, useEffect, useState } from 'react';

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setInView(true);
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Realistic Molar SVG ──────────────────────────────────────────────────────
// Modelled after a real mandibular molar: cream/ivory body, 4 cusps, deep fissures,
// mesial + distal roots, specular highlights from top-left light source
function RealisticMolarSVG({ scale = 1 }: { scale?: number }) {
  return (
    <svg
      viewBox="0 0 200 260"
      width={200 * scale}
      height={260 * scale}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Main crown gradient — ivory/cream, light from top-left */}
        <radialGradient id="crownGrad" cx="35%" cy="22%" r="72%">
          <stop offset="0%"   stopColor="#ffffff" />
          <stop offset="18%"  stopColor="#f8f3ea" />
          <stop offset="55%"  stopColor="#ede0c8" />
          <stop offset="100%" stopColor="#c8b495" />
        </radialGradient>

        {/* Root gradient — slightly more yellow */}
        <radialGradient id="rootGrad" cx="40%" cy="20%" r="70%">
          <stop offset="0%"   stopColor="#f0e5cb" />
          <stop offset="60%"  stopColor="#d4be98" />
          <stop offset="100%" stopColor="#b89c72" />
        </radialGradient>

        {/* Cusp tip gradient — bright ivory */}
        <radialGradient id="cuspGrad" cx="40%" cy="30%" r="65%">
          <stop offset="0%"   stopColor="#ffffff" />
          <stop offset="50%"  stopColor="#f5edd8" />
          <stop offset="100%" stopColor="#d6c4a0" />
        </radialGradient>

        {/* Fissure/groove shading — warm brown */}
        <linearGradient id="fissureGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b6f47" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#6b5038" stopOpacity="0.4" />
        </linearGradient>

        {/* Right-side shade to give 3D depth */}
        <linearGradient id="sideShade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.18)" />
        </linearGradient>

        {/* Drop shadow blur */}
        <filter id="toothShadow" x="-20%" y="-10%" width="140%" height="130%">
          <feDropShadow dx="4" dy="10" stdDeviation="10" floodColor="rgba(100,80,50,0.35)" />
        </filter>

        {/* Glow effect */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="6" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Soft blur for ambient shadow */}
        <filter id="blurSoft">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {/* ── Ambient ground shadow ── */}
      <ellipse cx="100" cy="254" rx="55" ry="8"
        fill="rgba(80,60,30,0.28)" filter="url(#blurSoft)" />

      {/* ── ROOTS ── */}
      {/* Mesial root (left) */}
      <path
        d="
          M 55 158
          Q 48 168 44 182
          Q 40 198 42 212
          Q 44 224 52 228
          Q 60 232 66 224
          Q 74 212 74 194
          Q 76 174 78 160
        "
        fill="url(#rootGrad)"
        stroke="rgba(150,115,70,0.5)"
        strokeWidth="0.8"
      />
      {/* Mesial root inner depth shadow */}
      <path
        d="M 55 158 Q 50 175 48 195 Q 46 212 52 224"
        fill="none"
        stroke="rgba(100,75,40,0.3)"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Distal root (right) */}
      <path
        d="
          M 145 158
          Q 152 168 156 182
          Q 160 198 158 212
          Q 156 224 148 228
          Q 140 232 134 224
          Q 126 212 126 194
          Q 124 174 122 160
        "
        fill="url(#rootGrad)"
        stroke="rgba(150,115,70,0.5)"
        strokeWidth="0.8"
      />
      {/* Distal root inner shadow */}
      <path
        d="M 145 158 Q 150 175 152 195 Q 154 212 148 224"
        fill="none"
        stroke="rgba(100,75,40,0.3)"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Root bifurcation zone (neck between roots) */}
      <path
        d="M 78 160 Q 88 170 100 170 Q 112 170 122 160 L 126 158 Q 115 152 100 154 Q 85 152 74 158 Z"
        fill="#c8a87a"
        opacity="0.7"
      />

      {/* ── CROWN ── */}
      {/* Main crown body — drop shadow */}
      <path
        filter="url(#toothShadow)"
        d="
          M 28 118
          Q 22 100 24 82
          Q 26 62 32 50
          Q 36 40 42 35
          Q 52 26 58 30
          Q 62 20 72 16
          Q 82 10 88 14
          L 100 10
          L 112 14
          Q 118 10 128 16
          Q 138 22 142 30
          Q 148 26 158 35
          Q 166 44 172 56
          Q 178 70 176 88
          Q 174 104 170 118
          Q 165 136 158 146
          Q 150 155 140 160
          L 60 160
          Q 50 155 42 146
          Q 34 136 28 118 Z
        "
        fill="url(#crownGrad)"
        stroke="rgba(160,125,75,0.4)"
        strokeWidth="1"
      />

      {/* Right-side depth shadow overlay on crown */}
      <path
        d="
          M 28 118 Q 22 100 24 82 Q 26 62 32 50 Q 36 40 42 35
          Q 52 26 58 30 Q 62 20 72 16 Q 82 10 88 14
          L 100 10 L 112 14 Q 118 10 128 16 Q 138 22 142 30
          Q 148 26 158 35 Q 166 44 172 56 Q 178 70 176 88
          Q 174 104 170 118 Q 165 136 158 146 Q 150 155 140 160
          L 60 160 Q 50 155 42 146 Q 34 136 28 118 Z
        "
        fill="url(#sideShade)"
      />

      {/* ── CUSPS (4 bumps on top) ── */}
      {/* Mesiobuccal cusp (top-left) */}
      <ellipse cx="66" cy="34" rx="22" ry="18" fill="url(#cuspGrad)" opacity="0.9" />
      {/* Distobuccal cusp (top-right) */}
      <ellipse cx="134" cy="36" rx="22" ry="18" fill="url(#cuspGrad)" opacity="0.9" />
      {/* Mesiolingual cusp (lower-left) */}
      <ellipse cx="72" cy="80" rx="18" ry="14" fill="url(#cuspGrad)" opacity="0.7" />
      {/* Distolingual cusp (lower-right) */}
      <ellipse cx="128" cy="80" rx="18" ry="14" fill="url(#cuspGrad)" opacity="0.7" />

      {/* ── OCCLUSAL SURFACE (top chewing surface) ── */}
      {/* Central fossa + fissure pattern */}
      {/* Outer occlusal ridge outline */}
      <path
        d="M 50 42 Q 66 24 100 22 Q 134 24 150 42 Q 162 60 160 82 Q 158 104 140 116 Q 120 128 100 128 Q 80 128 60 116 Q 42 104 40 82 Q 38 60 50 42 Z"
        fill="#f0e4cc"
        stroke="rgba(160,130,80,0.3)"
        strokeWidth="0.5"
      />

      {/* Central groove — mesio-distal fissure (horizontal) */}
      <path
        d="M 58 82 Q 70 78 100 76 Q 130 78 142 82"
        fill="none"
        stroke="#9b7b52"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* Buccal groove (vertical top) */}
      <path
        d="M 100 76 Q 100 60 100 44"
        fill="none"
        stroke="#9b7b52"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.55"
      />
      {/* Lingual groove (vertical bottom) */}
      <path
        d="M 100 76 Q 100 92 100 108"
        fill="none"
        stroke="#9b7b52"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.45"
      />
      {/* Mesial triangular fossa */}
      <path
        d="M 58 82 Q 64 68 72 66 Q 76 64 78 74"
        fill="none"
        stroke="#9b7b52"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.4"
      />
      {/* Distal triangular fossa */}
      <path
        d="M 142 82 Q 136 68 128 66 Q 124 64 122 74"
        fill="none"
        stroke="#9b7b52"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.4"
      />

      {/* ── SPECULAR HIGHLIGHTS ── */}
      {/* Main highlight on mesiobuccal cusp */}
      <ellipse cx="56" cy="30" rx="12" ry="9"
        fill="white" opacity="0.55" transform="rotate(-20, 56, 30)" />
      <ellipse cx="52" cy="26" rx="5" ry="4"
        fill="white" opacity="0.75" transform="rotate(-20, 52, 26)" />

      {/* Secondary highlight on distobuccal cusp */}
      <ellipse cx="130" cy="34" rx="8" ry="6"
        fill="white" opacity="0.35" transform="rotate(10, 130, 34)" />

      {/* Cervical region highlight (where crown meets root) */}
      <path
        d="M 52 148 Q 76 144 100 144 Q 124 144 148 148"
        fill="none"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Perikymata — subtle horizontal enamel lines on crown side */}
      {[90, 100, 110, 120, 130, 140].map((y, i) => (
        <path
          key={i}
          d={`M ${32 + i * 1.5} ${y} Q 100 ${y - 1} ${168 - i * 1.5} ${y}`}
          fill="none"
          stroke="rgba(180,150,100,0.12)"
          strokeWidth="0.8"
        />
      ))}
    </svg>
  );
}

// ─── Orbiting mineral particles ───────────────────────────────────────────────
function OrbitParticles() {
  const minerals = [
    { label: 'Ca²⁺', color: '#38bdf8', r: 155, startAngle: 0,   speed: 9 },
    { label: 'F⁻',   color: '#f59e0b', r: 170, startAngle: 72,  speed: 11 },
    { label: 'PO₄',  color: '#10b981', r: 160, startAngle: 144, speed: 8 },
    { label: 'OH⁻',  color: '#a78bfa', r: 175, startAngle: 216, speed: 13 },
    { label: 'Mg²⁺', color: '#fb7185', r: 150, startAngle: 288, speed: 10 },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {minerals.map((m, i) => (
        <div key={i} style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 38, height: 38,
          marginLeft: -19, marginTop: -19,
          animation: `orb${i} ${m.speed}s linear infinite`,
        }}>
          <div style={{
            width: '100%', height: '100%',
            borderRadius: '50%',
            background: `${m.color}18`,
            border: `1.5px solid ${m.color}60`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.6rem', fontWeight: 700, color: m.color,
            boxShadow: `0 0 12px ${m.color}30`,
          }}>
            {m.label}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Dental Facts ─────────────────────────────────────────────────────────────
const DENTAL_FACTS = [
  {
    icon: '🦷', tag: 'Biology', color: '#0ea5e9',
    title: 'Enamel is the Hardest Substance in Your Body',
    body: 'Tooth enamel is harder than bone — made of 96% mineral (hydroxyapatite). Yet acids from bacteria and sugar can dissolve it in as little as 20 seconds of contact.',
  },
  {
    icon: '🦠', tag: 'Oral Microbiome', color: '#10b981',
    title: '700+ Bacterial Species Live in Your Mouth',
    body: 'The oral microbiome hosts over 700 types of bacteria. Some protect your teeth; others produce lactic acid that causes cavities. Brushing 2× daily keeps harmful bacteria in check.',
  },
  {
    icon: '⏰', tag: 'Oral Hygiene', color: '#f59e0b',
    title: 'Brush for 2 Full Minutes, Twice a Day',
    body: 'Most people brush for only 45 seconds. Dentists recommend 2 full minutes — 30 seconds per quadrant. Electric toothbrushes remove up to 21% more plaque than manual ones.',
  },
  {
    icon: '💧', tag: 'Body Science', color: '#38bdf8',
    title: 'Saliva: Your Mouth\'s Natural Shield',
    body: 'You produce 1–1.5 litres of saliva daily. It neutralises acids, remineralises enamel, and contains antibacterial proteins. Dry mouth dramatically increases cavity risk.',
  },
  {
    icon: '🇮🇳', tag: 'India Stats', color: '#f97316',
    title: 'India\'s Oral Health Crisis',
    body: 'Over 95% of Indians suffer from gum disease at some point. Only 2 in 10 visit a dentist annually. In Assam, Pearl Dental Clinic bridges this critical care gap.',
  },
  {
    icon: '❤️', tag: 'Systemic Health', color: '#fb7185',
    title: 'Gum Disease Affects Your Heart',
    body: 'Periodontitis increases the risk of heart disease by up to 3×. Bacteria from infected gums enter the bloodstream, triggering arterial inflammation. Healthy gums = healthier heart.',
  },
  {
    icon: '🍬', tag: 'Nutrition', color: '#a78bfa',
    title: 'Sugar Feeds Bacteria — Not Teeth',
    body: 'It\'s not sugar itself that damages teeth — it\'s the acid produced by Streptococcus mutans bacteria. The acid attack lasts 20–30 minutes after every sugary snack.',
  },
  {
    icon: '😴', tag: 'Health Link', color: '#67e8f9',
    title: 'Sleep & Teeth Are Connected',
    body: 'Sleep apnea patients are 3× more likely to grind their teeth (bruxism). Grinding wears enamel 10× faster than chewing. A custom night guard from Pearl Dental can save your smile.',
  },
];

const INDIA_STATS = [
  { value: '95%', label: 'Indians have some form of gum disease',         icon: '🦷', color: '#ef4444' },
  { value: '50%', label: 'Children in NE India have dental caries',       icon: '👶', color: '#f97316' },
  { value: '20yr',label: 'Average age of first tooth loss in India',      icon: '📉', color: '#8b5cf6' },
  { value: '2×/day', label: 'WHO recommended brushing frequency',         icon: '✅', color: '#10b981' },
];

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function DentalHealth3D() {
  const { ref, inView } = useInView();
  const [activeFact, setActiveFact] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const t = setInterval(() => setActiveFact(f => (f + 1) % DENTAL_FACTS.length), 4500);
    return () => clearInterval(t);
  }, [isAutoPlaying]);

  const fact = DENTAL_FACTS[activeFact];

  return (
    <section
      id="dental-health"
      ref={ref as any}
      style={{
        padding: '110px 0',
        background: 'linear-gradient(160deg, #0f172a 0%, #0c1a2e 45%, #0f2240 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* CSS keyframes */}
      <style>{`
        @keyframes toothFloat {
          0%, 100% { transform: translateY(0px)  rotateY(-12deg) rotateX(4deg); }
          50%       { transform: translateY(-18px) rotateY(12deg)  rotateX(-4deg); }
        }
        @keyframes toothFloatFast {
          0%, 100% { transform: translateY(0px)  rotateY(-20deg) rotateX(6deg); }
          50%       { transform: translateY(-14px) rotateY(20deg)  rotateX(-6deg); }
        }
        @keyframes toothGlow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%       { opacity: 0.9; transform: scale(1.12); }
        }
        @keyframes orb0 { from{transform:rotate(0deg)   translateX(155px) rotate(0deg)}   to{transform:rotate(360deg)  translateX(155px) rotate(-360deg)} }
        @keyframes orb1 { from{transform:rotate(72deg)  translateX(170px) rotate(-72deg)}  to{transform:rotate(432deg)  translateX(170px) rotate(-432deg)} }
        @keyframes orb2 { from{transform:rotate(144deg) translateX(160px) rotate(-144deg)} to{transform:rotate(504deg)  translateX(160px) rotate(-504deg)} }
        @keyframes orb3 { from{transform:rotate(216deg) translateX(175px) rotate(-216deg)} to{transform:rotate(576deg)  translateX(175px) rotate(-576deg)} }
        @keyframes orb4 { from{transform:rotate(288deg) translateX(150px) rotate(-288deg)} to{transform:rotate(648deg)  translateX(150px) rotate(-648deg)} }
        @keyframes factIn {
          from { opacity: 0; transform: translateX(18px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes ringPulse {
          0%   { transform: scale(0.85); opacity: 0.4; }
          100% { transform: scale(1.9);  opacity: 0;   }
        }
        .fact-in { animation: factIn 0.45s ease forwards; }
        .ring-anim {
          position: absolute; border-radius: 50%;
          border: 1px solid rgba(56,189,248,0.12);
          animation: ringPulse 4.5s ease-in-out infinite;
        }
      `}</style>

      {/* Pulsing rings */}
      {[220, 380, 520].map((s, i) => (
        <div key={i} className="ring-anim" style={{
          width: s, height: s,
          top: `calc(50% - ${s / 2}px)`,
          left: `calc(50% - ${s / 2}px)`,
          animationDelay: `${i * 1.4}s`,
        }} />
      ))}

      {/* Background blobs */}
      <div style={{ position: 'absolute', top: -120, right: -80, width: 450, height: 450, borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -80, left: -60, width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>

        {/* ── Header ── */}
        <div style={{
          textAlign: 'center', marginBottom: 72,
          opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(28px)',
          transition: 'all 0.7s ease',
        }}>
          <div className="section-tag" style={{ background: 'rgba(255,255,255,0.07)', color: '#7dd3fc', borderColor: 'rgba(56,189,248,0.25)', justifyContent: 'center' }}>
            🦷 Dental Science
          </div>
          <h2 className="section-title" style={{ color: 'white' }}>
            Know Your <span>Teeth</span>
          </h2>
          <div className="divider divider-center" />
          <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.58)', margin: '0 auto', textAlign: 'center' }}>
            Your teeth are more complex than you think. Understanding dental science helps you protect your smile for life.
          </p>
        </div>

        {/* ── 2-column: Tooth | Facts ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 64,
          alignItems: 'center',
          marginBottom: 80,
        }}>
          {/* LEFT — 3D Tooth scene */}
          <div style={{
            opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(-40px)',
            transition: 'all 0.9s ease 0.1s',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28,
          }}>
            <div
              style={{
                position: 'relative',
                width: 380, height: 380,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              {/* Orbit tracks */}
              {[145, 168, 185].map((r, i) => (
                <div key={i} style={{
                  position: 'absolute',
                  width: r * 2, height: r * 2, borderRadius: '50%',
                  border: `1px dashed rgba(56,189,248,${0.07 - i * 0.02})`,
                  top: `calc(50% - ${r}px)`, left: `calc(50% - ${r}px)`,
                  pointerEvents: 'none',
                }} />
              ))}

              {/* Glow halo behind tooth */}
              <div style={{
                position: 'absolute',
                width: 240, height: 240, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(248,243,234,0.14) 0%, transparent 70%)',
                animation: 'toothGlow 3.5s ease-in-out infinite',
                pointerEvents: 'none',
              }} />

              {/* Orbiting minerals */}
              <OrbitParticles />

              {/* THE TOOTH — 3D animated */}
              <div
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                  position: 'relative', zIndex: 2,
                  animation: hovered ? 'toothFloatFast 1.8s ease-in-out infinite' : 'toothFloat 5s ease-in-out infinite',
                  transformStyle: 'preserve-3d',
                  perspective: 800,
                  cursor: 'pointer',
                  filter: 'drop-shadow(0 20px 40px rgba(80,60,30,0.5))',
                  transition: 'filter 0.3s',
                }}
                title="Hover to interact"
              >
                <RealisticMolarSVG scale={1.3} />
              </div>
            </div>

            {/* Caption panel */}
            <div style={{
              background: 'rgba(255,255,255,0.045)',
              border: '1px solid rgba(56,189,248,0.14)',
              borderRadius: 16, padding: '13px 24px',
              textAlign: 'center',
            }}>
              <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.72rem', marginBottom: 5 }}>
                Minerals orbiting your molar enamel
              </div>
              <div style={{ color: '#7dd3fc', fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.08em' }}>
                Ca²⁺ · F⁻ · PO₄³⁻ · OH⁻ · Mg²⁺
              </div>
              <div style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.68rem', marginTop: 5 }}>
                Hover over the molar to animate
              </div>
            </div>
          </div>

          {/* RIGHT — Fact carousel */}
          <div style={{
            opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(40px)',
            transition: 'all 0.9s ease 0.2s',
          }}>
            {/* Fact card */}
            <div
              key={activeFact}
              className="fact-in"
              style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(20px)',
                border: `1px solid ${fact.color}30`,
                borderLeft: `4px solid ${fact.color}`,
                borderRadius: '0 20px 20px 0',
                padding: '32px 36px',
                marginBottom: 28,
                minHeight: 210,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute', top: -24, right: -24,
                width: 130, height: 130, borderRadius: '50%',
                background: `radial-gradient(circle, ${fact.color}14, transparent 70%)`,
                pointerEvents: 'none',
              }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <span style={{ fontSize: '2rem' }}>{fact.icon}</span>
                <div>
                  <div style={{
                    display: 'inline-block',
                    background: `${fact.color}1e`,
                    color: fact.color, fontSize: '0.66rem', fontWeight: 700,
                    letterSpacing: '0.09em', textTransform: 'uppercase',
                    padding: '2px 10px', borderRadius: 100, marginBottom: 5,
                  }}>{fact.tag}</div>
                  <h3 style={{
                    color: 'white', fontSize: '1.05rem', fontWeight: 700,
                    lineHeight: 1.3, margin: 0,
                    fontFamily: "'Playfair Display', serif",
                  }}>{fact.title}</h3>
                </div>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.9rem', lineHeight: 1.8, margin: 0 }}>
                {fact.body}
              </p>
            </div>

            {/* Tag pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
              {DENTAL_FACTS.map((f, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveFact(i); setIsAutoPlaying(false); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 5,
                    background: activeFact === i ? `${f.color}20` : 'rgba(255,255,255,0.06)',
                    border: activeFact === i ? `1px solid ${f.color}55` : '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 100, padding: '5px 12px',
                    cursor: 'pointer', fontSize: '0.73rem',
                    color: activeFact === i ? f.color : 'rgba(255,255,255,0.45)',
                    fontWeight: activeFact === i ? 600 : 400,
                    transition: 'all 0.2s',
                  }}
                >
                  <span>{f.icon}</span><span>{f.tag}</span>
                </button>
              ))}
            </div>

            {/* Progress + controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ flex: 1, height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${((activeFact + 1) / DENTAL_FACTS.length) * 100}%`,
                  background: fact.color, borderRadius: 2, transition: 'width 0.4s ease',
                }} />
              </div>
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.73rem', whiteSpace: 'nowrap' }}>
                {activeFact + 1} / {DENTAL_FACTS.length}
              </span>
              <button
                onClick={() => setIsAutoPlaying(p => !p)}
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.13)',
                  borderRadius: 8, padding: '4px 10px',
                  color: 'rgba(255,255,255,0.55)',
                  fontSize: '0.69rem', cursor: 'pointer',
                }}
              >
                {isAutoPlaying ? '⏸ Pause' : '▶ Play'}
              </button>
            </div>
          </div>
        </div>

        {/* ── India Stats Row ── */}
        <div style={{
          opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(30px)',
          transition: 'all 0.9s ease 0.4s',
        }}>
          <div style={{
            textAlign: 'center', marginBottom: 28,
            color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem',
            letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600,
          }}>
            🇮🇳 Oral Health in India — Why Regular Dental Visits Matter
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {INDIA_STATS.map((s, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.04)',
                border: `1px solid ${s.color}22`,
                borderRadius: 20, padding: '26px 20px', textAlign: 'center',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = `${s.color}10`;
                e.currentTarget.style.borderColor = `${s.color}45`;
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                e.currentTarget.style.borderColor = `${s.color}22`;
                e.currentTarget.style.transform = 'none';
              }}>
                <div style={{ fontSize: '1.8rem', marginBottom: 8 }}>{s.icon}</div>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: s.color, fontFamily: "'Playfair Display', serif", lineHeight: 1, marginBottom: 10 }}>{s.value}</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem', lineHeight: 1.5 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Daily Tips ── */}
        <div style={{
          marginTop: 52, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12,
          opacity: inView ? 1 : 0, transition: 'all 0.9s ease 0.6s',
        }}>
          {[
            { emoji: '🪥', tip: 'Brush 2 minutes, twice daily with fluoride toothpaste' },
            { emoji: '🧵', tip: 'Floss daily — brushing only cleans 60% of tooth surfaces' },
            { emoji: '💧', tip: 'Rinse with water after every meal to neutralise acids' },
            { emoji: '📅', tip: 'Visit Pearl Dental every 6 months for a professional clean' },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              background: 'rgba(255,255,255,0.035)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 14, padding: '14px 18px',
            }}>
              <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{item.emoji}</span>
              <span style={{ color: 'rgba(255,255,255,0.62)', fontSize: '0.82rem', lineHeight: 1.5 }}>{item.tip}</span>
            </div>
          ))}
        </div>

        {/* ── CTA ── */}
        <div style={{ textAlign: 'center', marginTop: 56 }}>
          <p style={{ color: 'rgba(255,255,255,0.45)', marginBottom: 20, fontSize: '0.95rem' }}>
            Prevention is always better (and cheaper) than treatment.
          </p>
          <button
            onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn btn-primary"
            style={{ fontSize: '1rem', padding: '14px 40px' }}
          >
            📅 Book a Free Dental Check-up
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #dental-health .container > div:nth-child(3) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
