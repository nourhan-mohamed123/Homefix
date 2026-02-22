import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS, apiCall } from '../../../../config/api';

export const useProviderRegister = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('basic');
    const [services, setServices] = useState([]);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [registerError, setRegisterError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Main Provider Data
    const [formData, setFormData] = useState({
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
        serviceAreas: [],
        idDocument: null,
        certifications: null
    });

    const [selectedDays, setSelectedDays] = useState([]);

    // --- Handlers ---

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

    // Service List Management
    const handleAddService = (service) => {
        setServices(prev => [...prev, service]);
    };

    const handleEditService = (serviceId, updatedService) => {
        setServices(prev => prev.map(s => s.id === serviceId ? updatedService : s));
    };

    const handleDeleteService = (serviceId) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            setServices(prev => prev.filter(s => s.id !== serviceId));
        }
    };

    const handleSkipForLater = () => {
        navigate('/provider-dashboard');
    };

    const handleSubmit = () => {
        if (services.length === 0) {
            alert('Please add at least one service!');
            return;
        }
        setIsConfirmOpen(true);
    };

    // "Sync with Integromat" (Backend Sync)
    const syncWithIntegromat = async () => {
        setRegisterError('');
        const cities = formData.serviceAreas?.length ? formData.serviceAreas : (formData.city ? [formData.city] : []);
        
        if (!cities.length) {
            setRegisterError('Please select at least one service area or city.');
            return false;
        }

        setIsSubmitting(true);
        try {
            const nameParts = (formData.name || '').trim().split(/\s+/);
            const firstname = nameParts[0] || '';
            const lastname = nameParts.slice(1).join(' ') || nameParts[0] || '';

            const registerData = {
                firstname,
                lastname,
                email: formData.email,
                password: formData.password,
                cityOrCities: cities,
                account_type: 'provider',
                address: formData.address || null,
                // Include services if backend supports receiving them here, for now we follow existing logic
            };

            await apiCall(API_ENDPOINTS.AUTH.SIGNUP, {
                method: 'POST',
                body: JSON.stringify(registerData),
            });
            
            navigate('/provider-dashboard');
            return true;
        } catch (err) {
            setRegisterError(err.message || 'Registration failed. Please try again.');
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        // State
        formData,
        services,
        activeTab,
        isConfirmOpen,
        registerError,
        isSubmitting,
        selectedDays,
        
        // State Setters (if needed strictly, but handlers are better)
        setActiveTab,
        setIsConfirmOpen,
        setRegisterError,

        // Handlers
        handleChange,
        handleServiceAreaChange,
        handleFileChange,
        handleNext,
        handleBack,
        toggleDay,
        handleAddService,
        handleEditService,
        handleDeleteService,
        handleSkipForLater,
        handleSubmit,
        syncWithIntegromat
    };
};
