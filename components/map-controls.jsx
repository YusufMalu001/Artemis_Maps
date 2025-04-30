import { Button } from "@/components/ui/button";
import { Plus, Minus, MapPin, Satellite, Map, Thermometer } from "lucide-react";

export function MapControls({
  onZoomIn,
  onZoomOut,
  onMapTypeChange,
  onMyLocation,
}) {
  // bottom: 54px; right: 40px;
  return (
    <div className="absolute bottom-[74px] right-2 flex flex-col gap-2">
      <Button
        variant="default"
        size="icon"
        className="rounded-full bg-white hover:bg-gray-100 text-black shadow-md"
        onClick={onZoomIn}
      >
        <Plus className="h-5 w-5" />
      </Button>
      <Button
        variant="default"
        size="icon"
        className="rounded-full bg-white hover:bg-gray-100 text-black shadow-md"
        onClick={onZoomOut}
      >
        <Minus className="h-5 w-5" />
      </Button>
      <Button
        variant="default"
        size="icon"
        className="rounded-full bg-white hover:bg-gray-100 text-black shadow-md"
        onClick={() => onMapTypeChange("roadmap")}
      >
        <Map className="h-5 w-5" />
      </Button>
      <Button
        variant="default"
        size="icon"
        className="rounded-full bg-white hover:bg-gray-100 text-black shadow-md"
        onClick={() => onMapTypeChange("satellite")}
      >
        <Satellite className="h-5 w-5" />
      </Button>
      <Button
        variant="default"
        size="icon"
        className="rounded-full bg-white hover:bg-gray-100 text-black shadow-md"
        onClick={() => onMapTypeChange("heatmap")}
      >
        <Thermometer className="h-5 w-5" />
      </Button>
      <Button
        variant="default"
        size="icon"
        className="rounded-full bg-white hover:bg-gray-100 text-black shadow-md"
        onClick={onMyLocation}
      >
        <MapPin className="h-5 w-5" />
      </Button>
    </div>
  );
}
