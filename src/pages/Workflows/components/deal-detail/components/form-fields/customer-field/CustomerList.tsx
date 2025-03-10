
import React from 'react';
import { Customer } from '@/pages/Workflows/models/CustomerModel';
import CustomerListItem from './CustomerListItem';
import { Loader2 } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";

interface CustomerListProps {
  customers: Customer[];
  isLoading: boolean;
  searchTerm: string;
  onSelectCustomer: (customer: Customer) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ 
  customers, 
  isLoading, 
  searchTerm, 
  onSelectCustomer 
}) => {
  if (isLoading) {
    return (
      <div className="p-2 text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Carregando clientes...</span>
        </div>
      </div>
    );
  }
  
  if (customers.length > 0) {
    return (
      <ScrollArea className="max-h-[300px]">
        <div className="py-1">
          {customers.map((customer) => (
            <CustomerListItem 
              key={customer.id} 
              customer={customer} 
              onSelect={onSelectCustomer} 
            />
          ))}
        </div>
      </ScrollArea>
    );
  }
  
  if (searchTerm && searchTerm.length >= 2) {
    return (
      <div className="p-2 text-center text-sm text-muted-foreground">
        Nenhum cliente encontrado
      </div>
    );
  }
  
  return (
    <div className="p-2 text-center text-sm text-muted-foreground">
      Digite pelo menos 2 caracteres para buscar clientes
    </div>
  );
};

export default CustomerList;
