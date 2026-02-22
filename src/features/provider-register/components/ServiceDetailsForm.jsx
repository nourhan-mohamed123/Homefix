import React from 'react';
import { Upload } from 'lucide-react';

export const ServiceDetailsForm = ({
    data,
    onUpdate,
    categories = [],
    subCategories = [],
    serviceOptions = [],
    onFileChange
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            {/* Category */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Category <span className="text-red-500">*</span></label>
                <select
                    name="category"
                    value={data.category}
                    onChange={onUpdate}
                    className="p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-homefix-primary outline-none transition-all"
                >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {/* Sub-Category */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Sub-Category <span className="text-red-500">*</span></label>
                <select
                    name="subCategory"
                    value={data.subCategory}
                    onChange={onUpdate}
                    disabled={!data.category}
                    className={`p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-homefix-primary outline-none transition-all ${!data.category ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <option value="">Select Sub-Category</option>
                    {subCategories.map(sub => (
                        <option key={sub} value={sub}>{sub}</option>
                    ))}
                </select>
            </div>

            {/* Service Name */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Service Name <span className="text-red-500">*</span></label>
                <select
                    name="serviceName"
                    value={data.serviceName}
                    onChange={onUpdate}
                    disabled={!data.subCategory}
                    className={`p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-homefix-primary outline-none transition-all ${!data.subCategory ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <option value="">Select Service</option>
                    {serviceOptions.map(svc => (
                        <option key={svc} value={svc}>{svc}</option>
                    ))}
                </select>
            </div>

            {/* Price Type */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Price Type <span className="text-red-500">*</span></label>
                <select
                    name="priceType"
                    value={data.priceType}
                    onChange={onUpdate}
                    className="p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-homefix-primary outline-none transition-all"
                >
                    <option value="">Select Price Type</option>
                    <option value="Fixed">Fixed</option>
                    <option value="Per Hour">Per Hour</option>
                    <option value="Per Day">Per Day</option>
                    <option value="Per Project">Per Project</option>
                </select>
            </div>

            {/* Price */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Price <span className="text-red-500">*</span></label>
                <input
                    type="number"
                    name="price"
                    value={data.price}
                    onChange={onUpdate}
                    min="0"
                    placeholder="0.00"
                    className="p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-homefix-primary outline-none transition-all"
                />
            </div>

            {/* Commission (Read Only) */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Commission</label>
                <div className="p-3 bg-slate-900 text-white font-bold rounded-xl border border-slate-800 opacity-80 cursor-not-allowed">
                    10%
                </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2 md:col-span-1">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Description <span className="text-red-500">*</span></label>
                <textarea
                    name="description"
                    value={data.description}
                    onChange={onUpdate}
                    rows="1"
                    className="p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-homefix-primary outline-none transition-all resize-none"
                    placeholder="Brief description of the service..."
                />
            </div>

            {/* Service Image */}
            <div className="flex flex-col gap-2 md:col-span-1">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Service Image</label>
                <div className="relative flex">
                    <input
                        type="file"
                        id="serviceImageInput"
                        onChange={onFileChange}
                        className="hidden"
                        accept=".jpg,.jpeg,.png"
                    />
                    <div className="flex-1 p-3 bg-gray-50 border border-r-0 border-gray-200 rounded-l-xl text-gray-600 truncate text-sm flex items-center">
                        {data.serviceImage ? data.serviceImage.name : 'No file chosen'}
                    </div>
                    <label
                        htmlFor="serviceImageInput"
                        className="px-4 bg-gray-200 text-gray-700 font-bold uppercase text-xs tracking-widest rounded-r-xl cursor-pointer hover:bg-gray-300 transition-colors flex items-center justify-center"
                    >
                        Browse
                    </label>
                </div>
            </div>

            {/* Availability Toggle */}
            <div className="md:col-span-2 flex items-center gap-3 pt-2">
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full border border-gray-300 cursor-pointer">
                    <input
                        type="checkbox"
                        name="alwaysAvailable"
                        checked={data.alwaysAvailable}
                        onChange={onUpdate}
                        className="absolute opacity-0 w-full h-full cursor-pointer z-10"
                    />
                    <div className={`block w-full h-full rounded-full transition-colors ${data.alwaysAvailable ? 'bg-homefix-primary' : 'bg-gray-200'}`}></div>
                    <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform ${data.alwaysAvailable ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </div>
                <span className="text-sm font-bold text-gray-700">Always Available</span>
            </div>
        </div>
    );
};
