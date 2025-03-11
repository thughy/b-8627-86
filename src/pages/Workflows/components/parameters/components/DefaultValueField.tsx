
import React from 'react';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { ParameterType } from './ParameterTypeSelect';

interface DefaultValueFieldProps {
  type: ParameterType;
  value: any;
  onChange: (value: any) => void;
}

const DefaultValueField: React.FC<DefaultValueFieldProps> = ({
  type,
  value,
  onChange
}) => {
  if (type === 'select') return null;

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Valor Padrão</label>
      {type === 'text' && (
        <Input
          placeholder="Valor padrão"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {type === 'number' && (
        <Input
          type="number"
          placeholder="0"
          value={value || 0}
          onChange={(e) => onChange(e.target.valueAsNumber)}
        />
      )}
      {type === 'boolean' && (
        <div className="flex items-center gap-2">
          <Switch
            checked={Boolean(value)}
            onCheckedChange={(checked) => onChange(checked)}
            id={`param-value-switch`}
          />
          <label 
            htmlFor={`param-value-switch`}
            className="text-sm cursor-pointer"
          >
            {Boolean(value) ? 'Sim' : 'Não'}
          </label>
        </div>
      )}
    </div>
  );
};

export default DefaultValueField;
