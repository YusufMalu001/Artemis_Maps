"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { SearchBar } from "@/components/search-bar"
import { CategoryFilters } from "@/components/category-filters"
import { MapComponent } from "@/components/map"
import { PlaceDetails } from "@/components/place-details"
import { useLoadScript } from "@react-google-maps/api"
import type google from "google-maps"

const libraries: ("places" | "drawing" | "geometry" | "localContext" | "visualization")[] = ["places"]

export function MapContainer() {
  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null)
  const [searchResults, setSearchResults] = useState<google.maps.places.PlaceResult[]>([])
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null)

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries,
  })

  if (loadError) {
    return <div>Error loading maps</div>
  }

  if (!isLoaded) {
    return <div>Loading maps</div>
  }

  return (
    <div className="h-screen w-full flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <SearchBar onSearchResults={setSearchResults} mapInstance={mapRef} />
        <CategoryFilters />
        <div className="flex-1 relative">
          <MapComponent onMapLoad={setMapRef} searchResults={searchResults} onPlaceSelect={setSelectedPlace} />
          {selectedPlace && <PlaceDetails place={selectedPlace} onClose={() => setSelectedPlace(null)} />}
        </div>
      </div>
    </div>
  )
}

