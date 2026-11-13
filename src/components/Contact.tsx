import { useRef, useEffect, useState } from 'react';
import { CLINIC_INFO } from '../data/clinicData';

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

export default function Contact() {
  const { ref, inView } = useInView();

  return (
    <section id="contact" ref={ref as any} style={{ padding: '100px 0', background: '#ffffff', overflow: 'hidden' }}>
      <div className="container">
        {/* Header */}
        <div style={{
          textAlign: 'center', marginBottom: 50,
          opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(30px)',
          transition: 'all 0.7s ease',
        }}>
          <div className="section-tag" style={{ justifyContent: 'center' }}>
            <span>📍</span>
            <span>Location & Contact</span>
          </div>
          <h2 className="section-title">Visit <span>Pearl Dental</span></h2>
          <div className="divider divider-center" />
          <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
            Conveniently located on Hengrabari Road in Dispur, Guwahati. Walk-ins welcome during working hours, or book ahead for faster service.
          </p>
        </div>

        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.35fr', gap: 40, alignItems: 'stretch' }}>
          {/* Left: Info Cards */}
          <div style={{
            opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(-30px)',
            transition: 'all 0.7s ease',
            display: 'flex', flexDirection: 'column', gap: 16,
          }}>
            {[
              {
                icon: '📍', title: 'Clinic Address',
                content: CLINIC_INFO.fullAddress,
                action: { label: '🗺️ Get Directions', href: CLINIC_INFO.mapUrl },
              },
              {
                icon: '📞', title: 'Phone & WhatsApp',
                content: `${CLINIC_INFO.phone}\nFast response via WhatsApp message`,
                action: { label: '📞 Call Now', href: `tel:${CLINIC_INFO.phone}` },
                action2: { label: '💬 WhatsApp', href: `https://wa.me/${CLINIC_INFO.whatsapp}` },
              },
              {
                icon: '🕐', title: 'Clinic Hours',
                content: `Mon – Sat: ${CLINIC_INFO.hours.weekdays}\nSunday: ${CLINIC_INFO.hours.sunday}`,
                action: null,
              },
              {
                icon: '📧', title: 'Email Address',
                content: CLINIC_INFO.email,
                action: { label: '✉️ Send Email', href: `mailto:${CLINIC_INFO.email}` },
              },
            ].map((item, i) => (
              <div key={i} className="contact-card" style={{
                background: 'white',
                border: '1px solid rgba(226,232,240,0.85)',
                borderRadius: 20, padding: '20px 22px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                transition: 'all 0.25s',
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: 'linear-gradient(135deg, rgba(14,165,233,0.12), rgba(6,182,212,0.18))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.25rem', flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.92rem', marginBottom: 4 }}>
                      {item.title}
                    </div>
                    <div style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                      {item.content}
                    </div>
                    {(item.action || (item as any).action2) && (
                      <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
                        {item.action && (
                          <a
                            href={item.action.href}
                            target={item.action.href.startsWith('http') ? '_blank' : undefined}
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: 4,
                              background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                              color: 'white', borderRadius: 8, padding: '7px 14px',
                              fontSize: '0.78rem', fontWeight: 600, textDecoration: 'none',
                              fontFamily: 'Inter, sans-serif',
                            }}
                          >
                            {item.action.label}
                          </a>
                        )}
                        {(item as any).action2 && (
                          <a
                            href={(item as any).action2.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: 4,
                              background: '#25d366', color: 'white', borderRadius: 8, padding: '7px 14px',
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
            display: 'flex', flexDirection: 'column',
          }}>
            <div
              className="contact-map-wrapper"
              style={{
                borderRadius: 24, overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
                border: '1px solid rgba(226,232,240,0.85)',
                flex: 1, minHeight: 440,
                background: '#e2e8f0',
              }}
            >
              <iframe
                title="Pearl Dental Clinic Location - Guwahati, Assam"
                loading="lazy"
                style={{ width: '100%', height: '100%', minHeight: 340, border: 'none', display: 'block' }}
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
              style={{ width: '100%', justifyContent: 'center', marginTop: 14, padding: '12px' }}
            >
              🗺️ Open in Google Maps (Get Directions)
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #contact {
            padding: 70px 0 !important;
          }
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .contact-map-wrapper {
            min-height: 320px !important;
          }
        }
        @media (max-width: 480px) {
          .contact-card {
            padding: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
