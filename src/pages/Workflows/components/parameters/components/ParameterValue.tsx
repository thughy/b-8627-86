
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { AssetParameter } from '../../asset-modal/utils/parameterUtils';

interface ParameterValueProps {
  parameter: AssetParameter;
}

const ParameterValue: React.FC<ParameterValueProps> = ({ parameter }) => {
  const formatParameterValue = (param: AssetParameter) => {
    if (param.type === 'boolean') {
      return param.value ? 'Sim' : 'Não';
    }
    
    if (param.type === 'date' && param.value instanceof Date) {
      return param.value.toLocaleDateString('pt-BR');
    }
    
    if (param.type === 'select' && param.options) {
      return param.value;
    }
    
    return String(param.value || '');
  };

  if (parameter.type === 'select' && parameter.options) {
    return (
      <div className="flex flex-wrap gap-1">
        {parameter.options.map((option, i) => (
          <Badge
            key={i}
            variant={option === parameter.value ? "default" : "outline"}
            className="text-xs"
          >
            {option}
          </Badge>
        ))}
      </div>
    );
  }
  
  return <span>{formatParameterValue(parameter)}</span>;
};

export default ParameterValue;
