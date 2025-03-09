
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Plus, Search, Filter, Edit, Trash, ListFilter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { getAgents } from "../services/settingsService";
import { Agent } from "@/pages/Workflows/models/WorkflowModels";
import AgentConfigModal from "./modals/AgentConfigModal";

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

  const getStatusBadge = (status: Agent['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500 hover:bg-green-600">Ativo</Badge>;
      case 'paused':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pausado</Badge>;
      case 'blocked':
        return <Badge className="bg-red-500 hover:bg-red-600">Bloqueado</Badge>;
      default:
        return null;
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar agentes..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline">
              <ListFilter className="h-4 w-4 mr-2" />
              <span>Filtrar por Workflow</span>
            </Button>
          </div>
        </div>

        <div className="border rounded-md">
          <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b">
            <div className="col-span-2">Nome / Função</div>
            <div className="col-span-2 hidden md:block">Ambiente</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-1 text-right">Ações</div>
          </div>

          <div className="divide-y">
            {filteredAgents.length > 0 ? (
              filteredAgents.map((agent) => (
                <div key={agent.id} className="grid grid-cols-6 gap-4 p-4 items-center">
                  <div className="col-span-2">
                    <div className="font-medium">{agent.profile.name}</div>
                    <div className="text-sm text-muted-foreground">{agent.profile.role}</div>
                  </div>
                  <div className="col-span-2 hidden md:block">
                    <div className="text-sm">
                      <span className="font-medium">Workflow:</span> {agent.workEnvironment.workflowTitle || "N/A"}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">Departamento:</span> {agent.workEnvironment.departmentTitle || "N/A"}
                      {agent.workEnvironment.stageTitle && (
                        <span> / <span className="font-medium">Estágio:</span> {agent.workEnvironment.stageTitle}</span>
                      )}
                    </div>
                  </div>
                  <div className="col-span-1">
                    {getStatusBadge(agent.status)}
                  </div>
                  <div className="col-span-1 flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleEditAgent(agent)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDeleteAgent(agent)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                Nenhum agente encontrado
              </div>
            )}
          </div>
        </div>
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
