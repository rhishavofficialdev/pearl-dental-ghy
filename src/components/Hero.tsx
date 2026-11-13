import { useEffect, useRef } from 'react';
import { CLINIC_INFO } from '../data/clinicData';
import heroBg from '../assets/hero_bg.png';
import BookingForm from './BookingForm';

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
    const el = document.querySelector('.booking-card');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
    }
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
        background: 'linear-gradient(135deg, rgba(10,25,47,0.85) 0%, rgba(14,165,233,0.22) 60%, rgba(10,25,47,0.75) 100%)',
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
          pointerEvents: 'none',
        }} />
      ))}

      <div className="container hero-container" style={{ position: 'relative', zIndex: 3 }}>
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 50, alignItems: 'center' }}>
          {/* Left content */}
          <div className="hero-content">
            <div
              className="section-tag"
              style={{
                background: 'rgba(255,255,255,0.15)',
                color: 'white',
                borderColor: 'rgba(255,255,255,0.3)',
                backdropFilter: 'blur(10px)',
                marginBottom: 16,
              }}
            >
              ⭐ Rated {CLINIC_INFO.rating}/5 · {CLINIC_INFO.reviewCount}+ Google Reviews
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.1rem, 5.5vw, 4.2rem)',
                fontWeight: 700,
                color: 'white',
                lineHeight: 1.15,
                marginBottom: 18,
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Your Perfect{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #7dd3fc, #38bdf8, #0ea5e9)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Smile
              </span>{' '}
              Starts Here
            </h1>

            <p
              style={{
                color: 'rgba(255,255,255,0.88)',
                fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                lineHeight: 1.75,
                marginBottom: 32,
                maxWidth: 480,
              }}
            >
              Experience world-class dental care in Guwahati. From cosmetic smile makeovers to advanced implants — we transform smiles with precision, compassion & latest technology.
            </p>

            <div className="hero-btn-row" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 36 }}>
              <button
                onClick={handleBook}
                className="btn btn-primary hero-btn"
                style={{ fontSize: '0.95rem', padding: '14px 28px' }}
              >
                📅 Book Free Consultation
              </button>
              <a
                href={`tel:${CLINIC_INFO.phone}`}
                className="btn btn-ghost hero-btn"
                style={{ fontSize: '0.95rem', padding: '14px 28px' }}
              >
                📞 Call Us
              </a>
            </div>

            {/* Trust badges */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {[
                { icon: '👩‍⚕️', label: 'BDS, Rotary Endodontics Certified' },
                { icon: '🏥', label: 'Dispur, Guwahati' },
              ].map(b => (
                <div
                  key={b.label}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    background: 'rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: 100,
                    padding: '6px 14px',
                    color: 'rgba(255,255,255,0.92)',
                    fontSize: '0.78rem',
                    fontWeight: 500,
                  }}
                >
                  <span>{b.icon}</span>
                  <span>{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Booking Form */}
          <div className="hero-form-col" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <BookingForm />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="hero-scroll-indicator"
        style={{
          position: 'absolute',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.7rem', letterSpacing: '0.12em' }}>SCROLL</div>
        <div
          style={{
            width: 22,
            height: 34,
            border: '2px solid rgba(255,255,255,0.35)',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '4px',
          }}
        >
          <div
            style={{
              width: 3,
              height: 8,
              background: 'white',
              borderRadius: 2,
              animation: 'float 1.5s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        .hero-container {
          padding: 130px 24px 80px;
        }
        @media (max-width: 900px) {
          .hero-container {
            padding: 100px 16px 50px !important;
          }
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
          .hero-content {
            text-align: left;
          }
          .hero-scroll-indicator {
            display: none !important;
          }
        }
        @media (max-width: 480px) {
          .hero-btn-row {
            flex-direction: column;
            gap: 10px !important;
          }
          .hero-btn {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
}
