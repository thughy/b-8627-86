
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash, Plus } from "lucide-react";
import { Asset } from "@/pages/Workflows/models/WorkflowModels";

interface AssetParamsTabProps {
  formData: Partial<Asset>;
  onChange: (key: string, value: any) => void;
}

type ParameterType = 'text' | 'number' | 'date' | 'switch' | 'url' | 'file';

interface Parameter {
  name: string;
  type: ParameterType;
  value: any;
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
  const [newParamName, setNewParamName] = useState("");
  const [newParamType, setNewParamType] = useState<ParameterType>("text");

  const handleAddParameter = () => {
    if (!newParamName) return;
    
    let defaultValue: any;
    switch (newParamType) {
      case 'number':
        defaultValue = 0;
        break;
      case 'date':
        defaultValue = new Date();
        break;
      case 'switch':
        defaultValue = false;
        break;
      case 'url':
        defaultValue = 'https://';
        break;
      case 'file':
        defaultValue = null;
        break;
      default:
        defaultValue = '';
    }
    
    const newParam: Parameter = {
      name: newParamName,
      type: newParamType,
      value: defaultValue
    };
    
    const updatedParams = [...parameters, newParam];
    setParameters(updatedParams);
    
    // Update the asset parameters
    const paramObj = updatedParams.reduce((acc, param) => {
      acc[param.name] = param.value;
      return acc;
    }, {} as Record<string, any>);
    
    onChange("parameters", paramObj);
    setNewParamName("");
  };

  const handleParamChange = (index: number, value: any) => {
    const updatedParams = [...parameters];
    updatedParams[index].value = value;
    setParameters(updatedParams);
    
    // Update the asset parameters
    const paramObj = updatedParams.reduce((acc, param) => {
      acc[param.name] = param.value;
      return acc;
    }, {} as Record<string, any>);
    
    onChange("parameters", paramObj);
  };

  const handleRemoveParameter = (index: number) => {
    const updatedParams = parameters.filter((_, idx) => idx !== index);
    setParameters(updatedParams);
    
    // Update the asset parameters
    const paramObj = updatedParams.reduce((acc, param) => {
      acc[param.name] = param.value;
      return acc;
    }, {} as Record<string, any>);
    
    onChange("parameters", paramObj);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {parameters.map((param, index) => (
          <div key={index} className="flex items-center gap-2 p-3 border rounded-md">
            <div className="flex-1">
              <Label className="text-xs text-muted-foreground">{param.name} ({param.type})</Label>
              {param.type === 'text' && (
                <Input 
                  value={param.value || ""}
                  onChange={(e) => handleParamChange(index, e.target.value)}
                  className="mt-1"
                />
              )}
              {param.type === 'number' && (
                <Input 
                  type="number"
                  value={param.value || 0}
                  onChange={(e) => handleParamChange(index, parseFloat(e.target.value))}
                  className="mt-1"
                />
              )}
              {param.type === 'date' && (
                <Input 
                  type="date"
                  value={param.value instanceof Date ? param.value.toISOString().split('T')[0] : ""}
                  onChange={(e) => handleParamChange(index, new Date(e.target.value))}
                  className="mt-1"
                />
              )}
              {param.type === 'switch' && (
                <div className="flex items-center mt-1">
                  <Button
                    type="button"
                    variant={param.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleParamChange(index, true)}
                    className="rounded-r-none"
                  >
                    Sim
                  </Button>
                  <Button
                    type="button"
                    variant={!param.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleParamChange(index, false)}
                    className="rounded-l-none"
                  >
                    Não
                  </Button>
                </div>
              )}
              {param.type === 'url' && (
                <Input 
                  type="url"
                  value={param.value || ""}
                  onChange={(e) => handleParamChange(index, e.target.value)}
                  className="mt-1"
                />
              )}
              {param.type === 'file' && (
                <Input 
                  type="file"
                  onChange={(e) => handleParamChange(index, e.target.files?.[0] || null)}
                  className="mt-1"
                />
              )}
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => handleRemoveParameter(index)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        <h3 className="text-sm font-medium mb-2">Adicionar Novo Parâmetro</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div>
            <Label htmlFor="paramName" className="text-xs">Nome</Label>
            <Input
              id="paramName" 
              placeholder="Nome do parâmetro"
              value={newParamName}
              onChange={(e) => setNewParamName(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="paramType" className="text-xs">Tipo</Label>
            <Select 
              value={newParamType} 
              onValueChange={(value) => setNewParamType(value as ParameterType)}
            >
              <SelectTrigger id="paramType" className="mt-1">
                <SelectValue placeholder="Tipo do parâmetro" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Texto</SelectItem>
                <SelectItem value="number">Número</SelectItem>
                <SelectItem value="date">Data</SelectItem>
                <SelectItem value="switch">Switch</SelectItem>
                <SelectItem value="url">URL</SelectItem>
                <SelectItem value="file">Arquivo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button 
              onClick={handleAddParameter}
              disabled={!newParamName}
              className="w-full mt-1"
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetParamsTab;
