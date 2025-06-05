import * as Popover from "@radix-ui/react-popover";
import { useState } from "react";
import clsx from "clsx";
import { CheckIcon, ChevronDownIcon } from "lucide-react";

const options = [
  { value: "option1", label: "Option Text Here" },
  { value: "option2", label: "Option Text Here" },
  { value: "option3", label: "Option Text Here" },
  { value: "option4", label: "Option Text Here" },
];

export default function FilterGroup() {
  const [selected, setSelected] = useState<string[]>(["option2", "option3"]);

  const toggleSelection = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          className="w-full text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none"
          type="button"
        >
          <div className="flex justify-between items-center px-4 py-2 bg-gray-100 border-b border-gray-200 rounded-t-md">
            <span className="text-gray-800 font-medium">Filter Group</span>
            <ChevronDownIcon className="text-gray-500" />
          </div>
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          align="start"
          className="bg-white border border-gray-300 rounded-b-md shadow-md p-3 w-[var(--radix-popover-trigger-width)] max-h-60 overflow-y-auto z-50"
          sideOffset={4}
        >
          {options.map((opt) => {
            const isSelected = selected.includes(opt.value);
            return (
              <div
                key={opt.value}
                className="flex items-center gap-2 py-2 cursor-pointer"
                onClick={() => toggleSelection(opt.value)}
              >
                <div
                  className={clsx(
                    "w-5 h-5 border rounded flex items-center justify-center",
                    isSelected ? "border-red-500" : "border-gray-300"
                  )}
                >
                  {isSelected && <CheckIcon className="text-red-500 w-4 h-4" />}
                </div>
                <span
                  className={clsx(
                    isSelected ? "text-red-500 font-medium" : "text-gray-700"
                  )}
                >
                  {opt.label}
                </span>
              </div>
            );
          })}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
