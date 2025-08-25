import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Car, ArrowRight, ArrowLeft, FileText, CreditCard } from 'lucide-react';
import axios from 'axios';

const DriverRideRequestsComponent = () => {
    const navigate = useNavigate();
    const [isDriver, setIsDriver] = useState(false);
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const [formData, setFormData] = useState({
        carType: '',
        licenseNumber: '',
        idNumber: '',
    });
    const [loading, setLoading] = useState(true);

    // Validate user's driver status on component load
    useEffect(() => {
        const validateDriverStatus = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/"); // Redirect to login if no token exists
                return;
            }
            try {
                // Sending token in Authorization header
                const response = await axios.post("http://localhost:3000/driver/DriverValidate", {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
                if (response.data.success) {
                    setIsDriver(true);
                } else {
                    setIsDriver(false);
                }
            } catch (error) {
                console.error("Driver validation failed:", error);
                setIsDriver(false);
                // Handle token expiration or other auth errors
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem("token");
                    navigate("/");
                }
            } finally {
                setLoading(false);
            }
        };

        validateDriverStatus();
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        if (!formData.carType || !formData.licenseNumber || !formData.idNumber) {
            alert('Please fill in all required fields.');
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            alert("Authentication token not found. Please log in again.");
            navigate("/login");
            return;
        }
        
        try {
            const response = await axios.post("http://localhost:3000/driver/DriverRegistration", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            if (response.data.success) {
                setIsDriver(true);
                setShowRegistrationForm(false);
                setFormData({
                    carType: '',
                    licenseNumber: '',
                    idNumber: '',
                });
            } else {
                alert(response.data.message || "Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Registration submission failed:", error);
            alert("An error occurred during registration. Please try again.");
            if (error.response && error.response.status === 401) {
                localStorage.removeItem("token");
                navigate("/login");
            }
        }
    };

    const handleBackToWelcome = () => {
        setShowRegistrationForm(false);
    };

    if (loading) {
        return <div className="text-center p-8">Loading...</div>;
    }

    if (showRegistrationForm) {
        return (
            <div className="mx-auto p-4 w-[60%]">
                <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-red-100 p-8">
                    <button
                        onClick={handleBackToWelcome}
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span className="text-sm">Back</span>
                    </button>

                    <div className="text-center mb-6">
                        <div className="text-4xl mb-3">🚗</div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Driver Registration</h2>
                        <p className="text-gray-600 text-sm">Fill in your details to become a driver</p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Car className="h-4 w-4 inline mr-2" />
                                Car Type
                            </label>
                            <select
                                name="carType"
                                value={formData.carType}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                            >
                                <option value="">Select car type</option>
                                <option value="sedan">Sedan</option>
                                <option value="suv">SUV</option>
                                <option value="hatchback">Hatchback</option>
                                <option value="compact">Compact</option>
                                <option value="luxury">Luxury</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <FileText className="h-4 w-4 inline mr-2" />
                                License Number
                            </label>
                            <input
                                type="text"
                                name="licenseNumber"
                                value={formData.licenseNumber}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                placeholder="Enter license number"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <CreditCard className="h-4 w-4 inline mr-2" />
                                ID Number
                            </label>
                            <input
                                type="text"
                                name="idNumber"
                                value={formData.idNumber}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                placeholder="Enter ID number"
                            />
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 mt-6"
                        >
                            <span>Complete Registration</span>
                            <ArrowRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!isDriver) {
        return (
            <div className="mx-auto p-4">
                <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-red-100 p-8 text-center">
                    <div className="text-6xl mb-4">🚗</div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">Become a Driver</h2>
                    <p className="text-gray-600 mb-6">
                        You're not registered as a driver yet. Join our driver community and start earning!
                    </p>

                    <div className="flex items-center justify-center space-x-4 mb-6">
                        <div className="flex items-center space-x-2 text-green-600">
                            <Car className="h-5 w-5" />
                            <span className="text-sm font-medium">Flexible Schedule</span>
                        </div>
                        <div className="flex items-center space-x-2 text-green-600">
                            <User className="h-5 w-5" />
                            <span className="text-sm font-medium">Good Earnings</span>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowRegistrationForm(true)}
                        className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 mx-auto"
                    >
                        <span>Register as Driver</span>
                        <ArrowRight className="h-5 w-5" />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto p-4">
            <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-red-100 p-6">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="text-3xl">🚗</div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">Driver Dashboard</h2>
                        <p className="text-gray-600 text-sm">Welcome to your driver dashboard!</p>
                    </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 text-green-700">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="font-medium">Registration Complete!</span>
                    </div>
                    <p className="text-green-600 text-sm mt-1">
                        You're now registered as a driver. Start accepting ride requests!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DriverRideRequestsComponent;