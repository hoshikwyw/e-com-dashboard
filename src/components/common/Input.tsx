import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  asChild?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, asChild = false, leftIcon, rightIcon, ...props },
    ref
  ) => {
    const Comp = asChild ? "input" : "input";
    return (
      <div className="relative flex items-center">
        {leftIcon && (
          <span className="absolute left-3 text-muted-foreground">
            {leftIcon}
          </span>
        )}
        <Comp
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 outline-none",
            leftIcon ? "pl-10" : "",
            className
          )}
          ref={ref}
          {...props}
        />
        {rightIcon && (
          <span className="absolute right-0 text-muted-foreground">
            {rightIcon}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
