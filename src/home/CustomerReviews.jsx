import React from 'react';
import { Star } from 'lucide-react';

export default function CustomerReviews() {
    const reviews = [
        {
            name: 'Sarah Johnson',
            service: 'House Cleaning',
            rating: 5,
            comment: 'Amazing service! The team was professional and thorough. My house has never looked better.',
            avatar: 'https://i.pravatar.cc/150?img=1'
        },
        {
            name: 'Michael Chen',
            service: 'Plumbing',
            rating: 5,
            comment: 'Quick response and excellent work. Fixed my leaking pipe in no time. Highly recommend!',
            avatar: 'https://i.pravatar.cc/150?img=2'
        },
        {
            name: 'Emma Williams',
            service: 'Electrical',
            rating: 5,
            comment: 'Very knowledgeable electrician. Solved my wiring issues efficiently and explained everything clearly.',
            avatar: 'https://i.pravatar.cc/150?img=3'
        }
    ];

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
                    <span className="ml-2 text-homefix-text font-black text-base">4.9/5</span>
                </div>
                <p className="text-gray-400 max-w-2xl mx-auto text-base font-light">
                    Join thousands of satisfied homeowners who trust HomeFix for their daily needs.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {reviews.map((review, index) => (
                    <div
                        key={index}
                        className="group bg-white rounded-[2rem] p-8 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(30,58,138,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col"
                    >
                        <div className="flex gap-1 mb-5">
                            {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                            ))}
                        </div>
                        <p className="text-homefix-text/70 text-sm leading-relaxed flex-1 mb-8 font-medium">
                            &ldquo;{review.comment}&rdquo;
                        </p>
                        <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                            <img
                                src={review.avatar}
                                alt={review.name}
                                className="w-12 h-12 rounded-2xl object-cover ring-2 ring-homefix-primary/10"
                            />
                            <div>
                                <h4 className="font-black text-homefix-text text-sm">{review.name}</h4>
                                <p className="text-xs font-bold text-homefix-accent mt-0.5">{review.service}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-14 flex justify-center">
                <div className="inline-flex items-center gap-2.5 bg-white border border-gray-100 px-6 py-3 rounded-2xl shadow-sm">
                    <span className="material-symbols-outlined text-homefix-primary text-base">verified_user</span>
                    <span className="text-homefix-text text-sm font-bold">100% Verified Customer Feedback</span>
                </div>
            </div>
        </section>
    );
}