
import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronsUpDown, User, Building } from 'lucide-react';
import { Customer, Person, Organization } from '@/pages/Workflows/models/CustomerModel';
import { filterCustomers } from '@/pages/Customers/services/customerService';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

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
    const fetchCustomers = async () => {
      if (!open) return; // Only fetch when dropdown is open
      
      try {
        setLoading(true);
        // Call the customer service to get filtered customers
        const result = filterCustomers({ search: searchQuery });
        setCustomers(result.customers);
      } catch (error) {
        console.error('Error fetching customers:', error);
        toast.error('Erro ao buscar clientes. Tente novamente.');
        setCustomers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [searchQuery, open]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (!open) setOpen(true);
  };

  // Handle selection from dropdown
  const handleSelect = (customerName: string, customerType: 'person' | 'organization') => {
    onChange(customerName, customerType);
    setSearchQuery('');
    setOpen(false);
  };

  // Prevent click from closing popover by stopping propagation
  const handleInputClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!open) setOpen(true);
  };

  // Handle button click to toggle dropdown
  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(!open);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative w-full flex items-center">
          <Input
            ref={inputRef}
            placeholder="Buscar cliente..."
            value={value || searchQuery}
            onChange={handleInputChange}
            className="w-full pr-10"
            onClick={handleInputClick}
          />
          <button 
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2"
            onClick={handleButtonClick}
          >
            <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </PopoverTrigger>

      <PopoverContent 
        className="w-[var(--radix-popover-trigger-width)] p-0 bg-background border shadow-md z-[100]" 
        align="start" 
        sideOffset={5}
        style={{ width: inputRef.current?.offsetWidth }}
      >
        <Command className="rounded-lg border-0">
          <CommandInput 
            placeholder="Buscar cliente por nome..." 
            value={searchQuery}
            onValueChange={setSearchQuery}
            className="h-9"
          />
          <CommandEmpty className="py-6 text-center text-sm">
            Nenhum cliente encontrado.
          </CommandEmpty>
          {loading ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              Carregando clientes...
            </div>
          ) : (
            <CommandGroup className="max-h-[200px] overflow-auto">
              {customers.map((customer) => (
                <CommandItem
                  key={customer.id}
                  value={customer.name}
                  onSelect={() => handleSelect(customer.name, customer.type)}
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
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CustomerSearch;
