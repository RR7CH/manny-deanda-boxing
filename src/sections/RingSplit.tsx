import { motion } from 'framer-motion';

export default function RingSplit() {
  return (
    <section className="relative w-full py-24 sm:py-32 overflow-hidden" style={{ backgroundColor: '#0a0a0a' }}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left image - boxing gloves/gear */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 relative"
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden" style={{ border: '1px solid #2a2724' }}>
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: 'saturate(0.85) contrast(1.05)' }}
              >
                <source src="/videos/training-bg.mp4" type="video/mp4" />
              </video>
            </div>
          </motion.div>

          {/* Center - massive typography */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 text-center lg:text-left py-8"
          >
            <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 items-center lg:items-baseline justify-center lg:justify-start">
              <h2 className="font-display font-extrabold leading-[0.85] tracking-tight" style={{ fontSize: 'clamp(48px, 8vw, 100px)', color: '#c41e1e' }}>
                IN
              </h2>
              <h2 className="font-display font-extrabold leading-[0.85] tracking-tight" style={{ fontSize: 'clamp(48px, 8vw, 100px)', color: '#c41e1e' }}>
                THE
              </h2>
            </div>
            <h2 className="font-display font-extrabold leading-[0.85] tracking-tight" style={{ fontSize: 'clamp(48px, 8vw, 100px)', color: '#e8e6e3' }}>
              RING
            </h2>
            <p className="font-body text-sm mt-6 max-w-xs mx-auto lg:mx-0" style={{ color: '#7a756f' }}>
              Stats, fight results, career highlights and photos from inside the ropes.
            </p>
            <a href="#stats" className="inline-flex items-center gap-2 mt-6 font-body text-xs uppercase tracking-[0.2em] transition-colors duration-300 hover:text-[#c41e1e]"
              style={{ color: '#c9a84c' }} onClick={(e) => { e.preventDefault(); document.querySelector('#stats')?.scrollIntoView({ behavior: 'smooth' }); }}>
              Explore
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </motion.div>

          {/* Right image - outside ring */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden mb-6" style={{ border: '1px solid #2a2724' }}>
              <img
                src="/images/manny-training.jpg"
                alt="Manny training"
                className="w-full h-full object-cover"
                style={{ filter: 'saturate(0.85) contrast(1.05)' }}
              />
            </div>
            <div className="flex flex-col items-start">
              <h3 className="font-display font-extrabold leading-[0.85] tracking-tight" style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: '#e8e6e3' }}>
                OUTSIDE
              </h3>
              <h3 className="font-display font-extrabold leading-[0.85] tracking-tight" style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: '#7a756f' }}>
                THE RING
              </h3>
              <p className="font-body text-sm mt-4 max-w-xs" style={{ color: '#7a756f' }}>
                Training, community work, campaigns and life beyond boxing.
              </p>
              <a href="#gallery" className="inline-flex items-center gap-2 mt-4 font-body text-xs uppercase tracking-[0.2em] transition-colors duration-300 hover:text-[#c41e1e]"
                style={{ color: '#c9a84c' }} onClick={(e) => { e.preventDefault(); document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' }); }}>
                Explore
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
