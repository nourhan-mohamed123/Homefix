import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { API_ENDPOINTS, apiCall } from '../config/api';

const CustomerRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    city: '',
    address: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      // Map formData to backend entities (users model: first_name, last_name, email, password, address, account_type)
      // Backend expects: firstname, lastname, email, password, cityOrCities (array), account_type, address
      const registerData = {
        firstname: formData.firstName,
        lastname: formData.lastName,
        email: formData.email,
        password: formData.password,
        cityOrCities: [formData.city],
        account_type: 'customer',
        address: formData.address || null,
      };

      await apiCall(API_ENDPOINTS.AUTH.SIGNUP, {
        method: 'POST',
        body: JSON.stringify(registerData),
      });

      // On success, redirect to login
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-homefix-secondary flex items-center justify-center p-6 py-12 font-['Poppins']">
      <div className="w-full max-w-5xl bg-homefix-bg shadow-2xl overflow-hidden flex flex-col rounded-[2rem]">

        <div className="bg-gradient-to-br from-homefix-bg to-gray-100 p-12 flex flex-col items-center justify-center min-h-[200px] relative">
          <Link to="/" className="absolute top-10 left-10 text-homefix-text hover:scale-110 transition-transform flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <div className="mb-6 transform hover:scale-105 transition-transform duration-300">
            <Logo className="h-20 w-auto" textClassName="hidden" />
          </div>
          <h1 className="text-6xl font-black tracking-tight text-center">
            <span className="text-slate-900">Customer</span> <span className="text-blue-600">Sign Up</span>
          </h1>
        </div>

        <div className="bg-homefix-bg p-10 md:p-16 flex flex-col items-center border-t border-gray-100">
          <form onSubmit={handleSubmit} className="w-full space-y-8">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm w-full text-center">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-homefix-text font-bold text-sm">First Name : <span className="text-homefix-alert">*</span></label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="w-full bg-white px-5 py-4 outline-none rounded-xl shadow-sm border border-gray-200 focus:border-homefix-accent focus:ring-1 focus:ring-homefix-accent text-homefix-text font-medium transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-homefix-text font-bold text-sm">Last Name : <span className="text-homefix-alert">*</span></label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="w-full bg-white px-5 py-4 outline-none rounded-xl shadow-sm border border-gray-200 focus:border-homefix-accent focus:ring-1 focus:ring-homefix-accent text-homefix-text font-medium transition-all"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-homefix-text font-bold text-sm">Password <span className="text-homefix-alert">*</span></label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full bg-white px-5 py-4 outline-none rounded-xl shadow-sm border border-gray-200 focus:border-homefix-accent focus:ring-1 focus:ring-homefix-accent text-homefix-text font-medium transition-all"
                  required
                  minLength="6"
                />
              </div>

              <div className="space-y-2">
                <label className="text-homefix-text font-bold text-sm">Confirm Password <span className="text-homefix-alert">*</span></label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="w-full bg-white px-5 py-4 outline-none rounded-xl shadow-sm border border-gray-200 focus:border-homefix-accent focus:ring-1 focus:ring-homefix-accent text-homefix-text font-medium transition-all"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-homefix-text font-bold text-sm">Email <span className="text-homefix-alert">*</span></label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full bg-white px-5 py-4 outline-none rounded-xl shadow-sm border border-gray-200 focus:border-homefix-accent focus:ring-1 focus:ring-homefix-accent text-homefix-text font-medium transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-homefix-text font-bold text-sm">Phone Number <span className="text-homefix-alert">*</span></label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full bg-white px-5 py-4 outline-none rounded-xl shadow-sm border border-gray-200 focus:border-homefix-accent focus:ring-1 focus:ring-homefix-accent text-homefix-text font-medium transition-all"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-homefix-text font-bold text-sm">City <span className="text-homefix-alert">*</span></label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="w-full bg-white px-5 py-4 outline-none rounded-xl shadow-sm border border-gray-200 focus:border-homefix-accent focus:ring-1 focus:ring-homefix-accent text-homefix-text font-medium transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-homefix-text font-bold text-sm">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address"
                  className="w-full bg-white px-5 py-4 outline-none rounded-xl shadow-sm border border-gray-200 focus:border-homefix-accent focus:ring-1 focus:ring-homefix-accent text-homefix-text font-medium transition-all"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-10 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-homefix-primary text-white px-12 py-3 text-lg font-black tracking-widest rounded-xl hover:bg-homefix-accent transition-all duration-300 shadow-lg shadow-homefix-primary/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </div>

            <div className="w-full text-center space-y-4 pt-4 border-t border-gray-200 mt-4">
              <p className="text-homefix-text font-medium text-sm">
                Already Have Account?
                <Link to="/login" className="font-black hover:text-homefix-accent transition-colors ml-1">
                  Sign In
                </Link>
              </p>
              <Link to="/provider-register" className="text-homefix-text font-black uppercase text-xs tracking-widest cursor-pointer hover:text-homefix-accent transition-colors">
                Want to Sign Up as a Provider?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerRegister;
