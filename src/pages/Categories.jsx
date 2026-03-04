import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, LayoutGrid, Loader2, Home, ChevronRight } from 'lucide-react';
import { apiCall, API_ENDPOINTS, API_BASE_URL } from '../config/api.js';
import useMakeWebhook from '../hooks/useMakeWebhook';
import MarqueeSlider from '../components/MarqueeSlider';

const getFullImageUrl = (imagePath) => {
    if (!imagePath) return 'https://placehold.co/400x400?text=Category';
    if (imagePath.startsWith('http')) return imagePath;
    return `${API_BASE_URL}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
};

/* Fallback icon cards — shown when webhook is not yet configured */
const FALLBACK_ICONS = [
    { name: 'Home Services', image: 'https://cdn-icons-png.flaticon.com/512/4635/4635163.png' },
    { name: 'Tech & IT', image: 'https://cdn-icons-png.flaticon.com/512/2271/2271046.png' },
    { name: 'Cleaning', image: 'https://cdn-icons-png.flaticon.com/512/995/995016.png' },
    { name: 'Painting', image: 'https://cdn-icons-png.flaticon.com/512/1048/1048968.png' },
    { name: 'Carpentry', image: 'https://cdn-icons-png.flaticon.com/512/2543/2543369.png' },
    { name: 'AC Repair', image: 'https://cdn-icons-png.flaticon.com/512/3274/3274149.png' },
    { name: 'Plumbing', image: 'https://cdn-icons-png.flaticon.com/512/4635/4635163.png' },
    { name: 'Electrical', image: 'https://cdn-icons-png.flaticon.com/512/2271/2271046.png' },
];

function IconCard({ item }) {
    return (
        <div className="flex-shrink-0 mx-3 group cursor-pointer">
            <div className="w-32 bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl
                p-4 flex flex-col items-center gap-2.5 transition-all duration-400
                hover:bg-white/15 hover:border-white/25 hover:scale-105 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-white/10 p-2 flex items-center justify-center
                    group-hover:bg-white/20 transition-all duration-300">
                    <img
                        src={item.image} alt={item.name}
                        className="w-full h-full object-contain drop-shadow"
                        onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/1946/1946488.png'; }}
                    />
                </div>
                <span className="text-white/80 text-[11px] font-bold text-center line-clamp-1
                    group-hover:text-white transition-colors tracking-wide">
                    {item.name}
                </span>
            </div>
        </div>
    );
}

const ACCENT_COLORS = [
    { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100', shadow: 'hover:shadow-blue-200/40', ring: 'ring-blue-400/30', dot: 'bg-blue-500' },
    { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-100', shadow: 'hover:shadow-purple-200/40', ring: 'ring-purple-400/30', dot: 'bg-purple-500' },
    { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-100', shadow: 'hover:shadow-rose-200/40', ring: 'ring-rose-400/30', dot: 'bg-rose-500' },
];

function CategoryCard({ category, index }) {
    const accent = ACCENT_COLORS[index % ACCENT_COLORS.length];
    const categoryId = category.category_id || category.id;

    return (
        <Link
            to={`/services?category=${categoryId}`}
            className={`group relative bg-white rounded-[2rem] overflow-hidden border ${accent.border}
                shadow-sm ${accent.shadow} hover:shadow-2xl transition-all duration-500
                flex flex-col items-center text-center cursor-pointer font-['Poppins']
                hover:-translate-y-2`}
        >
            <div className={`absolute -top-12 -right-12 w-40 h-40 ${accent.bg} rounded-full opacity-70
                group-hover:scale-150 transition-transform duration-700 pointer-events-none`} />
            <div className={`absolute -bottom-8 -left-8 w-28 h-28 ${accent.bg} rounded-full opacity-40
                group-hover:scale-150 transition-transform duration-700 pointer-events-none`} />
            <div className={`relative z-10 w-28 h-28 mt-10 mb-5 rounded-[1.75rem] overflow-hidden
                ring-4 ${accent.ring} shadow-lg group-hover:scale-110 group-hover:-translate-y-1
                transition-all duration-500`}
            >
                <img
                    src={getFullImageUrl(category.image)}
                    alt={category.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = 'https://placehold.co/400x400?text=Category'; }}
                />
            </div>
            <h3 className={`relative z-10 text-lg font-extrabold text-[#0F172A] mb-2
                group-hover:${accent.text} transition-colors duration-300 px-4 line-clamp-1`}
            >
                {category.name}
            </h3>
            {category.description && (
                <p className="relative z-10 text-gray-400 text-xs font-medium leading-relaxed
                    px-6 mb-4 line-clamp-2">
                    {category.description}
                </p>
            )}
            <div className={`relative z-10 mb-8 mt-auto flex items-center gap-1.5 text-xs font-bold
                uppercase tracking-wider ${accent.text} opacity-0 group-hover:opacity-100
                translate-y-2 group-hover:translate-y-0 transition-all duration-300`}
            >
                Browse Services
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className={`absolute bottom-0 left-0 right-0 h-1 ${accent.dot}
                scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
        </Link>
    );
}

