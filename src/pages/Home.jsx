import React from 'react';
import HeroSection from '../home/HeroSection';
import PopularServices from '../home/PopularServices';
import HowToBook from '../home/HowToBook';
import CustomerReviews from '../home/CustomerReviews';
import ContactUs from '../home/ContactUs';

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-['Poppins']">
      <HeroSection />
      <PopularServices />
      <HowToBook />
      <CustomerReviews />
      <ContactUs />
    </div>
  );
}