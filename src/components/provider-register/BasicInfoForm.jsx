import React from 'react';
import { motion } from 'framer-motion';

export default function BasicInfoForm({ formData, handleChange, handleNext }) {
    const professions = [
        'Plumber', 'Electrician', 'Carpenter', 'Painter',
        'Cleaner', 'HVAC Technician', 'Landscaper', 'Roofer'
    ];

    return (
        <motion.div
            key="basic"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Name */}
                <div className="space-y-2">
                    <label className="text-homefix-text font-extrabold text-[13px] uppercase tracking-wide text-left block">
                        Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-gray-50 px-5 py-4 outline-none rounded-2xl border border-gray-200 focus:border-homefix-accent focus:ring-1 focus:ring-homefix-accent text-homefix-text font-medium transition-all text-left"
                        placeholder="Enter your name"
                        required
                    />
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <label className="text-homefix-text font-extrabold text-[13px] uppercase tracking-wide text-left block">
                        Email <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-gray-50 px-5 py-4 outline-none rounded-2xl border border-gray-200 focus:border-homefix-accent focus:ring-1 focus:ring-homefix-accent text-homefix-text font-medium transition-all text-left"
                        placeholder="Enter your email"
                        required
                    />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                    <label className="text-homefix-text font-extrabold text-[13px] uppercase tracking-wide text-left block">
                        Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-gray-50 px-5 py-4 outline-none rounded-2xl border border-gray-200 focus:border-homefix-accent focus:ring-1 focus:ring-homefix-accent text-homefix-text font-medium transition-all text-left"
                        placeholder="Enter your phone"
                        required
                    />
                </div>

                {/* Password */}
                <div className="space-y-2">
                    <label className="text-homefix-text font-extrabold text-[13px] uppercase tracking-wide text-left block">
                        Password <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full bg-gray-50 px-5 py-4 outline-none rounded-2xl border border-gray-200 focus:border-homefix-accent focus:ring-1 focus:ring-homefix-accent text-homefix-text font-medium transition-all text-left"
                        placeholder="Create a password"
                        required
                        minLength={6}
                    />
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                    <label className="text-homefix-text font-extrabold text-[13px] uppercase tracking-wide text-left block">
                        Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full bg-gray-50 px-5 py-4 outline-none rounded-2xl border border-gray-200 focus:border-homefix-accent focus:ring-1 focus:ring-homefix-accent text-homefix-text font-medium transition-all text-left"
                        placeholder="Confirm your password"
                        required
                        minLength={6}
                    />
                </div>

                {/* Address */}
                <div className="space-y-2">
                    <label className="text-homefix-text font-extrabold text-[13px] uppercase tracking-wide text-left block">
                        Address <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full bg-gray-50 px-5 py-4 outline-none rounded-2xl border border-gray-200 focus:border-homefix-accent focus:ring-1 focus:ring-homefix-accent text-homefix-text font-medium transition-all text-left"
                        placeholder="Enter your address"
                        required
                    />
                </div>

                {/* City */}
                <div className="space-y-2">
                    <label className="text-homefix-text font-extrabold text-[13px] uppercase tracking-wide text-left block">
                        City <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full bg-gray-50 px-5 py-4 outline-none rounded-2xl border border-gray-200 focus:border-homefix-accent focus:ring-1 focus:ring-homefix-accent text-homefix-text font-medium transition-all text-left"
                        placeholder="Enter your city"
                        required
                    />
                </div>

    

                {/* Service Area */}
                <div className="space-y-2">
                    <label className="text-homefix-text font-extrabold text-[13px] uppercase tracking-wide text-left block">
                        Service Area <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="serviceArea"
                        value={formData.serviceArea}
                        onChange={handleChange}
                        className="w-full bg-gray-50 px-5 py-4 outline-none rounded-2xl border border-gray-200 focus:border-homefix-accent focus:ring-1 focus:ring-homefix-accent text-homefix-text font-medium transition-all text-left"
                        placeholder="e.g. Downtown, Uptown"
                        required
                    />
                </div>

                {/* Bio */}
                <div className="md:col-span-2 space-y-2">
                    <label className="text-homefix-text font-extrabold text-[13px] uppercase tracking-wide text-left block">
                        Bio <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows="4"
                        className="w-full bg-gray-50 px-5 py-4 outline-none rounded-2xl border border-gray-200 focus:border-homefix-accent focus:ring-1 focus:ring-homefix-accent text-homefix-text font-medium transition-all resize-none text-left"
                        placeholder="Tell us about yourself..."
                        required
                    />
                </div>
            </div>

            {/* Next Button */}
            <div className="flex justify-center pt-8">
                <button
                    type="button"
                    onClick={handleNext}
                    className="bg-homefix-primary text-white px-20 py-4 text-lg font-black tracking-widest rounded-xl hover:bg-homefix-accent transition-all duration-300 shadow-lg shadow-homefix-primary/20 active:scale-95"
                >
                    Next
                </button>
            </div>
        </motion.div>
    );
}
