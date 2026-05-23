import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { ticketCtaUrl } from '../config/nextFight';

const navLinks = [
  { label: 'IN THE RING', href: '#stats' },
  { label: 'FIGHT LOG', href: '#fights' },
  { label: 'GALLERY', href: '#gallery' },
  { label: 'NEXT FIGHT', href: '#next-fight' },
  { label: 'CONNECT', href: '#connect' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backdropFilter: scrolled ? 'blur(20px) saturate(1.2)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.2)' : 'none',
          backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.85)' : 'transparent',
        }}>
        <div className="flex items-center justify-between px-6 sm:px-10 lg:px-16 h-20 max-w-[1600px] mx-auto">
          {/* Logo */}
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex flex-col leading-none">
            <span className="font-display font-bold text-[13px] tracking-[0.15em]" style={{ color: '#e8e6e3' }}>MANNY</span>
            <span className="font-display font-bold text-[13px] tracking-[0.15em]" style={{ color: '#e8e6e3' }}>DE ANDA</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}
                onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
                className="font-body text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 hover:text-[#c41e1e]"
                style={{ color: '#7a756f' }}>
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <a href={ticketCtaUrl} target="_blank" rel="noopener noreferrer" className="hidden sm:block font-display text-[11px] font-bold uppercase tracking-wider rounded-full px-6 py-2.5 transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: '#c41e1e', color: '#fff' }}>
              Tickets
            </a>
            <button className="lg:hidden" onClick={() => setMenuOpen(true)} aria-label="Menu">
              <Menu size={22} style={{ color: '#e8e6e3' }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
            style={{ backgroundColor: 'rgba(10, 10, 10, 0.97)' }}>
            <button className="absolute top-5 right-6" onClick={() => setMenuOpen(false)} aria-label="Close">
              <X size={26} style={{ color: '#e8e6e3' }} />
            </button>
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a key={link.href} href={link.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
                  className="font-display text-3xl tracking-wider hover:text-[#c41e1e] transition-colors duration-300"
                  style={{ color: '#e8e6e3' }}>
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
