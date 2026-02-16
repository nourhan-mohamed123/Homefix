import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Clock } from 'lucide-react';

export default function TimeSlotsModal({ isOpen, day, existingSlots, onClose, onSave }) {
    const [timeSlots, setTimeSlots] = useState([]);

    useEffect(() => {
        if (isOpen) {
            if (existingSlots && existingSlots.length > 0) {
                setTimeSlots(existingSlots);
            } else {
                setTimeSlots([{ from: '09:00', to: '17:00' }]);
            }
        }
    }, [isOpen, existingSlots]);

    const handleAddSlot = () => {
        setTimeSlots([...timeSlots, { from: '09:00', to: '17:00' }]);
    };

    const handleRemoveSlot = (index) => {
        setTimeSlots(timeSlots.filter((_, i) => i !== index));
    };

    const handleSlotChange = (index, field, value) => {
        const newSlots = [...timeSlots];
        newSlots[index][field] = value;
        setTimeSlots(newSlots);
    };

    const handleSave = () => {
        onSave(day, timeSlots);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" dir="ltr">
                    {/* Backdrop */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative bg-white w-full max-w-md rounded-2xl shadow-premium overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-white px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-homefix-primary/10 rounded-lg">
                                    <Clock className="w-5 h-5 text-homefix-primary" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-800 leading-none">
                                        Time Slots
                                    </h3>
                                    <p className="text-sm text-slate-500 mt-1 uppercase tracking-wider font-semibold">
                                        {day}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-slate-100 rounded-full transition-all text-slate-400 hover:text-slate-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                            <div className="space-y-4">
                                {timeSlots.map((slot, index) => (
                                    <motion.div 
                                        layout
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        key={index} 
                                        className="group flex items-end gap-3 p-4 bg-slate-50 rounded-xl border border-transparent hover:border-homefix-accent/30 transition-all"
                                    >
                                        <div className="flex-1 space-y-1.5">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-tighter ml-1">
                                                From
                                            </label>
                                            <input
                                                type="time"
                                                value={slot.from}
                                                onChange={(e) => handleSlotChange(index, 'from', e.target.value)}
                                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-homefix-accent/20 focus:border-homefix-accent outline-none transition-all text-slate-700 font-medium"
                                            />
                                        </div>

                                        <div className="flex-1 space-y-1.5">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-tighter ml-1">
                                                To
                                            </label>
                                            <input
                                                type="time"
                                                value={slot.to}
                                                onChange={(e) => handleSlotChange(index, 'to', e.target.value)}
                                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-homefix-accent/20 focus:border-homefix-accent outline-none transition-all text-slate-700 font-medium"
                                            />
                                        </div>

                                        {timeSlots.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveSlot(index)}
                                                className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all mb-0.5"
                                                title="Remove Slot"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        )}
                                    </motion.div>
                                ))}
                            </div>

                            {/* Add Slot Button */}
                            <button
                                type="button"
                                onClick={handleAddSlot}
                                className="mt-6 w-full py-3 flex items-center justify-center gap-2 text-homefix-primary font-bold bg-homefix-primary/5 hover:bg-homefix-primary/10 rounded-xl transition-all border-2 border-dashed border-homefix-primary/20 hover:border-homefix-primary/40"
                            >
                                <Plus className="w-4 h-4" />
                                Add Another Slot
                            </button>
                        </div>

                        {/* Footer */}
                        <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-3">
                            <button
                                onClick={onClose}
                                className="flex-1 px-6 py-3 text-slate-600 font-bold hover:bg-slate-200 rounded-xl transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="flex-[1.5] px-6 py-3 bg-homefix-primary text-white font-bold rounded-xl hover:bg-homefix-accent transition-all shadow-lg shadow-homefix-primary/20 active:scale-[0.98]"
                            >
                                Save Changes
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}