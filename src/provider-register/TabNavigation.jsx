import React from 'react';
import { motion } from 'framer-motion';
export default function TabNavigation({ activeTab, setActiveTab }) {
    const tabs = [
        { id: 'basic', label: 'Basic Provider Information' },
        { id: 'services', label: 'Services Information' }
    ];
    return (
        <div className="bg-white border-b border-slate-100 flex w-full relative" dir="ltr">
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 py-5 px-6 font-bold text-sm transition-all duration-300 relative uppercase tracking-wider ${
                            isActive 
                            ? 'text-homefix-primary' 
                            : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                        }`}
                    >
                        {tab.label}
                        
                        {isActive && (
                            <motion.div 
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-1 bg-homefix-primary rounded-t-full"
                                initial={false}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        )}
                    </button>
                );
            })}
        </div>
    );
}