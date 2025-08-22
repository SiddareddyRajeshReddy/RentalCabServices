import React from "react"
import { Users, Clock, Star } from 'lucide-react'
const CabCard = ({ cab, isSelected, onClick }) => {
    return (
        <>
            <div
                onClick={() => onClick(cab.id)}
                className={`
                relative cursor-pointer transition-all duration-500 ease-out rounded-xl p-4 border-2
                ${isSelected
                        ? 'border-red-500 bg-red-50 shadow-xl transform scale-101 shadow-red-200/50'
                        : 'border-gray-200 bg-white hover:border-red-300 hover:shadow-md hover:scale-[1.005]'
                    }
                backdrop-blur-md
            `}
            >
                {/* Selection Indicator */}
                {isSelected && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                )}

                <div className="flex items-center space-x-4">
                    {/* Car Icon and Basic Info */}
                    <div className="flex items-center space-x-3">
                        <div className="text-3xl">
                            {cab.icon}
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800">{cab.name}</h3>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Users className="w-3 h-3" />
                                <span>{cab.capacity}</span>
                                <Clock className="w-3 h-3 ml-2" />
                                <span>{cab.eta}</span>
                            </div>
                        </div>
                    </div>

                    {/* Description and Features */}
                    <div className="flex-1">
                        <p className="text-sm text-gray-600 mb-2">{cab.description}</p>
                        <div className="flex flex-wrap gap-1">
                            {cab.features.map((feature, index) => (
                                <span
                                    key={index}
                                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                                >
                                    {feature}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Price and Rating */}
                    <div className="text-right">
                        <div className="text-lg font-bold text-red-600">{cab.price}</div>
                        <div className="flex items-center text-sm text-gray-600 justify-end">
                            <Star className="w-3 h-3 text-yellow-500 mr-1" />
                            <span>{cab.rating}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>)
}
export default CabCard