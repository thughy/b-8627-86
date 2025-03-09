
import React from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

interface ModalFooterProps {
  onClose: () => void;
  onSubmit: () => void;
}

const ModalFooter = ({ onClose, onSubmit }: ModalFooterProps) => {
  return (
    <DialogFooter className="flex space-x-2 justify-end">
      <Button variant="outline" onClick={onClose}>Cancel</Button>
      <Button variant="destructive" onClick={onClose}>Delete</Button>
      <Button onClick={onSubmit}>Save</Button>
    </DialogFooter>
  );
};

export default ModalFooter;
