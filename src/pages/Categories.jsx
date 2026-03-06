import React, { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, LayoutGrid, LayoutDashboard, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiCall, API_ENDPOINTS, API_BASE_URL } from '../config/api.js';
import PageHero from '../components/PageHero';
const getFullImageUrl = (imagePath) => {
    if (!imagePath) return 'https://placehold.co/400x400?text=Category';
    if (imagePath.startsWith('http')) return imagePath;
    return `${API_BASE_URL}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
};
const cardEntryVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.07 },
    },
};

const springTransition = {
    type: 'spring',
    stiffness: 100,
    damping: 15,
};

function CategoryCard({ category }) {
    const categoryId = category.category_id || category.id;
    return (
        <motion.div
            variants={cardEntryVariant}
            transition={springTransition}
            whileHover={{
                scale: 1.02,
                boxShadow: '0 8px 30px rgba(59,130,246,0.18)',
            }}
            className="will-change-transform"
        >
            <Link
                to={`/services?category=${categoryId}`}
                className="group relative bg-white rounded-[2.5rem] p-2 overflow-hidden border border-blue-100
                    shadow-sm transition-all duration-500 flex flex-col items-center text-center cursor-pointer font-['Poppins'] block"
            >
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-50 rounded-full opacity-40
                    group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

                <div className="relative z-10 w-28 h-28 mt-8 mb-5 rounded-[2rem] overflow-hidden
                    ring-4 ring-blue-400/30 shadow-lg transition-all duration-500">
                    <img src={getFullImageUrl(category.image)} alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={e => e.target.src = 'https://placehold.co/400x400?text=Category'} />
                </div>

                <h3 className="relative z-10 text-lg font-black text-homefix-text mb-2
                    group-hover:text-homefix-primary transition-colors duration-300 px-4 line-clamp-1">
                    {category.name}
                </h3>
                {category.description && (
                    <p className="relative z-10 text-slate-400 text-xs font-medium leading-relaxed px-6 mb-4 line-clamp-2">
                        {category.description}
                    </p>
                )}
                <div className="relative z-10 mb-6 mt-auto flex items-center gap-1.5 text-[10px] font-black
                    uppercase tracking-[0.2em] text-homefix-accent opacity-0 group-hover:opacity-100
                    translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    Browse Services
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-homefix-primary
                    scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
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
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [focused, setFocused] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) navigate(`/services?q=${encodeURIComponent(search.trim())}`);
        else navigate('/services');
    };

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
        <div className="min-h-screen bg-homefix-bg text-homefix-accent font-['Poppins']">

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
            >
                <div className="relative max-w-2xl mx-auto">
                    <motion.form
                        onSubmit={handleSearch}
                        animate={{ boxShadow: focused ? '0 0 0 3px rgba(59,130,246,0.35)' : '0 0 0 0px rgba(59,130,246,0)' }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden"
                    >
                        <div className="pl-5 flex items-center pointer-events-none">
                            <Search className="w-5 h-5 text-homefix-accent" />
                        </div>
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                            placeholder="What service do you need today?"
                            className="flex-1 bg-transparent text-white text-base py-5 pl-4 pr-4 outline-none placeholder:text-white/40 font-medium"
                        />
                        <div className="flex items-center gap-1 pr-2">
                            <AnimatePresence>
                                {search && (
                                    <motion.button
                                        type="button"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        onClick={() => setSearch('')}
                                        className="p-2 text-white/40 hover:text-white transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </motion.button>
                                )}
                            </AnimatePresence>
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                className="bg-homefix-primary hover:bg-homefix-accent text-white px-6 py-3 rounded-xl
                                    font-bold transition-colors duration-300 flex items-center gap-2 text-sm tracking-wide
                                    shadow-lg hover:shadow-homefix-accent/30 flex-shrink-0"
                            >
                                <span>Search</span>
                                <ArrowRight className="w-4 h-4" />
                            </motion.button>
                        </div>
                    </motion.form>
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
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                    >
                        {filtered.map((cat) => (
                            <CategoryCard key={cat.category_id} category={{ ...cat, name: cat.category_name || cat.name }} />
                        ))}
                    </motion.div>
                )}
            </div>
            {!loading && !error && (
                <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="relative bg-gradient-to-br from-homefix-primary via-[#1a3578] to-homefix-accent rounded-[2.5rem] p-12 md:p-16
                            overflow-hidden shadow-2xl text-center"
                    >
                        <div className="absolute -top-10 -right-10 w-52 h-52 bg-white/5 rounded-full pointer-events-none" />
                        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-white/5 rounded-full pointer-events-none" />
                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15
                                text-blue-200 text-[11px] font-black uppercase tracking-[0.3em]
                                px-4 py-2 rounded-full mb-6">
                                <Sparkles className="w-3.5 h-3.5" /> Ready to get started?
                            </div>
                            <h2 className="text-white text-3xl md:text-4xl font-black mb-4 leading-tight">
                                Find a professional<br className="hidden md:block" /> for any home job
                            </h2>
                            <p className="text-white/80 text-base mb-10 max-w-xl mx-auto font-light">
                                Browse services, compare providers, and book in minutes — all in one place.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link to="/services"
                                    className="inline-flex items-center gap-2 bg-white text-homefix-primary px-8 py-4 rounded-xl font-black
                                        text-sm tracking-widest shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300">
                                    Explore Services
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link to="/providers"
                                    className="inline-flex items-center gap-2 bg-transparent border-2 border-white/40 text-white px-8 py-4 rounded-xl font-black
                                        text-sm tracking-widest hover:bg-white/10 hover:border-white transition-all duration-300">
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
