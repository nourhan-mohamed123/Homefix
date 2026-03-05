import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Star,
  Wrench,
  ChevronRight,
  ArrowRight,
  X,
  Search,
  SortAsc,
  TrendingUp,
  Award,
  Sparkles,
  Tag,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { apiCall, API_ENDPOINTS, API_BASE_URL } from "../config/api.js";
import PageHero from "../components/PageHero";
const SORT_OPTIONS = [
  { value: "default", label: "Default", icon: SortAsc },
  { value: "price_asc", label: "Price: Low to High", icon: TrendingUp },
  { value: "price_desc", label: "Price: High to Low", icon: TrendingUp },
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
  return (
    <motion.div
      className="flex-shrink-0 mx-4 cursor-pointer will-change-transform"
      whileHover={{
        scale: 1.02,
        boxShadow: "0 8px 30px rgba(59,130,246,0.18)",
      }}
      transition={svcSpring}
    >
      <div
        className="relative w-64 h-40 rounded-3xl overflow-hidden border border-white/5
                shadow-2xl shadow-black/40"
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
        <div className="absolute bottom-4 left-5 right-5">
          <p className="text-white text-sm font-bold tracking-wide flex items-center gap-2">
            <Tag className="w-3 h-3 text-homefix-accent" />
            {item.service_name || item.name}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function ServiceCard({ service }) {
  const rating = service.average_rating || service.rating || "4.9";
  const price =
    service.pricing?.[0]?.price ??
    service.price ??
    service.starting_price ??
    "---";
  const name = service.service_name || service.name;
  return (
    <motion.div
      variants={svcCardVariant}
      transition={svcSpring}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 8px 30px rgba(59,130,246,0.18)",
      }}
      className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100
                shadow-sm flex flex-col font-['Poppins'] cursor-pointer will-change-transform"
    >
      <div className="relative bg-slate-50 h-52 overflow-hidden flex items-center justify-center">
        <img
          src={getFullImageUrl(service.cover_image || service.image)}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = "https://placehold.co/800x600?text=Service";
          }}
        />
        {service.category_name && (
          <div className="absolute top-3 left-3 z-10">
            <span
              className="bg-homefix-primary text-white text-[10px] font-extrabold
                            uppercase tracking-[0.1em] px-3 py-1 rounded-full"
            >
              {service.category_name}
            </span>
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3
          className="text-base font-black text-homefix-text leading-snug mb-2
                    group-hover:text-homefix-primary transition-colors duration-200"
        >
          {name}
        </h3>

        <div className="flex items-center gap-1.5 mb-4">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span className="text-xs font-black text-homefix-text">{rating}</span>
          <span className="text-xs text-slate-400 font-medium">
            · 20+ Booked
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-xs font-bold text-slate-400">EGP</span>
            <span className="text-xl font-black text-homefix-text tabular-nums">
              {price}
            </span>
          </div>
          <button
            id={`book-service-${service.service_id || service.id}`}
            className="bg-homefix-primary text-white text-xs font-black uppercase tracking-wider
                            px-4 py-2.5 rounded-[1rem] hover:bg-homefix-accent transition-colors duration-200"
          >
            Book Now
          </button>
        </div>
      </div>
    </motion.div>
  );
}
function SkeletonCard() {
  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm animate-pulse">
      <div className="h-52 bg-gray-100" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-100 rounded-full w-3/4" />
        <div className="h-3 bg-gray-50 rounded-full w-1/2" />
        <div className="flex justify-between items-center pt-3">
          <div className="h-6 bg-gray-100 rounded-full w-20" />
          <div className="h-9 w-24 bg-gray-100 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
function ServicesBanner({ services = [] }) {
  return (
    <>
      <PageHero
        badge={{ icon: Wrench, label: "Home Services" }}
        title="Browse"
        titleAccent="Services"
        subtitle="Connect with top-rated professionals for maintenance, repairs, and improvements — all with transparent upfront pricing."
        breadcrumb="Services"
        imageUrl="https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1600&auto=format&fit=crop"
        imageAlt="Professional home repair and maintenance work"
        stats={[
          { value: "300+", label: "Services" },
          { value: "EGP 99+", label: "Starting at" },
          { value: "24hr", label: "Response" },
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
            <div
              className="flex gap-0 animate-[marquee_30s_linear_infinite] shrink-0"
              aria-hidden
            >
              {[...services, ...services].map((item, idx) => (
                <ServiceImageCard key={idx + "b"} item={item} />
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
  const initialCategory = searchParams.get("category") || "all";
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState("default");
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
    if (sortBy === "price_asc")
      r.sort(
        (a, b) =>
          (a.pricing?.[0]?.price ?? a.price ?? Infinity) -
          (b.pricing?.[0]?.price ?? b.price ?? Infinity),
      );
    if (sortBy === "price_desc")
      r.sort(
        (a, b) =>
          (b.pricing?.[0]?.price ?? b.price ?? 0) -
          (a.pricing?.[0]?.price ?? a.price ?? 0),
      );
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
  return (
    <div className="min-h-screen bg-homefix-bg font-['Poppins']">
      <ServicesBanner services={services.slice(0, 4)} />

      {/* ── Sticky search bar ── */}
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
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="flex gap-8 items-start">
          <aside className="w-64 flex-shrink-0 sticky top-[145px] self-start space-y-6">
            <div className="px-1">
              <h2 className="text-base font-black text-homefix-text">
                Filter By
              </h2>
            </div>
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 pt-5 pb-3 flex items-center justify-between">
                <p className="text-sm font-black text-homefix-text">Category</p>
              </div>
              <div className="px-3 pb-3 space-y-0.5">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2
                                        ${
                                          selectedCategory === "all"
                                            ? "text-homefix-primary"
                                            : "text-slate-500 hover:text-homefix-text"
                                        }`}
                >
                  <span
                    className={`w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 transition-colors
                                        ${selectedCategory === "all" ? "border-homefix-primary bg-homefix-primary" : "border-slate-300"}`}
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
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2
                                                ${isActive ? "text-homefix-primary" : "text-slate-500 hover:text-homefix-text"}`}
                    >
                      <span
                        className={`w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 transition-colors
                                                ${isActive ? "border-homefix-primary bg-homefix-primary" : "border-slate-300"}`}
                      />
                      {cat.category_name || cat.name}
                    </button>
                  );
                })}
              </div>
            </div>
            {activeFiltersCount > 0 && (
              <button
                onClick={resetAll}
                className="w-full flex items-center justify-center gap-2 text-xs font-black
                                    text-rose-500 hover:text-rose-700 transition-colors uppercase tracking-widest py-2"
              >
                <X className="w-3.5 h-3.5" />
                Reset All Filters
              </button>
            )}
          </aside>
          <main className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm font-bold text-slate-400">
                <span className="text-homefix-text font-black">
                  {filtered.length}
                </span>{" "}
                services found
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">
                  Sort By
                </span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-slate-200 rounded-[1rem]
                                            pl-4 pr-9 py-2.5 text-sm font-bold text-homefix-text
                                            hover:border-homefix-primary focus:outline-none focus:border-homefix-primary
                                            transition-colors cursor-pointer"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronRight
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5
                                        text-slate-400 rotate-90 pointer-events-none"
                  />
                </div>
              </div>
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
                    Transparent pricing. Verified experts. Satisfaction
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
