import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, ShieldCheck, Star, Clock, Zap, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';

const PILLS = [];
function Counter({ to, suffix = '' }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const ctrl = animate(0, to, {
          duration: 2, ease: 'easeOut',
          onUpdate: v => setVal(Math.round(v)),
        });
        return () => ctrl.stop();
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);

  return <span ref={ref}>{val}{suffix}</span>;
}

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const up = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function HeroSection() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/services?q=${encodeURIComponent(query.trim())}`);
    else navigate('/services');
  };

  return (
    <section
      id="home"
      className="relative w-full px-6 py-6 md:px-12 lg:px-20 pt-10 font-['Poppins']"
      style={{ minHeight: 0 }}
    >
      <div className="relative w-full rounded-[3rem] bg-[#0B1426] min-h-[520px] md:min-h-[590px] flex items-center overflow-hidden shadow-2xl">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.08 }} animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
        >
          <img
            src="https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=1400&h=900&fit=crop"
            className="w-full h-full object-cover opacity-80"
            alt="Home repair background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1426] via-[#0B1426]/88 to-[#1E3A8A]/30" />
          <div className="absolute inset-0" style={{ background: 'rgba(30,58,138,0.15)' }} />
        </motion.div>

        <motion.div
          className="absolute pointer-events-none"
          style={{ width: 500, height: 500, top: '-20%', left: '-5%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
            filter: 'blur(40px)' }}
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute pointer-events-none"
          style={{ width: 300, height: 300, bottom: '-10%', left: '30%',
            background: 'radial-gradient(circle, rgba(30,58,138,0.18) 0%, transparent 70%)',
            filter: 'blur(30px)' }}
          animate={{ x: [0, -20, 0], y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />

        <div className="hidden lg:block">
          {PILLS.map((pill, i) => (
            <motion.div
              key={pill.label}
              className="absolute z-10 flex items-center gap-2 bg-white/10 backdrop-blur-md
                border border-white/20 text-white text-xs font-bold px-4 py-2.5 rounded-2xl
                shadow-lg cursor-default select-none"
              style={{ left: pill.x, top: pill.y }}
              initial={{ opacity: 0, scale: 0.7, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.8 + pill.delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.08, background: 'rgba(59,130,246,0.25)' }}
            >
              <span className="text-base">{pill.emoji}</span>
              {pill.label}
            </motion.div>
          ))}
        </div>

        <div className="absolute top-0 left-0 right-0 h-[3px] z-20"
          style={{ background: 'linear-gradient(90deg, #1E3A8A, #3B82F6, #1E3A8A)' }} />

        <div className="relative z-10 w-full px-8 md:px-16 py-14">
          <motion.div
            className="max-w-2xl"
            variants={stagger} initial="hidden" animate="show"
          >
            <motion.h1
              variants={up}
              className="text-white text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.08] tracking-tight"
              style={{ textShadow: '0 2px 20px rgba(21, 21, 21, 0.3)' }}
            >
              Your Home,{' '}
              <span className="text-homefix-accent">Better</span>{' '}
              Than Ever
            </motion.h1>

            <motion.p variants={up} className="text-white/60 text-lg md:text-xl mb-10 max-w-xl leading-relaxed font-light">
              Book top-rated, verified professionals for any home task — from cleaning to complex repairs.
            </motion.p>
            <motion.div variants={up} className="relative max-w-2xl mb-10">
              <motion.form
                onSubmit={handleSearch}
                animate={{ boxShadow: focused ? '0 0 0 3px rgba(59,130,246,0.35)' : '0 0 0 0px rgba(59,130,246,0)' }}
                transition={{ duration: 0.2 }}
                className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden"
              >
                <div className="pl-5 flex items-center pointer-events-none">
                  <Search className="w-5 h-5 text-homefix-accent" />
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder="What service do you need today?"
                  className="flex-1 bg-transparent text-white text-base py-5 pl-4 pr-4 outline-none placeholder:text-white/40 font-medium"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  className="m-2 bg-homefix-primary hover:bg-homefix-accent text-white px-6 py-3 rounded-xl
                    font-bold transition-colors duration-300 flex items-center gap-2 text-sm tracking-wide
                    shadow-lg hover:shadow-homefix-accent/30 flex-shrink-0"
                >
                  <span>Search</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </motion.form>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <motion.div
        className="hidden lg:flex absolute right-28 bottom-10 z-10 bg-white rounded-[1.5rem] p-6 shadow-2xl flex-col items-center gap-3 min-w-[220px]"
        initial={{ opacity: 0, x: 40, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-100 to-transparent" />

        <span className="text-homefix-text font-black text-xs uppercase tracking-widest">Get Started</span>
        <p className="text-gray-400 text-xs text-center font-medium">Join thousands of happy customers</p>

        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full">
          <Link
            to="/customer-register"
            className="w-full bg-homefix-primary text-white px-6 py-3 rounded-xl font-black text-sm
              tracking-widest hover:bg-homefix-accent transition-all duration-300
              shadow-lg shadow-homefix-primary/20 active:scale-95 text-center block"
          >
            Sign Up Free
          </Link>
        </motion.div>

        <Link
          to="/login"
          className="w-full text-center text-homefix-text font-bold text-sm hover:text-homefix-accent transition-colors flex items-center justify-center gap-1"
        >
          Already a member? <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </motion.div>

      <motion.div
        className="flex lg:hidden gap-4 mt-6"
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Link
          to="/customer-register"
          className="flex-1 bg-homefix-primary text-white px-6 py-4 rounded-xl font-black text-sm
            tracking-widest hover:bg-homefix-accent transition-all duration-300
            shadow-lg shadow-homefix-primary/20 active:scale-95 text-center"
        >
          Sign Up Free
        </Link>
        <Link
          to="/login"
          className="flex-1 bg-homefix-bg border border-gray-200 text-homefix-text px-6 py-4 rounded-xl
            font-bold text-sm hover:border-homefix-accent hover:text-homefix-accent transition-all duration-300 text-center"
        >
          Log In
        </Link>
      </motion.div>
    </section>
  );
}
