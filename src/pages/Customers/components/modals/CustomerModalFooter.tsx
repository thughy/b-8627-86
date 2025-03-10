
import React from "react";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Customer } from "@/pages/Workflows/models/CustomerModel";

interface CustomerModalFooterProps {
  customer: Customer | null;
  onClose: () => void;
  onDelete: (customerId: string) => void;
  onSubmit: () => void;
}

const CustomerModalFooter: React.FC<CustomerModalFooterProps> = ({
  customer,
  onClose,
  onDelete,
  onSubmit
}) => {
  const handleDelete = () => {
    if (customer?.id) {
      onDelete(customer.id);
    }
  };

  return (
    <DialogFooter className="flex space-x-2 justify-end">
      <Button variant="outline" onClick={onClose}>
        Cancelar
      </Button>
      {customer && (
        <Button 
          variant="destructive" 
          onClick={handleDelete}
        >
          Excluir
        </Button>
      )}
      <Button onClick={onSubmit}>
        Salvar
      </Button>
    </DialogFooter>
  );
};

export default CustomerModalFooter;
