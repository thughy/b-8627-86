
import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronsUpDown, User, Building, Search } from 'lucide-react';
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

  // Search for customers when the query changes
  useEffect(() => {
    setLoading(true);
    const { customers } = filterCustomers({ search: searchQuery });
    setCustomers(customers);
    setLoading(false);
  }, [searchQuery]);

  return (
    <div className="relative w-full">
      <div className="flex items-center relative">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div className="relative w-full">
              <Input
                ref={inputRef}
                placeholder="Buscar cliente..."
                value={value || ''}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setOpen(true)}
                className="w-full pr-10"
              />
              <button 
                type="button"
                onClick={() => setOpen(!open)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
              >
                {open ? (
                  <ChevronsUpDown className="h-4 w-4" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </button>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0 dropdown-content bg-background" style={{ width: inputRef.current?.offsetWidth }}>
            <Command>
              <CommandInput 
                placeholder="Buscar cliente..." 
                value={searchQuery}
                onValueChange={setSearchQuery}
                className="h-9 thin-border"
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
                  <CommandGroup>
                    {customers.map((customer) => (
                      <CommandItem
                        key={customer.id}
                        value={customer.name}
                        onSelect={() => {
                          onChange(customer.name, customer.type);
                          setSearchQuery('');
                          setOpen(false);
                        }}
                      >
                        <div className="flex items-center">
                          {customer.type === 'person' ? (
                            <User className="mr-2 h-4 w-4" />
                          ) : (
                            <Building className="mr-2 h-4 w-4" />
                          )}
                          <span>{customer.name}</span>
                          {customer.type === 'person' && (
                            <span className="ml-2 text-xs text-muted-foreground">
                              {(customer as Person).organization && `(${(customer as Person).organization})`}
                            </span>
                          )}
                        </div>
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4",
                            value === customer.name ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default CustomerSearch;
