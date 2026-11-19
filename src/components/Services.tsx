import { useState, useRef, useEffect } from 'react';
import { SERVICES, CLINIC_INFO } from '../data/clinicData';
import servicesBanner from '../assets/services_banner.png';

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

export default function Services() {
  const { ref, inView } = useInView();
  const [activeService, setActiveService] = useState<string | null>(null);

  const handleBook = () => {
    const el = document.querySelector('.booking-card');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" ref={ref as any} style={{ padding: '100px 0', background: '#ffffff', overflow: 'hidden' }}>
      <div className="container">
        {/* Header */}
        <div style={{
          textAlign: 'center', marginBottom: 50,
          opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(30px)',
          transition: 'all 0.7s ease',
        }}>
          <div className="section-tag" style={{ justifyContent: 'center' }}>
            <span>🦷</span>
            <span>Our Dental Services</span>
          </div>
          <h2 className="section-title">Comprehensive Dental <span>Care</span></h2>
          <div className="divider divider-center" />
          <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
            From routine teeth cleaning to advanced smile design and painless root canals — we offer specialized dental treatments to keep your smile healthy and radiant.
          </p>
        </div>

        {/* Culture Banner */}
        <div
          className="services-culture-banner"
          style={{
            borderRadius: 24, overflow: 'hidden',
            marginBottom: 44,
            boxShadow: '0 20px 60px rgba(0,0,0,0.10)',
            position: 'relative',
            opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(30px)',
            transition: 'all 0.7s ease 0.15s',
            background: '#0f172a',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            alignItems: 'stretch',
          }}
        >
          {/* Photo Column - 50% size, matching layout proportions of previous section */}
          <div
            className="services-banner-img-wrap"
            style={{
              position: 'relative',
              overflow: 'hidden',
              minHeight: 260,
              background: '#0f172a',
            }}
          >
            <img
              src={servicesBanner}
              alt="Happy patient at Pearl Dental Clinic Guwahati"
              className="services-banner-img"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
            />
          </div>

          {/* Text Content Column */}
          <div
            className="services-banner-content"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '36px 40px',
              background: 'linear-gradient(135deg, #0a192f 0%, #0f172a 100%)',
              zIndex: 1,
            }}
          >
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: 'rgba(56,189,248,0.25)',
                border: '1px solid rgba(56,189,248,0.4)',
                borderRadius: 100, padding: '4px 12px', marginBottom: 12,
                color: '#7dd3fc', fontSize: '0.75rem', fontWeight: 600,
              }}>
                🌺 Proudly Serving Assam & Northeast India
              </div>
              <h3 style={{
                color: 'white', fontSize: 'clamp(1.2rem, 2.2vw, 1.65rem)', fontWeight: 700,
                lineHeight: 1.3, margin: '0 0 10px',
                fontFamily: "'Playfair Display', serif",
              }}>
                Guwahati's Most Trusted Smile Specialists
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.88rem', margin: 0, lineHeight: 1.6 }}>
                Dr. Nilakshi Talukdar · BDS · ⭐ {CLINIC_INFO.rating} Rating ({CLINIC_INFO.reviewCount}+ Google Reviews)
              </p>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div
          className="services-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
            gap: 20,
          }}
        >
          {SERVICES.map((svc, i) => (
            <div
              key={svc.id}
              className="card service-card"
              onClick={() => setActiveService(activeService === svc.id ? null : svc.id)}
              style={{
                cursor: 'pointer',
                opacity: inView ? 1 : 0,
                transform: inView ? 'none' : 'translateY(30px)',
                transition: `all 0.6s ease ${i * 0.05}s`,
                border: activeService === svc.id ? `2px solid ${svc.color}` : '1px solid rgba(226,232,240,0.85)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Colored top bar */}
              <div style={{ height: 4, background: `linear-gradient(90deg, ${svc.color}, ${svc.color}99)` }} />

              <div className="service-card-inner" style={{ padding: '22px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                {/* Icon + Title */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: `${svc.color}15`, border: `1px solid ${svc.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.35rem', flexShrink: 0,
                  }}>
                    {svc.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', fontFamily: 'Inter, sans-serif', lineHeight: 1.25 }}>
                      {svc.title}
                    </h3>
                    <div style={{ fontSize: '0.78rem', color: svc.color, fontWeight: 600, marginTop: 2 }}>
                      ⏱️ {svc.duration}
                    </div>
                  </div>
                </div>

                <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: 16, flex: 1 }}>
                  {activeService === svc.id ? svc.description : svc.shortDesc}
                </p>

                {/* CTA */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: 'auto', paddingTop: 8 }}>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      handleBook();
                    }}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      background: `${svc.color}15`,
                      color: svc.color, border: `1px solid ${svc.color}40`,
                      borderRadius: 8, padding: '7px 16px',
                      fontSize: '0.82rem', fontWeight: 600,
                      transition: 'all 0.2s',
                      fontFamily: 'Inter, sans-serif',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = svc.color;
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = `${svc.color}15`;
                      e.currentTarget.style.color = svc.color;
                    }}
                  >
                    Book →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: 50 }}>
          <p style={{ color: '#64748b', marginBottom: 16, fontSize: '0.95rem' }}>
            Not sure which treatment is right for you? Get an expert consultation with Dr. Nilakshi.
          </p>
          <button
            onClick={handleBook}
            className="btn btn-primary services-cta-btn"
            style={{ fontSize: '0.95rem', padding: '14px 32px' }}
          >
            📅 Book Free Dental Consultation
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .services-culture-banner {
            grid-template-columns: 1fr !important;
          }
          .services-banner-img-wrap {
            min-height: 220px !important;
            max-height: 280px !important;
          }
          .services-banner-content {
            padding: 26px 20px !important;
          }
        }
        @media (max-width: 768px) {
          #services {
            padding: 70px 0 !important;
          }
        }
        @media (max-width: 480px) {
          .services-banner-img-wrap {
            min-height: 190px !important;
          }
          .services-banner-content {
            padding: 20px 16px !important;
          }
          .services-cta-btn {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
}
