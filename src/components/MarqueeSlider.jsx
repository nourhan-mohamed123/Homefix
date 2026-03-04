import React, { useEffect, useMemo, useRef } from 'react';

/**
 * MarqueeSlider — Infinite scrolling image marquee with hover-to-pause.
 *
 * Props:
 *   items        {Array}   — [{ name, image }, ...]
 *   direction    {'left'|'right'} — scroll direction (default: 'left')
 *   speed        {number}  — seconds per full loop (default: 30)
 *   renderCard   {fn}      — (item) => JSX. Falls back to a default card.
 *   className    {string}  — extra classes on the wrapper
 */

/* ── Inject CSS once ─────────────────────────────────────────────────────── */
const STYLE_ID = 'marquee-slider-styles';

function injectStyles() {
    if (typeof document === 'undefined' || document.getElementById(STYLE_ID)) return;
    const el = document.createElement('style');
    el.id = STYLE_ID;
    el.textContent = `
        @keyframes marquee-left {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
            0%   { transform: translateX(-50%); }
            100% { transform: translateX(0); }
        }
        .marquee-track-left  { animation: marquee-left  var(--marquee-speed, 30s) linear infinite; }
        .marquee-track-right { animation: marquee-right var(--marquee-speed, 30s) linear infinite; }
        .marquee-wrapper:hover .marquee-track-left,
        .marquee-wrapper:hover .marquee-track-right {
            animation-play-state: paused;
        }
    `;
    document.head.appendChild(el);
}
function DefaultCard({ item }) {
    return (
        <div className="flex-shrink-0 mx-3 group">
            <div className="relative w-44 h-32 rounded-2xl overflow-hidden
                border border-white/10 bg-white/5 backdrop-blur-sm
                transition-all duration-500 group-hover:scale-105 group-hover:border-white/25
                group-hover:shadow-xl group-hover:shadow-black/30">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100
                        transition-all duration-500 group-hover:scale-110"
                    onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=2E4699&color=fff&size=256`;
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-3 right-3">
                    <p className="text-white text-xs font-bold truncate drop-shadow">{item.name}</p>
                </div>
            </div>
        </div>
    );
}

export default function MarqueeSlider({
    items = [],
    direction = 'left',
    speed = 20,
    renderCard,
    className = '',
}) {
    const trackRef = useRef(null);

    useEffect(() => { injectStyles(); }, []);

    /* Duplicate items so the loop is seamless */
    const duplicated = useMemo(() => {
        if (items.length === 0) return [];
        // Ensure enough items to fill the screen before the loop starts
        const minItems = Math.max(items.length * 2, 12);
        const result = [];
        while (result.length < minItems) result.push(...items);
        return result.slice(0, minItems);
    }, [items]);

    if (items.length === 0) return null;

    const trackClass =
        direction === 'right' ? 'marquee-track-right' : 'marquee-track-left';

    return (
        <div
            className={`marquee-wrapper relative overflow-hidden w-full ${className}`}
            style={{ '--marquee-speed': `${speed}s` }}
        >
            {/* Edge fades */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 z-10
                bg-gradient-to-r from-inherit to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 z-10
                bg-gradient-to-l from-inherit to-transparent" />

            {/* Scrolling track */}
            <div
                ref={trackRef}
                className={`flex w-max ${trackClass}`}
            >
                {/* Double the list for a seamless loop */}
                {[...duplicated, ...duplicated].map((item, index) => (
                    <React.Fragment key={`${item.name}-${index}`}>
                        {renderCard ? renderCard(item) : <DefaultCard item={item} />}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}
