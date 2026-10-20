import { useState, useRef, useEffect } from 'react';
import { SERVICES } from '../data/clinicData';
import { CLINIC_INFO } from '../data/clinicData';
import servicesBanner from '../assets/services_banner.png';

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

export default function Services() {
  const { ref, inView } = useInView();
  const [activeService, setActiveService] = useState<string | null>(null);

  return (
    <section id="services" ref={ref as any} style={{ padding: '100px 0', background: '#ffffff' }}>
      <div className="container">
        {/* Header */}
        <div style={{
          textAlign: 'center', marginBottom: 60,
          opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(30px)',
          transition: 'all 0.7s ease',
        }}>
          <div className="section-tag" style={{ justifyContent: 'center' }}>🦷 Our Services</div>
          <h2 className="section-title">Comprehensive Dental <span>Care</span></h2>
          <div className="divider divider-center" />
          <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
            From routine check-ups to advanced cosmetic procedures, we offer a full spectrum of dental treatments to keep your smile healthy and beautiful.
          </p>
        </div>

        {/* Culture Banner */}
        <div style={{
          borderRadius: 24, overflow: 'hidden',
          marginBottom: 52,
          boxShadow: '0 20px 60px rgba(0,0,0,0.10)',
          position: 'relative',
          opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(30px)',
          transition: 'all 0.7s ease 0.15s',
          height: 260,
        }}>
          <img
            src={servicesBanner}
            alt="Happy patient at Pearl Dental Clinic Guwahati"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          {/* Overlay with text */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, rgba(10,25,47,0.85) 0%, rgba(10,25,47,0.4) 55%, transparent 100%)',
            display: 'flex', alignItems: 'center',
            padding: '0 48px',
          }}>
            <div style={{ maxWidth: 480 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: 'rgba(56,189,248,0.2)',
                border: '1px solid rgba(56,189,248,0.4)',
                borderRadius: 100, padding: '4px 14px', marginBottom: 12,
                color: '#7dd3fc', fontSize: '0.78rem', fontWeight: 600,
              }}>
                🌺 Proudly Serving Assam & Northeast India
              </div>
              <h3 style={{
                color: 'white', fontSize: '1.6rem', fontWeight: 700,
                lineHeight: 1.3, margin: '0 0 10px',
                fontFamily: "'Playfair Display', serif",
              }}>
                Guwahati's Most Trusted<br />Smile Specialists
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', margin: 0 }}>
                Dr. Nilakshi Talukdar · BDS, MDS · {CLINIC_INFO.rating}★ Rating
              </p>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 24,
        }}>
          {SERVICES.map((svc, i) => (
            <div
              key={svc.id}
              className="card"
              onClick={() => setActiveService(activeService === svc.id ? null : svc.id)}
              style={{
                cursor: 'pointer',
                opacity: inView ? 1 : 0,
                transform: inView ? 'none' : 'translateY(30px)',
                transition: `all 0.6s ease ${i * 0.07}s`,
                border: activeService === svc.id ? `2px solid ${svc.color}` : '1px solid rgba(226,232,240,0.8)',
              }}
            >
              {/* Colored top bar */}
              <div style={{ height: 4, background: `linear-gradient(90deg, ${svc.color}, ${svc.color}99)` }} />

              <div style={{ padding: '24px 24px 20px' }}>
                {/* Icon + Title */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: 12,
                    background: `${svc.color}15`, border: `1px solid ${svc.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.3rem', flexShrink: 0,
                  }}>
                    {svc.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', fontFamily: 'Inter, sans-serif', lineHeight: 1.2 }}>
                      {svc.title}
                    </h3>
                    <div style={{ fontSize: '0.78rem', color: svc.color, fontWeight: 600, marginTop: 2 }}>
                      {svc.duration}
                    </div>
                  </div>
                </div>

                <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: 16 }}>
                  {activeService === svc.id ? svc.description : svc.shortDesc}
                </p>

                {/* CTA */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <button
                    onClick={e => { e.stopPropagation(); document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }); }}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      background: `${svc.color}15`,
                      color: svc.color, border: `1px solid ${svc.color}40`,
                      borderRadius: 8, padding: '7px 18px',
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
                    Book Appointment →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: 60 }}>
          <p style={{ color: '#64748b', marginBottom: 20 }}>
            Not sure which treatment you need? Get a free consultation with our experts.
          </p>
          <button
            onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn btn-primary"
            style={{ fontSize: '1rem', padding: '14px 36px' }}
          >
            📅 Book Free Consultation
          </button>
        </div>
      </div>
    </section>
  );
}
