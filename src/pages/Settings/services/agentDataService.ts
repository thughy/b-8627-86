
import { Agent } from "@/pages/Workflows/models/WorkflowModels";

export const getMockAgents = (): Agent[] => [
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
      departmentTitle: "Comercial",
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
      departmentTitle: "Suporte",
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

// In a real application, these would be API calls
export const getAgents = async (): Promise<Agent[]> => {
  return getMockAgents();
};

export const createAgent = async (agent: Partial<Agent>): Promise<Agent> => {
  // Simulate API call
  return {
    id: `agent-${Date.now()}`,
    stageId: "stage-default",
    ...agent,
    createdAt: new Date(),
    updatedAt: new Date()
  } as Agent;
};

export const updateAgent = async (id: string, agent: Partial<Agent>): Promise<Agent> => {
  // Simulate API call
  return {
    ...(getMockAgents().find(a => a.id === id) || {}),
    ...agent,
    updatedAt: new Date()
  } as Agent;
};

export const deleteAgent = async (id: string): Promise<boolean> => {
  // Simulate API call
  return true;
};