function SkeletonCard() {
    return (
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm flex flex-col items-center animate-pulse">
            <div className="w-28 h-28 mt-10 mb-5 rounded-[1.75rem] bg-gray-200" />
            <div className="h-4 w-24 bg-gray-200 rounded-full mb-3" />
            <div className="h-3 w-32 bg-gray-100 rounded-full mb-2" />
            <div className="h-3 w-20 bg-gray-100 rounded-full mb-10" />
        </div>
    );
}

export default function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [error, setError] = useState(null);
    const { data: sliderData } = useMakeWebhook('category');
    const sliderItems = sliderData.length > 0 ? sliderData : FALLBACK_ICONS;
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await apiCall(API_ENDPOINTS.CATEGORIES);
                const list = Array.isArray(data) ? data : (data?.data ?? []);
                const normalised = list.map(cat => ({
                    ...cat,
                    name: cat.category_name || cat.name || '',
                }));

                setCategories(normalised);
            } catch (err) {
                console.error('Error fetching categories:', err);
                setError('Failed to load categories. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);
const filtered = useMemo(() => {
        if (!search.trim()) return categories;
        const q = search.toLowerCase();
        return categories.filter(cat =>
            (cat.name || cat.category_name || '').toLowerCase().includes(q) ||
            (cat.description || '').toLowerCase().includes(q)
        );
    }, [categories, search]);
    return (
        <div className="min-h-screen bg-[#F8FAFC] font-['Poppins']">
            <div className="relative bg-[#0F172A] overflow-hidden">
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}
                />
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2E4699]/30 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-[#F5A623]/20 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-16 pb-20">
                    <div className="flex items-center gap-2 text-white/50 text-sm mb-8">
                        <Link to="/" className="flex items-center gap-1.5 hover:text-white transition-colors">
                            <Home className="w-4 h-4" />
                            <span>Home</span>
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white font-semibold">Categories</span>
                    </div>
                    <h1 className="text-white text-5xl md:text-7xl font-black mb-6 tracking-tighter">
                        Browse <span className="text-blue-500">Categories</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-xl mb-10 font-light">
                        Explore our wide range of home service categories and find the perfect professional for every job.
                    </p>
                    <div className="relative max-w-lg">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            id="category-search"
                            type="text"
                            placeholder="Search categories..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white
                                placeholder:text-white/40 py-4 pl-14 pr-6 rounded-2xl outline-none
                                focus:ring-2 focus:ring-homefix-accent/50 focus:border-homefix-accent/30
                                transition-all text-sm font-medium"
                        />
                        {search && (
                            <button
                                onClick={() => setSearch('')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors text-lg leading-none"
                            >
                                ×
                            </button>
                        )}
                    </div>

                    <div className="mt-10 -mx-6 md:-mx-12 lg:-mx-20">
                        <p className="text-white/30 text-[10px] uppercase tracking-[0.25em] font-bold mb-4 px-6 md:px-12 lg:px-20">
                            Browse categories
                        </p>
                        <MarqueeSlider
                            items={sliderItems}
                            direction="left"
                            speed={25}
                            renderCard={(item) => <IconCard item={item} />}
                            className="from-[#0F172A]"
                        />
                    </div>
                </div>
            </div>
            {!loading && !error && (
                <div className="bg-white border-b border-gray-100 shadow-sm">
                    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-4 flex items-center justify-between">
                        <p className="text-gray-500 text-sm font-medium">
                            {search
                                ? <span>Showing <span className="font-bold text-[#0F172A]">{filtered.length}</span> results for "<span className="text-[#2E4699]">{search}</span>"</span>
                                : <span><span className="font-bold text-[#0F172A]">{categories.length}</span> categories available</span>
                            }
                        </p>
                        <Link
                            to="/services"
                            className="flex items-center gap-2 text-sm font-bold text-[#2E4699] hover:text-[#F5A623] transition-colors"
                        >
                            View All Services <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            )}
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-14">
                {error ? (
                    <div className="text-center py-32">
                        <LayoutGrid className="w-16 h-16 mx-auto mb-4 text-gray-200" />
                        <p className="text-gray-500 font-semibold text-lg mb-2">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 px-6 py-3 bg-[#2E4699] text-white rounded-2xl font-bold text-sm hover:bg-[#0F172A] transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                ) : loading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-32 rounded-[3rem] bg-white border border-dashed border-gray-200">
                        <LayoutGrid className="w-16 h-16 mx-auto mb-4 text-gray-200" />
                        <p className="text-gray-500 font-semibold text-lg">
                            {search ? `No categories match "${search}"` : 'No categories available.'}
                        </p>
                        {search && (
                            <button
                                onClick={() => setSearch('')}
                                className="mt-4 px-6 py-3 bg-[#2E4699] text-white rounded-2xl font-bold text-sm hover:bg-[#0F172A] transition-colors"
                            >
                                Clear Search
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filtered.map((cat, index) => (
                            <CategoryCard
                                key={cat.category_id}
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
        </div>
    );
}
