
import React from 'react';
import { Deal } from '@/pages/Workflows/models/WorkflowModels';
import { Input } from '@/components/ui/input';
import SelectField from '@/components/ui/select-field';
import FormField from '@/components/ui/form-field';
import CustomerSearch from './CustomerSearch';

interface DealBasicInfoFieldsProps {
  formState: Partial<Deal>;
  handleChange: (field: keyof Deal, value: any) => void;
  typeOptions: Array<{ value: string; label: string }>;
  statusOptions: Array<{ value: string; label: string }>;
  customerTypeOptions: Array<{ value: string; label: string }>;
}

const DealBasicInfoFields: React.FC<DealBasicInfoFieldsProps> = ({
  formState,
  handleChange,
  typeOptions,
  statusOptions,
  customerTypeOptions
}) => {
  const handleCustomerSelect = (customerName: string, customerType: 'person' | 'organization') => {
    handleChange('customerName', customerName);
    handleChange('customerType', customerType);
    
    // If it's an organization, we set the customerOrganization to the same name
    // If it's a person, we leave the organization field as is
    if (customerType === 'organization') {
      handleChange('customerOrganization', customerName);
    }
  };

  return (
    <div className="space-y-4">
      <FormField id="title" label="Título" required>
        <Input 
          id="title"
          value={formState.title || ''} 
          onChange={(e) => handleChange('title', e.target.value)} 
        />
      </FormField>

      <FormField id="status" label="Status">
        <SelectField
          id="status"
          label=""
          value={formState.status || ''}
          onChange={(value) => handleChange('status', value)}
          options={statusOptions}
          placeholder="Selecione o status"
        />
      </FormField>

      <FormField id="type" label="Tipo">
        <SelectField
          id="type"
          label=""
          value={formState.type || ''}
          onChange={(value) => handleChange('type', value)}
          options={typeOptions}
          placeholder="Selecione o tipo"
        />
      </FormField>

      <FormField id="customer" label="Cliente">
        <CustomerSearch
          value={formState.customerName}
          onChange={handleCustomerSelect}
        />
      </FormField>

      <FormField id="customerOrganization" label="Organização">
        <Input 
          id="customerOrganization"
          value={formState.customerOrganization || ''} 
          onChange={(e) => handleChange('customerOrganization', e.target.value)} 
          disabled={formState.customerType === 'organization'}
        />
      </FormField>
    </div>
  );
};

export default DealBasicInfoFields;
