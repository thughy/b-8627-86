
import React from "react";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Customer } from "@/pages/Workflows/models/CustomerModel";

interface CustomerModalHeaderProps {
  customer: Customer | null;
}

const CustomerModalHeader: React.FC<CustomerModalHeaderProps> = ({ customer }) => {
  return (
    <DialogHeader>
      <DialogTitle>
        {customer ? "Editar Cliente" : "Novo Cliente"}
      </DialogTitle>
      <DialogDescription>
        {customer
          ? "Atualize as informações do cliente no sistema."
          : "Preencha os dados para cadastrar um novo cliente."}
      </DialogDescription>
    </DialogHeader>
  );
};

export default CustomerModalHeader;
