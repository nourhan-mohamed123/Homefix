import React from 'react';
import { motion } from 'framer-motion';
import { useProviderRegister } from '../features/provider-register/hooks/useProviderRegister';
import { BasicDetailsForm } from '../features/provider-register/components/BasicDetailsForm';
import { ServicesManager } from '../features/provider-register/components/ServicesManager';
import TabNavigation from '../components/provider-register/TabNavigation';
import FinalConfirmationModal from '../components/provider-register/FinalConfirmationModal';
import Logo from '../components/Logo';

export default function ProviderRegister() {
    const {
        formData,
        services,
        activeTab,
        isConfirmOpen,
        registerError,
        isSubmitting,
        setActiveTab,
        setIsConfirmOpen,
        setRegisterError,
        handleChange,
        handleServiceAreaChange,
        handleNext,
        handleBack,
        handleAddService,
        handleEditService,
        handleDeleteService,
        handleSkipForLater,
        handleSubmit,
        syncWithIntegromat
    } = useProviderRegister();

    return (
        <div className="min-h-screen bg-homefix-secondary flex items-center justify-center p-6 py-12 font-['Poppins']">
            <div className="w-full max-w-5xl bg-homefix-bg shadow-2xl overflow-hidden flex flex-col rounded-[2rem]">

                {/* Header Section */}
                <div className="bg-gradient-to-br from-homefix-bg to-gray-100 p-12 flex flex-col items-center justify-center min-h-[200px] relative">
                    <button
                        onClick={handleBack}
                        className="absolute top-10 left-10 text-homefix-text hover:scale-110 transition-transform flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </button>
                    <div className="mb-6 transform hover:scale-105 transition-transform duration-300">
                        <Logo className="h-20 w-auto" textClassName="hidden" />
                    </div>
                    <h1 className="text-6xl font-black tracking-tight text-center">
                        <span className="text-slate-900">Provider</span> <span className="text-blue-600">Sign Up</span>
                    </h1>
                </div>

                {/* Tab Navigation */}
                <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

                {/* Main Content Area */}
                <div className="bg-white p-8">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {activeTab === 'basic' ? (
                            <BasicDetailsForm
                                data={formData}
                                onChange={handleChange}
                                onServiceAreaChange={handleServiceAreaChange}
                                onNext={handleNext}
                            />
                        ) : (
                            <ServicesManager
                                services={services}
                                onAddService={handleAddService}
                                onEditService={handleEditService}
                                onDeleteService={handleDeleteService}
                                onSkipForLater={handleSkipForLater}
                                onSubmit={handleSubmit}
                            />
                        )}
                    </motion.div>

                    <div className="mt-6 pt-6 border-t border-gray-200 text-center space-y-2">
                        <p className="text-gray-600">
                            Already Have Account? <a href="/login" className="text-homefix-primary font-bold hover:underline">Sign In</a>
                        </p>
                        <p className="text-gray-600 mt-2">
                            Want to Sign Up as Customer? <a href="/customer-register" className="text-homefix-primary font-bold hover:underline">Click Here</a>
                        </p>
                    </div>
                </div>
            </div>

            {/* Modals outside the layout structure */}
            <FinalConfirmationModal
                isOpen={isConfirmOpen}
                formData={formData}
                onConfirm={syncWithIntegromat}
                onCancel={() => { setIsConfirmOpen(false); setRegisterError(''); }}
                error={registerError}
                isSubmitting={isSubmitting}
            />
        </div>
    );
}
