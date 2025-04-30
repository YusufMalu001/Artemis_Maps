// components/WindyMap.tsx

import { useEffect, useRef } from "react";

const WindyMap = ({ mapRef }) => {
  const windyMapRef = useRef(null);

  useEffect(() => {
    if (window.Windy && mapRef) {
      const options = {
        key: process.env.NEXT_PUBLIC_WINDY_API_KEY, // Your Windy API key here
        lat: 40.730610, // Default Latitude
        lon: -73.935242, // Default Longitude
        zoom: 5, // Default zoom level
      };

      const windyMap = window.Windy(options, (windyAPI) => {
        windyAPI.addTo(mapRef); // Add Windy layers to your Google map instance
        windyAPI.setLayer('wind'); // Default layer to show wind data

        // Example: Add more layers, such as precipitation
        windyAPI.setLayer('rain');
      });

      windyMapRef.current = windyMap;
    }
  }, [mapRef]);

  return <div ref={windyMapRef} style={{ height: "100%", width: "100%" }} />;
};

export default WindyMap;
