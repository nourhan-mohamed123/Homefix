import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
    Star, Wrench, ChevronRight,
    X, ChevronDown, Search,
    ArrowRight, Filter, SortAsc, TrendingUp, Award,
    Sparkles, Tag
}
    from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiCall, API_ENDPOINTS, API_BASE_URL } from '../config/api.js';
import PageHero from '../components/PageHero';
const SORT_OPTIONS = [
    { value: 'default', label: 'Default', icon: SortAsc },
    { value: 'price_asc', label: 'Price: Low to High', icon: TrendingUp },
    { value: 'price_desc', label: 'Price: High to Low', icon: TrendingUp },
    { value: 'rating_desc', label: 'Highest Rated', icon: Award },
];
function getFullImageUrl(imagePath) {
    if (!imagePath || typeof imagePath !== 'string') {
        return 'https://images.unsplash.com/photo-1581092921461-eab62e92c859?q=80&w=800&h=600&auto=format&fit=crop';
    }
    if (imagePath.startsWith('http')) return imagePath;
    return `${API_BASE_URL}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
}
function ServiceImageCard({ item }) {
    return (
        <div className="flex-shrink-0 mx-4 group cursor-pointer">
            <div className="relative w-64 h-40 rounded-3xl overflow-hidden border border-white/5
                transition-all duration-500 group-hover:scale-[1.03] group-hover:border-white/20
                shadow-2xl shadow-black/40">
                <img src={getFullImageUrl(item.image || item.cover_image)} alt={item.name || item.service_name}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100
                        transition-all duration-700 group-hover:scale-110"
                    onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=Service'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5">
                    <p className="text-white text-sm font-bold tracking-wide flex items-center gap-2">
                        <Tag className="w-3 h-3 text-homefix-accent" />
                        {item.service_name || item.name}
                    </p>
                </div>
            </div>
        </div>
    );
}

function ServiceCard({ service, index }) {
    const rating = service.average_rating || service.rating || '4.9';
    const price = service.pricing?.[0]?.price ?? service.price ?? service.starting_price ?? '---';
    const name = service.service_name || service.name;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100/80
                shadow-xl shadow-gray-200/20 hover:shadow-premium
                transition-all duration-700 flex flex-col font-['Poppins'] relative"
        >
            <div className="relative h-56 overflow-hidden bg-slate-50">
                <img
                    src={getFullImageUrl(service.cover_image || service.image)}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => { e.target.src = 'https://placehold.co/800x600?text=Service'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4 z-10">
                    <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl
                        flex items-center gap-1.5 shadow-sm border border-white/50">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span className="text-xs font-black text-homefix-text">{rating}</span>
                    </div>
                </div>
                {service.category_name && (
                    <div className="absolute bottom-4 right-4 z-10">
                        <div className="bg-homefix-primary/95 backdrop-blur-sm px-3 py-1.5 rounded-xl">
                            <span className="text-[10px] font-extrabold text-white uppercase tracking-[0.1em]">
                                {service.category_name}
                            </span>
                        </div>
                    </div>
                )}
            </div>
            <div className="p-7 flex flex-col flex-1">
                <div className="flex-1 space-y-3 mb-4">
                    <h3 className="text-2xl font-black text-homefix-text leading-tight
                        group-hover:text-homefix-primary transition-colors duration-300">
                        {name}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 font-medium">
                        {service.description || 'Premium home maintenance and professional repair services by certified experts in your area.'}
                    </p>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-black mb-1">Starts at</span>
                        <div className="flex items-baseline gap-1.5">
                            <span className="text-sm font-black text-homefix-primary">EGP</span>
                            <span className="text-3xl font-black text-homefix-primary tabular-nums">
                                {price}
                            </span>
                        </div>
                    </div>
                    <button
                        id={`book-service-${service.service_id || service.id}`}
                        className="relative overflow-hidden bg-homefix-primary text-white px-5 py-3
                            rounded-2xl font-bold transition-all duration-300
                            hover:bg-homefix-text hover:pr-8 group/btn flex items-center gap-2">
                        <span className="text-xs uppercase tracking-wider">Book Now</span>
                        <ChevronRight className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4
                            opacity-0 group-hover/btn:opacity-100 transition-all duration-300" />
                    </button>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-homefix-primary
                scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
        </motion.div>
    );
}

function SkeletonCard() {
    return (
        <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm animate-pulse">
            <div className="p-8 space-y-5">
                <div className="h-6 bg-gray-100 rounded-full w-full" />
                <div className="h-3 bg-gray-50 rounded-full w-4/5" />
                <div className="h-3 bg-gray-50 rounded-full w-3/5" />
                <div className="flex justify-between items-center pt-6 border-t border-gray-50">
                    <div className="space-y-2">
                        <div className="h-2 bg-gray-50 rounded-full w-12" />
                        <div className="h-8 bg-gray-100 rounded-full w-24" />
                    </div>
                    <div className="h-11 w-28 bg-gray-100 rounded-2xl" />
                </div>
            </div>
        </div>
    );
}
function ServicesBanner({ services = [] }) {
    return (
        <>
            <PageHero
                badge={{ icon: Wrench, label: 'Home Services' }}
                title="Browse"
                titleAccent="Services"
                subtitle="Connect with top-rated professionals for maintenance, repairs, and improvements — all with transparent upfront pricing."
                breadcrumb="Services"
                imageUrl="https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1600&auto=format&fit=crop"
                imageAlt="Professional home repair and maintenance work"
                stats={[
                    { value: '300+', label: 'Services' },
                    { value: 'EGP 99+', label: 'Starting at' },
                    { value: '24hr', label: 'Response' },
                ]}
            />
            {services.length > 0 && (
                <div className="bg-[#080E1A] py-5 overflow-hidden">
                    <p className="text-white/20 text-[10px] uppercase tracking-[0.3em] font-bold text-center mb-4">
                        Featured services
                    </p>
                    <div className="relative flex overflow-hidden">
                        <div className="flex gap-0 animate-[marquee_30s_linear_infinite] shrink-0">
                            {[...services, ...services].map((item, idx) => (
                                <ServiceImageCard key={idx} item={item} />
                            ))}
                        </div>
                        <div className="flex gap-0 animate-[marquee_30s_linear_infinite] shrink-0" aria-hidden>
                            {[...services, ...services].map((item, idx) => (
                                <ServiceImageCard key={idx + 'b'} item={item} />
                            ))}
                        </div>
                        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#080E1A] to-transparent pointer-events-none z-10" />
                        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#080E1A] to-transparent pointer-events-none z-10" />
                    </div>
                </div>
            )}
        </>
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
        (async () => {
            try {
                const [svcData, catData] = await Promise.all([
                    apiCall(API_ENDPOINTS.SERVICES),
                    apiCall(API_ENDPOINTS.CATEGORIES),
                ]);
                const serviceList = Array.isArray(svcData) ? svcData : (svcData?.services || svcData?.data || []);
                const categoryList = Array.isArray(catData) ? catData : (catData?.categories || catData?.data || []);

                setServices(serviceList);
                setCategories(categoryList);
            } catch (err) {
                console.error("Failed to load services data:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    useEffect(() => {
        const cat = searchParams.get('category') || 'all';
        setSelectedCategory(cat);
    }, [searchParams]);

    const filtered = useMemo(() => {
        let r = [...services];
        if (selectedCategory && selectedCategory !== 'all') {
            r = r.filter(s =>
                String(s.category_id) === String(selectedCategory) ||
                String(s.category?.id) === String(selectedCategory)
            );
        }
        if (search.trim()) {
            const q = search.toLowerCase();
            r = r.filter(s =>
                (s.service_name || s.name || '').toLowerCase().includes(q) ||
                (s.description || '').toLowerCase().includes(q) ||
                (s.category_name || '').toLowerCase().includes(q)
            );
        }
        if (sortBy === 'price_asc') r.sort((a, b) => (a.pricing?.[0]?.price ?? a.price ?? Infinity) - (b.pricing?.[0]?.price ?? b.price ?? Infinity));
        if (sortBy === 'price_desc') r.sort((a, b) => (b.pricing?.[0]?.price ?? b.price ?? 0) - (a.pricing?.[0]?.price ?? a.price ?? 0));
        if (sortBy === 'rating_desc') r.sort((a, b) => parseFloat(b.average_rating || b.rating || 0) - parseFloat(a.average_rating || a.rating || 0));
        return r;
    }, [services, selectedCategory, search, sortBy]);

    const activeFiltersCount = (selectedCategory !== 'all' ? 1 : 0) + (sortBy !== 'default' ? 1 : 0);
    const SelectedSort = SORT_OPTIONS.find(o => o.value === sortBy) || SORT_OPTIONS[0];
    const resetAll = () => { setSearch(''); setSelectedCategory('all'); setSortBy('default'); };
    return (
        <div className="min-h-screen bg-homefix-bg font-['Poppins']">
            <ServicesBanner services={services.slice(0, 4)} />
            <div className="sticky top-[73px] z-50 bg-white/90 backdrop-blur-3xl border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex flex-wrap items-center gap-4">
                    <div className="relative group flex-1 min-w-[280px]">
                        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                            <Search className="w-5 h-5 text-slate-400 group-focus-within:text-homefix-primary transition-colors" />
                        </div>
                        <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                            placeholder="What do you need help with?"
                            className="w-full bg-slate-50 border border-slate-100 rounded-[1.25rem] pl-14 pr-28 py-4 text-sm
                                font-bold text-homefix-text placeholder:text-slate-400
                                focus:ring-2 focus:ring-homefix-primary/20 focus:border-homefix-primary/20
                                focus:bg-white transition-all" />
                        {!loading && (
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                {search && (
                                    <button onClick={() => setSearch('')}
                                        className="text-slate-300 hover:text-slate-500 transition-colors">
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                                <span className="text-[11px] font-black text-slate-300 tabular-nums">
                                    {filtered.length}
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={() => setShowFilters(!showFilters)}
                            className={`h-14 px-6 rounded-[1.25rem] flex items-center gap-3 text-sm font-black transition-all duration-300
                                ${showFilters || activeFiltersCount > 0
                                    ? 'bg-homefix-primary text-white shadow-lg shadow-homefix-primary/20'
                                    : 'bg-white text-homefix-text border border-slate-200 hover:border-homefix-primary hover:text-homefix-primary'
                                }`}>
                            <Filter className="w-4 h-4" />
                            Categories
                            {activeFiltersCount > 0 && (
                                <span className="bg-homefix-accent text-white text-[10px] min-w-[20px] h-5
                                    rounded-full px-1 flex items-center justify-center font-black">
                                    {activeFiltersCount}
                                </span>
                            )}
                        </button>
                        <div className="relative">
                            <button onClick={() => setSortOpen(!sortOpen)}
                                className="h-14 px-6 rounded-[1.25rem] bg-white border border-slate-200
                                    flex items-center gap-3 text-sm font-bold text-homefix-text
                                    hover:border-homefix-primary hover:text-homefix-primary transition-all">
                                <SelectedSort.icon className="w-4 h-4" />
                                <span className="hidden sm:inline">{SelectedSort.label}</span>
                                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${sortOpen ? 'rotate-180' : ''}`} />
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
                                                rounded-3xl shadow-2xl z-20 overflow-hidden p-2">
                                            {SORT_OPTIONS.map(opt => (
                                                <button key={opt.value}
                                                    onClick={() => { setSortBy(opt.value); setSortOpen(false); }}
                                                    className={`w-full text-left px-5 py-4 rounded-2xl text-sm font-bold
                                                        transition-all flex items-center justify-between
                                                        ${sortBy === opt.value
                                                            ? 'bg-homefix-primary/8 text-homefix-primary'
                                                            : 'text-homefix-text hover:bg-slate-50'}`}>
                                                    {opt.label}
                                                    {sortBy === opt.value && <div className="w-2 h-2 rounded-full bg-homefix-primary" />}
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
                            className="overflow-hidden bg-slate-50 border-t border-slate-100">
                            <div className="max-w-7xl mx-auto px-6 md:px-12 py-6">
                                <div className="flex flex-wrap gap-3">
                                    <button onClick={() => setSelectedCategory('all')}
                                        className={`px-6 py-3 rounded-[1.25rem] text-sm font-black transition-all
                                            ${selectedCategory === 'all'
                                                ? 'bg-homefix-primary text-white shadow-premium'
                                                : 'bg-white text-homefix-text border border-slate-200 hover:border-homefix-primary hover:text-homefix-primary'
                                            }`}>
                                        All Services
                                    </button>
                                    {categories.map(cat => {
                                        const catId = String(cat.category_id || cat.id);
                                        const isActive = selectedCategory === catId;
                                        return (
                                            <button key={catId}
                                                onClick={() => setSelectedCategory(isActive ? 'all' : catId)}
                                                className={`px-6 py-3 rounded-[1.25rem] text-sm font-black transition-all
                                                    ${isActive
                                                        ? 'bg-homefix-primary text-white shadow-premium'
                                                        : 'bg-white text-homefix-text border border-slate-200 hover:border-homefix-primary hover:text-homefix-primary'
                                                    }`}>
                                                {cat.category_name || cat.name}
                                            </button>
                                        );
                                    })}
                                </div>
                                {activeFiltersCount > 0 && (
                                    <button onClick={resetAll}
                                        className="mt-6 inline-flex items-center gap-2 text-xs font-black
                                            text-rose-500 hover:text-rose-700 transition-colors uppercase tracking-widest">
                                        <X className="w-4 h-4" />
                                        Reset All Filters
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <main className="max-w-7xl mx-auto px-6 md:px-12 py-16">
                {error ? (
                    <div className="text-center py-40 bg-white rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/50">
                        <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-8">
                            <Wrench className="w-10 h-10 text-rose-400" />
                        </div>
                        <h2 className="text-3xl font-black text-homefix-text mb-3">Something went wrong</h2>
                        <p className="text-slate-400 text-base mb-10 max-w-md mx-auto">Failed to load services. Please try again.</p>
                        <button onClick={() => window.location.reload()}
                            className="px-10 py-5 bg-homefix-primary text-white rounded-homepro font-black
                                text-sm hover:bg-homefix-accent shadow-premium transition-all">
                            Refresh Page
                        </button>
                    </div>
                ) : loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-40 bg-white rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/50">
                        <div className="w-24 h-24 bg-homefix-primary/8 rounded-full flex items-center justify-center mx-auto mb-8">
                            <Search className="w-10 h-10 text-homefix-primary/40" />
                        </div>
                        <h2 className="text-3xl font-black text-homefix-text mb-3">No results found</h2>
                        <p className="text-slate-400 text-base mb-10 max-w-md mx-auto">
                            No services match your current filters or search query.
                        </p>
                        <button onClick={resetAll}
                            className="px-10 py-5 bg-homefix-primary text-white rounded-homepro font-black
                                text-sm hover:bg-homefix-accent shadow-premium transition-all">
                            Reset Filters
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
            {!loading && !error && (
                <div className="max-w-7xl mx-auto px-6 md:px-12 pb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative bg-homefix-primary rounded-[2.5rem] p-12 md:p-16
                            overflow-hidden shadow-premium text-center"
                    >
                        <div className="absolute top-0 right-0 w-80 h-80 bg-homefix-accent/20
                            rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5
                            rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15
                                text-blue-200 text-[11px] font-black uppercase tracking-[0.3em]
                                px-4 py-2 rounded-full mb-6">
                                <Sparkles className="w-3.5 h-3.5" />
                                Need a hand?
                            </div>
                            <h2 className="text-white text-3xl md:text-4xl font-black mb-4 leading-tight">
                                Book a professional <br className="hidden md:block" />in minutes
                            </h2>
                            <p className="text-blue-100/80 text-base mb-10 max-w-xl mx-auto font-medium">
                                Transparent pricing. Verified experts. Satisfaction guaranteed — or we'll make it right.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link to="/providers"
                                    className="px-8 py-4 bg-white text-homefix-primary rounded-homepro font-black
                                        text-sm hover:bg-blue-50 shadow-xl transition-all">
                                    Meet Our Experts
                                </Link>
                                <Link to="/categories"
                                    className="px-8 py-4 bg-homefix-accent/80 text-white rounded-homepro font-black
                                        text-sm hover:bg-homefix-accent border border-white/10 shadow-xl transition-all">
                                    Browse Categories
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
