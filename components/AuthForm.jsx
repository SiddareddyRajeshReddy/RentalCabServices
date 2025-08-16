import React, { useState, useCallback, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios'
function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        phone: ''
    });

    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        if (showSuccess) {
            const timer = setTimeout(() => {
                setShowSuccess(false);
            }, 4000);

            return () => clearTimeout(timer);
        }
    }, [showSuccess]);
    useEffect(() => {
        const calculateStrength = (password) => {
            let strength = 0;
            if (password.length >= 8) strength += 1;
            if (/[a-z]/.test(password)) strength += 1;
            if (/[A-Z]/.test(password)) strength += 1;
            if (/\d/.test(password)) strength += 1;
            if (/[^A-Za-z0-9]/.test(password)) strength += 1;
            return strength;
        };

        setPasswordStrength(calculateStrength(formData.password));
    }, [formData.password]);

    // Form validation
    const validateForm = useCallback(() => {
        const errors = {};

        // Email validation
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Please enter a valid email';
        }

        // Password validation
        if (!formData.password) {
            errors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            errors.password = 'Password must be at least 8 characters';
        }

        // Signup specific validations
        if (!isLogin) {
            if (!formData.name.trim()) {
                errors.name = 'Name is required';
            }

            if (formData.password !== formData.confirmPassword) {
                errors.confirmPassword = 'Passwords do not match';
            }

            if (passwordStrength < 3) {
                errors.password = 'Please choose a stronger password';
            }
        }

        return errors;
    }, [formData, isLogin, passwordStrength]);

    const handleToggle = useCallback(() => {
        setIsLogin(!isLogin);
        setFormData({
            email: '',
            password: '',
            confirmPassword: '',
            name: '',
            phone: ''
        });
        setFormErrors({});
        setShowSuccess(false);
    }, [isLogin]);

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
            if (!isLogin) {
                const response = await axios.post('http://localhost:3000/AuthSignUp', formData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            }
            else{
                const response = await axios.post('http://localhost:3000/AuthLogin', formData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            }
            console.log(response)
        } catch (error) {
            console.error('Auth error:', error);
            setFormErrors({ submit: 'Something went wrong. Please try again.' });
        } finally {
            setIsSubmitting(false);
            setFormData({
                email: '',
                password: '',
                confirmPassword: '',
                name: '',
                phone: ''
            });
            setShowSuccess(true)
        }
    }, [formData, validateForm, isLogin]);

    const handleGoogleAuth = useCallback(() => {
        console.log('Google Auth triggered');
    }, []);

    const getPasswordStrengthColor = () => {
        switch (passwordStrength) {
            case 0:
            case 1: return 'bg-red-500';
            case 2: return 'bg-yellow-500';
            case 3: return 'bg-blue-500';
            case 4:
            case 5: return 'bg-green-500';
            default: return 'bg-gray-300';
        }
    };

    const getPasswordStrengthText = () => {
        switch (passwordStrength) {
            case 0:
            case 1: return 'Weak';
            case 2: return 'Fair';
            case 3: return 'Good';
            case 4:
            case 5: return 'Strong';
            default: return '';
        }
    };

    return (
        <div className="w-full flex justify-center items-center py-12 bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 min-h-screen">
            <div className="w-full max-w-md mx-auto px-4">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

                    {/* Success Message */}
                    {showSuccess && (
                        <div className='relative'>
                            <div className="p-4 bg-green-50">
                                <div className="flex items-center gap-3 text-green-800">
                                    <CheckCircle className="w-5 h-5" />
                                    <span className="font-semibold">
                                        {isLogin ? 'Login successful!' : 'Account created successfully!'}
                                    </span>
                                </div>
                            </div>
                            <div className='sliding-animation bg-green-900 mar border-2 border-green-900 absolute bottom-0'>
                            </div>
                        </div>
                    )}

                    {/* Toggle Header */}
                    <div className="flex relative">
                        <button
                            onClick={() => !isLogin && handleToggle()}
                            className={`flex-1 py-5 text-center font-bold text-lg transition-all duration-500 relative z-10 ${isLogin
                                ? 'text-white'
                                : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => isLogin && handleToggle()}
                            className={`flex-1 py-5 text-center font-bold text-lg transition-all duration-500 relative z-10 ${!isLogin
                                ? 'text-white'
                                : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            Sign Up
                        </button>

                        {/* Sliding Background */}
                        <div
                            className={`absolute top-0 h-full w-1/2 bg-gradient-to-r from-red-500 to-red-600 transition-transform duration-500 ease-in-out ${isLogin ? 'transform translate-x-0' : 'transform translate-x-full'
                                }`}
                        />
                    </div>

                    {/* Form Container */}
                    <div className="p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">
                                {isLogin ? 'Welcome Back!' : 'Join Us Today!'}
                            </h2>
                            <p className="text-gray-600">
                                {isLogin
                                    ? 'Sign in to access your account'
                                    : 'Create your account to get started'
                                }
                            </p>
                        </div>

                        {/* Error Alert */}
                        {formErrors.submit && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                                <AlertCircle className="w-5 h-5 text-red-500" />
                                <span className="text-red-700">{formErrors.submit}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name Field (Signup only) */}
                            {!isLogin && (
                                <div className={`transition-all duration-500 ${!isLogin ? 'animate-fadeIn' : ''}`}>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Enter your full name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all text-gray-700 ${formErrors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                                }`}
                                        />
                                    </div>
                                    {formErrors.name && (
                                        <p className="mt-2 text-sm text-red-500 flex items-center gap-2">
                                            <AlertCircle className="w-4 h-4" />
                                            {formErrors.name}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Email Field */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all text-gray-700 ${formErrors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                            }`}
                                    />
                                </div>
                                {formErrors.email && (
                                    <p className="mt-2 text-sm text-red-500 flex items-center gap-2">
                                        <AlertCircle className="w-4 h-4" />
                                        {formErrors.email}
                                    </p>
                                )}
                            </div>

                            {/* Phone Field (Signup only) */}
                            {!isLogin && (
                                <div className={`transition-all duration-500 ${!isLogin ? 'animate-fadeIn' : ''}`}>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Phone Number (Optional)
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="Enter your phone number"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all text-gray-700"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Password Field */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className={`w-full pl-12 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all text-gray-700 ${formErrors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                            }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>

                                {/* Password Strength Indicator (Signup only) */}
                                {!isLogin && formData.password && (
                                    <div className="mt-2">
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                                                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                                                />
                                            </div>
                                            <span className="text-xs font-semibold text-gray-600">
                                                {getPasswordStrengthText()}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            Use 8+ characters with letters, numbers, and symbols
                                        </p>
                                    </div>
                                )}

                                {formErrors.password && (
                                    <p className="mt-2 text-sm text-red-500 flex items-center gap-2">
                                        <AlertCircle className="w-4 h-4" />
                                        {formErrors.password}
                                    </p>
                                )}
                            </div>

                            {/* Confirm Password Field (Signup only) */}
                            {!isLogin && (
                                <div className={`transition-all duration-500 ${!isLogin ? 'animate-fadeIn' : ''}`}>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            placeholder="Confirm your password"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            className={`w-full pl-12 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all text-gray-700 ${formErrors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                                }`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 transition-colors"
                                        >
                                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    {formErrors.confirmPassword && (
                                        <p className="mt-2 text-sm text-red-500 flex items-center gap-2">
                                            <AlertCircle className="w-4 h-4" />
                                            {formErrors.confirmPassword}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Remember Me (Login only) */}
                            {isLogin && (
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                            className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-400"
                                        />
                                        <span className="text-sm text-gray-600">Remember me</span>
                                    </label>
                                    <a href="#" className="text-sm text-red-500 hover:text-red-600 font-semibold">
                                        Forgot password?
                                    </a>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-4 px-6 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        {isLogin ? 'Signing In...' : 'Creating Account...'}
                                    </div>
                                ) : (
                                    isLogin ? 'Sign In' : 'Create Account'
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="mt-8">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-white text-gray-500 font-semibold">Or continue with </span>
                                </div>
                            </div>
                        </div>

                        {/* Google Auth Button */}
                        <button
                            onClick={handleGoogleAuth}
                            className="mt-6 w-full flex items-center justify-center gap-4 bg-white border-2 border-gray-300 rounded-xl py-4 px-6 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-semibold text-gray-700 shadow-md hover:shadow-lg"
                        >
                            <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                G
                            </div>
                            <span>Continue with Google</span>
                        </button>

                        {/* Terms and Conditions (Signup only) */}
                        {!isLogin && (
                            <p className="mt-6 text-xs text-gray-500 text-center leading-relaxed">
                                By creating an account, you agree to our{' '}
                                <a href="#" className="text-red-500 hover:text-red-600 font-semibold">Terms of Service</a>
                                {' '}and{' '}
                                <a href="#" className="text-red-500 hover:text-red-600 font-semibold">Privacy Policy</a>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthForm;