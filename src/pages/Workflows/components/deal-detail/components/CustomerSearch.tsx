
import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronsUpDown, User, Building } from 'lucide-react';
import { Customer, Person, Organization } from '@/pages/Workflows/models/CustomerModel';
import { filterCustomers } from '@/pages/Customers/services/customerService';
import { cn } from '@/lib/utils';

interface CustomerSearchProps {
  value?: string;
  onChange: (value: string, customerType: 'person' | 'organization') => void;
}

const CustomerSearch: React.FC<CustomerSearchProps> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load customers when the search query changes
  useEffect(() => {
    try {
      setLoading(true);
      // Call the customer service to get filtered customers
      const { customers: filteredCustomers } = filterCustomers({ search: searchQuery });
      setCustomers(filteredCustomers);
      console.log('Filtered customers:', filteredCustomers);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative w-full flex items-center">
          <Input
            ref={inputRef}
            placeholder="Buscar cliente..."
            value={value || ''}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-10"
            onClick={() => setOpen(true)}
          />
          <ChevronsUpDown 
            className="absolute right-3 h-4 w-4 text-muted-foreground cursor-pointer" 
            onClick={() => setOpen(!open)} 
          />
        </div>
      </PopoverTrigger>

      <PopoverContent 
        className="w-[var(--radix-popover-trigger-width)] p-0 bg-background shadow-md" 
        align="start" 
        sideOffset={5}
      >
        <Command>
          <CommandInput 
            placeholder="Buscar cliente por nome..." 
            value={searchQuery}
            onValueChange={setSearchQuery}
            className="h-9"
          />
          {loading ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              Carregando clientes...
            </div>
          ) : (
            <>
              <CommandEmpty className="py-6 text-center text-sm">
                Nenhum cliente encontrado.
              </CommandEmpty>
              <CommandGroup className="max-h-[200px] overflow-auto">
                {customers.map((customer) => (
                  <CommandItem
                    key={customer.id}
                    value={customer.name}
                    onSelect={() => {
                      onChange(customer.name, customer.type);
                      setOpen(false);
                    }}
                    className="flex items-center"
                  >
                    <div className="flex items-center gap-2 flex-1">
                      {customer.type === 'person' ? (
                        <User className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Building className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span>{customer.name}</span>
                      {customer.type === 'person' && (customer as Person).organizationName && (
                        <span className="text-xs text-muted-foreground">
                          ({(customer as Person).organizationName})
                        </span>
                      )}
                    </div>
                    {value === customer.name && <Check className="h-4 w-4 ml-auto" />}
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CustomerSearch;
