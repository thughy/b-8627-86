
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Pipeline } from "@/pages/Workflows/models/WorkflowModels";

interface AddPipelineFormProps {
  newPipeline: Partial<Pipeline>;
  setNewPipeline: React.Dispatch<React.SetStateAction<Partial<Pipeline>>>;
  onAddPipeline: () => void;
}

const AddPipelineForm = ({ 
  newPipeline, 
  setNewPipeline, 
  onAddPipeline 
}: AddPipelineFormProps) => {
  return (
    <div className="mb-4">
      <div className="mb-3 text-sm font-medium">Adicionar Pipeline</div>
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-5">
          <Input 
            placeholder="Título do pipeline"
            value={newPipeline.title}
            onChange={(e) => setNewPipeline(prev => ({ ...prev, title: e.target.value }))}
          />
        </div>
        <div className="col-span-5">
          <Input 
            placeholder="Descrição (opcional)"
            value={newPipeline.description}
            onChange={(e) => setNewPipeline(prev => ({ ...prev, description: e.target.value }))}
          />
        </div>
        <div className="col-span-2">
          <Button 
            className="w-full"
            size="sm"
            onClick={onAddPipeline}
          >
            <Plus className="h-4 w-4 mr-1" />
            Adicionar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddPipelineForm;
