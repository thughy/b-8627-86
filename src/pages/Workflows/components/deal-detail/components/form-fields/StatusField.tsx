
import React from 'react';
import SelectField from '@/components/ui/select-field';

interface StatusFieldProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}

const StatusField: React.FC<StatusFieldProps> = ({ value, onChange, options }) => {
  return (
    <SelectField
      id="status"
      label="Status"
      value={value}
      onChange={onChange}
      options={options}
      placeholder="Selecione o status"
    />
  );
};

export default StatusField;
