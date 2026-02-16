import React from 'react';
import { Search, CheckCircle, ArrowRight } from 'lucide-react';

export default function HeroSection() {
    return (
        <section className="relative w-full px-6 py-4 md:px-12 lg:px-20 pt-20">
            <div className="relative w-full rounded-[3rem] bg-[#0F172A] min-h-[450px] md:min-h-[500px] flex items-center overflow-hidden shadow-2xl">
                <div className="absolute inset-0 w-full h-full">
                    <img
                        src="https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=1200&h=800&fit=crop"
                        className="w-full h-full object-cover opacity-20"
                        alt="Background"
                    />
                    <div className="absolute inset-0 bg-primary-to-from-[#3B82F6] via-[#1e3a3a]/80 to-transparent"></div>
                </div>
                <div className="relative z-10 w-full px-8 md:px-16 py-12">
                    <div className="max-w-full">

                        <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]">
                            Your Home, Better Than Ever
                        </h1>

                        <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-4xl leading-relaxed opacity-90">
                            Find and book top-rated professionals for any home task.
                            From cleaning to complex repairs, we've got you covered with expert care.
                        </p>
                        <div className="relative max-w-3xl group">
                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                <Search className="w-5 h-5 text-blue-500" />
                            </div>
                            <input
                                type="text"
                                placeholder="What service do you need today?"
                                className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-lg py-5 pl-14 pr-40 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-white/30"
                            />
                            <button className="absolute right-1 top-2 bottom-2 bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-xl font-bold transition-all flex items-center gap-2">
                                <span>Search</span>
                                <ArrowRight className="w-6 h-4" />
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}