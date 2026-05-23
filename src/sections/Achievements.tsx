import { motion } from 'framer-motion';

const achievements = [
  { title: 'Undefeated 3-0', subtitle: 'Professional Record', year: '2024', icon: '3-0', highlight: true },
  { title: '2 Knockout Wins', subtitle: 'Finishing Power', year: '2024', icon: '2 KO', highlight: false },
  { title: 'Golden Gloves Finalist', subtitle: 'California', year: '2023', icon: 'GG', highlight: false },
  { title: 'Rising Prospect', subtitle: 'Prospect of the Year', year: '2024', icon: '★', highlight: false },
];

export default function Achievements() {
  return (
    <section className="relative w-full py-28 sm:py-36 px-6 sm:px-10 lg:px-16 overflow-hidden" style={{ backgroundColor: '#0a0a0a' }}>
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-12">
          <p className="font-body text-[10px] uppercase tracking-[0.4em] mb-4" style={{ color: '#c9a84c' }}>Career Highlights</p>
          <h2 className="font-display font-bold tracking-tight" style={{ fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 1.05, color: '#e8e6e3' }}>ACHIEVEMENTS</h2>
        </motion.div>

        {/* Featured 3-0 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 py-14 text-center rounded-2xl"
          style={{ background: 'linear-gradient(135deg, rgba(196,30,30,0.06) 0%, rgba(201,168,76,0.04) 100%)', border: '1px solid #2a2724' }}
        >
          <span className="font-display font-extrabold leading-none shimmer-gold" style={{ fontSize: 'clamp(80px, 14vw, 200px)' }}>3-0</span>
          <p className="font-body text-[11px] uppercase tracking-[0.35em] mt-4" style={{ color: '#5c5752' }}>UNDEFEATED PROFESSIONAL RECORD</p>
        </motion.div>

        {/* Achievement cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((ach, i) => (
            <motion.div
              key={ach.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative rounded-xl p-6 text-center transition-all duration-500 cursor-default overflow-hidden group"
              style={{ background: ach.highlight ? 'linear-gradient(180deg, rgba(196,30,30,0.08) 0%, rgba(15,13,11,0.5) 100%)' : 'linear-gradient(180deg, rgba(26,24,22,0.8) 0%, rgba(15,13,11,0.5) 100%)', border: `2px solid ${ach.highlight ? 'rgba(196,30,30,0.25)' : '#2a2724'}` }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#c41e1e'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = ach.highlight ? 'rgba(196,30,30,0.25)' : '#2a2724'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-px" style={{ background: 'linear-gradient(to right, transparent, #c41e1e, transparent)' }} />
              <div className="absolute top-4 right-4"><span className="font-body text-[9px] uppercase tracking-wider" style={{ color: '#5c5752' }}>{ach.year}</span></div>
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(196, 30, 30, 0.08)', border: '1px solid rgba(196, 30, 30, 0.2)' }}>
                <span className="font-display font-bold text-sm" style={{ color: '#c41e1e' }}>{ach.icon}</span>
              </div>
              <h3 className="font-display font-bold text-sm tracking-tight mb-1" style={{ color: '#e8e6e3' }}>{ach.title}</h3>
              <p className="font-body text-[10px] uppercase tracking-[0.2em]" style={{ color: '#5c5752' }}>{ach.subtitle}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
