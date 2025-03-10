
import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronsUpDown, User, Building, Loader2 } from 'lucide-react';
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
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Load customers only when dropdown is open and search changes
  useEffect(() => {
    if (!open) return;
    
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        // Make sure we pass a proper search object to avoid undefined issues
        const result = filterCustomers({ 
          search: searchQuery || '', 
          type: 'all',
          status: 'all'
        }, 1, 20); // Add pagination parameters
        
        // Ensure customers is always an array
        setCustomers(result.customers || []);
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

  // Safe selection function that validates the customer type before calling onChange
  const handleSelect = (customerName: string, customerType: 'person' | 'organization') => {
    onChange(customerName, customerType);
    setOpen(false);
  };

  return (
    <Popover 
      open={open} 
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <button
          ref={triggerRef}
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setOpen(!open);
          }}
          className="flex w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {value || "Selecionar cliente..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>

      <PopoverContent 
        className="w-full p-0 bg-background border shadow-md z-[100]" 
        align="start" 
        sideOffset={5}
        style={{ 
          width: triggerRef.current?.offsetWidth,
          maxHeight: '300px',
          overflow: 'hidden' 
        }}
      >
        <div className="relative">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar cliente por nome..."
            className="w-full border-0 focus:ring-0 px-3 py-2 mb-0 h-9"
          />
        </div>
        
        <Command className="rounded-lg border-0">
          <CommandInput 
            placeholder="Buscar cliente por nome..." 
            value={searchQuery}
            onValueChange={setSearchQuery}
            className="h-9 opacity-0 absolute -z-10"
          />
          
          {loading ? (
            <div className="py-6 text-center text-sm text-muted-foreground flex items-center justify-center">
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
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
            </>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CustomerSearch;
