
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Calendar, CheckCircle, XCircle, Type, Hash, ListFilter } from 'lucide-react';
import { AssetParameter } from '../../asset-modal/utils/parameterUtils';

interface ParameterValueProps {
  parameter: AssetParameter;
  className?: string;
}

const ParameterValue: React.FC<ParameterValueProps> = ({ parameter, className }) => {
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

  // Pegar o ícone para o tipo
  const getTypeIcon = () => {
    switch (parameter.type) {
      case 'text':
        return <Type className="h-4 w-4 text-blue-500 mr-1" />;
      case 'number':
        return <Hash className="h-4 w-4 text-purple-500 mr-1" />;
      case 'date':
        return <Calendar className="h-4 w-4 text-amber-500 mr-1" />;
      case 'boolean':
        return parameter.value 
          ? <CheckCircle className="h-4 w-4 text-green-500 mr-1" /> 
          : <XCircle className="h-4 w-4 text-red-500 mr-1" />;
      case 'select':
        return <ListFilter className="h-4 w-4 text-teal-500 mr-1" />;
      default:
        return <Type className="h-4 w-4 text-gray-500 mr-1" />;
    }
  };

  // Renderização específica para cada tipo
  switch (parameter.type) {
    case 'select':
      // Para tipo select, mostrar opções com badges
      return (
        <div className={`flex flex-wrap gap-1 ${className}`}>
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
        <div className={`flex items-center ${className}`}>
          {getTypeIcon()}
          <span>{formatParameterValue(parameter)}</span>
        </div>
      );
      
    default:
      // Para outros tipos, mostrar ícone + valor formatado
      return (
        <div className={`flex items-center ${className}`}>
          {getTypeIcon()}
          <span>{formatParameterValue(parameter)}</span>
        </div>
      );
  }
};

export default ParameterValue;
