
import React from 'react';
import { Check, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { AssetParameter } from '../../asset-modal/utils/parameterUtils';

interface ParameterValueProps {
  parameter: AssetParameter;
  className?: string;
  size?: 'default' | 'small';
}

const ParameterValue: React.FC<ParameterValueProps> = ({ parameter, className, size = 'default' }) => {
  const formatValue = (value: any, type: string) => {
    if (value === null || value === undefined) {
      return <span className="text-muted-foreground italic">Não definido</span>;
    }

    switch (type) {
      case 'text':
        return value;
      
      case 'number':
        return typeof value === 'number' 
          ? value.toLocaleString('pt-BR')
          : value;
      
      case 'date':
        try {
          const date = value instanceof Date ? value : new Date(value);
          return format(date, 'dd/MM/yyyy', { locale: ptBR });
        } catch (error) {
          return value;
        }
      
      case 'boolean':
        return value ? (
          <span className="flex items-center gap-1 text-green-600">
            <Check className={size === 'default' ? 'h-4 w-4' : 'h-3 w-3'} />
            <span className={size === 'small' ? 'text-sm' : ''}>Sim</span>
          </span>
        ) : (
          <span className="flex items-center gap-1 text-red-600">
            <X className={size === 'default' ? 'h-4 w-4' : 'h-3 w-3'} />
            <span className={size === 'small' ? 'text-sm' : ''}>Não</span>
          </span>
        );
      
      case 'select':
        if (Array.isArray(value)) {
          return value.join(', ');
        }
        
        if (Array.isArray(parameter.options) && parameter.options.length > 0) {
          return <Badge variant="outline" className={size === 'small' ? 'text-xs px-2 py-0' : ''}>{value}</Badge>;
        }
        
        return value;
        
      default:
        return String(value);
    }
  };

  return (
    <div className={className}>
      {formatValue(parameter.value, parameter.type)}
    </div>
  );
};

export default ParameterValue;
