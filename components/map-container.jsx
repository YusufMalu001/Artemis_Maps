// "use client";

// import { useState, useCallback, useEffect } from "react";
// import { Sidebar } from "@/components/sidebar";
// import { SearchBar } from "@/components/search-bar";
// import { CategoryFilters } from "@/components/category-filters";
// import { MapComponent } from "@/components/map";
// import { PlaceDetails } from "@/components/place-details";
// import { MapControls } from "@/components/map-controls";
// import { NavigationPanel } from "@/components/navigation-panel";
// import { useLoadScript } from "@react-google-maps/api";

// const libraries = ["places", "directions"];

// export function MapContainer() {
//     const [selectedPlace, setSelectedPlace] = useState(null);
//     const [searchResults, setSearchResults] = useState([]);
//     const [mapRef, setMapRef] = useState(null);
//     const [directionsResponse, setDirectionsResponse] = useState(null);
//     const [origin, setOrigin] = useState("");
//     const [destination, setDestination] = useState("");
//     const [travelMode, setTravelMode] = useState("DRIVING");
//     const [routes, setRoutes] = useState([]);
//     const [mapType, setMapType] = useState("roadmap");
//     const [userLocation, setUserLocation] = useState(null);

//     const { isLoaded, loadError } = useLoadScript({
//         googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
//         libraries,
//     });
//     const [markers, setMarkers] = useState([]);


//     const addMarker = useCallback((location, label) => {
//         if (!mapRef || !window.google) return null;

//         if (typeof location === 'string') {
//             const geocoder = new window.google.maps.Geocoder();
//             geocoder.geocode({ address: location }, (results, status) => {
//                 if (status === 'OK' && results[0]) {
//                     const position = results[0].geometry.location;

//                     // Create the marker
//                     const marker = new window.google.maps.Marker({
//                         position,
//                         map: mapRef,
//                         label,
//                         animation: window.google.maps.Animation.DROP,
//                     });

//                     setMarkers(prev => [...prev, marker]);

//                     if (markers.length === 0) {
//                         mapRef.setCenter(position);
//                     }
//                 }
//             });
//         } else {
//             const marker = new window.google.maps.Marker({
//                 position: location,
//                 map: mapRef,
//                 label,
//                 animation: window.google.maps.Animation.DROP,
//             });

//             setMarkers(prev => [...prev, marker]);
//         }
//     }, [mapRef]);

//     const clearMarkers = useCallback(() => {
//         markers.forEach(marker => marker.setMap(null));
//         setMarkers([]);
//     }, [markers]);

//     const calculateRoute = useCallback(async (validStops = []) => {
//         if (!origin || !destination || !window.google) return;

//         // Clear existing markers
//         clearMarkers();

//         // Add markers for origin, all stops, and destination
//         addMarker(origin, 'A');

//         validStops.forEach((stop, index) => {
//             // Use letters B, C, D, etc. for stops
//             const label = String.fromCharCode(66 + index); 
//             addMarker(stop, label);
//         });

//         addMarker(destination, validStops.length > 0 ? 
//             String.fromCharCode(66 + validStops.length) : 'B');

//         const directionsService = new window.google.maps.DirectionsService();

//         // Format waypoints for Google Maps API
//         const waypoints = validStops.map(stop => ({
//             location: stop,
//             stopover: true
//         }));

//         try {
//             const results = await directionsService.route({
//                 origin,
//                 destination,
//                 waypoints: waypoints,
//                 optimizeWaypoints: false,
//                 travelMode: window.google.maps.TravelMode[travelMode],
//                 provideRouteAlternatives: waypoints.length === 0,
//             });

//             setDirectionsResponse(results);
//             setRoutes(results.routes);
//         } catch (error) {
//             console.error("Error calculating route:", error);
//         }
//     }, [origin, destination, travelMode, setDirectionsResponse, setRoutes, addMarker, clearMarkers]);

//     useEffect(() => {
//         if (selectedPlace) {
//             setDestination(selectedPlace.formatted_address || "");
//         }
//     }, [selectedPlace]);

//     useEffect(() => {
//         if (navigator.geolocation) {
//             navigator.geolocation.watchPosition(
//                 (position) => {z
//                     setUserLocation({
//                         lat: position.coords.latitude,
//                         lng: position.coords.longitude,
//                     });
//                 },
//                 () => {
//                     console.error("Error: The Geolocation service failed.");
//                 },
//             );
//         } else {
//             console.error("Error: Your browser doesn't support geolocation.");
//         }
//     }, []);

//     if (loadError) {
//         return <div>Error loading maps</div>;
//     }

//     if (!isLoaded) {
//         return <div>Loading maps</div>;
//     }

//     const handleZoomIn = () => {
//         if (mapRef) {
//             mapRef.setZoom(mapRef.getZoom() + 1);
//         }
//     };

