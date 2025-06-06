// FilterGroup.tsx
import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { ComCheckbox } from "./ComCheckbox";

interface FilterGroupProps {
  label: string;
  options: { value: string; label: string }[];
  selectedValues: string[];
  onChange: (value: string) => void;
}

export default function FilterGroup({
  label,
  options,
  selectedValues,
  onChange,
}: FilterGroupProps) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleCollapse = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="w-full bg-white border border-gray-300 rounded-md shadow-sm">
      <button
        className="w-full text-left focus:outline-none"
        type="button"
        onClick={toggleCollapse}
      >
        <div className="flex justify-between items-center px-4 py-2 bg-gray-100 border-b border-gray-200 rounded-t-md">
          <span className="text-gray-800 font-medium">{label}</span>
          <ChevronDownIcon
            className={`text-gray-500 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      <div
        className={` overflow-y-auto custom-scrollbar transition-all duration-200 ${
          isOpen ? "max-h-60" : "max-h-0"
        }`}
      >
        <div className="p-3 space-y-1">
          {options.map((option) => (
            <div key={option.value} className="py-1">
              <ComCheckbox
                id={option.value}
                label={option.label}
                checked={selectedValues.includes(option.value)}
                onChange={() => onChange(option.value)}
                className="hover:bg-gray-50 px-2 py-1 rounded"
                labelClassName={
                  selectedValues.includes(option.value) ? "font-medium" : ""
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
