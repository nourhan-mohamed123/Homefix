import React, { memo } from 'react';
import { ArrowRight, Loader2, LayoutGrid } from 'lucide-react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config/api.js';
const getFullImageUrl = (imagePath) => {
    if (!imagePath) return 'https://placehold.co/400x400?text=Category';
    if (imagePath.startsWith('http')) return imagePath;
    return `${API_BASE_URL}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
};

const ACCENT_COLORS = [
    { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100', shadow: 'hover:shadow-blue-200/40', ring: 'ring-blue-400/30' },
];
const CategoryCard = memo(({ category, index }) => {
    const accent = ACCENT_COLORS[index % ACCENT_COLORS.length];
    const categoryName = category.category_name || category.name || 'Unnamed Category';

    return (
        <div
            className={`group relative bg-white rounded-[2.5rem] p-2 overflow-hidden border ${accent.border}
                shadow-sm ${accent.shadow} hover:shadow-2xl hover:-translate-y-1 transition-all duration-500
                flex flex-col items-center text-center cursor-pointer`}
        >
            <div className={`absolute -top-12 -right-12 w-32 h-32 ${accent.bg} rounded-full opacity-40 
                group-hover:scale-150 transition-transform duration-700 pointer-events-none`} />

            <div className={`relative z-10 w-28 h-28 mt-8 mb-5 rounded-[2rem] overflow-hidden
                ring-4 ${accent.ring} shadow-lg group-hover:rotate-3 transition-all duration-500`}
            >
                <img
                    src={getFullImageUrl(category.image)}
                    alt={categoryName}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => { e.target.src = 'https://placehold.co/400x400?text=Category'; }}
                />
            </div>

            <h3 className={`relative z-10 text-lg font-black text-[#1e293b] mb-2
                group-hover:${accent.text} transition-colors duration-300 px-4 line-clamp-1`}
            >
                {categoryName}
            </h3>

            <p className="relative z-10 text-slate-400 text-xs font-medium leading-relaxed px-6 mb-6 line-clamp-2">
                {category.description || `High-quality ${categoryName.toLowerCase()} solutions for your home.`}
            </p>

            <div className={`relative z-10 mb-6 mt-auto flex items-center gap-1.5 text-[10px] font-black
                uppercase tracking-[0.2em] ${accent.text} opacity-0 group-hover:opacity-100
                translate-y-2 group-hover:translate-y-0 transition-all duration-300`}
            >
                View Services
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
        </div>
    );
});

export default function Category({ categories = [], loading = false }) {
    return (
        <section id="categories" className="bg-[#FAFBFF] px-6 py-24 md:px-12 lg:px-20 font-['Poppins']">
            <div className="max-w-7xl mx-auto">
                <header className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="space-y-4">
                        <h2 className="text-[#1e293b] text-4xl md:text-6xl font-black tracking-tight leading-tight">
                            What do you <span className="text-homefix-primary">need?</span>
                        </h2>
                    </div>
                    <Link to="/categories" className="group flex items-center gap-3 px-8 py-4 bg-white text-[#1e293b]
                        rounded-2xl font-extrabold text-sm hover:bg-homefix-primary hover:text-white
                        transition-all duration-500 shadow-xl shadow-blue-900/5 border border-slate-50">
                        View All
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </header>

                {loading ? (
                    <div className="flex flex-col items-center py-40 gap-6">
                        <div className="relative">
                            <Loader2 className="w-16 h-16 text-blue-600 animate-spin opacity-20" />
                            <div className="absolute inset-0 bg-blue-600/5 blur-2xl rounded-full" />
                        </div>
                        <p className="text-slate-400 font-bold tracking-[0.2em] text-[10px] uppercase animate-pulse">Fetching Data...</p>
                    </div>
                ) : !categories?.length ? (
                    <div className="text-center py-32 rounded-[4rem] bg-white border-2 border-dashed border-slate-100 shadow-inner">
                        <LayoutGrid className="w-20 h-20 mx-auto mb-6 text-slate-100" />
                        <p className="text-slate-500 font-black text-xl mb-2">No categories found</p>
                        <p className="text-slate-400 text-sm font-medium">Please try refreshing the page.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                        {categories.map((cat, index) => (
                            <CategoryCard
                                key={cat.category_id || `cat-${index}`}
                                category={{
                                    ...cat,
                                    name: cat.category_name || cat.name,
                                }}
                                index={index}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}