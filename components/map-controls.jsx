import { Button } from "@/components/ui/button";
import { Plus, Minus, Layers } from "lucide-react";

export function MapControls({ onZoomIn, onZoomOut, onLayerToggle }) {
  return (
    <div className="absolute bottom-6 right-6 flex flex-col gap-2">
      <Button
        variant="default"
        size="icon"
        className="rounded-full bg-white hover:bg-gray-100 text-black"
        onClick={onZoomIn}
      >
        <Plus className="h-5 w-5" />
      </Button>
      <Button
        variant="default"
        size="icon"
        className="rounded-full bg-white hover:bg-gray-100 text-black"
        onClick={onZoomOut}
      >
        <Minus className="h-5 w-5" />
      </Button>
      <Button
        variant="default"
        size="icon"
        className="rounded-full bg-white hover:bg-gray-100 text-black"
        onClick={onLayerToggle}
      >
        <Layers className="h-5 w-5" />
      </Button>
    </div>
  );
}


