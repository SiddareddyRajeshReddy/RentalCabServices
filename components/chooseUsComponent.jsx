import React, { useState, useEffect } from 'react';
import { Rocket, Shield, User, Car, RotateCcw, Monitor } from 'lucide-react';

function ChooseUsComponent({ prop, index }) {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    // Animation on mount
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), index * 200);
        return () => clearTimeout(timer);
    }, [index]);

    // Icon mapping for better visuals
    const getIcon = () => {
        const iconName = prop.path.split('/')[1]?.split('.')[0] || 'car';
        const iconProps = { className: "w-12 h-12 text-red-400 transition-transform duration-300" };
        
        switch(iconName) {
            case 'rocket': return <Rocket {...iconProps} />;
            case 'square': return <Car {...iconProps} />;
            case 'driver': return <User {...iconProps} />;
            case 'sheild': return <Shield {...iconProps} />;
            case 'hat': return <RotateCcw {...iconProps} />;
            case 'layout': return <Monitor {...iconProps} />;
            default: return <Car {...iconProps} />;
        }
    };

    const handleCardClick = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div 
            className={`flex justify-center items-center flex-col md:flex-row p-6 rounded-xl 
                transition-all duration-500 cursor-pointer border border-gray-100
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                ${isHovered ? 'shadow-2xl scale-105 bg-gradient-to-br from-white to-red-50' : 'shadow-md bg-white'}
                ${isExpanded ? 'ring-2 ring-red-200' : ''}
            `}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleCardClick}
        >
            <div className={`mb-4 md:mb-0 md:mr-6 transition-transform duration-300 ${isHovered ? 'rotate-6' : 'rotate-0'}`}>
                {getIcon()}
            </div>
            
            <div className="flex justify-start items-start flex-col h-full text-center md:text-left flex-1">
                <h3 className="text-[#807878] text-xl font-bold mb-3 transition-colors duration-300 hover:text-red-500">
                    {prop.title}
                </h3>
                
                <p className={`text-[#C2BABA] text-sm leading-relaxed transition-all duration-300 
                    ${isExpanded ? 'line-clamp-none' : 'line-clamp-3'}
                `}>
                    {prop.description}
                </p>
                
                {isExpanded && (
                    <div className="mt-4 p-3 bg-red-50 rounded-lg w-full animate-fadeIn">
                        <p className="text-xs text-red-600 font-medium">
                            ✨ Learn more about this feature by contacting our team!
                        </p>
                    </div>
                )}
                
                <button className="mt-3 text-red-400 text-xs font-semibold hover:text-red-600 transition-colors">
                    {isExpanded ? 'Show Less' : 'Learn More'} →
                </button>
            </div>
        </div>
    );
}

export default ChooseUsComponent;