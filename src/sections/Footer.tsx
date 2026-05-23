import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden" style={{ backgroundColor: '#0a0a0a' }}>
      {/* Giant MANNY — bold, visible, pops */}
      <div className="relative py-20 select-none overflow-hidden">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }} className="text-center">
          <span className="font-display font-extrabold block leading-none tracking-tighter"
            style={{
              fontSize: 'clamp(100px, 22vw, 320px)',
              color: 'transparent',
              WebkitTextStroke: '2px rgba(196, 30, 30, 0.35)',
              textShadow: '0 0 80px rgba(196, 30, 30, 0.1)',
            }}>
            MANNY
          </span>
          {/* Subtitle under giant text */}
          <p className="font-body text-[10px] uppercase tracking-[0.6em] mt-6" style={{ color: '#5c5752' }}>
            The Mannolo &mdash; Undefeated Lightweight Prospect
          </p>
        </motion.div>
      </div>

      {/* Footer links bar */}
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 py-8" style={{ borderTop: '1px solid #1a1816' }}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <span className="font-display font-bold text-[13px] tracking-[0.15em]" style={{ color: '#e8e6e3' }}>MANNY DE ANDA</span>
            <span className="font-body text-[11px]" style={{ color: '#5c5752' }}>&copy; 2025 All Rights Reserved</span>
          </div>

          <div className="flex items-center gap-8">
            {[
              { label: 'Instagram', url: 'https://instagram.com/mannol.o' },
              { label: 'TikTok', url: 'https://tiktok.com/@mannol.o' },
              { label: 'YouTube', url: 'https://youtube.com/@yourdadmax' },
            ].map((link) => (
              <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer"
                className="font-body text-[11px] uppercase tracking-[0.15em] transition-colors duration-300 hover:text-[#c41e1e]"
                style={{ color: '#5c5752' }}>
                {link.label}
              </a>
            ))}
          </div>

          <span className="font-body text-[11px] uppercase tracking-[0.2em]" style={{ color: '#5c5752' }}>
            Houston, TX
          </span>
        </div>
      </div>
    </footer>
  );
}