//     const handleZoomOut = () => {
//         if (mapRef) {
//             mapRef.setZoom(mapRef.getZoom() - 1);
//         }
//     };

//     const handleMapTypeChange = (newMapType) => {
//         setMapType(newMapType);
//     };

//     const handleMyLocation = () => {
//         if (userLocation && mapRef) {
//             mapRef.panTo(userLocation);
//             mapRef.setZoom(15);
//         }
//     };

//     const handleRouteSelect = (routeIndex) => {
//         if (directionsResponse) {
//             const newDirectionsResponse = { ...directionsResponse };
//             newDirectionsResponse.routes = [directionsResponse.routes[routeIndex]];
//             setDirectionsResponse(newDirectionsResponse);
//         }
//     };

//     return (
//         <div className="h-screen w-full flex">
//         <Sidebar />
//         <div className="flex-1 flex flex-col">
//         <div className="absolute top-4 left-20 right-4 z-10">
//         <SearchBar onSearchResults={setSearchResults} mapInstance={mapRef} />
//         <CategoryFilters />
//         </div>
//         <div className="flex-1 relative">
//         <MapComponent
//         onMapLoad={setMapRef}
//         searchResults={searchResults}
//         onPlaceSelect={setSelectedPlace}
//         directionsResponse={directionsResponse}
//         mapType={mapType}
//         userLocation={userLocation}
//         />
//         <MapControls
//         onZoomIn={handleZoomIn}
//         onZoomOut={handleZoomOut}
//         onMapTypeChange={handleMapTypeChange}
//         onMyLocation={handleMyLocation}
//         />
//         {selectedPlace && (
//             <PlaceDetails
//             place={selectedPlace}
//             onClose={() => setSelectedPlace(null)}
//             setDestination={setDestination}
//             />
//         )}
//         <NavigationPanel
//         origin={origin}
//         destination={destination}
//         setOrigin={setOrigin}
//         setDestination={setDestination}
//         travelMode={travelMode}
//         setTravelMode={setTravelMode}
//         calculateRoute={calculateRoute}
//         routes={routes}
//         onRouteSelect={handleRouteSelect}
//         mapInstance={mapRef}
//         onSearchResults={setSearchResults}
//         />
//         </div>
//         </div>
//         </div>
//     );
// }








"use client";

import { useState, useCallback, useEffect } from "react";
import { Sidebar } from "@/components/sidebar";
import { SearchBar } from "@/components/search-bar";
import { CategoryFilters } from "@/components/category-filters";
import { MapComponent } from "@/components/map";
import { PlaceDetails } from "@/components/place-details";
import { MapControls } from "@/components/map-controls";
import { NavigationPanel } from "@/components/navigation-panel";
import { useLoadScript } from "@react-google-maps/api";
import WindyMap from "@/components/WindyMap";  // Import the WindyMap component

const libraries = ["places", "directions"];

