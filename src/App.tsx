import Navigation from './sections/Navigation';
import HeroSection from './sections/HeroSection';
import RingSplit from './sections/RingSplit';
import QuoteSection from './sections/QuoteSection';
import StatsSection from './sections/StatsSection';
import FightLog from './sections/FightLog';
import Achievements from './sections/Achievements';
import Gallery from './sections/Gallery';
import NextFight from './sections/NextFight';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';
import { Toaster } from 'sonner';

function App() {
  return (
    <div className="grain" style={{ backgroundColor: '#0a0a0a', color: '#e8e6e3' }}>
      <Navigation />
      <HeroSection />
      <RingSplit />
      <QuoteSection />
      <StatsSection />
      <FightLog />
      <Gallery />
      <NextFight />
      <Achievements />
      <ContactSection />
      <Footer />
      <Toaster richColors position="bottom-right" />
    </div>
  );
}

export default App;
