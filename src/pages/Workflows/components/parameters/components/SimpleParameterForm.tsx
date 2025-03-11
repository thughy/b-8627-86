
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ParameterTypeSelect, { ParameterType } from './ParameterTypeSelect';
import { AssetParameter, createDefaultParameter } from '../../asset-modal/utils/parameterUtils';

interface SimpleParameterFormProps {
  parameter: AssetParameter;
  onChange: (parameter: AssetParameter) => void;
  onSubmit: () => void;
  onCancel?: () => void;
}

const SimpleParameterForm: React.FC<SimpleParameterFormProps> = ({
  parameter,
  onChange,
  onSubmit,
  onCancel
}) => {
  const handleTypeChange = (type: ParameterType) => {
    const defaultValue = type === 'select' ? [''] : 
                        type === 'number' ? 0 : 
                        type === 'boolean' ? false : 
                        type === 'date' ? new Date() : '';
    
    onChange({
      ...parameter,
      type,
      value: defaultValue,
      options: type === 'select' ? [''] : undefined
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <Input
          placeholder="Nome do parâmetro"
          value={parameter.name}
          onChange={(e) => onChange({...parameter, name: e.target.value})}
          className="flex-1"
        />
        <ParameterTypeSelect
          value={parameter.type}
          onValueChange={handleTypeChange}
          className="w-[140px]"
        />
      </div>

      <div className="flex justify-end gap-2 mt-4">
        {onCancel && (
          <Button type="button" variant="outline" size="sm" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button 
          type="button" 
          size="sm" 
          onClick={onSubmit}
          disabled={!parameter.name.trim()}
        >
          Adicionar
        </Button>
      </div>
    </div>
  );
};

export default SimpleParameterForm;
