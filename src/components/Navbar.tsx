import { useState, useEffect } from 'react';

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

interface NavbarProps {
  activeView?: 'home' | 'gallery';
  onNavigateView?: (view: 'home' | 'gallery') => void;
}

export default function Navbar({ activeView = 'home', onNavigateView }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    if (activeView === 'gallery') {
      setActiveSection('gallery');
      return;
    }

    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map(l => l.href.slice(1));
      for (const s of sections.reverse()) {
        const el = document.getElementById(s);
        if (el && window.scrollY >= el.offsetTop - 130) {
          setActiveSection(s);
          break;
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [activeView]);

  const handleNav = (href: string) => {
    setMobileOpen(false);

    if (activeView === 'gallery') {
      if (href === '#gallery') return;
      if (onNavigateView) onNavigateView('home');
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBook = () => {
    setMobileOpen(false);
    if (activeView === 'gallery') {
      if (onNavigateView) onNavigateView('home');
      setTimeout(() => {
        const el = document.querySelector('.booking-card');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        else document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    const el = document.querySelector('.booking-card');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    else document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) setMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isNavWhiteBackground = scrolled || activeView === 'gallery';

  return (
    <>
      <header
        id="navbar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: isNavWhiteBackground ? 'rgba(255,255,255,0.98)' : 'transparent',
          backdropFilter: isNavWhiteBackground ? 'blur(20px)' : 'none',
          boxShadow: isNavWhiteBackground ? '0 1px 20px rgba(0,0,0,0.08)' : 'none',
          transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
          padding: isNavWhiteBackground ? '10px 0' : '18px 0',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <a
            href="#home"
            onClick={e => {
              e.preventDefault();
              handleNav('#home');
            }}
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                boxShadow: '0 4px 15px rgba(14,165,233,0.35)',
                flexShrink: 0,
              }}
            >
              🦷
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: isNavWhiteBackground ? '#0f172a' : 'white',
                  lineHeight: 1.1,
                  transition: 'color 0.3s',
                }}
              >
                Pearl Dental
              </div>
              <div
                style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.14em',
                  color: isNavWhiteBackground ? '#0ea5e9' : 'rgba(255,255,255,0.85)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  transition: 'color 0.3s',
                }}
              >
                Clinic · Guwahati
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 2 }} className="desktop-nav">
            {navLinks.map(link => {
              const isActive = (activeView === 'gallery' && link.href === '#gallery') ||
                (activeView !== 'gallery' && activeSection === link.href.slice(1));
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={e => {
                    e.preventDefault();
                    handleNav(link.href);
                  }}
                  style={{
                    padding: '8px 12px',
                    borderRadius: 8,
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    color: isActive
                      ? '#0ea5e9'
                      : isNavWhiteBackground
                        ? '#334155'
                        : 'rgba(255,255,255,0.92)',
                    background: isActive ? 'rgba(14,165,233,0.1)' : 'transparent',
                    transition: 'all 0.2s',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA Button */}
          <button
            onClick={handleBook}
            className="btn btn-primary desktop-nav"
            style={{ fontSize: '0.85rem', padding: '9px 18px', cursor: 'pointer', border: 'none' }}
          >
            📅 Book Now
          </button>

          {/* Mobile Hamburger Button */}
          <button
            className="mobile-nav"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: isNavWhiteBackground ? 'rgba(15,23,42,0.05)' : 'rgba(255,255,255,0.15)',
              border: 'none',
              borderRadius: 10,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 5,
              width: 44,
              height: 44,
              padding: 10,
              transition: 'background 0.2s',
            }}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {[0, 1, 2].map(i => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: 22,
                  height: 2,
                  borderRadius: 2,
                  background: isNavWhiteBackground ? '#0f172a' : 'white',
                  transition: 'all 0.3s ease',
                  transform: mobileOpen && i === 0 ? 'rotate(45deg) translateY(7px)' :
                    mobileOpen && i === 1 ? 'scaleX(0)' :
                      mobileOpen && i === 2 ? 'rotate(-45deg) translateY(-7px)' : 'none',
                }}
              />
            ))}
          </button>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileOpen && (
          <div
            className="mobile-menu-drawer"
            style={{
              background: '#ffffff',
              boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
              borderTop: '1px solid #f1f5f9',
              padding: '16px 20px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              maxHeight: 'calc(100vh - 70px)',
              overflowY: 'auto',
              animation: 'slideDown 0.25s ease-out',
            }}
          >
            {navLinks.map(link => {
              const isActive = (activeView === 'gallery' && link.href === '#gallery') ||
                (activeView !== 'gallery' && activeSection === link.href.slice(1));
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={e => {
                    e.preventDefault();
                    handleNav(link.href);
                  }}
                  style={{
                    padding: '12px 16px',
                    borderRadius: 10,
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: isActive ? '#0ea5e9' : '#1e293b',
                    background: isActive ? 'rgba(14,165,233,0.1)' : '#f8fafc',
                    fontFamily: 'Inter, sans-serif',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    minHeight: '44px',
                    boxSizing: 'border-box',
                  }}
                >
                  <span>{link.label}</span>
                  {isActive && <span style={{ color: '#0ea5e9' }}>●</span>}
                </a>
              );
            })}

            <button
              onClick={handleBook}
              className="btn btn-primary"
              style={{
                marginTop: 10,
                justifyContent: 'center',
                cursor: 'pointer',
                border: 'none',
                width: '100%',
                padding: '13px',
                fontSize: '0.95rem',
              }}
            >
              📅 Book Appointment Now
            </button>
          </div>
        )}
      </header>

      {/* Responsive Navigation Styles */}
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .desktop-nav { display: flex !important; }
        .mobile-nav { display: none !important; }

        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .mobile-nav { display: flex !important; }
        }
      `}</style>
    </>
  );
}
