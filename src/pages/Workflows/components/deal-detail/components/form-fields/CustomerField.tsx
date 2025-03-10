
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
  const hasSelectedCustomer = Boolean(customerName);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update the input when external props change
  useEffect(() => {
    if (customerName && customerType) {
      setSearchTerm('');
    }
  }, [customerName, customerType, setSearchTerm]);

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleBlur = () => {
    // Give a small delay before closing the popover to allow click events to complete
    setTimeout(() => {
      if (document.activeElement !== inputRef.current && 
          !containerRef.current?.contains(document.activeElement)) {
        setIsOpen(false);
      }
    }, 200);
  };

  const handleCustomerSelect = (customer: Customer) => {
    // First update local state
    selectCustomer(customer);
    
    // Then propagate selection to parent component
    onCustomerSelect(customer);
  };

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

  return (
    <div ref={containerRef} className="relative">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div>
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
          </div>
        </PopoverTrigger>
        
        <PopoverContent 
          className="p-0 w-[300px] max-h-[300px] overflow-auto customer-search-popover bg-background"
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
