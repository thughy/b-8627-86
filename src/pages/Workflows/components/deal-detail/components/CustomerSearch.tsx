
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
  const triggerRef = useRef<HTMLDivElement>(null);

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
        });
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

  // Handle input change without opening dropdown
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setSearchQuery(e.target.value);
  };

  // Prevent click from closing popover by stopping propagation
  const handleInputClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!open) setOpen(true);
  };

  // Safe selection function that validates the customer type before calling onChange
  const handleSelect = (customerName: string, customerType: 'person' | 'organization') => {
    if (customerType !== 'person' && customerType !== 'organization') {
      console.error('Invalid customer type:', customerType);
      customerType = 'person'; // Default fallback
    }
    onChange(customerName, customerType);
    setOpen(false);
  };

  // Handle dropdown toggle
  const handleToggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(!open);
  };

  return (
    <Popover 
      open={open} 
      onOpenChange={(isOpen) => {
        // Only allow explicit closing or when we select an item
        if (!isOpen) setOpen(false);
      }}
    >
      <PopoverTrigger asChild>
        <div 
          className="relative w-full flex items-center" 
          ref={triggerRef}
          onClick={(e) => e.stopPropagation()}
        >
          <Input
            ref={inputRef}
            placeholder="Buscar cliente..."
            value={value || searchQuery}
            onChange={handleInputChange}
            onClick={handleInputClick}
            className="w-full pr-10"
          />
          <button 
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2"
            onClick={handleToggleDropdown}
            tabIndex={-1}
          >
            <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </PopoverTrigger>

      <PopoverContent 
        className="w-full p-0 bg-background border shadow-md z-[100]" 
        align="start" 
        sideOffset={5}
        style={{ 
          width: triggerRef.current?.offsetWidth || 300,
          maxHeight: '300px',
          overflow: 'hidden' 
        }}
      >
        <Command className="rounded-lg border-0">
          <CommandInput 
            placeholder="Buscar cliente por nome..." 
            value={searchQuery}
            onValueChange={(value) => setSearchQuery(value)}
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
              {Array.isArray(customers) && customers.map((customer) => (
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
