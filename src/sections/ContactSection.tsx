import { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'sonner';
import type { FormEvent } from 'react';
import type { LeadType } from '../types/lead';
import { serviceOptions, submitLead } from '../lib/leadClient';

const workoutPlan = [
  'Monday: Roadwork (3 miles) + Shadow Boxing (4 rounds)',
  'Tuesday: Heavy Bag (6 rounds) + Mitt Work + Core',
  'Wednesday: Active Recovery + Stretching + Yoga',
  'Thursday: Sparring (4-6 rounds) + Footwork Drills',
  'Friday: Speed Bag + Double-End Bag + Conditioning',
  'Saturday: Full Sparring Simulation + Strength Training',
  'Sunday: Rest Day + Meal Prep + Recovery',
];

const mealPlan = [
  'Breakfast: Egg whites, oats, banana, black coffee',
  'Snack: Protein shake + almond butter rice cake',
  'Lunch: Grilled chicken breast, brown rice, steamed broccoli',
  'Pre-Workout: Apple + handful of almonds',
  'Post-Workout: Whey protein + dextrose',
  'Dinner: Salmon or lean beef, sweet potato, mixed greens',
  'Evening: Greek yogurt + berries + honey',
];

export default function ContactSection() {
  const [service, setService] = useState<LeadType>('train_general');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showPlan, setShowPlan] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const msgRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await submitLead({
        type: service,
        name: nameRef.current?.value || '',
        email: emailRef.current?.value || '',
        phone: phoneRef.current?.value || '',
        message: msgRef.current?.value || '',
      });

      toast.success("Got it. Manny's team will be in touch.");
      setSubmitted(true);
      setShowPlan(service === 'train_general' || service === 'train_with_manny');
      nameRef.current?.form?.reset();
    } catch (err) {
      toast.error("Couldn't send right now. Try again or DM @mannol.o on Instagram.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const activeService = serviceOptions.find(s => s.type === service)!;
  const inputStyle: React.CSSProperties = { backgroundColor: '#141210', border: '1px solid #2a2724', color: '#e8e6e3' };
  const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => { e.currentTarget.style.borderColor = activeService.color; };
  const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => { e.currentTarget.style.borderColor = '#2a2724'; };

  return (
    <section id="connect" className="relative w-full py-28 sm:py-36 px-6 sm:px-10 lg:px-16 overflow-hidden" style={{ backgroundColor: '#0c0b09' }}>
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-14">
          <p className="font-body text-[10px] uppercase tracking-[0.4em] mb-4" style={{ color: '#c9a84c' }}>Get In Touch</p>
          <h2 className="font-display font-bold tracking-tight mb-4" style={{ fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 1.05, color: '#e8e6e3' }}>
            WORK WITH MANNY
          </h2>
          <p className="font-body text-[15px] max-w-lg" style={{ color: '#7a756f' }}>
            Whether you want to train, sponsor, or book a fight — reach out below. Every message goes directly to Manny and his team.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 p-8 rounded-2xl text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(196,30,30,0.12) 0%, rgba(201,168,76,0.06) 100%)',
            border: '1.5px solid rgba(196,30,30,0.3)',
          }}
        >
          <p
            className="font-body text-[10px] uppercase tracking-[0.4em] mb-3"
            style={{ color: '#c9a84c' }}
          >
            Train Where Manny Trains
          </p>
          <h3
            className="font-display font-bold mb-4"
            style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: '#e8e6e3' }}
          >
            5 DAYS FREE AT DE ANDA BROTHERS BOXING
          </h3>
          <p
            className="font-body text-[15px] mb-6 max-w-xl mx-auto"
            style={{ color: '#7a756f' }}
          >
            Step into the same gym Manny trains in. No commitment — try a full week of
            classes, sparring, and bag work with the coaches who built a 3-0 prospect.
          </p>
          <a
            href="https://deandabrothersboxing.com/?utm_source=mannolo-site&utm_medium=promo&utm_campaign=free-trial"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-display text-sm font-bold rounded-full px-10 py-4 transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: '#c41e1e', color: '#fff' }}
          >
            CLAIM YOUR 5 FREE DAYS
          </a>
        </motion.div>

        {/* Service type selector */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-10">
          {serviceOptions.map((opt) => {
            const isActive = service === opt.type;
            return (
              <button
                key={opt.type}
                onClick={() => { setService(opt.type); setSubmitted(false); setShowPlan(false); }}
                className="relative rounded-xl p-4 text-left transition-all duration-400"
                style={{
                  backgroundColor: isActive ? 'rgba(196, 30, 30, 0.06)' : '#131210',
                  border: `2px solid ${isActive ? opt.color : '#2a2724'}`,
                }}
              >
                {isActive && <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${opt.color}, transparent)` }} />}
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-display font-bold text-xs" style={{ color: isActive ? opt.color : '#e8e6e3' }}>{opt.title}</p>
                  {opt.badge && (
                    <span className="font-display text-[9px] font-bold uppercase rounded-full px-2 py-0.5" style={{ backgroundColor: 'rgba(201, 168, 76, 0.12)', color: '#c9a84c', border: '1px solid rgba(201, 168, 76, 0.3)' }}>
                      {opt.badge}
                    </span>
                  )}
                </div>
                <p className="font-body text-[10px] leading-relaxed" style={{ color: '#5c5752' }}>{opt.desc}</p>
              </button>
            );
          })}
        </motion.div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-body text-[10px] uppercase tracking-[0.2em] mb-2 font-medium" style={{ color: '#5c5752' }}>Full Name</label>
                      <input ref={nameRef} type="text" required className="w-full rounded-xl px-4 py-3.5 font-body text-sm transition-all duration-300 focus:outline-none" style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
                    </div>
                    <div>
                      <label className="block font-body text-[10px] uppercase tracking-[0.2em] mb-2 font-medium" style={{ color: '#5c5752' }}>Phone</label>
                      <input ref={phoneRef} type="tel" required={service === 'train_with_manny' || service === 'fight_booking'} className="w-full rounded-xl px-4 py-3.5 font-body text-sm transition-all duration-300 focus:outline-none" style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
                    </div>
                  </div>
                  <div>
                    <label className="block font-body text-[10px] uppercase tracking-[0.2em] mb-2 font-medium" style={{ color: '#5c5752' }}>Email</label>
                    <input ref={emailRef} type="email" required className="w-full rounded-xl px-4 py-3.5 font-body text-sm transition-all duration-300 focus:outline-none" style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
                  </div>
                  <div>
                    <label className="block font-body text-[10px] uppercase tracking-[0.2em] mb-2 font-medium" style={{ color: '#5c5752' }}>Message</label>
                    <textarea ref={msgRef} rows={4} required className="w-full rounded-xl px-4 py-3.5 font-body text-sm transition-all duration-300 focus:outline-none resize-none" style={inputStyle} onFocus={focusStyle} onBlur={blurStyle}
                      placeholder={activeService.placeholder} />
                  </div>
                  <button disabled={submitting} type="submit" className="w-full font-display text-sm font-bold rounded-full py-4 transition-all duration-300 hover:scale-[1.02] hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed" style={{ backgroundColor: activeService.color, color: '#fff' }}>
                    {submitting ? 'SENDING...' : activeService.cta}
                  </button>

                  {/* Training perk note */}
                  {(service === 'train_general' || service === 'train_with_manny') && (
                    <div className="flex items-start gap-3 p-4 rounded-xl" style={{ backgroundColor: 'rgba(196, 30, 30, 0.04)', border: '1px solid rgba(196, 30, 30, 0.1)' }}>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(196, 30, 30, 0.1)' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c41e1e" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                      </div>
                      <p className="font-body text-xs leading-relaxed" style={{ color: '#7a756f' }}>
                        {service === 'train_with_manny'
                          ? <>Includes weekly <span style={{ color: '#c41e1e' }}>1-on-1 sessions with Manny</span>. Limited spots — applications reviewed weekly.</>
                          : <>Training signups receive a <span style={{ color: '#c41e1e' }}>free personalized meal prep plan</span> and <span style={{ color: '#c41e1e' }}>weekly workout schedule</span> generated by Manny&apos;s coaching team.</>}
                      </p>
                    </div>
                  )}
                </form>

                {/* Right — Info panel */}
                <div className="space-y-5">
                  {/* Manny contact card */}
                  <div className="p-6 rounded-xl" style={{ backgroundColor: '#131210', border: '1px solid #2a2724' }}>
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-14 h-14 rounded-full overflow-hidden" style={{ border: '2px solid #c41e1e' }}>
                        <img src="/images/manny-face.jpg" alt="Manny" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-display font-bold text-base" style={{ color: '#e8e6e3' }}>Manny De Anda</p>
                        <p className="font-body text-xs" style={{ color: '#7a756f' }}>Professional Boxer & Coach</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {[
                        { label: 'Location', value: 'Houston, TX' },
                        { label: 'Gym', value: 'De Anda Brothers Boxing Club' },
                        { label: 'Email', value: 'team@mannydeanda.com' },
                      ].map((item) => (
                        <div key={item.label} className="flex justify-between py-2" style={{ borderBottom: '1px solid #1a1816' }}>
                          <span className="font-body text-[10px] uppercase tracking-wider" style={{ color: '#5c5752' }}>{item.label}</span>
                          <span className="font-body text-xs" style={{ color: '#e8e6e3' }}>{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Socials */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { handle: '@mannol.o', platform: 'Instagram', followers: '15K+', href: 'https://www.instagram.com/mannol.o/' },
                      { handle: '@mannol.o', platform: 'TikTok', followers: '25K+', href: 'https://www.instagram.com/mannol.o/' },
                      { handle: '@yourdadmax', platform: 'YouTube', followers: '5K+', href: 'https://www.instagram.com/yourdadmax/' },
                    ].map((s) => (
                      <a key={s.platform} href={s.href} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl text-center transition-all duration-300 hover:border-[#c41e1e]" style={{ backgroundColor: '#131210', border: '1px solid #2a2724' }}>
                        <p className="font-body text-[10px] font-semibold" style={{ color: '#e8e6e3' }}>{s.followers}</p>
                        <p className="font-body text-[9px] mt-0.5" style={{ color: '#5c5752' }}>{s.platform}</p>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : showPlan ? (
            /* TRAINING SUCCESS + AUTO-GENERATED PLANS */
            <motion.div key="plan" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
              <div className="mb-8 p-6 rounded-xl text-center" style={{ backgroundColor: 'rgba(196, 30, 30, 0.06)', border: '1.5px solid rgba(196, 30, 30, 0.2)' }}>
                <h3 className="font-display font-bold text-3xl mb-2" style={{ color: '#c41e1e' }}>WELCOME TO THE TEAM!</h3>
                <p className="font-body text-sm" style={{ color: '#7a756f' }}>Your training inquiry was received. Manny and his coaches will contact you within 24 hours.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Workout Plan */}
                <div className="p-6 rounded-xl" style={{ backgroundColor: '#131210', border: '1px solid #2a2724' }}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(196, 30, 30, 0.1)', border: '1px solid rgba(196, 30, 30, 0.2)' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c41e1e" strokeWidth="2"><path d="M6.5 6.5h11M6.5 17.5h11M6 12h12M4 6.5h1M4 12h1M4 17.5h1M19 6.5h1M19 12h1M19 17.5h1"/></svg>
                    </div>
                    <div>
                      <p className="font-display font-bold text-sm" style={{ color: '#e8e6e3' }}>Weekly Workout Plan</p>
                      <p className="font-body text-[10px]" style={{ color: '#5c5752' }}>Boxing-focused training schedule</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {workoutPlan.map((line, i) => (
                      <div key={i} className="flex items-start gap-3 py-2" style={{ borderBottom: i < workoutPlan.length - 1 ? '1px solid #1a1816' : 'none' }}>
                        <span className="font-display font-bold text-xs flex-shrink-0 w-20" style={{ color: '#c41e1e' }}>{line.split(':')[0]}</span>
                        <span className="font-body text-xs" style={{ color: '#8a8580' }}>{line.split(':').slice(1).join(':')}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Meal Plan */}
                <div className="p-6 rounded-xl" style={{ backgroundColor: '#131210', border: '1px solid #2a2724' }}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(201, 168, 76, 0.1)', border: '1px solid rgba(201, 168, 76, 0.2)' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/><path d="M12 6v6l4 2"/></svg>
                    </div>
                    <div>
                      <p className="font-display font-bold text-sm" style={{ color: '#e8e6e3' }}>Daily Meal Prep Plan</p>
                      <p className="font-body text-[10px]" style={{ color: '#5c5752' }}>Boxer nutrition — high protein, clean carbs</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {mealPlan.map((line, i) => (
                      <div key={i} className="flex items-start gap-3 py-2" style={{ borderBottom: i < mealPlan.length - 1 ? '1px solid #1a1816' : 'none' }}>
                        <span className="font-display font-bold text-xs flex-shrink-0 w-24" style={{ color: '#c9a84c' }}>{line.split(':')[0]}</span>
                        <span className="font-body text-xs" style={{ color: '#8a8580' }}>{line.split(':').slice(1).join(':')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Generic success */
            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="text-center py-20">
              <h3 className="font-display font-bold mb-4" style={{ fontSize: 'clamp(32px, 5vw, 56px)', color: activeService.color }}>MESSAGE SENT!</h3>
              <p className="font-body text-[15px]" style={{ color: '#7a756f' }}>Manny and his team will get back to you within 24-48 hours.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
