import React, { useState, useEffect, useMemo } from 'react';
import {
    Search, User, Star, MapPin,
    ShieldCheck, ArrowRight, Filter,
    SortAsc, TrendingUp, Award, Zap,
    ChevronDown, X, Wrench, Briefcase,
    CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { apiCall, API_BASE_URL, API_ENDPOINTS } from '../config/api.js';
import useMakeWebhook from '../hooks/useMakeWebhook';
import MarqueeSlider from '../components/MarqueeSlider';

const getFullImageUrl = (imagePath, name) => {
    if (!imagePath) return `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'Provider')}&background=1E3A8A&color=fff&size=512`;
    if (imagePath.startsWith('http')) return imagePath;
    return `${API_BASE_URL}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
};

const SORT_OPTIONS = [
    { value: 'default', label: 'Default Sorting', icon: SortAsc },
    { value: 'rating_desc', label: 'Highest Rated', icon: Award },
    { value: 'experience_desc', label: 'Most Experienced', icon: TrendingUp },
];

const FALLBACK_PROVIDER_IMAGES = [
    { name: 'Ahmed Hassan', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&h=400&auto=format&fit=crop' },
    { name: 'Sara Mohamed', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=400&auto=format&fit=crop' },
    { name: 'Amr Khaled', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&h=400&auto=format&fit=crop' },
    { name: 'Nour Ali', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&h=400&auto=format&fit=crop' },
];

function ProviderAvatarCard({ item }) {
    return (
        <div className="flex-shrink-0 mx-4 group cursor-pointer">
            <div className="relative w-28 h-28 rounded-full overflow-hidden border border-white/10
                transition-all duration-700 group-hover:scale-110 group-hover:border-homefix-accent/40
                shadow-2xl shadow-black/40 bg-slate-800">
                <img
                    src={item.image} alt={item.name}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100
                        transition-all duration-1000 group-hover:scale-110"
                    onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=1E3A8A&color=fff&size=256`; }}
                />
            </div>
            <p className="text-white/40 text-[10px] font-black text-center mt-3 uppercase tracking-widest group-hover:text-homefix-accent transition-colors">
                {item.name}
            </p>
        </div>
    );
}

function ProviderCard({ provider, index }) {
    const rating = provider.rating || '4.9';
    const name = provider.name || provider.full_name;
    const specialty = provider.specialty || 'Service Professional';
    const city = provider.city || 'Cairo, Egypt';

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
            <div className="relative h-64 overflow-hidden bg-slate-50">
                <img
                    src={getFullImageUrl(provider.avatar_url || provider.image, name)}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute top-5 left-5 z-10 flex flex-col gap-2">
                    <div className="bg-white/95 backdrop-blur-xl px-3.5 py-2 rounded-2xl 
                        flex items-center gap-2 shadow-sm border border-white/50">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span className="text-xs font-black text-homefix-text tracking-tight">{rating}</span>
                    </div>
                </div>

                {provider.is_verified !== false && (
                    <div className="absolute top-5 right-5 z-10 shadow-sm">
                        <div className="bg-homefix-primary/95 backdrop-blur-xl px-4 py-2 rounded-2xl flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                            <span className="text-[10px] font-extrabold text-white uppercase tracking-[0.1em]">
                                Verified Pro
                            </span>
                        </div>
                    </div>
                )}

                <div className="absolute inset-0 bg-homefix-primary/5 group-hover:bg-homefix-primary/10 transition-all duration-500" />
            </div>

            <div className="p-8 flex flex-col flex-1">
                <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2 text-homefix-accent mb-1">
                        <Briefcase className="w-4 h-4" />
                        <span className="text-[10px] uppercase font-black tracking-widest">{specialty}</span>
                    </div>
                    <h3 className="text-2xl font-black text-homefix-text leading-tight
                        group-hover:text-homefix-primary transition-colors duration-300">
                        {name}
                    </h3>
                    <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                        <MapPin className="w-4 h-4 text-slate-300" />
                        <span>{city}</span>
                    </div>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-black mb-1">
                            Availability
                        </span>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-xs font-black text-homefix-text">Available Now</span>
                        </div>
                    </div>

                    <Link
                        to={`/provider/${provider.id}`}
                        className="h-14 w-14 rounded-homepro bg-homefix-primary text-white flex items-center justify-center 
                            shadow-premium hover:bg-homefix-accent transition-all duration-500 group/btn"
                    >
                        <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-1.5 transition-transform duration-500" />
                    </Link>
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
            <div className="h-64 bg-gray-100" />
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
                    <div className="h-14 w-14 bg-gray-100 rounded-homepro" />
                </div>
            </div>
        </div>
    );
}

