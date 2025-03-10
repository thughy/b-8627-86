
import React, { useRef, useEffect } from 'react';
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
  
  // Update the input when external props change
  useEffect(() => {
    if (customerName && customerType) {
      setSearchTerm('');
    }
  }, [customerName, customerType, setSearchTerm]);

  const handleFocus = () => {
    setIsOpen(true);
    // Se já tiver um termo de busca com pelo menos 2 caracteres, a lista já será mostrada
    // Se não, precisamos garantir que o popover abra para mostrar a mensagem de instruções
  };

  const handleBlur = (e: React.FocusEvent) => {
    // Check if the related target is inside the popover
    const relatedTarget = e.relatedTarget as Node;
    if (relatedTarget instanceof Element) {
      // Check if the clicked element is inside the popover content
      const isInsidePopover = relatedTarget.closest('[role="listbox"]');
      if (isInsidePopover) {
        return; // Don't close if clicking inside popover
      }
    }
    
    // Small timeout to allow click events to register before closing
    setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  const handleCustomerSelect = (customer: Customer) => {
    selectCustomer(customer);
    onCustomerSelect(customer);
    setIsOpen(false);
  };

  const handleClearSelection = (e: React.MouseEvent) => {
    e.preventDefault();
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

  return (
    <div className="relative w-full">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div className="w-full">
            <CustomerSearchInput
              ref={inputRef}
              searchTerm={searchTerm}
              onChange={setSearchTerm}
              onFocus={handleFocus}
              onBlur={handleBlur}
              hasSelectedCustomer={Boolean(customerName)}
              customerName={customerName}
              customerOrganization={customerOrganization}
              customerType={customerType}
              onClearSelection={handleClearSelection}
            />
          </div>
        </PopoverTrigger>
        
        <PopoverContent 
          role="listbox"
          className="p-0 w-[300px] bg-background border rounded-md shadow-md z-50 overflow-hidden"
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
