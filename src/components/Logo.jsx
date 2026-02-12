import React from 'react';

const Logo = ({ className = "h-10 w-auto", textClassName = "text-2xl" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Icon: Stylized House/Shield */}
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-full w-auto"
      >
        {/* Main House Shape */}
        <path 
          d="M50 10L10 45V90H90V45L50 10Z" 
          className="fill-homefix-primary" 
          strokeWidth="0" 
        />
        {/* Inner Accent - Roof/Arrow */}
        <path 
          d="M50 25L75 48H25L50 25Z" 
          className="fill-homefix-accent" 
        />
        {/* Checkmark or Tool Suggestion */}
        <path 
          d="M35 60L45 70L65 50" 
          stroke="white" 
          strokeWidth="8" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
      </svg>
      {/* Text Brand */}
      <div className={`font-['Poppins'] font-extrabold tracking-tight text-homefix-primary ${textClassName}`}>
        House<span className="text-homefix-accent">Fix</span>
      </div>
    </div>
  );
};

export default Logo;
