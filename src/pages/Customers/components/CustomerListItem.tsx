
import React from "react";
import { Customer } from "@/pages/Workflows/models/CustomerModel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, UserCircle, Building } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface CustomerListItemProps {
  customer: Customer;
  onEdit: (customer: Customer) => void;
  onDelete: (customerId: string) => void;
}

const CustomerListItem: React.FC<CustomerListItemProps> = ({
  customer,
  onEdit,
  onDelete
}) => {
  return (
    <div className="grid grid-cols-5 gap-4 p-4 items-center">
      <div className="col-span-2">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
            {customer.type === "person" ? (
              <UserCircle className="h-5 w-5 text-primary" />
            ) : (
              <Building className="h-5 w-5 text-primary" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-medium">{customer.name}</span>
            <span className="text-xs text-muted-foreground">
              {customer.type === "organization" 
                ? customer.organization || "Organização" 
                : customer.cpfCnpj || "Sem CPF/CNPJ"}
            </span>
          </div>
        </div>
      </div>

      <div className="col-span-1">
        <div className="flex flex-col">
          <span>{customer.email}</span>
          <span className="text-xs text-muted-foreground">{customer.phone}</span>
        </div>
      </div>

      <div className="col-span-1">
        <Badge variant={customer.status === "active" ? "outline" : "secondary"}>
          {customer.status === "active" ? "Ativo" : "Inativo"}
        </Badge>
      </div>

      <div className="col-span-1 flex justify-end gap-2">
        <Button variant="ghost" size="icon" onClick={() => onEdit(customer)}>
          <Edit className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => onDelete(customer.id)}
          className="text-red-500 hover:text-red-600 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CustomerListItem;
