import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Star, Wrench, ChevronRight, ChevronDown, ArrowRight, X, Search, SortAsc, TrendingUp, Award, Sparkles, Tag, ShieldCheck, Trophy,
} from "lucide-react";
import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion";
import { apiCall, API_ENDPOINTS, API_BASE_URL } from "../config/api.js";
import PageHero from "../components/PageHero";
import Logo from "../components/Logo";
const SORT_OPTIONS = [
  { value: "default", label: "Default", icon: SortAsc },
  { value: "rating_desc", label: "Highest Rated", icon: Award },
];
const svcCardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
const svcStaggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};
const svcSpring = {
  type: "spring",
  stiffness: 100,
  damping: 15,
};
function getFullImageUrl(imagePath) {
  if (!imagePath || typeof imagePath !== "string") {
    return "https://images.unsplash.com/photo-1581092921461-eab62e92c859?q=80&w=800&h=600&auto=format&fit=crop";
  }
  if (imagePath.startsWith("http")) return imagePath;
  return `${API_BASE_URL}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
}
function ServiceImageCard({ item }) {
  const serviceId = item.service_id || item.id;
  const rating = parseFloat(item.average_rating || item.rating || 0);
  return (
    <Link
      to={`/services/${serviceId}`}
      className="flex-shrink-0 mx-4 block"
      style={{ textDecoration: "none" }}
    >
      <motion.div
        className="cursor-pointer will-change-transform"
        whileHover={{
          scale: 1.04,
          boxShadow: "0 12px 40px rgba(59,130,246,0.25)",
        }}
        transition={svcSpring}
      >
        <div
          className="relative w-64 h-40 rounded-[2.5rem] overflow-hidden border border-white/10
                  shadow-premium"
        >
          <img
            src={getFullImageUrl(item.image || item.cover_image)}
            alt={item.name || item.service_name}
            className="w-full h-full object-cover opacity-60 hover:opacity-100
                          transition-opacity duration-700"
            onError={(e) => {
              e.target.src = "https://placehold.co/600x400?text=Service";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute top-3 right-3 z-10">
            <div
              className="flex items-center gap-1 bg-white/90 backdrop-blur-md
                            px-2 py-1 rounded-lg shadow-sm"
            >
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              <span className="text-[11px] font-black text-homefix-text tabular-nums">
                {rating.toFixed(1)}
              </span>
            </div>
          </div>
          <div className="absolute bottom-4 left-5 right-5">
            <p className="text-white text-sm font-bold tracking-wide flex items-center gap-2">
              <Tag className="w-3 h-3 text-[#3B82F6]" />
              {item.service_name || item.name}
            </p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
function ServiceCard({ service }) {
  const rating = service.average_rating || service.rating || "4.9";
  const name = service.service_name || service.name;
  const serviceId = service.service_id || service.id;

  return (
    <Link to={`/services/${serviceId}`} className="block h-full" style={{ textDecoration: "none" }}>
      <motion.div
        variants={svcCardVariant}
        transition={svcSpring}
        whileHover={{
          y: -6,
          boxShadow: "0 24px 48px rgba(30,58,138,0.14)",
        }}
        className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100
                  shadow-premium flex flex-col font-['Poppins'] cursor-pointer will-change-transform
                  relative h-full"
      >
        <div className="relative bg-slate-50 h-52 overflow-hidden flex items-center justify-center">
          <img
            src={getFullImageUrl(service.cover_image || service.image)}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              e.target.src = "https://placehold.co/800x600?text=Service";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-homefix-primary/30 via-transparent to-transparent
            opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {service.category_name && (
            <div className="absolute top-3 left-3 z-10">
              <span className="bg-homefix-primary text-white text-[10px] font-extrabold
                uppercase tracking-[0.1em] px-3 py-1 rounded-full">
                {service.category_name}
              </span>
            </div>
          )}

          <div className="absolute top-3 right-3 z-10">
            <div className="flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-xl shadow-sm">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="text-[11px] font-black text-homefix-text">{rating}</span>
            </div>
          </div>
          <div className="absolute bottom-3 left-3 z-10 translate-y-2 opacity-0
            group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <span className="inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-sm
              text-white text-[10px] font-bold px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              20+ Booked
            </span>
          </div>
        </div>
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-base font-black text-homefix-text leading-snug mb-1.5
            group-hover:text-homefix-primary transition-colors duration-300 line-clamp-1">
            {name}
          </h3>

          <p className="text-xs text-slate-400 font-medium leading-relaxed mb-3 line-clamp-2">
            {service.description || "Professional service by certified experts."}
          </p>

          <div className="flex items-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map(i => (
              <Star key={i} className={`w-3 h-3 ${i <= Math.round(parseFloat(rating)) ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"}`} />
            ))}
            <span className="text-[11px] font-black text-slate-400 ml-1">({rating})</span>
          </div>

          <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-end">
            <div className="flex items-center gap-1.5 bg-homefix-primary text-white text-xs font-black
              uppercase tracking-wider px-4 py-2.5 rounded-[1rem]
              group-hover:bg-homefix-accent transition-all duration-300">
              View Details
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[2px]
          bg-gradient-to-r from-homefix-primary to-homefix-accent
          scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </motion.div>
    </Link>
  );
}
function SkeletonCard() {
  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm animate-pulse">
      <div className="h-52 bg-gray-100" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-100 rounded-full w-3/4" />
        <div className="h-3 bg-gray-50 rounded-full w-1/2" />
        <div className="flex justify-end items-center pt-3">
          <div className="h-9 w-24 bg-gray-100 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
function InfiniteSlider({ items }) {
  const CARD_WIDTH = 288;
  const totalWidth = items.length * CARD_WIDTH;
  const x = useMotionValue(0);
  useEffect(() => {
    if (items.length === 0) return;
    const controls = animate(x, -totalWidth, {
      ease: "linear",
      duration: items.length * 4,
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0,
    });
    return controls.stop;
  }, [items, totalWidth, x]);
  const displayItems = [...items, ...items];
  return (
    <div className="relative overflow-hidden">
      <motion.div className="flex" style={{ x }}>
        {displayItems.map((item, idx) => (
          <ServiceImageCard key={`${item.service_id || item.id}-${idx}`} item={item} />
        ))}
      </motion.div>
      <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-[#0f172a] to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-[#0f172a] to-transparent pointer-events-none z-10" />
    </div>
  );
}
function ServicesBanner({ services = [] }) {
  const topRated = useMemo(
    () =>
      services.filter((s) => {
        const r = parseFloat(s.average_rating || s.rating || 0);
        return r >= 4.5;
      }),
    [services],
  );
  const sliderItems = topRated.length > 0 ? topRated : services;
  return (
    <>
      <PageHero
        badge={{ icon: Wrench, label: "Home Services" }}
        title="Browse"
        titleAccent="Services"
        subtitle="Connect with top-rated professionals for maintenance, repairs, and improvements — all with quality guaranteed."
        breadcrumb="Services"
        imageUrl="https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1600&auto=format&fit=crop"
        imageAlt="Professional home repair and maintenance work"
        stats={[
          { value: "300+", label: "Services" },
          { value: "4.8/5", label: "Avg Rating" },
          { value: "24hr", label: "Response" },
        ]}
      />
      {sliderItems.length > 0 && (
        <div className="relative bg-gradient-to-b from-[#0f172a] to-homefix-primary py-8 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#3B82F6]" />
              <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-bold">
                Featured services
              </p>
              <Sparkles className="w-3.5 h-3.5 text-[#3B82F6]" />
            </div>
            <InfiniteSlider items={sliderItems} />
          </div>
        </div>
      )}
    </>
  );
}
export default function ServicesPage() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState("default");
  const [sortOpen, setSortOpen] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const [svcData, catData] = await Promise.all([
          apiCall(API_ENDPOINTS.SERVICES),
          apiCall(API_ENDPOINTS.CATEGORIES),
        ]);
        const serviceList = Array.isArray(svcData)
          ? svcData
          : svcData?.services || svcData?.data || [];
        const categoryList = Array.isArray(catData)
          ? catData
          : catData?.categories || catData?.data || [];

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
    const cat = searchParams.get("category") || "all";
    setSelectedCategory(cat);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let r = [...services];
    if (selectedCategory && selectedCategory !== "all") {
      r = r.filter(
        (s) =>
          String(s.category_id) === String(selectedCategory) ||
          String(s.category?.id) === String(selectedCategory),
      );
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      r = r.filter(
        (s) =>
          (s.service_name || s.name || "").toLowerCase().includes(q) ||
          (s.description || "").toLowerCase().includes(q) ||
          (s.category_name || "").toLowerCase().includes(q),
      );
    }
    if (sortBy === "rating_desc")
      r.sort(
        (a, b) =>
          parseFloat(b.average_rating || b.rating || 0) -
          parseFloat(a.average_rating || a.rating || 0),
      );
    return r;
  }, [services, selectedCategory, search, sortBy]);

  const activeFiltersCount =
    (selectedCategory !== "all" ? 1 : 0) + (sortBy !== "default" ? 1 : 0);
  const resetAll = () => {
    setSearch("");
    setSelectedCategory("all");
    setSortBy("default");
  };
  const SelectedSortOption =
    SORT_OPTIONS.find((o) => o.value === sortBy) || SORT_OPTIONS[0];
  return (
    <div className="min-h-screen bg-homefix-bg font-['Poppins']">
      <ServicesBanner services={services} />
      <div className="sticky top-[73px] z-50 bg-white/90 backdrop-blur-3xl border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center gap-4">
          <div className="relative group flex-1">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-slate-400 group-focus-within:text-homefix-primary transition-colors" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="What do you need help with?"
              className="w-full bg-slate-50 border border-slate-100 rounded-[1.25rem] pl-14 pr-24 py-4 text-sm
                                font-bold text-homefix-text placeholder:text-slate-400
                                focus:ring-2 focus:ring-homefix-primary/20 focus:border-homefix-primary/20
                                focus:bg-white transition-all"
            />
            {!loading && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="text-slate-300 hover:text-slate-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <span className="text-[11px] font-black text-slate-300 tabular-nums">
                  {filtered.length}
                </span>
              </div>
            )}
          </div>
          {activeFiltersCount > 0 && (
            <button
              onClick={resetAll}
              className="flex items-center gap-2 text-xs font-black text-rose-500 hover:text-rose-700 transition-colors uppercase tracking-widest whitespace-nowrap"
            >
              <X className="w-4 h-4" />
              Reset
            </button>
          )}
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
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="flex gap-8 items-start">
          <aside className="w-64 flex-shrink-0 sticky top-[145px] self-start space-y-5">
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-premium overflow-hidden">
              <div className="px-6 pt-6 pb-3 flex items-center justify-between">
                <p className="text-sm font-black text-homefix-text">Category</p>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={resetAll}
                    className="text-[10px] font-black text-rose-500 hover:text-rose-700
                               transition-colors uppercase tracking-widest"
                  >
                    Reset
                  </button>
                )}
              </div>
              <div className="px-3 pb-4 space-y-0.5">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all
                              flex items-center gap-3
                              ${selectedCategory === "all"
                      ? "bg-homefix-primary/5 text-homefix-primary"
                      : "text-slate-500 hover:bg-homefix-primary/5 hover:text-homefix-primary"
                    }`}
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full flex-shrink-0 transition-all duration-300
                              ${selectedCategory === "all" ? "bg-homefix-primary scale-110" : "bg-slate-300"}`}
                  />
                  All Services
                </button>
                {categories.map((cat) => {
                  const catId = String(cat.category_id || cat.id);
                  const isActive = selectedCategory === catId;
                  return (
                    <button
                      key={catId}
                      onClick={() =>
                        setSelectedCategory(isActive ? "all" : catId)
                      }
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all
                                  flex items-center gap-3
                                  ${isActive
                          ? "bg-homefix-primary/5 text-homefix-primary"
                          : "text-slate-500 hover:bg-homefix-primary/5 hover:text-homefix-primary"
                        }`}
                    >
                      <span
                        className={`w-2.5 h-2.5 rounded-full flex-shrink-0 transition-all duration-300
                                  ${isActive ? "bg-homefix-primary scale-110" : "bg-slate-300"}`}
                      />
                      {cat.category_name || cat.name}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-premium overflow-hidden">
              <div className="p-6 flex flex-col items-center text-center">
                <Logo className="h-10 w-auto mb-4" textClassName="text-xl" />
                <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full mb-4">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="text-[11px] font-black text-emerald-700 uppercase tracking-wider">
                    Expert Verified
                  </span>
                </div>
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#3B82F6]/30 to-transparent mb-4" />
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-black text-[#1E3A8A] uppercase tracking-wide">
                    Top Rated This Month
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                  All featured providers are vetted and maintain a
                  <span className="text-[#1E3A8A] font-bold"> 4.5+ </span>
                  star rating.
                </p>
                <div className="flex items-center gap-0.5 mt-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="w-3.5 h-3.5 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
              </div>
            </div>
          </aside>
          <main className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm font-bold text-slate-400">
                <span className="text-homefix-text font-black">
                  {filtered.length}
                </span>{" "}
                services found
              </p>
            </div>
            {error ? (
              <div className="text-center py-40 bg-white rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/50">
                <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Wrench className="w-10 h-10 text-rose-400" />
                </div>
                <h2 className="text-3xl font-black text-homefix-text mb-3">
                  Something went wrong
                </h2>
                <p className="text-slate-400 text-base mb-10 max-w-md mx-auto">
                  Failed to load services. Please try again.
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
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-40 bg-white rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/50">
                <div className="w-24 h-24 bg-homefix-primary/8 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Search className="w-10 h-10 text-homefix-primary/40" />
                </div>
                <h2 className="text-3xl font-black text-homefix-text mb-3">
                  No results found
                </h2>
                <p className="text-slate-400 text-base mb-10 max-w-md mx-auto">
                  No services match your current filters or search query.
                </p>
                <button
                  onClick={resetAll}
                  className="px-10 py-5 bg-homefix-primary text-white rounded-homepro font-black
                                        text-sm hover:bg-homefix-accent shadow-premium transition-all"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                variants={svcStaggerContainer}
                initial="hidden"
                animate="visible"
                key={selectedCategory + sortBy}
              >
                {filtered.map((service) => (
                  <ServiceCard
                    key={service.id || service.service_id}
                    service={service}
                  />
                ))}
              </motion.div>
            )}
            {!loading && !error && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative bg-gradient-to-br from-homefix-primary via-[#1a3578] to-homefix-accent
                                    rounded-[2.5rem] p-12 md:p-16 overflow-hidden shadow-2xl text-center mt-12"
              >
                <div className="absolute -top-10 -right-10 w-52 h-52 bg-white/5 rounded-full pointer-events-none" />
                <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-white/5 rounded-full pointer-events-none" />
                <div className="relative z-10">
                  <p className="text-white/60 text-xs font-black uppercase tracking-widest mb-4">
                    Get Started Today
                  </p>
                  <h2 className="text-white text-3xl md:text-4xl font-black mb-4 leading-tight">
                    Book a professional <br className="hidden md:block" />
                    in minutes
                  </h2>
                  <p className="text-white/80 text-base mb-10 max-w-xl mx-auto font-light">
                    Verified experts. Satisfaction
                    guaranteed — or we'll make it right.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Link
                      to="/providers"
                      className="inline-flex items-center gap-2 bg-white text-homefix-primary px-8 py-4 rounded-xl font-black
                                                text-sm tracking-widest shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
                    >
                      Meet Our Experts
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      to="/categories"
                      className="inline-flex items-center gap-2 bg-transparent border-2 border-white/40 text-white px-8 py-4 rounded-xl font-black
                                                text-sm tracking-widest hover:bg-white/10 hover:border-white transition-all duration-300"
                    >
                      Browse Categories
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
