import { useRef, useEffect, useState } from 'react';
import { FAQS } from '../data/clinicData';

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

export default function FAQ() {
  const { ref, inView } = useInView();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" ref={ref as any} style={{ padding: '100px 0', background: '#f8fafc' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 80, alignItems: 'start' }}>
          {/* Left side */}
          <div style={{
            opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(-30px)',
            transition: 'all 0.7s ease',
            position: 'sticky', top: 120,
          }}>
            <div className="section-tag">❓ FAQ</div>
            <h2 className="section-title">Frequently Asked <span>Questions</span></h2>
            <div className="divider" />
            <p className="section-subtitle">
              Have questions about our dental services? We've answered the most common ones below. Can't find your answer?
            </p>
            <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <a
                href="https://wa.me/919729148975?text=Hi%20Pearl%20Dental%2C%20I%20have%20a%20question."
                target="_blank" rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ width: 'fit-content' }}
              >
                💬 Ask on WhatsApp
              </a>
              <a
                href="tel:+919729148975"
                className="btn btn-secondary"
                style={{ width: 'fit-content' }}
              >
                📞 Call Us Now
              </a>
            </div>

            {/* Quick contact card */}
            <div style={{
              marginTop: 32, padding: '20px 24px',
              background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
              borderRadius: 20, color: 'white',
            }}>
              <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 8 }}>📍 Visit Us</div>
              <div style={{ fontSize: '0.88rem', opacity: 0.9, lineHeight: 1.7 }}>
                Pearl Dental Clinic<br />
                Guwahati, Assam 781007<br />
                Mon–Sat: 9AM–8PM<br />
                Sunday: 10AM–4PM
              </div>
            </div>
          </div>

          {/* Right: FAQ accordion */}
          <div style={{
            opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(30px)',
            transition: 'all 0.7s ease 0.2s',
          }}>
            {FAQS.map((faq, i) => (
              <div
                key={i}
                style={{
                  marginBottom: 12,
                  border: openIndex === i ? '1px solid rgba(14,165,233,0.4)' : '1px solid rgba(226,232,240,0.8)',
                  borderRadius: 16,
                  overflow: 'hidden',
                  background: 'white',
                  boxShadow: openIndex === i ? '0 8px 30px rgba(14,165,233,0.1)' : 'none',
                  transition: 'all 0.3s',
                }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  style={{
                    width: '100%', padding: '20px 24px',
                    background: 'none', border: 'none',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    cursor: 'pointer', textAlign: 'left',
                    gap: 16,
                  }}
                >
                  <span style={{
                    fontWeight: 600, fontSize: '0.95rem',
                    color: openIndex === i ? '#0ea5e9' : '#0f172a',
                    fontFamily: 'Inter, sans-serif',
                    transition: 'color 0.2s',
                  }}>
                    {faq.q}
                  </span>
                  <span style={{
                    width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: openIndex === i ? '#0ea5e9' : '#f1f5f9',
                    color: openIndex === i ? 'white' : '#64748b',
                    fontSize: '1.1rem', fontWeight: 700,
                    transition: 'all 0.3s',
                    transform: openIndex === i ? 'rotate(45deg)' : 'none',
                  }}>
                    +
                  </span>
                </button>
                {openIndex === i && (
                  <div style={{
                    padding: '0 24px 20px',
                    color: '#64748b', fontSize: '0.9rem',
                    lineHeight: 1.75,
                    animation: 'fadeInUp 0.3s ease',
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
          #faq .container > div {
            grid-template-columns: 1fr !important;
          }
          #faq .container > div > div:first-child {
            position: static !important;
          }
        }
      `}</style>
    </section>
  );
}
