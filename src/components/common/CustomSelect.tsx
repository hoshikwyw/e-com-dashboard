import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { X, XIcon } from "lucide-react";
import { cn } from "@/lib/utils"; // Make sure you have this utility

interface CustomSelectProps {
  label?: string;
  options: Array<{ value: string | number; label: string }>;
  required?: boolean;
  errorMessage?: string;
  placeholder?: string;
  value?: string | number;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  clearable?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
  required = false,
  errorMessage,
  placeholder,
  value,
  onValueChange,
  disabled,
  className,
  clearable,
}) => {
  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onValueChange?.("");
  };

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <Select
        value={value?.toString()}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <SelectTrigger className="w-full group">
          <div className="flex-1 flex items-center gap-2 overflow-hidden">
            <SelectValue placeholder={placeholder || "Select an option"}>
              {value && (
                <span className="text-primary-700 bg-primary-100 dark:text-primary-300 py-1 px-[6px] rounded-[4px] flex items-center gap-1">
                  {
                    options.find(
                      (opt) => opt.value.toString() === value.toString()
                    )?.label
                  }
                  <X color="#B71818" onClick={handleClear} />
                </span>
              )}
            </SelectValue>
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem
                key={option.value.toString()}
                value={option.value.toString()}
                className="data-[state=checked]:text-primary-700 data-[state=checked]:font-medium"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default CustomSelect;
