
import React from 'react';
import { Customer, Person, Organization } from '@/pages/Workflows/models/CustomerModel';
import { User, Building2 } from 'lucide-react';

interface CustomerListItemProps {
  customer: Customer;
  onSelect: (customer: Customer) => void;
}

const CustomerListItem: React.FC<CustomerListItemProps> = ({ customer, onSelect }) => {
  const isPerson = customer.type === 'person';
  
  // Type the customer correctly based on its type
  const person = isPerson ? customer as Person : null;
  const organization = !isPerson ? customer as Organization : null;
  
  // Get the secondary display text based on customer type
  const getSecondaryText = () => {
    if (isPerson && person) {
      return person.organizationName || (person.cpfCnpj ? `CPF: ${person.cpfCnpj}` : person.email || "");
    } else if (organization) {
      return organization.tradingName || organization.cnpj || organization.email || "";
    }
    return "";
  };
  
  // Garante preventDefault para evitar perder o foco na seleção
  const handleSelect = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Adicionando atraso para garantir que o evento de seleção seja processado depois do clique
    setTimeout(() => {
      onSelect(customer);
    }, 50);
  };
  
  return (
    <div 
      className="flex items-center px-3 py-2 cursor-pointer hover:bg-accent transition-colors"
      onClick={handleSelect}
      onMouseDown={(e) => e.preventDefault()} // Previne problemas de foco
    >
      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 mr-2">
        {isPerson ? (
          <User className="h-4 w-4 text-primary" />
        ) : (
          <Building2 className="h-4 w-4 text-primary" />
        )}
      </div>
      <div className="overflow-hidden flex-grow">
        <div className="font-medium truncate">{customer.name}</div>
        <div className="text-xs text-muted-foreground truncate">
          {getSecondaryText()}
        </div>
      </div>
    </div>
  );
};

export default CustomerListItem;
