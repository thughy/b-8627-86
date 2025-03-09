
import { Template, Workflow, Department, Pipeline, Stage, Agent, Asset, Collaborator, Integration } from "@/pages/Workflows/models/WorkflowModels";
import { getSoftwareSalesTemplate } from './templateData';

// Mock data for templates
const mockTemplates: Template[] = [
  {
    id: "template-101",
    type: "workflow",
    name: "CRM Completo",
    version: "1.0",
    data: {
      departments: 2,
      pipelines: 3,
      stages: 12,
      workflows: {
        primary: "Vendas B2B",
        secondary: "Suporte"
      }
    },
    createdAt: new Date(2023, 8, 15),
    updatedAt: new Date(2023, 8, 15)
  },
  {
    id: "template-102",
    type: "pipeline",
    name: "Pipeline de Vendas",
    version: "1.2",
    data: {
      stages: ["Qualificação", "Proposta", "Negociação", "Fechamento"],
      agents: 4,
      assets: 6
    },
    createdAt: new Date(2023, 9, 5),
    updatedAt: new Date(2023, 10, 12)
  },
  {
    id: "template-103",
    type: "agent",
    name: "Agente de Qualificação",
    version: "2.0",
    data: {
      profile: {
        role: "Qualificador de Leads",
        goal: "Identificar leads qualificados para o processo de vendas"
      },
      expertise: ["Vendas", "Mercado", "Produto"],
      workflows: ["Vendas B2B"]
    },
    createdAt: new Date(2023, 11, 1),
    updatedAt: new Date(2024, 0, 20)
  },
  {
    id: "software-sales-autb",
    type: "workflow",
    name: "Venda de Software AutB",
    version: "1.0",
    data: {
      description: "Template completo para venda de software da AutB",
      workflows: 2,
      pipelines: 2,
      stages: 8,
      agents: 8, 
      assets: 8,
      industry: "Tecnologia",
      targetAudience: "Empresas de médio e grande porte",
      salesCycle: "30-90 dias"
    },
    createdAt: new Date(2024, 3, 15),
    updatedAt: new Date(2024, 3, 15)
  }
];

// Mock data for collaborators
const mockCollaborators: Collaborator[] = [
  {
    id: "collab-101",
    name: "Ana Silva",
    role: "Gerente de Vendas",
    email: "ana.silva@autb.com.br",
    phone: "(11) 98765-4321",
    hierarchyLevel: "Gerência",
    type: "master",
    status: "active",
    createdAt: new Date(2023, 5, 15),
    updatedAt: new Date(2023, 5, 15)
  },
  {
    id: "collab-102",
    name: "Carlos Oliveira",
    role: "Agente de Suporte",
    email: "carlos.oliveira@autb.com.br",
    phone: "(11) 91234-5678",
    hierarchyLevel: "Operacional",
    type: "collaborator",
    status: "active",
    createdAt: new Date(2023, 6, 20),
    updatedAt: new Date(2023, 10, 5)
  },
  {
    id: "collab-103",
    name: "Juliana Mendes",
    role: "Desenvolvedora",
    email: "juliana.mendes@autb.com.br",
    phone: "(11) 99876-5432",
    hierarchyLevel: "Técnico",
    type: "developer",
    status: "active",
    createdAt: new Date(2023, 8, 10),
    updatedAt: new Date(2024, 1, 15)
  },
  {
    id: "collab-104",
    name: "Roberto Alves",
    role: "Analista de Marketing",
    email: "roberto.alves@autb.com.br",
    phone: "(11) 98765-1234",
    hierarchyLevel: "Analista",
    type: "collaborator",
    status: "inactive",
    createdAt: new Date(2023, 9, 5),
    updatedAt: new Date(2024, 2, 20)
  }
];

// Mock data for workflows
const mockWorkflows: Workflow[] = [
  {
    id: "workflow-101",
    title: "Vendas B2B",
    description: "Workflow para gestão do processo de vendas para empresas",
    status: "active",
    departmentId: "dept-101",
    createdAt: new Date(2023, 5, 15),
    updatedAt: new Date(2023, 5, 15)
  },
  {
    id: "workflow-102",
    title: "Suporte Técnico",
    description: "Workflow para gestão de tickets de suporte técnico",
    status: "active",
    departmentId: "dept-102",
    createdAt: new Date(2023, 6, 20),
    updatedAt: new Date(2023, 10, 5)
  }
];

