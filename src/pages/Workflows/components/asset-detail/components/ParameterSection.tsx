
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Asset } from '@/pages/Workflows/models/WorkflowModels';
import ParameterDisplay from '../../parameters/ParameterDisplay';
import ParameterForm from '../../parameters/ParameterForm';

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

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Parâmetros Adicionais</h3>
        {!readOnly && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsAddingParameter(true)}
            className="flex items-center"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
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
        {asset.parameters && Object.keys(asset.parameters).length > 0 ? (
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
          <div className="text-muted-foreground text-center py-4">
            Nenhum parâmetro adicional configurado
          </div>
        )}
      </div>
    </div>
  );
};

export default ParameterSection;
