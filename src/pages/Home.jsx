import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

const Home = () => {
  return (
    <div className="min-h-screen bg-homefix-bg flex flex-col items-center justify-center p-6 text-center font-['Poppins'] text-homefix-text">
      
      {/* Hero Section */}
      <div className="w-full max-w-4xl space-y-12">
        
        {/* Logo & Title */}
        <div className="flex flex-col items-center gap-6">
          <div className="transform hover:scale-105 transition-transform duration-300">
             <Logo className="h-24 w-auto" textClassName="text-6xl md:text-7xl hidden" />
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-homefix-text tracking-tight">
            House<span className="text-homefix-accent">Fix</span>
          </h1>
          <p className="text-xl text-gray-500 font-medium max-w-lg mx-auto">
            Find trusted professionals for all your home maintenance needs.
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-2xl mx-auto bg-homefix-secondary p-2 rounded-2xl flex items-center shadow-sm border border-gray-200 focus-within:ring-2 focus-within:ring-homefix-accent/20 transition-all">
          <div className="pl-4 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input 
            type="text" 
            placeholder="What do you need help with?" 
            className="w-full bg-transparent px-4 py-3 outline-none text-homefix-text placeholder:text-gray-400 font-medium text-lg"
          />
          <button className="bg-homefix-accent text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-md">
            Search
          </button>
        </div>

        {/* Quick Links / Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Link 
            to="/login" 
            className="px-8 py-3 bg-homefix-primary text-white rounded-xl font-bold hover:bg-blue-900 transition-colors shadow-lg shadow-homefix-primary/20"
          >
            Login
          </Link>
          <Link 
            to="/customer-register" 
            className="px-8 py-3 border-2 border-homefix-primary text-homefix-primary rounded-xl font-bold hover:bg-homefix-secondary transition-colors"
          >
            Sign Up
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="pt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-homefix-success/10 rounded-full flex items-center justify-center text-homefix-success">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="font-bold text-homefix-text">Verified Pros</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-homefix-accent/10 rounded-full flex items-center justify-center text-homefix-accent">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="font-bold text-homefix-text">Fast Booking</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-homefix-alert/10 rounded-full flex items-center justify-center text-homefix-alert">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <span className="font-bold text-homefix-text">Secure Service</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;