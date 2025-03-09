
import React, { useState } from "react";
import { Agent } from "@/pages/Workflows/models/WorkflowModels";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAgents } from "@/pages/Settings/services/settingsService";

interface AgentListProps {
  stageId: string;
  agents: Agent[];
  selectedAgent: Agent | null;
  setSelectedAgent: React.Dispatch<React.SetStateAction<Agent | null>>;
  handleDeleteAgent: (agentId: string) => void;
}

const AgentList = ({
  stageId,
  agents,
  selectedAgent,
  setSelectedAgent,
  handleDeleteAgent
}: AgentListProps) => {
  const [allAgents] = useState<Agent[]>(getAgents());
  
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
      
      // In a real implementation, this would add the agent to the stage
      // The parent component would handle this with the handleAddAgent function
    }
  };

  return (
    <div>
      <Select 
        value={currentStageAgent?.id || ""} 
        onValueChange={handleAgentChange}
      >
        <SelectTrigger className="w-full">
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
    </div>
  );
};

export default AgentList;
