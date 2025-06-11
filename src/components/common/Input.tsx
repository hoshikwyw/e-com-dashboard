import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  asChild?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  label?: string;
  variant?: "default" | "search";
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
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? "input" : "input";

    const inputClass = cn(
      "flex h-10 w-full rounded-md border bg-gray-25 px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50 outline-none ",
      leftIcon ? "pl-10" : "",
      variant === "search" ? "border-transparent bg-background" : "border-input",
      disabled && "bg-gray-100",
      className
    );

    return (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        {label && (
          <label
            htmlFor={props.id}
            className={cn(
              "text-sm text-black-600 leading-none",
              disabled && "text-muted-foreground"
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
                disabled ? "text-muted-foreground" : "text-muted-foreground"
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
          />
          {rightIcon && (
            <span
              className={cn(
                "absolute right-3",
                disabled ? "text-muted-foreground" : "text-muted-foreground"
              )}
            >
              {rightIcon}
            </span>
          )}
        </div>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
