
import React from 'react';
import { AssetParameter } from '@/pages/Workflows/components/asset-modal/utils/parameterUtils';
import { ScrollArea } from '@/components/ui/scroll-area';
import ParameterItemDisplay from './components/ParameterItem.display';
import EmptyParametersState from './components/EmptyParametersState';

interface ParameterDisplayProps {
  parameters: AssetParameter[];
  className?: string;
  maxHeight?: string;
  onDelete?: (paramName: string) => void;
  onUpdate?: (paramName: string, value: any) => void;
  readOnly?: boolean;
  onAddParameter?: () => void;
  emptyMessage?: string;
  emptyStateIcon?: 'settings' | 'document' | 'database';
  showEmptyStateAddButton?: boolean;
  size?: 'default' | 'small';
}

const ParameterDisplay: React.FC<ParameterDisplayProps> = ({ 
  parameters, 
  className = '',
  maxHeight = "500px",
  onDelete,
  onUpdate,
  readOnly = false,
  onAddParameter,
  emptyMessage = "Nenhum parâmetro adicional configurado. Adicione parâmetros para personalizar este item.",
  emptyStateIcon = "document",
  showEmptyStateAddButton = true,
  size = 'default'
}) => {
  const handleDelete = (paramName: string) => {
    if (onDelete) {
      onDelete(paramName);
    }
  };

  // Set dynamic max height
  const scrollAreaStyles = {
    maxHeight: maxHeight
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <ScrollArea className="w-full" style={scrollAreaStyles}>
        <div className="space-y-3 pr-4">
          {parameters.length === 0 ? (
            <EmptyParametersState 
              showAddButton={!readOnly && showEmptyStateAddButton} 
              onAddParameter={onAddParameter}
              message={emptyMessage}
              icon={emptyStateIcon}
              size={size}
            />
          ) : (
            parameters.map((param, index) => (
              <ParameterItemDisplay
                key={index}
                parameter={param}
                onDelete={() => handleDelete(param.name)}
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
