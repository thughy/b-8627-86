
import React, { useState } from "react";
import { Agent } from "@/pages/Workflows/models/WorkflowModels";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAgents } from "@/pages/Settings/services/settingsService";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AgentConfigModal from "../AgentConfigModal";

interface AgentListProps {
  stageId: string;
  agents: Agent[];
  selectedAgent: Agent | null;
  setSelectedAgent: React.Dispatch<React.SetStateAction<Agent | null>>;
  handleDeleteAgent: (agentId: string) => void;
  handleAddAgent: (stageId: string) => void;
  newAgent: Partial<Agent>;
  setNewAgent: React.Dispatch<React.SetStateAction<Partial<Agent>>>;
}

const AgentList = ({
  stageId,
  agents,
  selectedAgent,
  setSelectedAgent,
  handleDeleteAgent,
  handleAddAgent,
  newAgent,
  setNewAgent
}: AgentListProps) => {
  const [allAgents] = useState<Agent[]>(getAgents());
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filter existing agents by stage
  const stageAgentIds = agents
    .filter(a => a.stageId === stageId)
    .map(a => a.id);
  
  // Get the current agent for this stage (should be only one)
  const currentStageAgent = agents.find(a => a.stageId === stageId);
  
  // Filter available agents (not already assigned to this stage)
  const availableAgents = allAgents.filter(agent => 
    !stageAgentIds.includes(agent.id)
  );
  
  // Combined list for dropdown (current agent + available agents)
  const dropdownAgents = [
    ...(currentStageAgent ? [currentStageAgent] : []),
    ...availableAgents
  ];

  const handleAgentChange = (agentId: string) => {
    // If we already have an agent assigned to this stage, remove it
    if (currentStageAgent) {
      handleDeleteAgent(currentStageAgent.id);
    }
    
    // Find the new agent and set it as selected
    const newAgent = allAgents.find(agent => agent.id === agentId);
    if (newAgent) {
      setSelectedAgent(newAgent);
    }
  };

  const handleOpenAddModal = () => {
    // Initialize the new agent with the current stage
    setNewAgent({
      ...newAgent,
      stageId: stageId,
      workEnvironment: {
        ...newAgent.workEnvironment,
        stageTitle: stages.find(s => s.id === stageId)?.title
      }
    });
    setIsModalOpen(true);
  };

  const handleSaveAgent = (agentData: Partial<Agent>) => {
    setNewAgent(agentData);
    handleAddAgent(stageId);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex space-x-2 items-center">
        <Select 
          value={currentStageAgent?.id || ""} 
          onValueChange={handleAgentChange}
          className="flex-1"
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecionar agente" />
          </SelectTrigger>
          <SelectContent>
            {dropdownAgents.length > 0 ? (
              dropdownAgents.map(agent => (
                <SelectItem key={agent.id} value={agent.id}>
                  {agent.profile.name} - {agent.profile.role}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="none" disabled>
                Nenhum agente disponível
              </SelectItem>
            )}
          </SelectContent>
        </Select>
        <Button size="sm" onClick={handleOpenAddModal}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <AgentConfigModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAgent}
      />
    </div>
  );
};

export default AgentList;
