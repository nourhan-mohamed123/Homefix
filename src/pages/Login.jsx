import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

const Login = () => {
  return (
    <div className="min-h-screen bg-homefix-secondary flex items-center justify-center p-6 py-12 font-['Poppins']">
      <div className="w-full max-w-4xl bg-homefix-bg shadow-2xl overflow-hidden flex flex-col rounded-[2rem]">
        <div className="bg-gradient-to-br from-homefix-bg to-gray-100 p-12 flex flex-col items-center justify-center min-h-[300px] relative">
          <Link to="/" className="absolute top-10 left-10 text-homefix-text hover:scale-110 transition-transform flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <div className="mb-6 transform hover:scale-105 transition-transform duration-300">
            <Logo className="h-20 w-auto" textClassName="hidden" />
          </div>
          <h1 className="text-6xl font-black tracking-tight text-center">
            <span className="text-slate-900">User</span> <span className="text-blue-600">Login</span>
          </h1>
        </div>

        <div className="bg-white p-12 md:p-16 flex flex-col items-center">
          <form className="w-full max-w-lg space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-homefix-text font-extrabold text-[13px] uppercase tracking-wide block ml-1 text-left">
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="w-full bg-gray-50 px-5 py-4 outline-none rounded-2xl border border-gray-200 focus:border-homefix-accent focus:ring-1 focus:ring-homefix-accent text-homefix-text font-medium transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-homefix-text font-extrabold text-[13px] uppercase tracking-wide block ml-1 text-left">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-gray-50 px-5 py-4 outline-none rounded-2xl border border-gray-200 focus:border-homefix-accent focus:ring-1 focus:ring-homefix-accent text-homefix-text font-medium transition-all"
                />
              </div>
            </div>

            <div className="w-full flex justify-between items-center px-1">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 accent-homefix-primary cursor-pointer"
                />
                <label htmlFor="remember" className="text-gray-600 text-sm font-semibold cursor-pointer select-none">
                  Remember me
                </label>
              </div>
              <Link to="/forgot-password" size="sm" className="text-homefix-accent text-sm font-bold hover:underline">
                Forgot?
              </Link>
            </div>

            <div className="flex flex-col items-center gap-8 pt-4">
              <button className="bg-homefix-primary text-white px-20 py-4 text-lg font-black tracking-widest rounded-xl hover:bg-homefix-accent transition-all duration-300 shadow-lg shadow-homefix-primary/20 active:scale-95">
                Login
              </button>

              <div className="text-center space-y-4 pt-4 border-t border-gray-100 w-full">
                <p className="text-homefix-text font-medium text-sm">
                  Don't have an account?
                  <Link to="/customer-register" className="font-black hover:text-homefix-accent transition-colors ml-1">
                    Create one
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;