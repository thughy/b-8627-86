
import { Asset, Department, Workflow, Integration, Collaborator, Agent } from '@/pages/Workflows/models/WorkflowModels';

// Mock data - replace with API calls in the future
const mockAssets: Asset[] = [
  // ... add any existing mock assets
];

const mockDepartments: Department[] = [
  // ... add any existing mock departments
];

const mockWorkflows: Workflow[] = [
  // ... add any existing mock workflows
];

const mockCollaborators: Collaborator[] = [
  {
    id: 'collab-1',
    name: 'João Silva',
    email: 'joao.silva@example.com',
    role: 'admin',
    type: 'internal',
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'collab-2',
    name: 'Maria Oliveira',
    email: 'maria.oliveira@example.com',
    role: 'editor',
    type: 'external',
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

const mockIntegrations: Integration[] = [
  {
    id: 'integration-1',
    name: 'Salesforce',
    type: 'crm',
    provider: 'Salesforce',
    status: 'active',
    isActive: true,
    credentials: {},
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'integration-2',
    name: 'Gmail',
    type: 'email',
    provider: 'Google',
    status: 'active',
    isActive: true,
    credentials: {},
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

const mockTemplates = [
  {
    id: 'template-1',
    title: 'Workflow de Vendas',
    description: 'Modelo completo para gestão de vendas',
    category: 'sales',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'template-2',
    title: 'Workflow de Suporte',
    description: 'Modelo para gerenciamento de tickets de suporte',
    category: 'support',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

// Get Assets
export const getAssets = (): Asset[] => {
  return mockAssets;
};

// Get Collaborators
export const getCollaborators = (): Collaborator[] => {
  return mockCollaborators;
};

// Get Integrations
export const getIntegrations = (): Integration[] => {
  return mockIntegrations;
};

// Get Workflows
export const getWorkflows = (): Workflow[] => {
  return mockWorkflows;
};

// Get Templates
export const getTemplates = () => {
  return mockTemplates;
};

// Add any other service functions needed
