
import { useState } from "react";
import { Agent } from "@/pages/Workflows/models/WorkflowModels";
import { useToast } from "@/hooks/use-toast";

export const useAgentCrud = (initialAgents: Agent[] = []) => {
  const { toast } = useToast();
  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddAgent = () => {
    setSelectedAgent(null);
    setIsModalOpen(true);
  };

  const handleEditAgent = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsModalOpen(true);
  };

  const handleDeleteAgent = (agentId: string) => {
    setAgents(prev => prev.filter(agent => agent.id !== agentId));
    toast({
      title: "Agente excluído",
      description: "O agente foi removido com sucesso.",
    });
  };

  const handleSaveAgent = (agentData: Partial<Agent>) => {
    if (selectedAgent) {
      // Update existing agent
      setAgents(prev => prev.map(agent => 
        agent.id === selectedAgent.id 
          ? { ...agent, ...agentData, updatedAt: new Date() } 
          : agent
      ));
      toast({
        title: "Agente atualizado",
        description: `O agente ${agentData.profile?.agentName} foi atualizado com sucesso.`,
      });
    } else {
      // Create new agent
      const newAgent: Agent = {
        id: `agent-${Date.now()}`,
        stageId: "stage-default",
        ...agentData,
        createdAt: new Date(),
        updatedAt: new Date()
      } as Agent;
      
      setAgents(prev => [...prev, newAgent]);
      toast({
        title: "Agente criado",
        description: `O agente ${agentData.profile?.agentName} foi criado com sucesso.`,
      });
    }
    setIsModalOpen(false);
  };

  return {
    agents,
    setAgents,
    selectedAgent,
    isModalOpen,
    setIsModalOpen,
    handleAddAgent,
    handleEditAgent,
    handleDeleteAgent,
    handleSaveAgent
  };
};
