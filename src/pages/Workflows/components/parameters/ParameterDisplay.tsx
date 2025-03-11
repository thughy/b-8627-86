
import React from 'react';
import { AssetParameter } from '@/pages/Workflows/components/asset-modal/utils/parameterUtils';
import { ScrollArea } from '@/components/ui/scroll-area';
import ParameterItemDisplay from './components/ParameterItem.display';
import EmptyParametersState from './components/EmptyParametersState';

interface ParameterDisplayProps {
  parameters: AssetParameter[];
  className?: string;
  maxHeight?: string;
  onDelete?: () => void;
  onUpdate?: (value: any) => void;
  readOnly?: boolean;
  onAddParameter?: () => void;
  emptyMessage?: string;
}

const ParameterDisplay: React.FC<ParameterDisplayProps> = ({ 
  parameters, 
  className = '',
  maxHeight = "500px",
  onDelete,
  onUpdate,
  readOnly = false,
  onAddParameter,
  emptyMessage = "Nenhum parâmetro adicional configurado. Adicione parâmetros para personalizar este item."
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <ScrollArea className={`max-h-[${maxHeight}]`}>
        <div className="space-y-3">
          {parameters.length === 0 ? (
            <EmptyParametersState 
              showAddButton={!readOnly} 
              onAddParameter={onAddParameter}
              message={emptyMessage}
              icon="document"
            />
          ) : (
            parameters.map((param, index) => (
              <ParameterItemDisplay
                key={index}
                parameter={param}
                onDelete={onDelete}
                readOnly={readOnly}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ParameterDisplay;
