"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  UtensilsCrossed,
  Building2,
  Palmtree,
  Building,
  Bus,
  ParkingMeterIcon as Parking,
} from "lucide-react";

const categories = [
  { name: "Restaurants", icon: UtensilsCrossed },
  { name: "Hotels", icon: Building2 },
  { name: "Things to do", icon: Palmtree },
  { name: "Museums", icon: Building },
  { name: "Transit", icon: Bus },
  { name: "Parking", icon: Parking },
];

export function CategoryFilters() {
  return (
    <ScrollArea className="w-full mt-2">
      <div className="flex space-x-2 p-1">
        {categories.map((category) => (
          <Button
            key={category.name}
            variant="outline"
            className="flex items-center space-x-2 whitespace-nowrap bg-white hover:bg-gray-100 text-gray-700"
          >
            <category.icon className="h-4 w-4" />
            <span>{category.name}</span>
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
