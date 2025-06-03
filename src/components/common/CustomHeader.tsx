import { ChevronDown } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

const CustomHeader = (props: any) => {
  const { displayName, setSort } = props;
  const handleSort = () => {
    setSort("asc");
  };
  return (
    <div className=" flex items-center justify-center gap-1">
      <span>{displayName}</span>
      <Button size={"sm"} variant={"ghost"} onClick={handleSort}>
        <ChevronDown size={14} strokeWidth="4px" className=" pt-1" />
      </Button>
    </div>
  );
};

export default CustomHeader;
