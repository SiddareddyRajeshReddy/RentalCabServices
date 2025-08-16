import React, { useState, useCallback, useEffect } from "react";
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Linkedin, Send, CheckCircle } from 'lucide-react';

function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [activeContact, setActiveContact] = useState(null);

    // Form validation
    const validateForm = useCallback(() => {
        const errors = {};
        
        if (!formData.name.trim()) errors.name = 'Name is required';
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
        }
        if (!formData.message.trim()) errors.message = 'Message is required';
        
        return errors;
    }, [formData]);

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    }, [formErrors]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        setIsSubmitting(true);
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            console.log('Form submitted:', formData);
            setShowSuccess(true);
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
            
            setTimeout(() => setShowSuccess(false), 5000);
        } catch (error) {
            console.error('Submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    }, [formData, validateForm]);

    // Contact info with interactive features
    const contactInfo = [
        {
            icon: <Mail className="w-6 h-6 text-red-400" />,
            label: 'Email',
            value: 'b230065@nitsikkim.ac.in',
            action: () => window.open('mailto:b230065@nitsikkim.ac.in'),
            description: 'Send us an email anytime'
        },
        {
            icon: <Phone className="w-6 h-6 text-red-400" />,
            label: 'Phone',
            value: '+91 8522840158',
            action: () => window.open('tel:+918522840158'),
            description: 'Call us during business hours'
        },
        {
            icon: <MapPin className="w-6 h-6 text-red-400" />,
            label: 'Location',
            value: 'National Institute of Technology Sikkim, South Sikkim, Sikkim',
            action: () => window.open('https://www.google.com/maps/place/National+Institute+Of+Technology+Sikkim/@27.2975355,88.3573037,17z'),
            description: 'Visit our office location'
        }
    ];

    const socialMedia = [
        { icon: <Instagram className="w-8 h-8" />, name: 'Instagram', color: 'hover:text-pink-500' },
        { icon: <Facebook className="w-8 h-8" />, name: 'Facebook', color: 'hover:text-blue-600' },
        { icon: <Twitter className="w-8 h-8" />, name: 'Twitter', color: 'hover:text-blue-400' },
        { icon: <Linkedin className="w-8 h-8" />, name: 'LinkedIn', color: 'hover:text-blue-700' }
    ];

    return (
        <div className="flex justify-center w-full py-16 px-4 bg-gradient-to-br from-gray-50 to-white">
            <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-12">
                {/* Contact Info Section */}
                <div className="w-full lg:w-1/2 space-y-8">
                    <div className="space-y-4">
                        <h4 className="text-[#FAB5B5] text-sm font-semibold tracking-wider uppercase">
                            GET IN TOUCH
                        </h4>
                        <h2 className="text-[#807878] text-4xl font-bold">
                            Contact Us
                        </h2>
                        <p className="text-[#C2BABA] text-lg leading-relaxed">
                            If you need consultation with us, you can write a message or call us. 
                            We will respond as quickly as possible to help you with your car rental needs.
                        </p>
                    </div>

                    {/* Contact Info Cards */}
                    <div className="space-y-4">
                        {contactInfo.map((contact, index) => (
                            <div
                                key={index}
                                className={`flex gap-4 items-start p-4 rounded-xl transition-all duration-300 cursor-pointer
                                    ${activeContact === index 
                                        ? 'bg-red-50 shadow-lg scale-105' 
                                        : 'hover:bg-gray-50 hover:shadow-md'
                                    }
                                `}
                                onMouseEnter={() => setActiveContact(index)}
                                onMouseLeave={() => setActiveContact(null)}
                                onClick={contact.action}
                            >
                                <div className="mt-1">
                                    {contact.icon}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-[#807878] mb-1">{contact.label}</h3>
                                    <p className="text-[#8C8484] font-medium mb-1">{contact.value}</p>
                                    <p className="text-xs text-gray-500">{contact.description}</p>
                                </div>
                                <div className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                    →
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Social Media */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-[#807878]">Follow Us</h3>
                        <div className="flex gap-4">
                            {socialMedia.map((social, index) => (
                                <button
                                    key={index}
                                    className={`p-3 rounded-full bg-white shadow-md transition-all duration-300 
                                        text-gray-600 hover:shadow-lg hover:scale-110 ${social.color}
                                    `}
                                    title={social.name}
                                >
                                    {social.icon}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Business Hours */}
                    <div className="p-6 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl">
                        <h3 className="font-semibold text-[#807878] mb-3">Business Hours</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Monday - Friday:</span>
                                <span className="font-medium">9:00 AM - 6:00 PM</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Saturday:</span>
                                <span className="font-medium">9:00 AM - 4:00 PM</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Sunday:</span>
                                <span className="font-medium">Closed</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form Section */}
                <div className="w-full lg:w-1/2">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <h3 className="text-2xl font-bold text-[#807878] mb-6 text-center">
                            Send us a Message
                        </h3>

                        {showSuccess && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <div>
                                    <h4 className="font-semibold text-green-800">Message Sent!</h4>
                                    <p className="text-green-700 text-sm">We'll get back to you within 24 hours.</p>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all
                                            ${formErrors.name ? 'border-red-500' : 'border-gray-300'}
                                        `}
                                        placeholder="Your full name"
                                    />
                                    {formErrors.name && (
                                        <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all"
                                        placeholder="Your phone number"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all
                                        ${formErrors.email ? 'border-red-500' : 'border-gray-300'}
                                    `}
                                    placeholder="your.email@example.com"
                                />
                                {formErrors.email && (
                                    <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Subject
                                </label>
                                <select
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all"
                                >
                                    <option value="">Select a subject</option>
                                    <option value="rental">Car Rental Inquiry</option>
                                    <option value="booking">Booking Assistance</option>
                                    <option value="support">Customer Support</option>
                                    <option value="feedback">Feedback</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Message *
                                </label>
                                <textarea
                                    name="message"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all resize-none
                                        ${formErrors.message ? 'border-red-500' : 'border-gray-300'}
                                    `}
                                    placeholder="Tell us how we can help you..."
                                />
                                {formErrors.message && (
                                    <p className="mt-1 text-sm text-red-500">{formErrors.message}</p>
                                )}
                                <p className="mt-1 text-xs text-gray-500">
                                    {formData.message.length}/500 characters
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-red-500 text-white py-4 px-6 rounded-lg hover:bg-red-600 
                                    transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl
                                    disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;