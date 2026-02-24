import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, ArrowRight, Wrench, CalendarClock, BarChart3 } from 'lucide-react';
import Logo from '../components/Logo';

const UPCOMING_FEATURES = [
    { icon: <CalendarClock className="w-5 h-5" />, label: 'Booking Calendar' },
    { icon: <Wrench className="w-5 h-5" />, label: 'Service Management' },
    { icon: <BarChart3 className="w-5 h-5" />, label: 'Earnings & Analytics' },
];

export default function ProviderDashboard() {
    return (
        <div className="min-h-screen bg-homefix-bg flex flex-col items-center justify-center p-6 font-['Poppins']">
            <div className="w-full max-w-lg bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(30,58,138,0.08)] border border-gray-100 overflow-hidden">
                <div className="h-2 w-full bg-gradient-to-r from-homefix-primary via-homefix-accent to-blue-400" />

                <div className="p-10 flex flex-col items-center text-center">
                    <div className="mb-6">
                        <Logo textClassName="hidden" className="h-12 w-auto" />
                    </div>
                    <div className="w-20 h-20 rounded-[1.5rem] bg-homefix-bg border border-gray-100 flex items-center justify-center mb-6 shadow-sm">
                        <LayoutDashboard className="w-9 h-9 text-homefix-primary" />
                    </div>
                    <h1 className="text-3xl font-black text-homefix-text tracking-tight mb-2">
                        Dashboard <span className="text-homefix-primary">Coming Soon</span>
                    </h1>
                    <p className="text-gray-400 text-sm font-medium max-w-xs leading-relaxed mb-8">
                        We're building your provider command center. Manage bookings, track earnings, and view your services all in one place.
                    </p>
<div className="w-full bg-homefix-bg rounded-2xl p-5 mb-8 space-y-3">
                        <p className="text-[10px] font-black text-homefix-accent uppercase tracking-widest mb-4">Coming Up</p>
                        {UPCOMING_FEATURES.map((f, i) => (
                            <div key={i} className="flex items-center gap-3 text-homefix-text">
                                <span className="text-homefix-primary">{f.icon}</span>
                                <span className="text-sm font-semibold">{f.label}</span>
                                <span className="ml-auto text-[10px] font-bold text-homefix-accent bg-homefix-accent/10 px-2 py-0.5 rounded-full">Soon</span>
                            </div>
                        ))}
                    </div>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 bg-homefix-primary text-white px-8 py-3.5 rounded-xl font-black text-sm tracking-widest hover:bg-homefix-accent transition-all duration-300 shadow-lg shadow-homefix-primary/20 active:scale-95 w-full justify-center"
                    >
                        Back to Home
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            <p className="mt-6 text-gray-400 text-xs font-medium">
                Questions? <a href="mailto:support@homefix.com" className="text-homefix-accent hover:underline">Contact support</a>
            </p>
        </div>
    );
}
