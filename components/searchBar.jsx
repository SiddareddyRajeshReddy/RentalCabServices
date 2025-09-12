import React, { useEffect, useState, useRef } from "react"
import { Search, MapPin, ArrowUpDown } from 'lucide-react'

const RideSearchBar = () => {
    const [selectedDate, setSelectedDate] = useState('')
    const [location, setLocation] = useState({
        latitude: null,
        longitude: null,
        error: null
    });
    const [isLoading, setIsLoading] = useState(true)
    const [map, setMap] = useState(null);
    const mapRef = useRef(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setLocation(prev => ({
                ...prev,
                error: 'Geolocation is not supported by your browser.',
            }));
            setIsLoading(false);
            return;
        }

        const successHandler = (position) => {
            setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
            });
        };

        const errorHandler = (error) => {
            setLocation(prev => ({
                ...prev,
                error: error.message,
            }));
            setIsLoading(false);
        };

        navigator.geolocation.getCurrentPosition(successHandler, errorHandler, {
            enableHighAccuracy: true,
            timeout: 100000,
            maximumAge: 0,
        });
    }, []);

    // Set loading to false when location is available
    useEffect(() => {
        if (location.latitude && location.longitude) {
            setIsLoading(false);
        }
    }, [location.latitude, location.longitude]);

    // Initialize map only after loading is false and mapRef exists
    useEffect(() => {
        if (isLoading || !location.latitude || !location.longitude || !mapRef.current) return;
        
        try {
            const mapInstance = L.map(mapRef.current, {
                center: [location.latitude, location.longitude],
                zoom: 10,
            });

            L.tileLayer('https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}', {
                attribution: '© Google'
            }).addTo(mapInstance);

            const redIcon = new L.Icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41],
            });

            let layer = L.marker([location.latitude, location.longitude], { icon: redIcon }).addTo(mapInstance);
            mapInstance.on('click', function (e) {
                if (layer) {
                    mapInstance.removeLayer(layer);
                }
                layer = L.marker(e.latlng, { icon: redIcon }).addTo(mapInstance);
            });

            setMap(mapInstance);
            
        } catch (error) {
            console.error('Map initialization failed:', error);
            setLocation(prev => ({
                ...prev,
                error: 'Failed to initialize map'
            }));
        }

    }, [isLoading, location.latitude, location.longitude]);

    // Cleanup map on unmount
    useEffect(() => {
        return () => {
            if (map) {
                map.remove();
            }
        };
    }, [map]);

    // Get current date for min date
    const today = new Date().toISOString().split('T')[0]

    const swapLocations = () => {
        const fromInput = document.querySelector('input[placeholder="From"]')
        const toInput = document.querySelector('input[placeholder="To"]')
        if (fromInput && toInput) {
            const temp = fromInput.value
            fromInput.value = toInput.value
            toInput.value = temp
        }
    }

    return (
        <>
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
                                className="w-full pl-8 pr-10 py-3 text-green-500 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            />
                        </div>

                        <div className="flex justify-center items-center">
                            <button
                                onClick={swapLocations}
                                className="p-3 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                            >
                                <ArrowUpDown className="w-3 h-3 lg:rotate-90 transition-all duration-300 ease-in-out" />
                            </button>
                        </div>

                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-500" />
                            <input
                                type="text"
                                placeholder="To"
                                className="w-full pl-8 pr-4 py-3 border text-red-700 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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

            {/* Loading State */}
            {isLoading && (
                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                    <div className="flex space-x-1">
                        <div className="w-4 h-10 bg-blue-500 rounded animate-pulse"></div>
                        <div className="w-4 h-10 bg-blue-500 rounded animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-4 h-10 bg-blue-500 rounded animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-4 h-10 bg-blue-500 rounded animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                        <div className="w-4 h-10 bg-blue-500 rounded animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                </div>
            )}

            {/* Map Container - Always rendered when not loading */}
            {!isLoading && !location.error && (
                <div className="w-[100vw] h-[600px] mx-auto">
                    <div ref={mapRef} className="w-full h-full rounded-2xl z-0"></div>
                </div>
            )}

            {/* Error State */}
            {location.error && (
                <div className="mx-4 h-96 bg-red-50 rounded-2xl flex items-center justify-center border border-red-200">
                    <div className="text-center">
                        <div className="text-red-500 text-6xl mb-4">⚠️</div>
                        <p className="text-red-600 font-medium">Location Error</p>
                        <p className="text-red-500 text-sm mt-2">{location.error}</p>
                    </div>
                </div>
            )}
        </>
    )
}

export default RideSearchBar