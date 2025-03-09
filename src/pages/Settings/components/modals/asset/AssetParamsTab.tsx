import React, { useState } from "react";
import { Asset } from "@/pages/Workflows/models/WorkflowModels";
import ParameterItem, { Parameter, ParameterType } from "./components/ParameterItem";
import AddParameterForm from "./components/AddParameterForm";

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
      case 'url':
        return 'https://';
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
      <div className="space-y-4">
        {parameters.map((param, index) => (
          <ParameterItem
            key={index}
            param={param}
            index={index}
            onParamChange={handleParamChange}
            onRemoveParameter={handleRemoveParameter}
          />
        ))}
      </div>

      <AddParameterForm onAddParameter={handleAddParameter} />
    </div>
  );
};

export default AssetParamsTab;
