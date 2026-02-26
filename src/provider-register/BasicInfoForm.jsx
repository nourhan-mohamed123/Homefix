import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, X } from 'lucide-react';

export default function BasicInfoForm({ formData, handleChange, handleServiceAreaChange, handleNext }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [errors, setErrors] = useState({});

    // قائمة المدن جاهزة
    const cities = [
        "Cairo", "Giza", "Alexandria", "Shubra El Kheima", "Port Said", "Suez", "Luxor", "Mansoura",
        "El-Mahalla El-Kubra", "Tanta", "Asyut", "Ismailia", "Fayyum", "Zagazig", "Aswan", "Damietta",
        "Damanhur", "Minya", "Beni Suef", "Qena", "Sohag", "Hurghada", "6th of October", "Shibin El Kom"
    ];

    const handlePhoneChange = (e) => {
        const { value } = e.target;
        if (value && !/^\d+$/.test(value)) return;
        handleChange(e);
        if (value.length > 0 && value.length !== 11) {
            setErrors(prev => ({ ...prev, phone: 'Phone number must be exactly 11 digits' }));
        } else {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.phone;
                return newErrors;
            });
        }
    };

    const validateAndNext = () => {
        const newErrors = {};
        if (!formData.phone || formData.phone.length !== 11) newErrors.phone = 'Required: 11 digits';
        if (formData.confirmPassword !== formData.password) newErrors.confirmPassword = 'Passwords do not match';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        handleNext();
    };

    const toggleCity = (city) => {
        const currentAreas = formData.serviceAreas || [];
        handleServiceAreaChange(currentAreas.includes(city)
            ? currentAreas.filter(c => c !== city)
            : [...currentAreas, city]);
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500 ml-1">First Name *</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name"
                        className="w-full bg-gray-50 px-5 py-3.5 rounded-2xl border border-gray-200 focus:border-homefix-primary outline-none transition-all" />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500 ml-1">Last Name *</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name"
                        className="w-full bg-gray-50 px-5 py-3.5 rounded-2xl border border-gray-200 focus:border-homefix-primary outline-none transition-all" />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500 ml-1">Email Address *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@example.com"
                        className="w-full bg-gray-50 px-5 py-3.5 rounded-2xl border border-gray-200 focus:border-homefix-primary outline-none transition-all" />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500 ml-1">Phone Number *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handlePhoneChange} placeholder="01xxxxxxxxx" maxLength={11}
                        className={`w-full bg-gray-50 px-5 py-3.5 rounded-2xl border ${errors.phone ? 'border-red-500' : 'border-gray-200'} focus:border-homefix-primary outline-none transition-all`} />
                </div>

                <div className="md:col-span-2 space-y-2 relative">
                    <label className="text-xs font-bold uppercase text-gray-500 ml-1">Service Areas *</label>
                    <div onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full bg-gray-50 px-5 py-3 min-h-[55px] rounded-2xl border border-gray-200 cursor-pointer flex flex-wrap gap-2 items-center">
                        {formData.serviceAreas?.length > 0 ? (
                            formData.serviceAreas.map(area => (
                                <span key={area} className="bg-homefix-primary/10 text-homefix-primary px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                                    {area} <X size={12} className="cursor-pointer" onClick={(e) => { e.stopPropagation(); toggleCity(area); }} />
                                </span>
                            ))
                        ) : <span className="text-gray-400 text-sm">Select cities you cover...</span>}
                        <ChevronDown className={`ml-auto text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} size={18} />
                    </div>

                    {isDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 max-h-[250px] overflow-y-auto z-50 p-3 grid grid-cols-2 gap-2">
                            {cities.map(city => (
                                <button key={city} type="button" onClick={() => toggleCity(city)}
                                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all text-left ${formData.serviceAreas?.includes(city) ? 'bg-homefix-primary text-white' : 'hover:bg-gray-50 text-gray-700'}`}>
                                    {city}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex justify-center pt-6">
                <button type="button" onClick={validateAndNext}
                    className="bg-homefix-primary text-white px-16 py-4 text-lg font-black uppercase tracking-widest rounded-2xl hover:bg-homefix-accent transition-all shadow-lg shadow-homefix-primary/20 active:scale-95">
                    Next Step
                </button>
            </div>
        </motion.div>
    );
}
