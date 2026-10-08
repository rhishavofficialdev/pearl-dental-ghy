import { useEffect, useRef } from 'react';
import { CLINIC_INFO, STATS } from '../data/clinicData';
import heroBg from '../assets/hero_bg.png';

export default function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleBook = () => {
    document.getElementById('appointment')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      {/* Parallax Background */}
      <div ref={parallaxRef} style={{
        position: 'absolute', inset: '-20%',
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 0,
      }} />

      {/* Dark overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(135deg, rgba(10,25,47,0.80) 0%, rgba(56,189,248,0.18) 60%, rgba(10,25,47,0.65) 100%)',
      }} />

      {/* Animated particles */}
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute', zIndex: 2,
          width: `${60 + i * 40}px`, height: `${60 + i * 40}px`,
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '50%',
          top: `${10 + i * 12}%`,
          left: `${5 + i * 14}%`,
          animation: `float ${4 + i}s ease-in-out ${i * 0.5}s infinite`,
        }} />
      ))}

      <div className="container" style={{ position: 'relative', zIndex: 3, padding: '120px 24px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          {/* Left content */}
          <div>
            <div className="section-tag" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', borderColor: 'rgba(255,255,255,0.3)', backdropFilter: 'blur(10px)' }}>
              ⭐ Rated {CLINIC_INFO.rating}/5 by {CLINIC_INFO.reviewCount}+ patients
            </div>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 700, color: 'white',
              lineHeight: 1.1, marginBottom: 20,
              fontFamily: "'Playfair Display', serif",
            }}>
              Your Perfect{' '}
              <span style={{
                background: 'linear-gradient(90deg, #7dd3fc, #38bdf8, #0ea5e9)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Smile</span>{' '}
              Starts Here
            </h1>
            <p style={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: '1.1rem', lineHeight: 1.8, marginBottom: 36,
              maxWidth: 480,
            }}>
              Experience world-class dental care in Guwahati. From cosmetic smile makeovers to advanced implants — we transform smiles with precision, compassion & latest technology.
            </p>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 48 }}>
              <button onClick={handleBook} className="btn btn-primary" style={{ fontSize: '1rem', padding: '14px 32px' }}>
                📅 Book Free Consultation
              </button>
              <a
                href={`tel:${CLINIC_INFO.phone}`}
                className="btn btn-ghost"
                style={{ fontSize: '1rem', padding: '14px 32px' }}
              >
                📞 Call Us
              </a>
            </div>

            {/* Trust badges */}
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              {[
                { icon: '✅', label: 'BDS & MDS Certified' },
                { icon: '🏥', label: 'ISO Certified Clinic' },
                { icon: '💳', label: '0% EMI Available' },
              ].map(b => (
                <div key={b.label} style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  background: 'rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 100, padding: '6px 14px',
                  color: 'rgba(255,255,255,0.9)', fontSize: '0.82rem', fontWeight: 500,
                }}>
                  {b.icon} {b.label}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Stats cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {STATS.map((stat, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 20, padding: '28px 20px',
                textAlign: 'center',
                animation: `fadeInUp 0.6s ease ${0.1 * i}s both`,
                transition: 'transform 0.3s',
                cursor: 'default',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0) scale(1)')}
              >
                <div style={{
                  fontSize: '2.4rem', fontWeight: 800, color: '#e0f2fe',
                  fontFamily: "'Inter', sans-serif",
                  lineHeight: 1,
                }}>{stat.value}</div>
                <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.88rem', marginTop: 6, fontWeight: 500 }}>
                  {stat.label}
                </div>
              </div>
            ))}

            {/* Quick Info Card */}
            <div style={{
              gridColumn: '1 / -1',
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 20, padding: '20px 24px',
              display: 'flex', alignItems: 'center', gap: 16,
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.3rem', flexShrink: 0,
              }}>📍</div>
              <div>
                <div style={{ color: 'white', fontWeight: 600, fontSize: '0.95rem' }}>
                  {CLINIC_INFO.address}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', marginTop: 2 }}>
                  Mon–Sat: 9AM–8PM · Sun: 10AM–4PM
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 30, left: '50%',
        transform: 'translateX(-50%)', zIndex: 3,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
      }}>
        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', letterSpacing: '0.1em' }}>SCROLL</div>
        <div style={{
          width: 24, height: 38, border: '2px solid rgba(255,255,255,0.4)',
          borderRadius: 12, display: 'flex', alignItems: 'flex-start',
          justifyContent: 'center', padding: '4px',
        }}>
          <div style={{
            width: 4, height: 10, background: 'white', borderRadius: 2,
            animation: 'float 1.5s ease-in-out infinite',
          }} />
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 800px) {
          #home .container > div {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}