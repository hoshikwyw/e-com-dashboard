import React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import { Trash2 } from "lucide-react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemType: string; // 'seller', 'product', 'user', etc.
  isLoading?: boolean;
}

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  itemType,
  isLoading = false,
}: DeleteConfirmationModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className=" sm:max-w-[400px] flex flex-col justify-center">
        <DialogHeader>
          {/* <DialogTitle>Confirm Deletion</DialogTitle> */}
          <DialogDescription className=" w-full flex flex-col justify-center items-center gap-2 pt-8">
            <span className=" w-24 h-24 rounded-full bg-primary-50 flex items-center justify-center">
              <Trash2 color="#EB3D4D" size={40} />
            </span>
            <span className=" text-black-500 text-xl font-semibold">
              Delete {itemType}
            </span>
            <span className=" text-center font-normal text-base text-gray-500">
              Do you want to delete this {itemType}? This action can't be
              undone.
            </span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 flex w-full items-center !justify-between">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="default" onClick={onConfirm}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
