import React, { useState, useEffect } from 'react';
import { Star, Loader2, ShieldCheck } from 'lucide-react';
import { apiCall, API_ENDPOINTS } from '../config/api.js';

// ─── Fallback data (shown until Reviews API is ready) ─────────────────────────
const FALLBACK_REVIEWS = [
    {
        id: 1,
        customer_name: 'Sarah Johnson',
        service_name: 'House Cleaning',
        rating: 5,
        comment: 'Amazing service! The team was professional and thorough. My house has never looked better.',
        avatar_url: 'https://i.pravatar.cc/150?img=1',
    },
    {
        id: 2,
        customer_name: 'Michael Chen',
        service_name: 'Plumbing',
        rating: 5,
        comment: 'Quick response and excellent work. Fixed my leaking pipe in no time. Highly recommend!',
        avatar_url: 'https://i.pravatar.cc/150?img=2',
    },
    {
        id: 3,
        customer_name: 'Emma Williams',
        service_name: 'Electrical',
        rating: 5,
        comment: 'Very knowledgeable electrician. Solved my wiring issues efficiently and explained everything clearly.',
        avatar_url: 'https://i.pravatar.cc/150?img=3',
    },
];

// ─── Single Review Card ────────────────────────────────────────────────────────
function ReviewCard({ review }) {
    const rating = Number(review.rating) || 5;
    return (
        <div className="group bg-white rounded-[2rem] p-8 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(30,58,138,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col">
            {/* Stars */}
            <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 fill-gray-200'}`}
                    />
                ))}
            </div>

            {/* Comment */}
            <p className="text-homefix-text/70 text-sm leading-relaxed flex-1 mb-8 font-medium">
                &ldquo;{review.comment}&rdquo;
            </p>

            {/* Avatar + Name */}
            <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                <img
                    src={review.avatar_url || `https://i.pravatar.cc/150?u=${review.id}`}
                    alt={review.customer_name}
                    className="w-12 h-12 rounded-2xl object-cover ring-2 ring-homefix-primary/10"
                    onError={(e) => { e.target.src = `https://i.pravatar.cc/150?u=${review.id}`; }}
                />
                <div>
                    <h4 className="font-black text-homefix-text text-sm">{review.customer_name}</h4>
                    <p className="text-xs font-bold text-homefix-accent mt-0.5">{review.service_name}</p>
                </div>
            </div>
        </div>
    );
}

// ─── Main Section ──────────────────────────────────────────────────────────────
export default function CustomerReviews() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [usingFallback, setUsingFallback] = useState(false);

    useEffect(() => {
        // ⏳ Will fetch live once API_ENDPOINTS.REVIEWS is available on the backend
        if (!API_ENDPOINTS.REVIEWS) {
            setReviews(FALLBACK_REVIEWS);
            setUsingFallback(true);
            setLoading(false);
            return;
        }

        const controller = new AbortController();
        const fetchReviews = async () => {
            try {
                const data = await apiCall(API_ENDPOINTS.REVIEWS, { signal: controller.signal });
                const list = Array.isArray(data) ? data : (data?.data ?? []);
                if (list.length > 0) {
                    setReviews(list);
                    setUsingFallback(false);
                } else {
                    setReviews(FALLBACK_REVIEWS);
                    setUsingFallback(true);
                }
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setReviews(FALLBACK_REVIEWS);
                    setUsingFallback(true);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
        return () => controller.abort();
    }, []);

    // Average rating from current data
    const avgRating = reviews.length
        ? (reviews.reduce((sum, r) => sum + Number(r.rating || 5), 0) / reviews.length).toFixed(1)
        : '4.9';

    return (
        <section id="reviews" className="px-6 py-24 md:px-20 lg:px-40 bg-homefix-bg font-['Poppins']">
            <div className="text-center mb-16">
                <p className="text-homefix-accent text-xs font-black uppercase tracking-widest mb-3">Customer Voices</p>
                <h2 className="text-3xl md:text-5xl font-black text-homefix-text mb-4 tracking-tight">
                    What our <span className="text-homefix-primary">customers</span> say
                </h2>
                <div className="flex items-center justify-center gap-1.5 text-yellow-500 mb-4">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                    <span className="ml-2 text-homefix-text font-black text-base">{avgRating}/5</span>
                </div>
                <p className="text-gray-400 max-w-2xl mx-auto text-base font-light">
                    Join thousands of satisfied homeowners who trust HomeFix for their daily needs.
                </p>
            </div>

            {/* Loading */}
            {loading && (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="w-10 h-10 text-homefix-accent animate-spin" />
                    <p className="text-gray-400 text-sm font-medium">Loading reviews...</p>
                </div>
            )}

            {/* Cards grid */}
            {!loading && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {reviews.map((review) => (
                        <ReviewCard key={review.id || review.customer_name} review={review} />
                    ))}
                </div>
            )}

            {/* Verified badge */}
            <div className="mt-14 flex justify-center">
                <div className="inline-flex items-center gap-2.5 bg-white border border-gray-100 px-6 py-3 rounded-2xl shadow-sm">
                    <ShieldCheck className="w-5 h-5 text-homefix-primary" />
                    <span className="text-homefix-text text-sm font-bold">100% Verified Customer Feedback</span>
                </div>
            </div>
        </section>
    );
}