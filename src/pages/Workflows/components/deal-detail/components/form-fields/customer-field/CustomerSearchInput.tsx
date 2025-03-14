
import React, { forwardRef } from 'react';
import { Input } from '@/components/ui/input';
import { Search, X, User, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CustomerSearchInputProps {
  searchTerm: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: (e: React.FocusEvent) => void;
  onClearSelection: (e: React.MouseEvent) => void;
  hasSelectedCustomer: boolean;
  customerName?: string;
  customerOrganization?: string;
  customerType?: string;
}

const CustomerSearchInput = forwardRef<HTMLInputElement, CustomerSearchInputProps>(({
  searchTerm,
  onChange,
  onFocus,
  onBlur,
  onClearSelection,
  hasSelectedCustomer,
  customerName,
  customerOrganization,
  customerType
}, ref) => {
  const CustomerIcon = customerType === 'organization' ? Building2 : User;

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
        
        <Input
          ref={ref}
          type="text"
          placeholder={hasSelectedCustomer ? '' : "Buscar cliente..."}
          className={cn(
            "pl-8 pr-8 h-10", // Increased height
            hasSelectedCustomer ? "cursor-pointer" : ""
          )}
          value={searchTerm}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          autoComplete="off"
        />
        
        {hasSelectedCustomer && !searchTerm && (
          <div className="absolute left-8 top-0 flex items-center h-full pointer-events-none">
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

        {(hasSelectedCustomer || searchTerm) && (
          <button
            type="button"
            onClick={onClearSelection}
            className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground hover:text-foreground"
            aria-label="Limpar seleção"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
});

CustomerSearchInput.displayName = 'CustomerSearchInput';

export default CustomerSearchInput;
