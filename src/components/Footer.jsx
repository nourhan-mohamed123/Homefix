import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const services = ['House Cleaning', 'Plumbing Repairs', 'Handyman Tasks', 'Electrical Help', 'Lawn Maintenance'];
    const company = ['About Us', 'Careers', 'Reviews', 'Become a Pro', 'Contact Support'];
    const safety = ['HomePro Guarantee', 'Safety Standards', 'Privacy Policy', 'Terms of Service'];

    return (
        <footer className="bg-white border-t border-homefix-secondary py-16 px-6 md:px-20 lg:px-40">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                <div className="space-y-5">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-homefix-primary text-3xl">home_repair_service</span>
                        <h2 className="text-homefix-primary text-xl font-extrabold tracking-tight">House<span className="text-homefix-accent">Fix</span></h2>
                    </div>
                    <p className="text-homefix-text/70 text-sm leading-relaxed max-w-xs">
                        HouseFix - The Ultimate Home Maintenance Platform
                    </p>

                </div>
                <div>
                    <h4 className="font-bold text-homefix-text mb-6">Popular Services</h4>
                    <ul className="space-y-3">
                        {services.map((item) => (
                            <li key={item}>
                                <a href="#" className="text-homefix-text/60 hover:text-homefix-primary text-sm font-medium transition-colors">
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-homefix-text mb-6">Company</h4>
                    <ul className="space-y-3">
                        {company.map((item) => (
                            <li key={item}>
                                <Link
                                    to={item === 'Become a Pro' ? '/provider-register' : `/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="text-homefix-text/60 hover:text-homefix-primary text-sm font-medium transition-colors"
                                >
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-homefix-text mb-6">Trust & Safety</h4>
                    <ul className="space-y-3">
                        {safety.map((item) => (
                            <li key={item}>
                                <Link to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-homefix-text/60 hover:text-homefix-primary text-sm font-medium transition-colors">
                                    {item}
                                </Link>
                            </li>
                        ))}
                        <li className="pt-4">
                            <div className="bg-homefix-primary/5 p-4 rounded-2xl border border-homefix-primary/10">
                                <p className="text-homefix-primary text-xs font-bold flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">verified</span>
                                    Verified & Insured Professionals
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>


        </footer>
    );
};

export default Footer;