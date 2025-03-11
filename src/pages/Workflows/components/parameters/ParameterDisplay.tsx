
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
  emptyStateIcon?: 'settings' | 'document' | 'database' | 'parameters';
  showEmptyStateAddButton?: boolean;
  size?: 'default' | 'small';
  hideScrollArea?: boolean;
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
  size = 'default',
  hideScrollArea = false
}) => {
  const handleDelete = (paramName: string) => {
    if (onDelete) {
      onDelete(paramName);
    }
  };

  const handleUpdate = (paramName: string, value: any) => {
    if (onUpdate) {
      onUpdate(paramName, value);
    }
  };

  // Convert parameters object to array if it's not already
  const paramArray = Array.isArray(parameters) 
    ? parameters 
    : parameters 
      ? Object.entries(parameters).map(([name, paramData]) => {
          // Ensure we're working with a proper AssetParameter
          if (paramData && typeof paramData === 'object') {
            return {
              name,
              type: (paramData as any).type || 'text',
              value: (paramData as any).value,
              options: (paramData as any).options,
              ...(paramData as object)
            } as AssetParameter;
          }
          // Default parameter if data is not in expected format
          return {
            name,
            type: 'text',
            value: paramData
          } as AssetParameter;
        }) 
      : [];

  // Set dynamic max height
  const scrollAreaStyles = {
    maxHeight: maxHeight
  };

  const renderContent = () => (
    <div className="space-y-3 pr-4">
      {paramArray.length === 0 ? (
        <EmptyParametersState 
          showAddButton={!readOnly && showEmptyStateAddButton} 
          onAddParameter={onAddParameter}
          message={emptyMessage}
          icon={emptyStateIcon}
          size={size}
        />
      ) : (
        paramArray.map((param, index) => (
          <ParameterItemDisplay
            key={index}
            parameter={param}
            onDelete={() => handleDelete(param.name)}
            onUpdate={(value) => handleUpdate(param.name, value)}
            readOnly={readOnly}
            size={size}
          />
        ))
      )}
    </div>
  );

  return (
    <div className={`space-y-4 ${className}`}>
      {hideScrollArea ? (
        renderContent()
      ) : (
        <ScrollArea className="w-full" style={scrollAreaStyles}>
          {renderContent()}
        </ScrollArea>
      )}
    </div>
  );
};

export default ParameterDisplay;
