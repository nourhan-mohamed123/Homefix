import React from 'react';
import { ArrowRight, Star } from 'lucide-react';

export default function PopularServices() {
    const services = [
        {
            title: 'House Cleaning',
            description: 'Professional cleaning services for your home',
            price: 'Starting $50',
            rating: '4.9',
            image: 'https://www.patanjaliayurved.net/assets/home_slider/1737889498cleaning.webp'
        },
        {
            title: 'Plumbing',
            description: 'Expert plumbers for all your needs',
            price: 'Starting $75',
            rating: '4.8',
            image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=300&fit=crop'
        },
        {
            title: 'Electrical',
            description: 'Licensed electricians ready to help',
            price: 'Starting $80',
            rating: '4.9',
            image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=300&fit=crop'
        },
        {
            title: 'Moving',
            description: 'Reliable movers for stress-free relocation',
            price: 'Starting $120',
            rating: '4.7',
            image: 'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=400&h=300&fit=crop'
        },
        {
            title: 'AC Repair',
            description: 'Fast AC repair and maintenance',
            price: 'Starting $90',
            rating: '4.8',
            image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400&h=300&fit=crop'
        },
        {
            title: 'Furniture Assembly',
            description: 'Professional furniture assembly service',
            price: 'Starting $60',
            rating: '4.9',
            image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=300&fit=crop'
        }
    ];

    return (
        <section className="bg-[#F8F9FA] px-6 py-20 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto mb-16 flex flex-col items-start gap-4 text-left">
                <h2 className="text-[#1e3a3a] text-3xl md:text-5xl font-bold tracking-tight">
                    Popular Services
                </h2>

                <p className="text-gray-500 text-lg md:text-xl font-light">
                    Upfront prices on 50,000+ tasks. Book top-rated professionals in seconds.
                </p>
                <button className="text-[#3b82f6] font-bold flex items-center gap-2 hover:gap-3 transition-all mt-2">
                    View all services <ArrowRight className="w-5 h-5" />
                </button>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 group"
                    >
                        <div className="relative h-64 overflow-hidden">
                            <img
                                src={service.image}
                                alt={service.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                <span className="text-sm font-bold text-[#1e3a3a]">{service.rating}</span>
                            </div>
                        </div>

                        <div className="p-8">
                            <h3 className="text-2xl font-bold text-[#1e3a3a] mb-2 group-hover:text-[#3b82f6] transition-colors">
                                {service.title}
                            </h3>
                            <p className="text-gray-500 mb-6 line-clamp-2 font-light">
                                {service.description}
                            </p>

                            <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">Price</p>
                                    <span className="text-[#1e3a3a] text-xl font-black">
                                        {service.price.split(' ')[1]}
                                    </span>
                                </div>
                                <button className="bg-homefix-text text-white px-8 py-3.5 rounded-2xl font-bold text-sm uppercase tracking-wider hover:bg-homefix-primary transition-all duration-300 active:scale-95 shadow-xl shadow-homefix-text/10 flex items-center gap-2 group">
                                    Book Now
                             </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}