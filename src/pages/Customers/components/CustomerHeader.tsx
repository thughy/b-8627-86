
import React from "react";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface CustomerHeaderProps {
  onAddCustomer: () => void;
}

const CustomerHeader: React.FC<CustomerHeaderProps> = ({
  onAddCustomer
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <CardTitle>Gerenciamento de Clientes</CardTitle>
        <CardDescription>
          Cadastre e gerencie informações de clientes e organizações
        </CardDescription>
      </div>
      <Button onClick={onAddCustomer} className="flex-shrink-0">
        <Plus className="h-4 w-4 mr-2" />
        Adicionar Cliente
      </Button>
    </div>
  );
};

export default React.memo(CustomerHeader);
