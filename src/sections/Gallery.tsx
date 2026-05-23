import { motion } from 'framer-motion';

const images = [
  { src: '/images/gallery/gallery-1.jpg', label: 'Portrait', labelSub: '2024' },
  { src: '/images/gallery/gallery-2.jpg', label: 'Shadow Boxing', labelSub: 'Training' },
  { src: '/images/gallery/gallery-3.jpg', label: 'Fight Night', labelSub: 'KO Win' },
  { src: '/images/gallery/gallery-4.jpg', label: 'Pad Work', labelSub: 'Gym' },
  { src: '/images/gallery/gallery-5.jpg', label: 'Roadwork', labelSub: 'Morning Run' },
  { src: '/images/gallery/gallery-6.jpg', label: 'Victory', labelSub: 'Champion' },
  { src: '/images/gallery/gallery-7.jpg', label: 'Skipping', labelSub: 'Conditioning' },
  { src: '/images/gallery/gallery-8.jpg', label: 'Hand Wraps', labelSub: 'Pre-Fight' },
  { src: '/images/gallery/gallery-9.jpg', label: 'Core Work', labelSub: 'Strength' },
];

export default function Gallery() {
  return (
    <section id="gallery" className="relative w-full py-28 sm:py-36 px-6 sm:px-10 lg:px-16" style={{ backgroundColor: '#0c0b09' }}>
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
          <div>
            <p className="font-body text-[10px] uppercase tracking-[0.4em] mb-4" style={{ color: '#c9a84c' }}>
              Photos & Highlights
            </p>
            <h2 className="font-display font-bold tracking-tight" style={{ fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 1.05, color: '#e8e6e3' }}>
              GALLERY
            </h2>
          </div>
          <a href="#" className="inline-flex items-center gap-2 font-body text-xs uppercase tracking-[0.2em] transition-colors duration-300 hover:text-[#c41e1e]"
            style={{ color: '#c9a84c' }}>
            View All
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>

        {/* Image grid - masonry style */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map((img, i) => {
            const isLarge = i === 0 || i === 4;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-500 ${isLarge ? 'row-span-2' : ''}`}
                style={{ border: '1px solid #2a2724', aspectRatio: isLarge ? '3/4' : '1/1' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#c41e1e'; e.currentTarget.style.transform = 'scale(1.02)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#2a2724'; e.currentTarget.style.transform = 'scale(1)'; }}
              >
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="font-display font-bold text-sm" style={{ color: '#e8e6e3' }}>{img.label}</p>
                    <p className="font-body text-[10px] uppercase tracking-wider" style={{ color: '#c9a84c' }}>{img.labelSub}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
