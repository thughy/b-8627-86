
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface AssetTypeSelectorProps {
  availableTypes: string[];
  selectedType: string;
  onTypeChange: (value: string) => void;
  onAddTypeClick: () => void;
}

const AssetTypeSelector = ({
  availableTypes,
  selectedType,
  onTypeChange,
  onAddTypeClick
}: AssetTypeSelectorProps) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor="type">Tipo</Label>
      <div className="flex gap-2">
        <Select 
          value={selectedType} 
          onValueChange={onTypeChange}
        >
          <SelectTrigger id="type" className="flex-1">
            <SelectValue placeholder="Selecione o tipo" />
          </SelectTrigger>
          <SelectContent>
            {availableTypes.map((type) => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button 
          variant="outline" 
          size="icon"
          onClick={onAddTypeClick}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default AssetTypeSelector;
