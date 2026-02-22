import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, ShieldCheck, Star, Clock } from 'lucide-react';
export default function HeroSection() {
    return (
        <section className="relative w-full px-6 py-6 md:px-12 lg:px-20 pt-10 font-['Poppins']" style={{ minHeight: '0' }}>
            <div className="relative w-full rounded-[3rem] bg-[#0F172A] min-h-[520px] md:min-h-[580px] flex items-center overflow-hidden shadow-2xl">
                <div className="absolute inset-0 w-full h-full">
                    <img
                        src="https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=1400&h=900&fit=crop"
                        className="w-full h-full object-cover opacity-90"
                        alt="Home repair background"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/90 to-[#1E3A8A]/40"></div>
                </div>
                <div className="relative z-10 w-full px-8 md:px-16 py-14">
                    <div className="max-w-3xl">
                        <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.1] tracking-tight">
                            Your Home,{' '}
                            <span className="text-homefix-accent">Better</span>{' '}
                            Than Ever
                        </h1>
                        <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-xl leading-relaxed font-light">
                            Book top-rated, verified professionals for any home task — from cleaning to complex repairs.
                        </p>
                        <div className="relative max-w-2xl group mb-10">
                            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                                <Search className="w-5 h-5 text-homefix-accent" />
                            </div>
                            <input
                                type="text"
                                placeholder="What service do you need today?"
                                className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-base py-5 pl-14 pr-44 rounded-2xl outline-none focus:ring-2 focus:ring-homefix-accent/50 transition-all placeholder:text-white/40 font-medium"
                            />
                            <button className="absolute right-2 top-2 bottom-2 bg-homefix-primary hover:bg-homefix-accent text-white px-6 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 text-sm tracking-wide shadow-lg hover:shadow-homefix-accent/30">
                                <span>Search</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            <div className="hidden lg:flex absolute right-28 bottom-10 z-10 bg-white rounded-[1.5rem] p-6 shadow-2xl flex-col items-center gap-3 min-w-[220px]">
                <span className="text-homefix-text font-black text-sm uppercase tracking-widest">Get Started</span>
                <p className="text-gray-400 text-xs text-center font-medium">Join thousands of happy customers</p>
                <Link
                    to="/customer-register"
                    className="w-full bg-homefix-primary text-white px-6 py-3 rounded-xl font-black text-sm tracking-widest hover:bg-homefix-accent transition-all duration-300 shadow-lg shadow-homefix-primary/20 active:scale-95 text-center block"
                >
                    Sign Up Free
                </Link>
                <Link
                    to="/login"
                    className="w-full text-center text-homefix-text font-bold text-sm hover:text-homefix-accent transition-colors block"
                >
                    Already a member?
                </Link>
            </div>
            <div className="flex lg:hidden gap-4 mt-6">
                <Link
                    to="/customer-register"
                    className="flex-1 bg-homefix-primary text-white px-6 py-4 rounded-xl font-black text-sm tracking-widest hover:bg-homefix-accent transition-all duration-300 shadow-lg shadow-homefix-primary/20 active:scale-95 text-center"
                >
                    Sign Up Free
                </Link>
                <Link
                    to="/login"
                    className="flex-1 bg-homefix-bg border border-gray-200 text-homefix-text px-6 py-4 rounded-xl font-bold text-sm hover:border-homefix-accent hover:text-homefix-accent transition-all duration-300 text-center"
                >
                    Log In
                </Link>
            </div>
        </section>
    );
}