
import React from 'react';
import { Deal } from '@/pages/Workflows/models/WorkflowModels';
import { Customer } from '@/pages/Workflows/models/CustomerModel';
import TitleField from './form-fields/TitleField';
import TypeField from './form-fields/TypeField';
import StatusField from './form-fields/StatusField';
import CustomerField from './form-fields/CustomerField';

interface DealBasicInfoFieldsProps {
  formState: Partial<Deal>;
  handleChange: (field: keyof Deal, value: any) => void;
  typeOptions: Array<{ value: string; label: string }>;
  statusOptions: Array<{ value: string; label: string }>;
}

const DealBasicInfoFields: React.FC<DealBasicInfoFieldsProps> = ({
  formState,
  handleChange,
  typeOptions,
  statusOptions
}) => {
  // Handle customer selection
  const handleCustomerSelect = (customer: Customer) => {
    handleChange('customerName', customer.name);
    
    if (customer.type === 'organization') {
      handleChange('customerOrganization', customer.name);
      handleChange('customerType', 'organization');
    } else {
      const person = customer as any;
      handleChange('customerOrganization', person.organizationName || '');
      handleChange('customerType', 'person');
    }
  };

  return (
    <div className="grid gap-4">
      <TitleField 
        value={formState.title || ''} 
        onChange={(value) => handleChange('title', value)} 
      />
      
      <CustomerField 
        customerName={formState.customerName}
        customerOrganization={formState.customerOrganization}
        customerType={formState.customerType}
        onCustomerSelect={handleCustomerSelect}
      />
      
      <TypeField 
        value={formState.type || ''} 
        onChange={(value) => handleChange('type', value)} 
        options={typeOptions} 
      />
      
      <StatusField 
        value={formState.status || ''} 
        onChange={(value) => handleChange('status', value)} 
        options={statusOptions} 
      />
    </div>
  );
};

export default DealBasicInfoFields;
