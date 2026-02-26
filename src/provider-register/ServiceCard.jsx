import { Edit3, Trash2, Tag, Banknote } from 'lucide-react';

export default function ServiceCard({ service, onEdit, onDelete }) {
    return (
        <div className="group bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex justify-between items-start mb-3">
                <div className="flex-1 min-w-0"> {/* min-w-0 بتساعد في الـ truncate */}
                    <span className="inline-block px-1.5 py-0.5 rounded bg-homefix-primary/10 text-homefix-primary text-[9px] font-bold uppercase tracking-wider mb-1">
                        {service.category_name || service.categoryName || service.category} 
                    </span>
                    
                    <h3 className="font-bold text-homefix-text text-base leading-tight group-hover:text-homefix-primary transition-colors truncate">
                        {service.service_name || service.serviceName || "Untitled Service"}
                    </h3>
                    
                    <p className="text-xs text-gray-400 font-medium truncate">
                        {service.sub_category_name || service.subCategoryName || service.subCategory}
                    </p>
                </div>
                <div className="flex gap-1 bg-gray-50 p-1 rounded-lg">
                    <button
                        onClick={() => onEdit(service)}
                        className="p-1.5 hover:bg-white hover:shadow-sm rounded-md transition-all text-gray-500 hover:text-homefix-primary"
                    >
                        <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                        onClick={() => onDelete(service.id)}
                        className="p-1.5 hover:bg-red-50 rounded-md transition-all text-gray-400 hover:text-red-500"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>

            <hr className="border-gray-50 mb-3" />

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-homefix-text font-bold text-sm">
                    <Tag className="w-3 h-3 text-homefix-primary" />
                    <span>{service.price} EGP</span>
                </div>
                
                <div className="flex items-center gap-1 px-2 py-0.5 bg-emerald-50 rounded-full border border-emerald-100">
                    <Banknote className="w-3 h-3 text-emerald-600" />
                    <span className="text-[10px] font-semibold text-emerald-700">
                        Fee: {service.commission}
                    </span>
                </div>
            </div>
        </div>
    );
}