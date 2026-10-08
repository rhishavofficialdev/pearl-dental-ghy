import { CLINIC_INFO } from '../data/clinicData';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
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

export default function Footer() {
  const handleNav = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      color: 'rgba(255,255,255,0.75)',
      padding: '60px 0 0',
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.5fr', gap: 48, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.3rem',
              }}>🦷</div>
              <div>
                <div style={{ color: 'white', fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', fontWeight: 700 }}>
                  Pearl Dental Clinic
                </div>
                <div style={{ fontSize: '0.7rem', color: '#0ea5e9', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Guwahati, Assam
                </div>
              </div>
            </div>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.8, marginBottom: 24, maxWidth: 300 }}>
              {CLINIC_INFO.description}
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              {[
                { icon: '📘', label: 'Facebook', href: CLINIC_INFO.social.facebook },
                { icon: '📸', label: 'Instagram', href: CLINIC_INFO.social.instagram },
                { icon: '▶️', label: 'YouTube', href: CLINIC_INFO.social.youtube },
                { icon: '💬', label: 'WhatsApp', href: `https://wa.me/${CLINIC_INFO.whatsapp}` },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank" rel="noopener noreferrer"
                  title={s.label}
                  style={{
                    width: 38, height: 38, borderRadius: 10,
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.1rem', textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(14,165,233,0.3)';
                    e.currentTarget.style.borderColor = 'rgba(14,165,233,0.5)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                    e.currentTarget.style.transform = 'none';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div style={{ color: 'white', fontWeight: 700, marginBottom: 20, fontSize: '0.95rem' }}>
              Quick Links
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {navLinks.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={e => { e.preventDefault(); handleNav(link.href); }}
                    style={{
                      color: 'rgba(255,255,255,0.65)', textDecoration: 'none',
                      fontSize: '0.875rem', fontFamily: 'Inter, sans-serif',
                      transition: 'color 0.2s',
                      display: 'flex', alignItems: 'center', gap: 8,
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#7dd3fc'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}
                  >
                    → {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services + Contact */}
          <div>
            <div style={{ color: 'white', fontWeight: 700, marginBottom: 20, fontSize: '0.95rem' }}>
              Our Services
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
              {services.map(s => (
                <li key={s}>
                  <a
                    href="#services"
                    onClick={e => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }}
                    style={{
                      color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem',
                      textDecoration: 'none', fontFamily: 'Inter, sans-serif',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#7dd3fc'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                  >
                    🦷 {s}
                  </a>
                </li>
              ))}
            </ul>

            {/* Contact info */}
            <div style={{
              background: 'rgba(14,165,233,0.1)',
              border: '1px solid rgba(14,165,233,0.2)',
              borderRadius: 16, padding: '16px 18px',
            }}>
              <div style={{ color: 'white', fontWeight: 600, fontSize: '0.85rem', marginBottom: 8 }}>📞 Contact</div>
              <div style={{ fontSize: '0.82rem', lineHeight: 1.7 }}>
                <div>{CLINIC_INFO.phone}</div>
                <div>{CLINIC_INFO.email}</div>
                <div style={{ marginTop: 6, color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem' }}>
                  Guwahati, Assam 781006
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          padding: '20px 0',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 12,
        }}>
          <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)' }}>
            © {new Date().getFullYear()} Pearl Dental Clinic, Guwahati. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: 20, fontSize: '0.82rem' }}>
            {['Privacy Policy', 'Terms of Service', 'Sitemap'].map(l => (
              <a key={l} href="#" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontFamily: 'Inter, sans-serif' }}>{l}</a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          footer .container > div:first-child {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          footer .container > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
