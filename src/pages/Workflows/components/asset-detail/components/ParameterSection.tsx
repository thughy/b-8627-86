
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Asset } from '@/pages/Workflows/models/WorkflowModels';
import ParameterDisplay from '../../parameters/ParameterDisplay';
import ParameterForm from '../../parameters/ParameterForm';
import EmptyParametersState from '../../parameters/components/EmptyParametersState';

interface ParameterSectionProps {
  asset: Asset;
  onParameterAdd: (name: string, value: any, type: string) => void;
  onParameterDelete: (paramName: string) => void;
  onParameterUpdate: (paramName: string, value: any) => void;
  readOnly?: boolean;
}

const ParameterSection: React.FC<ParameterSectionProps> = ({
  asset,
  onParameterAdd,
  onParameterDelete,
  onParameterUpdate,
  readOnly = false
}) => {
  const [isAddingParameter, setIsAddingParameter] = useState(false);
  
  const handleAddParameterClick = () => {
    setIsAddingParameter(true);
  };

  const hasParameters = asset.parameters && Object.keys(asset.parameters).length > 0;

  return (
    <div>
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
            onSubmit={(name, value, type) => {
              onParameterAdd(name, value, type);
              setIsAddingParameter(false);
            }}
            onCancel={() => setIsAddingParameter(false)}
          />
        </div>
      )}
      
      <div className="space-y-3">
        {hasParameters ? (
          Object.entries(asset.parameters).map(([paramName, paramData]) => (
            <ParameterDisplay
              key={paramName}
              parameters={[{
                name: paramName,
                type: paramData.type,
                value: paramData.value,
                required: false
              }]}
              onDelete={() => onParameterDelete(paramName)}
              onUpdate={(value) => onParameterUpdate(paramName, value)}
              readOnly={readOnly}
            />
          ))
        ) : (
          <EmptyParametersState 
            showAddButton={!readOnly && !isAddingParameter}
            onAddParameter={handleAddParameterClick}
            message="Nenhum parâmetro adicional configurado para este asset"
          />
        )}
      </div>
    </div>
  );
};

export default ParameterSection;
