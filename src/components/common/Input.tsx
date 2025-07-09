import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  asChild?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  label?: string;
  variant?: "default" | "search";
  error?: string | boolean; // Can be a string message or boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      asChild = false,
      leftIcon,
      rightIcon,
      label,
      disabled,
      variant = "default",
      error,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? "input" : "input";

    const inputClass = cn(
      "flex h-10 w-full rounded-md border bg-gray-25 px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50 outline-none",
      leftIcon ? "pl-10" : "",
      variant === "search"
        ? "border-transparent bg-background"
        : "border-input",
      disabled && "bg-gray-100",
      error && "border-red-500 focus:border-red-500", // Add red border when error exists
      className
    );

    return (
      <div className="grid w-full items-center gap-1.5">
        {label && (
          <label
            htmlFor={props.id}
            className={cn(
              "text-sm text-black-600 leading-none",
              disabled && "text-muted-foreground",
              error && "text-red-500" // Make label red when error exists
            )}
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <span
              className={cn(
                "absolute left-3",
                disabled ? "text-muted-foreground" : "text-muted-foreground",
                error && "text-red-500" // Make icon red when error exists
              )}
            >
              {leftIcon}
            </span>
          )}
          <Comp
            type={type}
            className={inputClass}
            ref={ref}
            disabled={disabled}
            {...props}
            aria-invalid={!!error} // Accessibility improvement
          />
          {rightIcon && (
            <span
              className={cn(
                "absolute right-3",
                disabled ? "text-muted-foreground" : "text-muted-foreground",
                error && "text-red-500" // Make icon red when error exists
              )}
            >
              {rightIcon}
            </span>
          )}
        </div>
        {/* Error message display */}
        {typeof error === "string" && error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };