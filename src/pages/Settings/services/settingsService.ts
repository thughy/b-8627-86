
import { Workflow, Department, Pipeline, Stage, Agent, Asset, Integration, Collaborator } from "@/pages/Workflows/models/WorkflowModels";
import { getDepartments, getPipelines, getStages } from "./workflowDataService";
import { getMockAgents } from "./agentDataService";

// Mock data for integrations
const integrations: Integration[] = [
  {
    id: "integration1",
    name: "WhatsApp Business API",
    type: "message",
    provider: "WhatsApp",
    status: "active",
    credentials: {
      apiKey: "mock-api-key-1",
      phoneNumber: "+551199999999"
    },
    isActive: true,
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-06-10")
  },
  {
    id: "integration2",
    name: "Stripe Payments",
    type: "payment",
    provider: "Stripe",
    status: "active",
    credentials: {
      apiKey: "mock-stripe-key",
      webhookSecret: "mock-webhook-secret"
    },
    isActive: true,
    createdAt: new Date("2023-02-20"),
    updatedAt: new Date("2023-07-05")
  },
  {
    id: "integration3",
    name: "OpenAI GPT-4",
    type: "llm",
    provider: "OpenAI",
    status: "active",
    credentials: {
      apiKey: "mock-openai-key"
    },
    isActive: true,
    createdAt: new Date("2023-03-10"),
    updatedAt: new Date("2023-08-15")
  }
];

// Mock data for collaborators
const collaborators: Collaborator[] = [
  {
    id: "collab1",
    name: "João Silva",
    email: "joao.silva@example.com",
    role: "Gerente de Vendas",
    type: "admin",
    status: "active",
    phone: "+5511987654321",
    hierarchyLevel: "Gerência",
    createdAt: new Date("2023-01-05"),
    updatedAt: new Date("2023-06-15")
  },
  {
    id: "collab2",
    name: "Maria Souza",
    email: "maria.souza@example.com",
    role: "Agente de Vendas",
    type: "agent",
    status: "active",
    phone: "+5511987654322",
    hierarchyLevel: "Operacional",
    createdAt: new Date("2023-02-10"),
    updatedAt: new Date("2023-07-20")
  },
  {
    id: "collab3",
    name: "Pedro Santos",
    email: "pedro.santos@example.com",
    role: "Analista de Suporte",
    type: "support",
    status: "inactive",
    phone: "+5511987654323",
    hierarchyLevel: "Operacional",
    createdAt: new Date("2023-03-15"),
    updatedAt: new Date("2023-08-25")
  }
];

// Mock data for assets
const assets: Asset[] = [
  {
    id: "asset1",
    dealId: "deal1",
    title: "Proposta Comercial - Cliente A",
    description: "Proposta detalhada para o Cliente A",
    type: "proposal",
    amount: 15000,
    status: "completed",
    startDate: new Date("2023-05-10"),
    endDate: new Date("2023-05-20"),
    workEnvironment: {
      workflowTitle: "Workflow de Vendas",
      departmentTitle: "Comercial",
      stageTitle: "Negociação"
    },
    files: ["proposta_cliente_a.pdf"],
    parameters: {
      discountApplied: true,
      discountValue: 10,
      paymentTerms: "30 dias"
    },
    createdAt: new Date("2023-05-01"),
    updatedAt: new Date("2023-05-25")
  },
  {
    id: "asset2",
    dealId: "deal2",
    title: "Contrato de Serviço - Cliente B",
    description: "Contrato padrão para Cliente B",
    type: "contract",
    amount: 8000,
    status: "processing",
    startDate: new Date("2023-06-15"),
    workEnvironment: {
      workflowTitle: "Workflow de Suporte",
      departmentTitle: "Jurídico",
      stageTitle: "Revisão"
    },
    files: ["contrato_cliente_b.docx", "anexos_contrato.pdf"],
    parameters: {
      serviceLevel: "Premium",
      duration: "12 meses"
    },
    createdAt: new Date("2023-06-10"),
    updatedAt: new Date("2023-06-20")
  }
];

// Mock data for workflows
const workflows: Workflow[] = [
  {
    id: "workflow1",
    title: "Workflow de Vendas",
    description: "Processo de vendas completo",
    status: "active",
    departmentId: "dept1",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-05-15")
  },
  {
    id: "workflow2",
    title: "Workflow de Suporte",
    description: "Atendimento ao cliente",
    status: "active",
    departmentId: "dept2",
    createdAt: new Date("2023-02-01"),
    updatedAt: new Date("2023-06-10")
  },
  {
    id: "workflow3",
    title: "Workflow de Marketing",
    description: "Campanhas e ações de marketing",
    status: "draft",
    departmentId: "dept3",
    createdAt: new Date("2023-03-01"),
    updatedAt: new Date("2023-07-05")
  }
];

// Function to get workflows
export const getWorkflows = (): Workflow[] => {
  return workflows;
};

// Function to get assets
export const getAssets = (): Asset[] => {
  return assets;
};

// Function to get integrations
export const getIntegrations = (): Integration[] => {
  return integrations;
};

// Function to get collaborators
export const getCollaborators = (): Collaborator[] => {
  return collaborators;
};

// Function to get all data for templates
export const getAllDataForTemplates = () => {
  return {
    workflows: getWorkflows(),
    departments: getDepartments(),
    pipelines: getPipelines(),
    stages: getStages(),
    agents: getMockAgents(),
    assets: getAssets()
  };
};

// Function to get a specific template by type and ID
export const getTemplateByTypeAndId = (type: string, id: string) => {
  let item;
  
  switch (type) {
    case 'workflow':
      item = workflows.find(w => w.id === id);
      break;
    case 'department':
      item = getDepartments().find(d => d.id === id);
      break;
    case 'pipeline':
      item = getPipelines().find(p => p.id === id);
      break;
    case 'stage':
      item = getStages().find(s => s.id === id);
      break;
    case 'agent':
      item = getMockAgents().find(a => a.id === id);
      break;
    case 'asset':
      item = assets.find(a => a.id === id);
      break;
    default:
      return null;
  }
  
  return item || null;
};
