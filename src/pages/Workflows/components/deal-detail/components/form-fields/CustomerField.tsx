
import React, { useRef } from 'react';
import { Customer } from '@/pages/Workflows/models/CustomerModel';
import { useCustomerSearch } from '../../hooks/useCustomerSearch';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import CustomerSearchInput from './customer-field/CustomerSearchInput';
import CustomerList from './customer-field/CustomerList';

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
  const { 
    searchTerm, 
    setSearchTerm, 
    customers, 
    isLoading, 
    clearSearch,
    isOpen,
    setIsOpen,
    selectCustomer
  } = useCustomerSearch();
  
  const inputRef = useRef<HTMLInputElement>(null);
  const popoverContentRef = useRef<HTMLDivElement>(null);
  
  // Determinar se o campo tem um cliente selecionado
  const hasSelectedCustomer = Boolean(customerName);

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleBlur = () => {
    // Pequeno delay para permitir cliques no popover
    setTimeout(() => {
      if (
        !document.activeElement?.closest('.customer-search-popover') && 
        document.activeElement !== inputRef.current
      ) {
        setIsOpen(false);
      }
    }, 200);
  };

  const handleCustomerSelect = (customer: Customer) => {
    selectCustomer(customer);
    onCustomerSelect(customer);
    setIsOpen(false);
  };

  // Limpar a seleção atual
  const handleClearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    clearSearch();
    onCustomerSelect({ 
      id: '', 
      name: '', 
      type: 'person', 
      status: 'active', 
      createdAt: new Date(), 
      updatedAt: new Date() 
    });
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Gerenciar o fechamento do popover com a tecla ESC
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        if (inputRef.current) {
          inputRef.current.blur();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  return (
    <div className="space-y-1.5">
      <label htmlFor="customer-search" className="text-sm font-medium leading-none block mb-1.5">
        Cliente
      </label>
      
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <CustomerSearchInput
            ref={inputRef}
            searchTerm={searchTerm}
            onChange={setSearchTerm}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onClearSelection={handleClearSelection}
            hasSelectedCustomer={hasSelectedCustomer}
            customerName={customerName}
            customerOrganization={customerOrganization}
            customerType={customerType}
          />
        </PopoverTrigger>
        
        <PopoverContent 
          ref={popoverContentRef}
          className="p-0 w-[300px] max-h-[300px] overflow-auto customer-search-popover"
          align="start"
          alignOffset={0}
          sideOffset={5}
        >
          <CustomerList
            customers={customers}
            isLoading={isLoading}
            searchTerm={searchTerm}
            onSelectCustomer={handleCustomerSelect}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CustomerField;
