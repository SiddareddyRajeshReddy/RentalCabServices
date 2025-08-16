import React, { useState, useEffect, useCallback } from "react";
import { Menu, X, ChevronDown, Star, Play, ArrowRight, Calendar, MapPin, Users } from 'lucide-react';
import AuthForm from "./AuthForm";
import ChooseUs from "./chooseUs";
import ContactUs from "./contact";
import Footer from "./footer";

const Home = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [selectedCarType, setSelectedCarType] = useState('economy');

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }, [isMobileMenuOpen]);

    const navigationItems = [
        { name: 'Home', href: '#home', active: true },
        { name: 'About', href: '#about' },
        { name: 'Cars', href: '#cars', dropdown: ['Economy', 'Premium', 'Luxury', 'SUV'] },
        { name: 'Services', href: '#services' },
        { name: 'Contact', href: '#contact' }
    ];

    const carTypes = [
        { id: 'economy', name: 'Economy', price: '₹1,200/day', features: ['AC', 'Manual', '4 Seater'] },
        { id: 'premium', name: 'Premium', price: '₹2,500/day', features: ['AC', 'Automatic', '5 Seater', 'GPS'] },
        { id: 'luxury', name: 'Luxury', price: '₹4,000/day', features: ['AC', 'Automatic', '5 Seater', 'GPS', 'Leather Seats'] },
        { id: 'suv', name: 'SUV', price: '₹3,200/day', features: ['AC', 'Manual/Auto', '7 Seater', 'GPS', '4WD'] }
    ];
    return (
        <>
            <div className="w-full min-h-screen relative">
                {/* Header/Navigation */}
                <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
                    scrollY > 50 ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
                }`}>
                    <nav className="max-w-7xl mx-auto px-4 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            {/* Logo */}
                            <div className="text-3xl font-bold text-red-500">
                                RCs... 🚕
                            </div>

                            {/* Desktop Navigation */}
                            <div className="hidden md:flex items-center space-x-8">
                                {navigationItems.map((item, index) => (
                                    <div key={index} className="relative group">
                                        <a 
                                            href={item.href}
                                            className={`flex items-center gap-1 font-semibold transition-colors ${
                                                item.active 
                                                    ? 'text-red-500' 
                                                    : scrollY > 50 ? 'text-gray-700 hover:text-red-500' : 'text-gray-600 hover:text-red-500'
                                            }`}
                                        >
                                            {item.name}
                                            {item.dropdown && <ChevronDown className="w-4 h-4" />}
                                        </a>
                                        
                                        {/* Dropdown */}
                                        {item.dropdown && (
                                            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                                {item.dropdown.map((dropItem, dropIndex) => (
                                                    <a
                                                        key={dropIndex}
                                                        href={`#${dropItem.toLowerCase()}`}
                                                        className="block px-4 py-3 text-gray-700 hover:text-red-500 hover:bg-red-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                                                    >
                                                        {dropItem}
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* CTA Button */}
                            <button 
                                onClick={() => setShowBookingForm(true)}
                                className="hidden md:block bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors font-semibold"
                            >
                                Book Now
                            </button>

                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={toggleMobileMenu}
                                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>

                        {/* Mobile Navigation */}
                        {isMobileMenuOpen && (
                            <div className="md:hidden bg-white border-t shadow-lg">
                                <div className="px-4 py-6 space-y-4">
                                    {navigationItems.map((item, index) => (
                                        <a
                                            key={index}
                                            href={item.href}
                                            className="block py-2 text-gray-700 hover:text-red-500 font-semibold transition-colors"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                    <button 
                                        onClick={() => {
                                            setShowBookingForm(true);
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors font-semibold"
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        )}
                    </nav>
                </header>

                {/* Hero Section */}
                <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 overflow-hidden">
                    {/* Animated Background Elements */}
                    <div className="absolute inset-0">
                        <div className="absolute top-20 left-10 w-20 h-20 bg-red-200 rounded-full animate-bounce opacity-20"></div>
                        <div className="absolute bottom-32 right-16 w-16 h-16 bg-pink-200 rounded-full animate-pulse opacity-30"></div>
                        <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-orange-200 rounded-full animate-ping opacity-25"></div>
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 pt-20">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
                            
                            {/* Left Content */}
                            <div className="text-center lg:text-left space-y-8">
                                <div className="space-y-6">
                                    <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold">
                                        <Star className="w-4 h-4" />
                                        #1 Car Rental in Sikkim
                                    </div>
                                    
                                    <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                                        We Have Prepared a 
                                        <span className="text-red-500 block">Perfect Car</span>
                                        For Your Trip
                                    </h1>
                                    
                                    <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                                        Experience premium car rentals with guaranteed safety, professional service, 
                                        and 24/7 support. Your journey starts here.
                                    </p>
                                </div>

                                {/* CTA Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button 
                                        onClick={() => setShowBookingForm(true)}
                                        className="bg-red-500 text-white px-8 py-4 rounded-xl hover:bg-red-600 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                                    >
                                        Book Your Car
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                    
                                    <button className="border-2 border-red-500 text-red-500 px-8 py-4 rounded-xl hover:bg-red-50 transition-all duration-300 font-bold text-lg flex items-center justify-center gap-2">
                                        <Play className="w-5 h-5" />
                                        Watch Demo
                                    </button>
                                </div>
                            </div>

                            {/* Right Content - Car Image and Features */}
                            <div className="relative">
                                {/* Car Image */}
                                <div className="relative z-10">
                                    <img 
                                        src="./car.png" 
                                        alt="Premium Car" 
                                        className="w-full max-w-2xl mx-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                                    />
                                    
                                    {/* Floating Feature Cards */}
                                    <div className="absolute top-4 -left-4 bg-white rounded-xl p-4 shadow-xl animate-bounce">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                                ✓
                                            </div>
                                            <div>
                                                <div className="font-bold text-sm">Safety First</div>
                                                <div className="text-xs text-gray-600">100% Guaranteed</div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="absolute bottom-8 -right-4 bg-white rounded-xl p-4 shadow-xl animate-pulse">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                                📍
                                            </div>
                                            <div>
                                                <div className="font-bold text-sm">Live Tracking</div>
                                                <div className="text-xs text-gray-600">24/7 Monitoring</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Quick Booking Modal */}
                {showBookingForm && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold text-gray-800">Quick Booking</h3>
                                <button 
                                    onClick={() => setShowBookingForm(false)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        <MapPin className="inline w-4 h-4 mr-1" />
                                        Pickup Location
                                    </label>
                                    <input 
                                        type="text" 
                                        placeholder="Enter pickup location"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent"
                                    />
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            <Calendar className="inline w-4 h-4 mr-1" />
                                            Pickup Date
                                        </label>
                                        <input 
                                            type="date" 
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Return Date</label>
                                        <input 
                                            type="date" 
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        <Users className="inline w-4 h-4 mr-1" />
                                        Car Type
                                    </label>
                                    <select 
                                        value={selectedCarType}
                                        onChange={(e) => setSelectedCarType(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent"
                                    >
                                        {carTypes.map(car => (
                                            <option key={car.id} value={car.id}>
                                                {car.name} - {car.price}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-gray-800 mb-2">Selected Car Features:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {carTypes.find(car => car.id === selectedCarType)?.features.map((feature, index) => (
                                            <span key={index} className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                
                                <button 
                                    type="submit"
                                    className="w-full bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 transition-colors font-bold text-lg"
                                >
                                    Book Now
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Main Content Sections */}
                <div>
                    <AuthForm />
                    <ChooseUs />
                    <ContactUs />
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default Home;