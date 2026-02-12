import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

const CustomerRegister = () => {
  return (
    <div className="min-h-screen bg-homefix-secondary flex items-center justify-center p-6 py-12 font-['Poppins']">
      <div className="w-full max-w-5xl bg-homefix-bg shadow-2xl overflow-hidden flex flex-col rounded-[2rem]">
        
        {/* Top Section - Light Gradient with Back Arrow */}
        <div className="bg-gradient-to-br from-homefix-bg to-gray-100 p-12 flex flex-col items-center justify-center min-h-[200px] relative">
          <Link to="/" className="absolute top-10 left-10 text-homefix-text hover:scale-110 transition-transform flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          
          <div className="mb-6 transform hover:scale-105 transition-transform duration-300">
             <Logo className="h-20 w-auto" textClassName="hidden" />
          </div>
          <h1 className="text-6xl font-black text-homefix-text tracking-tight text-center">Customer Sign Up</h1>
        </div>

        {/* Form Section - Darker Gray/White Contrast */}
        <div className="bg-gray-50 p-10 md:p-16 flex flex-col items-center border-t border-gray-100">
          <form className="w-full space-y-8">
            {/* Row 1: First Name & Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-homefix-text font-bold text-sm">First Name <span className="text-homefix-alert">*</span></label>
                <input type="text" placeholder="First Name" className="w-full bg-white px-5 py-4 outline-none rounded-xl shadow-sm border border-gray-200 focus:border-homefix-accent focus:ring-1 focus:ring-homefix-accent text-homefix-text font-medium transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-homefix-text font-bold text-sm">Last Name <span className="text-homefix-alert">*</span></label>
                <input type="text" placeholder="Last Name" className="w-full bg-white px-5 py-4 outline-none rounded-xl shadow-sm border border-gray-200 focus:border-homefix-accent focus:ring-1 focus:ring-homefix-accent text-homefix-text font-medium transition-all" />
              </div>
            </div>

            {/* Row 2: Email */}
            <div className="space-y-2">
              <label className="text-homefix-text font-bold text-sm">Email <span className="text-homefix-alert">*</span></label>
              <input type="email" placeholder="Email" className="w-full bg-white px-5 py-4 outline-none rounded-xl shadow-sm border border-gray-200 focus:border-homefix-accent focus:ring-1 focus:ring-homefix-accent text-homefix-text font-medium transition-all" />
            </div>

            {/* Row 3: Password */}
            <div className="space-y-2">
              <label className="text-homefix-text font-bold text-sm">Password <span className="text-homefix-alert">*</span></label>
              <input type="password" placeholder="Password" className="w-full bg-white px-5 py-4 outline-none rounded-xl shadow-sm border border-gray-200 focus:border-homefix-accent focus:ring-1 focus:ring-homefix-accent text-homefix-text font-medium transition-all" />
            </div>

            {/* Row 4: Confirm Password */}
            <div className="space-y-2">
              <label className="text-homefix-text font-bold text-sm">Confirm Password <span className="text-homefix-alert">*</span></label>
              <input type="password" placeholder="Confirm Password" className="w-full bg-white px-5 py-4 outline-none rounded-xl shadow-sm border border-gray-200 focus:border-homefix-accent focus:ring-1 focus:ring-homefix-accent text-homefix-text font-medium transition-all" />
            </div>

            {/* Row 5: Phone Number & City */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-homefix-text font-bold text-sm">Phone Number <span className="text-homefix-alert">*</span></label>
                <input type="tel" placeholder="Phone Number" className="w-full bg-white px-5 py-4 outline-none rounded-xl shadow-sm border border-gray-200 focus:border-homefix-accent focus:ring-1 focus:ring-homefix-accent text-homefix-text font-medium transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-homefix-text font-bold text-sm">City <span className="text-homefix-alert">*</span></label>
                <input type="text" placeholder="City" className="w-full bg-white px-5 py-4 outline-none rounded-xl shadow-sm border border-gray-200 focus:border-homefix-accent focus:ring-1 focus:ring-homefix-accent text-homefix-text font-medium transition-all" />
              </div>
            </div>

            {/* Row 6: Address */}
            <div className="space-y-2">
              <label className="text-homefix-text font-bold text-sm">Address</label>
              <input type="text" placeholder="Address" className="w-full bg-white px-5 py-4 outline-none rounded-xl shadow-sm border border-gray-200 focus:border-homefix-accent focus:ring-1 focus:ring-homefix-accent text-homefix-text font-medium transition-all" />
            </div>

            {/* Action Section */}
            <div className="flex flex-col items-end gap-10 pt-4">
              <button 
                type="submit" 
                className="bg-homefix-primary text-white px-12 py-3 text-lg font-black tracking-widest rounded-xl hover:bg-blue-900 transition-colors shadow-lg shadow-homefix-primary/20"
              >
                Sign Up
              </button>
            </div>

            {/* Footer Links */}
            <div className="w-full text-center space-y-4 pt-4 border-t border-gray-200">
              <p className="text-homefix-text font-medium">
                Already Have Account? <Link to="/login" className="font-black hover:text-homefix-accent transition-colors">Sign In</Link>
              </p>
              <p className="text-homefix-text font-black uppercase text-sm tracking-widest cursor-pointer hover:text-homefix-accent transition-colors">
                Want to Sign Up as Provider?
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerRegister;
