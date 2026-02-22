import React from 'react';
import { Search, Clock, CheckCircle } from 'lucide-react';
export default function HowToBook() {
    const steps = [
        {
            icon: <Search className="w-7 h-7" />,
            title: 'Choose a Service',
            description: 'Select from our professional home services or create a custom job tailored to your needs.'
        },
        {
            icon: <Clock className="w-7 h-7" />,
            title: 'Pick a Time',
            description: 'Choose a date and time that works best for your schedule. We work around you.'
        },
        {
            icon: <CheckCircle className="w-7 h-7" />,
            title: 'Book & Done',
            description: 'Confirm your booking with secure payment and we\'ll handle the rest professionally.'
        }
    ];
    return (
        <section id="how-it-works" className="px-6 py-24 md:px-20 lg:px-40 bg-white relative overflow-hidden font-['Poppins']">
            <div className="absolute top-0 right-0 w-80 h-80 bg-homefix-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-homefix-primary/5 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
            <div className="relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-black text-homefix-text mb-5 tracking-tight">
                        Book your service in{' '}
                        <span className="text-homefix-primary">60 seconds</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
                        Quick &amp; easy care without the hassle, phone calls, or guesswork.
                    </p>
                </div>
                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                    <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-[2px] border-t-2 border-dashed border-homefix-secondary pointer-events-none"></div>
                    {steps.map((step, index) => (
                        <div key={index} className="relative flex flex-col items-center text-center group">
                            <div className="absolute -top-4 -right-4 text-7xl font-black text-homefix-secondary/60 select-none group-hover:text-homefix-accent/10 transition-colors duration-500">
                                0{index + 1}
                            </div>
                            <div className="relative z-10 inline-flex items-center justify-center w-24 h-24 rounded-[2rem] bg-homefix-bg border border-gray-100 text-homefix-primary mb-8 group-hover:bg-homefix-primary group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:shadow-homefix-primary/20 group-hover:-translate-y-2">
                                {step.icon}
                            </div>
                            <div className="w-2 h-2 rounded-full bg-homefix-accent mb-4 group-hover:scale-125 transition-transform duration-300"></div>
                            <h3 className="text-xl font-black text-homefix-text mb-3">
                                {step.title}
                            </h3>
                            <p className="text-gray-400 leading-relaxed text-sm px-2 font-medium">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}