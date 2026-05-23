import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { nextFight, ticketCtaUrl } from '../config/nextFight';

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="rounded-xl p-4 sm:p-5 text-center min-w-[68px] sm:min-w-[88px]" style={{ backgroundColor: '#131210', border: '1.5px solid #2a2724' }}>
        <div className="font-display font-extrabold tabular-nums" style={{ fontSize: 'clamp(32px, 3.5vw, 52px)', color: '#c41e1e' }}>
          {String(value).padStart(2, '0')}
        </div>
        <div className="font-body text-[9px] uppercase tracking-[0.15em] mt-1" style={{ color: '#5c5752' }}>{label}</div>
      </div>
    </div>
  );
}

export default function NextFight() {
  const targetDate = useRef(new Date(nextFight.date).getTime());
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const calc = () => {
      const diff = targetDate.current - Date.now();
      if (diff <= 0) { setIsLive(true); return { days: 0, hours: 0, minutes: 0, seconds: 0 }; }
      setIsLive(false);
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };
    setTimeLeft(calc());
    const interval = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="next-fight" className="relative w-full py-28 sm:py-36 px-6 sm:px-10 lg:px-16 overflow-hidden">
      {/* VIBRANT gradient background — not just black */}
      <div className="absolute inset-0 z-0" style={{ background: 'radial-gradient(ellipse at 30% 20%, rgba(196, 30, 30, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(201, 168, 76, 0.08) 0%, transparent 50%), #0c0b09' }} />

      <div className="relative z-10 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT — Countdown + CTA */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: '#c41e1e' }} />
              <p className="font-body text-[10px] uppercase tracking-[0.4em]" style={{ color: '#c9a84c' }}>Upcoming Fight</p>
            </div>
            <h2 className="font-display font-bold tracking-tight mb-2" style={{ fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1.05, color: '#e8e6e3' }}>
              {nextFight.dateDisplay}
            </h2>
            <p className="font-body text-[15px] mb-10 max-w-md" style={{ color: '#7a756f' }}>
              Manny steps back into the ring at the <span style={{ color: '#c41e1e' }}>{nextFight.venue}</span>, {nextFight.city}. Don&apos;t miss it.
            </p>

            {/* LIVE or Countdown */}
            {isLive ? (
              <div className="mb-10 p-6 rounded-xl text-center" style={{ backgroundColor: 'rgba(196, 30, 30, 0.1)', border: '2px solid #c41e1e' }}>
                <p className="font-display font-extrabold text-4xl" style={{ color: '#c41e1e' }}>LIVE NOW</p>
                <p className="font-body text-sm mt-2" style={{ color: '#7a756f' }}>The fight is happening!</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-3 mb-10">
                <CountdownUnit value={timeLeft.days} label="DAYS" />
                <CountdownUnit value={timeLeft.hours} label="HRS" />
                <CountdownUnit value={timeLeft.minutes} label="MIN" />
                <CountdownUnit value={timeLeft.seconds} label="SEC" />
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <a href={ticketCtaUrl} target="_blank" rel="noopener noreferrer" className="font-display text-sm font-bold rounded-full px-10 py-4 transition-all duration-300 hover:scale-105" style={{ backgroundColor: '#c41e1e', color: '#fff' }}>
                GET TICKETS
              </a>
              <button className="font-body text-sm font-medium rounded-full px-8 py-4 transition-all duration-300 hover:border-[#c41e1e] hover:text-[#c41e1e]" style={{ border: '1.5px solid #3d3833', color: '#e8e6e3' }}>
                Watch Trailer
              </button>
            </div>
          </motion.div>

          {/* RIGHT — Fight card with image */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#131210', border: '2px solid #2a2724' }}>
            {/* Fight image header */}
            <div className="relative h-44">
              <img src="/images/fight-upcoming.jpg" alt={`${nextFight.eventName} placeholder`} className="w-full h-full object-cover opacity-40" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 30%, #131210 100%)' }} />
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(196, 30, 30, 0.9)' }}>
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#fff' }} />
                <span className="font-body text-[9px] uppercase tracking-wider font-bold" style={{ color: '#fff' }}>Main Event</span>
              </div>
            </div>

            <div className="p-6 -mt-4 relative">
              {/* Manny row */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0" style={{ border: '3px solid #c41e1e', boxShadow: '0 0 20px rgba(196, 30, 30, 0.3)' }}>
                  <img src="/images/manny-face.jpg" alt="Manny" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-display font-bold text-lg" style={{ color: '#e8e6e3' }}>Manny "Mannolo" De Anda</p>
                  <p className="font-body text-xs mt-0.5" style={{ color: '#7a756f' }}>3-0 (2 KOs) | Lightweight | Age 22</p>
                </div>
                <span className="ml-auto font-display font-bold text-xs uppercase px-3 py-1.5 rounded" style={{ backgroundColor: 'rgba(196, 30, 30, 0.15)', color: '#c41e1e', border: '1px solid rgba(196, 30, 30, 0.25)' }}>
                  VS
                </span>
              </div>

              <div className="mb-6 rounded-xl p-4" style={{ backgroundColor: 'rgba(26, 24, 22, 0.6)', border: '1px solid #2a2724' }}>
                <p className="font-body text-[9px] uppercase tracking-[0.2em] mb-1" style={{ color: '#5c5752' }}>Opponent</p>
                <p className="font-display font-bold text-xl" style={{ color: '#e8e6e3' }}>{nextFight.opponent.name}</p>
                <p className="font-body text-[11px] mt-1" style={{ color: '#7a756f' }}>{nextFight.opponent.weightClassLabel} · {nextFight.eventName}</p>
              </div>

              {/* Venue details */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'Venue', value: nextFight.venue, sub: nextFight.city },
                  { label: 'Weight', value: nextFight.weightClass, sub: '135 lbs' },
                  { label: 'Rounds', value: `${nextFight.rounds} Rounds`, sub: 'Scheduled' },
                ].map((item) => (
                  <div key={item.label} className="text-center p-3 rounded-lg" style={{ backgroundColor: 'rgba(26, 24, 22, 0.6)' }}>
                    <p className="font-body text-[9px] uppercase tracking-[0.15em] mb-1" style={{ color: '#5c5752' }}>{item.label}</p>
                    <p className="font-body text-xs font-semibold" style={{ color: '#e8e6e3' }}>{item.value}</p>
                    <p className="font-body text-[9px] mt-0.5" style={{ color: '#5c5752' }}>{item.sub}</p>
                  </div>
                ))}
              </div>

              {/* Promoter line */}
              <div className="flex items-center justify-between py-3" style={{ borderTop: '1px solid #1a1816' }}>
                <span className="font-body text-[10px] uppercase tracking-wider" style={{ color: '#5c5752' }}>Promoter</span>
                <span className="font-body text-xs font-medium" style={{ color: '#e8e6e3' }}>{nextFight.promoter}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
