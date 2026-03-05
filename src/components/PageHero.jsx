import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';

export default function PageHero({
    badge, title, titleAccent, subtitle,
    breadcrumb, stats = [], imageUrl, imageAlt = '', children,
}) {
    const BadgeIcon = badge?.icon;

    const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
    const up = {
        hidden: { opacity: 0, y: 20 },
        show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    };

    return (
        <section
            className="relative overflow-hidden font-['Poppins']"
            style={{ background: '#0B1426', minHeight: '72vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
            {imageUrl && (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ duration: 1.2 }}
                    className="absolute inset-0 z-0"
                >
                    <img src={imageUrl} alt={imageAlt} className="w-full h-full object-cover object-center" />
                    <div className="absolute inset-0" style={{ background: 'rgba(11,20,38,0.88)' }} />
                    <div className="absolute inset-0" style={{
                        background: 'linear-gradient(to top, rgba(30,58,138,0.25) 0%, transparent 50%)'
                    }} />
                </motion.div>
            )}

            <div className="absolute top-0 left-0 right-0 h-[3px] z-10"
                style={{ background: 'linear-gradient(90deg, #1E3A8A, #3B82F6, #1E3A8A)' }} />

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
                            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] px-4 py-2 rounded-sm"
                                style={{
                                    background: 'rgba(59,130,246,0.12)',
                                    border: '1px solid rgba(59,130,246,0.3)',
                                    color: '#93C5FD',
                                }}>
                                {BadgeIcon && <BadgeIcon className="w-3.5 h-3.5" />}
                                {badge.label}
                            </span>
                        </motion.div>
                    )}

                    <motion.h1 variants={up}
                        className="font-black text-white leading-[1.06] tracking-tight mb-4"
                        style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}
                    >
                        {title}{' '}
                        <span style={{ color: '#3B82F6' }}>{titleAccent}</span>
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
                        <motion.div variants={up}
                            className="mt-14 flex items-center justify-center divide-x"
                            style={{ '--tw-divide-color': 'rgba(255,255,255,0.08)' }}
                        >
                            {stats.map((s, i) => (
                                <div key={i} className="flex flex-col items-center px-8 first:pl-0 last:pr-0"
                                    style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                                    <span className="text-2xl font-black text-homefix-accent tabular-nums">{s.value}</span>
                                    <span className="text-white/30 text-[10px] font-semibold uppercase tracking-[0.2em] mt-0.5">{s.label}</span>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
