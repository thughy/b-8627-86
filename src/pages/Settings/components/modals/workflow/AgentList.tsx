
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Agent } from "@/pages/Workflows/models/WorkflowModels";

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
  const stageAgents = agents.filter(a => a.stageId === stageId);
  
  return (
    <div className="space-y-2 pl-2">
      {stageAgents.map(agent => (
        <div 
          key={agent.id}
          className={`p-2 border rounded-md flex justify-between items-center hover:bg-accent/30 cursor-pointer transition-colors ${selectedAgent?.id === agent.id ? 'border-l-4 border-primary' : ''}`}
          onClick={() => setSelectedAgent(agent)}
        >
          <div>
            <div className="font-medium">{agent.profile.name}</div>
            <div className="text-xs text-muted-foreground">{agent.profile.role}</div>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteAgent(agent.id);
            }}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default AgentList;
