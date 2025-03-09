
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Agent } from "@/pages/Workflows/models/WorkflowModels";
import AgentTabs from "./agent/AgentTabs";
import { useAgentConfigModal } from "@/pages/Settings/hooks/useAgentConfigModal";

interface AgentConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (agent: Agent) => void;
  onDelete: (agentId: string) => void;
  agent: Agent | null;
}

const AgentConfigModal: React.FC<AgentConfigModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  agent
}) => {
  const {
    formData,
    activeTab,
    setActiveTab,
    handleProfileChange,
    handleWorkEnvironmentChange,
    handleBusinessRulesChange,
    handleExpertiseChange,
    handleRagChange,
    handleToolsChange,
    handleStatusChange,
    handleSubmit,
    isEditMode
  } = useAgentConfigModal({
    agent,
    onSave,
    onClose
  });

  const handleDelete = () => {
    if (agent?.id) {
      onDelete(agent.id);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {agent ? "Editar Agente" : "Novo Agente"}
          </DialogTitle>
          <DialogDescription>
            {agent
              ? "Atualize as configurações do agente de IA."
              : "Configure um novo agente de IA para seu workflow."}
          </DialogDescription>
        </DialogHeader>

        <AgentTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          formData={formData}
          onProfileChange={handleProfileChange}
          onWorkEnvironmentChange={handleWorkEnvironmentChange}
          onBusinessRulesChange={handleBusinessRulesChange}
          onExpertiseChange={handleExpertiseChange}
          onRagChange={handleRagChange}
          onToolsChange={handleToolsChange}
          onStatusChange={handleStatusChange}
        />

        <DialogFooter className="flex space-x-2 justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          {agent && (
            <Button 
              variant="destructive" 
              onClick={handleDelete}
            >
              Excluir
            </Button>
          )}
          <Button onClick={handleSubmit}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AgentConfigModal;
