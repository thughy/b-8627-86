
import { Template, Asset, Collaborator, Integration, Workflow } from "@/pages/Workflows/models/WorkflowModels";

// Mock data for templates
const mockTemplates: Template[] = [
  {
    id: "template-1",
    type: "workflow",
    name: "Comercial Básico",
    version: "1.0.0",
    data: {
      workflowTitle: "Workflow Comercial",
      workflowDescription: "Fluxo de trabalho para equipes de vendas",
      departmentTitle: "Vendas",
      departmentDescription: "Departamento de vendas e comercial",
      pipelineTitle: "Pipeline de Vendas",
      pipelineDescription: "Processo de vendas padrão"
    },
    updatedAt: new Date(2023, 10, 15)
  },
  {
    id: "template-2",
    type: "department",
    name: "Departamento de Marketing",
    version: "1.2.0",
    data: {
      departmentTitle: "Marketing",
      departmentDescription: "Departamento para campanhas de marketing",
      pipelineTitle: "Pipeline de Campanhas",
      pipelineDescription: "Processo para gerenciar campanhas de marketing"
    },
    updatedAt: new Date(2023, 11, 5)
  },
  {
    id: "template-3",
    type: "pipeline",
    name: "Pipeline de Suporte",
    version: "1.1.0",
    data: {
      pipelineTitle: "Atendimento ao Cliente",
      pipelineDescription: "Processo para gerenciar tickets de suporte",
      stages: [
        "Novo Ticket", 
        "Em Análise", 
        "Em Atendimento", 
        "Aguardando Cliente", 
        "Resolvido"
      ]
    },
    updatedAt: new Date(2023, 11, 20)
  },
  {
    id: "template-4",
    type: "stage",
    name: "Estágios de Vendas Avançado",
    version: "2.0.0",
    data: {
      stages: [
        {
          title: "Prospecção",
          description: "Identificação de leads potenciais"
        },
        {
          title: "Qualificação",
          description: "Avaliação de leads para determinar adequação"
        },
        {
          title: "Proposta",
          description: "Apresentação de proposta de valor"
        },
        {
          title: "Negociação",
          description: "Discussão de termos e condições"
        },
        {
          title: "Fechamento",
          description: "Finalização do acordo"
        }
      ]
    },
    updatedAt: new Date(2024, 0, 10)
  },
  {
    id: "template-5",
    type: "agent",
    name: "Agente de Vendas",
    version: "1.0.0",
    data: {
      profile: {
        agentName: "Vendedor Virtual",
        agentRole: "Especialista em Vendas",
        agentGoal: "Maximizar conversões e satisfação do cliente"
      },
      businessRules: {
        rules: "Seguir processo de vendas padrão",
        restrictions: "Não oferecer descontos acima de 15%",
        conversationStyle: "Profissional"
      },
      expertise: {
        knowledge: "Produtos, precificação, técnicas de negociação",
        skills: "Persuasão, comunicação, análise de necessidades",
        examples: "Como identificar objeções e superá-las"
      }
    },
    updatedAt: new Date(2024, 1, 5)
  },
  {
    id: "template-6",
    type: "asset",
    name: "Proposta Comercial",
    version: "1.0.0",
    data: {
      title: "Proposta Comercial Padrão",
      description: "Template para propostas comerciais",
      type: "proposal",
      parameters: {
        validityDays: 30,
        paymentTerms: "30/60/90 dias",
        deliveryTime: "15 dias úteis"
      }
    },
    updatedAt: new Date(2024, 1, 15)
  }
];

// Mock data for assets
const mockAssets: Asset[] = [
  {
    id: "asset-1",
    dealId: "deal-1",
    title: "Proposta Comercial",
    description: "Proposta para cliente XYZ",
    type: "proposal",
    status: "open",
    amount: 5000,
    workEnvironment: {
      workflowTitle: "Workflow Comercial",
      departmentTitle: "Vendas",
      stageTitle: "Proposta"
    },
    createdAt: new Date(2023, 10, 15),
    updatedAt: new Date(2023, 10, 15)
  },
  {
    id: "asset-2",
    dealId: "deal-2",
    title: "Contrato de Serviço",
    description: "Contrato para cliente ABC",
    type: "contract",
    status: "completed",
    amount: 10000,
    workEnvironment: {
      workflowTitle: "Workflow Comercial",
      departmentTitle: "Vendas",
      stageTitle: "Fechamento"
    },
    createdAt: new Date(2023, 11, 5),
    updatedAt: new Date(2023, 11, 5)
  }
];

