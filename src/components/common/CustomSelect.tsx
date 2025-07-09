import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { XCircle, ChevronDown, WandSparkles, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";

const multiSelectVariants = cva(
  "m-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300",
  {
    variants: {
      variant: {
        default:
          "border-foreground/10 text-foreground bg-card hover:bg-card/80",
        secondary:
          "border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        inverted: "bg-background text-foreground border-border hover:bg-accent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface MultiSelectProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof multiSelectVariants> {
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  onValueChange: (value: string[]) => void;
  placeholder?: string;
  animation?: number;
  maxCount?: number;
  modalPopover?: boolean;
  asChild?: boolean;
  className?: string;
  label?: string;
  single?: boolean;
  error?: string | boolean; // Added error prop
}

export const CustomSelect = React.forwardRef<
  HTMLButtonElement,
  MultiSelectProps
>(
  (
    {
      options,
      onValueChange,
      variant,
      defaultValue = [],
      placeholder = "Select options",
      animation = 0,
      maxCount = 3,
      modalPopover = false,
      label,
      className,
      single = false,
      error,
      ...props
    },
    ref
  ) => {
    const [selectedValues, setSelectedValues] = React.useState<any>(
      single ? (defaultValue.length > 0 ? [defaultValue[0]] : []) : defaultValue
    );
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const [isAnimating, setIsAnimating] = React.useState(false);

    const toggleOption = (option: string) => {
      let newSelectedValues;
      if (single) {
        newSelectedValues = selectedValues.includes(option) ? [] : [option];
      } else {
        newSelectedValues = selectedValues.includes(option)
          ? selectedValues.filter((value: any) => value !== option)
          : [...selectedValues, option];
      }
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);

      if (single) {
        setIsPopoverOpen(false);
      }
    };

    const handleTogglePopover = () => {
      setIsPopoverOpen((prev) => !prev);
    };

    const clearExtraOptions = () => {
      const newSelectedValues = selectedValues.slice(0, maxCount);
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    };

    const clearSelection = () => {
      setSelectedValues([]);
      onValueChange([]);
    };

    return (
      <div className="grid w-full items-center gap-1.5">
        {label && (
          <label
            className={cn(
              "text-sm text-black-600 leading-none",
              error && "text-red-500" // Red label when error exists
            )}
          >
            {label}
          </label>
        )}
        <Popover
          open={isPopoverOpen}
          onOpenChange={setIsPopoverOpen}
          modal={modalPopover}
        >
          <PopoverTrigger asChild>
            <Button
              ref={ref}
              {...props}
              onClick={handleTogglePopover}
              className={cn(
                "flex w-full rounded-md border h-10 items-center justify-between bg-gray-25 hover:bg-inherit [&_svg]:pointer-events-auto",
                isPopoverOpen ? "border-primary-700" : "",
                error ? "border-red-500 focus:border-red-500" : "", // Red border when error exists
                className
              )}
              aria-invalid={!!error} // Accessibility improvement
            >
              {selectedValues.length > 0 ? (
                <div className="flex justify-between items-center w-full">
                  <div className="flex flex-wrap items-center gap-1">
                    {selectedValues.slice(0, maxCount).map((value: any) => {
                      const option = options.find((o) => o.value === value);
                      const IconComponent = option?.icon;
                      return (
                        <Badge
                          key={value}
                          className={cn(
                            isAnimating ? "animate-bounce" : "",
                            multiSelectVariants({ variant }),
                            "flex items-center px-2 py-1 bg-primary-100 text-primary-700 border-none",
                            error && "bg-red-100 text-red-700" // Red badge when error exists
                          )}
                          style={{ animationDuration: `${animation}s` }}
                        >
                          {IconComponent && (
                            <IconComponent className="h-4 w-4 mr-2" />
                          )}
                          <span className="whitespace-nowrap">
                            {option?.label}
                          </span>
                          {!single && (
                            <XCircle
                              className="ml-2 h-4 w-4 cursor-pointer"
                              onClick={(event) => {
                                event.stopPropagation();
                                toggleOption(value);
                              }}
                            />
                          )}
                        </Badge>
                      );
                    })}
                    {!single && selectedValues.length > maxCount && (
                      <Badge
                        className={cn(
                          "flex items-center px-2 py-1",
                          isAnimating ? "animate-bounce" : "",
                          multiSelectVariants({ variant }),
                          error && "bg-red-100 text-red-700" // Red badge when error exists
                        )}
                        style={{ animationDuration: `${animation}s` }}
                      >
                        {`+${selectedValues.length - maxCount}`}
                        <XCircle
                          className="ml-2 h-4 w-4 cursor-pointer"
                          onClick={(event) => {
                            event.stopPropagation();
                            clearExtraOptions();
                          }}
                        />
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center">
                    {selectedValues.length > 0 && single && (
                      <XCircle
                        className={cn(
                          "h-4 w-4 cursor-pointer text-muted-foreground mr-2",
                          error && "text-red-500" // Red icon when error exists
                        )}
                        onClick={(event) => {
                          event.stopPropagation();
                          clearSelection();
                        }}
                      />
                    )}
                    <ChevronDown
                      className={cn(
                        "h-4 cursor-pointer text-muted-foreground",
                        error && "text-red-500" // Red icon when error exists
                      )}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between w-full mx-auto">
                  <span
                    className={cn(
                      "text-sm text-muted-foreground mx-3",
                      error && "text-red-500" // Red placeholder when error exists
                    )}
                  >
                    {placeholder}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-4 cursor-pointer text-muted-foreground mx-2",
                      error && "text-red-500" // Red icon when error exists
                    )}
                  />
                </div>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="p-0"
            align="start"
            onEscapeKeyDown={() => setIsPopoverOpen(false)}
          >
            <Command className="w-full">
              <CommandList>
                <CommandGroup>
                  {options.map((option) => {
                    const isSelected = selectedValues.includes(option.value);
                    return (
                      <CommandItem
                        key={option.value}
                        onSelect={() => toggleOption(option.value)}
                        className="cursor-pointer flex items-center justify-between w-full"
                      >
                        <div className="flex items-center">
                          {option.icon && (
                            <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                          )}
                          <span
                            className={
                              isSelected ? "text-primary-700" : "text-gray-400"
                            }
                          >
                            {option.label}
                          </span>
                        </div>
                        {isSelected && (
                          <Check className="h-4 w-4 text-primary-700" />
                        )}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
                <CommandSeparator />
              </CommandList>
            </Command>
          </PopoverContent>
          {/* Error message display */}
          {typeof error === "string" && error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
          {!single && animation > 0 && selectedValues.length > 0 && (
            <WandSparkles
              className={cn(
                "cursor-pointer my-2 text-foreground bg-background w-3 h-3",
                isAnimating ? "" : "text-muted-foreground",
                error && "text-red-500" // Red icon when error exists
              )}
              onClick={() => setIsAnimating(!isAnimating)}
            />
          )}
        </Popover>
      </div>
    );
  }
);

CustomSelect.displayName = "CustomSelect";
