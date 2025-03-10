
import React, { useRef, useEffect } from 'react';
import { Customer } from '@/pages/Workflows/models/CustomerModel';
import CustomerListItem from './CustomerListItem';
import { Loader2 } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";

interface CustomerListProps {
  customers: Customer[];
  isLoading: boolean;
  searchTerm: string;
  onSelectCustomer: (customer: Customer) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ 
  customers, 
  isLoading, 
  searchTerm, 
  onSelectCustomer 
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Focus the first item when list receives focus
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!listRef.current) return;
      
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const items = listRef.current.querySelectorAll('[role="option"]');
        if (items.length > 0) {
          (items[0] as HTMLElement).focus();
        }
      }
    };
    
    const listElement = listRef.current;
    if (listElement) {
      listElement.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      if (listElement) {
        listElement.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [customers]);
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };
  
  if (isLoading) {
    return (
      <div className="p-4 text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Carregando clientes...</span>
        </div>
      </div>
    );
  }
  
  if (customers.length > 0) {
    return (
      <ScrollArea 
        className="max-h-[300px] relative z-[9999]" 
        onClick={handleClick}
      >
        <div 
          ref={listRef} 
          className="p-2" 
          role="listbox" 
          tabIndex={-1}
          onClick={handleClick}
        >
          {customers.map((customer) => (
            <CustomerListItem 
              key={customer.id} 
              customer={customer} 
              onSelect={onSelectCustomer} 
            />
          ))}
        </div>
      </ScrollArea>
    );
  }
  
  if (searchTerm && searchTerm.length >= 2) {
    return (
      <div className="p-4 text-center text-sm text-muted-foreground">
        Nenhum cliente encontrado
      </div>
    );
  }
  
  return (
    <div className="p-4 text-center text-sm text-muted-foreground">
      Digite pelo menos 2 caracteres para buscar clientes
    </div>
  );
};

export default CustomerList;
