
import React from 'react';
import { Deal } from '@/pages/Workflows/models/WorkflowModels';
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/ui/date-picker';
import FormField from '@/components/ui/form-field';

interface DealFinancialFieldsProps {
  formState: Partial<Deal>;
  handleChange: (field: keyof Deal, value: any) => void;
}

const DealFinancialFields: React.FC<DealFinancialFieldsProps> = ({
  formState,
  handleChange
}) => {
  return (
    <div className="space-y-4">
      <FormField id="amount" label="Valor">
        <Input 
          id="amount"
          type="number" 
          value={formState.amount?.toString() || ''} 
          onChange={(e) => handleChange('amount', Number(e.target.value))} 
        />
      </FormField>

      <FormField id="startDate" label="Data de Início">
        <DatePicker
          date={formState.startDate}
          onSelect={(date) => handleChange('startDate', date)}
          placeholder="Selecione a data"
        />
      </FormField>

      <FormField id="endDate" label="Data de Conclusão">
        <DatePicker
          date={formState.endDate}
          onSelect={(date) => handleChange('endDate', date)}
          placeholder="Selecione a data"
        />
      </FormField>
    </div>
  );
};

export default DealFinancialFields;
