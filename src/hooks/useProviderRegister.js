import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS, apiCall } from '../config/api.js';

export const useProviderRegister = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('basic');
    const [services, setServices] = useState([]);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [registerError, setRegisterError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [cities, setCities] = useState([]);
    const [allServices, setAllServices] = useState({});
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        address: '',
        city: '',
        description: '',
        serviceAreas: [],
        idDocument: null,
        certifications: null
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                let [citiesData, servicesData] = await Promise.all([
                    apiCall(API_ENDPOINTS.CITIES),
                    apiCall(API_ENDPOINTS.SERVICES)
                ]);
                citiesData = citiesData.map(city => city.name);
                setCities(citiesData.cities || citiesData || []);
                setAllServices(servicesData.services || servicesData || {});
            } catch (error) {
                console.error('Error fetching registration data:', error);
            }
        };
        fetchData();
    }, []);

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

    const syncWithIntegromat = async () => {
        setRegisterError('');

        setIsSubmitting(true);
        try {
            const registerData = {
                firstname: formData.firstName,
                lastname: formData.lastName,
                email: formData.email,
                password: formData.password,
                contact_number: formData.phone,
                cityOrCities: [formData.city],
                address: formData.address || null,
                discription: formData.description,
                account_type: 'provider'
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
        formData,
        services,
        activeTab,
        isConfirmOpen,
        registerError,
        isSubmitting,
        selectedDays,
        cities,
        allServices,

        setActiveTab,
        setIsConfirmOpen,
        setRegisterError,
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
