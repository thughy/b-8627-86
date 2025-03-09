
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Department } from "@/pages/Workflows/models/WorkflowModels";

interface DepartmentFormProps {
  newDepartment: Partial<Department>;
  setNewDepartment: React.Dispatch<React.SetStateAction<Partial<Department>>>;
  handleAddDepartment: () => void;
}

const DepartmentForm = ({ 
  newDepartment, 
  setNewDepartment, 
  handleAddDepartment 
}: DepartmentFormProps) => {
  return (
    <div className="bg-muted/50 p-4 rounded-md mb-6">
      <h3 className="text-lg font-medium mb-3">Adicionar Departamento</h3>
      <div className="grid gap-4">
        <div>
          <Label htmlFor="department-title">Título</Label>
          <Input 
            id="department-title"
            placeholder="Nome do departamento"
            value={newDepartment.title}
            onChange={(e) => setNewDepartment(prev => ({ ...prev, title: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="department-description">Descrição</Label>
          <Textarea 
            id="department-description"
            placeholder="Descreva a função deste departamento"
            rows={2}
            value={newDepartment.description}
            onChange={(e) => setNewDepartment(prev => ({ ...prev, description: e.target.value }))}
          />
        </div>
        <Button 
          className="w-full"
          onClick={handleAddDepartment}
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Departamento
        </Button>
      </div>
    </div>
  );
};

export default DepartmentForm;
