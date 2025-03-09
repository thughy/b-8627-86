
import React from "react";
import AgentModalContainer from "./agent/AgentModalContainer";
import { Agent } from "@/pages/Workflows/models/WorkflowModels";

interface AgentConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  agent?: Agent;
  onSave: (agent: Partial<Agent>) => void;
}

const AgentConfigModal = (props: AgentConfigModalProps) => {
  // Sempre renderizamos o componente, mas deixamos o controle de visibilidade para o Dialog no AgentModalContainer
  return <AgentModalContainer {...props} />;
};

export default AgentConfigModal;
