import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Navigation, Phone, Globe, Star } from "lucide-react";

export function PlaceDetails({ place, onClose }) {
  return (
    <Card className="absolute left-4 bottom-4 w-80">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">{place.name}</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {place.rating && (
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{place.rating}</span>
            {place.user_ratings_total && (
              <span className="text-sm text-muted-foreground">
                ({place.user_ratings_total} reviews)
              </span>
            )}
          </div>
        )}
        {place.formatted_address && (
          <div className="flex items-start gap-2">
            <Navigation className="h-4 w-4 mt-1" />
            <span>{place.formatted_address}</span>
          </div>
        )}
        {place.formatted_phone_number && (
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span>{place.formatted_phone_number}</span>
          </div>
        )}
        {place.website && (
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
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
      </CardContent>
    </Card>
  );
}
