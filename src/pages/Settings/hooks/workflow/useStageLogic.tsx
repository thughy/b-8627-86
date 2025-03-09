
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Stage, Agent } from "@/pages/Workflows/models/WorkflowModels";

export const useStageLogic = (
  stages: Stage[],
  setStages: React.Dispatch<React.SetStateAction<Stage[]>>,
  agents: Agent[],
  setAgents: React.Dispatch<React.SetStateAction<Agent[]>>,
  selectedStage: Stage | null,
  setSelectedStage: React.Dispatch<React.SetStateAction<Stage | null>>,
  expandedStages: Record<string, boolean>,
  setExpandedStages: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
) => {
  const { toast } = useToast();
  const [newStage, setNewStage] = useState<Partial<Stage>>({ title: "", description: "", order: 0 });

  const toggleStageExpand = (stageId: string) => {
    setExpandedStages(prev => ({
      ...prev,
      [stageId]: !prev[stageId]
    }));
  };

  const handleAddStage = (pipelineId: string) => {
    if (!newStage.title) {
      toast({
        title: "Título obrigatório",
        description: "Por favor, informe um título para o estágio.",
        variant: "destructive",
      });
      return;
    }

    const stagesInPipeline = stages.filter(s => s.pipelineId === pipelineId);
    const nextOrder = stagesInPipeline.length > 0 
      ? Math.max(...stagesInPipeline.map(s => s.order)) + 1 
      : 1;

    const stage: Stage = {
      id: `stage-${Date.now()}`,
      pipelineId: pipelineId,
      title: newStage.title,
      description: newStage.description || "",
      order: nextOrder
    };

    setStages(prev => [...prev, stage]);
    setSelectedStage(stage);
    setNewStage({ title: "", description: "", order: 0 });
    
    setExpandedStages(prev => ({
      ...prev,
      [stage.id]: true
    }));
    
    toast({
      title: "Estágio adicionado",
      description: `O estágio "${stage.title}" foi adicionado com sucesso.`,
    });
  };

  const handleDeleteStage = (stageId: string) => {
    toast({
      title: "Remover Estágio",
      description: `Tem certeza que deseja remover este estágio? Todos os agentes associados também serão removidos.`,
      variant: "destructive",
      action: (
        <Button 
          variant="outline" 
          onClick={() => {
            setStages(prev => prev.filter(s => s.id !== stageId));
            
            setAgents(prev => prev.filter(a => a.stageId !== stageId));
            
            if (selectedStage?.id === stageId) {
              setSelectedStage(null);
            }
            
            toast({
              title: "Estágio removido",
              description: `O estágio e seus componentes foram removidos com sucesso.`,
            });
          }}
        >
          Confirmar
        </Button>
      ),
    });
  };

  return {
    newStage,
    setNewStage,
    toggleStageExpand,
    handleAddStage,
    handleDeleteStage
  };
};
