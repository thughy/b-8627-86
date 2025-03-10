
import React, { useState, useRef } from 'react';
import { Customer, Person, Organization } from '@/pages/Workflows/models/CustomerModel';
import { Input } from '@/components/ui/input';
import FormField from '@/components/ui/form-field';
import { useCustomerSearch } from '../../hooks/useCustomerSearch';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Search, User, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CustomerFieldProps {
  customerName: string | undefined;
  customerOrganization: string | undefined;
  customerType: string | undefined;
  onCustomerSelect: (customer: Customer) => void;
}

const CustomerField: React.FC<CustomerFieldProps> = ({ 
  customerName,
  customerOrganization,
  customerType,
  onCustomerSelect
}) => {
  const { searchTerm, setSearchTerm, customers, isLoading } = useCustomerSearch();
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCustomerSelect = (customer: Customer) => {
    onCustomerSelect(customer);
    setIsOpen(false);
    setSearchTerm('');
  };

  const displayValue = customerName || '';
  const displaySubText = customerOrganization || '';

  return (
    <FormField id="customer" label="Cliente">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              ref={inputRef}
              id="customer-search"
              placeholder="Buscar cliente..."
              className="pl-8 thin-border"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsOpen(true)}
            />
            {displayValue && !searchTerm && (
              <div className="absolute inset-0 flex items-center px-8 pointer-events-none">
                <span>{displayValue}</span>
                {displaySubText && (
                  <span className="text-muted-foreground text-xs ml-2">
                    ({displaySubText})
                  </span>
                )}
              </div>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent 
          className="p-0 w-[300px] max-h-[300px] overflow-auto bg-background" 
          align="start"
        >
          {isLoading ? (
            <div className="p-2 text-center text-sm text-muted-foreground">
              Carregando...
            </div>
          ) : customers.length > 0 ? (
            <div className="py-1">
              {customers.map((customer) => {
                const isPerson = customer.type === 'person';
                const person = customer as Person;
                const organization = customer as Organization;
                
                return (
                  <div 
                    key={customer.id}
                    className="flex items-center px-3 py-2 cursor-pointer hover:bg-accent"
                    onClick={() => handleCustomerSelect(customer)}
                  >
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 mr-2">
                      {isPerson ? (
                        <User className="h-4 w-4 text-primary" />
                      ) : (
                        <Building2 className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div className="overflow-hidden">
                      <div className="font-medium truncate">{customer.name}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {isPerson
                          ? person.organizationName || (person.cpfCnpj ? `CPF: ${person.cpfCnpj}` : "")
                          : organization.tradingName || (organization.cnpj ? `CNPJ: ${organization.cnpj}` : "")}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : searchTerm ? (
            <div className="p-2 text-center text-sm text-muted-foreground">
              Nenhum cliente encontrado
            </div>
          ) : (
            <div className="p-2 text-center text-sm text-muted-foreground">
              Digite para buscar clientes
            </div>
          )}
        </PopoverContent>
      </Popover>
    </FormField>
  );
};

export default CustomerField;
