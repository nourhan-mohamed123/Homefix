import React from 'react';
import { ArrowRight, Star, Loader2, Wrench, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { API_BASE_URL } from '../config/api.js';
const popCardVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const popStaggerContainer = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.07 },
    },
};

const popSpring = {
    type: 'spring',
    stiffness: 100,
    damping: 15,
};
const getFullImageUrl = (imagePath) => {
    if (!imagePath) return 'https://placehold.co/600x400?text=HomeFix';
    if (imagePath.startsWith('http')) return imagePath;
    return `${API_BASE_URL}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
};

function ServiceCard({ service }) {
    const name = service.service_name || service.name;
    const price = service.pricing?.[0]?.price ?? service.price ?? service.starting_price ?? '00';
    const rating = service.average_rating || service.rating || '4.9';
    const image = service.cover_image || service.image;

    return (
        <motion.div
            variants={popCardVariant}
            transition={popSpring}
            whileHover={{
                scale: 1.02,
                boxShadow: '0 8px 30px rgba(59,130,246,0.18)',
            }}
            className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm
                flex flex-col font-['Poppins'] will-change-transform"
        >
            <div className="relative h-48 overflow-hidden bg-gray-100">
                <img
                    src={getFullImageUrl(image)}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=Service'; }}
                />
                <div className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-2xl flex items-center gap-1.5 shadow-sm border border-white/20">
                    <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                    <span className="text-[11px] font-extrabold text-homefix-text">{rating}</span>
                </div>
                {service.category_name && (
                    <div className="absolute top-4 right-4 z-10 bg-homefix-primary/80 backdrop-blur-md px-3 py-1.5 rounded-2xl">
                        <span className="text-[10px] font-bold text-white uppercase tracking-wide">
                            {service.category_name}
                        </span>
                    </div>
                )}
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300" />
            </div>
            <div className="p-6 flex flex-col flex-1">
                <div className="flex-1">
                    <h3 className="text-xl font-black text-homefix-text mb-2 group-hover:text-homefix-primary transition-colors line-clamp-1">
                        {name}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-6 font-medium">
                        {service.description || 'Professional service by verified experts.'}
                    </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-0.5">Starting From</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-xs font-bold text-homefix-primary">EGP</span>
                            <span className="text-2xl font-black text-homefix-text leading-none">
                                {price}
                            </span>
                        </div>
                    </div>
                    <button
                        id={`book-service-${service.service_id || service.id}`}
                        className="relative overflow-hidden bg-homefix-primary text-white p-3 rounded-2xl font-bold transition-all duration-300 hover:bg-homefix-text hover:pr-8 group/btn"
                    >
                        <span className="text-xs uppercase tracking-wider relative z-10">Book Now</span>
                        <ChevronRight className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 opacity-0 group-hover/btn:opacity-100 transition-all duration-300" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

export default function PopularServices({ services = [], loading = false }) {
    return (
        <section id="services" className="bg-white px-6 py-20 md:px-12 lg:px-20 font-['Poppins']">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={popSpring}
                >
                    <div className="space-y-2">
                        <h2 className="text-homefix-text text-3xl md:text-5xl font-black tracking-tight">
                            Popular <span className="text-homefix-primary">Services</span>
                        </h2>
                    </div>
                    <Link to="/services" className="group flex items-center gap-2 px-6 py-3 bg-gray-50 text-homefix-text rounded-2xl font-bold text-sm hover:bg-homefix-primary hover:text-white transition-all duration-300">
                        View All Services
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
                {loading ? (
                    <div className="flex flex-col items-center py-32 gap-4">
                        <div className="relative">
                            <Loader2 className="w-12 h-12 text-homefix-primary animate-spin" />
                            <div className="absolute inset-0 bg-homefix-primary/10 blur-xl rounded-full"></div>
                        </div>
                        <p className="text-gray-500 font-medium animate-pulse">Fetching premium services...</p>
                    </div>
                ) : services.length === 0 ? (
                    <div className="text-center py-32 rounded-[3rem] bg-gray-50/50 border border-dashed border-gray-200">
                        <Wrench className="w-16 h-16 mx-auto mb-4 text-gray-200" />
                        <p className="text-gray-500 font-semibold text-lg">No services available right now.</p>
                        <p className="text-gray-400 text-sm">Please check back later or refresh the page.</p>
                    </div>
                ) : (
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                        variants={popStaggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        {services.map((service) => (
                            <ServiceCard key={service.id || service.service_id} service={service} />
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
}