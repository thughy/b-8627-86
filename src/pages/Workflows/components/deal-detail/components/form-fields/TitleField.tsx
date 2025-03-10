
import React from 'react';
import { Input } from '@/components/ui/input';
import FormField from '@/components/ui/form-field';

interface TitleFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const TitleField: React.FC<TitleFieldProps> = ({ value, onChange }) => {
  return (
    <FormField id="title" label="Título" required>
      <Input
        id="title"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </FormField>
  );
};

export default TitleField;
