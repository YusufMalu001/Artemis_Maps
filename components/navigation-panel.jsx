import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Car, FootprintsIcon as Walk, Train, Plane, PlusCircleIcon, Trash2 } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";

export function NavigationPanel({
    origin,
    destination,
    setOrigin,
    setDestination,
    travelMode,
    setTravelMode,
    calculateRoute,
    routes,
    onRouteSelect,
    mapInstance,
    onSearchResults
}) {
    const travelModes = [
        { mode: "DRIVING", icon: Car },
        { mode: "WALKING", icon: Walk },
        { mode: "TRANSIT", icon: Train },
        { mode: "BICYCLING", icon: Plane },
    ];

    // For stops, we need to track both the refs and the values
    const [stops, setStops] = useState([]);
    const [stopSearchBoxes, setStopSearchBoxes] = useState([]);

    const destinationRef = useRef(null);
    const originRef = useRef(null);
    const originSearchBoxRef = useRef(null);
    const destinationSearchBoxRef = useRef(null);

    // Handle origin and destination search boxes
    useEffect(() => {
        if (!originRef.current || !destinationRef.current || !mapInstance || !window.google) return;

        const originSearchBox = new window.google.maps.places.SearchBox(originRef.current);
        const destinationSearchBox = new window.google.maps.places.SearchBox(destinationRef.current);

        originSearchBoxRef.current = originSearchBox;
        destinationSearchBoxRef.current = destinationSearchBox;

        originSearchBox.addListener("places_changed", () => {
            const places = originSearchBox.getPlaces();
            if (places && places.length > 0) {
                setOrigin(places[0].formatted_address || places[0].name);
                onSearchResults(places);
            }
        });

        destinationSearchBox.addListener("places_changed", () => {
            const places = destinationSearchBox.getPlaces();
            if (places && places.length > 0) {
                setDestination(places[0].formatted_address || places[0].name);
                onSearchResults(places);
            }
        });

        return () => {
            window.google.maps.event.clearInstanceListeners(originSearchBox);
            window.google.maps.event.clearInstanceListeners(destinationSearchBox);
        };
    }, [mapInstance, onSearchResults, setOrigin, setDestination]);

    // Handle the dynamic stops search boxes
    useEffect(() => {
        if (!mapInstance || !window.google) return;

        // Clean up old search boxes
        stopSearchBoxes.forEach(searchBox => {
            if (searchBox) {
                window.google.maps.event.clearInstanceListeners(searchBox);
            }
        });

        const newSearchBoxes = [];

        // Create new search boxes for each stop
        stops.forEach((stop, index) => {
            if (stop.ref.current) {
                const searchBox = new window.google.maps.places.SearchBox(stop.ref.current);

                searchBox.addListener("places_changed", () => {
                    const places = searchBox.getPlaces();
                    if (places && places.length > 0) {
                        // Update the stop's value
                        setStops(currentStops => 
                            currentStops.map((s, i) => 
                                i === index 
                                ? { ...s, value: places[0].formatted_address || places[0].name } 
                                : s
                            )
                        );
                        onSearchResults(places);
                    }
                });

                newSearchBoxes[index] = searchBox;
            }
        });

        setStopSearchBoxes(newSearchBoxes);

        // Cleanup function
        return () => {
            newSearchBoxes.forEach(searchBox => {
                if (searchBox) {
                    window.google.maps.event.clearInstanceListeners(searchBox);
                }
            });
        };
    }, [stops, mapInstance, onSearchResults]);

    // Add a new stop
    const addStop = () => {
        setStops(prevStops => [
            ...prevStops, 
            { ref: { current: null }, value: "" }
        ]);
    };

    // Remove a stop
    const removeStop = (index) => {
        setStops(prevStops => prevStops.filter((_, i) => i !== index));
        setStopSearchBoxes(prevBoxes => {
            const newBoxes = [...prevBoxes];
            if (newBoxes[index]) {
                window.google.maps.event.clearInstanceListeners(newBoxes[index]);
            }
            return newBoxes.filter((_, i) => i !== index);
        });
    };

    // Update a stop's value
    const updateStopValue = (index, value) => {
        setStops(prevStops => 
            prevStops.map((stop, i) => 
                i === index ? { ...stop, value } : stop
            )
        );
    };

    // Create a modified calculate route function that includes stops
    const calculateRouteWithStops = useCallback(() => {
        // Get all valid stop values
        const validStops = stops
            .filter(stop => stop.value && stop.value.trim() !== "")
            .map(stop => stop.value);

        // Check if we have origin and destination
        if (!origin || !destination) {
            alert("Please specify both origin and destination");
            return;
        }

        // If no valid stops, just calculate direct route
        if (validStops.length === 0) {
            calculateRoute();
            return;
        }

        // If using Google's DirectionsService, we can include waypoints
        // Assuming calculateRoute accepts waypoints parameter
        calculateRoute(validStops);

    }, [origin, destination, stops, calculateRoute]);

    return (
        <Card className="absolute left-6 bottom-4 w-96 bg-white shadow-lg">
        <CardContent className="p-4 space-y-4">
        <div className="flex flex-row gap-2">
        <Input
        className="w-5/6"
        type="text"
        placeholder="Origin"
        value={origin}
        ref={originRef}
        onChange={(e) => setOrigin(e.target.value)}
        />
        <Button 
        variant="ghost" 
        size="icon" 
        onClick={addStop}
        >
        <PlusCircleIcon size={24} />
        </Button>
        </div>

        {stops.map((stop, index) => (
            <div key={index} className="flex flex-row gap-2">
            <Input
            className="w-5/6"
            type="text"
            placeholder={`Stop ${index + 1}`}
            value={stop.value}
            ref={el => stop.ref.current = el}
            onChange={(e) => updateStopValue(index, e.target.value)}
            />
            <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => removeStop(index)}
            >
            <Trash2 size={20} />
            </Button>
            </div>
        ))}

        <Input
        className="w-5/6"
        type="text"
        placeholder="Destination"
        value={destination}
        ref={destinationRef}
        onChange={(e) => setDestination(e.target.value)}
        />

        <div className="flex justify-between">
        {travelModes.map(({ mode, icon: Icon }) => (
            <Button
            key={mode}
            variant={travelMode === mode ? "default" : "outline"}
            size="icon"
            onClick={() => setTravelMode(mode)}
            >
            <Icon className="h-5 w-5" />
            </Button>
        ))}
        </div>

        <Button className="w-full" onClick={calculateRouteWithStops}>
        Calculate Route
        </Button>

        {routes.length > 0 && (
            <div className="space-y-2">
            <h3 className="font-semibold">Route Options:</h3>
            {routes.map((route, index) => (
                <div key={index} className="text-sm">
                <Button
                variant="outline"
                className="w-full text-left justify-start"
                onClick={() => onRouteSelect(index)}
                >
                <div>
                <p>
                Route {index + 1}: {route.summary}
                </p>
                <p>Distance: {route.legs[0].distance.text}</p>
                <p>Duration: {route.legs[0].duration.text}</p>
                </div>
                </Button>
                </div>
            ))}
            </div>
        )}
        </CardContent>
        </Card>
    );
}
