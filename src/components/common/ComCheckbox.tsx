import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface ComCheckboxProps {
  id: string;
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
}

const ComCheckbox = React.forwardRef<HTMLButtonElement, ComCheckboxProps>(
  (
    {
      id,
      label,
      checked = false,
      onChange,
      disabled = false,
      className = "",
      labelClassName = "",
    },
    ref
  ) => {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <Checkbox
          size="lg"
          variant="filled"
          id={id}
          checked={checked}
          onCheckedChange={onChange}
          disabled={disabled}
          ref={ref}
        />
        <label
          htmlFor={id}
          className={`text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${labelClassName} ${
            checked ? "text-primary-700" : "text-muted-foreground"
          }`}
        >
          {label}
        </label>
      </div>
    );
  }
);

ComCheckbox.displayName = "ComCheckbox";

export { ComCheckbox };
