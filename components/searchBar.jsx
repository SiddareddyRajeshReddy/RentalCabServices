import React, { useEffect, useState, useRef, useCallback } from "react"
import { Search, MapPin, ArrowUpDown, Navigation, X, Clock, DollarSign, Route } from 'lucide-react'
import axios from "axios"
const RideSearchBar = () => {
    const [selectedDate, setSelectedDate] = useState('')
    const [location, setLocation] = useState({
        latitude: 28.6139, 
        longitude: 77.2090,
        error: null,
        hasPermission: false
    });
    const [map, setMap] = useState(null);
    const [sourceMarker, setSourceMarker] = useState(null);
    const [destinationMarker, setDestinationMarker] = useState(null);
    const [routeControl, setRouteControl] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);
    const [sourceLocation, setSourceLocation] = useState('');
    const [destinationLocation, setDestinationLocation] = useState('');
    const [sourceSuggestions, setSourceSuggestions] = useState([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);
    const [showSourceSuggestions, setShowSourceSuggestions] = useState(false);
    const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);
    const [librariesLoaded, setLibrariesLoaded] = useState(false);
    const [isLoadingSource, setIsLoadingSource] = useState(false);
    const [isLoadingDestination, setIsLoadingDestination] = useState(false);
    
    // New states for distance and pricing
    const [routeDistance, setRouteDistance] = useState(0);
    const [routeDuration, setRouteDuration] = useState(0);
    const [estimatedFare, setEstimatedFare] = useState(0);
    const [isBooking, setIsBooking] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState(false);
    
    const mapRef = useRef(null);
    const searchTimeoutRef = useRef(null);

    // Pricing configuration (you can adjust these rates)
    const PRICING = {
        baseRate: 50, // Base fare
        perKmRate: 12, // Rate per kilometer
        perMinuteRate: 2, // Rate per minute
        minimumFare: 80 // Minimum fare
    };

    // Calculate fare based on distance and duration
    const calculateFare = useCallback((distanceKm, durationMinutes) => {
        const baseFare = PRICING.baseRate;
        const distanceFare = distanceKm * PRICING.perKmRate;
        const timeFare = durationMinutes * PRICING.perMinuteRate;
        const totalFare = baseFare + distanceFare + timeFare;
        
        return Math.max(totalFare, PRICING.minimumFare);
    }, []);

   

    // Handle book ride action
    const handleBookRide = async () => {
        if (!sourceLocation || !destinationLocation || routeDistance === 0) {
            alert('Please select both pickup and drop-off locations');
            return;
        }

        setIsBooking(true);

        const rideData = {
            id: 'RIDE_' + Date.now(),
            sourceLocation: sourceLocation,
            destinationLocation: destinationLocation,
            sourceCoords: sourceMarker ? {
                lat: sourceMarker.getLatLng().lat,
                lng: sourceMarker.getLatLng().lng
            } : null,
            destinationCoords: destinationMarker ? {
                lat: destinationMarker.getLatLng().lat,
                lng: destinationMarker.getLatLng().lng
            } : null,
            distance: routeDistance,
            estimatedDuration: routeDuration,
            estimatedFare: estimatedFare,
            bookingTime: new Date().toISOString(),
            status: 'pending'
        };

        try {
           const token = localStorage.getItem("token");
           const response = await axios.post("http://localhost:3000/rides/book", rideData, {
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json',
            }
        });
        setBookingSuccess(true)
        setTimeout(() => {
            setBookingSuccess(false);
        }, 3000);
            
        } catch (error) {
            console.error('Failed to book ride:', error);
            alert('Failed to book ride. Please try again.');
        } finally {
            setIsBooking(false);
        }
    };

    // Load external libraries
    const loadExternalLibraries = useCallback(() => {
        return new Promise((resolve) => {
            // Check if already loaded
            if (window.L && window.L.Routing) {
                setLibrariesLoaded(true);
                resolve();
                return;
            }

            // Add CSS
            if (!document.querySelector('link[href*="leaflet.css"]')) {
                const leafletCSS = document.createElement('link');
                leafletCSS.rel = 'stylesheet';
                leafletCSS.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
                document.head.appendChild(leafletCSS);
            }

            if (!document.querySelector('link[href*="leaflet-routing-machine.css"]')) {
                const routingCSS = document.createElement('link');
                routingCSS.rel = 'stylesheet';
                routingCSS.href = 'https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.css';
                document.head.appendChild(routingCSS);
            }

            // Load Leaflet first
            if (!window.L) {
                const leafletJS = document.createElement('script');
                leafletJS.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
                leafletJS.onload = () => {
                    // Then load routing machine
                    const routingJS = document.createElement('script');
                    routingJS.src = 'https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.js';
                    routingJS.onload = () => {
                        setLibrariesLoaded(true);
                        resolve();
                    };
                    document.head.appendChild(routingJS);
                };
                document.head.appendChild(leafletJS);
            } else {
                // Load routing machine if Leaflet exists but routing doesn't
                const routingJS = document.createElement('script');
                routingJS.src = 'https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.js';
                routingJS.onload = () => {
                    setLibrariesLoaded(true);
                    resolve();
                };
                document.head.appendChild(routingJS);
            }
        });
    }, []);

    // Update route function with distance and fare calculation
    const updateRoute = useCallback((srcMarker, destMarker) => {
        if (!map || !srcMarker || !destMarker || !window.L || !window.L.Routing) {
            console.log('Route update skipped - missing dependencies');
            return;
        }

        // Remove existing route
        if (routeControl) {
            try {
                map.removeControl(routeControl);
            } catch (e) {
                console.log('Error removing route control:', e);
            }
            setRouteControl(null);
        }

        try {
            console.log('Creating route between:', srcMarker.getLatLng(), destMarker.getLatLng());
            const newRouteControl = window.L.Routing.control({
                waypoints: [
                    srcMarker.getLatLng(),
                    destMarker.getLatLng()
                ],
                routeWhileDragging: false,
                addWaypoints: false,
                createMarker: function() { return null; },
                lineOptions: {
                    styles: [{ color: '#00FF00', weight: 4, opacity: 0.8 }]
                },
                show: false
            }).addTo(map);

            // Listen for route found event to get distance and duration
            newRouteControl.on('routesfound', function(e) {
                const routes = e.routes;
                const route = routes[0];
                
                if (route) {
                    const distanceMeters = route.summary.totalDistance;
                    const durationSeconds = route.summary.totalTime;
                    
                    const distanceKm = (distanceMeters / 1000).toFixed(2);
                    const durationMinutes = Math.ceil(durationSeconds / 60);
                    
                    setRouteDistance(parseFloat(distanceKm));
                    setRouteDuration(durationMinutes);
                    
                    // Calculate estimated fare
                    const fare = calculateFare(parseFloat(distanceKm), durationMinutes);
                    setEstimatedFare(Math.round(fare));
                    
                    console.log(`Route found: ${distanceKm} km, ${durationMinutes} minutes, ₹${Math.round(fare)}`);
                }
            });

            setRouteControl(newRouteControl);
            console.log('Route created successfully');
        } catch (error) {
            console.error('Routing failed:', error);
        }
    }, [map, routeControl, calculateFare]);

    // Reverse geocoding function
    const reverseGeocode = async (lat, lng, type) => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);
            const data = await response.json();
            const address = data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
            
            if (type === 'source') {
                setSourceLocation(address);
            } else {
                setDestinationLocation(address);
            }
        } catch (error) {
            console.error('Reverse geocoding failed:', error);
            const coords = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
            if (type === 'source') {
                setSourceLocation(coords);
            } else {
                setDestinationLocation(coords);
            }
        }
    };

    // Search suggestions function with debouncing
    const searchSuggestions = useCallback(async (query, type) => {
        // Clear existing timeout
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        if (!query.trim() || query.length < 3) {
            if (type === 'source') {
                setSourceSuggestions([]);
                setShowSourceSuggestions(false);
                setIsLoadingSource(false);
            } else {
                setDestinationSuggestions([]);
                setShowDestinationSuggestions(false);
                setIsLoadingDestination(false);
            }
            return;
        }

        // Set loading state
        if (type === 'source') {
            setIsLoadingSource(true);
        } else {
            setIsLoadingDestination(true);
        }

        // Debounce the API call
        searchTimeoutRef.current = setTimeout(async () => {
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`);
                const data = await response.json();
                
                const suggestions = data.map(item => ({
                    display_name: item.display_name,
                    lat: parseFloat(item.lat),
                    lon: parseFloat(item.lon)
                }));

                if (type === 'source') {
                    setSourceSuggestions(suggestions);
                    setShowSourceSuggestions(suggestions.length > 0);
                    setIsLoadingSource(false);
                } else {
                    setDestinationSuggestions(suggestions);
                    setShowDestinationSuggestions(suggestions.length > 0);
                    setIsLoadingDestination(false);
                }
            } catch (error) {
                console.error('Search suggestions failed:', error);
                if (type === 'source') {
                    setIsLoadingSource(false);
                } else {
                    setIsLoadingDestination(false);
                }
            }
        }, 300); // 300ms debounce
    }, []);

    // Handle suggestion selection
    const selectSuggestion = useCallback((suggestion, type) => {
        const { display_name, lat, lon } = suggestion;
        
        if (type === 'source') {
            setSourceLocation(display_name);
            setShowSourceSuggestions(false);
            setSourceSuggestions([]);
            
            if (sourceMarker && map) {
                sourceMarker.setLatLng([lat, lon]);
                map.setView([lat, lon], 13);
                // Update route after a small delay
                setTimeout(() => updateRoute(sourceMarker, destinationMarker), 200);
            }
        } else {
            setDestinationLocation(display_name);
            setShowDestinationSuggestions(false);
            setDestinationSuggestions([]);
            
            if (map && window.L) {
                // Remove existing destination marker
                if (destinationMarker) {
                    map.removeLayer(destinationMarker);
                }
                
                const destIcon = new window.L.Icon({
                    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41],
                });
                
                const newDestMarker = window.L.marker([lat, lon], { 
                    icon: destIcon,
                    draggable: true 
                }).addTo(map);
                
                newDestMarker.bindPopup('Destination Location');
                
                setDestinationMarker(newDestMarker);
                console.log('Destination marker created:', newDestMarker);
                
                // Update route after a small delay
                setTimeout(() => updateRoute(sourceMarker, newDestMarker), 200);
            }
        }
    }, [map, sourceMarker, destinationMarker, updateRoute]);

    // Initialize map
    useEffect(() => {
        if (!mapRef.current || map || !librariesLoaded) return;
        
        const initializeMap = () => {
            try {
                const mapInstance = window.L.map(mapRef.current, {
                    center: [location.latitude, location.longitude],
                    zoom: 10,
                    zoomControl: true,
                    attributionControl: true
                });

                window.L.tileLayer('https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}', {
                    attribution: '© Google',
                    maxZoom: 20
                }).addTo(mapInstance);

                // Create custom icons
                const sourceIcon = new window.L.Icon({
                    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41],
                });

                const destinationIcon = new window.L.Icon({
                    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41],
                });

                // Add source marker at current/default location
                const sourceMarkerInstance = window.L.marker([location.latitude, location.longitude], { 
                    icon: sourceIcon,
                    draggable: false
                }).addTo(mapInstance);
                sourceMarkerInstance.bindPopup('Source Location');

                // Handle map clicks
                mapInstance.on('click', function (e) {
                    console.log('Map clicked, focused input:', focusedInput);
                    if (focusedInput === 'source') {
                        sourceMarkerInstance.setLatLng(e.latlng);
                        reverseGeocode(e.latlng.lat, e.latlng.lng, 'source');
                        setTimeout(() => updateRoute(sourceMarkerInstance, destinationMarker), 200);
                    } else if (focusedInput === 'destination') {
                        // Remove existing destination marker
                        if (destinationMarker) {
                            mapInstance.removeLayer(destinationMarker);
                        }
                        
                        const newDestMarker = window.L.marker(e.latlng, { 
                            icon: destinationIcon,
                            draggable: true 
                        }).addTo(mapInstance);
                        
                        newDestMarker.bindPopup('Destination Location');
                        
                        setDestinationMarker(newDestMarker);
                        reverseGeocode(e.latlng.lat, e.latlng.lng, 'destination');
                        console.log('Destination marker created via map click');
                        
                        setTimeout(() => updateRoute(sourceMarkerInstance, newDestMarker), 200);
                    }
                });

                setMap(mapInstance);
                setSourceMarker(sourceMarkerInstance);
                
            } catch (error) {
                console.error('Map initialization failed:', error);
                setLocation(prev => ({
                    ...prev,
                    error: 'Failed to initialize map'
                }));
            }
        };

        initializeMap();
    }, [librariesLoaded, location.latitude, location.longitude, focusedInput, destinationMarker, updateRoute]);

    // Load libraries on component mount
    useEffect(() => {
        loadExternalLibraries();
    }, [loadExternalLibraries]);

    // Try to get user location
    useEffect(() => {
        if (!navigator.geolocation) {
            setLocation(prev => ({
                ...prev,
                error: 'Geolocation is not supported by your browser.',
            }));
            return;
        }

        const successHandler = (position) => {
            const newLat = position.coords.latitude;
            const newLng = position.coords.longitude;
            
            setLocation(prev => ({
                ...prev,
                latitude: newLat,
                longitude: newLng,
                hasPermission: true,
                error: null
            }));

            // Update source marker and map center if permission granted
            if (sourceMarker && map) {
                sourceMarker.setLatLng([newLat, newLng]);
                map.setView([newLat, newLng], 13);
                reverseGeocode(newLat, newLng, 'source');
            }
        };

        const errorHandler = (error) => {
            console.log('Geolocation error:', error.message);
            setLocation(prev => ({
                ...prev,
                hasPermission: false
            }));
        };

        navigator.geolocation.getCurrentPosition(successHandler, errorHandler, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
        });
    }, [sourceMarker, map]);

    // Cleanup map on unmount
    useEffect(() => {
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
            if (map) {
                map.remove();
            }
        };
    }, [map]);

    const today = new Date().toISOString().split('T')[0]

    const swapLocations = () => {
        const tempLocation = sourceLocation;
        setSourceLocation(destinationLocation);
        setDestinationLocation(tempLocation);

        if (sourceMarker && destinationMarker) {
            const sourcePos = sourceMarker.getLatLng();
            const destPos = destinationMarker.getLatLng();
            
            sourceMarker.setLatLng(destPos);
            destinationMarker.setLatLng(sourcePos);
            
            // Update route after swapping
            setTimeout(() => updateRoute(sourceMarker, destinationMarker), 200);
        }
    }

    const handleInputChange = (value, type) => {
        if (type === 'source') {
            setSourceLocation(value);
            searchSuggestions(value, 'source');
        } else {
            setDestinationLocation(value);
            searchSuggestions(value, 'destination');    
        }
    }

    const handleInputFocus = (type) => {
        console.log(`${type} input focused`);
        setFocusedInput(type);
        
        if (type === 'source' && sourceLocation.length >= 3 && sourceSuggestions.length > 0) {
            setShowSourceSuggestions(true);
        } else if (type === 'destination' && destinationLocation.length >= 3 && destinationSuggestions.length > 0) {
            setShowDestinationSuggestions(true);
        }
    }

    const handleInputBlur = (type) => {
        // Delay hiding suggestions to allow for clicks
        setTimeout(() => {
            if (type === 'source') {
                setShowSourceSuggestions(false);
            } else {
                setShowDestinationSuggestions(false);
            }
        }, 150);
    }

    const clearInput = (type) => {
        if (type === 'source') {
            setSourceLocation('');
            setSourceSuggestions([]);
            setShowSourceSuggestions(false);
        } else {
            setDestinationLocation('');
            setDestinationSuggestions([]);
            setShowDestinationSuggestions(false);
            if (destinationMarker && map) {
                map.removeLayer(destinationMarker);
                setDestinationMarker(null);
                if (routeControl) {
                    map.removeControl(routeControl);
                    setRouteControl(null);
                }
                // Reset distance and fare when destination is cleared
                setRouteDistance(0);
                setRouteDuration(0);
                setEstimatedFare(0);
            }
        }
    }

    return (
        <div className="relative">
            <div className="mx-auto p-4 relative flex justify-around items-center">
                <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-red-100 p-4 flex w-full justify-around lg:items-center flex-col lg:flex-row space-y-4 lg:space-y-0 relative z-10">
                    <div className="flex justify-around lg:space-x-3 lg:items-center flex-col lg:flex-row space-y-4 lg:space-y-0">
                        {/* Source Input */}
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-20">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            </div>
                            <input
                                type="text"
                                placeholder="From"
                                value={sourceLocation}
                                onChange={(e) => handleInputChange(e.target.value, 'source')}
                                onFocus={() => handleInputFocus('source')}
                                onBlur={() => handleInputBlur('source')}
                                className="w-full pl-8 pr-10 py-3 text-green-600 font-medium border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent relative z-10"
                            />
                            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1 z-20">
                                {sourceLocation && (
                                    <button
                                        onClick={() => clearInput('source')}
                                        className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                                        type="button"
                                    >
                                        <X className="w-3 h-3 text-gray-400" />
                                    </button>
                                )}
                                {location.hasPermission && (
                                    <Navigation className="w-4 h-4 text-green-500" />
                                )}
                            </div>
                            
                            {/* Source Suggestions Dropdown */}
                            {(showSourceSuggestions || isLoadingSource) && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto z-[9999]">
                                    {isLoadingSource ? (
                                        <div className="p-3 text-center text-gray-500">
                                            <div className="animate-spin inline-block w-4 h-4 border-2 border-gray-300 border-t-green-500 rounded-full mr-2"></div>
                                            Searching...
                                        </div>
                                    ) : (
                                        sourceSuggestions.map((suggestion, index) => (
                                            <button
                                                key={index}
                                                onClick={() => selectSuggestion(suggestion, 'source')}
                                                className="w-full p-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors focus:outline-none focus:bg-gray-50"
                                                type="button"
                                            >
                                                <div className="text-sm text-gray-800 line-clamp-2">
                                                    {suggestion.display_name}
                                                </div>
                                            </button>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="flex justify-center items-center">
                            <button
                                onClick={swapLocations}
                                className="p-3 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors flex-shrink-0 relative z-10"
                                type="button"
                                disabled={!sourceLocation || !destinationLocation}
                            >
                                <ArrowUpDown className="w-3 h-3 lg:rotate-90 transition-all duration-300 ease-in-out" />
                            </button>
                        </div>

                        {/* Destination Input */}
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-500 z-20" />
                            <input
                                type="text"
                                placeholder="To"
                                value={destinationLocation}
                                onChange={(e) => handleInputChange(e.target.value, 'destination')}
                                onFocus={() => handleInputFocus('destination')}
                                onBlur={() => handleInputBlur('destination')}
                                className="w-full pl-8 pr-10 py-3 border text-red-700 font-medium border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent relative z-10"
                            />
                            {destinationLocation && (
                                <button
                                    onClick={() => clearInput('destination')}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 transition-colors z-20"
                                    type="button"
                                >
                                    <X className="w-3 h-3 text-gray-400" />
                                </button>
                            )}
                            
                            {/* Destination Suggestions Dropdown */}
                            {(showDestinationSuggestions || isLoadingDestination) && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto z-[9999]">
                                    {isLoadingDestination ? (
                                        <div className="p-3 text-center text-gray-500">
                                            <div className="animate-spin inline-block w-4 h-4 border-2 border-gray-300 border-t-red-500 rounded-full mr-2"></div>
                                            Searching...
                                        </div>
                                    ) : (
                                        destinationSuggestions.map((suggestion, index) => (
                                            <button
                                                key={index}
                                                onClick={() => selectSuggestion(suggestion, 'destination')}
                                                className="w-full p-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors focus:outline-none focus:bg-gray-50"
                                                type="button"
                                            >
                                                <div className="text-sm text-gray-800 line-clamp-2">
                                                    {suggestion.display_name}
                                                </div>
                                            </button>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <button 
                        onClick={handleBookRide}
                        disabled={!sourceLocation || !destinationLocation || routeDistance === 0 || isBooking}
                        className="bg-gradient-to-r p-3 from-red-500 to-pink-500 text-white rounded-lg font-medium hover:from-red-600 hover:to-pink-600 transition-all flex items-center justify-center space-x-2 relative z-10 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isBooking ? (
                            <>
                                <div className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                                <span>Booking...</span>
                            </>
                        ) : (
                            <>
                                <Search className="w-4 h-4" />
                                <span>Book Ride</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Route Information Panel */}
            {routeDistance > 0 && (
                <div className="mx-4 mb-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Route className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Distance</p>
                                <p className="text-lg font-bold text-blue-700">{routeDistance} km</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <Clock className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Duration</p>
                                <p className="text-lg font-bold text-green-700">{routeDuration} min</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-red-100 rounded-lg">
                                <DollarSign className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Estimated Fare</p>
                                <p className="text-lg font-bold text-red-700">₹{estimatedFare}</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Fare Breakdown */}
                    <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200">
                        <p className="text-sm font-medium text-gray-700 mb-2">Fare Breakdown:</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-gray-600">
                            <div>Base: ₹{PRICING.baseRate}</div>
                            <div>Distance: ₹{(routeDistance * PRICING.perKmRate).toFixed(0)}</div>
                            <div>Time: ₹{(routeDuration * PRICING.perMinuteRate).toFixed(0)}</div>
                            <div className="font-medium text-red-600">Total: ₹{estimatedFare}</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Message */}
            {bookingSuccess && (
                <div className="mx-4 mb-4 p-4 bg-green-50 border border-green-200 rounded-xl relative z-10">
                    <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <div>
                            <p className="text-green-800 font-medium">Ride Booked Successfully!</p>
                            <p className="text-green-600 text-sm">Your ride request has been submitted and saved to the database.</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Map Container */}
            <div className="w-[100vw] h-[600px] mx-auto relative z-0">
                <div ref={mapRef} className="w-full h-full rounded-2xl"></div>
                {!librariesLoaded && (
                    <div className="absolute inset-0 bg-gray-100 rounded-2xl flex items-center justify-center z-10">
                        <div className="text-center">
                            <div className="animate-spin inline-block w-8 h-8 border-4 border-gray-300 border-t-red-500 rounded-full mb-4"></div>
                            <p className="text-gray-600">Loading map...</p>
                        </div>
                    </div>
                )}
            </div>

            {location.error && (
                <div className="mx-4 h-96 bg-red-50 rounded-2xl flex items-center justify-center border border-red-200 relative z-10">
                    <div className="text-center">
                        <div className="text-red-500 text-6xl mb-4">⚠️</div>
                        <p className="text-red-600 font-medium">Location Error</p>
                        <p className="text-red-500 text-sm mt-2">{location.error}</p>
                    </div>
                </div>
            )}

            <div className="mx-4 mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200 relative z-10">
                <p className="text-blue-700 text-sm">
                    <strong>Instructions:</strong> Focus on an input field (From/To) and click on the map to set that location. 
                    Type at least 3 characters to see address suggestions. Distance and fare will be calculated automatically when both locations are set.
                    {!librariesLoaded && <span className="text-orange-600"> (Loading map libraries...)</span>}
                </p>
            </div>

            {/* Pricing Information */}
            <div className="mx-4 mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 relative z-10">
                <h4 className="text-gray-800 font-medium mb-2">Pricing Structure</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div>
                        <span className="font-medium">Base Fare:</span>
                        <p>₹{PRICING.baseRate}</p>
                    </div>
                    <div>
                        <span className="font-medium">Per KM:</span>
                        <p>₹{PRICING.perKmRate}</p>
                    </div>
                    <div>
                        <span className="font-medium">Per Minute:</span>
                        <p>₹{PRICING.perMinuteRate}</p>
                    </div>
                    <div>
                        <span className="font-medium">Minimum Fare:</span>
                        <p>₹{PRICING.minimumFare}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RideSearchBar