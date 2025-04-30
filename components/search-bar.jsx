"use client";

import { useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Menu, Mic } from "lucide-react";

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
    <div className="bg-white shadow-md rounded-md">
      <div className="relative flex items-center">
        <Button variant="ghost" size="icon" className="absolute left-2">
          <Menu className="h-5 w-5 text-gray-400" />
        </Button>
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search Google Maps"
          className="pl-12 pr-24 py-2.5 w-full rounded-md border-none focus:ring-0"
        />
        <div className="absolute right-2 flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-gray-400">
            <Mic className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bg-blue-500 text-white rounded-full"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
