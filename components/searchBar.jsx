import React, { useState } from "react"
import { Search, MapPin, ArrowUpDown } from 'lucide-react'

const RideSearchBar = () => {
    const [selectedDate, setSelectedDate] = useState('')

    // Get current date for min date
    const today = new Date().toISOString().split('T')[0]

    const swapLocations = () => {
        const fromInput = document.querySelector('input[placeholder="From"]')
        const toInput = document.querySelector('input[placeholder="To"]')
        const temp = fromInput.value
        fromInput.value = toInput.value
        toInput.value = temp
    }

    return (
        <div className="mx-auto p-4 relative flex justify-around items-center">
            <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-red-100 p-4 flex w-full justify-around lg:items-center flex-col lg:flex-row space-y-4 lg:space-y-0">
                {/* Location Inputs */}
                <div className="flex justify-around lg:space-x-3 lg:items-center flex-col lg:flex-row space-y-4 lg:space-y-0">
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                        <input
                            type="text"
                            placeholder="From"
                            className="w-full pl-8 pr-10 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                    </div>

                    <div className="flex justify-center items-center">
                        <button
                            onClick={swapLocations}
                            className="p-3 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                        >
                            <ArrowUpDown className="w-3 h-3 lg:rotate-270 transition-all duration-800 ease-in-out" />
                        </button>
                    </div>

                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-500" />
                        <input
                            type="text"
                            placeholder="To"
                            className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Date Picker */}
                <div className="relative">
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={today}
                        className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                </div>

                {/* Search Button */}
                <button className="bg-gradient-to-r p-3 from-red-500 to-pink-500 text-white rounded-lg font-medium hover:from-red-600 hover:to-pink-600 transition-all flex items-center justify-center space-x-2">
                    <Search className="w-4 h-4" />
                    <span>Book Ride</span>
                </button>
            </div>
        </div>
    )
}

export default RideSearchBar    