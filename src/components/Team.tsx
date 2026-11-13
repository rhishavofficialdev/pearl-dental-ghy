import { useRef, useEffect, useState } from 'react';
import { TEAM, CLINIC_INFO } from '../data/clinicData';

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

const specialitiesList = [
  { icon: '✨', label: 'Cosmetic Dentistry & Smile Design' },
  { icon: '🦷', label: 'Dental Implants & Restoration' },
  { icon: '🔬', label: 'Rotary Endodontics & Root Canal' },
  { icon: '🏥', label: 'Comprehensive Family Care' },
];

export default function Team() {
  const { ref, inView } = useInView();

  const handleBook = () => {
    const el = document.querySelector('.booking-card');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="team"
      ref={ref as any}
      style={{
        padding: '100px 0',
        background: 'linear-gradient(180deg, #f0f9ff 0%, #ffffff 100%)',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        {/* Header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: 50,
            opacity: inView ? 1 : 0,
            transform: inView ? 'none' : 'translateY(30px)',
            transition: 'all 0.7s ease',
          }}
        >
          <div className="section-tag" style={{ justifyContent: 'center' }}>
            <span>👩‍⚕️</span>
            <span>Chief Dental Surgeon</span>
          </div>
          <h2 className="section-title">
            Meet Our <span>Expert Doctor</span>
          </h2>
          <div className="divider divider-center" />
          <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
            Experience gentle, compassionate, and evidence-based dental care under Dr. Nilakshi Talukdar — dedicated to creating healthy, confident smiles in Guwahati.
          </p>
        </div>

        {/* Doctor Details Card */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {TEAM.map((doc, i) => (
            <div
              key={doc.id}
              className="card team-card"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'none' : 'translateY(40px)',
                transition: `all 0.7s ease ${i * 0.15}s`,
                maxWidth: 960,
                width: '100%',
                display: 'flex',
                borderRadius: 24,
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(15, 23, 42, 0.08)',
                border: '1px solid rgba(226, 232, 240, 0.85)',
              }}
            >
              {/* Doctor Image Column */}
              <div
                className="team-img-wrapper"
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  background: '#0f172a',
                }}
              >
                {doc.image ? (
                  <img
                    src={doc.image}
                    alt={`${doc.name} - ${doc.role} at Pearl Dental Clinic Guwahati`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'top center',
                      display: 'block',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      minHeight: 280,
                      background: 'linear-gradient(135deg, #0284c720, #0284c740)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      gap: 12,
                    }}
                  >
                    <div
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '3rem',
                        color: 'white',
                      }}
                    >
                      {doc.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                    </div>
                  </div>
                )}

                {/* Subtle gradient overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.1) 40%, transparent 100%)',
                  }}
                />

                {/* Experience badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
                    color: 'white',
                    borderRadius: 100,
                    padding: '6px 14px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    boxShadow: '0 4px 15px rgba(14,165,233,0.4)',
                    letterSpacing: '0.02em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    zIndex: 2,
                  }}
                >
                  <span>⭐</span>
                  <span>{doc.experience} Clinical Experience</span>
                </div>

                {/* Mobile doctor overlay name tag */}
                <div
                  className="mobile-doctor-tag"
                  style={{
                    position: 'absolute',
                    bottom: 16,
                    left: 16,
                    right: 16,
                    color: 'white',
                    zIndex: 2,
                  }}
                >
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>
                    {doc.name}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#7dd3fc' }}>
                    {doc.qualification} · {doc.role}
                  </div>
                </div>
              </div>

              {/* Doctor Info Body Column */}
              <div
                className="team-card-body"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  background: '#ffffff',
                }}
              >
                <div className="desktop-doctor-tag">
                  <h3
                    style={{
                      fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
                      fontWeight: 700,
                      color: '#0f172a',
                      marginBottom: 4,
                      lineHeight: 1.2,
                    }}
                  >
                    {doc.name}
                  </h3>

                  <div
                    style={{
                      color: '#0ea5e9',
                      fontWeight: 600,
                      fontSize: '0.92rem',
                      marginBottom: 4,
                    }}
                  >
                    {doc.role}
                  </div>

                  <div
                    style={{
                      color: '#64748b',
                      fontSize: '0.82rem',
                      marginBottom: 16,
                      fontWeight: 500,
                    }}
                  >
                    🎓 {doc.qualification} · Rotary Endodontics Certified
                  </div>
                </div>

                {/* Doctor Bio */}
                <p
                  style={{
                    color: '#475569',
                    fontSize: '0.9rem',
                    lineHeight: 1.8,
                    marginBottom: 20,
                  }}
                >
                  {doc.bio}
                </p>

                {/* Specialities Header */}
                <div
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#64748b',
                    marginBottom: 10,
                  }}
                >
                  Core Clinical Specialities
                </div>

                {/* Speciality Pills Grid */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 8,
                    marginBottom: 24,
                  }}
                >
                  {specialitiesList.map(s => (
                    <div
                      key={s.label}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        background: '#f0f9ff',
                        border: '1px solid #bae6fd',
                        color: '#0369a1',
                        borderRadius: 100,
                        padding: '6px 14px',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                      }}
                    >
                      <span>{s.icon}</span>
                      <span>{s.label}</span>
                    </div>
                  ))}
                </div>

                {/* Action Row */}
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <button
                    onClick={handleBook}
                    className="btn btn-primary team-btn"
                    style={{
                      fontSize: '0.9rem',
                      padding: '12px 24px',
                      cursor: 'pointer',
                    }}
                  >
                    📅 Book Appointment with Dr. Nilakshi
                  </button>

                  <a
                    href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=Hello%20Dr.%20Nilakshi%2C%20I%20would%20like%20to%20consult%20regarding%20dental%20treatment.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary team-btn"
                    style={{
                      fontSize: '0.9rem',
                      padding: '12px 20px',
                    }}
                  >
                    💬 WhatsApp Consultation
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        .team-card {
          flex-direction: row;
        }
        .team-img-wrapper {
          flex: 0 0 42%;
          min-height: 480px;
        }
        .team-card-body {
          flex: 1 1 58%;
          padding: 44px 40px;
        }
        .mobile-doctor-tag {
          display: none !important;
        }
        .desktop-doctor-tag {
          display: block !important;
        }

        @media (max-width: 860px) {
          .team-card {
            flex-direction: column !important;
          }
          .team-img-wrapper {
            flex: none !important;
            min-height: 280px !important;
            max-height: 340px !important;
            height: 300px !important;
          }
          .team-card-body {
            padding: 24px 20px !important;
          }
          .mobile-doctor-tag {
            display: block !important;
          }
          .desktop-doctor-tag {
            display: none !important;
          }
          #team {
            padding: 70px 0 !important;
          }
        }

        @media (max-width: 480px) {
          .team-card-body {
            padding: 20px 16px !important;
          }
          .team-btn {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
}
