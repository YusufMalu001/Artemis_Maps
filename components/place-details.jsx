import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Navigation, Phone, Globe, Star, Clock, Info } from "lucide-react";

export function PlaceDetails({ place, onClose }) {
  return (
    <Card className="absolute left-20 top-24 w-96 bg-white shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">{place.name}</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {place.rating && (
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-bold">{place.rating}</span>
            {place.user_ratings_total && (
              <span className="text-sm text-gray-500">
                ({place.user_ratings_total} reviews)
              </span>
            )}
          </div>
        )}
        {place.formatted_address && (
          <div className="flex items-start gap-2">
            <Navigation className="h-5 w-5 mt-1 text-gray-500" />
            <span>{place.formatted_address}</span>
          </div>
        )}
        {place.formatted_phone_number && (
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-gray-500" />
            <span>{place.formatted_phone_number}</span>
          </div>
        )}
        {place.opening_hours && (
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-gray-500" />
            <span>{place.opening_hours.open_now ? "Open" : "Closed"}</span>
          </div>
        )}
        {place.website && (
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-gray-500" />
            <a
              href={place.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Website
            </a>
          </div>
        )}
        <Button className="w-full bg-blue-500 text-white hover:bg-blue-600">
          <Navigation className="h-5 w-5 mr-2" />
          Directions
        </Button>
        <div className="flex justify-between">
          <Button variant="outline" className="flex-1 mr-2">
            <Phone className="h-5 w-5 mr-2" />
            Call
          </Button>
          <Button variant="outline" className="flex-1 ml-2">
            <Info className="h-5 w-5 mr-2" />
            More info
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
