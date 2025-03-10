
import React, { useState, useRef, useEffect } from 'react';
import { Customer, Person, Organization } from '@/pages/Workflows/models/CustomerModel';
import { Input } from '@/components/ui/input';
import FormField from '@/components/ui/form-field';
import { useCustomerSearch } from '../../hooks/useCustomerSearch';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Search, User, Building2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

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
  const { searchTerm, setSearchTerm, customers, isLoading, clearSearch } = useCustomerSearch();
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Determinar se o campo tem um cliente selecionado
  const hasSelectedCustomer = Boolean(customerName);

  // Gerenciar o foco e abertura/fechamento do popover
  const handleFocus = () => {
    setIsFocused(true);
    setIsOpen(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Delay para permitir a seleção de cliente antes de fechar
    setTimeout(() => {
      if (!document.activeElement?.closest('.customer-search-popover')) {
        setIsOpen(false);
      }
    }, 200);
  };

  const handleCustomerSelect = (customer: Customer) => {
    onCustomerSelect(customer);
    clearSearch();
    setIsOpen(false);
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  // Limpar a seleção atual
  const handleClearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCustomerSelect({ 
      id: '', 
      name: '', 
      type: 'person', 
      status: 'active', 
      createdAt: new Date(), 
      updatedAt: new Date() 
    });
    clearSearch();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Escolher o ícone apropriado com base no tipo de cliente
  const CustomerIcon = customerType === 'organization' ? Building2 : User;

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
              className={cn(
                "pl-8 pr-8 thin-border",
                hasSelectedCustomer && !isFocused ? "text-transparent caret-current" : ""
              )}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            
            {/* Exibir o cliente selecionado quando não estiver em foco */}
            {hasSelectedCustomer && !isFocused && !searchTerm && (
              <div className="absolute inset-0 flex items-center px-8 pointer-events-none">
                <div className="flex items-center gap-2 max-w-full overflow-hidden">
                  <CustomerIcon className="h-4 w-4 flex-shrink-0 text-primary" />
                  <span className="font-medium truncate">{customerName}</span>
                  {customerOrganization && customerType === 'person' && (
                    <span className="text-muted-foreground text-xs truncate">
                      ({customerOrganization})
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Botão para limpar a seleção */}
            {hasSelectedCustomer && (
              <button
                type="button"
                onClick={handleClearSelection}
                className="absolute right-2.5 top-3 h-4 w-4 text-muted-foreground hover:text-foreground"
                aria-label="Limpar seleção"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </PopoverTrigger>
        
        <PopoverContent 
          className="p-0 w-[300px] max-h-[300px] overflow-auto bg-background customer-search-popover" 
          align="start"
          sideOffset={5}
        >
          {isLoading ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
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
                    onMouseDown={(e) => e.preventDefault()} // Evita problemas de foco
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
            <div className="p-4 text-center text-sm text-muted-foreground">
              Nenhum cliente encontrado
            </div>
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Digite para buscar clientes
            </div>
          )}
        </PopoverContent>
      </Popover>
    </FormField>
  );
};

export default CustomerField;
