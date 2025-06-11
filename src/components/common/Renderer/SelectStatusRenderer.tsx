import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectStatusRendererProps {
  value?: any;
  data?: any;
  api?: any;
  context?: any;
  node?: any;
  column?: any;
  rowIndex?: number;
}

const SelectStatusRenderer: React.FC<SelectStatusRendererProps> = (props) => {
  const statusOptions = [
    { value: "pending", label: "Pending", variant: "default" as const },
    { value: "completed", label: "Completed", variant: "success" as const },
    { value: "failed", label: "Failed", variant: "primary" as const },
    { value: "porcessing", label: "Processing", variant: "secondary" as const },
  ];

  const [selectedValue, setSelectedValue] = React.useState<string>(
    props.value || statusOptions[0]?.value || ""
  );

  const selectedOption = statusOptions.find(
    (option) => option.value === selectedValue
  );

  const handleChange = (value: string) => {
    setSelectedValue(value);

    // Update the cell value in AG-Grid
    if (props.api) {
      props.api.startEditingCell({
        rowIndex: props.rowIndex,
        colKey: props.column?.getColId(),
      });
      props.api.setValue(props.node, props.column, value);
      props.api.stopEditing();
    }
  };

  return (
    <Select value={selectedValue} onValueChange={handleChange}>
      <SelectTrigger className="h-8 border-none p-0 focus:ring-0 focus:ring-offset-0">
        <SelectValue asChild>
          {selectedOption ? (
            <Badge variant={selectedOption.variant} className="min-w-[80px]">
              {selectedOption.label}
            </Badge>
          ) : (
            <span>Select</span>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {statusOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            <Badge variant={option.variant} className="w-full justify-center">
              {option.label}
            </Badge>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectStatusRenderer;
