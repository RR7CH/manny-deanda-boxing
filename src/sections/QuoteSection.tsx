import { motion } from 'framer-motion';

export default function QuoteSection() {
  return (
    <section className="relative w-full min-h-[80vh] flex items-center overflow-hidden" style={{ backgroundColor: '#0c0b09' }}>
      {/* Background video with overlay */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'saturate(0.6) contrast(1.1)', opacity: 0.35 }}
        >
          <source src="/videos/quote-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.7) 50%, rgba(10,10,10,0.9) 100%)' }} />
      </div>

      {/* Decorative large text */}
      <div className="absolute top-8 right-8 sm:right-16 z-[1] select-none pointer-events-none hidden lg:block">
        <span className="font-display font-extrabold leading-none stroke-text-dim" style={{ fontSize: 'clamp(80px, 12vw, 160px)' }}>
          READY
        </span>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - large quote */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-body text-[10px] uppercase tracking-[0.4em] mb-6" style={{ color: '#c41e1e' }}>
              The Fighter
            </p>
            <h2 className="font-display font-bold leading-[1.05] tracking-tight" style={{ fontSize: 'clamp(32px, 5vw, 56px)', color: '#e8e6e3' }}>
              I don&apos;t just fight to <span style={{ color: '#c41e1e' }}>win.</span>
              <br />
              I fight to leave a <span className="shimmer-gold">legacy.</span>
            </h2>
            <p className="font-body text-xs uppercase tracking-[0.3em] mt-8" style={{ color: '#5c5752' }}>
              — Manny &ldquo;Mannolo&rdquo; De Anda
            </p>
          </motion.div>

          {/* Right - side image grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 gap-3"
          >
            <div className="aspect-[3/4] rounded-xl overflow-hidden" style={{ border: '1px solid #2a2724' }}>
              <img src="/images/gallery/gallery-1.jpg" alt="" className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="aspect-[3/4] rounded-xl overflow-hidden mt-8" style={{ border: '1px solid #2a2724' }}>
              <img src="/images/gallery/gallery-2.jpg" alt="" className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity duration-500" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
