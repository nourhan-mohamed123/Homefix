import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
    Star, Wrench, ChevronRight,
    SlidersHorizontal, X, ChevronDown,
    Search, MapPin, ShieldCheck,
    ArrowRight, Filter, SortAsc,
    TrendingUp, Award, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiCall, API_ENDPOINTS, API_BASE_URL } from '../config/api.js';
import useMakeWebhook from '../hooks/useMakeWebhook';
import MarqueeSlider from '../components/MarqueeSlider';

const getFullImageUrl = (imagePath) => {
    if (!imagePath) return 'https://images.unsplash.com/photo-1581092921461-eab62e92c859?q=80&w=800&h=600&auto=format&fit=crop';
    if (imagePath.startsWith('http')) return imagePath;
    return `${API_BASE_URL}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
};

const SORT_OPTIONS = [
    { value: 'default', label: 'Default Sorting', icon: SortAsc },
    { value: 'price_asc', label: 'Price: Low to High', icon: TrendingUp },
    { value: 'price_desc', label: 'Price: High to Low', icon: TrendingUp },
    { value: 'rating_desc', label: 'Highest Rated', icon: Award },
];

const FALLBACK_IMAGES = [
    { name: 'Electrical Work', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600&h=400&auto=format&fit=crop' },
    { name: 'Furniture Assembly', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=600&h=400&auto=format&fit=crop' },
    { name: 'Plumbing Services', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&h=400&auto=format&fit=crop' },
    { name: 'Home Cleaning', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6958?q=80&w=600&h=400&auto=format&fit=crop' },
];
function ServiceImageCard({ item }) {
    return (
        <div className="flex-shrink-0 mx-4 group cursor-pointer">
            <div className="relative w-64 h-40 rounded-3xl overflow-hidden border border-white/5
                transition-all duration-700 group-hover:scale-[1.02] group-hover:border-white/20
                shadow-2xl shadow-black/40">
                <img
                    src={item.image} alt={item.name}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100
                        transition-all duration-1000 group-hover:scale-110"
                    onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=Service'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5">
                    <p className="text-white text-sm font-bold tracking-wide flex items-center gap-2">
                        <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
                        {item.name}
                    </p>
                </div>
            </div>
        </div>
    );
}

function ServiceCard({ service, index }) {
    const rating = service.average_rating || service.rating || '4.9';
    const price = service.pricing?.[0]?.price ?? service.price ?? service.starting_price;
    const name = service.service_name || service.name;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100/80
                shadow-xl shadow-gray-200/20 hover:shadow-2xl hover:shadow-indigo-500/10 
                transition-all duration-700 flex flex-col font-['Poppins'] relative"
        >
            <div className="relative h-60 overflow-hidden bg-gray-50">
                <img
                    src={getFullImageUrl(service.cover_image || service.image)}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1581092921461-eab62e92c859?q=80&w=600&h=400&auto=format&fit=crop'; }}
                />
                <div className="absolute top-5 left-5 z-10 flex flex-col gap-2">
                    <div className="bg-white/95 backdrop-blur-xl px-3.5 py-2 rounded-2xl 
                        flex items-center gap-2 shadow-sm border border-white/50">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span className="text-xs font-black text-homefix-text tracking-tight">{rating}</span>
                    </div>
                </div>

                {service.category_name && (
                    <div className="absolute top-5 right-5 z-10 shadow-sm">
                        <div className="bg-homefix-primary/95 backdrop-blur-xl px-4 py-2 rounded-2xl">
                            <span className="text-[10px] font-extrabold text-white uppercase tracking-[0.1em]">
                                {service.category_name}
                            </span>
                        </div>
                    </div>
                )}
                <div className="absolute inset-0 bg-indigo-900/10 group-hover:bg-homefix-primary/20 transition-all duration-500" />
            </div>
            <div className="p-8 flex flex-col flex-1">
                <div className="flex-1 space-y-3">
                    <h3 className="text-2xl font-black text-homefix-text leading-tight
                        group-hover:text-homefix-primary transition-colors duration-300">
                        {name}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 font-medium">
                        {service.description || 'Premium home maintenance and professional repair services provided by certified experts in your area.'}
                    </p>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-black mb-1">
                            Starts at
                        </span>
                        <div className="flex items-baseline gap-1.5">
                            <span className="text-sm font-black text-homefix-primary">EGP</span>
                            <span className="text-3xl font-black text-homefix-primary tabular-nums">
                                {price || '---'}
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
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-cyan-400 
                scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
        </motion.div>
    );
}

function SkeletonCard() {
    return (
        <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm animate-pulse">
            <div className="h-60 bg-gray-100" />
            <div className="p-8 space-y-6">
                <div className="space-y-3">
                    <div className="h-2 bg-gray-100 rounded-full w-24" />
                    <div className="h-6 bg-gray-100 rounded-full w-full" />
                    <div className="h-3 bg-gray-50 rounded-full w-4/5" />
                </div>
                <div className="flex justify-between items-center pt-6 border-t border-gray-50">
                    <div className="space-y-2">
                        <div className="h-2 bg-gray-50 rounded-full w-12" />
                        <div className="h-8 bg-gray-100 rounded-lg w-24" />
                    </div>
                    <div className="h-14 w-14 bg-gray-100 rounded-3xl" />
                </div>
            </div>
        </div>
    );
}

function ServicesBanner() {
    const { data: sliderData } = useMakeWebhook('services');
    const sliderItems = (sliderData && sliderData.length > 0) ? sliderData : FALLBACK_IMAGES;

    return (
        <section className="relative bg-slate-950 pt-28 pb-20 overflow-hidden selection:bg-indigo-500/30">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
                {/* Header Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl mb-16"
                >    <h1 className="text-white text-5xl md:text-7xl font-black mb-6 tracking-tighter">
                        Browse <span className="text-blue-500">services</span>
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl max-w-xl font-medium leading-relaxed mb-10">
                        Connect with top-rated professionals for maintenance, repairs, and improvements — all with transparent upfront pricing.
                    </p>
                </motion.div>
            </div>

            {/* Marquee Section */}
            <div className="relative z-10 space-y-6">
                <MarqueeSlider
                    items={sliderItems}
                    direction="left"
                    speed={25}
                    renderCard={(item) => <ServiceImageCard item={item} />}
                    className="mask-fade-edges"
                />
                <MarqueeSlider
                    items={sliderItems}
                    direction="right"
                    speed={30}
                    renderCard={(item) => <ServiceImageCard item={item} />}
                    className="mask-fade-edges"
                />
            </div>
        </section>
    );
}
export default function ServicesPage() {
    const [searchParams] = useSearchParams();
    const initialCategory = searchParams.get('category') || 'all';

    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [sortBy, setSortBy] = useState('default');
    const [showFilters, setShowFilters] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [servicesData, categoriesData] = await Promise.all([
                    apiCall(API_ENDPOINTS.SERVICES),
                    apiCall(API_ENDPOINTS.CATEGORIES),
                ]);
                const servicesList = Array.isArray(servicesData) ? servicesData : (servicesData?.data ?? []);
                const categoriesList = Array.isArray(categoriesData) ? categoriesData : (categoriesData?.data ?? []);
                setServices(servicesList);
                setCategories(categoriesList);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load services. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const cat = searchParams.get('category');
        if (cat) setSelectedCategory(cat);
    }, [searchParams]);

    const filtered = useMemo(() => {
        let result = [...services];
        if (selectedCategory && selectedCategory !== 'all') {
            result = result.filter(s =>
                String(s.category_id) === String(selectedCategory) ||
                String(s.category?.id) === String(selectedCategory)
            );
        }
        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter(s =>
                (s.service_name || s.name || '').toLowerCase().includes(q) ||
                (s.description || '').toLowerCase().includes(q) ||
                (s.category_name || '').toLowerCase().includes(q)
            );
        }
        if (sortBy === 'price_asc') {
            result.sort((a, b) => (a.pricing?.[0]?.price ?? a.price ?? Infinity) - (b.pricing?.[0]?.price ?? b.price ?? Infinity));
        } else if (sortBy === 'price_desc') {
            result.sort((a, b) => (b.pricing?.[0]?.price ?? b.price ?? 0) - (a.pricing?.[0]?.price ?? a.price ?? 0));
        } else if (sortBy === 'rating_desc') {
            result.sort((a, b) => parseFloat(b.average_rating || b.rating || 0) - parseFloat(a.average_rating || a.rating || 0));
        }
        return result;
    }, [services, selectedCategory, search, sortBy]);

    const activeFiltersCount = [
        selectedCategory !== 'all' ? 1 : 0,
        sortBy !== 'default' ? 1 : 0,
    ].reduce((a, b) => a + b, 0);

    const SelectedSortOption = SORT_OPTIONS.find(o => o.value === sortBy) || SORT_OPTIONS[0];

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100/50 font-['Poppins']">
            <ServicesBanner />
            <div className="sticky top-[73px] z-50 bg-white/80 backdrop-blur-3xl border-b border-slate-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex flex-wrap items-center gap-4">
                    <div className="relative group flex-1 min-w-[300px]">
                        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                            <Search className="w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                        </div>
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="What do you need help with?"
                            className="w-full bg-slate-50 border-none rounded-[1.25rem] pl-14 pr-5 py-4.5 text-sm
                                font-bold text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500/20 
                                transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`h-14 px-6 rounded-[1.25rem] flex items-center gap-3 text-sm font-black transition-all duration-300
                                ${showFilters || activeFiltersCount > 0
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                                    : 'bg-white text-slate-700 border border-slate-200 hover:border-indigo-600 hover:text-indigo-600'
                                }`}
                        >
                            <Filter className="w-4 h-4" />
                            Categories
                            {activeFiltersCount > 0 && (
                                <span className="bg-amber-400 text-slate-950 text-[10px] min-w-[20px] h-5 rounded-full px-1
                                    flex items-center justify-center font-black">
                                    {activeFiltersCount}
                                </span>
                            )}
                        </button>
                        <div className="relative">
                            <button
                                onClick={() => setSortOpen(!sortOpen)}
                                className="h-14 px-6 rounded-[1.25rem] bg-white border border-slate-200 
                                    flex items-center gap-3 text-sm font-bold text-slate-700
                                    hover:border-indigo-600 hover:text-indigo-600 transition-all"
                            >
                                <SelectedSortOption.icon className="w-4 h-4" />
                                <span className="hidden sm:inline">{SelectedSortOption.label}</span>
                                <ChevronDown className={`w-4 h-4 transition-transform duration-500 ${sortOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {sortOpen && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setSortOpen(false)} />
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute right-0 mt-3 w-64 bg-white border border-slate-100
                                                rounded-3xl shadow-2xl z-20 overflow-hidden p-2"
                                        >
                                            {SORT_OPTIONS.map(opt => (
                                                <button
                                                    key={opt.value}
                                                    onClick={() => { setSortBy(opt.value); setSortOpen(false); }}
                                                    className={`w-full text-left px-5 py-4 rounded-2xl text-sm font-bold
                                                        transition-all flex items-center justify-between
                                                        ${sortBy === opt.value
                                                            ? 'bg-indigo-50 text-indigo-700'
                                                            : 'text-slate-600 hover:bg-slate-50'
                                                        }`}
                                                >
                                                    {opt.label}
                                                    {sortBy === opt.value && <div className="w-2 h-2 rounded-full bg-indigo-600" />}
                                                </button>
                                            ))}
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden bg-slate-50 border-t border-slate-100"
                        >
                            <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
                                <div className="flex flex-wrap gap-3">
                                    <button
                                        onClick={() => setSelectedCategory('all')}
                                        className={`px-6 py-3.5 rounded-[1.25rem] text-sm font-black transition-all
                                            ${selectedCategory === 'all'
                                                ? 'bg-slate-900 text-white shadow-xl shadow-slate-200'
                                                : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-600'
                                            }`}
                                    >
                                        Everything
                                    </button>
                                    {categories.map(cat => {
                                        const catId = String(cat.category_id || cat.id);
                                        const isActive = selectedCategory === catId;
                                        return (
                                            <button
                                                key={catId}
                                                onClick={() => setSelectedCategory(isActive ? 'all' : catId)}
                                                className={`px-6 py-3.5 rounded-[1.25rem] text-sm font-black transition-all
                                                    ${isActive
                                                        ? 'bg-slate-900 text-white shadow-xl shadow-slate-200'
                                                        : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-600'
                                                    }`}
                                            >
                                                {cat.category_name || cat.name}
                                            </button>
                                        );
                                    })}
                                </div>
                                {activeFiltersCount > 0 && (
                                    <button
                                        onClick={() => { setSelectedCategory('all'); setSortBy('default'); }}
                                        className="mt-8 inline-flex items-center gap-2 text-xs font-black text-rose-500
                                            hover:text-rose-700 transition-colors uppercase tracking-widest"
                                    >
                                        <X className="w-4 h-4" />
                                        Reset All Changes
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <main className="max-w-7xl mx-auto px-6 md:px-12 py-20">
                {error ? (
                    <div className="text-center py-40 bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50">
                        <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-8">
                            <Wrench className="w-10 h-10 text-rose-500" />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 mb-4">Something went wrong</h2>
                        <p className="text-slate-400 text-lg mb-10 max-w-md mx-auto">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-10 py-5 bg-indigo-600 text-white rounded-[1.5rem] font-black
                                text-sm hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all"
                        >
                            Refresh Page
                        </button>
                    </div>
                ) : loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-40 bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50">
                        <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-8">
                            <Search className="w-10 h-10 text-indigo-500" />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 mb-4">No results found</h2>
                        <p className="text-slate-400 text-lg mb-10 max-w-md mx-auto">
                            We couldn't find any services matching your current filters or search query.
                        </p>
                        <button
                            onClick={() => { setSearch(''); setSelectedCategory('all'); setSortBy('default'); }}
                            className="px-10 py-5 bg-slate-900 text-white rounded-[1.5rem] font-black
                                text-sm hover:bg-slate-800 shadow-xl shadow-slate-200 transition-all"
                        >
                            Reset Search
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filtered.map((service, index) => (
                            <ServiceCard
                                key={service.id || service.service_id || index}
                                service={service}
                                index={index}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
