
import React, { useState } from 'react';
import { Asset } from '@/pages/Workflows/models/WorkflowModels';
import ParameterForm from '@/pages/Workflows/components/parameters/ParameterForm';
import { AssetParameter, arrayToParameters, parametersToArray } from '@/pages/Workflows/components/asset-modal/utils/parameterUtils';

interface AssetParamsTabProps {
  formData: Partial<Asset>;
  onChange: (key: string, value: any) => void;
}

const AssetParamsTab: React.FC<AssetParamsTabProps> = ({ formData, onChange }) => {
  const [parameters, setParameters] = useState<AssetParameter[]>(
    formData.parameters ? parametersToArray(formData as Asset) : []
  );
  
  const handleParametersChange = (updatedParams: AssetParameter[]) => {
    setParameters(updatedParams);
    const parametersObject = arrayToParameters(updatedParams);
    onChange('parameters', parametersObject);
  };
  
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Configuração de Parâmetros</h3>
        <p className="text-sm text-muted-foreground">
          Configure os parâmetros personalizados para este asset. Estes parâmetros serão solicitados
          quando este asset for utilizado em um deal.
        </p>
      </div>
      
      <ParameterForm
        parameters={parameters}
        onChange={handleParametersChange}
      />
    </div>
  );
};

export default AssetParamsTab;
