import { useState, useEffect } from 'react';
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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = navLinks.map(l => l.href.slice(1));
      for (const s of sections.reverse()) {
        const el = document.getElementById(s);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(s);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        id="navbar"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          boxShadow: scrolled ? '0 1px 20px rgba(0,0,0,0.08)' : 'none',
          transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
          padding: scrolled ? '12px 0' : '20px 0',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <a href="#home" onClick={e => { e.preventDefault(); handleNav('#home'); }} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.3rem', boxShadow: '0 4px 15px rgba(14,165,233,0.3)',
              flexShrink: 0,
            }}>🦷</div>
            <div>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.25rem', fontWeight: 700,
                color: scrolled ? '#0f172a' : 'white',
                lineHeight: 1.1,
                transition: 'color 0.4s',
              }}>Pearl Dental</div>
              <div style={{
                fontSize: '0.68rem', letterSpacing: '0.12em',
                color: scrolled ? '#0ea5e9' : 'rgba(255,255,255,0.8)',
                fontWeight: 600, textTransform: 'uppercase',
                transition: 'color 0.4s',
              }}>Clinic</div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="desktop-nav">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={e => { e.preventDefault(); handleNav(link.href); }}
                style={{
                  padding: '8px 14px',
                  borderRadius: 8,
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: activeSection === link.href.slice(1)
                    ? '#0ea5e9'
                    : scrolled ? '#334155' : 'rgba(255,255,255,0.9)',
                  background: activeSection === link.href.slice(1) ? 'rgba(14,165,233,0.1)' : 'transparent',
                  transition: 'all 0.2s',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <a
            href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=Hi%20Pearl%20Dental%2C%20I%20want%20to%20book%20an%20appointment.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary desktop-nav"
            style={{ fontSize: '0.85rem', padding: '10px 20px' }}
          >
            📅 Book Now
          </a>

          {/* Mobile Hamburger */}
          <button
            className="mobile-nav"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', gap: 5, padding: 8,
            }}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', width: 24, height: 2, borderRadius: 2,
                background: scrolled ? '#0f172a' : 'white',
                transition: 'all 0.3s',
                transform: mobileOpen && i === 0 ? 'rotate(45deg) translateY(10px)' :
                  mobileOpen && i === 1 ? 'scaleX(0)' :
                  mobileOpen && i === 2 ? 'rotate(-45deg) translateY(-10px)' : 'none',
              }} />
            ))}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div style={{
            background: 'white',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            padding: '20px 24px 24px',
            display: 'flex', flexDirection: 'column', gap: 4,
          }}>
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={e => { e.preventDefault(); handleNav(link.href); }}
                style={{
                  padding: '12px 16px', borderRadius: 10, textDecoration: 'none',
                  fontSize: '0.95rem', fontWeight: 500,
                  color: activeSection === link.href.slice(1) ? '#0ea5e9' : '#334155',
                  background: activeSection === link.href.slice(1) ? 'rgba(14,165,233,0.1)' : 'transparent',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=Hi%20Pearl%20Dental%2C%20I%20want%20to%20book%20an%20appointment.`}
              target="_blank" rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ marginTop: 8, justifyContent: 'center' }}
            >
              📅 Book Appointment
            </a>
          </div>
        )}
      </header>

      {/* Responsive Styles */}
      <style>{`
        .desktop-nav { display: flex !important; }
        .mobile-nav { display: none !important; }
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-nav { display: flex !important; }
        }
      `}</style>
    </>
  );
}
