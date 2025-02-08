"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { UtensilsCrossed, Building2, Palmtree, Building, Bus, ParkingMeterIcon as Parking } from "lucide-react"

const categories = [
  { name: "Restaurants", icon: UtensilsCrossed },
  { name: "Hotels", icon: Building2 },
  { name: "Things to do", icon: Palmtree },
  { name: "Museums", icon: Building },
  { name: "Transit", icon: Bus },
  { name: "Parking", icon: Parking },
]

export function CategoryFilters() {
  return (
    <ScrollArea className="bg-white border-b">
      <div className="flex p-2 gap-2">
        {categories.map((category) => (
          <Button
            key={category.name}
            variant="outline"
            className="rounded-full flex items-center gap-2 whitespace-nowrap"
          >
            <category.icon className="h-4 w-4" />
            {category.name}
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

