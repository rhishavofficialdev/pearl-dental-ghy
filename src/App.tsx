import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Appointment from './components/Appointment';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <HelmetProvider>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Team />
        <Testimonials />
        <FAQ />
        <Appointment />
        <Contact />
      </main>
      <Footer />
    </HelmetProvider>
  );
}
