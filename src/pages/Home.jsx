import React, { useEffect, useState } from 'react';
import { apiCall, API_ENDPOINTS } from '../config/api.js';
import HeroSection from '../home/HeroSection';
import Category from '../home/Category.jsx';
import PopularServices from '../home/PopularServices';
import HowToBook from '../home/HowToBook';
import CustomerReviews from '../home/CustomerReviews';
import ContactUs from '../home/ContactUs';
export default function Home() {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);

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

    const fetchServices = async () => {
      try {
        const data = await apiCall(API_ENDPOINTS.SERVICES);
        const list = Array.isArray(data) ? data : (data?.data ?? []);
        setServices(list);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoadingServices(false);
      }
    };

    fetchCategories();
    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-white font-['Poppins']">
      <HeroSection />
     <Category categories={categories} loading={loadingCategories} />
      <PopularServices services={services} loading={loadingServices} />
      <HowToBook />
      <CustomerReviews />
      <ContactUs />
    </div>
  );
}