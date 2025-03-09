
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export type ParameterType = 'text' | 'number' | 'date' | 'switch' | 'url' | 'file';

export interface Parameter {
  name: string;
  type: ParameterType;
  value: any;
}

interface ParameterItemProps {
  param: Parameter;
  index: number;
  onParamChange: (index: number, value: any) => void;
  onRemoveParameter: (index: number) => void;
}

const ParameterItem = ({ param, index, onParamChange, onRemoveParameter }: ParameterItemProps) => {
  return (
    <div className="flex items-center gap-2 p-3 border rounded-md">
      <div className="flex-1">
        <Label className="text-xs text-muted-foreground">{param.name} ({param.type})</Label>
        {param.type === 'text' && (
          <Input 
            value={param.value || ""}
            onChange={(e) => onParamChange(index, e.target.value)}
            className="mt-1"
          />
        )}
        {param.type === 'number' && (
          <Input 
            type="number"
            value={param.value || 0}
            onChange={(e) => onParamChange(index, parseFloat(e.target.value))}
            className="mt-1"
          />
        )}
        {param.type === 'date' && (
          <Input 
            type="date"
            value={param.value instanceof Date ? param.value.toISOString().split('T')[0] : ""}
            onChange={(e) => onParamChange(index, new Date(e.target.value))}
            className="mt-1"
          />
        )}
        {param.type === 'switch' && (
          <div className="flex items-center mt-1">
            <Switch
              checked={param.value}
              onCheckedChange={(checked) => onParamChange(index, checked)}
            />
          </div>
        )}
        {param.type === 'url' && (
          <Input 
            type="url"
            value={param.value || ""}
            onChange={(e) => onParamChange(index, e.target.value)}
            className="mt-1"
          />
        )}
        {param.type === 'file' && (
          <Input 
            type="file"
            onChange={(e) => onParamChange(index, e.target.files?.[0] || null)}
            className="mt-1"
          />
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
