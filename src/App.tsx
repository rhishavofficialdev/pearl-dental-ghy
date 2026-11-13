import { useState, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import InstagramGallery from './components/InstagramGallery';
import GalleryPage from './components/GalleryPage';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { CLINIC_INFO } from './data/clinicData';

export default function App() {
  const [view, setView] = useState<'home' | 'gallery'>('home');

  useEffect(() => {
    // Check initial hash for deep linking
    const handleHash = () => {
      if (window.location.hash === '#/gallery') {
        setView('gallery');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setView('home');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavigateView = (newView: 'home' | 'gallery') => {
    setView(newView);
    if (newView === 'gallery') {
      window.location.hash = '#/gallery';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (window.location.hash === '#/gallery') {
        history.replaceState(null, '', window.location.pathname);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <HelmetProvider>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar activeView={view} onNavigateView={handleNavigateView} />

        <main style={{ flex: 1 }}>
          {view === 'gallery' ? (
            <GalleryPage onBackToHome={() => handleNavigateView('home')} />
          ) : (
            <>
              <Hero />
              <About />
              <Services />
              <InstagramGallery onOpenFullGallery={() => handleNavigateView('gallery')} />
              <Team />
              <Testimonials />
              <FAQ />
              <Contact />
            </>
          )}
        </main>

        <Footer onNavigateView={handleNavigateView} />

        {/* Floating WhatsApp Action Button */}
        <a
          href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=Hi%20Pearl%20Dental%2C%20I%20would%20like%20to%20inquire%20about%20dental%20appointments.`}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-float"
          aria-label="Chat with Pearl Dental Clinic on WhatsApp"
          title="Chat with us on WhatsApp"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.053-.941-.05-.297-.099-.68-.224-1.17-.436-2.08-.899-3.435-3.04-3.539-3.18-.104-.14-0.843-1.121-.843-2.138 0-1.017.533-1.517.722-1.724.189-.208.413-.26.551-.26.138 0 .276.002.396.008.125.006.294-.047.46.353.172.417.587 1.433.639 1.538.052.104.086.229.017.368-.069.14-.104.228-.208.35-.104.122-.218.272-.312.366-.104.103-.213.216-.092.424.121.208.539.889 1.156 1.438.794.708 1.464.928 1.672 1.032.208.104.329.087.451-.052.121-.14.519-.604.657-.812.138-.208.276-.173.467-.104.19.069 1.209.57 1.416.674.207.104.346.156.398.243.052.087.052.504-.092.909z" />
          </svg>
        </a>
      </div>
    </HelmetProvider>
  );
}
