import React, { useState } from 'react'
import CabCard from './cabCard'
import { MapPin } from 'lucide-react'
const CabTypesComponent = () => {
    const [selectedCab, setSelectedCab] = useState('economy')
    const cabTypes = [
        {
            id: 'economy',
            name: 'Economy',
            description: 'Affordable rides for everyday travel',
            price: '₹8/km',
            capacity: 4,
            eta: '2-5 min',
            rating: 4.2,
            features: ['AC', 'Comfortable seating'],
            icon: '🚗',
        },
        {
            id: 'comfort',
            name: 'Comfort',
            description: 'More spacious with premium features',
            price: '₹12/km',
            capacity: 4,
            eta: '3-7 min',
            rating: 4.5,
            features: ['AC', 'Premium interior', 'Extra legroom'],
            icon: '🚙',
        },
        {
            id: 'premium',
            name: 'Premium',
            description: 'Luxury cars for special occasions',
            price: '₹18/km',
            capacity: 4,
            eta: '5-10 min',
            rating: 4.8,
            features: ['Luxury car', 'Professional driver', 'Complimentary water'],
            icon: '🚘',
        },
        {
            id: 'xl',
            name: 'XL',
            description: 'Extra space for groups and luggage',
            price: '₹15/km',
            capacity: 6,
            eta: '4-8 min',
            rating: 4.4,
            features: ['6 seater', 'Extra luggage space', 'AC'],
            icon: '🚐',
        }
    ]

    return (
        <div className="mx-auto p-4">
            <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-red-100 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Choose Your Ride</h2>
                </div>

                <div className="space-y-3">
                    {cabTypes.map((cab) => (
                        <CabCard 
                            key={cab.id}
                            cab={cab}
                            isSelected={selectedCab === cab.id}
                            onClick={setSelectedCab}
                        />
                    ))}
                </div>

                {/* Selected Cab Summary */}
                {selectedCab && (
                    <div className="mt-6 pt-4 border-t border-gray-200">
                        <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-semibold">
                                        {cabTypes.find(cab => cab.id === selectedCab)?.name} Selected
                                    </h3>
                                    <p className="text-sm opacity-90">
                                        {cabTypes.find(cab => cab.id === selectedCab)?.description}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-xl font-bold">
                                        {cabTypes.find(cab => cab.id === selectedCab)?.price}
                                    </div>
                                    <div className="text-sm opacity-90">
                                        ETA: {cabTypes.find(cab => cab.id === selectedCab)?.eta}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CabTypesComponent