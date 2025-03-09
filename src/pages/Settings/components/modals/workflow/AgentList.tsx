
import React, { useState } from "react";
import { Agent } from "@/pages/Workflows/models/WorkflowModels";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2 } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getStages } from "@/pages/Settings/services/workflowDataService";

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
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const stageAgents = agents.filter(a => a.stageId === stageId);
  const allStages = getStages();
  
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Input
          value={newAgent.profile?.agentName || ""}
          onChange={(e) => setNewAgent(prev => ({
            ...prev,
            profile: {
              ...prev.profile!,
              agentName: e.target.value
            }
          }))}
          placeholder="Nome do novo agente"
          className="flex-1"
        />
        <Button 
          onClick={() => handleAddAgent(stageId)}
          size="sm"
        >
          Adicionar
        </Button>
      </div>
      
      {stageAgents.length > 0 ? (
        <div className="border rounded-md overflow-hidden">
          <div className="divide-y">
            {stageAgents.map(agent => (
              <div
                key={agent.id}
                className={`flex items-center justify-between p-3 cursor-pointer hover:bg-muted ${
                  selectedAgent?.id === agent.id ? "bg-primary/5" : ""
                }`}
                onClick={() => setSelectedAgent(agent)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`h-2 w-2 rounded-full ${
                    agent.status === 'active' ? 'bg-green-500' :
                    agent.status === 'paused' ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                  <span>{agent.profile.agentName}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteAgent(agent.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center p-4 border rounded-md text-muted-foreground">
          Nenhum agente adicionado a este estágio
        </div>
      )}
    </div>
  );
};

export default AgentList;
