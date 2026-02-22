import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CallToAction() {
    return (
        <section id="become-a-pro" className="px-6 py-16 md:px-20 lg:px-40 font-['Poppins']">
            <div className="relative bg-gradient-to-br from-homefix-primary via-[#1a3578] to-homefix-accent rounded-[2.5rem] p-12 md:p-16 text-center shadow-2xl overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute -top-10 -right-10 w-52 h-52 bg-white/5 rounded-full pointer-events-none"></div>
                <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-white/5 rounded-full pointer-events-none"></div>
                <div className="absolute top-1/2 right-12 -translate-y-1/2 w-24 h-24 bg-white/5 rounded-full pointer-events-none hidden lg:block"></div>

                <div className="relative z-10">
                    <p className="text-white/60 text-xs font-black uppercase tracking-widest mb-4">Get Started Today</p>
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-5 tracking-tight leading-tight">
                        Ready to cross those tasks<br className="hidden md:block" /> off your list?
                    </h2>
                    <p className="text-white/80 text-base md:text-lg mb-10 max-w-xl mx-auto font-light">
                        Join thousands of happy customers and find the perfect pro for every job — fast, easy, and guaranteed.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            to="/customer-register"
                            id="cta-get-started-btn"
                            className="inline-flex items-center gap-2 bg-white text-homefix-primary px-8 py-4 rounded-xl font-black text-sm tracking-widest shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
                        >
                            Get Started Free
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            to="/provider-register"
                            id="cta-become-pro-btn"
                            className="inline-flex items-center gap-2 bg-transparent border-2 border-white/40 text-white px-8 py-4 rounded-xl font-black text-sm tracking-widest hover:bg-white/10 hover:border-white transition-all duration-300 active:scale-95"
                        >
                            Become a Pro
                        </Link>
                    </div>

                    {/* Trust line */}
                    <p className="text-white/40 text-xs font-medium mt-8">
                        No credit card required &nbsp;·&nbsp; Cancel anytime &nbsp;·&nbsp; Verified professionals
                    </p>
                </div>
            </div>
        </section>
    );
}
