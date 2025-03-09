
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Pipeline, Stage, Agent } from "@/pages/Workflows/models/WorkflowModels";

export const usePipelineLogic = (
  pipelines: Pipeline[],
  setPipelines: React.Dispatch<React.SetStateAction<Pipeline[]>>,
  stages: Stage[],
  setStages: React.Dispatch<React.SetStateAction<Stage[]>>,
  agents: Agent[],
  setAgents: React.Dispatch<React.SetStateAction<Agent[]>>,
  selectedPipeline: Pipeline | null,
  setSelectedPipeline: React.Dispatch<React.SetStateAction<Pipeline | null>>,
  expandedPipelines: Record<string, boolean>,
  setExpandedPipelines: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
) => {
  const { toast } = useToast();
  const [newPipeline, setNewPipeline] = useState<Partial<Pipeline>>({ title: "", description: "" });

  const togglePipelineExpand = (pipeId: string) => {
    setExpandedPipelines(prev => ({
      ...prev,
      [pipeId]: !prev[pipeId]
    }));
  };

  const handleAddPipeline = (departmentId: string) => {
    if (!newPipeline.title) {
      toast({
        title: "Título obrigatório",
        description: "Por favor, informe um título para o pipeline.",
        variant: "destructive",
      });
      return;
    }

    const pipeline: Pipeline = {
      id: `pipeline-${Date.now()}`,
      departmentId: departmentId,
      title: newPipeline.title,
      description: newPipeline.description || "",
      stages: []
    };

    setPipelines(prev => [...prev, pipeline]);
    setSelectedPipeline(pipeline);
    setNewPipeline({ title: "", description: "" });
    
    setExpandedPipelines(prev => ({
      ...prev,
      [pipeline.id]: true
    }));
    
    toast({
      title: "Pipeline adicionado",
      description: `O pipeline "${pipeline.title}" foi adicionado com sucesso.`,
    });
  };

  const handleDeletePipeline = (pipelineId: string) => {
    toast({
      title: "Remover Pipeline",
      description: `Tem certeza que deseja remover este pipeline? Todos os estágios associados também serão removidos.`,
      variant: "destructive",
      action: (
        <Button 
          variant="outline" 
          onClick={() => {
            setPipelines(prev => prev.filter(p => p.id !== pipelineId));
            
            const stageIds = stages
              .filter(s => s.pipelineId === pipelineId)
              .map(s => s.id);
            
            setStages(prev => prev.filter(s => s.pipelineId !== pipelineId));
            
            setAgents(prev => prev.filter(a => !stageIds.includes(a.stageId)));
            
            if (selectedPipeline?.id === pipelineId) {
              setSelectedPipeline(null);
            }
            
            toast({
              title: "Pipeline removido",
              description: `O pipeline e seus componentes foram removidos com sucesso.`,
            });
          }}
        >
          Confirmar
        </Button>
      ),
    });
  };

  return {
    newPipeline,
    setNewPipeline,
    togglePipelineExpand,
    handleAddPipeline,
    handleDeletePipeline
  };
};
