import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ServiceDetailsForm } from './ServiceDetailsForm';
import ServiceCard from '../../../components/provider-register/ServiceCard';
import TimeSlotsModal from '../../../components/provider-register/TimeSlotsModal';

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

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const ServicesManager = ({
    services,
    onAddService,
    onEditService,
    onDeleteService,
    onSkipForLater,
    onSubmit
}) => {
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
    const [currentDay, setCurrentDay] = useState(null);

    // --- Derived State for Dropdowns ---
    const categories = Object.keys(fullCategoryData);
    const subCategories = currentService.category ? Object.keys(fullCategoryData[currentService.category] || {}) : [];
    const serviceOptions = (currentService.category && currentService.subCategory)
        ? (fullCategoryData[currentService.category]?.[currentService.subCategory] || [])
        : [];

    // --- Handlers ---
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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCurrentService(prev => ({ ...prev, serviceImage: file }));
        }
    };

    const handleAddOrUpdate = () => {
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

        // Reset Form
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleStartEdit = (service) => {
        setCurrentService(service);
        setEditingId(service.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // --- Time Slot Logic ---
    const handleDayClick = (day) => {
        setCurrentDay(day);
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


    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
        >
            <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    {editingId ? 'Edit Service' : 'Add New Service'}
                </h3>

                {/* 1. The Clean Service Form */}
                <ServiceDetailsForm
                    data={currentService}
                    onUpdate={handleServiceChange}
                    onFileChange={handleFileChange}
                    categories={categories}
                    subCategories={subCategories}
                    serviceOptions={serviceOptions}
                />

                {/* 2. Days Logic (kept here as it's more interactive/complex) */}
                {!currentService.alwaysAvailable && (
                    <div className="mt-8">
                        <label className="block text-gray-700 font-bold mb-3 uppercase tracking-wide text-sm">
                            Availability Days <span className="text-red-500">*</span>
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
                                        className={`w-28 h-24 flex flex-col items-center justify-center rounded-2xl border transition-all ${isSelected
                                            ? 'bg-homefix-primary text-white border-homefix-primary shadow-lg shadow-homefix-primary/20 scale-105'
                                            : 'bg-white text-gray-500 border-gray-200 hover:border-homefix-primary hover:text-homefix-primary'
                                            }`}
                                    >
                                        <span className="font-bold">{day}</span>
                                        {isSelected && dayData.slots && dayData.slots.length > 0 ? (
                                            <span className="text-xs mt-1 font-medium bg-white/20 px-2 py-0.5 rounded-full">
                                                {dayData.slots.length} slots
                                            </span>
                                        ) : (
                                            <span className="text-xs mt-1 text-gray-400">Set Hours</span>
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
                        onClick={handleAddOrUpdate}
                        className="bg-gray-900 hover:bg-black text-white font-bold py-3 px-8 rounded-xl transition-all shadow-xl shadow-gray-900/10 active:scale-95"
                    >
                        {editingId ? 'Update Service' : 'Add Service'}
                    </button>
                </div>
            </div>

            {/* 3. List of Added Services */}
            {services.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {services.map(service => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            onEdit={handleStartEdit}
                            onDelete={onDeleteService}
                        />
                    ))}
                </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
                <button
                    type="button"
                    onClick={onSkipForLater}
                    className="px-6 py-3 text-gray-600 font-bold hover:bg-gray-100 rounded-xl transition-all"
                >
                    Skip for Later
                </button>
                <button
                    type="button"
                    onClick={onSubmit}
                    className="bg-homefix-primary text-white px-10 py-3 font-bold rounded-xl hover:bg-homefix-accent transition-all shadow-lg shadow-homefix-primary/20 active:scale-95"
                >
                    Submit Registration
                </button>
            </div>

            <TimeSlotsModal
                isOpen={isTimeSlotsModalOpen}
                day={currentDay}
                existingSlots={
                    currentService.days.find(d => d.day === currentDay)?.slots || []
                }
                onClose={() => setIsTimeSlotsModalOpen(false)}
                onSave={handleSaveTimeSlots}
            />
        </motion.div>
    );
};
