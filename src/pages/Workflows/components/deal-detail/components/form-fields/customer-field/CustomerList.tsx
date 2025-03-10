
import React from 'react';
import { Customer } from '@/pages/Workflows/models/CustomerModel';
import CustomerListItem from './CustomerListItem';
import { Loader2 } from 'lucide-react';

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
      <div className="p-4 text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Carregando clientes...</span>
        </div>
      </div>
    );
  }
  
  if (customers.length > 0) {
    return (
      <div className="py-1">
        {customers.map((customer) => (
          <CustomerListItem 
            key={customer.id} 
            customer={customer} 
            onSelect={onSelectCustomer} 
          />
        ))}
      </div>
    );
  }
  
  if (searchTerm) {
    return (
      <div className="p-4 text-center text-sm text-muted-foreground">
        Nenhum cliente encontrado
      </div>
    );
  }
  
  return (
    <div className="p-4 text-center text-sm text-muted-foreground">
      Digite para buscar clientes
    </div>
  );
};

export default CustomerList;
