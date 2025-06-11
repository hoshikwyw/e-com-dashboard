import React from "react";
import { Badge } from "../../ui/badge";

interface PropsType {
  value?: "in stock" | "low stock" | "out of stock" | string;
  color?: "default" | "success" | "secondary" | "primary" | "info";
}

const StatusCellRenderer: React.FC<PropsType> = (props) => {
  const { value } = props;

  // Determine color based on status value
  const getColorForStatus = () => {
    switch (value) {
      case "in stock":
        return "success";
      case "low stock":
        return "secondary";
      case "out of stock":
        return "primary";
      default:
        return "default";
    }
  };

  // Format the status text for display
  const formatStatusText = (status: string) => {
    return status
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div>
      <Badge variant={getColorForStatus()}>
        {formatStatusText(value || "")}
      </Badge>
    </div>
  );
};

export default StatusCellRenderer;
