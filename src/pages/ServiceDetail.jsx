import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Star, ArrowLeft, Clock, MapPin, ShieldCheck, ChevronRight,
  Wrench, CheckCircle2, Calendar, Phone, User, Loader2,
  Tag, Award, ThumbsUp, Share2, Heart,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { apiCall, API_ENDPOINTS, API_BASE_URL } from "../config/api.js";

function getFullImageUrl(imagePath) {
  if (!imagePath || typeof imagePath !== "string")
    return "https://images.unsplash.com/photo-1581092921461-eab62e92c859?q=80&w=1200&auto=format&fit=crop";
  if (imagePath.startsWith("http")) return imagePath;
  return `${API_BASE_URL}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
}
function DetailSkeleton() {
  return (
    <div className="min-h-screen bg-homefix-bg font-['Poppins'] animate-pulse">
      <div className="h-[55vh] bg-gray-200" />
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-10 space-y-6">
        <div className="h-8 bg-gray-200 rounded-full w-2/3" />
        <div className="h-4 bg-gray-100 rounded-full w-1/3" />
        <div className="h-24 bg-gray-100 rounded-3xl" />
      </div>
    </div>
  );
}

function ReviewCard({ review }) {
  const rating = Number(review.rating) || 5;
  return (
    <div className="bg-white rounded-[1.75rem] p-6 border border-gray-100"
      style={{ boxShadow: "0 2px 16px rgba(30,58,138,0.05)" }}>
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-3.5 h-3.5 ${i < rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`} />
        ))}
      </div>
      <p className="text-sm text-homefix-text/70 leading-relaxed mb-4 font-medium">
        &ldquo;{review.comment || "Great service, highly recommend!"}&rdquo;
      </p>
      <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
        <img
          src={review.avatar_url || `https://i.pravatar.cc/80?u=${review.id}`}
          alt={review.customer_name}
          className="w-10 h-10 rounded-2xl object-cover ring-2 ring-homefix-primary/10"
          onError={(e) => { e.target.src = `https://i.pravatar.cc/80?u=${review.id}`; }}
        />
        <div>
          <p className="text-sm font-black text-homefix-text">{review.customer_name || "Customer"}</p>
          <p className="text-[11px] text-homefix-accent font-bold">{review.service_name || "Verified Customer"}</p>
        </div>
      </div>
    </div>
  );
}


