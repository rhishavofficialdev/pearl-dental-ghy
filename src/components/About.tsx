import { useRef, useEffect, useState } from 'react';
import { CLINIC_INFO, STATS } from '../data/clinicData';
import doctorImg from '../assets/doctor.png';

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
    { icon: '🔬', title: 'Advanced Technology', desc: 'Digital X-rays, 3D scanning, CAD/CAM crowns' },
    { icon: '💉', title: 'Pain-Free Treatment', desc: 'Latest anesthesia & sedation techniques' },
    { icon: '🏆', title: 'Expert Specialist', desc: '7+ years board-certified dental surgeon' },
    { icon: '💎', title: 'Premium Materials', desc: 'International-grade implants & ceramics' },
    { icon: '🛡️', title: 'Sterilization', desc: 'Hospital-grade hygiene protocols' },
    { icon: '💳', title: 'Flexible Payment', desc: '0% EMI, insurance accepted' },
  ];

  return (
    <section id="about" ref={ref as any} style={{
      padding: '100px 0',
      background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          {/* Left: Image + Stats */}
          <div style={{ position: 'relative', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(-40px)', transition: 'all 0.8s ease' }}>
            <div style={{
              position: 'relative', borderRadius: 30,
              overflow: 'hidden',
              boxShadow: '0 30px 80px rgba(56,189,248,0.12)',
            }}>
              <img src={doctorImg} alt="Dr. Nilakshi Talukdar - Chief Dentist at Pearl Dental Clinic"
                style={{ width: '100%', height: 520, objectFit: 'cover', display: 'block' }} />

              {/* Gradient overlay on image */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(to top, rgba(15,23,42,0.9) 0%, transparent 60%)',
                padding: 30,
              }}>
                <div style={{ color: 'white', fontWeight: 700, fontSize: '1.1rem' }}>Dr. Nilakshi Talukdar</div>
                <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.85rem' }}>BDS, MDS · Chief Dental Surgeon</div>
              </div>
            </div>

            {/* Floating stat badge */}
            <div style={{
              position: 'absolute', top: 30, right: -20,
              background: 'white',
              borderRadius: 20, padding: '18px 24px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.10)',
              textAlign: 'center',
              animation: 'float 4s ease-in-out infinite',
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#38bdf8' }}>
                <CountUp end={7} />+
              </div>
              <div style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: 500 }}>Years Exp.</div>
            </div>

            <div style={{
              position: 'absolute', bottom: 80, left: -20,
              background: 'linear-gradient(135deg, #38bdf8, #67e8f9)',
              borderRadius: 20, padding: '18px 24px',
              boxShadow: '0 20px 50px rgba(56,189,248,0.25)',
              textAlign: 'center',
              animation: 'float 5s ease-in-out 0.5s infinite',
              color: 'white',
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 800 }}>
                <CountUp end={10000} />+
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: 500, opacity: 0.9 }}>Happy Smiles</div>
            </div>
          </div>

          {/* Right: Content */}
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(40px)', transition: 'all 0.8s ease 0.2s' }}>
            <div className="section-tag">✨ About Pearl Dental</div>
            <h2 className="section-title">
              Guwahati's Most Trusted<br />
              <span>Dental Clinic</span>
            </h2>
            <div className="divider" />
            <p className="section-subtitle" style={{ marginBottom: 24 }}>
              {CLINIC_INFO.description}
            </p>
            <p style={{ color: '#64748b', lineHeight: 1.8, marginBottom: 36, fontSize: '0.95rem' }}>
              Founded in {CLINIC_INFO.founded}, we've been dedicated to creating beautiful, healthy smiles using the latest dental technologies and evidence-based practices. Our compassionate team believes everyone deserves excellent dental care.
            </p>

            {/* Feature Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 36 }}>
              {features.map((f, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 12,
                  padding: '14px 16px', borderRadius: 12,
                  background: i % 2 === 0 ? 'rgba(14,165,233,0.05)' : '#f8fafc',
                  border: '1px solid rgba(14,165,233,0.12)',
                  transition: 'all 0.3s',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(14,165,233,0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = i % 2 === 0 ? 'rgba(14,165,233,0.05)' : '#f8fafc';
                  e.currentTarget.style.transform = 'none';
                }}
                >
                  <span style={{ fontSize: '1.3rem', marginTop: 2 }}>{f.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#0f172a' }}>{f.title}</div>
                    <div style={{ color: '#64748b', fontSize: '0.78rem', marginTop: 2 }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button
                onClick={() => document.getElementById('appointment')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn btn-primary"
              >
                📅 Book Consultation
              </button>
              <a
                href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=Hello%20Pearl%20Dental%2C%20I%27d%20like%20to%20know%20more%20about%20your%20services.`}
                target="_blank" rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                💬 WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #about .container > div {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
