import { useRef, useEffect, useState } from 'react';
import { FAQS, CLINIC_INFO } from '../data/clinicData';

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

export default function FAQ() {
  const { ref, inView } = useInView();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" ref={ref as any} style={{ padding: '100px 0', background: '#f8fafc', overflow: 'hidden' }}>
      <div className="container">
        <div className="faq-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 60, alignItems: 'start' }}>
          {/* Left side */}
          <div
            className="faq-left"
            style={{
              opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(-30px)',
              transition: 'all 0.7s ease',
              position: 'sticky', top: 100,
            }}
          >
            <div className="section-tag">
              <span>❓</span>
              <span>Common Questions</span>
            </div>
            <h2 className="section-title">Frequently Asked <span>Questions</span></h2>
            <div className="divider" />
            <p className="section-subtitle">
              Have questions about dental treatments, procedures, pricing, or safety? We've answered the most frequent inquiries below.
            </p>

            <div className="faq-btn-group" style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <a
                href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=Hi%20Pearl%20Dental%2C%20I%20have%20a%20question%20regarding%20dental%20treatment.`}
                target="_blank" rel="noopener noreferrer"
                className="btn btn-primary faq-action-btn"
                style={{ width: 'fit-content' }}
              >
                💬 Ask on WhatsApp
              </a>
              <a
                href={`tel:${CLINIC_INFO.phone}`}
                className="btn btn-secondary faq-action-btn"
                style={{ width: 'fit-content' }}
              >
                📞 Call Us Directly
              </a>
            </div>

            {/* Quick contact card */}
            <div style={{
              marginTop: 28, padding: '20px 22px',
              background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
              borderRadius: 20, color: 'white',
              boxShadow: '0 10px 30px rgba(14,165,233,0.25)',
            }}>
              <div style={{ fontWeight: 700, fontSize: '0.98rem', marginBottom: 8 }}>📍 Pearl Dental Clinic</div>
              <div style={{ fontSize: '0.85rem', opacity: 0.95, lineHeight: 1.7 }}>
                Hengrabari Road, Housing Tiniali<br />
                Near Prajapati Bhawan, Dispur, Guwahati 781036<br />
                <span style={{ fontWeight: 600, marginTop: 4, display: 'inline-block' }}>
                  🕒 Mon–Sat: 8:00 AM – 8:00 PM | Sun: 8:00 AM – 2:30 PM
                </span>
              </div>
            </div>
          </div>

          {/* Right: FAQ accordion */}
          <div
            className="faq-right"
            style={{
              opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(30px)',
              transition: 'all 0.7s ease 0.2s',
            }}
          >
            {FAQS.map((faq, i) => (
              <div
                key={i}
                style={{
                  marginBottom: 12,
                  border: openIndex === i ? '1px solid rgba(14,165,233,0.5)' : '1px solid rgba(226,232,240,0.85)',
                  borderRadius: 16,
                  overflow: 'hidden',
                  background: 'white',
                  boxShadow: openIndex === i ? '0 8px 30px rgba(14,165,233,0.08)' : '0 2px 8px rgba(0,0,0,0.02)',
                  transition: 'all 0.25s',
                }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  style={{
                    width: '100%', padding: '18px 20px',
                    background: 'none', border: 'none',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    cursor: 'pointer', textAlign: 'left',
                    gap: 16,
                  }}
                >
                  <span style={{
                    fontWeight: 600, fontSize: '0.94rem',
                    color: openIndex === i ? '#0ea5e9' : '#0f172a',
                    fontFamily: 'Inter, sans-serif',
                    transition: 'color 0.2s',
                    lineHeight: 1.4,
                  }}>
                    {faq.q}
                  </span>
                  <span style={{
                    width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: openIndex === i ? '#0ea5e9' : '#f1f5f9',
                    color: openIndex === i ? 'white' : '#64748b',
                    fontSize: '1.2rem', fontWeight: 700,
                    transition: 'all 0.25s',
                    transform: openIndex === i ? 'rotate(45deg)' : 'none',
                  }}>
                    +
                  </span>
                </button>
                {openIndex === i && (
                  <div style={{
                    padding: '0 20px 20px',
                    color: '#64748b', fontSize: '0.9rem',
                    lineHeight: 1.75,
                    borderTop: '1px solid #f1f5f9',
                    paddingTop: 14,
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #faq {
            padding: 70px 0 !important;
          }
          .faq-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .faq-left {
            position: static !important;
          }
          .faq-action-btn {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
}