function ProvidersHero() {
    const { data: sliderData } = useMakeWebhook('provider');
    const sliderItems = (sliderData && sliderData.length > 0) ? sliderData : FALLBACK_PROVIDER_IMAGES;

    return (
        <section className="relative bg-[#0F172A] pt-28 pb-20 overflow-hidden selection:bg-homefix-accent/30">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-homefix-primary/10 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-homefix-accent/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl mb-16"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <span className="h-px w-12 bg-homefix-accent" />
                        <span className="text-homefix-accent text-xs font-black uppercase tracking-[0.4em]">Expert Network</span>
                    </div>
                    <h1 className="text-white text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight">
                        Meet Our <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-homefix-accent via-blue-400 to-homefix-accent animate-gradient-x">
                            Verified Experts.
                        </span>
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl max-w-xl font-medium leading-relaxed mb-10">
                        Connect with top-rated professionals dedicated to excellence in every home maintenance and repair task.
                    </p>
                </motion.div>
            </div>

            <div className="relative z-10">
                <MarqueeSlider
                    items={sliderItems}
                    direction="left"
                    speed={25}
                    renderCard={(item) => <ProviderAvatarCard item={item} />}
                    className="mask-fade-edges"
                />
            </div>
        </section>
    );
}

export default function ProvidersPage() {
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('default');
    const [sortOpen, setSortOpen] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const data = await apiCall(API_ENDPOINTS.PROVIDERS);
                const providersList = Array.isArray(data) ? data : (data?.data ?? []);

                if (providersList.length === 0) {
                    const mockProviders = [
                        { id: 1, name: 'Ahmed Hassan', specialty: 'Full Renovations', rating: '5.0', city: 'Maadi, Cairo', is_verified: true },
                        { id: 2, name: 'Sara Mohamed', specialty: 'Interior Design', rating: '4.8', city: 'Heliopolis, Cairo', is_verified: true },
                        { id: 3, name: 'Amr Khaled', specialty: 'Plumbing Expert', rating: '4.9', city: 'Sheikh Zayed, Giza', is_verified: false },
                        { id: 4, name: 'Nour Ali', specialty: 'Electrical Systems', rating: '4.7', city: 'New Cairo', is_verified: true },
                        { id: 5, name: 'Youssef Zaki', specialty: 'Professional Cleaning', rating: '4.9', city: 'Nasr City, Cairo', is_verified: true },
                        { id: 6, name: 'Laila Fawzy', specialty: 'Landscape Design', rating: '4.6', city: 'Dokki, Giza', is_verified: false },
                    ];
                    setProviders(mockProviders);
                } else {
                    setProviders(providersList);
                }
            } catch (err) {
                console.error('Error fetching providers:', err);
                const mockProviders = [
                    { id: 1, name: 'Ahmed Hassan', specialty: 'Full Renovations', rating: '5.0', city: 'Maadi, Cairo', is_verified: true },
                    { id: 2, name: 'Sara Mohamed', specialty: 'Interior Design', rating: '4.8', city: 'Heliopolis, Cairo', is_verified: true },
                    { id: 3, name: 'Amr Khaled', specialty: 'Plumbing Expert', rating: '4.9', city: 'Sheikh Zayed, Giza', is_verified: false },
                    { id: 4, name: 'Nour Ali', specialty: 'Electrical Systems', rating: '4.7', city: 'New Cairo', is_verified: true },
                ];
                setProviders(mockProviders);
            } finally {
                setLoading(false);
            }
        };

        fetchProviders();
    }, []);

    const filtered = useMemo(() => {
        let result = [...providers];

        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter(p =>
                (p.name || '').toLowerCase().includes(q) ||
                (p.specialty || '').toLowerCase().includes(q) ||
                (p.city || '').toLowerCase().includes(q)
            );
        }

        if (sortBy === 'rating_desc') {
            result.sort((a, b) => parseFloat(b.rating || 0) - parseFloat(a.rating || 0));
        }

        return result;
    }, [providers, search, sortBy]);

    const SelectedSortOption = SORT_OPTIONS.find(o => o.value === sortBy) || SORT_OPTIONS[0];

    return (
        <div className="min-h-screen bg-homefix-bg font-['Poppins']">
            <ProvidersHero />
            <div className="sticky top-[73px] z-50 bg-white/80 backdrop-blur-3xl border-b border-gray-100 shadow-sm transition-all duration-300">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex flex-wrap items-center gap-4">
                    <div className="relative group flex-1 min-w-[300px]">
                        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                            <Search className="w-5 h-5 text-slate-400 group-focus-within:text-homefix-primary transition-colors" />
                        </div>
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search by name, specialty, or city..."
                            className="w-full bg-slate-50 border-none rounded-[1.25rem] pl-14 pr-5 py-4.5 text-sm
                                font-bold text-homefix-text placeholder:text-slate-400 focus:ring-2 focus:ring-homefix-primary/20 
                                transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <button
                                onClick={() => setSortOpen(!sortOpen)}
                                className="h-14 px-6 rounded-[1.25rem] bg-white border border-slate-200 
                                    flex items-center gap-3 text-sm font-bold text-homefix-text
                                    hover:border-homefix-primary hover:text-homefix-primary transition-all"
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
                                                            ? 'bg-homefix-primary/10 text-homefix-primary'
                                                            : 'text-homefix-text hover:bg-slate-50'
                                                        }`}
                                                >
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
            </div>
            <main className="max-w-7xl mx-auto px-6 md:px-12 py-20">
                {error ? (
                    <div className="text-center py-40 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50">
                        <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-8">
                            <Wrench className="w-10 h-10 text-rose-500" />
                        </div>
                        <h2 className="text-3xl font-black text-homefix-text mb-4">Something went wrong</h2>
                        <p className="text-slate-400 text-lg mb-10 max-w-md mx-auto">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-10 py-5 bg-homefix-primary text-white rounded-homepro font-black
                                text-sm hover:bg-homefix-accent shadow-premium transition-all"
                        >
                            Refresh Page
                        </button>
                    </div>
                ) : loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-40 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50">
                        <div className="w-24 h-24 bg-homefix-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                            <Search className="w-10 h-10 text-homefix-primary" />
                        </div>
                        <h2 className="text-3xl font-black text-homefix-text mb-4">No experts found</h2>
                        <p className="text-slate-400 text-lg mb-10 max-w-md mx-auto">
                            We couldn't find any professionals matching your search criteria.
                        </p>
                        <button
                            onClick={() => { setSearch(''); setSortBy('default'); }}
                            className="px-10 py-5 bg-homefix-primary text-white rounded-homepro font-black
                                text-sm hover:bg-homefix-accent shadow-premium transition-all"
                        >
                            Reset Search
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filtered.map((provider, index) => (
                            <ProviderCard
                                key={provider.id || index}
                                provider={provider}
                                index={index}
                            />
                        ))}
                    </div>
                )}
            </main>
            {!loading && (
                <div className="max-w-7xl mx-auto px-6 md:px-12 pb-20">
                    <div className="bg-homefix-primary rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden shadow-premium">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <div className="relative z-10">
                            <h2 className="text-white text-3xl md:text-5xl font-black mb-6 leading-tight">
                                Are you a service professional?
                            </h2>
                            <p className="text-blue-100 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium">
                                Join our network of top-rated experts and grow your business with Homefix.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link
                                    to="/provider-register"
                                    className="px-10 py-5 bg-white text-homefix-primary rounded-homepro font-black
                                        text-sm hover:bg-slate-50 shadow-xl transition-all"
                                >
                                    Register as Provider
                                </Link>
                                <button
                                    className="px-10 py-5 bg-homefix-accent text-white rounded-homepro font-black
                                        text-sm hover:bg-homefix-primary border border-white/20 shadow-xl transition-all"
                                >
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
