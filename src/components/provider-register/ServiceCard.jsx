import { Edit3, Trash2, Tag, Banknote } from 'lucide-react';
export default function ServiceCard({ service, onEdit, onDelete }) {
    return (
        <div className="group bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:border-homefix-primary/20 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                    <span className="inline-block px-2 py-0.5 rounded-md bg-homefix-primary/10 text-homefix-primary text-[10px] font-bold uppercase tracking-wider mb-2">
                        {service.category}
                    </span>
                    <h3 className="font-bold text-homefix-text text-lg leading-tight group-hover:text-homefix-primary transition-colors">
                        {service.serviceName}
                    </h3>
                    <p className="text-sm text-gray-400 font-medium">{service.subCategory}</p>
                </div>
                <div className="flex gap-1 bg-gray-50 p-1 rounded-lg opacity-80 group-hover:opacity-100 transition-opacity">
                    <button
                        type="button"
                        onClick={() => onEdit(service)}
                        className="p-2 hover:bg-white hover:shadow-sm rounded-md transition-all text-gray-500 hover:text-homefix-primary"
                        title="Edit Service"
                    >
                        <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => onDelete(service.id)}
                        className="p-2 hover:bg-red-50 rounded-md transition-all text-gray-400 hover:text-red-500"
                        title="Delete Service"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <hr className="border-gray-50 mb-4" />

            <div className="flex items-center justify-between">
                <div className="flex flex-col">
                    <div className="flex items-center gap-1.5 text-homefix-text font-bold text-base">
                        <Tag className="w-3.5 h-3.5 text-homefix-primary" />
                        <span>{service.price}</span>
                        <span className="text-[10px] font-medium text-gray-400 uppercase tracking-tighter bg-gray-100 px-1 rounded">
                            {service.priceType}
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100">
                    <Banknote className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-[11px] font-semibold text-emerald-700">
                        {service.commission}
                    </span>
                </div>
            </div>
        </div>
    );
}