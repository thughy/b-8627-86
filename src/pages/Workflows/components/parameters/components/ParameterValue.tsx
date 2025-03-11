
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Calendar, CheckCircle, XCircle } from 'lucide-react';
import { AssetParameter } from '../../asset-modal/utils/parameterUtils';

interface ParameterValueProps {
  parameter: AssetParameter;
}

const ParameterValue: React.FC<ParameterValueProps> = ({ parameter }) => {
  // Função para formatar valores de parâmetros de acordo com o tipo
  const formatParameterValue = (param: AssetParameter) => {
    // Para tipo booleano, mostra Sim/Não
    if (param.type === 'boolean') {
      return param.value ? 'Sim' : 'Não';
    }
    
    // Para tipo data, formata a data
    if (param.type === 'date' && param.value) {
      try {
        const date = param.value instanceof Date 
          ? param.value 
          : new Date(param.value);
        
        return !isNaN(date.getTime()) 
          ? date.toLocaleDateString('pt-BR') 
          : 'Data inválida';
      } catch (error) {
        return 'Data inválida';
      }
    }
    
    // Para tipo número, formata com separadores de milhar
    if (param.type === 'number') {
      const num = Number(param.value);
      return !isNaN(num) 
        ? num.toLocaleString('pt-BR') 
        : param.value || '';
    }
    
    // Para outros tipos ou quando não há valor
    return String(param.value || '');
  };

  // Renderização específica para cada tipo
  switch (parameter.type) {
    case 'select':
      // Para tipo select, mostrar opções com badges
      return (
        <div className="flex flex-wrap gap-1">
          {parameter.options?.map((option, i) => (
            <Badge
              key={i}
              variant={option === parameter.value ? "default" : "outline"}
              className="text-xs"
            >
              {option}
            </Badge>
          )) || <span className="text-muted-foreground">Sem opções definidas</span>}
        </div>
      );
      
    case 'boolean':
      // Para tipo booleano, mostrar ícone de check ou X
      return (
        <div className="flex items-center">
          {parameter.value ? (
            <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
          ) : (
            <XCircle className="h-4 w-4 text-red-500 mr-1" />
          )}
          <span>{formatParameterValue(parameter)}</span>
        </div>
      );
      
    case 'date':
      // Para tipo data, mostrar ícone de calendário
      return (
        <div className="flex items-center">
          <Calendar className="h-4 w-4 text-muted-foreground mr-1" />
          <span>{formatParameterValue(parameter)}</span>
        </div>
      );
      
    default:
      // Para outros tipos, apenas mostrar o valor formatado
      return <span>{formatParameterValue(parameter)}</span>;
  }
};

export default ParameterValue;
