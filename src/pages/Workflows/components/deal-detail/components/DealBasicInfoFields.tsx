
import React from 'react';
import { Deal } from '@/pages/Workflows/models/WorkflowModels';
import { Input } from '@/components/ui/input';
import SelectField from '@/components/ui/select-field';
import FormField from '@/components/ui/form-field';

interface DealBasicInfoFieldsProps {
  formState: Partial<Deal>;
  handleChange: (field: keyof Deal, value: any) => void;
  typeOptions: Array<{ value: string; label: string }>;
  customerTypeOptions: Array<{ value: string; label: string }>;
}

const DealBasicInfoFields: React.FC<DealBasicInfoFieldsProps> = ({
  formState,
  handleChange,
  typeOptions,
  customerTypeOptions
}) => {
  return (
    <div className="space-y-4">
      <FormField id="title" label="Título" required>
        <Input 
          id="title"
          value={formState.title || ''} 
          onChange={(e) => handleChange('title', e.target.value)} 
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

      <FormField id="customerType" label="Tipo de Cliente">
        <SelectField
          id="customerType"
          label=""
          value={formState.customerType || ''}
          onChange={(value) => handleChange('customerType', value)}
          options={customerTypeOptions}
          placeholder="Selecione o tipo de cliente"
        />
      </FormField>

      <FormField id="customerName" label="Cliente">
        <Input 
          id="customerName"
          value={formState.customerName || ''} 
          onChange={(e) => handleChange('customerName', e.target.value)} 
        />
      </FormField>

      <FormField id="customerOrganization" label="Organização">
        <Input 
          id="customerOrganization"
          value={formState.customerOrganization || ''} 
          onChange={(e) => handleChange('customerOrganization', e.target.value)} 
        />
      </FormField>
    </div>
  );
};

export default DealBasicInfoFields;
