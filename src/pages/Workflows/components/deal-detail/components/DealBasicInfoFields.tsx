
import React from 'react';
import { Deal } from '@/pages/Workflows/models/WorkflowModels';
import TitleField from './form-fields/TitleField';
import TypeField from './form-fields/TypeField';
import StatusField from './form-fields/StatusField';

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
  return (
    <div className="grid gap-4">
      <TitleField 
        value={formState.title || ''} 
        onChange={(value) => handleChange('title', value)} 
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
