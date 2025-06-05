// components/filter-button.tsx
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface FilterButtonProps {
  children: React.ReactNode;
  selectedCount?: number;
  buttonVariant?: "outline" | "default" | "ghost" | "secondary";
  buttonClassName?: string;
  popoverClassName?: string;
  isActive?: boolean; // Add this new prop
  onApply?: () => void;
  onCancel?: () => void;
  onReset?: () => void;
}

export function FilterButton({
  children,
  selectedCount = 0,
  buttonClassName = "",
  popoverClassName = "w-80 p-4",
  isActive = false, // Default to false
  onApply,
  onCancel,
  onReset,
}: FilterButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleApply = () => {
    onApply?.();
    setIsOpen(false);
  };

  const handleCancel = () => {
    onCancel?.();
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
        
          variant="tertiary"
          className={cn(
            "gap-2",
            buttonClassName,
            isOpen &&
              "bg-transparent border border-primary-500 text-primary-500", // Style when open
            isActive && " " // Style when active
          )}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {selectedCount > 0 && (
            <span className="ml-1 h-5 w-5 rounded-full bg-primary-500 text-xs flex items-center justify-center text-background">
              {selectedCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn("space-y-4", popoverClassName)}
        align="start"
      >
        <div className="flex justify-between items-center">
          <h4 className="font-medium leading-none">Filters</h4>
          <Button
            variant="link"
            size="sm"
            className={`h-8 p-2 ${
              selectedCount > 0 ? "text-primary-500" : " text-black-500"
            } `}
            onClick={onReset}
          >
            <X className="h-4 w-4" />
            <span className=" underline">Reset</span>
          </Button>
        </div>

        {children}

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={handleCancel}>
            Cancel
          </Button>
          <Button size="sm" onClick={handleApply}>
            Apply Filters
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
