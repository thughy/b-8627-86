
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash, Edit } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type ParameterType = 'text' | 'number' | 'date' | 'switch' | 'url' | 'file';

export interface Parameter {
  name: string;
  type: ParameterType;
  value: any;
}

interface ParameterItemProps {
  param: Parameter;
  index: number;
  onParamChange: (index: number, key: string, value: any) => void;
  onRemoveParameter: (index: number) => void;
}

const ParameterItem = ({ param, index, onParamChange, onRemoveParameter }: ParameterItemProps) => {
  const [isEditing, setIsEditing] = React.useState(false);
  
  return (
    <div className="flex items-center gap-2 p-3 border rounded-md">
      <div className="flex-1">
        {isEditing ? (
          <div className="space-y-2">
            <div>
              <Label htmlFor={`param-name-${index}`} className="text-xs">Nome do Parâmetro</Label>
              <Input
                id={`param-name-${index}`}
                value={param.name}
                onChange={(e) => onParamChange(index, "name", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor={`param-type-${index}`} className="text-xs">Tipo</Label>
              <Select 
                value={param.type} 
                onValueChange={(value) => onParamChange(index, "type", value as ParameterType)}
              >
                <SelectTrigger id={`param-type-${index}`} className="mt-1">
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
            <Button size="sm" onClick={() => setIsEditing(false)} className="mt-2">
              Concluir
            </Button>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium">{param.name}</div>
              <div className="text-xs text-muted-foreground">Tipo: {param.type}</div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => onRemoveParameter(index)}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ParameterItem;
