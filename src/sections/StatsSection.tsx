import { useRef, useState, useEffect } from 'react';
import { useScrambleNumber } from '../hooks/useScrambleNumber';
import { motion } from 'framer-motion';

const skills = [
  { name: 'SPEED', value: 92, desc: 'Lightning-fast hands and footwork' },
  { name: 'POWER', value: 88, desc: 'Explosive knockout force' },
  { name: 'DEFENSE', value: 85, desc: 'Elusive head movement & guard' },
  { name: 'STAMINA', value: 90, desc: 'Relentless pressure for 12 rounds' },
];

interface StatItemProps { target: number; suffix: string; label: string; sublabel: string; isVisible: boolean; delay: number; }
function StatItem({ target, suffix, label, sublabel, isVisible, delay }: StatItemProps) {
  const [show, setShow] = useState(false);
  const value = useScrambleNumber(target, show);
  useEffect(() => { if (isVisible) { const t = setTimeout(() => setShow(true), delay); return () => clearTimeout(t); } }, [isVisible, delay]);
  return (
    <div className="relative py-6 group cursor-default">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, #c41e1e, transparent)' }} />
      <div className="font-display font-extrabold leading-none group-hover:scale-110 transition-transform duration-500 origin-left" style={{ fontSize: 'clamp(48px, 8vw, 96px)', color: '#c41e1e' }}>{value}{suffix}</div>
      <div className="font-body text-[11px] uppercase tracking-[0.35em] mt-3 font-medium" style={{ color: '#e8e6e3' }}>{label}</div>
      <div className="font-body text-[10px] uppercase tracking-[0.2em] mt-1" style={{ color: '#5c5752' }}>{sublabel}</div>
    </div>
  );
}

const bigStats = [
  { target: 3, suffix: '', label: 'WINS', sublabel: 'Professional Record' },
  { target: 2, suffix: '', label: 'KOs', sublabel: 'Knockout Power' },
  { target: 72, suffix: '"', label: 'REACH', sublabel: 'Inches' },
  { target: 0, suffix: '', label: 'LOSSES', sublabel: 'Unbeaten' },
];

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeSkill, setActiveSkill] = useState<number | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="stats" ref={ref} className="relative w-full py-28 sm:py-36 px-6 sm:px-10 lg:px-16 overflow-hidden" style={{ backgroundColor: '#0a0a0a' }}>
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="mb-16">
          <p className="font-body text-[10px] uppercase tracking-[0.4em] mb-4" style={{ color: '#c9a84c' }}>Professional Career</p>
          <h2 className="font-display font-bold tracking-tight" style={{ fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 1.05, color: '#e8e6e3' }}>CAREER STATS</h2>
        </motion.div>

        {/* Big numbers grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 mb-20">
          {bigStats.map((s, i) => <StatItem key={s.label} {...s} isVisible={visible} delay={i * 150} />)}
        </div>

        {/* Interactive area — Manny photo + animated bar graph + skill cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left — Manny photo */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="lg:col-span-4">
            <div className="sticky top-24">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden" style={{ border: '2px solid #2a2724' }}>
                <img src="/images/manny-hero.jpg" alt="Manny De Anda" className="w-full h-full object-cover object-top" style={{ filter: 'contrast(1.05) saturate(0.85)' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.9) 0%, transparent 40%)' }} />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-display font-bold text-xl" style={{ color: '#e8e6e3' }}>Manny De Anda</p>
                  <p className="font-body text-xs mt-1" style={{ color: '#c41e1e' }}>Lightweight | 3-0 (2 KOs)</p>
                </div>
              </div>
              {/* Mini bio card */}
              <div className="mt-4 p-5 rounded-xl" style={{ backgroundColor: '#131210', border: '1px solid #2a2724' }}>
                <p className="font-body text-[13px] leading-[1.7]" style={{ color: '#8a8580' }}>
                  Known for his <span style={{ color: '#c41e1e' }}>explosive power</span>, lightning-fast hands, and relentless pressure fighting style. Training at the De Anda Brothers Boxing Club.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right — Animated bar graph + interactive skill cards */}
          <div className="lg:col-span-8">
            <p className="font-body text-[10px] uppercase tracking-[0.4em] mb-8" style={{ color: '#c9a84c' }}>Fight Attributes</p>

            {/* Animated bar graph */}
            <div className="space-y-6 mb-12">
              {skills.map((skill, i) => {
                const isActive = activeSkill === i;
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="group cursor-pointer"
                    onClick={() => setActiveSkill(isActive ? null : i)}
                    onMouseEnter={() => setActiveSkill(i)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-3">
                        <span className="font-display font-bold text-lg" style={{ color: isActive ? '#c41e1e' : '#e8e6e3' }}>{skill.name}</span>
                        {isActive && <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#c41e1e' }} />}
                      </div>
                      <span className="font-display font-bold text-2xl" style={{ color: '#c41e1e' }}>{skill.value}</span>
                    </div>
                    {/* Bar track */}
                    <div className="w-full h-6 rounded-full overflow-hidden relative" style={{ backgroundColor: '#1a1816' }}>
                      {/* Animated fill */}
                      <motion.div
                        className="h-full rounded-full relative"
                        style={{ background: isActive ? 'linear-gradient(to right, #8a1515, #c41e1e, #e02828)' : 'linear-gradient(to right, #4a1515, #8a1515, #c41e1e)' }}
                        initial={{ width: '0%' }}
                        whileInView={{ width: `${skill.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {/* Shimmer effect on bar */}
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)', backgroundSize: '200% 100%', animation: 'shimmerGold 2s linear infinite' }} />
                      </motion.div>
                      {/* Ticks */}
                      <div className="absolute inset-0 flex justify-between px-4 items-center pointer-events-none">
                        {[25, 50, 75].map((t) => (
                          <div key={t} className="w-px h-3" style={{ backgroundColor: 'rgba(42,39,36,0.5)', marginLeft: `${t}%` }} />
                        ))}
                      </div>
                    </div>
                    {/* Description bubble when active */}
                    {isActive && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.3 }} className="mt-3 p-4 rounded-xl" style={{ backgroundColor: 'rgba(196, 30, 30, 0.06)', border: '1px solid rgba(196, 30, 30, 0.15)' }}>
                        <p className="font-body text-sm" style={{ color: '#b5b0ab' }}>{skill.desc}</p>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Quick bio text with highlighted keywords */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: 'FIGHTING STYLE', text: 'Explosive power, lightning-fast hands, and relentless pressure. Every fight is a statement.', color: '#c41e1e' },
                { title: 'TRAINING', text: 'De Anda Brothers Boxing Club — Mexican boxing tradition meets modern athleticism.', color: '#c9a84c' },
                { title: 'DIVISION', text: 'Lightweight prospect making waves. 72" reach, orthodox stance, 22 years old.', color: '#c41e1e' },
                { title: 'LEGACY', text: '3-0 with 2 KOs. Every fight is one step closer to the title.', color: '#c9a84c' },
              ].map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="p-5 rounded-xl cursor-default transition-all duration-300 hover:-translate-y-1"
                  style={{ backgroundColor: '#131210', border: '1px solid #2a2724' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = card.color; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#2a2724'; }}
                >
                  <p className="font-body text-[9px] uppercase tracking-[0.3em] mb-2" style={{ color: card.color }}>{card.title}</p>
                  <p className="font-body text-[13px] leading-[1.7]" style={{ color: '#8a8580' }}>{card.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
