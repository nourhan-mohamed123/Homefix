import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import ServiceCard from './ServiceCard';
import TimeSlotsModal from './TimeSlotsModal';

export default function ServicesInfoForm({
    categories = [],
    subCategories = [],
    allServices = [],
    services,
    onAddService,
    onEditService,
    onDeleteService,
    onSubmit
}) {
    const [currentService, setCurrentService] = useState({
        category: '',
        subCategory: '',
        serviceName: '',
        price: '',
        priceType: 'Fixed',
        days: []
    });

    const filteredSubCategories = subCategories.filter(
        sub => String(sub.category_id) === String(currentService.category)
    );

    const filteredServices = allServices.filter(
        svc => String(svc.sub_category_id) === String(currentService.subCategory)
    );

    const handleServiceChange = (e) => {
        const { name, value } = e.target;
        setCurrentService(prev => ({
            ...prev,
            [name]: value,
            ...(name === 'category' && { subCategory: '', serviceName: '' }),
            ...(name === 'subCategory' && { serviceName: '' })
        }));
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500">Category</label>
                    <select name="category" value={currentService.category} onChange={handleServiceChange} className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-200">
                        <option value="">Select Category</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500">Sub-Category</label>
                    <select name="subCategory" value={currentService.subCategory} onChange={handleServiceChange} disabled={!currentService.category} className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-200">
                        <option value="">Select Sub-Category</option>
                        {filteredSubCategories.map(sub => (
                            <option key={sub.id} value={sub.id}>{sub.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map(service => (
                    <ServiceCard
                        key={service.id}
                        service={service}
                        onEdit={() => { }}
                        onDelete={onDeleteService}
                    />
                ))}
            </div>
        </div>
    );
}
