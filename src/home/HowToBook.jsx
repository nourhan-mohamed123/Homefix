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
        <section id="how-it-works" className="px-6 py-24 md:px-20 lg:px-40 bg-white relative overflow-hidden">
            <div className="text-center mb-20">
                <h2 className="text-3xl md:text-5xl font-extrabold text-homefix-text mb-6 tracking-tight">
                    Book your service in <span className="text-homefix-primary">60 seconds</span>
                </h2>
                <p className="text-homefix-text/60 text-lg max-w-2xl mx-auto font-medium">
                    Quick & easy care without the hassle, phone calls, or guesswork.
                </p>
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">

                <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[2px] bg-dashed-line border-t-2 border-dashed border-homefix-secondary"></div>

                {steps.map((step, index) => (
                    <div key={index} className="relative flex flex-col items-center text-center group">
                        <div className="absolute -top-4 -right-4 text-6xl font-black text-homefix-secondary opacity-20 group-hover:opacity-40 transition-opacity">
                            0{index + 1}
                        </div>

                        <div className="relative z-10 inline-flex items-center justify-center w-24 h-24 rounded-[2rem] bg-homefix-secondary/30 text-homefix-primary mb-8 group-hover:bg-homefix-primary group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:shadow-homefix-primary/20 group-hover:-translate-y-2">
                            {step.icon}
                        </div>

                        <h3 className="text-2xl font-bold text-homefix-text mb-4">
                            {step.title}
                        </h3>
                        <p className="text-homefix-text/60 leading-relaxed text-sm md:text-base px-4">
                            {step.description}
                        </p>
                    </div>
                ))}
            </div>


        </section>
    );
}