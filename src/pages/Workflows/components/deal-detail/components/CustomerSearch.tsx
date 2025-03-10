
import React, { useState, useEffect } from 'react';
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

  // Mock customers for demonstration (if the API is not working)
  const mockCustomers: Customer[] = [
    { id: '1', name: 'João Silva', type: 'person', email: 'joao@email.com', status: 'active' } as Person,
    { id: '2', name: 'Maria Santos', type: 'person', email: 'maria@email.com', status: 'active', organization: 'Empresa ABC' } as Person,
    { id: '3', name: 'Empresa ABC', type: 'organization', email: 'contato@empresaabc.com', status: 'active' } as Organization,
    { id: '4', name: 'Carlos Pereira', type: 'person', email: 'carlos@email.com', status: 'active' } as Person,
    { id: '5', name: 'Tech Solutions', type: 'organization', email: 'contato@techsolutions.com', status: 'active' } as Organization,
  ];

  // Search for customers when the query changes
  useEffect(() => {
    try {
      setLoading(true);
      // Try to use the service first
      const { customers } = filterCustomers({ search: searchQuery });
      setCustomers(customers.length > 0 ? customers : mockCustomers);
    } catch (error) {
      // Fallback to mock data if the service fails
      console.log('Using mock customer data');
      const filtered = mockCustomers.filter(customer => 
        customer.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setCustomers(filtered);
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative w-full flex items-center">
          <Input
            placeholder="Buscar cliente..."
            value={value || ''}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-10"
            onClick={() => setOpen(true)}
          />
          <ChevronsUpDown className="absolute right-3 h-4 w-4 text-muted-foreground cursor-pointer" 
            onClick={() => setOpen(!open)} 
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 bg-popover" align="start" sideOffset={5}>
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
                      {customer.type === 'person' && (customer as Person).organization && (
                        <span className="text-xs text-muted-foreground">
                          ({(customer as Person).organization})
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
