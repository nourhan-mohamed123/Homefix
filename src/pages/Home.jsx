import React, { useEffect, useState } from 'react';
import { apiCall, API_ENDPOINTS } from '../config/api.js';
import HeroSection from '../home/HeroSection';
import PopularServices from '../home/PopularServices';
import HowToBook from '../home/HowToBook';
import CustomerReviews from '../home/CustomerReviews';
import ContactUs from '../home/ContactUs';
export default function Home() {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await apiCall(API_ENDPOINTS.CATEGORIES);
        const list = Array.isArray(data) ? data : (data?.data ?? []);
        setCategories(list);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-white font-['Poppins']">
      <HeroSection />
      <PopularServices categories={categories} loading={loadingCategories} />
      <HowToBook />
      <CustomerReviews />
      <ContactUs />
    </div>
  );
}