// Mock data for agents
const mockAgents: Agent[] = [
  {
    id: "agent-101",
    status: "active",
    type: "sales",
    profile: {
      name: "Vendedor B2B",
      role: "Agente de Vendas",
      goal: "Conversar com leads e qualificá-los"
    },
    expertise: {
      knowledge: ["Vendas", "Produtos", "Mercado"],
      skills: ["Negociação", "Prospecção", "Relacionamento"],
      examples: ["Como posso ajudar a aumentar suas vendas?"],
      tasks: ["Qualificar leads", "Agendar demonstrações"]
    },
    businessRules: {
      rules: ["Sempre oferecer o produto premium primeiro"],
      restrictions: ["Não negociar abaixo do preço mínimo"],
      conversationStyle: "professional"
    },
    tools: ["chat", "email", "calendar"],
    ragDocuments: ["Catálogo.pdf", "Preços.pdf"],
    createdAt: new Date(2023, 8, 10),
    updatedAt: new Date(2024, 1, 15)
  },
  {
    id: "agent-102",
    status: "active",
    type: "support",
    profile: {
      name: "Suporte Técnico",
      role: "Agente de Suporte",
      goal: "Resolver problemas técnicos dos clientes"
    },
    expertise: {
      knowledge: ["Sistemas", "Infraestrutura", "Segurança"],
      skills: ["Diagnóstico", "Resolução de Problemas", "Comunicação"],
      examples: ["Como posso ajudar com seu problema técnico?"],
      tasks: ["Diagnosticar problemas", "Orientar soluções"]
    },
    businessRules: {
      rules: ["Verificar status da assinatura antes de oferecer suporte avançado"],
      restrictions: ["Não conceder acesso remoto sem autorização"],
      conversationStyle: "friendly"
    },
    tools: ["chat", "email", "telephony"],
    ragDocuments: ["Manual.pdf", "Troubleshooting.pdf"],
    createdAt: new Date(2023, 9, 5),
    updatedAt: new Date(2024, 2, 20)
  }
];

// Mock data for assets
const mockAssets: Asset[] = [
  {
    id: "asset-101",
    title: "Proposta Comercial",
    type: "Contrato",
    description: "Modelo de proposta comercial para clientes B2B",
    workflowId: "workflow-101",
    pipelineId: "pipeline-101",
    stageId: "stage-101",
    departmentId: "dept-101",
    status: "open",
    amount: 5000,
    parameters: {
      validade: "30 dias",
      termos: "Pagamento em 30 dias após assinatura",
      desconto: false
    },
    startDate: new Date(2023, 8, 10),
    endDate: null,
    createdAt: new Date(2023, 8, 10),
    updatedAt: new Date(2024, 1, 15)
  },
  {
    id: "asset-102",
    title: "Contrato de Serviço",
    type: "Contrato",
    description: "Modelo de contrato para prestação de serviços",
    workflowId: "workflow-101",
    pipelineId: "pipeline-101",
    stageId: "stage-104",
    departmentId: "dept-101",
    status: "processing",
    amount: 12000,
    parameters: {
      duração: "12 meses",
      renovação: "Automática",
      suporte: true
    },
    startDate: new Date(2023, 9, 15),
    endDate: new Date(2024, 9, 15),
    createdAt: new Date(2023, 9, 15),
    updatedAt: new Date(2024, 2, 20)
  }
];

// Mock data for integrations
const mockIntegrations: Integration[] = [
  {
    id: "int-101",
    name: "Integração com CRM",
    description: "Integração com sistema de CRM externo",
    type: "api",
    provider: "Salesforce",
    status: "active",
    config: {
      apiKey: "XXX-YYY-ZZZ",
      endpoint: "https://api.salesforce.com/v2",
      syncInterval: "15min"
    },
    createdAt: new Date(2023, 8, 10),
    updatedAt: new Date(2024, 1, 15)
  },
  {
    id: "int-102",
    name: "Gateway de Pagamento",
    description: "Integração com gateway de pagamento",
    type: "webhook",
    provider: "Stripe",
    status: "active",
    config: {
      webhookUrl: "https://api.system.com/webhooks/payments",
      secretKey: "sk_test_123456",
      events: ["payment.success", "payment.failed"]
    },
    createdAt: new Date(2023, 9, 15),
    updatedAt: new Date(2024, 2, 20)
  }
];

export const getTemplates = (): Template[] => {
  return mockTemplates;
};

export const getCollaborators = (): Collaborator[] => {
  return mockCollaborators;
};

export const getWorkflows = (): Workflow[] => {
  return mockWorkflows;
};

export const getAgents = (): Agent[] => {
  return mockAgents;
};

export const getAssets = (): Asset[] => {
  return mockAssets;
};

export const getIntegrations = (): Integration[] => {
  return mockIntegrations;
};

export interface InstallTemplateResult {
  success: boolean;
  message?: string;
  error?: string;
  data?: {
    departments?: Department[];
    pipelines?: Pipeline[];
    stages?: Stage[];
    agents?: Agent[];
    assets?: Asset[];
    workflows?: Workflow[];
  }
}

export const installTemplate = async (templateId: string): Promise<InstallTemplateResult> => {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find template
    const template = mockTemplates.find(t => t.id === templateId);
    if (!template) {
      return {
        success: false,
        error: "Template não encontrado"
      };
    }
    
    // For AutB Software Sales template, load the specific data
    if (templateId === "software-sales-autb") {
      const templateData = getSoftwareSalesTemplate();
      
      // Here we'd save this data to the database or state management
      // For now we just return it
      return {
        success: true,
        message: `Template "${template.name}" instalado com sucesso.`,
        data: templateData
      };
    }
    
    // Default generic success for other templates
    return {
      success: true,
      message: `Template "${template.name}" instalado com sucesso.`
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido"
    };
  }
};
