
import React from 'react';
import { Customer, Person, Organization } from '@/pages/Workflows/models/CustomerModel';
import { User, Building2 } from 'lucide-react';

interface CustomerListItemProps {
  customer: Customer;
  onSelect: (customer: Customer) => void;
}

const CustomerListItem: React.FC<CustomerListItemProps> = ({ customer, onSelect }) => {
  const isPerson = customer.type === 'person';
  
  const person = isPerson ? customer as Person : null;
  const organization = !isPerson ? customer as Organization : null;
  
  const getSecondaryText = () => {
    if (isPerson && person) {
      return person.organizationName || (person.cpfCnpj ? `CPF: ${person.cpfCnpj}` : person.email || "");
    } else if (organization) {
      return organization.tradingName || organization.cnpj || organization.email || "";
    }
    return "";
  };
  
  const handleSelect = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect(customer);
  };
  
  return (
    <button 
      type="button"
      className="w-full text-left flex items-center px-3 py-2 cursor-pointer hover:bg-accent transition-colors"
      onClick={handleSelect}
      onMouseDown={(e) => e.preventDefault()}
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
    </button>
  );
};

export default CustomerListItem;
