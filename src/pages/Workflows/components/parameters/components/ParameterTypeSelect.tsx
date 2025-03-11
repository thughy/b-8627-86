
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

export type ParameterType = 'text' | 'number' | 'date' | 'boolean' | 'select';

interface ParameterTypeSelectProps {
  value: ParameterType;
  onValueChange: (value: ParameterType) => void;
  className?: string;
}

const ParameterTypeSelect: React.FC<ParameterTypeSelectProps> = ({
  value,
  onValueChange,
  className
}) => {
  return (
    <Select
      value={value}
      onValueChange={(value) => onValueChange(value as ParameterType)}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder="Tipo" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="text">Texto</SelectItem>
        <SelectItem value="number">Número</SelectItem>
        <SelectItem value="date">Data</SelectItem>
        <SelectItem value="boolean">Sim/Não</SelectItem>
        <SelectItem value="select">Seleção</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default ParameterTypeSelect;
