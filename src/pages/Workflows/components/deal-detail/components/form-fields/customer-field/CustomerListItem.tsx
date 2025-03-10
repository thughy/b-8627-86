
import React from 'react';
import { Customer, Person, Organization } from '@/pages/Workflows/models/CustomerModel';
import { User, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect(customer);
  };
  
  return (
    <button 
      type="button"
      className={cn(
        "w-full text-left flex items-center px-3 py-2 rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors",
        "focus:bg-accent focus:text-accent-foreground outline-none"
      )}
      onClick={handleClick}
      role="option"
    >
      <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-primary/10 mr-2">
        {isPerson ? (
          <User className="h-3.5 w-3.5 text-primary" />
        ) : (
          <Building2 className="h-3.5 w-3.5 text-primary" />
        )}
      </div>
      <div className="overflow-hidden flex-grow">
        <div className="font-medium text-sm truncate">{customer.name}</div>
        <div className="text-xs text-muted-foreground truncate">
          {getSecondaryText()}
        </div>
      </div>
    </button>
  );
};

export default CustomerListItem;
