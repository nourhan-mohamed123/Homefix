import { Edit3, Trash2, Tag, Banknote, Layers } from 'lucide-react';

export default function ServiceCard({ service, onEdit, onDelete }) {
    return (
        <div className="group relative bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 transform hover:-translate-y-1">
            
    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                    onClick={() => onEdit(service)}
                    className="p-2 bg-white shadow-md hover:bg-homefix-primary hover:text-white rounded-full transition-all text-gray-600"
                    title="Edit Service"
                >
                    <Edit3 className="w-4 h-4" />
                </button>
                <button
                    onClick={() => onDelete(service.id)}
                    className="p-2 bg-white shadow-md hover:bg-red-500 hover:text-white rounded-full transition-all text-gray-600"
                    title="Delete Service"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>

            <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-lg bg-homefix-primary/10 text-homefix-primary text-[10px] font-bold uppercase tracking-widest">
                        {service.category_name || service.categoryName || "Category"} 
                    </span>
                    <div className="h-1 w-1 rounded-full bg-gray-300"></div>
                    <span className="text-[11px] text-gray-400 font-medium">
                        {service.sub_category_name || service.subCategoryName || "Subcategory"}
                    </span>
                </div>
                
                <h3 className="font-extrabold text-gray-800 text-lg leading-tight group-hover:text-homefix-primary transition-colors line-clamp-1">
                    {service.service_name || service.serviceName || "Untitled Service"}
                </h3>
            </div>

            {/* Divider with Icon */}
            <div className="relative my-4">
                <hr className="border-gray-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white px-2">
                        <Layers className="w-3 h-3 text-gray-200" />
                    </div>
                </div>
            </div>

            <div className="flex items-end justify-between">
                <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold mb-1 ml-1">Service Price</p>
                    <div className="flex items-center gap-1.5 text-gray-900 font-black text-xl">
                        <span className="text-homefix-primary text-sm font-bold">EGP</span>
                        <span>{service.price}</span>
                    </div>
                </div>
                
                <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 rounded-xl border border-emerald-100/50">
                        <Banknote className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-[11px] font-bold text-emerald-700">
                            Fee: {service.commission}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}