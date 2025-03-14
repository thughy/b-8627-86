
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
    selectCustomer,
    openDropdown
  } = useCustomerSearch();
  
  const inputRef = useRef<HTMLInputElement>(null);
  
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

  const handleFocus = () => {
    openDropdown();
  };

  const handleBlur = (e: React.FocusEvent) => {
    // Delayed closing to allow for click events on the list items
    setTimeout(() => {
      if (!document.activeElement?.closest('.customer-list-container')) {
        setIsOpen(false);
      }
    }, 150);
  };

  return (
    <div className="w-full z-[9999]" style={{ position: 'relative', isolation: 'isolate' }}>
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
          className="customer-list-container p-0 w-[300px] bg-background border border-input rounded-md shadow-xl overflow-hidden"
          align="start"
          alignOffset={0}
          sideOffset={8}
          forceMount={true}
          avoidCollisions={true}
          style={{ zIndex: 99999, position: 'relative' }}
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
