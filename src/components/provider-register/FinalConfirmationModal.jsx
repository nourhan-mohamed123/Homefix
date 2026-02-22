import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ShieldCheck, Edit3, ArrowRight, X } from 'lucide-react';
export default function FinalConfirmationModal({ isOpen, formData, onConfirm, onCancel, error, isSubmitting }) {
    const dataPoints = [
        { label: 'Full Name', value: formData.name, icon: <Check className="w-3 h-3 text-emerald-500" /> },
        { label: 'Profession', value: formData.profession, icon: <Check className="w-3 h-3 text-emerald-500" /> },
        { label: 'Hourly Rate', value: `$${formData.hourlyRate || '0'} / hr`, icon: <Check className="w-3 h-3 text-emerald-500" /> },
        { label: 'Email Address', value: formData.email, icon: <Check className="w-3 h-3 text-emerald-500" /> },
    ];
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" dir="ltr">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onCancel}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden"
                    >
                        <button
                            onClick={onCancel}
                            className="absolute top-8 right-8 p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <div className="p-10">
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-50 rounded-full mb-4">
                                    <ShieldCheck className="w-10 h-10 text-emerald-500" />
                                </div>
                                <h2 className="text-3xl font-black text-slate-800 tracking-tight">Review Details</h2>
                                <p className="text-slate-400 font-medium mt-1">Double-check before we finalize</p>
                            </div>

                        {error && (
                                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                                    {error}
                                </div>
                            )}
                            <div className="grid grid-cols-1 gap-3 mb-10">
                                {dataPoints.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
                                        <div className="text-left">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">{item.label}</p>
                                            <p className="text-sm font-bold text-slate-700">{item.value || 'Not provided'}</p>
                                        </div>
                                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                                            {item.icon}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-3">
                                <button
                                    onClick={onConfirm}
                                    disabled={isSubmitting}
                                    className="w-full bg-slate-900 hover:bg-homefix-primary text-white font-black py-5 px-6 rounded-2xl transition-all duration-300 shadow-xl shadow-slate-200 flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Creating Account...' : 'CONFIRM & COMPLETE'}
                                    <ArrowRight className="w-5 h-5" />
                                </button>

                                <button
                                    onClick={onCancel}
                                    className="w-full flex items-center justify-center gap-2 py-4 text-slate-400 font-bold hover:text-slate-600 transition-colors"
                                >
                                    <Edit3 className="w-4 h-4" />
                                    Wait, let me edit
                                </button>
                            </div>
                            <div className="mt-8 pt-6 border-t border-slate-50 text-center text-center">
                                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest leading-relaxed">
                                    By confirming, you agree to our <br />
                                    <span className="text-homefix-primary underline cursor-pointer">Terms & Partner Agreement</span>
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}