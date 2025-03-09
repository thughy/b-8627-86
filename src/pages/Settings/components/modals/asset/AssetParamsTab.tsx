
import React, { useState } from "react";
import { Asset } from "@/pages/Workflows/models/WorkflowModels";
import ParameterItem, { Parameter, ParameterType } from "./components/ParameterItem";
import AddParameterForm from "./components/AddParameterForm";
import { Info } from "lucide-react";

interface AssetParamsTabProps {
  formData: Partial<Asset>;
  onChange: (key: string, value: any) => void;
}

const AssetParamsTab = ({ formData, onChange }: AssetParamsTabProps) => {
  const [parameters, setParameters] = useState<Parameter[]>(
    Object.entries(formData.parameters || {}).map(([name, value]) => ({
      name,
      type: typeof value === 'number' ? 'number' : 
            typeof value === 'boolean' ? 'switch' : 
            value instanceof Date ? 'date' : 
            Array.isArray(value) ? 'dropdown' :
            typeof value === 'object' && value !== null ? 'file' : 'text',
      value
    }))
  );

  const getDefaultValueForType = (type: ParameterType) => {
    switch (type) {
      case 'number':
        return 0;
      case 'date':
        return new Date();
      case 'switch':
        return false;
      case 'dropdown':
        return ['Opção 1'];
      case 'file':
        return null;
      default:
        return '';
    }
  };

  const updateParamsInAsset = (updatedParams: Parameter[]) => {
    const paramObj = updatedParams.reduce((acc, param) => {
      acc[param.name] = param.value;
      return acc;
    }, {} as Record<string, any>);
    
    onChange("parameters", paramObj);
  };

  const handleAddParameter = (name: string, type: ParameterType) => {
    const defaultValue = getDefaultValueForType(type);
    
    const newParam: Parameter = {
      name,
      type,
      value: defaultValue
    };
    
    const updatedParams = [...parameters, newParam];
    setParameters(updatedParams);
    updateParamsInAsset(updatedParams);
  };

  const handleUpdateParameter = (index: number, updatedParameter: Parameter) => {
    const updatedParams = [...parameters];
    updatedParams[index] = updatedParameter;
    
    setParameters(updatedParams);
    updateParamsInAsset(updatedParams);
  };

  const handleDeleteParameter = (index: number) => {
    const updatedParams = parameters.filter((_, idx) => idx !== index);
    setParameters(updatedParams);
    updateParamsInAsset(updatedParams);
  };

  return (
    <div className="space-y-6">
      <div className="p-3 bg-muted rounded-md flex items-start gap-3">
        <Info className="h-5 w-5 mt-0.5 flex-shrink-0 text-blue-500" />
        <div className="text-sm">
          <p className="font-medium">Parâmetros de configuração</p>
          <p className="text-muted-foreground">
            Defina os parâmetros que os usuários poderão configurar para este asset. 
            Os valores serão preenchidos pelo usuário em sua instância.
          </p>
        </div>
      </div>
      
      <div className="space-y-4">
        {parameters.length > 0 ? (
          parameters.map((parameter, index) => (
            <ParameterItem
              key={index}
              parameter={parameter}
              onDelete={() => handleDeleteParameter(index)}
              onUpdate={(updatedParam) => handleUpdateParameter(index, updatedParam)}
            />
          ))
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            Nenhum parâmetro configurado. Adicione um novo parâmetro abaixo.
          </div>
        )}
      </div>

      <AddParameterForm onAddParameter={handleAddParameter} />
    </div>
  );
};

export default AssetParamsTab;
