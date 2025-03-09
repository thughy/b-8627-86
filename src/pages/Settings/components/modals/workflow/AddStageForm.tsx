
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Stage } from "@/pages/Workflows/models/WorkflowModels";

interface AddStageFormProps {
  newStage: Partial<Stage>;
  setNewStage: React.Dispatch<React.SetStateAction<Partial<Stage>>>;
  onAddStage: () => void;
}

const AddStageForm = ({ 
  newStage, 
  setNewStage, 
  onAddStage 
}: AddStageFormProps) => {
  return (
    <div className="mb-4">
      <div className="mb-3 text-sm font-medium">Adicionar Estágio</div>
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-5">
          <Input 
            placeholder="Título do estágio"
            value={newStage.title}
            onChange={(e) => setNewStage(prev => ({ ...prev, title: e.target.value }))}
          />
        </div>
        <div className="col-span-5">
          <Input 
            placeholder="Descrição (opcional)"
            value={newStage.description}
            onChange={(e) => setNewStage(prev => ({ ...prev, description: e.target.value }))}
          />
        </div>
        <div className="col-span-2">
          <Button 
            className="w-full"
            size="sm"
            onClick={onAddStage}
          >
            <Plus className="h-4 w-4 mr-1" />
            Adicionar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddStageForm;
