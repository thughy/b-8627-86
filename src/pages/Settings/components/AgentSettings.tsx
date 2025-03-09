
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import AgentFilters from "./agents/AgentFilters";
import AgentList from "./agents/AgentList";
import AgentConfigModal from "./modals/AgentConfigModal";
import { Agent } from "@/pages/Workflows/models/WorkflowModels";
import { useToast } from "@/hooks/use-toast";

// Example data for demonstration
const mockAgents: Agent[] = [
  {
    id: "agent1",
    stageId: "stage1",
    profile: {
      name: "Assistente de Vendas",
      role: "Vendedor",
      goal: "Auxiliar clientes a encontrar o produto ideal."
    },
    workEnvironment: {
      workflowTitle: "Workflow de Vendas",
      workflowDescription: "Processo de vendas da empresa",
      departmentTitle: "Departamento Comercial",
      departmentDescription: "Responsável pelas vendas",
      stageTitle: "Qualificação de Leads",
      stageDescription: "Etapa de qualificação de potenciais clientes"
    },
    businessRules: {
      rules: ["Sempre ser educado", "Nunca falar mal da concorrência"],
      restrictions: ["Não oferecer descontos sem aprovação"],
      conversationStyle: "professional"
    },
    expertise: {
      knowledge: ["Produtos da empresa", "Técnicas de vendas"],
      skills: ["Comunicação efetiva", "Negociação"],
      examples: ["Como lidar com objeções do cliente"],
      tasks: ["Qualificação de leads", "Agendamento de demonstrações"]
    },
    ragDocuments: ["catalogo_produtos.pdf", "politica_precos.pdf"],
    tools: ["chat", "email", "calendar"],
    llmModel: "GPT-4",
    status: "active",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-05-20")
  },
  {
    id: "agent2",
    stageId: "stage2",
    profile: {
      name: "Assistente de Suporte",
      role: "Atendente",
      goal: "Resolver problemas técnicos dos clientes."
    },
    workEnvironment: {
      workflowTitle: "Workflow de Suporte",
      workflowDescription: "Processo de atendimento ao cliente",
      departmentTitle: "Suporte Técnico",
      departmentDescription: "Responsável pelo suporte técnico",
      stageTitle: "Atendimento Inicial",
      stageDescription: "Primeira interação com o cliente"
    },
    businessRules: {
      rules: ["Resolver problemas em até 24h", "Seguir o script de atendimento"],
      restrictions: ["Não culpar outros departamentos por falhas"],
      conversationStyle: "friendly"
    },
    expertise: {
      knowledge: ["Produtos da empresa", "Soluções para problemas comuns"],
      skills: ["Comunicação técnica", "Empatia"],
      examples: ["Como resolver problemas de conexão"],
      tasks: ["Registro de tickets", "Escalonamento de problemas"]
    },
    ragDocuments: ["manual_tecnico.pdf", "procedimentos_suporte.pdf"],
    tools: ["chat", "email", "call"],
    llmModel: "GPT-3.5",
    status: "active",
    createdAt: new Date("2023-02-10"),
    updatedAt: new Date("2023-06-15")
  },
];

const AgentSettings = () => {
  const { toast } = useToast();
  const [agents, setAgents] = useState<Agent[]>(mockAgents);
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    department: "all"
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

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
        description: `O agente ${agentData.profile?.name} foi atualizado com sucesso.`,
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
        description: `O agente ${agentData.profile?.name} foi criado com sucesso.`,
      });
    }
    setIsModalOpen(false);
  };

  // Filter agents based on filters
  const filteredAgents = agents.filter(agent => {
    // Search filter
    if (filters.search && 
        !agent.profile.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !agent.profile.role.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    // Status filter
    if (filters.status !== "all" && agent.status !== filters.status) {
      return false;
    }
    
    // Department filter
    if (filters.department !== "all" && 
        agent.workEnvironment.departmentTitle !== filters.department) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <AgentFilters
            search={filters.search}
            status={filters.status}
            department={filters.department}
            onSearchChange={(value) => handleFilterChange("search", value)}
            onStatusChange={(value) => handleFilterChange("status", value)}
            onDepartmentChange={(value) => handleFilterChange("department", value)}
            onAddAgent={handleAddAgent}
          />
          
          <AgentList
            agents={filteredAgents}
            onEdit={handleEditAgent}
            onDelete={handleDeleteAgent}
          />
        </CardContent>
      </Card>
      
      {isModalOpen && (
        <AgentConfigModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          agent={selectedAgent}
          onSave={handleSaveAgent}
          onDelete={handleDeleteAgent}
        />
      )}
    </div>
  );
};

export default AgentSettings;
