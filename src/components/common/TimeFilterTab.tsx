import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type TimeFilterOption =
  | "all"
  | "12months"
  | "30days"
  | "7days"
  | "24hours";

interface TimeFilterTabProps {
  defaultValue?: TimeFilterOption;
  onTabChange?: (value: TimeFilterOption) => void;
  className?: string;
}

const TimeFilterTab = ({
  defaultValue = "all",
  onTabChange,
  className,
}: TimeFilterTabProps) => {
  const handleValueChange = (value: string) => {
    if (onTabChange) {
      onTabChange(value as TimeFilterOption);
    }
  };

  return (
    <Tabs
      defaultValue={defaultValue}
      onValueChange={handleValueChange}
      className={`bg-background border border-gray-100 p-1 rounded-[8px] ${className}`}
    >
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="12months">12 Months</TabsTrigger>
        <TabsTrigger value="30days">30 Days</TabsTrigger>
        <TabsTrigger value="7days">7 Days</TabsTrigger>
        <TabsTrigger value="24hours">24 Hours</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default TimeFilterTab;