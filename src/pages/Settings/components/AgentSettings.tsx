
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { getAgents } from "../services/settingsService";
import { Agent } from "@/pages/Workflows/models/WorkflowModels";
import AgentConfigModal from "./modals/AgentConfigModal";
import AgentFilters from "./agents/AgentFilters";
import AgentList from "./agents/AgentList";

const AgentSettings = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [agents, setAgents] = useState<Agent[]>(getAgents());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | undefined>(undefined);

  const filteredAgents = agents.filter((agent) => 
    agent.profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.profile.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.workEnvironment.workflowTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.workEnvironment.departmentTitle?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAgent = () => {
    setSelectedAgent(undefined);
    setIsModalOpen(true);
  };

  const handleEditAgent = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsModalOpen(true);
  };

  const handleDeleteAgent = (agent: Agent) => {
    toast({
      title: "Remover agente",
      description: `Tem certeza que deseja remover o agente: ${agent.profile.name}?`,
      variant: "destructive",
      action: (
        <Button 
          variant="outline" 
          onClick={() => {
            setAgents(prev => prev.filter(a => a.id !== agent.id));
            toast({
              title: "Agente removido",
              description: `O agente ${agent.profile.name} foi removido com sucesso.`,
            });
          }}
        >
          Confirmar
        </Button>
      ),
    });
  };

  const handleSaveAgent = (agentData: Partial<Agent>) => {
    if (selectedAgent) {
      // Update existing agent
      setAgents(prev => 
        prev.map(a => 
          a.id === selectedAgent.id 
            ? { ...a, ...agentData, updatedAt: new Date() } 
            : a
        )
      );
    } else {
      // Add new agent
      const newAgent: Agent = {
        id: `agent-${Date.now()}`,
        stageId: agentData.stageId || "stage-default",
        profile: agentData.profile || {
          name: "Novo Agente",
          role: "Função não definida",
          goal: "Objetivo não definido"
        },
        workEnvironment: agentData.workEnvironment || {},
        businessRules: agentData.businessRules || {},
        expertise: agentData.expertise || {},
        ragDocuments: agentData.ragDocuments || [],
        tools: agentData.tools || [],
        llmModel: agentData.llmModel || "GPT-4",
        status: agentData.status || "active",
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setAgents(prev => [...prev, newAgent]);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Gerenciamento de Agentes</CardTitle>
            <CardDescription>
              Configure e gerencie seus agentes de IA
            </CardDescription>
          </div>
          <Button onClick={handleAddAgent} className="flex-shrink-0">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Agente
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <AgentFilters 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
        />

        <AgentList 
          agents={filteredAgents} 
          onEditAgent={handleEditAgent} 
          onDeleteAgent={handleDeleteAgent} 
        />
      </CardContent>

      <AgentConfigModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        agent={selectedAgent}
        onSave={handleSaveAgent}
      />
    </Card>
  );
};

export default AgentSettings;
