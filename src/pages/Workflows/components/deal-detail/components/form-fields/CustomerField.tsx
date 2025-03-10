
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
  const popoverRef = useRef<HTMLDivElement>(null);
  
  const handleCustomerSelect = (customer: Customer) => {
    selectCustomer(customer);
    onCustomerSelect(customer);
    // Close dropdown after selection
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
    // Check if the related target is inside our popover
    const relatedTarget = e.relatedTarget as Node;
    if (relatedTarget instanceof Element) {
      const isInsidePopover = relatedTarget.closest('[role="listbox"]') || 
                             relatedTarget.closest('[role="option"]');
      if (isInsidePopover) return;
    }
    
    // Use a longer delay to allow click events to register fully
    setTimeout(() => setIsOpen(false), 300);
  };

  // Prevent clicks from passing through
  const handlePopoverClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="w-full relative">
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
          ref={popoverRef}
          role="presentation"
          className="p-0 w-[300px] bg-background border-2 border-input-border rounded-md shadow-xl z-[200] overflow-hidden"
          align="start"
          alignOffset={0}
          sideOffset={8}
          onClick={handlePopoverClick}
          onInteractOutside={(e) => {
            e.preventDefault();
            setIsOpen(false);
          }}
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
