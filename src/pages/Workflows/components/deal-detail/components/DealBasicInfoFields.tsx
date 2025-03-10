
import React from 'react';
import { Input } from '@/components/ui/input';
import SelectField from '@/components/ui/select-field';
import FormField from '@/components/ui/form-field';
import CustomerSearch from './CustomerSearch';
import { Deal } from '@/pages/Workflows/models/WorkflowModels';

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
  statusOptions
}) => {
  const handleCustomerSelect = (customerName: string, customerType: 'person' | 'organization') => {
    handleChange('customerName', customerName);
    handleChange('customerType', customerType);
    
    // If it's an organization, set the organization name directly
    if (customerType === 'organization') {
      handleChange('customerOrganization', customerName);
    } else {
      // Clear organization if a person is selected without an organization
      handleChange('customerOrganization', '');
    }
  };

  return (
    <div className="grid gap-4">
      <FormField id="title" label="Título" required>
        <Input
          id="title"
          value={formState.title || ''}
          onChange={(e) => handleChange('title', e.target.value)}
        />
      </FormField>

      <FormField id="customer" label="Cliente" required>
        <CustomerSearch
          value={formState.customerName}
          onChange={handleCustomerSelect}
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
    </div>
  );
};

export default DealBasicInfoFields;
