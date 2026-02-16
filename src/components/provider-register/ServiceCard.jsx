import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

export default function ServiceCard({ service, onEdit, onDelete }) {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                    <h3 className="font-semibold text-homefix-text text-left">{service.serviceName}</h3>
                    <p className="text-sm text-gray-500 text-left">{service.category} - {service.subCategory}</p>
                </div>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => onEdit(service)}
                        className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                    >
                        <Edit2 className="w-4 h-4 text-homefix-primary" />
                    </button>
                    <button
                        type="button"
                        onClick={() => onDelete(service.id)}
                        className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                    >
                        <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                </div>
            </div>
            <div className="text-sm text-gray-600 text-left">
                <p>Price: {service.price} {service.priceType}</p>
                <p className="text-xs mt-1">{service.commission}</p>
            </div>
        </div>
    );
}
