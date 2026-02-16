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
        <section id="reviews" className="px-6 py-20 md:px-20 lg:px-40 bg-white">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-extrabold text-homefix-text mb-4 tracking-tight">
                    What our customers are saying
                </h2>
                <div className="flex items-center justify-center gap-1.5 text-homefix-primary mb-4">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                    <span className="ml-2 text-homefix-text font-bold">4.9/5</span>
                </div>
                <p className="text-homefix-text/60 max-w-2xl mx-auto text-base">
                    Join thousands of satisfied homeowners who trust HomeFix for their daily needs.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {reviews.map((review, index) => (
                    <div
                        key={index}
                        className="group bg-white rounded-3xl p-8 border border-homefix-secondary shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className="flex gap-1 mb-6">
                            {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-current text-homefix-primary" />
                            ))}
                        </div>

                        <p className="text-homefix-text/80 text-sm leading-relaxed mb-8 italic">
                            "{review.comment}"
                        </p>
                        <div className="flex items-center gap-4 border-t border-homefix-secondary pt-6">
                            <img
                                src={review.avatar}
                                alt={review.name}
                                className="w-12 h-12 rounded-2xl object-cover ring-2 ring-homefix-primary/10"
                            />
                            <div>
                                <h4 className="font-bold text-homefix-text text-sm">{review.name}</h4>
                                <p className="text-xs font-medium text-homefix-primary">{review.service}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-16 flex justify-center">
                <div className="inline-flex items-center gap-2 bg-homefix-secondary/30 px-6 py-3 rounded-2xl">
                    <span className="material-symbols-outlined text-homefix-primary">verified_user</span>
                    <span className="text-homefix-text text-sm font-semibold">100% Verified Customer Feedback</span>
                </div>
            </div>
        </section>
    );
}