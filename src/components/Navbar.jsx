import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Navbar = () => {
    const navLinks = [
        { name: 'Services', href: '#servicesCard' },
        { name: 'How It Works', href: '#how-it-works' },
        { name: 'Reviews', href: '#reviews' },
        { name: 'Become a Pro', href: '#become-a-pro' },
    ];
    return (
        <header className="sticky top-0 z-50 flex items-center justify-between border-b border-homefix-secondary bg-white/90 backdrop-blur-md px-6 py-4 md:px-20 lg:px-40">
            <div className="flex items-center gap-6 shrink-0">
                <Link to="/login" className="hidden md:block">
                    <button className="min-w-[100px]  rounded-xl h-10 px-5 bg-homefix-secondary text-homefix-text text-sm font-bold hover:bg-gray-200 transition-colors">        
                    Login
                    </button>
                </Link>
                <div className="flex p-1 bg-gray-100/80 backdrop-blur-sm border border-gray-200 rounded-2xl group">
                    <Link to="/customer-register">
                        <button className="relative px-6 py-2 text-[13px] font-bold rounded-xl transition-all duration-300 
                bg-homefix-primary text-white shadow-md 
                group-hover:bg-transparent group-hover:text-gray-600 group-hover:shadow-none
                hover:!bg-homefix-primary hover:!text-white hover:!shadow-md">
                            Customer
                        </button>
                    </Link>
                    <Link to="/provider-register">
                        <button className="relative px-6 py-2 text-[13px] font-bold rounded-xl transition-all duration-300 
                text-gray-600 bg-transparent
                 hover:bg-homefix-primary hover:text-white hover:shadow-md">
                            Provider
                        </button>
                    </Link>
                </div>
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