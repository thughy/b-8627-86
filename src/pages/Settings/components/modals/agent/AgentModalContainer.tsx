
import React, { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Agent } from "@/pages/Workflows/models/WorkflowModels";
import { getDepartments, getPipelines, getStages } from "@/pages/Settings/services/workflowDataService";
import AgentTabs from "./AgentTabs";
import { useAgentForm } from "../../../hooks/agent/useAgentForm";

interface AgentModalContainerProps {
  isOpen: boolean;
  onClose: () => void;
  agent?: Agent;
  onSave: (agent: Partial<Agent>) => void;
}

const AgentModalContainer = ({ 
  isOpen, 
  onClose, 
  agent, 
  onSave 
}: AgentModalContainerProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const [departments, setDepartments] = useState([]);
  const [pipelines, setPipelines] = useState([]);
  const [stages, setStages] = useState([]);
  
  const { 
    formData, 
    handleProfileChange,
    handleWorkEnvironmentChange,
    handleBusinessRulesChange,
    handleExpertiseChange,
    handleRagDocumentsChange,
    handleToolToggle,
    handleLLMModelChange,
    handleStatusChange
  } = useAgentForm(agent);

  useEffect(() => {
    setDepartments(getDepartments());
    setPipelines(getPipelines());
    setStages(getStages());
  }, []);

  const handleSubmit = () => {
    if (!formData.profile?.name) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, informe um nome para o agente.",
        variant: "destructive",
      });
      return;
    }

    onSave(formData);
    toast({
      title: agent ? "Agente atualizado" : "Agente criado",
      description: `O agente "${formData.profile?.name}" foi ${agent ? "atualizado" : "criado"} com sucesso.`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{agent ? "Editar Agente" : "Novo Agente"}</DialogTitle>
          <DialogDescription>
            {agent 
              ? "Edite as informações do agente existente." 
              : "Configure um novo agente de IA para seu workflow."}
          </DialogDescription>
        </DialogHeader>

        <AgentTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          formData={formData}
          departments={departments}
          pipelines={pipelines}
          stages={stages}
          handleProfileChange={handleProfileChange}
          handleWorkEnvironmentChange={handleWorkEnvironmentChange}
          handleBusinessRulesChange={handleBusinessRulesChange}
          handleExpertiseChange={handleExpertiseChange}
          handleRagDocumentsChange={handleRagDocumentsChange}
          handleToolToggle={handleToolToggle}
          handleLLMModelChange={handleLLMModelChange}
          handleStatusChange={handleStatusChange}
        />

        <DialogFooter className="flex space-x-2 justify-end">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSubmit}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AgentModalContainer;
