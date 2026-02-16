import React from 'react';
import HeroSection from '../home/HeroSection';
import PopularServices from '../home/PopularServices';
import HowToBook from '../home/HowToBook';
import CustomerReviews from '../home/CustomerReviews';
import CallToAction from '../home/CallToAction';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      <PopularServices />
      <HowToBook />
      <CustomerReviews />
      <CallToAction />
    </div>
  );
}