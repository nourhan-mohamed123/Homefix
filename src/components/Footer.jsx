import React from 'react';
import { Link } from 'react-router-dom';
import {Mail, Phone } from 'lucide-react';
const Footer = () => {
    const services = ['House Cleaning', 'Plumbing Repairs', 'Handyman Tasks', 'Electrical Help', 'Lawn Maintenance'];
    const company = ['About Us', 'Careers', 'Reviews', 'Become a Pro', 'Contact Support'];
    const safety = ['HomePro Guarantee', 'Safety Standards', 'Privacy Policy', 'Terms of Service'];
    return (
        <footer className="bg-[#f9fafb] border-t border-gray-100 pt-20 pb-10 px-6 md:px-20 lg:px-40">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                <div className="space-y-6">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-homefix-primary rounded-xl flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-2xl">home_repair_service</span>
                        </div>
                        <h2 className="text-homefix-primary text-2xl font-black tracking-tighter">House<span className="text-homefix-accent">Fix</span></h2>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        The ultimate home maintenance platform connecting you with top-rated, verified professionals for every task.
                    </p>
                </div>
                <div>
                    <h4 className="font-bold text-homefix-text mb-6 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-homefix-primary rounded-full"></span>
                        Popular Services
                    </h4>
                    <ul className="space-y-3">
                        {services.map((item) => (
                            <li key={item}>
                                <a href="#" className="text-gray-500 hover:text-homefix-primary text-sm font-medium transition-colors">
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-homefix-text mb-6 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-homefix-primary rounded-full"></span>
                        Company
                    </h4>
                    <ul className="space-y-3">
                        {company.map((item) => (
                            <li key={item}>
                                <Link
                                    to={item === 'Become a Pro' ? '/provider-register' : `/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="text-gray-500 hover:text-homefix-primary text-sm font-medium transition-colors"
                                >
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-homefix-text mb-6 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-homefix-primary rounded-full"></span>
                        Trust & Safety
                    </h4>
                    <div className="space-y-6">
                        <ul className="space-y-3">
                            {safety.map((item) => (
                                <li key={item}>
                                    <Link to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-500 hover:text-homefix-primary text-sm font-medium transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-homefix-primary/5 to-transparent border border-homefix-primary/10">
                            <div className="flex items-center gap-2 text-homefix-primary font-bold text-[11px] uppercase tracking-widest mb-1">
                                <span className="material-symbols-outlined text-sm">verified</span>
                                Verified Safety
                            </div>
                            <p className="text-[11px] text-gray-400 font-medium leading-tight">
                                All professionals undergo strict background checks.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-gray-400 text-xs font-medium">
                    © 2026 HouseFix Inc. All rights reserved.
                </p>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-gray-400 text-xs hover:text-gray-600 transition-colors cursor-pointer">
                        <Mail className="w-3.5 h-3.5" />
                        support@housefix.com
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-xs hover:text-gray-600 transition-colors cursor-pointer">
                        <Phone className="w-3.5 h-3.5" />
                        +20 (123) 456-789
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;