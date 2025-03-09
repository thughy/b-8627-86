
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
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
    <div className="space-y-4 mb-4 p-3 border rounded-md">
      <div className="text-sm font-medium pb-2">Adicionar Novo Estágio</div>
      
      <div className="space-y-2">
        <Input
          value={newStage.title || ""}
          onChange={(e) => setNewStage(prev => ({ ...prev, title: e.target.value }))}
          placeholder="Título do estágio"
        />
      </div>
      
      <div className="space-y-2">
        <Textarea
          value={newStage.description || ""}
          onChange={(e) => setNewStage(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Descrição do estágio (opcional)"
          rows={2}
        />
      </div>
      
      <Button 
        size="sm" 
        onClick={onAddStage}
        className="w-full"
      >
        Adicionar Estágio
      </Button>
    </div>
  );
};

export default AddStageForm;
