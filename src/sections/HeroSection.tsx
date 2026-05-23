import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { nextFight, ticketCtaUrl } from '../config/nextFight';

function useMouseBlobs() {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const smooth = useRef({ x: 0.5, y: 0.5 });
  const raf = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    const tick = () => {
      smooth.current.x += (mouse.x - smooth.current.x) * 0.06;
      smooth.current.y += (mouse.y - smooth.current.y) * 0.06;
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [mouse]);

  return { mouse, smooth };
}

export default function HeroSection() {
  const { smooth } = useMouseBlobs();
  const [time, setTime] = useState(0);

  useEffect(() => {
    let raf: number;
    const tick = (t: number) => { setTime(t * 0.001); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const mx = (smooth.current.x - 0.5);
  const my = (smooth.current.y - 0.5);
  const bx1 = 50 + Math.sin(time * 0.7) * 6 + mx * 25;
  const by1 = 40 + Math.cos(time * 0.5) * 5 + my * 18;
  const bx2 = 55 + Math.cos(time * 0.6) * 8 + mx * 18;
  const by2 = 55 + Math.sin(time * 0.8) * 6 + my * 14;
  const bx3 = 45 + Math.sin(time * 0.9) * 7;
  const by3 = 50 + Math.cos(time * 0.4) * 8;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover object-top" style={{ filter: 'brightness(0.3) contrast(1.2) saturate(0.8)' }}>
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.8) 70%, rgba(10,10,10,0.95) 100%)' }} />
      </div>

      <div className="absolute top-[15%] left-[10%] w-56 h-56 rounded-full opacity-[0.12] blur-[90px] blob-1 z-0 pointer-events-none" style={{ background: '#c41e1e' }} />
      <div className="absolute bottom-[20%] right-[8%] w-48 h-48 rounded-full opacity-[0.08] blur-[80px] blob-2 z-0 pointer-events-none" style={{ background: '#c41e1e' }} />

      <svg className="absolute inset-0 w-full h-full z-[1] pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" /><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" result="goo" /></filter>
          <radialGradient id="gRed" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#c41e1e" stopOpacity="0.6" /><stop offset="100%" stopColor="#8a1515" stopOpacity="0.05" /></radialGradient>
          <radialGradient id="gGold" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#c9a84c" stopOpacity="0.4" /><stop offset="100%" stopColor="#c9a84c" stopOpacity="0.05" /></radialGradient>
        </defs>
        <g filter="url(#goo)">
          <ellipse cx={bx1} cy={by1} rx="20" ry="24" fill="url(#gRed)" />
          <ellipse cx={bx2} cy={by2} rx="16" ry="20" fill="url(#gGold)" />
          <ellipse cx={bx3} cy={by3} rx="14" ry="18" fill="url(#gRed)" opacity="0.7" />
        </g>
      </svg>

      {/* LEFT SIDE — Full-height Next Fight panel */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-0 top-0 bottom-0 z-20 hidden lg:flex flex-col justify-center"
        style={{ width: '320px', background: 'linear-gradient(to right, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.85) 70%, transparent 100%)' }}
      >
        <div className="px-8 py-16">
          {/* Next fight header */}
          <div className="mb-8">
            <p className="font-body text-[10px] uppercase tracking-[0.4em] mb-3" style={{ color: '#c9a84c' }}>Next Fight</p>
            <div className="w-16 h-px mb-6" style={{ background: 'linear-gradient(to right, #c41e1e, transparent)' }} />

            <p className="font-display font-extrabold text-5xl leading-none mb-2" style={{ color: '#e8e6e3' }}>{nextFight.dateDisplay.replace(', 2026', '').replace('JUNE 6', 'JUNE 6')}</p>
            <p className="font-display font-bold text-2xl mb-4" style={{ color: '#c41e1e' }}>2026</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#c41e1e' }} />
              <p className="font-body text-[11px] uppercase tracking-wider" style={{ color: '#7a756f' }}>Main Event</p>
            </div>
          </div>

          {/* Fight details */}
          <div className="space-y-4 mb-10">
            {[
              { label: 'Venue', value: nextFight.venue },
              { label: 'Location', value: nextFight.city },
              { label: 'Weight', value: nextFight.weightClass },
              { label: 'Opponent', value: nextFight.opponent.name },
              { label: 'Rounds', value: `${nextFight.rounds} Rounds` },
              { label: 'Time', value: nextFight.timeDisplay },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid #1a1816' }}>
                <span className="font-body text-[10px] uppercase tracking-[0.2em]" style={{ color: '#5c5752' }}>{item.label}</span>
                <span className="font-body text-xs font-medium" style={{ color: '#e8e6e3' }}>{item.value}</span>
              </div>
            ))}
          </div>

          {/* Manny mini profile */}
          <div className="flex items-center gap-3 mb-8 p-4 rounded-xl" style={{ backgroundColor: 'rgba(196, 30, 30, 0.06)', border: '1px solid rgba(196, 30, 30, 0.15)' }}>
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0" style={{ border: '2px solid #c41e1e' }}>
              <img src="/images/manny-face.jpg" alt="Manny" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-display font-bold text-sm" style={{ color: '#e8e6e3' }}>Manny "Mannolo" De Anda</p>
              <p className="font-body text-[10px]" style={{ color: '#7a756f' }}>3-0 (2 KOs) | Lightweight</p>
            </div>
          </div>

          <a href={ticketCtaUrl} target="_blank" rel="noopener noreferrer" className="block w-full text-center font-display text-sm font-bold rounded-full py-4 transition-all duration-300 hover:scale-105" style={{ backgroundColor: '#c41e1e', color: '#fff' }}>
            GET TICKETS
          </a>
        </div>
      </motion.div>

      {/* Center - Face portrait */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-[280px] h-[380px] sm:w-[340px] sm:h-[460px] lg:w-[380px] lg:h-[500px]"
        >
          <div className="absolute -inset-8 rounded-full opacity-40 blur-[60px] pointer-events-none z-0"
            style={{ background: `radial-gradient(circle at ${50 + mx * 30}% ${50 + my * 20}%, rgba(196,30,30,0.5), transparent 70%)`, transition: 'background 0.3s ease' }}
          />
          <img
            src="/images/manny-face.jpg"
            alt="Manny De Anda"
            className="relative w-full h-full object-cover object-top z-10"
            style={{ maskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)', filter: 'contrast(1.05) brightness(0.95)' }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-36 z-20" style={{ background: 'linear-gradient(to top, #0a0a0a, transparent)' }} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }} className="text-center -mt-10 z-10">
          <p className="font-body text-[10px] uppercase tracking-[0.5em] mb-3" style={{ color: '#c9a84c' }}>Undefeated Lightweight Prospect</p>
          <h1 className="font-display font-extrabold leading-[0.85] tracking-tight stroke-text" style={{ fontSize: 'clamp(52px, 10vw, 120px)' }}>MANNY</h1>
          <p className="font-body text-[13px] mt-4 tracking-wide" style={{ color: '#7a756f' }}>3-0 <span style={{ color: '#c41e1e' }}>(2 KOs)</span> &nbsp;|&nbsp; Houston, TX</p>
        </motion.div>
      </div>

      {/* RIGHT SIDE — Fighter stats */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-4 sm:right-8 lg:right-14 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-end gap-8"
      >
        <div className="text-right"><p className="font-display font-extrabold text-6xl" style={{ color: '#c41e1e' }}>22</p><p className="font-body text-[9px] uppercase tracking-[0.3em] mt-2" style={{ color: '#5c5752' }}>Years Old</p></div>
        <div className="text-right"><p className="font-display font-bold text-xl" style={{ color: '#e8e6e3' }}>Lightweight</p><p className="font-body text-[9px] uppercase tracking-[0.3em] mt-1" style={{ color: '#5c5752' }}>Weight Class</p></div>
        <div className="text-right"><p className="font-display font-bold text-xl" style={{ color: '#e8e6e3' }}>5&apos;9&quot;</p><p className="font-body text-[9px] uppercase tracking-[0.3em] mt-1" style={{ color: '#5c5752' }}>Height</p></div>
        <div className="text-right"><p className="font-display font-bold text-xl" style={{ color: '#e8e6e3' }}>Orthodox</p><p className="font-body text-[9px] uppercase tracking-[0.3em] mt-1" style={{ color: '#5c5752' }}>Stance</p></div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, transparent, #3d3833)' }} />
        <p className="font-body text-[9px] uppercase tracking-[0.3em]" style={{ color: '#4a4640' }}>Scroll</p>
      </motion.div>
    </section>
  );
}
