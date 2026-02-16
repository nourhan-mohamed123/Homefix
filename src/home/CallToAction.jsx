import React from 'react';
import { Link } from 'react-router-dom';

export default function CallToAction() {
    return (
        <section className="px-6 py-16 md:px-20 lg:px-40">
            <div className="bg-gradient-to-r from-homefix-primary to-homefix-accent rounded-3xl p-12 text-center shadow-2xl">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Ready to cross those tasks off your list ?
                </h2>
                <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                    JOIN THOUSANDS OF HAPPY CUSTOMERS AND FIND THE PERFECT PRO FOR YOUR JOB
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/login"
                        className="inline-block bg-white text-homefix-primary px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all text-center border border-transparent hover:bg-gray-50"
                    >
                        Get Started Now
                    </Link>
                    <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-homefix-primary transition-all">
                        View Pricing
                    </button>
                </div>
            </div>
        </section>
    );
}
