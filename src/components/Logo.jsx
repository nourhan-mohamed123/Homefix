import React from 'react';

const Logo = ({ className = "h-10 w-auto", textClassName = "text-2xl" }) => {
  return (
    <div className={`flex items-center gap-3 group cursor-pointer ${className}`}>
      <div className="h-full transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
        <svg 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-full w-auto drop-shadow-sm"
        >
          <path 
            d="M50 10L10 45V90H90V45L50 10Z" 
            className="fill-homefix-primary" 
          />
          <path 
            d="M50 25L75 48H25L50 25Z" 
            className="fill-homefix-accent transition-colors duration-300 group-hover:fill-blue-400" 
          />
          <path 
            d="M35 60L45 70L65 50" 
            stroke="white" 
            strokeWidth="8" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </svg>
      </div>

      <div className={`font-display font-black tracking-tighter text-homefix-primary transition-colors duration-300 ${textClassName}`}>
        House<span className="text-homefix-accent group-hover:text-blue-500">Fix</span>
      </div>
    </div>
  );
};

export default Logo;