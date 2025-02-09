"use client"

import { useCallback, useEffect, useRef } from "react"
import { GoogleMap, Marker } from "@react-google-maps/api"

const mapContainerStyle = {
  width: "100%",
  height: "100%",
}

const defaultCenter = {
  lat: 40.7128,
  lng: -74.006,
}

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
]

export function MapComponent({ onMapLoad, searchResults, onPlaceSelect }) {
  const mapRef = useRef(null)

  const handleMapLoad = useCallback(
    (map) => {
      mapRef.current = map
      onMapLoad(map)
    },
    [onMapLoad],
  )

  useEffect(() => {
    if (searchResults.length > 0 && mapRef.current) {
      const bounds = new window.google.maps.LatLngBounds()
      searchResults.forEach((place) => {
        if (place.geometry?.location) {
          bounds.extend(place.geometry.location)
        }
      })
      mapRef.current.fitBounds(bounds)
    }
  }, [searchResults])

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={12}
      center={defaultCenter}
      onLoad={handleMapLoad}
      options={{
        styles: mapStyles,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: true,
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
    </GoogleMap>
  )
}

