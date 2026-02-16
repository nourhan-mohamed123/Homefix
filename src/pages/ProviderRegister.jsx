import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import TabNavigation from '../components/provider-register/TabNavigation';
import BasicInfoForm from '../components/provider-register/BasicInfoForm';
import ServicesInfoForm from '../components/provider-register/ServicesInfoForm';
import Logo from '../components/Logo';
import FinalConfirmationModal from '../components/provider-register/FinalConfirmationModal';

export default function ProviderRegister() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('basic');
    const [services, setServices] = useState([]);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const [formData, setFormData] = useState({
        // Basic Information
        name: '',
        profession: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        bio: '',

        hourlyRate: '',
        experience: '',
        serviceAreas: [],

        // Documents
        idDocument: null,
        certifications: null
    });

    const [selectedDays, setSelectedDays] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleServiceAreaChange = (newServiceAreas) => {
        setFormData(prev => ({
            ...prev,
            serviceAreas: newServiceAreas
        }));
    };

    const handleFileChange = (e, fieldName) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                [fieldName]: file
            }));
        }
    };

    const handleNext = () => {
        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        if (formData.password.length < 6) {
            alert('Password must be at least 6 characters long!');
            return;
        }

        setActiveTab('services');
    };

    const handleBack = () => {
        if (activeTab === 'services') {
            setActiveTab('basic');
        } else {
            navigate(-1);
        }
    };

    const toggleDay = (day) => {
        setSelectedDays(prev =>
            prev.includes(day)
                ? prev.filter(d => d !== day)
                : [...prev, day]
        );
    };

    const handleAddService = (service) => {
        setServices(prev => [...prev, service]);
    };

    const handleEditService = (serviceId, updatedService) => {
        setServices(prev => prev.map(s => s.id === serviceId ? updatedService : s));
    };

    const handleDeleteService = (serviceId) => {
        if (confirm('Are you sure you want to delete this service?')) {
            setServices(prev => prev.filter(s => s.id !== serviceId));
        }
    };

    const handleSkipForLater = () => {
        console.log('Skipping for later...');
        navigate('/provider-dashboard');
    };

    const handleSubmit = () => {
        if (services.length === 0) {
            alert('Please add at least one service!');
            return;
        }
        setIsConfirmOpen(true);
    };

    const handleFinalConfirm = () => {
        console.log('Final Form Data:', formData);
        console.log('Final Services:', services);
        alert('Provider registration submitted successfully!');
        navigate('/provider-dashboard');
    };

    return (
        <div className="min-h-screen bg-homefix-secondary flex items-center justify-center p-6 py-12 font-['Poppins']">
            <div className="w-full max-w-5xl bg-homefix-bg shadow-2xl overflow-hidden flex flex-col rounded-[2rem]">
                <div className="bg-gradient-to-br from-homefix-bg to-gray-100 p-12 flex flex-col items-center justify-center min-h-[200px] relative">
                    <button
                        onClick={handleBack}
                        className="absolute top-10 left-10 text-homefix-text hover:scale-110 transition-transform flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </button>
                    <div className="mb-6 transform hover:scale-105 transition-transform duration-300">
                        <Logo className="h-20 w-auto" textClassName="hidden" />
                    </div>
                    <h1 className="text-6xl font-black tracking-tight text-center">
                        <span className="text-slate-900">Provider</span> <span className="text-blue-600">Sign Up</span>
                    </h1>
                </div>

                {/* Tab Navigation */}
                <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

                {/* Form Content */}
                <div className="bg-white p-8">
                    {activeTab === 'basic' ? (
                        <BasicInfoForm
                            formData={formData}
                            handleChange={handleChange}
                            handleServiceAreaChange={handleServiceAreaChange}
                            handleNext={handleNext}
                        />
                    ) : (
                        <ServicesInfoForm
                            formData={formData}
                            handleChange={handleChange}
                            handleFileChange={handleFileChange}
                            services={services}
                            onAddService={handleAddService}
                            onEditService={handleEditService}
                            onDeleteService={handleDeleteService}
                            selectedDays={selectedDays}
                            toggleDay={toggleDay}
                            onSkipForLater={handleSkipForLater}
                            onSubmit={handleSubmit}
                        />
                    )}

                    {/* Footer - Shared */}
                    <div className="mt-6 pt-6 border-t border-gray-200 text-center space-y-2">
                        <p className="text-gray-600">
                            Already Have Account? <button type="button" onClick={() => navigate('/login')} className="text-homefix-primary font-semibold hover:underline">Sign In</button>
                        </p>
                        <p className="text-gray-600 mt-2">
                            Want to Sign Up as Customer? <button type="button" onClick={() => navigate('/customer-register')} className="text-homefix-primary font-semibold hover:underline">Click Here</button>
                        </p>
                    </div>
                </div>
            </div>

            <FinalConfirmationModal
                isOpen={isConfirmOpen}
                formData={formData}
                onConfirm={handleFinalConfirm}
                onCancel={() => setIsConfirmOpen(false)}
            />
        </div>
    );
}
