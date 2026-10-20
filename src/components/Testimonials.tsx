import { useRef, useEffect, useState } from 'react';
import { TESTIMONIALS, CLINIC_INFO } from '../data/clinicData';

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function GoogleIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map(s => (
        <span key={s} style={{ color: s <= rating ? '#f59e0b' : 'rgba(255,255,255,0.15)', fontSize: '0.9rem' }}>★</span>
      ))}
    </div>
  );
}

function Avatar({ name }: { name: string }) {
  const hue = (name.charCodeAt(0) * 43 + name.charCodeAt(1 < name.length ? 1 : 0) * 17) % 360;
  return (
    <div style={{
      width: 44, height: 44, borderRadius: '50%',
      background: `linear-gradient(135deg, hsl(${hue},65%,50%), hsl(${(hue + 40) % 360},70%,45%))`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'white', fontWeight: 700, fontSize: '1rem', flexShrink: 0,
      boxShadow: `0 4px 12px hsl(${hue},60%,40%,0.35)`,
    }}>
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

export default function Testimonials() {
  const { ref, inView } = useInView();
  const [featured, setFeatured] = useState(0);

  // Auto-rotate featured
  useEffect(() => {
    const t = setInterval(() => setFeatured(f => (f + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  const feat = TESTIMONIALS[featured];

  return (
    <section
      id="testimonials"
      ref={ref as any}
      style={{
        padding: '100px 0',
        background: 'linear-gradient(160deg, #0f172a 0%, #1a2744 50%, #0f172a 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* bg blobs */}
      <div style={{ position: 'absolute', top: -140, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,165,233,0.10) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -100, left: -80, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(56,189,248,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>

        {/* ── Header ── */}
        <div style={{
          textAlign: 'center', marginBottom: 56,
          opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(28px)',
          transition: 'all 0.7s ease',
        }}>
          <div className="section-tag" style={{ background: 'rgba(255,255,255,0.07)', color: 'white', borderColor: 'rgba(255,255,255,0.14)', justifyContent: 'center' }}>
            ⭐ Patient Reviews
          </div>
          <h2 className="section-title" style={{ color: 'white' }}>
            What Our Patients <span>Say</span>
          </h2>
          <div className="divider divider-center" />

          {/* Google rating badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 100, padding: '10px 22px', marginTop: 10,
            backdropFilter: 'blur(12px)',
          }}>
            <GoogleIcon size={20} />
            <div style={{ display: 'flex', gap: 2 }}>
              {[1,2,3,4,5].map(s => <span key={s} style={{ color: '#f59e0b', fontSize: '1.05rem' }}>★</span>)}
            </div>
            <span style={{ color: 'white', fontWeight: 700, fontSize: '1.15rem' }}>{CLINIC_INFO.rating}</span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
              {CLINIC_INFO.reviewCount}+ Google Reviews
            </span>
          </div>
        </div>

        {/* ── Featured Hero Card ── */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(14,165,233,0.12) 0%, rgba(56,189,248,0.06) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(56,189,248,0.25)',
          borderRadius: 28,
          padding: '40px 48px',
          marginBottom: 48,
          position: 'relative',
          overflow: 'hidden',
          opacity: inView ? 1 : 0,
          transform: inView ? 'none' : 'translateY(24px)',
          transition: 'all 0.8s ease 0.15s',
        }}>
          {/* Big quote mark */}
          <div style={{ position: 'absolute', top: 20, right: 36, fontSize: '8rem', color: 'rgba(56,189,248,0.08)', lineHeight: 1, fontFamily: 'Georgia, serif', userSelect: 'none' }}>"</div>

          <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
            {/* Left */}
            <div style={{ flex: 1 }}>
              {/* Google verified badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.13)',
                borderRadius: 8, padding: '5px 12px', marginBottom: 20,
                fontSize: '0.75rem', color: 'rgba(255,255,255,0.65)', fontWeight: 500,
              }}>
                <GoogleIcon size={14} />
                Verified Google Review
              </div>

              <StarRow rating={feat.rating} />

              <p style={{
                color: 'rgba(255,255,255,0.88)', fontSize: '1.08rem',
                lineHeight: 1.85, margin: '16px 0 24px',
                fontStyle: 'italic',
              }}>
                "{feat.text}"
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Avatar name={feat.name} />
                <div>
                  <div style={{ color: 'white', fontWeight: 700, fontSize: '0.95rem' }}>{feat.name}</div>
                  <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem', marginTop: 2 }}>
                    {feat.location} · {feat.treatment} · {feat.date}
                  </div>
                </div>
                {featured === 0 && (
                  <div style={{
                    marginLeft: 'auto',
                    background: 'linear-gradient(135deg, #22c55e, #15803d)',
                    color: 'white', fontSize: '0.65rem', fontWeight: 700,
                    padding: '3px 10px', borderRadius: 100, letterSpacing: '0.06em',
                    flexShrink: 0,
                  }}>LATEST</div>
                )}
              </div>
            </div>

            {/* Right: nav dots + mini stats */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, paddingTop: 4, minWidth: 80 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setFeatured(i)}
                    style={{
                      width: 8,
                      height: featured === i ? 32 : 8,
                      borderRadius: 4,
                      background: featured === i ? '#38bdf8' : 'rgba(255,255,255,0.2)',
                      border: 'none', cursor: 'pointer',
                      transition: 'all 0.35s ease',
                      padding: 0,
                    }}
                  />
                ))}
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#38bdf8', fontWeight: 700, fontSize: '1.1rem' }}>{featured + 1}/{TESTIMONIALS.length}</div>
                <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.65rem', marginTop: 2 }}>reviews</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Latest label ── */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 16,
          marginBottom: 24,
          opacity: inView ? 1 : 0, transition: 'all 0.7s ease 0.3s',
        }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'rgba(255,255,255,0.4)', fontSize: '0.76rem', fontWeight: 600, whiteSpace: 'nowrap' }}>
            <span>🕐</span><span>Latest Reviews First</span>
          </div>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
        </div>

        {/* ── 3-column Review Grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
          marginBottom: 40,
        }}>
          {TESTIMONIALS.map((review, i) => (
            <div
              key={review.id}
              onClick={() => setFeatured(i)}
              style={{
                background: featured === i
                  ? 'rgba(14,165,233,0.13)'
                  : 'rgba(255,255,255,0.04)',
                border: featured === i
                  ? '1.5px solid rgba(56,189,248,0.45)'
                  : '1px solid rgba(255,255,255,0.09)',
                borderRadius: 20,
                padding: '24px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                opacity: inView ? 1 : 0,
                transform: inView ? 'none' : 'translateY(20px)',
                transitionDelay: `${0.35 + i * 0.07}s`,
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={e => {
                if (featured !== i) e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
              }}
              onMouseLeave={e => {
                if (featured !== i) e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
              }}
            >
              {/* Latest badge on first card */}
              {i === 0 && (
                <div style={{
                  position: 'absolute', top: 14, right: 14,
                  background: 'linear-gradient(135deg, #22c55e, #15803d)',
                  color: 'white', fontSize: '0.6rem', fontWeight: 700,
                  padding: '2px 8px', borderRadius: 100, letterSpacing: '0.06em',
                }}>LATEST</div>
              )}

              {/* Top: avatar + name + Google badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Avatar name={review.name} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    color: 'white', fontWeight: 600, fontSize: '0.88rem',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>{review.name}</div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', marginTop: 1 }}>{review.location}</div>
                </div>
                {review.isGoogle && (
                  <div style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 7, padding: '4px 6px',
                    display: 'flex', alignItems: 'center',
                  }}>
                    <GoogleIcon size={14} />
                  </div>
                )}
              </div>

              {/* Stars */}
              <StarRow rating={review.rating} />

              {/* Review text — clamped to 4 lines */}
              <p style={{
                color: 'rgba(255,255,255,0.72)', fontSize: '0.83rem',
                lineHeight: 1.7, margin: 0, flex: 1,
                display: '-webkit-box',
                WebkitLineClamp: 4,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}>
                "{review.text}"
              </p>

              {/* Footer: treatment tag + date */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                <span style={{
                  background: 'rgba(56,189,248,0.12)',
                  color: '#7dd3fc',
                  fontSize: '0.68rem', fontWeight: 600,
                  padding: '3px 9px', borderRadius: 6,
                  whiteSpace: 'nowrap',
                }}>{review.treatment}</span>
                <span style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.68rem' }}>{review.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Write a Review invite card ── */}
        <a
          href={CLINIC_INFO.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
            background: 'rgba(255,255,255,0.04)',
            border: '1.5px dashed rgba(56,189,248,0.25)',
            borderRadius: 20, padding: '22px 32px',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            marginBottom: 44,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(14,165,233,0.10)';
            e.currentTarget.style.borderColor = 'rgba(56,189,248,0.5)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
            e.currentTarget.style.borderColor = 'rgba(56,189,248,0.25)';
          }}
        >
          <GoogleIcon size={22} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: 'white', fontWeight: 600, fontSize: '0.92rem' }}>Visited Pearl Dental? Share your experience!</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', marginTop: 3 }}>Your review will appear on this page · Takes 30 seconds</div>
          </div>
          <div style={{
            background: 'rgba(56,189,248,0.15)', border: '1px solid rgba(56,189,248,0.35)',
            color: '#7dd3fc', borderRadius: 10, padding: '6px 14px',
            fontSize: '0.78rem', fontWeight: 600, whiteSpace: 'nowrap',
          }}>
            Write a Review →
          </div>
        </a>

        {/* ── Bottom CTA ── */}
        <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
          <a href={CLINIC_INFO.mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ fontSize: '0.88rem' }}>
            🗺️ See All {CLINIC_INFO.reviewCount}+ Reviews on Google
          </a>
          <a href={CLINIC_INFO.mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ fontSize: '0.88rem' }}>
            ✍️ Write a Google Review
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          #testimonials .review-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          #testimonials .review-grid { grid-template-columns: 1fr !important; }
          #testimonials .featured-inner { flex-direction: column !important; }
        }
      `}</style>
    </section>
  );
}
