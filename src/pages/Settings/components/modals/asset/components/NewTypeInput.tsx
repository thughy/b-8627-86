
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface NewTypeInputProps {
  newType: string;
  setNewType: (value: string) => void;
  handleAddNewType: () => void;
  isVisible: boolean;
}

const NewTypeInput = ({ 
  newType, 
  setNewType, 
  handleAddNewType, 
  isVisible 
}: NewTypeInputProps) => {
  if (!isVisible) return null;
  
  return (
    <div className="grid gap-2">
      <Label htmlFor="newType">Novo Tipo</Label>
      <div className="flex gap-2">
        <Input 
          id="newType"
          placeholder="Nome do novo tipo"
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleAddNewType}>Adicionar</Button>
      </div>
    </div>
  );
};

export default NewTypeInput;
