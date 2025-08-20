import React, { useState, useEffect } from "react"
import { Search, Bell, User, Menu, Settings, LogOut, ChevronDown, Home, BarChart3, Users, Calendar, FileText, ShoppingCart, TrendingUp, Activity, DollarSign, Eye, MessageSquare, Star, MapPin, Car, Plus, Minus, Clock, Route, CreditCard, Phone } from 'lucide-react';
import Footer from "./footer";
const Dashboard = () => {
    const [menuOpener, setMenuOpener] = useState(false)
    const [notifyOpener, setNotifyOpener] = useState(false)
    const [scrollY, setScrollY] = useState(0)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [dashboardMode, setDashboardMode] = useState('user') // 'user' or 'driver'

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

    const userSidebarItems = [
        { icon: Home, label: 'Dashboard', active: dashboardMode === 'user' },
        { icon: Car, label: 'Book a Ride' },
        { icon: Clock, label: 'My Bookings' },
        { icon: Star, label: 'Favorites' },
        { icon: CreditCard, label: 'Payment History' },
        { icon: User, label: 'Profile' },
        { icon: Settings, label: 'Settings' },
    ]

    const driverSidebarItems = [
        { icon: Home, label: 'Driver Hub', active: dashboardMode === 'driver' },
        { icon: Plus, label: 'Add My Car' },
        { icon: Car, label: 'My Fleet' },
        { icon: Route, label: 'Active Rides' },
        { icon: DollarSign, label: 'Earnings' },
        { icon: BarChart3, label: 'Analytics' },
        { icon: Settings, label: 'Settings' },
    ]

    const userStats = [
        { title: 'Rides Completed', value: '24', change: '+3 this month', icon: Car, color: 'text-green-600', bgColor: 'bg-green-100' },
        { title: 'Money Saved', value: '₹3,200', change: 'vs taxi fares', icon: DollarSign, color: 'text-blue-600', bgColor: 'bg-blue-100' },
        { title: 'Favorite Drivers', value: '8', change: '+2 recently', icon: Star, color: 'text-orange-600', bgColor: 'bg-orange-100' },
        { title: 'Carbon Saved', value: '12kg', change: 'CO2 reduced', icon: Activity, color: 'text-green-600', bgColor: 'bg-green-100' },
    ]

    const driverStats = [
        { title: 'Total Earnings', value: '₹15,420', change: '+8.2% this week', icon: DollarSign, color: 'text-green-600', bgColor: 'bg-green-100' },
        { title: 'Active Cars', value: '3', change: '2 available now', icon: Car, color: 'text-red-500', bgColor: 'bg-red-100' },
        { title: 'Completed Rides', value: '89', change: '+12 this week', icon: Route, color: 'text-blue-600', bgColor: 'bg-blue-100' },
        { title: 'Driver Rating', value: '4.9', change: '★★★★★', icon: Star, color: 'text-orange-600', bgColor: 'bg-orange-100' },
    ]

    const recentUserActivity = [
        { driver: 'Rajesh Kumar', car: 'Maruti Swift', route: 'Siliguri → Gangtok', time: '2 hours ago', status: 'Completed', avatar: 'RK' },
        { driver: 'Priya Singh', car: 'Honda City', route: 'Darjeeling → Kalimpong', time: '1 day ago', status: 'Completed', avatar: 'PS' },
        { driver: 'Amit Sharma', car: 'Toyota Innova', route: 'Siliguri → Darjeeling', time: '3 days ago', status: 'Completed', avatar: 'AS' },
        { driver: 'Neha Gupta', car: 'Hyundai i20', route: 'Gangtok → Siliguri', time: '1 week ago', status: 'Completed', avatar: 'NG' },
    ]

    const recentDriverActivity = [
        { customer: 'Rohit Das', pickup: 'Siliguri', dropoff: 'Gangtok', earnings: '₹1,200', time: '2 hours ago', status: 'Completed', avatar: 'RD' },
        { customer: 'Anita Roy', pickup: 'Darjeeling', dropoff: 'Kalimpong', earnings: '₹800', time: '5 hours ago', status: 'Completed', avatar: 'AR' },
        { customer: 'Vikash Rai', pickup: 'Gangtok', dropoff: 'Siliguri', earnings: '₹1,100', time: '1 day ago', status: 'Completed', avatar: 'VR' },
        { customer: 'Sunita Tamang', pickup: 'Kalimpong', dropoff: 'Darjeeling', earnings: '₹600', time: '2 days ago', status: 'Completed', avatar: 'ST' },
    ]

    const availableCars = [
        { owner: 'Me', model: 'Maruti Swift', year: '2022', status: 'Available', earnings: '₹420/day', image: '🚗' },
        { owner: 'Me', model: 'Honda City', year: '2021', status: 'Rented', earnings: '₹680/day', image: '🚙' },
        { owner: 'Me', model: 'Toyota Innova', year: '2023', status: 'Available', earnings: '₹1200/day', image: '🚐' },
    ]

    const getStatusColor = (status) => {
        switch (status) {
            case 'Available': return 'bg-green-100 text-green-800'
            case 'Rented': return 'bg-blue-100 text-blue-800'
            case 'Completed': return 'bg-gray-100 text-gray-800'
            case 'Active': return 'bg-orange-100 text-orange-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <>
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 overflow-hidden">   

            {/* Header */}
            <header className={`px-4 py-3 fixed top-0 w-full z-50 transition-all duration-300 ${
                scrollY > 50 ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/80 backdrop-blur-sm'
            }`}>
                <div className="flex items-center justify-between">
                    {/* Left Section - Logo & Mobile Menu */}
                    <div className="flex items-center space-x-4">
                        {/* Mobile Menu Button */}
                        <button 
                            onClick={() => setSidebarOpen(!sidebarOpen)}
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
                            <h1 className="text-xl font-semibold text-gray-800 hidden sm:block">
                                {dashboardMode === 'driver' ? 'Driver Dashboard' : 'My Dashboard'}
                            </h1>
                        </div>
                    </div>

                    {/* Center Section - Mode Toggle */}
                    <div className="hidden md:flex bg-red-100 rounded-full p-1">
                        <button
                            onClick={() => setDashboardMode('user')}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                                dashboardMode === 'user' ? 'bg-red-500 text-white' : 'text-red-600'
                            }`}
                        >
                            🧑‍💼 Rider Mode
                        </button>
                        <button
                            onClick={() => setDashboardMode('driver')}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                                dashboardMode === 'driver' ? 'bg-red-500 text-white' : 'text-red-600'
                            }`}
                        >
                            🚗 Driver Mode
                        </button>
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

            {/* Sidebar */}
            <aside className={`fixed left-0 top-16 h-full bg-white/90 backdrop-blur-md border-r border-red-100 z-40 transition-transform duration-300 ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } md:translate-x-0 w-64`}>
                <div className="p-4">
                    <nav className="space-y-2">
                        {(dashboardMode === 'driver' ? driverSidebarItems : userSidebarItems).map((item, index) => {
                            const Icon = item.icon
                            return (
                                <button
                                    key={index}
                                    className={`flex items-center w-full px-3 py-3 text-sm rounded-xl transition-colors ${
                                        item.active
                                            ? 'bg-red-100 text-red-600 font-semibold shadow-sm'
                                            : 'text-gray-600 hover:bg-red-50 hover:text-red-500'
                                    }`}
                                >
                                    <Icon className="h-5 w-5 mr-3" />
                                    {item.label}
                                </button>
                            )
                        })}
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-64'} ${dashboardMode === 'user' ? 'pt-20' : 'pt-28'} md:pt-20 p-6 relative z-10`}>
                {/* Welcome Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold">
                            {dashboardMode === 'driver' ? '🚗 Driver Dashboard' : '🧑‍💼 Rider Dashboard'}
                        </div>
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-2">
                        {dashboardMode === 'driver' ? 'Ready to earn, John!' : 'Welcome back, John!'}
                    </h2>
                    <p className="text-gray-600 text-lg">
                        {dashboardMode === 'driver' 
                            ? "Manage your cars and track your earnings." 
                            : "Book your next ride or explore available cars."}
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {(dashboardMode === 'driver' ? driverStats : userStats).map((stat, index) => {
                        const Icon = stat.icon
                        return (
                            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                                        <p className={`text-sm font-semibold ${stat.color} mt-1`}>
                                            {stat.change}
                                        </p>
                                    </div>
                                    <div className={`${stat.bgColor} p-4 rounded-xl shadow-sm`}>
                                        <Icon className={`h-8 w-8 ${stat.color}`} />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    {/* Left Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {dashboardMode === 'driver' ? (
                            // Driver: My Cars Management
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-2xl font-bold text-gray-900">My Cars</h3>
                                    <button className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition-colors flex items-center gap-2">
                                        <Plus className="h-4 w-4" />
                                        Add New Car
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {availableCars.map((car, index) => (
                                        <div key={index} className="flex items-center justify-between p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="text-3xl">{car.image}</div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">{car.model}</h4>
                                                    <p className="text-sm text-gray-600">{car.year} • Earning {car.earnings}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(car.status)}`}>
                                                    {car.status}
                                                </span>
                                                <button className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors">
                                                    <Minus className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            // User: Quick Book Section
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Book a Ride</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            <MapPin className="inline w-4 h-4 mr-1" />
                                            From
                                        </label>
                                        <input 
                                            type="text" 
                                            placeholder="Pickup location"
                                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-400 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            <MapPin className="inline w-4 h-4 mr-1" />
                                            To
                                        </label>
                                        <input 
                                            type="text" 
                                            placeholder="Drop location"
                                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-400 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <input 
                                        type="date" 
                                        className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-400 focus:border-transparent"
                                    />
                                    <input 
                                        type="time" 
                                        className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-400 focus:border-transparent"
                                    />
                                </div>
                                <button className="w-full bg-red-500 text-white py-3 px-6 rounded-xl hover:bg-red-600 transition-colors font-bold text-lg flex items-center justify-center gap-2">
                                    <Search className="h-5 w-5" />
                                    Find Available Cars
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Right Content - Recent Activity */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">
                            {dashboardMode === 'driver' ? 'Recent Rides' : 'Recent Trips'}
                        </h3>
                        <div className="space-y-4">
                            {(dashboardMode === 'driver' ? recentDriverActivity : recentUserActivity).map((activity, index) => (
                                <div key={index} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-red-50 transition-colors">
                                    <div className="w-10 h-10 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-xs font-bold text-white">{activity.avatar}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-gray-900">
                                            {dashboardMode === 'driver' ? activity.customer : activity.driver}
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            {dashboardMode === 'driver' 
                                                ? `${activity.pickup} → ${activity.dropoff}`
                                                : `${activity.car} • ${activity.route}`}
                                        </p>
                                        <div className="flex items-center justify-between mt-1">
                                            <span className="text-xs text-gray-400">{activity.time}</span>
                                            {dashboardMode === 'driver' && (
                                                <span className="text-xs font-semibold text-green-600">{activity.earnings}</span>
                                            )}
                                        </div>
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(activity.status)}`}>
                                        {activity.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">
                            {dashboardMode === 'driver' ? 'Driver Tools' : 'Quick Actions'}
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            {dashboardMode === 'driver' ? (
                                <>
                                    <button className="p-6 bg-green-50 rounded-xl hover:bg-green-100 transition-colors group">
                                        <DollarSign className="h-8 w-8 text-green-600 mb-3 group-hover:scale-110 transition-transform" />
                                        <p className="text-sm font-semibold text-green-600">View Earnings</p>
                                    </button>
                                    <button className="p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors group">
                                        <Route className="h-8 w-8 text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
                                        <p className="text-sm font-semibold text-blue-600">Active Rides</p>
                                    </button>
                                    <button className="p-6 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors group">
                                        <BarChart3 className="h-8 w-8 text-purple-600 mb-3 group-hover:scale-110 transition-transform" />
                                        <p className="text-sm font-semibold text-purple-600">Analytics</p>
                                    </button>
                                    <button className="p-6 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors group">
                                        <Phone className="h-8 w-8 text-orange-600 mb-3 group-hover:scale-110 transition-transform" />
                                        <p className="text-sm font-semibold text-orange-600">Support</p>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button className="p-6 bg-red-50 rounded-xl hover:bg-red-100 transition-colors group">
                                        <Car className="h-8 w-8 text-red-600 mb-3 group-hover:scale-110 transition-transform" />
                                        <p className="text-sm font-semibold text-red-600">Book Now</p>
                                    </button>
                                    <button className="p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors group">
                                        <Star className="h-8 w-8 text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
                                        <p className="text-sm font-semibold text-blue-600">Favorites</p>
                                    </button>
                                    <button className="p-6 bg-green-50 rounded-xl hover:bg-green-100 transition-colors group">
                                        <CreditCard className="h-8 w-8 text-green-600 mb-3 group-hover:scale-110 transition-transform" />
                                        <p className="text-sm font-semibold text-green-600">Payments</p>
                                    </button>
                                    <button className="p-6 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors group">
                                        <Phone className="h-8 w-8 text-purple-600 mb-3 group-hover:scale-110 transition-transform" />
                                        <p className="text-sm font-semibold text-purple-600">Support</p>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">
                            {dashboardMode === 'driver' ? 'Performance Summary' : 'Travel Stats'}
                        </h3>
                        {dashboardMode === 'driver' ? (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-sm font-medium text-gray-700">Today's Earnings</span>
                                    </div>
                                    <span className="text-lg font-bold text-green-600">₹2,400</span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                        <span className="text-sm font-medium text-gray-700">Rides Completed</span>
                                    </div>
                                    <span className="text-lg font-bold text-blue-600">8</span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                        <span className="text-sm font-medium text-gray-700">Hours Online</span>
                                    </div>
                                    <span className="text-lg font-bold text-orange-600">6.5h</span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                        <span className="text-sm font-medium text-gray-700">Customer Rating</span>
                                    </div>
                                    <span className="text-lg font-bold text-purple-600">4.9 ⭐</span>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                                        <span className="text-sm font-medium text-gray-700">This Month</span>
                                    </div>
                                    <span className="text-lg font-bold text-blue-600">12 trips</span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                        <span className="text-sm font-medium text-gray-700">Money Spent</span>
                                    </div>
                                    <span className="text-lg font-bold text-green-600">₹8,400</span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                        <span className="text-sm font-medium text-gray-700">Distance Traveled</span>
                                    </div>
                                    <span className="text-lg font-bold text-orange-600">450km</span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                        <span className="text-sm font-medium text-gray-700">Avg Rating Given</span>
                                    </div>
                                    <span className="text-lg font-bold text-red-600">4.8 ⭐</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden backdrop-blur-sm"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

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
        </>
    )
}

export default Dashboard