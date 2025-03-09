
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface AssetTypeSelectorProps {
  availableTypes: string[];
  selectedType: string;
  onTypeChange: (value: string) => void;
  onAddTypeClick?: () => void;
  onAddNewType?: (newType: string) => void;
}

const AssetTypeSelector = ({
  availableTypes,
  selectedType,
  onTypeChange,
  onAddTypeClick,
  onAddNewType
}: AssetTypeSelectorProps) => {
  const [isAddingNewType, setIsAddingNewType] = useState(false);
  const [newTypeName, setNewTypeName] = useState("");

  const handleAddNewType = () => {
    if (newTypeName.trim() && onAddNewType) {
      onAddNewType(newTypeName.trim());
      setNewTypeName("");
      setIsAddingNewType(false);
    }
  };

  const handleCancel = () => {
    setNewTypeName("");
    setIsAddingNewType(false);
  };

  return (
    <div className="grid gap-2">
      <Label htmlFor="type">Tipo</Label>
      
      {isAddingNewType ? (
        <div className="flex gap-2">
          <Input
            id="newType"
            value={newTypeName}
            onChange={(e) => setNewTypeName(e.target.value)}
            placeholder="Nome do novo tipo"
            className="flex-1"
            autoFocus
          />
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleAddNewType}
            disabled={!newTypeName.trim()}
            title="Salvar"
          >
            <Check className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleCancel}
            title="Cancelar"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
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
          
          {(onAddTypeClick || onAddNewType) && (
            <Button 
              variant="outline" 
              size="icon"
              onClick={onAddTypeClick || (() => setIsAddingNewType(true))}
              title="Adicionar novo tipo"
            >
              <Plus className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default AssetTypeSelector;
