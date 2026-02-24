import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, Plus, Edit2, Trash2, Clock } from 'lucide-react';
import ServiceCard from './ServiceCard';
import TimeSlotsModal from './TimeSlotsModal';
export default function ServicesInfoForm({
    formData,
    handleChange: handleGlobalChange,
    handleFileChange: handleGlobalFileChange,
    services,
    onAddService,
    onEditService,
    onDeleteService,
    onSkipForLater,
    onSubmit
}) {
    const [currentService, setCurrentService] = useState({
        category: '',
        subCategory: '',
        serviceName: '',
        subType: '',
        priceType: '',
        price: '',
        serviceImage: null,
        description: '',
        alwaysAvailable: false,
        days: []
    });
    const [isTimeSlotsModalOpen, setIsTimeSlotsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [currentDayForTimeSlots, setCurrentDayForTimeSlots] = useState(null);
    // 3-Level Data Structure: Category -> Sub-category -> Services
    const fullCategoryData = {
        'Plumbing': {
            'Pipe Installation': ['New Pipe Setup', 'Pipe Replacement', 'Pipe Insulation', 'Gas Pipe Installation'],
            'Leak Repair': ['Faucet Leak Fix', 'Pipe Leak Sealing', 'Shower Leak Repair', 'Toilet Leak Fix'],
            'Drain Cleaning': ['Kitchen Sink Unclogging', 'Bathroom Drain Cleaning', 'Main Sewer Line Cleaning', 'Floor Drain Cleaning'],
            'Water Heater Repair': ['Tankless Water Heater Fix', 'Electric Heater Repair', 'Gas Heater Maintenance', 'Thermostat Replacement'],
            'Toilet Repair': ['Flush Mechanism Repair', 'Toilet Seat Replacement', 'Clog Removal', 'Seal Replacement']
        },
        'Electrical': {
            'Wiring & Rewiring': ['House Rewiring', 'New Circuit Installation', 'Wiring Repair', 'Socket Rewiring'],
            'Lighting Installation': ['Chandelier Installation', 'LED Light Setup', 'Outdoor Lighting', 'Recessed Lighting'],
            'Panel Upgrades': ['Fuse Box Replacement', 'Circuit Breaker Upgrade', 'Heavy Load Panel Upgrade', 'Grounding Installation'],
            'Outlet & Switch Repair': ['Faulty Outlet Fix', 'Switch Replacement', 'GFCI Outlet Installation', 'Dimmer Switch Setup'],
            'Ceiling Fan Installation': ['New Fan Assembly', 'Old Fan Replacement', 'Fan Balancing', 'Fan Wiring Fix']
        },
        'Carpentry': {
            'Furniture Assembly': ['IKEA Furniture Assembly', 'Custom Table Assembly', 'Bed Frame Setup', 'Wardrobe Assembly'],
            'Cabinet Installation': ['Kitchen Cabinet Hanging', 'Bathroom Vanity Installation', 'Custom Cabinet Building', 'Cabinet Door Alignment'],
            'Door Repair': ['Hinge Replacement', 'Door Frame Repair', 'Lock Installation', 'Sliding Door Fix'],
            'Window Frame Repair': ['Rotten Wood Replacement', 'Frame Sealing', 'Window Sill Repair', 'Sash Replacement'],
            'Custom Shelving': ['Floating Shelf Installation', 'Bookcase Building', 'Closet Organization System', 'Garage Shelving']
        },
        'Painting': {
            'Interior Painting': ['Wall Painting', 'Ceiling Painting', 'Trim & Molding Painting', 'Accent Wall'],
            'Exterior Painting': ['House Siding Painting', 'Fence Painting', 'Garage Door Painting', 'Deck Painting'],
            'Wall Papering': ['Wallpaper Installation', 'Wallpaper Removal', 'Wall Texture Application', 'Border Application'],
            'Deck Staining': ['Deck Cleaning & Staining', 'railing Staining', 'Sealant Application', 'Color Refinishing'],
            'Cabinet Painting': ['Kitchen Cabinet Refinishing', 'Bathroom Cabinet Painting', 'Custom Color Spraying', 'Gloss Finish Application']
        },
        'Cleaning': {
            'Deep Cleaning': ['Full Home Deep Clean', 'Kitchen Deep Clean', 'Bathroom Sanitization', 'Post-Construction Clean'],
            'Carpet Cleaning': ['Steam Cleaning', 'Stain Removal', 'Odor Neutralization', 'Rug Deep Clean'],
            'Window Cleaning': ['Interior Window Wipe', 'Exterior Window Wash', 'Screen Cleaning', 'Track Cleaning'],
            'Move-in/Move-out Cleaning': ['Apartment Turnover', 'End of Tenancy Clean', 'New Home Sanitization', 'Garage Sweep'],
            'Upholstery Cleaning': ['Sofa Steam Clean', 'Chair Stain Removal', 'Mattress Sanitization', 'Curtain Refresh']
        },
        'HVAC': {
            'AC Repair': ['Compressor Fix', 'Refrigerant Refill', 'Fan Motor Replacement', 'Capacitor Change'],
            'Heater Repair': ['Pilot Light Fix', 'Heat Exchanger Repair', 'Blower Motor Replacement', 'Ignition Sensor Fix'],
            'Duct Cleaning': ['Air Duct Vacuuming', 'Vent Sanitization', 'Filter Replacement', 'Mold Remediation'],
            'Thermostat Installation': ['Smart Thermostat Setup', 'Digital Thermostat Wiring', 'Calibration', 'Battery Replacement'],
            'System Maintenance': ['Annual Tune-up', 'Coil Cleaning', 'Safety Inspection', 'Performance Testing']
        }
    };
    const categories = Object.keys(fullCategoryData);
    const priceTypes = ['Fixed', 'Per Hour', 'Per Day', 'Per Project'];
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const handleServiceChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCurrentService(prev => {
            const newState = {
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            };
            if (name === 'category') {
                newState.subCategory = '';
                newState.serviceName = '';
            }
            if (name === 'subCategory') {
                newState.serviceName = '';
            }
            return newState;
        });
    };
    const handleServiceFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCurrentService(prev => ({
                ...prev,
                serviceImage: file
            }));
        }
    };
    const toggleDay = (day) => {
        const existingDay = currentService.days.find(d => d.day === day);

        if (existingDay) {
            setCurrentService(prev => ({
                ...prev,
                days: prev.days.filter(d => d.day !== day)
            }));
        } else {
            setCurrentDayForTimeSlots(day);
            setIsTimeSlotsModalOpen(true);
        }
    };
    const handleDayClick = (day) => {
        setCurrentDayForTimeSlots(day);
        setIsTimeSlotsModalOpen(true);
    };
    const handleSaveTimeSlots = (day, slots) => {
        setCurrentService(prev => {
            const existingDays = prev.days.filter(d => d.day !== day);
            if (slots && slots.length > 0) {
                return {
                    ...prev,
                    days: [...existingDays, { day, slots }]
                };
            }
            return {
                ...prev,
                days: existingDays
            };
        });
        setIsTimeSlotsModalOpen(false);
    };
    const handleAddOrUpdateService = () => {
        if (!currentService.category || !currentService.serviceName || !currentService.price) {
            alert('Please fill in all required fields (Category, Service Name, Price)');
            return;
        }
        const serviceData = {
            ...currentService,
            id: editingId || Date.now(),
            commission: '10%'
        };
        if (editingId) {
            onEditService(editingId, serviceData);
            setEditingId(null);
        } else {
            onAddService(serviceData);
        }
        setCurrentService({
            category: '',
            subCategory: '',
            serviceName: '',
            subType: '',
            priceType: '',
            price: '',
            serviceImage: null,
            description: '',
            alwaysAvailable: false,
            days: []
        });
    };
    const handleEditClick = (service) => {
        setCurrentService(service);
        setEditingId(service.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <motion.div
            key="services"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
        >
            <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-200">
                <h3 className="text-xl font-bold text-homefix-text mb-6 text-left">
                    {editingId ? 'Edit Service' : 'Add New Service'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-homefix-text font-extrabold text-[13px] uppercase tracking-wide text-left block">
                            Category :<span className="text-red-500">*</span>
                        </label>
                        <select
                            name="category"
                            value={currentService.category}
                            onChange={handleServiceChange}
                            className="w-full bg-gray-50 px-5 py-4 outline-none rounded-2xl border border-gray-200 focus:border-homefix-accent focus:ring-1 focus:ring-homefix-accent text-homefix-text font-medium transition-all text-left"
                        >
                            <option value="">Select category :</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-homefix-text font-extrabold text-[13px] uppercase tracking-wide text-left block">
                            Sub-category :<span className="text-red-500">*</span>
                        </label>
                        <select
                            name="subCategory"
                            value={currentService.subCategory}
                            onChange={handleServiceChange}
                            disabled={!currentService.category}
                            className={`w-full bg-gray-50 px-5 py-4 outline-none rounded-2xl border border-gray-200 focus:border-homefix-accent focus:ring-1 focus:ring-homefix-accent text-homefix-text font-medium transition-all text-left ${!currentService.category ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <option value="">Select sub-category :</option>
                            {currentService.category && Object.keys(fullCategoryData[currentService.category] || {}).map(sub => (
                                <option key={sub} value={sub}>{sub}</option>
                            ))}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-homefix-text font-extrabold text-[13px] uppercase tracking-wide text-left block">
                            Service :<span className="text-red-500">*</span>
                        </label>
                        <select
                            name="serviceName"
                            value={currentService.serviceName}
                            onChange={handleServiceChange}
                            disabled={!currentService.subCategory}
                            className={`w-full bg-gray-50 px-5 py-4 outline-none rounded-2xl border border-gray-200 focus:border-homefix-accent focus:ring-1 focus:ring-homefix-accent text-homefix-text font-medium transition-all text-left ${!currentService.subCategory ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <option value="">Select service :</option>
                            {currentService.category && currentService.subCategory &&
                                fullCategoryData[currentService.category]?.[currentService.subCategory]?.map(service => (
                                    <option key={service} value={service}>{service}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-homefix-text font-extrabold text-[13px] uppercase tracking-wide text-left block">
                            Company Commission
                        </label>
                        <input
                            type="text"
                            value="10%"
                            disabled
                            className="w-32 bg-[#0F172A] text-white px-5 py-2 outline-none rounded-2xl border-none font-black text-center cursor-not-allowed"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-homefix-text font-extrabold text-[13px] uppercase tracking-wide text-left block">
                            Price Type :<span className="text-red-500">*</span>
                        </label>
                        <select
                            name="priceType"
                            value={currentService.priceType}
                            onChange={handleServiceChange}
                            className="w-full bg-gray-50 px-5 py-4 outline-none rounded-2xl border border-gray-200 focus:border-homefix-accent focus:ring-1 focus:ring-homefix-accent text-homefix-text font-medium transition-all text-left"
                        >
                            <option value="">Select price type</option>
                            {priceTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-homefix-text font-extrabold text-[13px] uppercase tracking-wide text-left block">
                            Price :<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={currentService.price}
                            onChange={handleServiceChange}
                            className="w-full bg-gray-50 px-5 py-4 outline-none rounded-2xl border border-gray-200 focus:border-homefix-accent focus:ring-1 focus:ring-homefix-accent text-homefix-text font-medium transition-all text-left"
                            placeholder="Enter price"
                            min="0"
                        />
                    </div>
                    <div className="md:col-span-1 space-y-2">
                        <label className="text-homefix-text font-extrabold text-[13px] uppercase tracking-wide text-left block">
                            Service Image
                        </label>
                        <div className="relative flex">
                            <input
                                type="file"
                                id="serviceImageInput"
                                onChange={handleServiceFileChange}
                                className="hidden"
                                accept=".jpg,.jpeg,.png"
                            />
                            <div className="flex-1 bg-gray-50 px-5 py-4 outline-none rounded-l-2xl border border-r-0 border-gray-200 text-homefix-text font-medium truncate">
                                {currentService.serviceImage ? currentService.serviceImage.name : 'Choose Image'}
                            </div>
                            <label
                                htmlFor="serviceImageInput"
                                className="px-6 py-4 bg-gray-200 text-gray-700 font-extrabold uppercase text-xs tracking-widest rounded-r-2xl cursor-pointer hover:bg-gray-300 transition-colors flex items-center"
                            >
                                Browse
                            </label>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center gap-3">
                    <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full border border-gray-300">
                        <input
                            type="checkbox"
                            name="alwaysAvailable"
                            id="alwaysAvailable"
                            checked={currentService.alwaysAvailable}
                            onChange={handleServiceChange}
                            className="absolute opacity-0 w-full h-full cursor-pointer z-10"
                        />
                        <div className={`block w-full h-full rounded-full transition-colors ${currentService.alwaysAvailable ? 'bg-homefix-primary' : 'bg-gray-200'}`}></div>
                        <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform ${currentService.alwaysAvailable ? 'translate-x-6' : 'translate-x-0'}`}></div>
                    </div>
                    <label htmlFor="alwaysAvailable" className="text-homefix-text font-semibold text-left text-sm">
                        Always Available
                    </label>
                </div>
                {!currentService.alwaysAvailable && (
                    <div className="mt-6">
                        <label className="block text-homefix-text font-semibold mb-3 text-left text-sm">
                            Days *
                        </label>
                        <div className="flex flex-wrap gap-3">
                            {daysOfWeek.map(day => {
                                const dayData = currentService.days.find(d => d.day === day);
                                const isSelected = !!dayData;
                                return (
                                    <button
                                        key={day}
                                        type="button"
                                        onClick={() => handleDayClick(day)}
                                        className={`w-24 h-24 flex flex-col items-center justify-center rounded-lg border transition-all ${isSelected
                                            ? 'bg-homefix-primary text-white border-homefix-primary shadow-md'
                                            : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
                                            }`}
                                    >
                                        <span className="font-semibold">{day}</span>
                                        {isSelected && dayData.slots && dayData.slots.length > 0 && (
                                            <span className="text-xs mt-1 block">
                                                {dayData.slots[0].from}
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
                <div className="mt-8 flex justify-end">
                    <button
                        type="button"
                        onClick={handleAddOrUpdateService}
                        className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-12 rounded-lg transition-all duration-300"
                    >
                        {editingId ? 'Update' : 'Add'}
                    </button>
                </div>
            </div>
            {services.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-6 mb-8 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/60 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 flex items-center justify-center mb-4 shadow-sm">
                        <Plus className="w-7 h-7 text-homefix-primary" />
                    </div>
                    <h4 className="text-homefix-text font-black text-base mb-1">No services added yet</h4>
                    <p className="text-gray-400 text-sm font-medium max-w-xs leading-relaxed">
                        Fill in the form above and click <span className="font-bold text-homefix-text">Add</span> to include your first service offering.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {services.map(service => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            onEdit={handleEditClick}
                            onDelete={onDeleteService}
                        />
                    ))}
                </div>
            )}
            <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
                <button
                    type="button"
                    onClick={onSkipForLater}
                    className="bg-homefix-primary text-white px-8 py-3 text-lg font-black tracking-widest rounded-xl hover:bg-homefix-accent transition-all duration-300 shadow-lg shadow-homefix-primary/20 active:scale-95"
                >
                    Skip for Later
                </button>
                <button
                    type="button"
                    onClick={onSubmit}
                    className="bg-homefix-primary text-white px-8 py-3 text-lg font-black tracking-widest rounded-xl hover:bg-homefix-accent transition-all duration-300 shadow-lg shadow-homefix-primary/20 active:scale-95"
                >
                    Sign Up
                </button>
            </div>
            <TimeSlotsModal
                isOpen={isTimeSlotsModalOpen}
                day={currentDayForTimeSlots}
                existingSlots={
                    currentService.days.find(d => d.day === currentDayForTimeSlots)?.slots || []
                }
                onClose={() => setIsTimeSlotsModalOpen(false)}
                onSave={handleSaveTimeSlots}
            />
        </motion.div>
    );
}
