import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS, apiCall } from "../config/api";

export const useCustomerRegister = () => {
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
    const [fieldErrors, setFieldErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handlePhoneChange = (e) => {
        const { value } = e.target;
        if (value && !/^\d+$/.test(value)) return;
        handleChange(e);
        if (value.length > 0 && value.length !== 11) {
            setFieldErrors(prev => ({ ...prev, phone: 'Phone number must be exactly 11 digits' }));
        } else {
            setFieldErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.phone;
                return newErrors;
            });
        }
    };
    const handleConfirmPasswordChange = (e) => {
        const { value } = e.target;
        handleChange(e);

        if (value && value !== formData.password) {
            setFieldErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
        } else {
            setFieldErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.confirmPassword;
                return newErrors;
            });
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const errors = {};
        if (formData.phone.length !== 11) {
            errors.phone = 'Phone number must be exactly 11 digits';
        }
        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }
        setLoading(true);
        try {
            const registerData = {
                firstname: formData.firstName,
                lastname: formData.lastName,
                email: formData.email,
                password: formData.password,
                contact_number : formData.phone,
                cityOrCities: [formData.city],
                account_type: 'customer',
                address: formData.address || null,
            };
            await apiCall(API_ENDPOINTS.AUTH.SIGNUP, {
                method: 'POST',
                body: JSON.stringify(registerData),
            });
            navigate('/login');
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    return {
        formData,
        fieldErrors,
        loading,
        error,
        handleChange,
        handlePhoneChange,
        handleConfirmPasswordChange,
        handleSubmit
    };
};  