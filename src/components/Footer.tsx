import { CLINIC_INFO } from '../data/clinicData';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Team', href: '#team' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

const services = [
  'Teeth Whitening', 'Dental Implants', 'Invisalign / Braces',
  'Root Canal', 'Cosmetic Dentistry', 'Pediatric Dentistry',
  'Crowns & Bridges', 'General Dentistry',
];

interface FooterProps {
  onNavigateView?: (view: 'home' | 'gallery') => void;
}

export default function Footer({ onNavigateView }: FooterProps) {
  const handleNav = (href: string) => {
    if (href === '#gallery' && onNavigateView) {
      onNavigateView('home');
      setTimeout(() => {
        document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    if (onNavigateView) {
      onNavigateView('home');
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      color: 'rgba(255,255,255,0.75)',
      padding: '70px 0 0',
      overflow: 'hidden',
    }}>
      <div className="container">
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.5fr', gap: 40, marginBottom: 44 }}>
          {/* Brand Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.3rem', flexShrink: 0,
              }}>🦷</div>
              <div>
                <div style={{ color: 'white', fontFamily: 'Playfair Display, serif', fontSize: '1.25rem', fontWeight: 700 }}>
                  Pearl Dental Clinic
                </div>
                <div style={{ fontSize: '0.68rem', color: '#0ea5e9', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Guwahati, Assam
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.88rem', lineHeight: 1.8, marginBottom: 24, maxWidth: 320, color: 'rgba(255,255,255,0.7)' }}>
              {CLINIC_INFO.description}
            </p>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {[
                { icon: '📸', label: 'Instagram', href: CLINIC_INFO.social.instagram },
                { icon: '📘', label: 'Facebook', href: CLINIC_INFO.social.facebook },
                { icon: '▶️', label: 'YouTube', href: CLINIC_INFO.social.youtube },
                { icon: '💬', label: 'WhatsApp', href: `https://wa.me/${CLINIC_INFO.whatsapp}` },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank" rel="noopener noreferrer"
                  title={s.label}
                  style={{
                    width: 42, height: 42, borderRadius: 12,
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.15rem', textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(14,165,233,0.3)';
                    e.currentTarget.style.borderColor = 'rgba(14,165,233,0.5)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)';
                    e.currentTarget.style.transform = 'none';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <div style={{ color: 'white', fontWeight: 700, marginBottom: 18, fontSize: '0.95rem' }}>
              Quick Links
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, padding: 0 }}>
              {navLinks.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={e => { e.preventDefault(); handleNav(link.href); }}
                    style={{
                      color: 'rgba(255,255,255,0.7)', textDecoration: 'none',
                      fontSize: '0.88rem', fontFamily: 'Inter, sans-serif',
                      transition: 'color 0.2s',
                      display: 'flex', alignItems: 'center', gap: 8,
                      minHeight: 28,
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#7dd3fc'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                  >
                    → {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services + Clinic Contacts Column */}
          <div>
            <div style={{ color: 'white', fontWeight: 700, marginBottom: 18, fontSize: '0.95rem' }}>
              Our Treatments
            </div>
            <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 24, padding: 0 }}>
              {services.map(s => (
                <li key={s}>
                  <a
                    href="#services"
                    onClick={e => {
                      e.preventDefault();
                      handleNav('#services');
                    }}
                    style={{
                      color: 'rgba(255,255,255,0.65)', fontSize: '0.82rem',
                      textDecoration: 'none', fontFamily: 'Inter, sans-serif',
                      transition: 'color 0.2s',
                      display: 'block',
                      lineHeight: 1.4,
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#7dd3fc'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}
                  >
                    🦷 {s}
                  </a>
                </li>
              ))}
            </ul>

            {/* Direct Contact info box */}
            <div style={{
              background: 'rgba(14,165,233,0.1)',
              border: '1px solid rgba(14,165,233,0.22)',
              borderRadius: 16, padding: '16px 18px',
            }}>
              <div style={{ color: 'white', fontWeight: 600, fontSize: '0.85rem', marginBottom: 6 }}>📞 Front Desk</div>
              <div style={{ fontSize: '0.82rem', lineHeight: 1.7 }}>
                <a href={`tel:${CLINIC_INFO.phone}`} style={{ color: '#7dd3fc', textDecoration: 'none', fontWeight: 600 }}>{CLINIC_INFO.phone}</a>
                <div style={{ marginTop: 2, color: 'rgba(255,255,255,0.75)' }}>{CLINIC_INFO.email}</div>
                <div style={{ marginTop: 4, color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem' }}>
                  Housing Tiniali, Hengrabari Road<br />
                  Dispur, Guwahati 781036
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          padding: '24px 0',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 14,
        }}>
          <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>
            © {new Date().getFullYear()} Pearl Dental Clinic, Guwahati. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: 18, fontSize: '0.82rem', flexWrap: 'wrap' }}>
            {['Privacy Policy', 'Terms of Service', 'Dispur Clinic'].map(l => (
              <span key={l} style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Inter, sans-serif' }}>{l}</span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 32px !important;
          }
        }
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </footer>
  );
}
