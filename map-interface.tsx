"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  Search,
  Menu,
  MapPin,
  Clock,
  Bookmark,
  MapIcon,
  UtensilsCrossed,
  Building2,
  Palmtree,
  Building,
  Bus,
  ParkingMeterIcon as Parking,
} from "lucide-react"

export default function MapInterface() {
  return (
    <div className="h-screen w-full flex">
      {/* Sidebar */}
      <div className="w-16 bg-white border-r flex flex-col items-center py-4 gap-6">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex flex-col gap-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bookmark className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Clock className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Search Bar */}
        <div className="p-2 bg-white shadow-sm">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Menu className="h-5 w-5 text-gray-400" />
            </div>
            <Input
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

        {/* Category Filters */}
        <ScrollArea className="bg-white border-b">
          <div className="flex p-2 gap-2">
            <Button variant="outline" className="rounded-full flex items-center gap-2 whitespace-nowrap">
              <UtensilsCrossed className="h-4 w-4" />
              Restaurants
            </Button>
            <Button variant="outline" className="rounded-full flex items-center gap-2 whitespace-nowrap">
              <Building2 className="h-4 w-4" />
              Hotels
            </Button>
            <Button variant="outline" className="rounded-full flex items-center gap-2 whitespace-nowrap">
              <Palmtree className="h-4 w-4" />
              Things to do
            </Button>
            <Button variant="outline" className="rounded-full flex items-center gap-2 whitespace-nowrap">
              <Building className="h-4 w-4" />
              Museums
            </Button>
            <Button variant="outline" className="rounded-full flex items-center gap-2 whitespace-nowrap">
              <Bus className="h-4 w-4" />
              Transit
            </Button>
            <Button variant="outline" className="rounded-full flex items-center gap-2 whitespace-nowrap">
              <Parking className="h-4 w-4" />
              Parking
            </Button>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {/* Map Area (Placeholder) */}
        <div className="flex-1 bg-[#e5e3df] relative">
          <div className="absolute bottom-6 right-6 flex flex-col gap-2">
            <Button variant="default" size="icon" className="rounded-full bg-white hover:bg-gray-100 text-black">
              <MapIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

