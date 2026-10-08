import { useRef, useEffect, useState } from 'react';
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

export default function Contact() {
  const { ref, inView } = useInView();

  return (
    <section id="contact" ref={ref as any} style={{ padding: '100px 0', background: '#ffffff' }}>
      <div className="container">
        {/* Header */}
        <div style={{
          textAlign: 'center', marginBottom: 60,
          opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(30px)',
          transition: 'all 0.7s ease',
        }}>
          <div className="section-tag" style={{ justifyContent: 'center' }}>📍 Find Us</div>
          <h2 className="section-title">Visit <span>Pearl Dental</span></h2>
          <div className="divider divider-center" />
          <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
            We're conveniently located in Guwahati, Assam. Walk-ins welcome. For faster service, book an appointment in advance.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 48 }}>
          {/* Left: Info Cards */}
          <div style={{
            opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(-30px)',
            transition: 'all 0.7s ease',
            display: 'flex', flexDirection: 'column', gap: 20,
          }}>
            {[
              {
                icon: '📍', title: 'Our Address',
                content: 'Pearl Dental Clinic\nHengrabari Road, Housing Tiniali\n(Near Prajapati Bhawan), Dispur\nGuwahati, Assam 781006',
                action: null,
              },
              {
                icon: '📞', title: 'Phone & WhatsApp',
                content: CLINIC_INFO.phone,
                action: { label: 'Call Now', href: `tel:${CLINIC_INFO.phone}` },
                action2: { label: 'WhatsApp', href: `https://wa.me/${CLINIC_INFO.whatsapp}` },
              },
              {
                icon: '🕐', title: 'Clinic Hours',
                content: 'Mon – Fri: 9:00 AM – 8:00 PM\nSaturday: 9:00 AM – 6:00 PM\nSunday: 10:00 AM – 4:00 PM',
                action: null,
              },
              {
                icon: '📧', title: 'Email Us',
                content: CLINIC_INFO.email,
                action: { label: 'Send Email', href: `mailto:${CLINIC_INFO.email}` },
              },
            ].map((item, i) => (
              <div key={i} style={{
                background: 'white',
                border: '1px solid rgba(226,232,240,0.8)',
                borderRadius: 20, padding: '24px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(14,165,233,0.3)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(14,165,233,0.1)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(226,232,240,0.8)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
              }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: 12,
                    background: 'linear-gradient(135deg, rgba(14,165,233,0.1), rgba(6,182,212,0.15))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.2rem', flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.9rem', marginBottom: 6 }}>
                      {item.title}
                    </div>
                    <div style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                      {item.content}
                    </div>
                    {(item.action || (item as any).action2) && (
                      <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                        {item.action && (
                          <a href={item.action.href} target={item.action.href.startsWith('http') ? '_blank' : undefined}
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: 4,
                              background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                              color: 'white', borderRadius: 8, padding: '6px 14px',
                              fontSize: '0.78rem', fontWeight: 600, textDecoration: 'none',
                              fontFamily: 'Inter, sans-serif',
                            }}
                          >
                            {item.action.label}
                          </a>
                        )}
                        {(item as any).action2 && (
                          <a href={(item as any).action2.href} target="_blank" rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: 4,
                              background: '#25d366', color: 'white', borderRadius: 8, padding: '6px 14px',
                              fontSize: '0.78rem', fontWeight: 600, textDecoration: 'none',
                              fontFamily: 'Inter, sans-serif',
                            }}
                          >
                            {(item as any).action2.label}
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Google Map */}
          <div style={{
            opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(30px)',
            transition: 'all 0.7s ease 0.2s',
          }}>
            <div style={{
              borderRadius: 24, overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
              border: '1px solid rgba(226,232,240,0.8)',
              height: '100%', minHeight: 500,
            }}>
              <iframe
                title="Pearl Dental Clinic Location - Guwahati, Assam"
                loading="lazy"
                style={{ width: '100%', height: '100%', minHeight: 500, border: 'none', display: 'block' }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.2898862145637!2d91.78528289999999!3d26.1507689!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a59b5269ae37b%3A0x6823f5e02a1e2a39!2sPearl%20Dental%20Clinic!5e0!3m2!1sen!2sin!4v1728370000000!5m2!1sen!2sin"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Directions button below map */}
            <a
              href={CLINIC_INFO.mapUrl}
              target="_blank" rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}
            >
              🗺️ Get Directions on Google Maps
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #contact .container > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
