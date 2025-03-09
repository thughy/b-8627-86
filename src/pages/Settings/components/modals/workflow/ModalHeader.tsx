
import React from "react";
import { 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";

interface ModalHeaderProps {
  title: string;
  description: string;
}

const ModalHeader = ({ title, description }: ModalHeaderProps) => {
  return (
    <DialogHeader>
      <DialogTitle>{title}</DialogTitle>
      <DialogDescription>{description}</DialogDescription>
    </DialogHeader>
  );
};

export default ModalHeader;
