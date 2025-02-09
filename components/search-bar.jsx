"use client";

import { useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Menu, MapPin } from "lucide-react";

export function SearchBar({ onSearchResults, mapInstance }) {
  const searchBoxRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!inputRef.current || !mapInstance || !window.google) return;

    const searchBox = new window.google.maps.places.SearchBox(inputRef.current);
    searchBoxRef.current = searchBox;

    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
      if (places) {
        onSearchResults(places);
      }
    });

    return () => {
      window.google.maps.event.clearInstanceListeners(searchBox);
    };
  }, [mapInstance, onSearchResults]);

  return (
    <div className="p-2 bg-white shadow-sm">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Menu className="h-5 w-5 text-gray-400" />
        </div>
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search Google Maps"
          className="pl-10 pr-16 py-2.5 w-full rounded-lg border shadow-sm"
        />
        <div className="absolute inset-y-0 right-0 flex items-center gap-2 pr-3">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MapPin className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

