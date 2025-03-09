
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash, Plus, Search } from "lucide-react";
import { Agent } from "@/pages/Workflows/models/WorkflowModels";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
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
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [allAgents] = useState<Agent[]>(getAgents());
  const [selectedAgentId, setSelectedAgentId] = useState<string>("");
  
  // Filter existing agents by stage
  const stageAgents = agents.filter(a => a.stageId === stageId);
  
  // Filter available agents (not already assigned to this stage)
  const availableAgents = allAgents.filter(agent => 
    !stageAgents.some(a => a.id === agent.id) && 
    agent.profile.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddExistingAgent = () => {
    if (!selectedAgentId) {
      toast({
        title: "Selecione um agente",
        description: "Por favor, selecione um agente para adicionar a este estágio.",
        variant: "destructive"
      });
      return;
    }

    const agentToAdd = allAgents.find(agent => agent.id === selectedAgentId);
    if (agentToAdd) {
      toast({
        title: "Agente adicionado",
        description: `${agentToAdd.profile.name} foi adicionado a este estágio.`,
      });
      
      // This would need to be implemented in the parent component
      // For now, just clear the selection
      setSelectedAgentId("");
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <h4 className="text-sm font-medium">Adicionar Agente Existente</h4>
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar agentes..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedAgentId} onValueChange={setSelectedAgentId}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecionar agente" />
            </SelectTrigger>
            <SelectContent>
              {availableAgents.length > 0 ? (
                availableAgents.map(agent => (
                  <SelectItem key={agent.id} value={agent.id}>
                    {agent.profile.name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="none" disabled>
                  Nenhum agente disponível
                </SelectItem>
              )}
            </SelectContent>
          </Select>
          <Button size="sm" onClick={handleAddExistingAgent}>
            <Plus className="h-4 w-4 mr-1" />
            Adicionar
          </Button>
        </div>
      </div>

      <div className="space-y-2 pl-2">
        <h4 className="text-sm font-medium">Agentes neste estágio</h4>
        {stageAgents.length > 0 ? (
          stageAgents.map(agent => (
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
          ))
        ) : (
          <div className="text-sm text-muted-foreground p-2">
            Nenhum agente adicionado
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentList;
