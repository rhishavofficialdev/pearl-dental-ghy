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

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {[1, 2, 3, 4, 5].map(s => (
        <span key={s} style={{ color: s <= rating ? '#f59e0b' : '#e2e8f0', fontSize: '1rem' }}>★</span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const { ref, inView } = useInView();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive(a => (a + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" ref={ref as any} style={{
      padding: '100px 0',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute', top: -100, right: -100,
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%)',
      }} />
      <div style={{
        position: 'absolute', bottom: -100, left: -100,
        width: 300, height: 300, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <div style={{
          textAlign: 'center', marginBottom: 60,
          opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(30px)',
          transition: 'all 0.7s ease',
        }}>
          <div className="section-tag" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', borderColor: 'rgba(255,255,255,0.2)', justifyContent: 'center' }}>
            ⭐ Patient Reviews
          </div>
          <h2 className="section-title" style={{ color: 'white' }}>
            What Our Patients <span>Say</span>
          </h2>
          <div className="divider divider-center" />

          {/* Google Rating */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 100, padding: '10px 24px', marginTop: 8,
          }}>
            <div style={{ display: 'flex', gap: 2 }}>
              {[1,2,3,4,5].map(s => <span key={s} style={{ color: '#f59e0b', fontSize: '1.1rem' }}>★</span>)}
            </div>
            <span style={{ color: 'white', fontWeight: 700, fontSize: '1.1rem' }}>{CLINIC_INFO.rating}</span>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.88rem' }}>({CLINIC_INFO.reviewCount}+ Google Reviews)</span>
          </div>
        </div>

        {/* Featured Testimonial */}
        <div style={{
          maxWidth: 760, margin: '0 auto 48px',
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 28, padding: '40px 48px',
          textAlign: 'center',
          opacity: inView ? 1 : 0, transition: 'all 0.7s ease 0.2s',
          minHeight: 220,
        }}>
          <div style={{ fontSize: '4rem', color: '#0ea5e9', opacity: 0.4, lineHeight: 1, marginBottom: -10 }}>"</div>
          <p style={{
            color: 'rgba(255,255,255,0.9)', fontSize: '1.15rem',
            lineHeight: 1.8, marginBottom: 24, fontStyle: 'italic',
            transition: 'opacity 0.5s',
          }}>
            {TESTIMONIALS[active].text}
          </p>
          <StarRating rating={TESTIMONIALS[active].rating} />
          <div style={{ marginTop: 16, color: 'white', fontWeight: 600 }}>
            {TESTIMONIALS[active].name}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem' }}>
            {TESTIMONIALS[active].location} · {TESTIMONIALS[active].treatment}
          </div>
        </div>

        {/* Testimonial Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 20,
        }}>
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.id}
              onClick={() => setActive(i)}
              style={{
                background: active === i ? 'rgba(14,165,233,0.2)' : 'rgba(255,255,255,0.05)',
                border: active === i ? '1px solid rgba(14,165,233,0.5)' : '1px solid rgba(255,255,255,0.1)',
                borderRadius: 16, padding: '20px',
                cursor: 'pointer',
                transition: 'all 0.3s',
                opacity: inView ? 1 : 0,
                transform: inView ? 'none' : 'translateY(20px)',
                animationDelay: `${i * 0.1}s`,
              }}
              onMouseEnter={e => {
                if (active !== i) e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
              }}
              onMouseLeave={e => {
                if (active !== i) e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              }}
            >
              <StarRating rating={t.rating} />
              <p style={{
                color: 'rgba(255,255,255,0.75)', fontSize: '0.84rem',
                lineHeight: 1.6, margin: '10px 0',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}>
                {t.text}
              </p>
              <div style={{ color: 'white', fontWeight: 600, fontSize: '0.88rem' }}>{t.name}</div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>
                {t.location} · {t.treatment}
              </div>
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 32 }}>
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: active === i ? 24 : 8,
                height: 8, borderRadius: 4,
                background: active === i ? '#0ea5e9' : 'rgba(255,255,255,0.3)',
                border: 'none', cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            />
          ))}
        </div>

        {/* Google Maps Review CTA */}
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <a
            href={CLINIC_INFO.mapUrl}
            target="_blank" rel="noopener noreferrer"
            className="btn btn-ghost"
            style={{ fontSize: '0.9rem' }}
          >
            🗺️ See All Reviews on Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}
