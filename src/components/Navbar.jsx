import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { ChevronDown } from 'lucide-react';

const SignUpDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative inline-block text-left">

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-6 py-2 text-[13px] font-bold rounded-xl bg-homefix-primary text-white shadow-md transition-all duration-300 hover:bg-opacity-90"
            >
                Sign Up
                <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>

                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-2xl shadow-xl z-20 overflow-hidden backdrop-blur-sm bg-white/90">
                        <Link
                            to="/customer-register"
                            className="block px-4 py-3 text-[13px] text-gray-700 hover:bg-homefix-primary hover:text-white transition-colors border-b border-gray-100"
                            onClick={() => setIsOpen(false)}
                        >
                            Sign up as Customer
                        </Link>
                        <Link
                            to="/provider-register"
                            className="block px-4 py-3 text-[13px] text-gray-700 hover:bg-homefix-primary hover:text-white transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Sign up as Provider
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

const Navbar = () => {
    const navLinks = [
        { name: 'Home', href: '/#home' },
        { name: 'Category', href: '/#services' },
        { name: 'Services', href: '/#services' },
        { name: 'Contact us', href: '/#contactus' },
    ];
    return (
        <header className="sticky top-0 z-50 flex items-center justify-between border-b border-homefix-secondary bg-white/90 backdrop-blur-md px-6 py-4 md:px-20 lg:px-40">
            <div className="flex items-center gap-6 shrink-0">
                <Link to="/login" className="hidden md:block">
                    <button className="min-w-[100px]  rounded-xl h-10 px-5 bg-homefix-secondary text-homefix-text text-sm font-bold hover:bg-gray-200 transition-colors">
                        Login
                    </button>
                </Link>
                <SignUpDropdown />
            </div>
            <nav className="hidden lg:flex flex-1 justify-center gap-10">
                {navLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        className="text-homefix-text/70 hover:text-homefix-primary text-sm font-semibold transition-all duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-homefix-accent after:transition-all hover:after:w-full"
                    >
                        {link.name}
                    </a>
                ))}
            </nav>

            <div className="shrink-0">
                <Link to="/">
                    <Logo />
                </Link>
            </div>

        </header>
    );
};

export default Navbar;
