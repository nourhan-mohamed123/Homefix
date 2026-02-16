import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, X } from 'lucide-react';

export default function BasicInfoForm({ formData, handleChange, handleServiceAreaChange, handleNext }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const cities = [
        "Cairo", "Giza", "Alexandria", "Shubra El Kheima", "Port Said", "Suez", "Luxor", "Mansoura",
        "El-Mahalla El-Kubra", "Tanta", "Asyut", "Ismailia", "Fayyum", "Zagazig", "Aswan", "Damietta",
        "Damanhur", "Minya", "Beni Suef", "Qena", "Sohag", "Hurghada", "6th of October", "Shibin El Kom",
        "Banha", "Kafr el-Sheikh", "Arish", "Mallawi", "10th of Ramadan", "Bilbais", "Marsa Matruh"
    ];

    const toggleCity = (city) => {
        const currentAreas = formData.serviceAreas || [];
        if (currentAreas.includes(city)) {
            handleServiceAreaChange(currentAreas.filter(c => c !== city));
        } else {
            handleServiceAreaChange([...currentAreas, city]);
        }
    };

    const removeCity = (city) => {
        const currentAreas = formData.serviceAreas || [];
        handleServiceAreaChange(currentAreas.filter(c => c !== city));
    };

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





                {/* Service Areas - Multi Select */}
                <div className="space-y-2 relative md:col-span-2">
                    <label className="text-homefix-text font-extrabold text-[13px] uppercase tracking-wide text-left block">
                        Service Areas <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                        <div
                            className="w-full bg-gray-50 px-5 py-4 min-h-[58px] rounded-2xl border border-gray-200 focus-within:border-homefix-accent focus-within:ring-1 focus-within:ring-homefix-accent cursor-pointer flex flex-wrap gap-2 items-center"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            {formData.serviceAreas && formData.serviceAreas.length > 0 ? (
                                formData.serviceAreas.map(area => (
                                    <span key={area} className="bg-homefix-primary/10 text-homefix-primary px-3 py-1 rounded-lg text-sm font-semibold flex items-center gap-1">
                                        {area}
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeCity(area);
                                            }}
                                            className="hover:text-red-500 transition-colors"
                                        >
                                            <X size={14} />
                                        </button>
                                    </span>
                                ))
                            ) : (
                                <span className="text-gray-400 font-medium">Select cities...</span>
                            )}

                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                                <ChevronDown
                                    className={`text-gray-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                    size={20}
                                />
                            </div>
                        </div>

                        {isDropdownOpen && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 max-h-[300px] overflow-y-auto z-50 p-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                                    {cities.map(city => (
                                        <button
                                            key={city}
                                            type="button"
                                            onClick={() => toggleCity(city)}
                                            className={`px-4 py-3 rounded-xl text-left font-medium transition-all flex items-center justify-between group ${formData.serviceAreas?.includes(city)
                                                ? 'bg-homefix-primary text-white shadow-md shadow-homefix-primary/20'
                                                : 'hover:bg-gray-50 text-gray-700'
                                                }`}
                                        >
                                            {city}
                                            {formData.serviceAreas?.includes(city) && <span className="bg-white/20 p-1 rounded-full"><X size={12} /></span>}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Backdrop to close dropdown */}
                    {isDropdownOpen && (
                        <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)}></div>
                    )}
                </div>

                {/* Bio */}

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
