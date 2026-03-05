import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, LayoutGrid, LayoutDashboard, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiCall, API_ENDPOINTS, API_BASE_URL } from '../config/api.js';
import PageHero from '../components/PageHero';
const getFullImageUrl = (imagePath) => {
    if (!imagePath) return 'https://placehold.co/400x400?text=Category';
    if (imagePath.startsWith('http')) return imagePath;
    return `${API_BASE_URL}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
};
const ACCENT = {
    bg: 'bg-blue-50', text: 'text-blue-600',
    border: 'border-blue-100', shadow: 'hover:shadow-blue-200/40',
    ring: 'ring-blue-400/30', dot: 'bg-homefix-primary'
};
function CategoryCard({ category, index }) {
    const categoryId = category.category_id || category.id;
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
        >
            <Link
                to={`/services?category=${categoryId}`}
                className={`group relative bg-white rounded-[2rem] overflow-hidden border ${ACCENT.border}
                    shadow-sm ${ACCENT.shadow} hover:shadow-2xl transition-all duration-500
                    flex flex-col items-center text-center cursor-pointer font-['Poppins']
                    hover:-translate-y-2 block`}
            >
                <div className={`absolute -top-12 -right-12 w-40 h-40 ${ACCENT.bg} rounded-full opacity-70
                    group-hover:scale-150 transition-transform duration-700 pointer-events-none`} />
                <div className={`absolute -bottom-8 -left-8 w-28 h-28 ${ACCENT.bg} rounded-full opacity-40
                    group-hover:scale-150 transition-transform duration-700 pointer-events-none`} />
                <div className={`relative z-10 w-28 h-28 mt-10 mb-5 rounded-[1.75rem] overflow-hidden
                    ring-4 ${ACCENT.ring} shadow-lg group-hover:scale-110 group-hover:-translate-y-1
                    transition-all duration-500`}>
                    <img src={getFullImageUrl(category.image)} alt={category.name}
                        className="w-full h-full object-cover"
                        onError={e => e.target.src = 'https://placehold.co/400x400?text=Category'} />
                </div>

                <h3 className={`relative z-10 text-lg font-extrabold text-homefix-text mb-2
                    group-hover:${ACCENT.text} transition-colors duration-300 px-4 line-clamp-1`}>
                    {category.name}
                </h3>
                {category.description && (
                    <p className="relative z-10 text-gray-400 text-xs font-medium leading-relaxed px-6 mb-4 line-clamp-2">
                        {category.description}
                    </p>
                )}
                <div className={`relative z-10 mb-8 mt-auto flex items-center gap-1.5 text-xs font-bold
                    uppercase tracking-wider ${ACCENT.text} opacity-0 group-hover:opacity-100
                    translate-y-2 group-hover:translate-y-0 transition-all duration-300`}>
                    Browse Services
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>

                <div className={`absolute bottom-0 left-0 right-0 h-1 ${ACCENT.dot}
                    scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
            </Link>
        </motion.div>
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
    const [loading, setLoading]       = useState(true);
    const [search, setSearch]         = useState('');
    const [error, setError]           = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const data = await apiCall(API_ENDPOINTS.CATEGORIES);
                const list = Array.isArray(data) ? data : (data?.data ?? []);
                setCategories(list.map(c => ({ ...c, name: c.category_name || c.name || '' })));
            } catch {
                setError('Failed to load categories. Please try again.');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const filtered = useMemo(() => {
        if (!search.trim()) return categories;
        const q = search.toLowerCase();
        return categories.filter(c =>
            (c.name || '').toLowerCase().includes(q) ||
            (c.description || '').toLowerCase().includes(q));
    }, [categories, search]);
    return (
        <div className="min-h-screen bg-homefix-bg font-['Poppins']">

            <PageHero
                badge={{ icon: LayoutDashboard, label: 'Service Categories' }}
                title="Browse" titleAccent="Categories"
                subtitle="Explore our full range of home service categories and find the right professional for every job."
                breadcrumb="Categories"
                imageUrl="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1600&auto=format&fit=crop"
                imageAlt="Beautiful modern home interior"
                stats={[
                    { value: `${categories.length || 12}+`, label: 'Categories' },
                    { value: '500+', label: 'Professionals' },
                    { value: '4.9★', label: 'Avg Rating' },
                ]}
            >                <div className="relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <input type="text" placeholder="Search categories..." value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full bg-white/8 backdrop-blur-md border border-white/12 text-white
                            placeholder:text-white/30 py-4 pl-14 pr-10 rounded-2xl outline-none
                            focus:ring-2 focus:ring-homefix-accent/40 focus:border-homefix-accent/30
                            transition-all text-sm font-medium" />
                    <AnimatePresence>
                        {search && (
                            <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                onClick={() => setSearch('')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors text-lg leading-none">
                                ×
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
            </PageHero>
            {!loading && !error && (
                <div className="bg-white border-b border-gray-100 shadow-sm">
                    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-4 flex items-center justify-between">
                        <p className="text-gray-500 text-sm font-medium">
                            {search
                                ? <span>Showing <span className="font-bold text-homefix-text">{filtered.length}</span> results for "<span className="text-homefix-primary">{search}</span>"</span>
                                : <span><span className="font-bold text-homefix-text">{categories.length}</span> categories available</span>
                            }
                        </p>
                        <Link to="/services"
                            className="flex items-center gap-2 text-sm font-bold text-homefix-primary hover:text-homefix-accent transition-colors">
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
                        <button onClick={() => window.location.reload()}
                            className="mt-4 px-6 py-3 bg-homefix-primary text-white rounded-2xl font-bold text-sm hover:bg-homefix-text transition-colors">
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
                            <button onClick={() => setSearch('')}
                                className="mt-4 px-6 py-3 bg-homefix-primary text-white rounded-2xl font-bold text-sm hover:bg-homefix-text transition-colors">
                                Clear Search
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filtered.map((cat, index) => (
                            <CategoryCard key={cat.category_id} category={{ ...cat, name: cat.category_name || cat.name }} index={index} />
                        ))}
                    </div>
                )}
            </div>
            {!loading && !error && (
                <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
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
                                <Sparkles className="w-3.5 h-3.5" /> Ready to get started?
                            </div>
                            <h2 className="text-white text-3xl md:text-4xl font-black mb-4 leading-tight">
                                Find a professional<br className="hidden md:block" /> for any home job
                            </h2>
                            <p className="text-blue-100/80 text-base mb-10 max-w-xl mx-auto font-medium">
                                Browse services, compare providers, and book in minutes — all in one place.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link to="/services"
                                    className="px-8 py-4 bg-white text-homefix-primary rounded-homepro font-black
                                        text-sm hover:bg-blue-50 shadow-xl transition-all">
                                    Explore Services
                                </Link>
                                <Link to="/providers"
                                    className="px-8 py-4 bg-homefix-accent/80 text-white rounded-homepro font-black
                                        text-sm hover:bg-homefix-accent border border-white/10 shadow-xl transition-all">
                                    Meet Providers
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
