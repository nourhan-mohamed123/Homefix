import React from 'react';
import { ArrowRight, Star, Loader2, Wrench } from 'lucide-react';
import { API_BASE_URL } from '../config/api.js';
const getFullImageUrl = (imagePath) => {
    if (!imagePath) return 'https://placehold.co/600x400?text=HomeFix';
    if (imagePath.startsWith('http')) return imagePath;
    return `${API_BASE_URL}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
};

function ServiceCard({ service }) {
    const tintBg = service.color ? `${service.color}20` : '#F1F5F920';

    return (
        <div className="bg-white rounded-[1.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col font-['Poppins']">
            <div className="relative h-40 overflow-hidden bg-gray-50">
                <img
                    src={getFullImageUrl(service.image)}
                    alt={service.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=Service'; }}
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-[10px] font-bold text-homefix-text">{service.rating || '4.9'}</span>
                </div>
            </div>
            <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-black text-homefix-text mb-1 truncate">
                    {service.name}
                </h3>
                <p className="text-gray-400 text-xs line-clamp-2 mb-4">
                    {service.description || 'Professional service by verified experts.'}
                </p>

                <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                    <div>
                        <p className="text-[9px] text-gray-400 uppercase font-bold">Starting</p>
                        <span className="text-homefix-primary text-base font-black">
                            {service.price || service.starting_price || '$50'}
                        </span>
                    </div>
                    <button className="bg-homefix-primary text-white px-4 py-2 rounded-lg font-bold text-[10px] uppercase tracking-wider hover:bg-homefix-accent transition-colors">
                        Book
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function PopularServices({ categories = [], loading = false }) {
    return (
        <section id="services" className="bg-homefix-bg px-6 py-16 md:px-12 lg:px-20 font-['Poppins']">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-end justify-between mb-10">
                    <h2 className="text-homefix-text text-2xl md:text-4xl font-black">
                        Popular <span className="text-homefix-primary">Services</span>
                    </h2>
                    <button className="text-homefix-accent font-bold text-xs flex items-center gap-1 hover:gap-2 transition-all">
                        View all <ArrowRight className="w-3 h-3" />
                    </button>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center py-20 gap-3">
                        <Loader2 className="w-8 h-8 text-homefix-accent animate-spin" />
                        <p className="text-gray-400 text-xs">Loading services...</p>
                    </div>
                ) : categories.length === 0 ? (
                    <div className="text-center py-20 text-gray-400">
                        <Wrench className="w-10 h-10 mx-auto mb-3 opacity-20" />
                        <p className="text-sm font-medium">No services found.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.map((cat) => (
                            <ServiceCard key={cat.category_id || cat.id} service={cat} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}