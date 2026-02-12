import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

const Login = () => {
  return (
    <div className="min-h-screen bg-homefix-secondary flex items-center justify-center p-6 font-['Poppins']">
      <div className="w-full max-w-3xl bg-homefix-bg shadow-2xl overflow-hidden flex flex-col rounded-[2rem]">
        
        {/* Top Section - Light Gradient */}
        <div className="bg-gradient-to-br from-homefix-bg to-gray-100 p-12 flex flex-col items-center justify-center min-h-[320px] relative">
          <h1 className="text-6xl font-black text-homefix-text mb-10 tracking-tight">Welcome</h1>
          
          {/* Logo Component */}
          <div className="transform hover:scale-105 transition-transform duration-300">
            <Logo className="h-28 w-auto" textClassName="hidden" />
          </div>
        </div>

        {/* Bottom Section - Darker Gray/White Contrast */}
        <div className="bg-gray-50 p-12 flex flex-col items-center border-t border-gray-100">
          <h2 className="text-2xl font-black text-homefix-text uppercase mb-10 tracking-wider">
            User Login
          </h2>
          
          <form className="w-full max-w-lg space-y-6">
            {/* Username Field */}
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input 
                type="text" 
                placeholder="User name" 
                className="w-full bg-white text-homefix-text pl-14 pr-4 py-4 outline-none font-medium placeholder:text-gray-400 rounded-xl shadow-sm border border-gray-200 focus:border-homefix-accent focus:ring-1 focus:ring-homefix-accent transition-all"
              />
            </div>

            {/* Password Field */}
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input 
                type="password" 
                placeholder="Password" 
                className="w-full bg-white text-homefix-text pl-14 pr-4 py-4 outline-none font-medium placeholder:text-gray-400 rounded-xl shadow-sm border border-gray-200 focus:border-homefix-accent focus:ring-1 focus:ring-homefix-accent transition-all"
              />
            </div>

            {/* Remember Me */}
            <div className="flex justify-end">
              <button type="button" className="text-homefix-text text-sm font-bold hover:text-homefix-accent transition-colors">Remember</button>
            </div>

            {/* Login Button */}
            <div className="flex flex-col items-center gap-6 pt-4">
              <button 
                type="submit" 
                className="w-48 bg-homefix-primary text-white py-3 text-lg font-black uppercase tracking-widest hover:bg-blue-900 transition-colors rounded-xl shadow-lg shadow-homefix-primary/20"
              >
                Login
              </button>

              <Link 
                to="/" 
                className="text-homefix-text text-sm font-bold hover:text-homefix-accent transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;