export function MapContainer() {
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [mapRef, setMapRef] = useState(null);
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [travelMode, setTravelMode] = useState("DRIVING");
    const [routes, setRoutes] = useState([]);
    const [mapType, setMapType] = useState("roadmap");
    const [userLocation, setUserLocation] = useState(null);
    const [windyLayer, setWindyLayer] = useState('wind');  // Default layer set to 'wind'

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    const [markers, setMarkers] = useState([]);

    const addMarker = useCallback((location, label) => {
        if (!mapRef || !window.google) return null;

        if (typeof location === 'string') {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ address: location }, (results, status) => {
                if (status === 'OK' && results[0]) {
                    const position = results[0].geometry.location;

                    const marker = new window.google.maps.Marker({
                        position,
                        map: mapRef,
                        label,
                        animation: window.google.maps.Animation.DROP,
                    });

                    setMarkers(prev => [...prev, marker]);

                    if (markers.length === 0) {
                        mapRef.setCenter(position);
                    }
                }
            });
        } else {
            const marker = new window.google.maps.Marker({
                position: location,
                map: mapRef,
                label,
                animation: window.google.maps.Animation.DROP,
            });

            setMarkers(prev => [...prev, marker]);
        }
    }, [mapRef]);

    const clearMarkers = useCallback(() => {
        markers.forEach(marker => marker.setMap(null));
        setMarkers([]);
    }, [markers]);

    const calculateRoute = useCallback(async (validStops = []) => {
        if (!origin || !destination || !window.google) return;

        clearMarkers();

        addMarker(origin, 'A');

        validStops.forEach((stop, index) => {
            const label = String.fromCharCode(66 + index); 
            addMarker(stop, label);
        });

        addMarker(destination, validStops.length > 0 ? 
            String.fromCharCode(66 + validStops.length) : 'B');

        const directionsService = new window.google.maps.DirectionsService();

        const waypoints = validStops.map(stop => ({
            location: stop,
            stopover: true
        }));

        try {
            const results = await directionsService.route({
                origin,
                destination,
                waypoints: waypoints,
                optimizeWaypoints: false,
                travelMode: window.google.maps.TravelMode[travelMode],
                provideRouteAlternatives: waypoints.length === 0,
            });

            setDirectionsResponse(results);
            setRoutes(results.routes);
        } catch (error) {
            console.error("Error calculating route:", error);
        }
    }, [origin, destination, travelMode, setDirectionsResponse, setRoutes, addMarker, clearMarkers]);

    useEffect(() => {
        if (selectedPlace) {
            setDestination(selectedPlace.formatted_address || "");
        }
    }, [selectedPlace]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                () => {
                    console.error("Error: The Geolocation service failed.");
                },
            );
        } else {
            console.error("Error: Your browser doesn't support geolocation.");
        }
    }, []);

    const handleLayerChange = (layer) => {  // Removed TypeScript annotation
        setWindyLayer(layer);
        if (mapRef && window.Windy) {
            const windyAPI = mapRef.getWindyAPI();
            if (windyAPI) {
                windyAPI.setLayer(layer);  // Switch between layers like 'wind', 'rain', 'temperature'
            }
        }
    };

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading maps</div>;
    }

    const handleZoomIn = () => {
        if (mapRef) {
            mapRef.setZoom(mapRef.getZoom() + 1);
        }
    };

    const handleZoomOut = () => {
        if (mapRef) {
            mapRef.setZoom(mapRef.getZoom() - 1);
        }
    };

    const handleMapTypeChange = (newMapType) => {
        setMapType(newMapType);
    };

    const handleMyLocation = () => {
        if (userLocation && mapRef) {
            mapRef.panTo(userLocation);
            mapRef.setZoom(15);
        }
    };

    const handleRouteSelect = (routeIndex) => {
        if (directionsResponse) {
            const newDirectionsResponse = { ...directionsResponse };
            newDirectionsResponse.routes = [directionsResponse.routes[routeIndex]];
            setDirectionsResponse(newDirectionsResponse);
        }
    };

    return (
        <div className="h-screen w-full flex">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <div className="absolute top-4 left-20 right-4 z-10">
                    <SearchBar onSearchResults={setSearchResults} mapInstance={mapRef} />
                    <CategoryFilters />
                    {/* Add buttons to toggle Windy map layers */}
                    <div className="flex space-x-4 mt-2">
  <button
    onClick={() => handleLayerChange('wind')}
    className={`px-4 py-2 rounded-lg shadow-md text-white font-semibold transition duration-300 ${
      windyLayer === 'wind' ? 'bg-blue-600' : 'bg-blue-400 hover:bg-blue-500'
    }`}
  >
    Wind
  </button>
  <button
    onClick={() => handleLayerChange('rain')}
    className={`px-4 py-2 rounded-lg shadow-md text-white font-semibold transition duration-300 ${
      windyLayer === 'rain' ? 'bg-green-600' : 'bg-green-400 hover:bg-green-500'
    }`}
  >
    Rain
  </button>
  <button
    onClick={() => handleLayerChange('temperature')}
    className={`px-4 py-2 rounded-lg shadow-md text-white font-semibold transition duration-300 ${
      windyLayer === 'temperature' ? 'bg-red-600' : 'bg-red-400 hover:bg-red-500'
    }`}
  >
    Temperature
  </button>
</div>

                </div>

                <div className="flex-1 relative">
                    <MapComponent
                        onMapLoad={setMapRef}
                        searchResults={searchResults}
                        onPlaceSelect={setSelectedPlace}
                        directionsResponse={directionsResponse}
                        mapType={mapType}
                        userLocation={userLocation}
                    />

                    {/* Include the WindyMap component */}
                    <WindyMap mapRef={mapRef} />
                    
                    <MapControls
                        onZoomIn={handleZoomIn}
                        onZoomOut={handleZoomOut}
                        onMapTypeChange={handleMapTypeChange}
                        onMyLocation={handleMyLocation}
                    />
                    {selectedPlace && (
                        <PlaceDetails
                            place={selectedPlace}
                            onClose={() => setSelectedPlace(null)}
                            setDestination={setDestination}
                        />
                    )}
                    <NavigationPanel
                        origin={origin}
                        destination={destination}
                        setOrigin={setOrigin}
                        setDestination={setDestination}
                        travelMode={travelMode}
                        setTravelMode={setTravelMode}
                        calculateRoute={calculateRoute}
                        routes={routes}
                        onRouteSelect={handleRouteSelect}
                        mapInstance={mapRef}
                        onSearchResults={setSearchResults}
                    />
                </div>
            </div>
        </div>
    );
}
