import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { ChevronDown, LogOut, User } from 'lucide-react';

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

const UserMenu = ({ user, onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const displayName = user.username || user.email || '?';
    const initial = displayName[0].toUpperCase();

    return (
        <div className="relative inline-block text-left" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-homefix-primary text-white text-sm font-bold shadow-md hover:bg-opacity-90 transition-all duration-300"
            >
                <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center font-black text-sm">
                    {initial}
                </span>
                <span className="hidden sm:inline max-w-[120px] truncate">{displayName}</span>
                <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Signed in as</p>
                        <p className="text-sm font-bold text-homefix-text truncate">{user.username}</p>
                    </div>
                    <button
                        onClick={() => { setIsOpen(false); onLogout(); }}
                        className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors font-semibold"
                    >
                        <LogOut size={15} />
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser =
            localStorage.getItem('user') || sessionStorage.getItem('user');
        if (savedUser) {
            try { setUser(JSON.parse(savedUser)); } catch { setUser(null); }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    const navLinks = [
        { name: 'Home', href: '/#home' },
        { name: 'Category', href: '/#services' },
        { name: 'Services', href: '/#services' },
        { name: 'Contact us', href: '/#contactus' },
    ];
    return (
        <header className="sticky top-0 z-50 flex items-center justify-between border-b border-homefix-secondary bg-white/90 backdrop-blur-md px-6 py-4 md:px-20 lg:px-40">
            <div className="flex items-center gap-6 shrink-0">
                {user ? (
                    <UserMenu user={user} onLogout={handleLogout} />
                ) : (
                    <>
                        <Link to="/login" className="hidden md:block">
                            <button className="min-w-[100px] rounded-xl h-10 px-5 bg-homefix-secondary text-homefix-text text-sm font-bold hover:bg-gray-200 transition-colors">
                                Login
                            </button>
                        </Link>
                        <SignUpDropdown />
                    </>
                )}
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
