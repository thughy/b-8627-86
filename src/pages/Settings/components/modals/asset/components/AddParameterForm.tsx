
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Type, Calendar, Hash, ToggleLeft, ListFilter, File } from "lucide-react";
import { ParameterType } from "./ParameterItem";

interface AddParameterFormProps {
  onAddParameter: (name: string, type: ParameterType) => void;
}

const AddParameterForm = ({ onAddParameter }: AddParameterFormProps) => {
  const [newParamName, setNewParamName] = useState("");
  const [newParamType, setNewParamType] = useState<ParameterType>("text");

  const handleAddParameter = () => {
    if (!newParamName) return;
    onAddParameter(newParamName, newParamType);
    setNewParamName("");
  };

  return (
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
            <SelectContent className="bg-popover">
              <SelectItem value="text" className="flex items-center gap-2">
                <Type className="h-4 w-4" />
                <span>Texto</span>
              </SelectItem>
              <SelectItem value="number" className="flex items-center gap-2">
                <Hash className="h-4 w-4" />
                <span>Número</span>
              </SelectItem>
              <SelectItem value="date" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Data</span>
              </SelectItem>
              <SelectItem value="switch" className="flex items-center gap-2">
                <ToggleLeft className="h-4 w-4" />
                <span>Switch</span>
              </SelectItem>
              <SelectItem value="dropdown" className="flex items-center gap-2">
                <ListFilter className="h-4 w-4" />
                <span>Lista</span>
              </SelectItem>
              <SelectItem value="file" className="flex items-center gap-2">
                <File className="h-4 w-4" />
                <span>Arquivo</span>
              </SelectItem>
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
  );
};

export default AddParameterForm;
