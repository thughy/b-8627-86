
import React from 'react';
import { AssetParameter, getParameterTypeLabel } from '@/pages/Workflows/components/asset-modal/utils/parameterUtils';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar, CheckSquare, Type, Hash, ListFilter } from 'lucide-react';

interface ParameterDisplayProps {
  parameters: AssetParameter[];
  className?: string;
  maxHeight?: string;
}

const ParameterDisplay: React.FC<ParameterDisplayProps> = ({ 
  parameters, 
  className = '',
  maxHeight = "500px"
}) => {
  const getParameterIcon = (type: string) => {
    switch (type) {
      case 'text':
        return <Type className="h-3.5 w-3.5" />;
      case 'number':
        return <Hash className="h-3.5 w-3.5" />;
      case 'date':
        return <Calendar className="h-3.5 w-3.5" />;
      case 'boolean':
        return <CheckSquare className="h-3.5 w-3.5" />;
      case 'select':
        return <ListFilter className="h-3.5 w-3.5" />;
      default:
        return <Type className="h-3.5 w-3.5" />;
    }
  };
  
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
  
  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-base font-medium">Parâmetros</h3>
      
      <ScrollArea className={`max-h-[${maxHeight}]`}>
        <div className="space-y-3">
          {parameters.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              Nenhum parâmetro definido.
            </div>
          ) : (
            parameters.map((param, index) => (
              <div 
                key={index} 
                className="border rounded-md p-3 bg-card"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 p-1 rounded">
                      {getParameterIcon(param.type)}
                    </div>
                    <span className="font-medium">{param.name}</span>
                  </div>
                  <Badge variant="outline">{getParameterTypeLabel(param.type)}</Badge>
                </div>
                
                {param.description && (
                  <p className="text-sm text-muted-foreground mb-2">
                    {param.description}
                  </p>
                )}
                
                <div className="bg-muted/50 px-3 py-2 rounded-sm text-sm">
                  {param.type === 'select' && param.options ? (
                    <div className="flex flex-wrap gap-1">
                      {param.options.map((option, i) => (
                        <Badge
                          key={i}
                          variant={option === param.value ? "default" : "outline"}
                          className="text-xs"
                        >
                          {option}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <span>{formatParameterValue(param)}</span>
                  )}
                </div>
                
                {param.required && (
                  <div className="mt-2">
                    <Badge variant="secondary" className="text-xs">Obrigatório</Badge>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ParameterDisplay;
