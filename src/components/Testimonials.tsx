import { useRef, useEffect, useState } from 'react';
import { TESTIMONIALS, CLINIC_INFO } from '../data/clinicData';

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
        <span key={s} style={{ color: s <= rating ? '#f59e0b' : 'rgba(255,255,255,0.15)', fontSize: '0.95rem' }}>★</span>
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
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotate featured carousel
  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(() => setFeatured(f => (f + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, [isPaused]);

  const feat = TESTIMONIALS[featured];

  const handlePrev = () => {
    setFeatured(f => (f - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setFeatured(f => (f + 1) % TESTIMONIALS.length);
  };

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
      {/* Background radial glow */}
      <div style={{ position: 'absolute', top: -140, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -100, left: -80, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <div style={{
          textAlign: 'center', marginBottom: 50,
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
            borderRadius: 100, padding: '8px 20px', marginTop: 10,
            backdropFilter: 'blur(12px)',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            <GoogleIcon size={20} />
            <div style={{ display: 'flex', gap: 2 }}>
              {[1, 2, 3, 4, 5].map(s => <span key={s} style={{ color: '#f59e0b', fontSize: '1.05rem' }}>★</span>)}
            </div>
            <span style={{ color: 'white', fontWeight: 700, fontSize: '1.15rem' }}>{CLINIC_INFO.rating}</span>
            <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.82rem' }}>
              {CLINIC_INFO.reviewCount}+ Google Reviews
            </span>
          </div>
        </div>

        {/* ── Featured Hero Card (Carousel) ── */}
        <div
          className="featured-card"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          style={{
            background: 'linear-gradient(135deg, rgba(14,165,233,0.14) 0%, rgba(56,189,248,0.06) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(56,189,248,0.28)',
            borderRadius: 24,
            marginBottom: 44,
            position: 'relative',
            overflow: 'hidden',
            opacity: inView ? 1 : 0,
            transform: inView ? 'none' : 'translateY(24px)',
            transition: 'all 0.8s ease 0.15s',
          }}
        >
          {/* Decorative quote mark */}
          <div
            style={{
              position: 'absolute', top: 10, right: 24,
              fontSize: 'clamp(5rem, 10vw, 8rem)',
              color: 'rgba(56,189,248,0.06)',
              lineHeight: 1, fontFamily: 'Georgia, serif',
              userSelect: 'none', pointerEvents: 'none',
            }}
          >
            "
          </div>

          <div className="featured-inner" style={{ position: 'relative', zIndex: 1, display: 'flex', gap: 28, alignItems: 'flex-start' }}>
            {/* Review Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)',
                  borderRadius: 8, padding: '4px 10px',
                  fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)', fontWeight: 500,
                }}>
                  <GoogleIcon size={14} />
                  Verified Google Review
                </div>

                <span style={{
                  background: 'rgba(56,189,248,0.15)',
                  color: '#7dd3fc',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  padding: '4px 10px',
                  borderRadius: 6,
                }}>
                  {feat.treatment}
                </span>

                {featured === 0 && (
                  <span style={{
                    background: 'linear-gradient(135deg, #22c55e, #15803d)',
                    color: 'white', fontSize: '0.65rem', fontWeight: 700,
                    padding: '3px 9px', borderRadius: 100, letterSpacing: '0.06em',
                  }}>
                    LATEST
                  </span>
                )}
              </div>

              <StarRow rating={feat.rating} />

              <p style={{
                color: 'rgba(255,255,255,0.92)',
                fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                lineHeight: 1.8,
                margin: '16px 0 20px',
                fontStyle: 'italic',
              }}>
                "{feat.text}"
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <Avatar name={feat.name} />
                <div>
                  <div style={{ color: 'white', fontWeight: 700, fontSize: '0.98rem' }}>{feat.name}</div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', marginTop: 2 }}>
                    {feat.location} · {feat.date}
                  </div>
                </div>
              </div>
            </div>

            {/* Carousel Navigation Column */}
            <div className="carousel-nav-col" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, minWidth: 90 }}>
              {/* Prev / Next Arrow Buttons */}
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={handlePrev}
                  aria-label="Previous review"
                  style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                    color: 'white', fontSize: '1.1rem', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(56,189,248,0.3)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                >
                  ‹
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next review"
                  style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                    color: 'white', fontSize: '1.1rem', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(56,189,248,0.3)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                >
                  ›
                </button>
              </div>

              {/* Indicator Dots */}
              <div className="carousel-dots" style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setFeatured(i)}
                    aria-label={`Go to review ${i + 1}`}
                    style={{
                      width: featured === i ? 24 : 8,
                      height: 8,
                      borderRadius: 4,
                      background: featured === i ? '#38bdf8' : 'rgba(255,255,255,0.25)',
                      border: 'none', cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      padding: 0,
                    }}
                  />
                ))}
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#38bdf8', fontWeight: 700, fontSize: '0.95rem' }}>
                  {featured + 1} / {TESTIMONIALS.length}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.68rem' }}>reviews</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Subtitle Divider ── */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 16,
          marginBottom: 24,
          opacity: inView ? 1 : 0, transition: 'all 0.7s ease 0.3s',
        }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', fontWeight: 600 }}>
            <span>🕐</span><span>All Patient Reviews</span>
          </div>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
        </div>

        {/* ── 3-column Responsive Review Grid ── */}
        <div
          className="review-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20,
            marginBottom: 36,
          }}
        >
          {TESTIMONIALS.map((review, i) => (
            <div
              key={review.id}
              onClick={() => {
                setFeatured(i);
                document.querySelector('.featured-card')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
              }}
              style={{
                background: featured === i
                  ? 'rgba(14,165,233,0.15)'
                  : 'rgba(255,255,255,0.04)',
                border: featured === i
                  ? '1.5px solid rgba(56,189,248,0.5)'
                  : '1px solid rgba(255,255,255,0.09)',
                borderRadius: 20,
                padding: '24px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                opacity: inView ? 1 : 0,
                transform: inView ? 'none' : 'translateY(20px)',
                transitionDelay: `${0.2 + i * 0.05}s`,
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
              {/* Top row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Avatar name={review.name} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    color: 'white', fontWeight: 600, fontSize: '0.9rem',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>
                    {review.name}
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.72rem', marginTop: 1 }}>
                    {review.location}
                  </div>
                </div>

                <div style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 6, padding: '3px 6px',
                  display: 'flex', alignItems: 'center',
                }}>
                  <GoogleIcon size={14} />
                </div>
              </div>

              {/* Stars */}
              <StarRow rating={review.rating} />

              {/* Review text */}
              <p style={{
                color: 'rgba(255,255,255,0.78)', fontSize: '0.85rem',
                lineHeight: 1.7, margin: 0, flex: 1,
                display: '-webkit-box',
                WebkitLineClamp: 4,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}>
                "{review.text}"
              </p>

              {/* Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: 8 }}>
                <span style={{
                  background: 'rgba(56,189,248,0.12)',
                  color: '#7dd3fc',
                  fontSize: '0.7rem', fontWeight: 600,
                  padding: '3px 8px', borderRadius: 6,
                }}>
                  {review.treatment}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.7rem' }}>
                  {review.date}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Write a Review Invite Card ── */}
        <a
          href={CLINIC_INFO.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="write-review-card"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
            background: 'rgba(255,255,255,0.04)',
            border: '1.5px dashed rgba(56,189,248,0.3)',
            borderRadius: 20, padding: '22px 28px',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            marginBottom: 36,
            flexWrap: 'wrap',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(14,165,233,0.12)';
            e.currentTarget.style.borderColor = 'rgba(56,189,248,0.6)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
            e.currentTarget.style.borderColor = 'rgba(56,189,248,0.3)';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <GoogleIcon size={26} />
            <div>
              <div style={{ color: 'white', fontWeight: 600, fontSize: '0.95rem' }}>
                Visited Pearl Dental? Share your experience!
              </div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', marginTop: 2 }}>
                Your review helps other patients in Guwahati find trusted dental care.
              </div>
            </div>
          </div>

          <div
            className="write-review-btn"
            style={{
              background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
              color: 'white', borderRadius: 10, padding: '8px 18px',
              fontSize: '0.82rem', fontWeight: 600, whiteSpace: 'nowrap',
              boxShadow: '0 4px 15px rgba(14,165,233,0.3)',
            }}
          >
            Write a Review →
          </div>
        </a>

        {/* ── Bottom CTA ── */}
        <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
          <a
            href={CLINIC_INFO.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost test-btn"
            style={{ fontSize: '0.88rem' }}
          >
            🗺️ See All {CLINIC_INFO.reviewCount}+ Reviews on Google
          </a>
          <a
            href={CLINIC_INFO.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary test-btn"
            style={{ fontSize: '0.88rem' }}
          >
            ✍️ Write a Google Review
          </a>
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        .featured-card {
          padding: 40px 48px;
        }

        @media (max-width: 1024px) {
          .review-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
          }
          .featured-card {
            padding: 32px !important;
          }
        }

        @media (max-width: 768px) {
          .featured-inner {
            flex-direction: column !important;
            gap: 20px !important;
          }
          .carousel-nav-col {
            flex-direction: row !important;
            justify-content: space-between !important;
            width: 100% !important;
            border-top: 1px solid rgba(255,255,255,0.1);
            padding-top: 14px;
          }
          .featured-card {
            padding: 24px 18px !important;
            border-radius: 20px !important;
          }
          .write-review-card {
            flex-direction: column !important;
            align-items: flex-start !important;
            padding: 20px 18px !important;
          }
          .write-review-btn {
            width: 100% !important;
            text-align: center !important;
          }
          #testimonials {
            padding: 70px 0 !important;
          }
        }

        @media (max-width: 640px) {
          .review-grid {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
          .test-btn {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
}