export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
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

  const handleBook = (plan = null) => {
    if (!isLoggedIn()) {
      sessionStorage.setItem("redirectAfterLogin", window.location.pathname);
      navigate("/login");
      return;
    }
    navigate(`/book/${id}`, { state: { service, plan } });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchService = async () => {
      try {
        let data;
        try {
          data = await apiCall(`${API_ENDPOINTS.SERVICES}/${id}`);
        } catch {
          const all = await apiCall(API_ENDPOINTS.SERVICES);
          const list = Array.isArray(all) ? all : all?.services || all?.data || [];
          data = list.find(s => String(s.service_id || s.id) === String(id));
          if (!data) throw new Error("Service not found");
        }
        setService(data);
        try {
          if (API_ENDPOINTS.REVIEWS) {
            const rev = await apiCall(API_ENDPOINTS.REVIEWS);
            const list = Array.isArray(rev) ? rev : rev?.data || [];
            setReviews(list.slice(0, 6));
          }
        } catch { }

      } catch (err) {
        setError(err.message || "Failed to load service.");
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  if (loading) return <DetailSkeleton />;

  if (error || !service) {
    return (
      <div className="min-h-screen bg-homefix-bg flex items-center justify-center font-['Poppins']">
        <div className="text-center bg-white rounded-[2.5rem] p-16 max-w-md mx-6 border border-gray-100"
          style={{ boxShadow: "0 8px 40px rgba(30,58,138,0.08)" }}>
          <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Wrench className="w-9 h-9 text-rose-400" />
          </div>
          <h2 className="text-2xl font-black text-homefix-text mb-3">Service not found</h2>
          <p className="text-slate-400 text-sm mb-8">{error || "This service doesn't exist or was removed."}</p>
          <Link to="/services"
            className="inline-flex items-center gap-2 bg-homefix-primary text-white px-8 py-4 rounded-xl font-black text-sm hover:bg-homefix-accent transition-all duration-300">
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const name = service.service_name || service.name || "Service";
  const rating = parseFloat(service.average_rating || service.rating || 4.9);
  const image = service.cover_image || service.image;

  const TABS = ["overview", "reviews"];

  return (
    <div className="min-h-screen bg-homefix-bg font-['Poppins']">
      <div className="relative h-[55vh] md:h-[62vh] overflow-hidden bg-slate-900">
        <motion.img
          src={getFullImageUrl(image)}
          alt={name}
          className="w-full h-full object-cover"
          initial={{ scale: 1.06 }} animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          onError={(e) => { e.target.src = "https://placehold.co/1200x800?text=Service"; }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(11,20,38,0.92) 0%, rgba(11,20,38,0.4) 50%, rgba(11,20,38,0.15) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "rgba(30,58,138,0.18)" }} />

        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 md:left-10 z-20 flex items-center gap-2
            bg-black/30 backdrop-blur-md border border-white/20 text-white
            px-4 py-2.5 rounded-2xl text-xs font-bold hover:bg-black/50 transition-all duration-200"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </button>

        <div className="absolute top-6 right-6 md:right-10 z-20 flex gap-2">
          <button
            onClick={() => setSaved(s => !s)}
            className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300
              ${saved ? "bg-rose-500 border-rose-500 text-white" : "bg-black/30 border-white/20 text-white hover:bg-black/50"}`}
          >
            <Heart className={`w-4 h-4 ${saved ? "fill-white" : ""}`} />
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center bg-black/30 backdrop-blur-md border border-white/20 text-white hover:bg-black/50 transition-all">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-10">
          <div className="max-w-5xl mx-auto">
            {service.category_name && (
              <motion.span
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-1.5 bg-homefix-primary/80 backdrop-blur-sm
                  text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                <Tag className="w-3 h-3" /> {service.category_name}
              </motion.span>
            )}
            <motion.h1
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-black text-white mb-3 leading-tight"
              style={{ textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
            >
              {name}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-4"
            >
              <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-3 py-2 rounded-xl">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} className={`w-3.5 h-3.5 ${i <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-white/30 text-white/30"}`} />
                ))}
                <span className="text-white font-black text-sm ml-1">{rating.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/70 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-homefix-accent" /> Verified Service
              </div>
              <div className="flex items-center gap-1.5 text-white/70 text-xs font-semibold">
                <Clock className="w-4 h-4 text-homefix-accent" /> 24hr Response
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-10">
        <div className="flex gap-1 bg-white rounded-2xl p-1.5 mb-8 border border-gray-100 w-fit"
          style={{ boxShadow: "0 2px 16px rgba(30,58,138,0.05)" }}>
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300
                ${activeTab === tab
                  ? "bg-homefix-primary text-white shadow-sm"
                  : "text-slate-400 hover:text-homefix-text"}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div key="overview"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-[1.75rem] p-7 border border-gray-100"
                  style={{ boxShadow: "0 2px 16px rgba(30,58,138,0.05)" }}>
                  <h2 className="text-lg font-black text-homefix-text mb-4 flex items-center gap-2">
                    <div className="w-1 h-5 rounded-full bg-homefix-primary" />
                    About this service
                  </h2>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">
                    {service.description || "Our professional team provides top-quality service with years of experience. We use premium materials and proven techniques to deliver lasting results. All our providers are background-checked, insured, and trained to the highest standards."}
                  </p>
                </div>
                <div className="bg-white rounded-[1.75rem] p-7 border border-gray-100"
                  style={{ boxShadow: "0 2px 16px rgba(30,58,138,0.05)" }}>
                  <h2 className="text-lg font-black text-homefix-text mb-5 flex items-center gap-2">
                    <div className="w-1 h-5 rounded-full bg-homefix-primary" />
                    What&apos;s included
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(service.inclusions || [
                      "Professional assessment",
                      "High-quality materials",
                      "Experienced technicians",
                      "Work guarantee",
                      "Clean-up after job",
                      "Follow-up check",
                    ]).map((item, i) => (
                      <div key={i} className="flex items-center gap-3 bg-homefix-primary/4 rounded-2xl px-4 py-3">
                        <CheckCircle2 className="w-4 h-4 text-homefix-accent flex-shrink-0" />
                        <span className="text-sm font-semibold text-homefix-text">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { icon: Award, label: "Rating", value: `${rating.toFixed(1)}★` },
                    { icon: User, label: "Booked", value: "20+" },
                    { icon: Clock, label: "Response", value: "< 2hr" },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="bg-white rounded-[1.5rem] p-5 text-center border border-gray-100"
                      style={{ boxShadow: "0 2px 16px rgba(30,58,138,0.05)" }}>
                      <div className="w-10 h-10 rounded-2xl bg-homefix-primary/8 flex items-center justify-center mx-auto mb-3">
                        <Icon className="w-5 h-5 text-homefix-primary" />
                      </div>
                      <p className="text-xl font-black text-homefix-text">{value}</p>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-5">
                <div className="bg-white rounded-[1.75rem] p-6 border border-gray-100 sticky top-[90px]"
                  style={{ boxShadow: "0 8px 32px rgba(30,58,138,0.08)" }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Availability</span>
                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-black px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Available
                    </span>
                  </div>
                  <div className="mb-5">
                    <p className="text-sm font-semibold text-slate-500">Book your appointment now to secure your slot with our experts.</p>
                  </div>

                  <button
                    onClick={() => handleBook()}
                    className="w-full bg-homefix-primary text-white py-4 rounded-[1rem] font-black text-sm
                      uppercase tracking-wider hover:bg-homefix-accent transition-all duration-300
                      flex items-center justify-center gap-2 shadow-lg shadow-homefix-primary/20 mb-3"
                  >
                    <Calendar className="w-4 h-4" /> Book Now
                  </button>
                  <button className="w-full border-2 border-homefix-primary/20 text-homefix-primary py-3.5 rounded-[1rem] font-black text-sm
                    uppercase tracking-wider hover:border-homefix-primary hover:bg-homefix-primary/5 transition-all duration-300
                    flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" /> Contact Us
                  </button>

                  <div className="mt-5 pt-5 border-t border-gray-50 space-y-2.5">
                    {[
                      { icon: ShieldCheck, text: "100% satisfaction guarantee" },
                      { icon: Award, text: "Verified & insured experts" },
                      { icon: Clock, text: "Flexible scheduling" },
                    ].map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-center gap-2.5 text-xs text-slate-500 font-semibold">
                        <Icon className="w-3.5 h-3.5 text-homefix-accent flex-shrink-0" />
                        {text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "reviews" && (
            <motion.div key="reviews"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <div className="bg-white rounded-[1.75rem] p-8 border border-gray-100 mb-8 flex flex-col md:flex-row items-center gap-8"
                style={{ boxShadow: "0 2px 16px rgba(30,58,138,0.05)" }}>
                <div className="text-center">
                  <p className="text-6xl font-black text-homefix-text">{rating.toFixed(1)}</p>
                  <div className="flex gap-1 justify-center my-2">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} className={`w-5 h-5 ${i <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`} />
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 font-semibold">{reviews.length || "20"}+ reviews</p>
                </div>
                <div className="flex-1 space-y-2 w-full">
                  {[5, 4, 3, 2, 1].map(n => (
                    <div key={n} className="flex items-center gap-3">
                      <span className="text-xs font-black text-slate-400 w-4">{n}</span>
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full"
                          style={{ width: n === 5 ? "70%" : n === 4 ? "20%" : n === 3 ? "7%" : "3%" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {reviews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {reviews.map((r, i) => <ReviewCard key={r.id || i} review={r} />)}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-[2rem] border border-gray-100">
                  <ThumbsUp className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                  <p className="text-homefix-text font-black text-lg mb-2">No reviews yet</p>
                  <p className="text-slate-400 text-sm">Be the first to book and leave a review!</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-homefix-primary via-[#1a3578] to-homefix-accent
            rounded-[2.5rem] p-10 md:p-14 overflow-hidden shadow-2xl text-center mt-14"
        >
          <div className="absolute -top-10 -right-10 w-52 h-52 bg-white/5 rounded-full pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-white/5 rounded-full pointer-events-none" />
          <div className="relative z-10">
            <p className="text-white/50 text-xs font-black uppercase tracking-widest mb-3">Ready to book?</p>
            <h2 className="text-white text-2xl md:text-3xl font-black mb-3 leading-tight">
              Get this service today
            </h2>
            <p className="text-white/70 text-sm mb-8 max-w-md mx-auto font-light">
              Join thousands of happy homeowners. Book in minutes with our verified professionals.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => handleBook()}
                className="inline-flex items-center gap-2 bg-white text-homefix-primary px-8 py-4 rounded-xl font-black
                  text-sm tracking-widest shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300">
                Book Now <ChevronRight className="w-4 h-4" />
              </button>
              <Link to="/services"
                className="inline-flex items-center gap-2 bg-transparent border-2 border-white/40 text-white px-8 py-4 rounded-xl font-black
                  text-sm tracking-widest hover:bg-white/10 hover:border-white transition-all duration-300">
                Browse More
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
