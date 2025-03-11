
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Asset } from '@/pages/Workflows/models/WorkflowModels';
import ParameterDisplay from '../../parameters/ParameterDisplay';
import ParameterForm from '../../parameters/ParameterForm';
import { AssetParameter } from '../../asset-modal/utils/parameterUtils';
import { Card, CardContent } from '@/components/ui/card';

interface ParameterSectionProps {
  asset: Asset;
  onParameterAdd: (name: string, value: any, type: string) => void;
  onParameterDelete: (paramName: string) => void;
  onParameterUpdate: (paramName: string, value: any) => void;
  readOnly?: boolean;
  className?: string;
}

const ParameterSection: React.FC<ParameterSectionProps> = ({
  asset,
  onParameterAdd,
  onParameterDelete,
  onParameterUpdate,
  readOnly = false,
  className = ''
}) => {
  const [isAddingParameter, setIsAddingParameter] = useState(false);
  const [parametersArray, setParametersArray] = useState<AssetParameter[]>([]);
  
  useEffect(() => {
    // Convert parameters object to array for display
    if (asset.parameters && Object.keys(asset.parameters).length > 0) {
      const paramsArray = Object.entries(asset.parameters).map(([paramName, paramData]) => ({
        name: paramName,
        type: paramData.type || determineParameterType(paramData.value),
        value: paramData.value,
        required: paramData.required || false,
        description: paramData.description || ''
      }));
      setParametersArray(paramsArray);
    } else {
      setParametersArray([]);
    }
  }, [asset.parameters]);
  
  const determineParameterType = (value: any): 'text' | 'number' | 'date' | 'boolean' | 'select' => {
    if (typeof value === 'number') return 'number';
    if (typeof value === 'boolean') return 'boolean';
    if (value instanceof Date) return 'date';
    if (Array.isArray(value)) return 'select';
    
    return 'text';
  };

  const handleAddParameterClick = () => {
    setIsAddingParameter(true);
  };

  const handleAddParameter = (name: string, value: any, type: string) => {
    onParameterAdd(name, value, type);
    setIsAddingParameter(false);
  };

  const handleCancelAdd = () => {
    setIsAddingParameter(false);
  };

  return (
    <Card className={`${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Parâmetros Adicionais</h3>
          {!readOnly && !isAddingParameter && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleAddParameterClick}
              className="flex items-center gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              Adicionar Parâmetro
            </Button>
          )}
        </div>
        
        {isAddingParameter && (
          <div className="bg-muted/50 p-4 rounded-md mb-4">
            <ParameterForm 
              parameters={[]}
              onChange={() => {}}
              onSubmit={handleAddParameter}
              onCancel={handleCancelAdd}
            />
          </div>
        )}
        
        <ParameterDisplay 
          parameters={parametersArray}
          onDelete={onParameterDelete}
          readOnly={readOnly}
          onAddParameter={handleAddParameterClick}
          emptyMessage="Nenhum parâmetro adicional configurado para este asset"
          emptyStateIcon="database"
          showEmptyStateAddButton={!isAddingParameter}
        />
      </CardContent>
    </Card>
  );
};

export default ParameterSection;
