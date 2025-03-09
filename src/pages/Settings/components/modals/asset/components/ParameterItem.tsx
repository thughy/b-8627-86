
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, Save, Trash, X, Type, Calendar, Hash, ToggleLeft, ListFilter, File } from "lucide-react";

export type ParameterType = "text" | "number" | "date" | "switch" | "dropdown" | "file";

export interface Parameter {
  name: string;
  type: ParameterType;
  value: any;
}

interface ParameterItemProps {
  parameter: Parameter;
  onDelete: () => void;
  onUpdate: (updatedParameter: Parameter) => void;
}

const ParameterItem = ({ parameter, onDelete, onUpdate }: ParameterItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(parameter.name);
  const [editType, setEditType] = useState<ParameterType>(parameter.type);

  const handleSave = () => {
    if (!editName.trim()) return;
    
    onUpdate({ 
      ...parameter, 
      name: editName,
      type: editType
    });
    
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(parameter.name);
    setEditType(parameter.type);
    setIsEditing(false);
  };

  const getTypeIcon = (type: ParameterType) => {
    switch (type) {
      case "text":
        return <Type className="h-4 w-4" />;
      case "number":
        return <Hash className="h-4 w-4" />;
      case "date":
        return <Calendar className="h-4 w-4" />;
      case "switch":
        return <ToggleLeft className="h-4 w-4" />;
      case "dropdown":
        return <ListFilter className="h-4 w-4" />;
      case "file":
        return <File className="h-4 w-4" />;
      default:
        return <Type className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: ParameterType) => {
    switch (type) {
      case "text": return "Texto";
      case "number": return "Número";
      case "date": return "Data";
      case "switch": return "Switch";
      case "dropdown": return "Lista";
      case "file": return "Arquivo";
      default: return "Texto";
    }
  };

  return (
    <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-900 rounded-md mb-2">
      {isEditing ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full">
          <div>
            <Label htmlFor="paramName" className="text-xs">Nome</Label>
            <Input
              id="paramName"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="paramType" className="text-xs">Tipo</Label>
            <Select 
              value={editType} 
              onValueChange={(value) => setEditType(value as ParameterType)}
            >
              <SelectTrigger id="paramType" className="mt-1">
                <SelectValue placeholder="Tipo do parâmetro" />
              </SelectTrigger>
              <SelectContent>
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
          <div className="flex items-end gap-2">
            <Button onClick={handleSave} size="sm" className="mt-1">
              <Save className="h-4 w-4 mr-1" />
              Salvar
            </Button>
            <Button onClick={handleCancel} variant="ghost" size="sm" className="mt-1">
              <X className="h-4 w-4 mr-1" />
              Cancelar
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary">
              {getTypeIcon(parameter.type)}
            </div>
            <div>
              <div className="font-medium">{parameter.name}</div>
              <div className="text-xs text-muted-foreground">
                Tipo: {getTypeLabel(parameter.type)}
              </div>
            </div>
          </div>

          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onDelete}>
              <Trash className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ParameterItem;
