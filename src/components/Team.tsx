import { useRef, useEffect, useState } from 'react';
import { TEAM } from '../data/clinicData';
import { CLINIC_INFO } from '../data/clinicData';

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

const avatarColors = ['#38bdf8', '#67e8f9', '#0ea5e9'];

export default function Team() {
  const { ref, inView } = useInView();

  return (
    <section id="team" ref={ref as any} style={{ padding: '100px 0', background: 'linear-gradient(180deg, #f0f9ff 0%, #ffffff 100%)' }}>
      <div className="container">
        {/* Header */}
        <div style={{
          textAlign: 'center', marginBottom: 60,
          opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(30px)',
          transition: 'all 0.7s ease',
        }}>
          <div className="section-tag" style={{ justifyContent: 'center' }}>👩‍⚕️ Our Team</div>
          <h2 className="section-title">Meet Our <span>Expert Doctors</span></h2>
          <div className="divider divider-center" />
          <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
            Meet our expert dental surgeon who brings years of experience and a genuine passion for transforming smiles and improving oral health.
          </p>
        </div>

        {/* Team Cards - centered for single doctor */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
        }}>
          {TEAM.map((doc, i) => (
            <div
              key={doc.id}
              className="card team-card"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'none' : 'translateY(40px)',
                transition: `all 0.7s ease ${i * 0.15}s`,
                maxWidth: 900,
                width: '100%',
              }}
            >
              {/* Doctor Image / Avatar */}
              <div className="team-img-wrapper" style={{ position: 'relative', overflow: 'hidden' }}>
                {doc.image ? (
                  <img
                    src={doc.image}
                    alt={`${doc.name} - ${doc.role} at Pearl Dental Clinic`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                  />
                ) : (
                  <div style={{
                    width: '100%', height: '100%',
                    background: `linear-gradient(135deg, ${avatarColors[i]}20, ${avatarColors[i]}40)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexDirection: 'column', gap: 12,
                  }}>
                    <div style={{
                      width: 100, height: 100, borderRadius: '50%',
                      background: `linear-gradient(135deg, ${avatarColors[i]}, ${avatarColors[i]}99)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '3rem', color: 'white',
                    }}>
                      {doc.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div style={{ color: avatarColors[i], fontWeight: 600, fontSize: '0.9rem' }}>
                      {doc.speciality}
                    </div>
                  </div>
                )}

                {/* Gradient overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(15,23,42,0.8) 0%, transparent 50%)',
                }} />

                {/* Experience badge */}
                <div style={{
                  position: 'absolute', top: 16, right: 16,
                  background: `linear-gradient(135deg, ${avatarColors[i]}, ${avatarColors[i]}cc)`,
                  color: 'white', borderRadius: 100,
                  padding: '4px 12px', fontSize: '0.78rem', fontWeight: 700,
                }}>
                  {doc.experience}
                </div>
              </div>

              {/* Card body */}
              <div className="team-card-body" style={{ padding: '40px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>
                  {doc.name}
                </h3>
                <div style={{ color: avatarColors[i], fontWeight: 600, fontSize: '0.85rem', marginBottom: 4 }}>
                  {doc.role}
                </div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: 12, fontFamily: 'Inter, sans-serif' }}>
                  {doc.qualification}
                </div>

                <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: 16 }}>
                  {doc.bio}
                </p>

                {/* Specialty tag */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  background: `${avatarColors[i]}12`,
                  border: `1px solid ${avatarColors[i]}30`,
                  color: avatarColors[i], borderRadius: 100,
                  padding: '4px 14px', fontSize: '0.78rem', fontWeight: 600,
                }}>
                  🏅 {doc.speciality}
                </div>

                {/* Book with doctor */}
                <div style={{ marginTop: 16 }}>
                  <a
                    href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=Hi%20Pearl%20Dental%2C%20I%27d%20like%20to%20book%20an%20appointment%20with%20${encodeURIComponent(doc.name)}.`}
                    target="_blank" rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      background: `${avatarColors[i]}10`,
                      border: `1px solid ${avatarColors[i]}30`,
                      color: avatarColors[i], borderRadius: 8,
                      padding: '8px 16px', fontSize: '0.82rem',
                      fontWeight: 600, textDecoration: 'none',
                      fontFamily: 'Inter, sans-serif',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = avatarColors[i];
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = `${avatarColors[i]}10`;
                      e.currentTarget.style.color = avatarColors[i];
                    }}
                  >
                    📅 Book Appointment
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .team-card {
          display: flex;
          flex-direction: row;
        }
        .team-img-wrapper {
          flex: 0 0 45%;
          min-height: 400px;
        }
        @media (max-width: 768px) {
          .team-card {
            flex-direction: column;
          }
          .team-img-wrapper {
            min-height: 300px;
          }
          .team-card-body {
            padding: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
