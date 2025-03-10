
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

  useEffect(() => {
    if (customerName && customerType) {
      setSearchTerm('');
    }
  }, [customerName, customerType, setSearchTerm]);

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleBlur = () => {
    // Check if the related target is within our component after a short delay
    setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  const handleCustomerSelect = (customer: Customer) => {
    selectCustomer(customer);
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
    <div ref={containerRef}>
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
