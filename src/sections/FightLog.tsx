import { motion } from 'framer-motion';
import { useState } from 'react';
import { nextFight } from '../config/nextFight';

const fights = [
  {
    date: 'TBD',
    opponent: 'See @mannol.o for full fight record',
    result: '—',
    method: '—',
    round: '—',
    location: '—',
    image: '/images/fight-ko-martinez.jpg',
    placeholder: true,
  },
];

const upcoming = {
  date: `${nextFight.dayDisplay}, ${nextFight.dateDisplay}`,
  opponent: `${nextFight.opponent.name} — ${nextFight.opponent.weightClassLabel}`,
  venue: nextFight.venue,
  location: nextFight.city,
  rounds: `${nextFight.rounds} Rounds`,
  weight: nextFight.weightClass,
  image: '/images/fight-upcoming.jpg',
};

export default function FightLog() {
  const [activeFight, setActiveFight] = useState<number | null>(null);

  return (
    <section id="fights" className="relative w-full py-28 sm:py-36 px-6 sm:px-10 lg:px-16 overflow-hidden" style={{ backgroundColor: '#0c0b09' }}>
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'saturate(0.5) contrast(1.2)', opacity: 0.12 }}>
          <source src="/videos/fight-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #0c0b09 0%, rgba(12,11,9,0.85) 30%, rgba(12,11,9,0.85) 70%, #0c0b09 100%)' }} />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16 gap-4">
          <div>
            <p className="font-body text-[10px] uppercase tracking-[0.4em] mb-4" style={{ color: '#c9a84c' }}>Fight Log</p>
            <h2 className="font-display font-bold tracking-tight" style={{ fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 1.05, color: '#e8e6e3' }}>FIGHT RESULTS</h2>
          </div>
          <div className="text-right">
            <p className="font-display font-extrabold text-4xl" style={{ color: '#c41e1e' }}>3-0</p>
            <p className="font-body text-[9px] uppercase tracking-[0.2em] mt-1" style={{ color: '#5c5752' }}>Undefeated Record</p>
          </div>
        </motion.div>

        {/* Fight cards with photos */}
        <div className="space-y-5">
          {fights.map((fight, i) => {
            const isActive = activeFight === i;
            return (
              <motion.div
                key={fight.date}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer"
                style={{ backgroundColor: 'rgba(19, 18, 16, 0.6)', border: '2px solid #2a2724' }}
                onClick={() => setActiveFight(isActive ? null : i)}
                onMouseEnter={() => setActiveFight(i)}
              >
                <div className="grid grid-cols-1 md:grid-cols-12">
                  {/* Fight photo */}
                  <div className="md:col-span-5 relative h-48 md:h-auto">
                    <img src={fight.image} alt={fight.opponent} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 40%, rgba(12,11,9,0.95) 100%)' }} />
                    <div className="absolute top-4 left-4">
                      <span className="font-display font-bold text-xs uppercase px-3 py-1.5 rounded-md" style={{ backgroundColor: '#c41e1e', color: '#fff' }}>Placeholder</span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="font-display font-bold text-3xl" style={{ color: '#e8e6e3' }}>Record TBD</span>
                    </div>
                  </div>

                  {/* Fight info */}
                  <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-center">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-body text-[10px] uppercase tracking-[0.2em]" style={{ color: '#5c5752' }}>{fight.date}</span>
                      <span className="font-display text-[11px] font-bold uppercase" style={{ color: '#c41e1e' }}>{fight.result}</span>
                    </div>
                    <h3 className="font-display text-2xl font-bold tracking-tight mb-2" style={{ color: '#e8e6e3' }}>
                      {fight.opponent}
                    </h3>
                    <p className="font-body text-sm mb-4" style={{ color: '#7a756f' }}>
                      Placeholder only — no unverified opponent names or results are shown.
                    </p>

                    {/* TODO: Replace placeholder with verified fight history from BoxRec/Tapology */}
                    {isActive && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.4 }} className="flex gap-6 pt-4" style={{ borderTop: '1px solid #1a1816' }}>
                        {[{ l: 'Result', v: fight.result }, { l: 'Method', v: fight.method }, { l: 'Round', v: fight.round }].map((s) => (
                          <div key={s.l}><p className="font-body text-[9px] uppercase tracking-wider" style={{ color: '#5c5752' }}>{s.l}</p><p className="font-display font-bold text-sm mt-0.5" style={{ color: '#e8e6e3' }}>{s.v}</p></div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Bottom glow line */}
                <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(to right, transparent, #c41e1e, transparent)' }} />
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://www.instagram.com/mannol.o/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.3em]"
            style={{ color: '#c9a84c' }}
          >
            Full fight record on Instagram →
          </a>
        </div>

        {/* UPCOMING FIGHT preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 rounded-2xl overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(196, 30, 30, 0.08) 0%, rgba(201, 168, 76, 0.04) 100%)', border: '2px solid rgba(196, 30, 30, 0.25)' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-5 relative h-48 md:h-auto">
              <img src={upcoming.image} alt="Upcoming fight placeholder" className="w-full h-full object-cover opacity-50" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 40%, rgba(12,11,9,0.95) 100%)' }} />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#c41e1e' }} />
                <span className="font-body text-[10px] uppercase tracking-wider" style={{ color: '#c41e1e' }}>Upcoming</span>
              </div>
            </div>
            <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-center">
              <p className="font-body text-[10px] uppercase tracking-[0.3em] mb-2" style={{ color: '#c9a84c' }}>Next Fight — {upcoming.date}</p>
              <h3 className="font-display text-2xl font-bold tracking-tight mb-1" style={{ color: '#e8e6e3' }}>Manny De Anda vs {upcoming.opponent}</h3>
              <p className="font-body text-sm mb-4" style={{ color: '#7a756f' }}>
                {upcoming.venue} — {upcoming.location} &nbsp;|&nbsp; {upcoming.weight} &nbsp;|&nbsp; {upcoming.rounds}
              </p>
              <a href="#next-fight" className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 self-start"
                style={{ backgroundColor: '#c41e1e', color: '#fff' }} onClick={(e) => { e.preventDefault(); document.querySelector('#next-fight')?.scrollIntoView({ behavior: 'smooth' }); }}>
                View Countdown
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
