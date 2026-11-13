import { useRef, useEffect, useState } from 'react';
import { CLINIC_INFO } from '../data/clinicData';
import doctorImg from '../assets/pearl.jpeg';

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function CountUp({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView();
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);
  return <span ref={ref as any}>{count.toLocaleString()}</span>;
}

export default function About() {
  const { ref, inView } = useInView();

  const features = [
    { icon: '🔬', title: 'Advanced Technology', desc: 'Digital diagnostics & rotary endodontics' },
    { icon: '💉', title: 'Pain-Free Treatment', desc: 'Latest gentle anesthesia techniques' },
    { icon: '🏆', title: 'Expert Specialist', desc: '5+ years board-certified surgeon' },
    { icon: '💎', title: 'Premium Materials', desc: 'International-grade implants & crowns' },
    { icon: '🛡️', title: 'Hospital Sterilization', desc: 'Rigorous multi-stage hygiene standards' },
    { icon: '💳', title: 'Transparent Pricing', desc: 'Clear cost estimation, 0% EMI options' },
  ];

  return (
    <section id="about" ref={ref as any} style={{
      padding: '100px 0',
      background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
      overflow: 'hidden',
    }}>
      <div className="container">
        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          {/* Left: Image + Stats */}
          <div style={{ position: 'relative', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(-40px)', transition: 'all 0.8s ease' }}>
            <div style={{
              position: 'relative', borderRadius: 28,
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(56,189,248,0.12)',
              background: '#0f172a',
            }}>
              <img
                src={doctorImg}
                alt="Dr. Nilakshi Talukdar - Chief Dentist at Pearl Dental Clinic Guwahati"
                className="about-doctor-img"
                style={{ width: '100%', height: 500, objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
              />

              {/* Gradient overlay on image */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(to top, rgba(15,23,42,0.92) 0%, transparent 60%)',
                padding: '24px 20px',
              }}>
                <div style={{ color: 'white', fontWeight: 700, fontSize: '1.15rem' }}>Dr. Nilakshi Talukdar</div>
                <div style={{ color: '#7dd3fc', fontSize: '0.82rem', fontWeight: 500 }}>BDS · Chief Dental Surgeon</div>
              </div>
            </div>

            {/* Floating stat badge - Experience */}
            <div
              className="about-stat-badge about-stat-exp"
              style={{
                position: 'absolute', top: 24, right: -16,
                background: 'white',
                borderRadius: 18, padding: '14px 20px',
                boxShadow: '0 15px 40px rgba(0,0,0,0.12)',
                textAlign: 'center',
                animation: 'float 4s ease-in-out infinite',
                border: '1px solid rgba(226,232,240,0.8)',
                zIndex: 3,
              }}
            >
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0ea5e9', lineHeight: 1 }}>
                <CountUp end={5} />+
              </div>
              <div style={{ color: '#64748b', fontSize: '0.78rem', fontWeight: 600, marginTop: 4 }}>Years Exp.</div>
            </div>

            {/* Floating stat badge - Smiles */}
            <div
              className="about-stat-badge about-stat-smiles"
              style={{
                position: 'absolute', bottom: 60, left: -16,
                background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                borderRadius: 18, padding: '14px 20px',
                boxShadow: '0 15px 40px rgba(14,165,233,0.3)',
                textAlign: 'center',
                animation: 'float 5s ease-in-out 0.5s infinite',
                color: 'white',
                zIndex: 3,
              }}
            >
              <div style={{ fontSize: '1.8rem', fontWeight: 800, lineHeight: 1 }}>
                <CountUp end={10000} />+
              </div>
              <div style={{ fontSize: '0.78rem', fontWeight: 600, opacity: 0.95, marginTop: 4 }}>Happy Smiles</div>
            </div>
          </div>

          {/* Right: Content */}
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(40px)', transition: 'all 0.8s ease 0.2s' }}>
            <div className="section-tag">✨ About Pearl Dental</div>
            <h2 className="section-title">
              Guwahati's Trusted<br />
              <span>Dental Clinic</span>
            </h2>
            <div className="divider" />
            <p className="section-subtitle" style={{ marginBottom: 20 }}>
              {CLINIC_INFO.description}
            </p>
            <p style={{ color: '#64748b', lineHeight: 1.8, marginBottom: 28, fontSize: '0.92rem' }}>
              We are dedicated to creating healthy, beautiful smiles using modern dental technologies and evidence-based practices. Our compassionate team ensures that every visit is calm, gentle, and transparent.
            </p>

            {/* Feature Grid */}
            <div className="about-feature-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 32 }}>
              {features.map((f, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 10,
                  padding: '12px 14px', borderRadius: 12,
                  background: i % 2 === 0 ? 'rgba(14,165,233,0.06)' : '#f8fafc',
                  border: '1px solid rgba(14,165,233,0.14)',
                  transition: 'all 0.2s',
                }}>
                  <span style={{ fontSize: '1.25rem', marginTop: 2, flexShrink: 0 }}>{f.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#0f172a' }}>{f.title}</div>
                    <div style={{ color: '#64748b', fontSize: '0.75rem', marginTop: 2, lineHeight: 1.4 }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="about-btn-row" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button
                onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn btn-primary about-btn"
                style={{ fontSize: '0.92rem', padding: '12px 24px' }}
              >
                📅 Book Consultation
              </button>
              <a
                href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=Hello%20Pearl%20Dental%2C%20I%27d%20like%20to%20know%20more%20about%20your%20services.`}
                target="_blank" rel="noopener noreferrer"
                className="btn btn-secondary about-btn"
                style={{ fontSize: '0.92rem', padding: '12px 22px' }}
              >
                💬 WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .about-doctor-img {
            height: 380px !important;
          }
          .about-stat-exp {
            right: 12px !important;
            top: 16px !important;
            padding: 10px 16px !important;
          }
          .about-stat-smiles {
            left: 12px !important;
            bottom: 30px !important;
            padding: 10px 16px !important;
          }
          #about {
            padding: 70px 0 !important;
          }
        }

        @media (max-width: 560px) {
          .about-feature-grid {
            grid-template-columns: 1fr !important;
            gap: 10px !important;
          }
          .about-doctor-img {
            height: 320px !important;
          }
        }

        @media (max-width: 480px) {
          .about-btn-row {
            flex-direction: column !important;
            gap: 10px !important;
          }
          .about-btn {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
}
