
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
            /^https?:\/\//.test(String(value)) ? 'url' : 'text',
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

  const handleParamChange = (index: number, key: string, value: any) => {
    const updatedParams = [...parameters];
    
    if (key === "type") {
      updatedParams[index] = {
        ...updatedParams[index],
        type: value as ParameterType,
        value: getDefaultValueForType(value as ParameterType)
      };
    } else {
      updatedParams[index] = {
        ...updatedParams[index],
        [key]: value
      };
    }
    
    setParameters(updatedParams);
    updateParamsInAsset(updatedParams);
  };

  const handleRemoveParameter = (index: number) => {
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
          parameters.map((param, index) => (
            <ParameterItem
              key={index}
              param={param}
              index={index}
              onParamChange={handleParamChange}
              onRemoveParameter={handleRemoveParameter}
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
