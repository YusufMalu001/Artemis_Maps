"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  HeatmapLayer,
} from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 40.7128,
  lng: -74.006,
};

const mapStyles = [
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "transit",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
];

export function MapComponent({
  onMapLoad,
  searchResults,
  onPlaceSelect,
  directionsResponse,
  mapType,
  userLocation,
}) {
  const mapRef = useRef(null);

  const handleMapLoad = useCallback(
    (map) => {
      mapRef.current = map;
      onMapLoad(map);
    },
    [onMapLoad],
  );

  useEffect(() => {
    if (searchResults.length > 0 && mapRef.current) {
      const bounds = new window.google.maps.LatLngBounds();
      searchResults.forEach((place) => {
        if (place.geometry?.location) {
          bounds.extend(place.geometry.location);
        }
      });
      mapRef.current.fitBounds(bounds);
    }
  }, [searchResults]);

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={12}
      center={defaultCenter}
      onLoad={handleMapLoad}
      options={{
        styles: mapStyles,
        mapTypeId: mapType,
        zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      }}
    >
      {searchResults.map(
        (place, index) =>
          place.geometry?.location && (
            <Marker
              key={`${place.place_id}-${index}`}
              position={place.geometry.location}
              onClick={() => onPlaceSelect(place)}
            />
          ),
      )}
      {directionsResponse && (
        <DirectionsRenderer
          directions={directionsResponse}
          options={{
            suppressMarkers: true,
            polylineOptions: {
              strokeColor: "#4285F4",
              strokeWeight: 5,
            },
          }}
        />
      )}
      {userLocation && (
        <Marker
          position={userLocation}
          icon={{
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 7,
            fillColor: "#4285F4",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 2,
          }}
        />
      )}
      {mapType === "heatmap" && <HeatmapLayer data={getHeatmapData()} />}
    </GoogleMap>
  );
}

function getHeatmapData() {
  // This is a placeholder function. In a real application, you would fetch this data from your backend or an API.
  return [
    { location: new window.google.maps.LatLng(40.7128, -74.006), weight: 5 },
    { location: new window.google.maps.LatLng(40.7148, -74.006), weight: 2 },
    { location: new window.google.maps.LatLng(40.7168, -74.006), weight: 8 },
  ];
}
