
import React from 'react';
import { Deal } from '@/pages/Workflows/models/WorkflowModels';
import FormField from '@/components/ui/form-field';

interface DealDescriptionFieldProps {
  formState: Partial<Deal>;
  handleChange: (field: keyof Deal, value: any) => void;
}

const DealDescriptionField: React.FC<DealDescriptionFieldProps> = ({
  formState,
  handleChange
}) => {
  return (
    <FormField id="description" label="Descrição do Negócio">
      <textarea
        id="description"
        className="w-full min-h-[100px] p-2 border rounded"
        value={formState.description || ''}
        onChange={(e) => handleChange('description', e.target.value)}
      />
    </FormField>
  );
};

export default DealDescriptionField;
