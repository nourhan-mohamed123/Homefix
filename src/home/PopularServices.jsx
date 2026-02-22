import React, { useState, useEffect } from 'react';
import { ArrowRight, Star, Loader2, AlertCircle, Wrench } from 'lucide-react';
const SERVICE_ICONS = {
    cleaning: '🧹',
    plumbing: '🔧',
    electrical: '⚡',
    moving: '📦',
    ac: '❄️',
    'air conditioning': '❄️',
    furniture: '🛋️',
    painting: '🎨',
    gardening: '🌿',
    carpentry: '🪚',
    pest: '🐛',
    renovation: '🏗️',
    security: '🔒',
    default: '🔨',
};
const FALLBACK_SERVICES = [
    { id: 1, name: 'House Cleaning', image: 'https://www.patanjaliayurved.net/assets/home_slider/1737889498cleaning.webp', rating: '4.9', price: 'Starting $50', description: 'Professional cleaning services for your home.' },
    { id: 2, name: 'Plumbing', image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=300&fit=crop', rating: '4.8', price: 'Starting $75', description: 'Expert plumbers for all your needs.' },
    { id: 3, name: 'Electrical', image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=300&fit=crop', rating: '4.9', price: 'Starting $80', description: 'Licensed electricians ready to help.' },
    { id: 4, name: 'Moving', image: 'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=400&h=300&fit=crop', rating: '4.7', price: 'Starting $120', description: 'Reliable movers for stress-free relocation.' },
    { id: 5, name: 'AC Repair', image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400&h=300&fit=crop', rating: '4.8', price: 'Starting $90', description: 'Fast AC repair and maintenance.' },
    { id: 6, name: 'Furniture Assembly', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=300&fit=crop', rating: '4.9', price: 'Starting $60', description: 'Professional furniture assembly service.' },
];

const API_BASE_URL = 'https://achievement-dash-nov-pink.trycloudflare.com';

function getServiceIcon(name = '') {
    const lower = name.toLowerCase();
    for (const key of Object.keys(SERVICE_ICONS)) {
        if (lower.includes(key)) return SERVICE_ICONS[key];
    }
    return SERVICE_ICONS.default;
}

function ServiceCard({ service }) {
    const icon = getServiceIcon(service.name);
    const hasImage = !!service.image;

    return (
        <div
            id={`service-card-${service.id}`}
            className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(30,58,138,0.1)] hover:-translate-y-1 transition-all duration-500 group flex flex-col font-['Poppins']"
        >
            <div className="relative h-56 overflow-hidden bg-homefix-bg">
                {hasImage ? (
                    <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                    />
                ) : null}
                <div
                    className="w-full h-full items-center justify-center text-6xl bg-gradient-to-br from-homefix-bg to-gray-100"
                    style={{ display: hasImage ? 'none' : 'flex' }}
                >
                    {icon}
                </div>
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-gray-100">
                    <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-black text-homefix-text">{service.rating || '4.9'}</span>
                </div>
            </div>

            <div className="p-7 flex flex-col flex-1">
                <h3 className="text-xl font-black text-homefix-text mb-2 group-hover:text-homefix-accent transition-colors duration-300">
                    {service.name}
                </h3>
                <p className="text-gray-400 text-sm font-medium leading-relaxed flex-1 mb-6">
                    {service.description || 'Professional service by verified experts.'}
                </p>

                <div className="pt-5 border-t border-gray-50 flex items-center justify-between">
                    <div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-0.5">Price</p>
                        <span className="text-homefix-primary text-lg font-black">
                            {service.price ? service.price.replace('Starting ', '') : 'From $50'}
                        </span>
                    </div>
                    <button
                        id={`book-btn-${service.id}`}
                        className="bg-homefix-primary text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-homefix-accent transition-all duration-300 active:scale-95 shadow-lg shadow-homefix-primary/15"
                    >
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
}
export default function PopularServices() {
    const [services, setServices] = useState(FALLBACK_SERVICES);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [usingFallback, setUsingFallback] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        const fetchServices = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch(`${API_BASE_URL}/api/categories`, {
                    signal: controller.signal,
                    headers: {
                        'ngrok-skip-browser-warning': 'true',
                        'Content-Type': 'application/json',
                    },
                });
                if (!res.ok) throw new Error(`Server error: ${res.status}`);
                const data = await res.json();
                const mapped = Array.isArray(data) && data.length > 0
                    ? data.map((cat, i) => ({
                        id: cat.id || cat._id || i,
                        name: cat.name || cat.title || 'Service',
                        description: cat.description || 'Professional service by verified experts.',
                        image: cat.image || cat.imageUrl || null,
                        rating: cat.rating || '4.9',
                        price: cat.price || cat.startingPrice || `Starting $${50 + i * 10}`,
                    }))
                    : null;
                if (mapped) {
                    setServices(mapped);
                    setUsingFallback(false);
                } else {
                    setUsingFallback(true);
                }
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setUsingFallback(true);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
        return () => controller.abort();
    }, []);

    return (
        <section id="servicesCard" className="bg-homefix-bg px-6 py-24 md:px-12 lg:px-20 font-['Poppins']">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div>
                        <h2 className="text-homefix-text text-3xl md:text-5xl font-black tracking-tight leading-tight">
                            Popular <span className="text-homefix-primary">Services</span>
                        </h2>
                        <p className="text-gray-400 text-base md:text-lg font-light mt-4 max-w-lg">
                            Upfront prices on 50,000+ tasks. Book top-rated professionals in seconds.
                        </p>
                    </div>
                    <button
                        id="view-all-services-btn"
                        className="inline-flex items-center gap-2 text-homefix-accent font-black text-sm hover:gap-4 transition-all duration-300 group shrink-0"
                    >
                        View all services
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                </div>
                {loading && (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <Loader2 className="w-10 h-10 text-homefix-accent animate-spin" />
                        <p className="text-gray-400 font-medium text-sm">Loading services...</p>
                    </div>
                )}
                {!loading && usingFallback && (
                    <div className="flex items-center gap-3 bg-blue-50 border border-blue-100 text-blue-600 px-5 py-3 rounded-xl text-sm font-semibold mb-8">q
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        Showing featured services — live data will appear once the server is connected.
                    </div>
                )}
                {!loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service) => (
                            <ServiceCard key={service.id} service={service} />
                        ))}
                    </div>
                )}
                {!loading && services.length === 0 && (
                    <div className="flex flex-col items-center py-20 gap-4 text-gray-400">
                        <Wrench className="w-12 h-12 text-gray-200" />
                        <p className="font-semibold text-sm">No services found.</p>
                    </div>
                )}
            </div>
        </section>
    );
}