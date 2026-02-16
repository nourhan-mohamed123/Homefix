import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Navbar = () => {
    const navLinks = [
        { name: 'Services', href: '#services' },
        { name: 'How It Works', href: '#how-it-works' },
        { name: 'Reviews', href: '#reviews' },
        { name: 'Become a Pro', href: '#become-a-pro' },
    ];

    return (
        <header className="sticky top-0 z-50 flex items-center justify-between border-b border-homefix-secondary bg-white/90 backdrop-blur-md px-6 py-4 md:px-20 lg:px-40">
            <div className="flex items-center gap-3 shrink-0">
                <Link to="/login" className="hidden sm:block">
                    <button className="min-w-[90px] cursor-pointer rounded-xl h-10 px-5 bg-homefix-secondary text-homefix-text text-sm font-bold hover:bg-gray-200 transition-colors">
                        Login
                    </button>
                </Link>

                <Link to="/customer-register">
                    <button className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-xl h-10 px-6 bg-homefix-primary text-white text-sm font-bold shadow-lg shadow-homefix-primary/20 hover:bg-homefix-accent hover:-translate-y-0.5 transition-all active:scale-95">
                        Sign Up
                    </button>
                </Link>
            </div>

            <nav className="hidden lg:flex flex-1 justify-center gap-10">
                {navLinks.map((link) => (
                    link.name === 'Become a Pro' ? (
                        <Link
                            key={link.name}
                            to="/provider-register"
                            className="text-homefix-text/70 hover:text-homefix-primary text-sm font-semibold transition-all duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-homefix-accent after:transition-all hover:after:w-full"
                        >
                            {link.name}
                        </Link>
                    ) : (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-homefix-text/70 hover:text-homefix-primary text-sm font-semibold transition-all duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-homefix-accent after:transition-all hover:after:w-full"
                        >
                            {link.name}
                        </a>
                    )
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