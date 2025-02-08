"use client"

import { useCallback, useEffect, useRef } from "react"
import { GoogleMap, Marker } from "@react-google-maps/api"
import { google } from "@react-google-maps/api"

const mapContainerStyle = {
  width: "100%",
  height: "100%",
}

const defaultCenter = {
  lat: 40.7128,
  lng: -74.006,
}

interface MapComponentProps {
  onMapLoad: (map: google.maps.Map) => void
  searchResults: google.maps.places.PlaceResult[]
  onPlaceSelect: (place: google.maps.places.PlaceResult) => void
}

export function MapComponent({ onMapLoad, searchResults, onPlaceSelect }: MapComponentProps) {
  const mapRef = useRef<google.maps.Map>()

  const handleMapLoad = useCallback(
    (map: google.maps.Map) => {
      mapRef.current = map
      onMapLoad(map)
    },
    [onMapLoad],
  )

  useEffect(() => {
    if (searchResults.length > 0 && mapRef.current) {
      const bounds = new google.maps.LatLngBounds()
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