// Mock data for collaborators
const mockCollaborators: Collaborator[] = [
  {
    id: "collab-1",
    name: "João Silva",
    email: "joao@exemplo.com",
    role: "Gerente de Vendas",
    type: "collaborator",
    status: "active",
    phone: "(11) 98765-4321",
    hierarchyLevel: "Gerência",
    createdAt: new Date(2023, 9, 10),
    updatedAt: new Date(2023, 9, 10)
  },
  {
    id: "collab-2",
    name: "Maria Santos",
    email: "maria@exemplo.com",
    role: "Analista de Marketing",
    type: "collaborator",
    status: "active",
    phone: "(11) 91234-5678",
    hierarchyLevel: "Operacional",
    createdAt: new Date(2023, 10, 5),
    updatedAt: new Date(2023, 10, 5)
  },
  {
    id: "collab-3",
    name: "Carlos Oliveira",
    email: "carlos@exemplo.com",
    role: "Desenvolvedor",
    type: "developer",
    status: "pending",
    createdAt: new Date(2023, 11, 15),
    updatedAt: new Date(2023, 11, 15)
  }
];

// Mock data for integrations
const mockIntegrations: Integration[] = [
  {
    id: "integration-1",
    name: "WhatsApp Business",
    type: "messages",
    provider: "Meta",
    status: "active",
    config: {
      apiKey: "xxxxx",
      phoneNumber: "+5511999999999"
    },
    createdAt: new Date(2023, 10, 1)
  },
  {
    id: "integration-2",
    name: "Stripe Payments",
    type: "payments",
    provider: "Stripe",
    status: "active",
    config: {
      apiKey: "sk_test_xxxxx",
      webhookUrl: "https://api.example.com/webhooks/stripe"
    },
    createdAt: new Date(2023, 11, 10)
  },
  {
    id: "integration-3",
    name: "Gmail",
    type: "email",
    provider: "Google",
    status: "inactive",
    config: {
      clientId: "xxxxx.apps.googleusercontent.com",
      clientSecret: "xxxxx"
    },
    createdAt: new Date(2023, 9, 15)
  }
];

// Mock data for workflows
const mockWorkflows: Workflow[] = [
  {
    id: "workflow-1",
    title: "Workflow Comercial",
    description: "Processo de vendas completo",
    status: "active",
    departmentId: "dept-1",
    createdAt: new Date(2023, 10, 1),
    updatedAt: new Date(2023, 10, 1)
  },
  {
    id: "workflow-2",
    title: "Workflow de Marketing",
    description: "Processo de campanhas de marketing",
    status: "draft",
    departmentId: "dept-2",
    createdAt: new Date(2023, 11, 5),
    updatedAt: new Date(2023, 11, 5)
  }
];

// Function to get all templates
export const getTemplates = (): Template[] => {
  return mockTemplates;
};

// Function to get templates by type
export const getTemplatesByType = (type: Template['type']): Template[] => {
  return mockTemplates.filter(template => template.type === type);
};

// Function to get a template by ID
export const getTemplateById = (id: string): Template | undefined => {
  return mockTemplates.find(template => template.id === id);
};

// Function to get all assets
export const getAssets = (): Asset[] => {
  return mockAssets;
};

// Function to get all collaborators
export const getCollaborators = (): Collaborator[] => {
  return mockCollaborators;
};

// Function to get all integrations
export const getIntegrations = (): Integration[] => {
  return mockIntegrations;
};

// Function to get all workflows
export const getWorkflows = (): Workflow[] => {
  return mockWorkflows;
};

// Function to install a template
export const installTemplate = (templateId: string): boolean => {
  // Mock implementation - would actually copy the template to the user's active configurations
  console.log(`Template ${templateId} installed`);
  return true;
};

// Function to uninstall a template
export const uninstallTemplate = (templateId: string): boolean => {
  // Mock implementation - would actually remove the template from the user's active configurations
  console.log(`Template ${templateId} uninstalled`);
  return true;
};

// Function to update a template
export const updateTemplate = (templateId: string): boolean => {
  // Mock implementation - would actually update the template to the latest version
  console.log(`Template ${templateId} updated`);
  return true;
};

// Function to export a template
export const exportTemplate = (templateId: string): object => {
  const template = getTemplateById(templateId);
  // In a real implementation, this would format the template for export
  return template || {};
};

// Function to generate a template report
export const generateTemplateReport = (templateId: string): object => {
  const template = getTemplateById(templateId);
  // In a real implementation, this would generate a detailed report about the template
  return {
    template,
    usageStats: {
      timesInstalled: 12,
      activeInstallations: 8,
      averageRating: 4.5
    }
  };
};

// Function to import a template (would receive a file or object in a real implementation)
export const importTemplate = (templateData: any): Template | null => {
  // Mock implementation - would validate and process the imported template
  const newTemplate: Template = {
    id: `template-${mockTemplates.length + 1}`,
    type: templateData.type || "workflow",
    name: templateData.name || "Imported Template",
    version: templateData.version || "1.0.0",
    data: templateData.data || {},
    updatedAt: new Date()
  };
  
  // In a real implementation, we would add this to the database
  // mockTemplates.push(newTemplate);
  
  return newTemplate;
};
