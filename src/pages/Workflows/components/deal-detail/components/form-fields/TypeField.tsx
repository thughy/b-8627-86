
import React from 'react';
import SelectField from '@/components/ui/select-field';

interface TypeFieldProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}

const TypeField: React.FC<TypeFieldProps> = ({ value, onChange, options }) => {
  return (
    <SelectField
      id="type"
      label="Tipo"
      value={value}
      onChange={onChange}
      options={options}
      placeholder="Selecione o tipo"
    />
  );
};

export default TypeField;
