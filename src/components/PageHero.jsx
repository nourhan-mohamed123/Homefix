import { motion, useScroll, useTransform, animate } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
function AnimatedStat({ value, label, inView }) {
    const [display, setDisplay] = useState('0');
    useEffect(() => {
        if (!inView) return;
        const match = String(value).match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
        if (!match) { setDisplay(value); return; }

        const prefix = match[1] || '';
        const num    = parseFloat(match[2]);
        const suffix = match[3] || '';

        const controls = animate(0, num, {
            duration: 2,
            ease: 'easeOut',
            onUpdate(v) {
                const formatted = Number.isInteger(num) ? Math.round(v) : v.toFixed(1);
                setDisplay(`${prefix}${formatted}${suffix}`);
            },
        });
        return () => controls.stop();
    }, [inView, value]);

    return (
        <div className="flex flex-col items-center px-8 first:pl-0 last:pr-0"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <span className="text-2xl font-black text-homefix-accent tabular-nums">{display}</span>
            <span className="text-white/30 text-[10px] font-semibold uppercase tracking-[0.2em] mt-0.5">{label}</span>
        </div>
    );
}
function Orb({ style, animate: anim }) {
    return (
        <motion.div
            className="absolute rounded-full pointer-events-none"
            style={style}
            animate={anim}
            transition={{ duration: 6 + Math.random() * 4, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        />
    );
}
function Particle({ x, y, delay }) {
    return (
        <motion.div
            className="absolute w-[2px] h-[2px] rounded-full bg-homefix-accent/40 pointer-events-none"
            style={{ left: `${x}%`, top: `${y}%` }}
            animate={{ opacity: [0, 0.8, 0], y: [0, -30, -60], scale: [0.5, 1, 0.3] }}
            transition={{ duration: 4 + Math.random() * 3, delay, repeat: Infinity, ease: 'easeOut' }}
        />
    );
}
function ShimmerText({ children, color }) {
    return (
        <span className="relative inline-block" style={{ color }}>
            {children}
            <motion.span
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.55) 50%, transparent 60%)`,
                    backgroundSize: '200% 100%',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    mixBlendMode: 'overlay',
                }}
                animate={{ backgroundPositionX: ['-100%', '200%'] }}
                transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
            >
                {children}
            </motion.span>
        </span>
    );
}
export default function PageHero({
    badge, title, titleAccent, subtitle,
    breadcrumb, stats = [], imageUrl, imageAlt = '', children,
}) {
    const BadgeIcon = badge?.icon;
    const sectionRef = useRef(null);
    const statsRef   = useRef(null);
    const [statsInView, setStatsInView] = useState(false);
    const { scrollY } = useScroll();
    const imageY = useTransform(scrollY, [0, 600], ['0%', '20%']);
    useEffect(() => {
        if (!statsRef.current) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setStatsInView(true); },
            { threshold: 0.4 }
        );
        obs.observe(statsRef.current);
        return () => obs.disconnect();
    }, []);

    const particles = useRef(
        Array.from({ length: 28 }, (_, i) => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: i * 0.25,
        }))
    ).current;
    const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.11 } } };
    const up = {
        hidden: { opacity: 0, y: 22 },
        show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
    };

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden font-['Poppins']"
            style={{ background: '#0B1426', minHeight: '72vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
            {imageUrl && (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ duration: 1.2 }}
                    className="absolute inset-0 z-0 overflow-hidden"
                >
                    <motion.img
                        src={imageUrl} alt={imageAlt}
                        className="w-full h-[115%] object-cover object-center will-change-transform"
                        style={{ y: imageY, top: '-7.5%' }}
                    />
                    <div className="absolute inset-0" style={{ background: 'rgba(11,20,38,0.88)' }} />
                    <div className="absolute inset-0" style={{
                        background: 'linear-gradient(to top, rgba(30,58,138,0.25) 0%, transparent 50%)'
                    }} />
                </motion.div>
            )}
            <Orb
                style={{ width: 480, height: 480, top: '-15%', left: '-10%', background: 'radial-gradient(circle, rgba(30,58,138,0.28) 0%, transparent 70%)', filter: 'blur(40px)' }}
                animate={{ x: [0, 40, 0], y: [0, 25, 0] }}
            />
            <Orb
                style={{ width: 360, height: 360, bottom: '-10%', right: '-8%', background: 'radial-gradient(circle, rgba(59,130,246,0.22) 0%, transparent 70%)', filter: 'blur(35px)' }}
                animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
            />
            <Orb
                style={{ width: 200, height: 200, top: '30%', right: '20%', background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)', filter: 'blur(20px)' }}
                animate={{ x: [0, 20, -10, 0], y: [0, -15, 10, 0] }}
            />
            <motion.div
                className="absolute inset-0 z-0 pointer-events-none"
                animate={{
                    background: [
                        'linear-gradient(135deg, rgba(30,58,138,0.15) 0%, transparent 50%, rgba(59,130,246,0.08) 100%)',
                        'linear-gradient(225deg, rgba(59,130,246,0.12) 0%, transparent 50%, rgba(30,58,138,0.18) 100%)',
                        'linear-gradient(135deg, rgba(30,58,138,0.15) 0%, transparent 50%, rgba(59,130,246,0.08) 100%)',
                    ]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {particles.map((p, i) => (
                    <Particle key={i} x={p.x} y={p.y} delay={p.delay} />
                ))}
            </div>
            <motion.div
                className="absolute top-0 left-0 right-0 h-[3px] z-10"
                style={{ background: 'linear-gradient(90deg, #1E3A8A, #3B82F6, #1E3A8A)' }}
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
            <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 pt-24 pb-20 w-full">

                <motion.nav
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center gap-2 mb-12"
                >
                    <Link to="/" className="flex items-center gap-1.5 text-white/30 hover:text-white/60 transition-colors text-xs font-medium tracking-wide">
                        <Home className="w-3.5 h-3.5" /><span>Home</span>
                    </Link>
                    <ChevronRight className="w-3.5 h-3.5 text-white/15" />
                    <span className="text-homefix-accent text-xs font-semibold tracking-wide">{breadcrumb}</span>
                </motion.nav>

                <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col items-center text-center">

                    {badge && (
                        <motion.div variants={up} className="mb-6">
                            <motion.span
                                className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] px-4 py-2 rounded-sm"
                                style={{
                                    background: 'rgba(59,130,246,0.12)',
                                    border: '1px solid rgba(59,130,246,0.3)',
                                    color: '#93C5FD',
                                }}
                                animate={{ borderColor: ['rgba(59,130,246,0.3)', 'rgba(59,130,246,0.7)', 'rgba(59,130,246,0.3)'] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                {BadgeIcon && <BadgeIcon className="w-3.5 h-3.5" />}
                                {badge.label}
                            </motion.span>
                        </motion.div>
                    )}
                    <motion.h1 variants={up}
                        className="font-black text-white leading-[1.06] tracking-tight mb-4"
                        style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}
                    >
                        <ShimmerText color="white">{title}</ShimmerText>{' '}
                        <ShimmerText color="#3B82F6">{titleAccent}</ShimmerText>
                    </motion.h1>

                    <motion.div variants={up} className="w-16 h-[2px] bg-homefix-accent mb-6 opacity-60" />

                    <motion.p variants={up}
                        className="text-white/50 text-base md:text-lg font-normal leading-relaxed mb-10 max-w-xl"
                    >
                        {subtitle}
                    </motion.p>

                    <motion.div variants={up} className="w-full max-w-xl">
                        {children}
                    </motion.div>
                    {stats.length > 0 && (
                        <motion.div
                            ref={statsRef}
                            variants={up}
                            className="mt-14 flex items-center justify-center divide-x"
                            style={{ '--tw-divide-color': 'rgba(255,255,255,0.08)' }}
                        >
                            {stats.map((s, i) => (
                                <AnimatedStat key={i} value={s.value} label={s.label} inView={statsInView} />
                            ))}
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
