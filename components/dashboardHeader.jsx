import React, { useState, useEffect } from "react"
import { Search, Bell, User, Menu, Settings, LogOut, ChevronDown } from 'lucide-react';

const ThemedHeader = () => {
    const [menuOpener, setMenuOpener] = useState(false)
    const [notifyOpener, setNotifyOpener] = useState(false)
    const [scrollY, setScrollY] = useState(0)
    const [dashboardMode, setDashboardMode] = useState('user')

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const toggleNotifications = () => {
        setNotifyOpener(!notifyOpener)
        setMenuOpener(false)
    }

    const toggleMenu = () => {
        setMenuOpener(!menuOpener)
        setNotifyOpener(false)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 overflow-hidden">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-20 left-10 w-20 h-20 bg-red-200 rounded-full animate-bounce opacity-10"></div>
                <div className="absolute bottom-32 right-16 w-16 h-16 bg-pink-200 rounded-full animate-pulse opacity-15"></div>
                <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-orange-200 rounded-full animate-ping opacity-10"></div>
                <div className="absolute bottom-1/4 left-1/3 w-14 h-14 bg-red-300 rounded-full animate-bounce opacity-10" style={{animationDelay: '1s'}}></div>
            </div>

            {/* Header */}
            <header className={`border-gray-200 px-4 py-3 fixed top-0 w-full z-50 transition-all duration-300 ${
                scrollY > 50 ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/80 backdrop-blur-sm'
            }`}>
                <div className="flex items-center justify-between">
                    {/* Left Section - Logo & Mobile Menu */}
                    <div className="flex items-center space-x-4">
                        {/* Mobile Menu Button */}
                        <button 
                            className="md:hidden p-2 rounded-lg hover:bg-red-50 transition-colors"
                        >
                            <Menu className="h-5 w-5 text-gray-600" />
                        </button>

                        {/* Logo */}
                        <div className="flex items-center space-x-2">
                            <div className="text-3xl font-bold text-red-500">
                                RCs... 🚕
                            </div>
                            <div className="hidden sm:block h-6 w-px bg-gray-300 mx-2"></div>
                            <h1 className="text-xl font-semibold text-gray-800 w-[200px] hidden sm:block">
                                {dashboardMode === 'driver' ? 'Driver Dashboard' : 'My Dashboard'}
                            </h1>
                        </div>
                    </div>

                    {/* Center Section - Mode Toggle */}
                    <div className="relative hidden md:flex bg-red-100 rounded-full p-1">
                        <button
                            onClick={() => setDashboardMode('user')}
                            className={`z-1 px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
                                dashboardMode === 'user' ? ' text-white' : 'text-red-600'
                            }`}
                        >
                            🧑‍💼 Rider Mode
                        </button>
                        <button
                            onClick={() => setDashboardMode('driver')}
                            className={`z-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
                                dashboardMode === 'driver' ? ' text-white' : 'text-red-600'
                            }`}
                        >
                            🚗 Driver Mode
                        </button>
                        <div className={`transition-transform duration-500 bg-red-500 w-1/2 h-full top-0 left-0 rounded-full absolute ${dashboardMode === 'user' ? 'transform translate-x-0' : 'transform translate-x-full'}`}></div>
                    </div>

                    {/* Right Section - Actions */}
                    <div className="flex items-center space-x-3">
                        {/* Mobile Search Button */}
                        <button className="md:hidden p-2 rounded-lg hover:bg-red-50 transition-colors">
                            <Search className="h-5 w-5 text-gray-600" />
                        </button>

                        {/* Notifications */}
                        <div className="relative">
                            <button 
                                onClick={toggleNotifications} 
                                className="relative p-2 rounded-lg hover:bg-red-50 transition-colors"
                            >
                                <Bell className="h-5 w-5 text-gray-600" />
                                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                    2
                                </span>
                            </button>

                            {/* Notifications Dropdown */}
                            {notifyOpener && (
                                <div className="absolute right-0 mt-2 w-80 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-red-100 z-50">
                                    <div className="p-4 border-b border-gray-100">
                                        <h3 className="font-semibold text-gray-800">Notifications</h3>
                                    </div>
                                    <div className="max-h-64 overflow-y-auto">
                                        <div className="p-3 border-b border-gray-50 hover:bg-red-50 bg-red-50">
                                            <p className="text-sm text-gray-800">
                                                {dashboardMode === 'driver' ? 'New ride request received' : 'Your ride has been confirmed'}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">5 minutes ago</p>
                                        </div>
                                        <div className="p-3 border-b border-gray-50 hover:bg-red-50">
                                            <p className="text-sm text-gray-800">
                                                {dashboardMode === 'driver' ? 'Payment received ₹1,200' : 'Driver is arriving in 5 minutes'}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                                        </div>
                                    </div>
                                    <div className="p-3 text-center border-t border-gray-100">
                                        <button className="text-sm text-red-500 hover:text-red-600 font-semibold">
                                            View all notifications
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button 
                                onClick={toggleMenu} 
                                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-red-50 transition-colors"
                            >
                                <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center">
                                    <User className="h-4 w-4 text-white" />
                                </div>
                                <span className="hidden sm:block text-sm font-medium text-gray-700">
                                    John Doe
                                </span>
                                <ChevronDown className="h-4 w-4 text-gray-500" />
                            </button>

                            {/* Profile Dropdown */}
                            {menuOpener && (
                                <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-red-100 z-50">
                                    <div className="p-3 border-b border-gray-100">
                                        <p className="font-medium text-gray-800">John Doe</p>
                                        <p className="text-sm text-gray-500">john@example.com</p>
                                        <p className="text-xs text-red-600 font-semibold">
                                            {dashboardMode === 'driver' ? '⭐ 4.9 Driver Rating' : '🎯 Premium Member'}
                                        </p>
                                    </div>
                                    <div className="py-2">
                                        <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-red-50">
                                            <User className="h-4 w-4 mr-3" />
                                            Profile
                                        </button>
                                        <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-red-50">
                                            <Settings className="h-4 w-4 mr-3" />
                                            Settings
                                        </button>
                                        <hr className="my-2" />
                                        <button className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50">
                                            <LogOut className="h-4 w-4 mr-3" />
                                            Sign out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Mode Toggle */}
                <div className="md:hidden mt-3 flex bg-red-100 rounded-full p-1">
                    <button
                        onClick={() => setDashboardMode('user')}
                        className={`flex-1 py-2 rounded-full text-sm font-semibold transition-colors ${
                            dashboardMode === 'user' ? 'bg-red-500 text-white' : 'text-red-600'
                        }`}
                    >
                        🧑‍💼 Rider
                    </button>
                    <button
                        onClick={() => setDashboardMode('driver')}
                        className={`flex-1 py-2 rounded-full text-sm font-semibold transition-colors ${
                            dashboardMode === 'driver' ? 'bg-red-500 text-white' : 'text-red-600'
                        }`}
                    >
                        🚗 Driver
                    </button>
                </div>
            </header>
            {/* Click outside to close dropdowns */}
            {(menuOpener || notifyOpener) && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => {
                        setMenuOpener(false)
                        setNotifyOpener(false)
                    }}
                />
            )}
        </div>
    )
}

export default ThemedHeader