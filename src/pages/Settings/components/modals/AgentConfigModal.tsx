
import React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Agent } from "@/pages/Workflows/models/WorkflowModels";
import AgentTabs from "./agent/AgentTabs";
import { useAgentConfigModal } from "@/pages/Settings/hooks/useAgentConfigModal";

interface AgentConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  agent?: Agent;
  onSave: (agent: Partial<Agent>) => void;
}

const AgentConfigModal = ({ 
  isOpen, 
  onClose, 
  agent, 
  onSave 
}: AgentConfigModalProps) => {
  const {
    activeTab,
    setActiveTab,
    departments,
    pipelines,
    stages,
    formData,
    handleProfileChange,
    handleWorkEnvironmentChange,
    handleBusinessRulesChange,
    handleExpertiseChange,
    handleRagDocumentsChange,
    handleToolToggle,
    handleLLMModelChange,
    handleStatusChange,
    handleSubmit
  } = useAgentConfigModal(agent, onSave);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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

export default AgentConfigModal;
