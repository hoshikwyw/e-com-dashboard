import * as React from "react";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  fromDate?: Date;
  toDate?: Date;
  showTimePicker?: boolean;
}

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      value,
      onChange,
      placeholder = "Pick a date",
      className,
      disabled = false,
      fromDate,
      toDate,
      showTimePicker = false,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <Popover onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="tertiary"
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground",
              isOpen &&
                "bg-transparent border border-primary-500 text-black-500",

              className
            )}
            disabled={disabled}
          >
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              {value ? (
                <>
                  <span>{format(value, "PPP")}</span>
                  {showTimePicker && (
                    <span className="ml-2 flex items-center gap-1 rounded-full bg-primary-foreground/10 px-2 py-1 text-xs">
                      <Clock className="h-3 w-3" />
                      {format(value, "h:mm a")}
                    </span>
                  )}
                </>
              ) : (
                <span>{placeholder}</span>
              )}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" ref={ref}>
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            disabled={disabled}
            fromDate={fromDate}
            toDate={toDate}
            initialFocus
          />
          {showTimePicker && (
            <div className="border-t border-border p-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <input
                  type="time"
                  value={value ? format(value, "HH:mm") : ""}
                  onChange={(e) => {
                    if (!value) return;
                    const [hours, minutes] = e.target.value.split(":");
                    const newDate = new Date(value);
                    newDate.setHours(parseInt(hours, 10));
                    newDate.setMinutes(parseInt(minutes, 10));
                    onChange?.(newDate);
                  }}
                  className="w-full rounded border border-border p-2 focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
    );
  }
);

DatePicker.displayName = "DatePicker";

export { DatePicker };
