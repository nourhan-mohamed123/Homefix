import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, X } from 'lucide-react';
export const BasicDetailsForm = ({ data, onChange, onServiceAreaChange, onNext }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [errors, setErrors] = useState({});

    const cities = [
        "Cairo", "Giza", "Alexandria", "Shubra El Kheima", "Port Said", "Suez", "Luxor", "Mansoura",
        "El-Mahalla El-Kubra", "Tanta", "Asyut", "Ismailia", "Fayyum", "Zagazig", "Aswan", "Damietta"
    ];
    const handlePhoneChange = (e) => {
        const { value } = e.target;
        if (value && !/^\d+$/.test(value)) return;
        onChange(e);

        if (value.length > 0 && value.length !== 11) {
            setErrors(prev => ({ ...prev, phone: 'Phone number must be exactly 11 digits' }));
        } else {
            setErrors(prev => {
                const updatedErrors = { ...prev };
                delete updatedErrors.phone;
                return updatedErrors;
            });
        }
    };
    const handleConfirmPasswordChange = (e) => {
        onChange(e);
        if (e.target.value && e.target.value !== data.password) {
            setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
        } else {
            setErrors(prev => {
                const updatedErrors = { ...prev };
                delete updatedErrors.confirmPassword;
                return updatedErrors;
            });
        }
    };
    const toggleCity = (city) => {
        const currentAreas = data.serviceAreas || [];
        if (currentAreas.includes(city)) {
            onServiceAreaChange(currentAreas.filter(c => c !== city));
        } else {
            onServiceAreaChange([...currentAreas, city]);
        }
    };

    const removeCity = (city) => {
        const currentAreas = data.serviceAreas || [];
        onServiceAreaChange(currentAreas.filter(c => c !== city));
    };
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">First Name :<span className="text-red-500">*</span></label>
                    <input
                        name="firstName"
                        value={data.firstName}
                        onChange={onChange}
                        className="p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-homefix-primary focus:border-transparent outline-none transition-all"
                        placeholder="First Name"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Last Name :<span className="text-red-500">*</span></label>
                    <input
                        name="lastName"
                        value={data.lastName}
                        onChange={onChange}
                        className="p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-homefix-primary focus:border-transparent outline-none transition-all"
                        placeholder="Last Name"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Email :<span className="text-red-500">*</span></label>
                    <input
                        name="email"
                        type="email"
                        value={data.email}
                        onChange={onChange}
                        className="p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-homefix-primary focus:border-transparent outline-none transition-all"
                        placeholder="Enter your email"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Phone :<span className="text-red-500">*</span></label>
                    <input
                        name="phone"
                        type="tel"
                        value={data.phone}
                        onChange={handlePhoneChange}
                        className={`p-4 bg-gray-50 border ${errors.phone ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-homefix-primary focus:border-transparent outline-none transition-all`}
                        placeholder="Enter your phone"
                        maxLength={11}
                    />
                    {errors.phone && <span className="text-red-500 text-xs">{errors.phone}</span>}
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Address :<span className="text-red-500">*</span></label>
                    <input
                        name="address"
                        value={data.address}
                        onChange={onChange}
                        className="p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-homefix-primary focus:border-transparent outline-none transition-all"
                        placeholder="Enter your address"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">City :<span className="text-red-500">*</span></label>
                    <input
                        name="city"
                        value={data.city}
                        onChange={onChange}
                        className="p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-homefix-primary focus:border-transparent outline-none transition-all"
                        placeholder="Enter your city"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Password :<span className="text-red-500">*</span></label>
                    <input
                        name="password"
                        type="password"
                        value={data.password}
                        onChange={onChange}
                        className="p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-homefix-primary focus:border-transparent outline-none transition-all"
                        placeholder="Create a password"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Confirm Password :<span className="text-red-500">*</span></label>
                    <input
                        name="confirmPassword"
                        type="password"
                        value={data.confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        className={`p-4 bg-gray-50 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-homefix-primary focus:border-transparent outline-none transition-all`}
                        placeholder="Confirm your password"
                    />
                    {errors.confirmPassword && <span className="text-red-500 text-xs">{errors.confirmPassword}</span>}
                </div>
                <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wide"> description :<span className="text-red-500">*</span></label>
                    <textarea
                        name="description"
                        value={data.description}
                        onChange={onChange}
                        className="p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-homefix-primary focus:border-transparent outline-none transition-all min-h-[120px] resize-none"
                        placeholder="Tell us about yourself or your service discretion..."
                        required
                    />
                </div>
                <div className="col-span-1 md:col-span-2 flex flex-col gap-2 bg-white rounded-xl relative z-10">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Service Areas :<span className="text-red-500">*</span></label>
                    <div className="relative">
                        <div
                            className="w-full bg-gray-50 p-4 min-h-[58px] rounded-xl border border-gray-200 cursor-pointer flex flex-wrap gap-2 items-center focus-within:ring-2 focus-within:ring-homefix-primary"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            {data.serviceAreas && data.serviceAreas.length > 0 ? (
                                data.serviceAreas.map(area => (
                                    <span key={area} className="bg-homefix-primary/10 text-homefix-primary px-3 py-1 rounded-lg text-sm font-semibold flex items-center gap-1">
                                        {area}
                                        <button type="button" onClick={(e) => { e.stopPropagation(); removeCity(area); }} className="hover:text-red-500">
                                            <X size={14} />
                                        </button>
                                    </span>
                                ))
                            ) : (
                                <span className="text-gray-400">Select cities...</span>
                            )}
                            <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} size={20} />
                        </div>
                        {isDropdownOpen && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 max-h-[300px] overflow-y-auto z-50 p-2">
                                <div className="grid grid-cols-2 gap-1">
                                    {cities.map(city => (
                                        <button
                                            key={city}
                                            type="button"
                                            onClick={() => toggleCity(city)}
                                            className={`px-4 py-2 rounded-lg text-left text-sm font-medium transition-all hover:bg-gray-50 ${data.serviceAreas?.includes(city) ? 'bg-homefix-primary text-white hover:bg-homefix-primary/90' : 'text-gray-700'}`}
                                        >
                                            {city}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        {isDropdownOpen && <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />}
                    </div>
                </div>
            </div>
            <div className="flex justify-center pt-8">
                <button
                    onClick={onNext}
                    className="bg-homefix-primary text-white px-20 py-4 text-lg font-bold rounded-xl hover:bg-homefix-accent transition-all shadow-lg shadow-homefix-primary/20"
                >
                    Next
                </button>
            </div>
        </motion.div>
    );
};
