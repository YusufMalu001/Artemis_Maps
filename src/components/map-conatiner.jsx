"use client"

import { useState } from "react"
import { Sidebar } from "@/src/app/components/sidebar"
import { SearchBar } from "@/src/app/components/search-bar"
import { CategoryFilters } from "@/src/app/components/category-filters"
import { MapComponent } from "@/src/app/components/map"
import { PlaceDetails } from "@/src/app/components/place-details"
import { useLoadScript } from "@react-google-maps/api"

const libraries = ["places"]

export function MapContainer() {
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [searchResults, setSearchResults] = useState([])
  const [mapRef, setMapRef] = useState(null)

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
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
        <div className="absolute top-4 left-20 right-4 z-10">
          <SearchBar onSearchResults={setSearchResults} mapInstance={mapRef} />
          <CategoryFilters />
        </div>
        <div className="flex-1 relative">
          <MapComponent onMapLoad={setMapRef} searchResults={searchResults} onPlaceSelect={setSelectedPlace} />
          {selectedPlace && <PlaceDetails place={selectedPlace} onClose={() => setSelectedPlace(null)} />}
        </div>
      </div>
    </div>
  )
}

