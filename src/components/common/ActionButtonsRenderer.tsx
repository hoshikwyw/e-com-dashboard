import React from "react";
import { Button } from "../ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";

const ActionButtonsRenderer = () => {
  return (
    <div>
      <Button size="sm" variant="ghost">
        <Eye />
      </Button>
      <Button size="sm" variant="ghost">
        <Pencil />
      </Button>
      <Button size="sm" variant="ghost">
        <Trash2 />
      </Button>
    </div>
  );
};

export default ActionButtonsRenderer;
