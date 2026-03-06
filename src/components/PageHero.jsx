import { motion, animate, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ChevronRight, Pause, Play } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
const BG_IMAGES = [
    {
        url: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?q=80&w=1920&auto=format&fit=crop',
        label: 'Professional Cleaning',
    },
    {
        url: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=1920&auto=format&fit=crop',
        label: 'Plumbing',
    },
    {
        url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1920&auto=format&fit=crop',
        label: 'Electrical Work',
    },
    {
        url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1920&auto=format&fit=crop',
        label: 'Carpentry',
    },
    {
        url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1920&auto=format&fit=crop',
        label: 'Interior Design',
    },
    {
        url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1920&auto=format&fit=crop',
        label: 'Kitchen Renovation',
    },
    {
        url: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=1920&auto=format&fit=crop',
        label: 'AC & Cooling',
    },
    {
        url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1920&auto=format&fit=crop',
        label: 'Painting',
    },

    {
        url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1920&auto=format&fit=crop',
        label: 'Home Repairs',
    },
];

function AnimatedStat({ value, label, inView }) {
    const [display, setDisplay] = useState('0');

    useEffect(() => {
        if (!inView) return;
        const match = String(value).match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
        if (!match) { setDisplay(value); return; }
        const prefix = match[1] || '';
        const num = parseFloat(match[2]);
        const suffix = match[3] || '';
        const controls = animate(0, num, {
            duration: 2, ease: 'easeOut',
            onUpdate(v) {
                setDisplay(`${prefix}${Number.isInteger(num) ? Math.round(v) : v.toFixed(1)}${suffix}`);
            },
        });
        return () => controls.stop();
    }, [inView, value]);

    return (
        <div className="flex flex-col items-center px-8 first:pl-0 last:pr-0"
            style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
            <span className="text-2xl font-black text-white tabular-nums drop-shadow">{display}</span>
            <span className="text-white/50 text-[10px] font-semibold uppercase tracking-[0.2em] mt-0.5">{label}</span>
        </div>
    );
}
export default function PageHero({
    badge, title, titleAccent, subtitle,
    breadcrumb, stats = [], children,
}) {
    const BadgeIcon = badge?.icon;
    const statsRef = useRef(null);
    const [statsInView, setStatsInView] = useState(false);
    const [currentImg, setCurrentImg] = useState(0);
    const [paused, setPaused] = useState(false);
    const [direction, setDirection] = useState(1);
    useEffect(() => {
        if (paused) return;
        const id = setInterval(() => {
            setDirection(1);
            setCurrentImg(prev => (prev + 1) % BG_IMAGES.length);
        }, 5000);
        return () => clearInterval(id);
    }, [paused]);

    useEffect(() => {
        if (!statsRef.current) return;
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setStatsInView(true); },
            { threshold: 0.4 }
        );
        obs.observe(statsRef.current);
        return () => obs.disconnect();
    }, []);

    const goTo = (i) => {
        setDirection(i > currentImg ? 1 : -1);
        setCurrentImg(i);
    };

    const slideVariants = {
        enter: (d) => ({ x: d > 0 ? '100%' : '-100%' }),
        center: ({ x: 0 }),
        exit: (d) => ({ x: d > 0 ? '-8%' : '8%', opacity: 0.5 }),
    };

    return (
        <section
            className="relative w-full overflow-hidden font-['Poppins']"
            style={{ height: '100vh', maxHeight: 800 }}
        >
            <div className="absolute inset-0 z-0 overflow-hidden">
                <AnimatePresence initial={false} custom={direction} mode="sync">
                    <motion.div
                        key={currentImg}
                        className="absolute inset-0"
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 1.1, ease: [0.77, 0, 0.18, 1] }}
                    >
                        <img
                            src={BG_IMAGES[currentImg].url}
                            alt={BG_IMAGES[currentImg].label}
                            className="w-full h-full object-cover object-center"
                        />
                    </motion.div>
                </AnimatePresence>

                <div
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{ background: 'rgba(30, 58, 138, 0.22)' }}
                />
                <div
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                        background: 'linear-gradient(to top, rgba(11,20,38,0.90) 0%, rgba(11,20,38,0.45) 35%, rgba(11,20,38,0.05) 65%, transparent 100%)'
                    }}
                />
                <div
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                        background: 'linear-gradient(to right, rgba(11,20,38,0.35) 0%, transparent 50%)'
                    }}
                />
            </div>

            <div className="absolute top-0 left-0 right-0 h-[3px] z-30"
                style={{ background: 'linear-gradient(90deg, #1E3A8A, #3B82F6, #1E3A8A)' }} />
            <motion.nav
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute top-8 left-8 md:left-16 z-20 flex items-center gap-2"
            >
                <Link to="/" className="flex items-center gap-1.5 text-white/40 hover:text-white transition-colors text-xs font-semibold tracking-wide">
                    <Home className="w-3.5 h-3.5" /><span>Home</span>
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-white/20" />
                <span className="text-homefix-accent text-xs font-bold tracking-wide">{breadcrumb}</span>
            </motion.nav>
            <button
                onClick={() => setPaused(p => !p)}
                className="absolute top-7 right-8 md:right-16 z-20 w-10 h-10 rounded-full flex items-center justify-center
                    bg-black/30 backdrop-blur-md border border-white/20 text-white/70
                    hover:text-white hover:bg-black/50 transition-all duration-300"
            >
                {paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </button>
            <div className="absolute bottom-0 left-0 right-0 z-20 px-8 md:px-16 pb-14">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-4 mb-5"
                    >
                        {badge && (
                            <span
                                className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] px-3 py-1.5 rounded-full"
                                style={{
                                    background: 'rgba(59,130,246,0.2)',
                                    border: '1px solid rgba(59,130,246,0.4)',
                                    color: '#93C5FD',
                                }}
                            >
                                {BadgeIcon && <BadgeIcon className="w-3 h-3" />}
                                {badge.label}
                            </span>
                        )}
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={currentImg}
                                initial={{ opacity: 0, x: 12 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -12 }}
                                transition={{ duration: 0.35 }}
                                className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em]"
                            >
                                {BG_IMAGES[currentImg].label}
                            </motion.span>
                        </AnimatePresence>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="font-black text-white leading-[1.05] tracking-tight mb-4"
                        style={{ fontSize: 'clamp(2.6rem, 5.5vw, 5rem)', textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
                    >
                        {title}{' '}
                        <span style={{ color: '#3B82F6' }}>{titleAccent}</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                        className="text-white/65 text-base md:text-lg font-normal leading-relaxed mb-8 max-w-xl"
                    >
                        {subtitle}
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.25 }}
                        className="max-w-2xl mb-10"
                    >
                        {children}
                    </motion.div>
                    <div className="flex items-end justify-between gap-6 flex-wrap">

                        {stats.length > 0 && (
                            <motion.div
                                ref={statsRef}
                                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.35 }}
                                className="flex items-center divide-x"
                                style={{ '--tw-divide-color': 'rgba(255,255,255,0.15)' }}
                            >
                                {stats.map((s, i) => (
                                    <AnimatedStat key={i} value={s.value} label={s.label} inView={statsInView} />
                                ))}
                            </motion.div>
                        )}
                        <div className="flex items-center gap-2 pb-1">
                            {BG_IMAGES.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => goTo(i)}
                                    style={{
                                        height: 4,
                                        width: i === currentImg ? 28 : 4,
                                        background: i === currentImg ? '#3B82F6' : 'rgba(255,255,255,0.3)',
                                        borderRadius: 999,
                                        transition: 'all 0.4s ease',
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
