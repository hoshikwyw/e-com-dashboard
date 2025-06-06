import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomCheckboxProps
  extends React.ComponentProps<typeof CheckboxPrimitive.Root> {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "filled";
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  indicatorClassName?: string;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CustomCheckboxProps
>(
  (
    {
      className,
      size = "md",
      variant = "default",
      rounded = "sm",
      indicatorClassName,
      ...props
    },
    ref
  ) => {
    return (
      <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
          "peer",
          "border border-input",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "transition-colors duration-200 ease-in-out",
          "shadow-sm",
          // Size variants
          {
            "h-4 w-4": size === "sm",
            "h-5 w-5": size === "md",
            "h-6 w-6": size === "lg",
          },
          // Rounded variants
          {
            "rounded-none": rounded === "none",
            "rounded-sm": rounded === "sm",
            "rounded-md": rounded === "md",
            "rounded-lg": rounded === "lg",
            "rounded-full": rounded === "full",
          },
          // Color variants
          {
            // Default
            "bg-background data-[state=checked]:bg-primary data-[state=checked]:border-primary":
              variant === "default",
            // Outline
            "bg-transparent data-[state=checked]:border-primary data-[state=checked]:text-primary":
              variant === "outline",
            // Filled
            "border-black-500 text-black-500 data-[state=checked]:bg-primary-700 data-[state=checked]:text-background data-[state=checked]:border-primary-700":
              variant === "filled",
          },
          className
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          className={cn(
            "flex items-center justify-center", // Changed to center content
            "w-full h-full", // Ensure it takes full space
            indicatorClassName
          )}
        >
          <Check
            className={cn(
              // Make the icon size slightly smaller than the container
              {
                "h-3 w-3": size === "sm",
                "h-4 w-4": size === "md",
                "h-5 w-5": size === "lg",
              },
              // Ensure the icon itself is centered
              "m-auto" // This will center the icon within its container
            )}
          />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );
  }
);

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
