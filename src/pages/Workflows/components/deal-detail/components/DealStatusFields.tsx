
import React from 'react';
import { Deal } from '@/pages/Workflows/models/WorkflowModels';
import SelectField from '@/components/ui/select-field';
import FormField from '@/components/ui/form-field';

interface DealStatusFieldsProps {
  formState: Partial<Deal>;
  handleChange: (field: keyof Deal, value: any) => void;
  reasonForLossOptions: Array<{ value: string; label: string }>;
  interestsOptions: Array<{ value: string; label: string }>;
}

const DealStatusFields: React.FC<DealStatusFieldsProps> = ({
  formState,
  handleChange,
  reasonForLossOptions,
  interestsOptions
}) => {
  return (
    <div className="space-y-4">
      {formState.status === 'lost' && (
        <FormField id="reasonForLoss" label="Motivo da Perda">
          <SelectField
            id="reasonForLoss"
            label=""
            value={formState.reasonForLoss || ''}
            onChange={(value) => handleChange('reasonForLoss', value)}
            options={reasonForLossOptions}
            placeholder="Selecione o motivo"
          />
        </FormField>
      )}

      <FormField id="interests" label="Interesses">
        <SelectField
          id="interests"
          label=""
          value={formState.interests || ''}
          onChange={(value) => handleChange('interests', value)}
          options={interestsOptions}
          placeholder="Selecione o interesse"
        />
      </FormField>
    </div>
  );
};

export default DealStatusFields;
