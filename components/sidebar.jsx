import { Button } from "@/components/ui/button";
import { Menu, Bookmark, Clock, Settings, HelpCircle } from "lucide-react";

export function Sidebar() {
  return (
    <div className="w-16 bg-white shadow-md flex flex-col items-center py-4 gap-6">
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
      <div className="mt-auto flex flex-col gap-4">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Settings className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <HelpCircle className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
