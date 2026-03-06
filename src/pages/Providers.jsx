import React, { useState, useEffect, useMemo } from "react";
import {
  Search, User, Star, MapPin, ShieldCheck, ArrowRight, Filter, SortAsc, TrendingUp, Award, Zap,
  ChevronDown, X, Wrench, Briefcase, CheckCircle2, Phone,
  Clock, ThumbsUp, BadgeCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import { motion, AnimatePresence } from "framer-motion";
import { apiCall, API_BASE_URL, API_ENDPOINTS } from "../config/api.js";
const getFullImageUrl = (imagePath, name) => {
  if (!imagePath)
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "Provider")}&background=1E3A8A&color=fff&size=512`;
  if (imagePath.startsWith("http")) return imagePath;
  return `${API_BASE_URL}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
};
const SORT_OPTIONS = [
  { value: "default", label: "Default Sorting", icon: SortAsc },
  { value: "rating_desc", label: "Highest Rated", icon: Award },
  { value: "experience_desc", label: "Most Experienced", icon: TrendingUp },
];
function ProviderDrawer({ provider, onClose }) {
  const rating = parseFloat(provider.rating || 4.9);
  const name = provider.name || provider.full_name;
  const specialty = provider.specialty || "Service Professional";
  const city = provider.city || "Cairo, Egypt";
  const isLoggedIn = () => {
    try {
      return !!(
        localStorage.getItem("token") ||
        localStorage.getItem("user") ||
        sessionStorage.getItem("token") ||
        sessionStorage.getItem("user")
      );
    } catch { return false; }
  };

  const reviews = provider.reviews || [
    { id: 1, author: "Ahmed K.", text: "Excellent work, very professional and on time!", stars: 5 },
    { id: 2, author: "Sara M.", text: "Great service, highly recommend!", stars: 5 },
    { id: 3, author: "Omar H.", text: "Good quality, will book again.", stars: 4 },
  ];

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        key="drawer"
        className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-[2.5rem] overflow-hidden font-['Poppins']"
        style={{ maxHeight: "92vh" }}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 32 }}
      >
        <div className="flex justify-center pt-4 pb-2">
          <div className="w-12 h-1.5 rounded-full bg-slate-200" />
        </div>
        <div className="overflow-y-auto" style={{ maxHeight: "calc(92vh - 28px)" }}>
          <div className="relative h-56 overflow-hidden bg-slate-100">
            <img
              src={getFullImageUrl(provider.avatar_url || provider.image, name)}
              alt={name}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute inset-0" style={{ background: "rgba(30,58,138,0.18)" }} />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md
                border border-white/20 text-white flex items-center justify-center
                hover:bg-black/60 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
            {provider.is_verified !== false && (
              <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-homefix-primary/90
                backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                <BadgeCheck className="w-3.5 h-3.5" /> Verified Pro
              </div>
            )}
            <div className="absolute bottom-5 left-6 right-6 z-10">
              <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em] mb-1 flex items-center gap-1.5">
                <Briefcase className="w-3 h-3" /> {specialty}
              </p>
              <h2 className="text-white text-2xl font-black leading-tight">{name}</h2>
              <div className="flex items-center gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5 text-white/50" />
                <span className="text-white/60 text-xs font-semibold">{city}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100">
            {[
              { icon: Star, label: "Rating", value: rating.toFixed(1) + "★" },
              { icon: Clock, label: "Response", value: "< 2hr" },
              { icon: ThumbsUp, label: "Completed", value: "50+" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex flex-col items-center py-5 gap-1">
                <Icon className="w-4 h-4 text-homefix-primary mb-1" />
                <span className="text-lg font-black text-homefix-text">{value}</span>
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{label}</span>
              </div>
            ))}
          </div>

          <div className="px-6 py-6 space-y-7">
            <div>
              <h3 className="text-sm font-black text-homefix-text mb-3 flex items-center gap-2">
                <div className="w-1 h-4 rounded-full bg-homefix-primary" /> About
              </h3>
              <p className="text-sm text-slate-400 font-medium leading-relaxed">
                {provider.bio || `${name} is a certified ${specialty.toLowerCase()} professional with years of hands-on experience. Known for punctuality, quality materials, and outstanding customer service.`}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-black text-homefix-text mb-3 flex items-center gap-2">
                <div className="w-1 h-4 rounded-full bg-homefix-primary" /> Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {(provider.skills || [specialty, "On-time delivery", "Insured", "Background checked", "Free consultation"]).map((s, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 bg-homefix-primary/8 text-homefix-primary
                    text-xs font-bold px-3 py-1.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" /> {s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-black text-homefix-text mb-3 flex items-center gap-2">
                <div className="w-1 h-4 rounded-full bg-homefix-primary" /> Rating Breakdown
              </h3>
              <div className="flex items-center gap-5 bg-slate-50 rounded-2xl p-4">
                <div className="text-center">
                  <p className="text-4xl font-black text-homefix-text">{rating.toFixed(1)}</p>
                  <div className="flex gap-0.5 justify-center my-1.5">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`} />
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold">{reviews.length}+ reviews</p>
                </div>
                <div className="flex-1 space-y-1.5">
                  {[5, 4, 3, 2, 1].map(n => (
                    <div key={n} className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-slate-400 w-3">{n}</span>
                      <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                      <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full"
                          style={{ width: n === 5 ? "72%" : n === 4 ? "18%" : n === 3 ? "7%" : "3%" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-black text-homefix-text mb-3 flex items-center gap-2">
                <div className="w-1 h-4 rounded-full bg-homefix-primary" /> Reviews
              </h3>
              <div className="space-y-3">
                {reviews.map(r => (
                  <div key={r.id} className="bg-slate-50 rounded-2xl p-4">
                    <div className="flex gap-0.5 mb-2">
                      {[1, 2, 3, 4, 5].map(i => (
                        <Star key={i} className={`w-3 h-3 ${i <= r.stars ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`} />
                      ))}
                    </div>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed mb-2">&ldquo;{r.text}&rdquo;</p>
                    <p className="text-[10px] font-black text-homefix-primary">{r.author}</p>
                  </div>
                ))}
              </div>
            </div>


          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
function ProviderCard({ provider, index, onViewProfile }) {
  const rating = provider.rating || "4.9";
  const name = provider.name || provider.full_name;
  const specialty = provider.specialty || "Service Professional";
  const city = provider.city || "Cairo, Egypt";
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100
                shadow-sm hover:shadow-[0_20px_40px_rgba(30,58,138,0.08)] hover:-translate-y-1
                transition-all duration-500 flex flex-col font-['Poppins'] relative"
    >
      <div className="relative h-64 overflow-hidden bg-slate-50">
        <img
          src={getFullImageUrl(provider.avatar_url || provider.image, name)}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute top-5 left-5 z-10 flex flex-col gap-2">
          <div className="bg-white/95 backdrop-blur-xl px-3.5 py-2 rounded-2xl flex items-center gap-2 shadow-sm border border-white/50">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="text-xs font-black text-homefix-text tracking-tight">{rating}</span>
          </div>
        </div>
        {provider.is_verified !== false && (
          <div className="absolute top-5 right-5 z-10 shadow-sm">
            <div className="bg-homefix-primary/95 backdrop-blur-xl px-4 py-2 rounded-2xl flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              <span className="text-[10px] font-extrabold text-white uppercase tracking-[0.1em]">Verified Pro</span>
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
          <h3 className="text-2xl font-black text-homefix-text leading-tight group-hover:text-homefix-primary transition-colors duration-300">
            {name}
          </h3>
          <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
            <MapPin className="w-4 h-4 text-slate-300" />
            <span>{city}</span>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-black mb-1">Availability</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-black text-homefix-text">Available Now</span>
            </div>
          </div>

          <motion.button
            onClick={() => onViewProfile(provider)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="h-14 w-14 rounded-[1.25rem] bg-homefix-primary text-white flex items-center justify-center
              shadow-lg shadow-homefix-primary/25 hover:bg-homefix-accent transition-colors duration-300 group/btn"
          >
            <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </motion.button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-homefix-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
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
  return (
    <>
      <PageHero
        badge={{ icon: ShieldCheck, label: "Expert Network" }}
        title="Meet Our"
        titleAccent="Verified Experts."
        subtitle="Connect with top-rated professionals dedicated to excellence in every home maintenance and repair task."
        breadcrumb="Providers"
        imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1600&auto=format&fit=crop"
        imageAlt="Professional home service expert"
        stats={[
          { value: "200+", label: "Verified Pros" },
          { value: "98%", label: "Satisfaction" },
          { value: "4.9★", label: "Avg Rating" },
        ]}
      />
    </>
  );
}

export default function ProvidersPage() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [sortOpen, setSortOpen] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(null);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const data = await apiCall(API_ENDPOINTS.PROVIDERS);
        const providersList = Array.isArray(data) ? data : (data?.data ?? []);

        if (providersList.length === 0) {
          const mockProviders = [
            {
              id: 1,
              name: "Ahmed Hassan",
              specialty: "Full Renovations",
              rating: "5.0",
              city: "Maadi, Cairo",
              is_verified: true,
            },
            {
              id: 2,
              name: "Sara Mohamed",
              specialty: "Interior Design",
              rating: "4.8",
              city: "Heliopolis, Cairo",
              is_verified: true,
            },
            {
              id: 3,
              name: "Amr Khaled",
              specialty: "Plumbing Expert",
              rating: "4.9",
              city: "Sheikh Zayed, Giza",
              is_verified: false,
            },
            {
              id: 4,
              name: "Nour Ali",
              specialty: "Electrical Systems",
              rating: "4.7",
              city: "New Cairo",
              is_verified: true,
            },
            {
              id: 5,
              name: "Youssef Zaki",
              specialty: "Professional Cleaning",
              rating: "4.9",
              city: "Nasr City, Cairo",
              is_verified: true,
            },
            {
              id: 6,
              name: "Laila Fawzy",
              specialty: "Landscape Design",
              rating: "4.6",
              city: "Dokki, Giza",
              is_verified: false,
            },
          ];
          setProviders(mockProviders);
        } else {
          setProviders(providersList);
        }
      } catch (err) {
        console.error("Error fetching providers:", err);
        const mockProviders = [
          {
            id: 1,
            name: "Ahmed Hassan",
            specialty: "Full Renovations",
            rating: "5.0",
            city: "Maadi, Cairo",
            is_verified: true,
          },
          {
            id: 2,
            name: "Sara Mohamed",
            specialty: "Interior Design",
            rating: "4.8",
            city: "Heliopolis, Cairo",
            is_verified: true,
          },
          {
            id: 3,
            name: "Amr Khaled",
            specialty: "Plumbing Expert",
            rating: "4.9",
            city: "Sheikh Zayed, Giza",
            is_verified: false,
          },
          {
            id: 4,
            name: "Nour Ali",
            specialty: "Electrical Systems",
            rating: "4.7",
            city: "New Cairo",
            is_verified: true,
          },
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
      result = result.filter(
        (p) =>
          (p.name || "").toLowerCase().includes(q) ||
          (p.specialty || "").toLowerCase().includes(q) ||
          (p.city || "").toLowerCase().includes(q),
      );
    }

    if (sortBy === "rating_desc") {
      result.sort(
        (a, b) => parseFloat(b.rating || 0) - parseFloat(a.rating || 0),
      );
    }

    return result;
  }, [providers, search, sortBy]);

  const SelectedSortOption =
    SORT_OPTIONS.find((o) => o.value === sortBy) || SORT_OPTIONS[0];

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
              onChange={(e) => setSearch(e.target.value)}
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
                <span className="hidden sm:inline">
                  {SelectedSortOption.label}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-500 ${sortOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {sortOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setSortOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-64 bg-white border border-slate-100
                                                rounded-3xl shadow-2xl z-20 overflow-hidden p-2"
                    >
                      {SORT_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => {
                            setSortBy(opt.value);
                            setSortOpen(false);
                          }}
                          className={`w-full text-left px-5 py-4 rounded-2xl text-sm font-bold
                                                        transition-all flex items-center justify-between
                                                        ${sortBy === opt.value
                              ? "bg-homefix-primary/10 text-homefix-primary"
                              : "text-homefix-text hover:bg-slate-50"
                            }`}
                        >
                          {opt.label}
                          {sortBy === opt.value && (
                            <div className="w-2 h-2 rounded-full bg-homefix-primary" />
                          )}
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
            <h2 className="text-3xl font-black text-homefix-text mb-4">
              Something went wrong
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-md mx-auto">
              {error}
            </p>
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
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-40 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50">
            <div className="w-24 h-24 bg-homefix-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <Search className="w-10 h-10 text-homefix-primary" />
            </div>
            <h2 className="text-3xl font-black text-homefix-text mb-4">
              No experts found
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-md mx-auto">
              We couldn't find any professionals matching your search criteria.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSortBy("default");
              }}
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
                onViewProfile={setSelectedProvider}
              />
            ))}
          </div>
        )}
      </main>
      {!loading && (
        <div className="max-w-7xl mx-auto px-6 md:px-12 pb-20">
          <div className="relative bg-gradient-to-br from-homefix-primary via-[#1a3578] to-homefix-accent rounded-[2.5rem] p-12 md:p-16 text-center overflow-hidden shadow-2xl">
            <div className="absolute -top-10 -right-10 w-52 h-52 bg-white/5 rounded-full pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-white/5 rounded-full pointer-events-none" />
            <div className="relative z-10">
              <p className="text-white/60 text-xs font-black uppercase tracking-widest mb-4">
                Join Our Network
              </p>
              <h2 className="text-white text-3xl md:text-5xl font-black mb-5 tracking-tight leading-tight">
                Are you a service professional?
              </h2>
              <p className="text-white/80 text-base md:text-lg mb-10 max-w-2xl mx-auto font-light">
                Join our network of top-rated experts and grow your business
                with Homefix.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/provider-register"
                  className="inline-flex items-center gap-2 bg-white text-homefix-primary px-8 py-4 rounded-xl font-black
                                        text-sm tracking-widest shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
                >
                  Register as Provider
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  className="inline-flex items-center gap-2 bg-transparent border-2 border-white/40 text-white px-8 py-4 rounded-xl font-black
                                        text-sm tracking-widest hover:bg-white/10 hover:border-white transition-all duration-300 active:scale-95"
                >
                  Learn More
                </button>
              </div>
              <p className="text-white/40 text-xs font-medium mt-8">
                No fees to join &nbsp;·&nbsp; Get verified &nbsp;·&nbsp; Grow
                your client base
              </p>
            </div>
          </div>
        </div>
      )}
      {selectedProvider && (
        <ProviderDrawer
          provider={selectedProvider}
          onClose={() => setSelectedProvider(null)}
        />
      )}
    </div>
  );
}
