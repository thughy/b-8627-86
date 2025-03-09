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
    department: 'Sales',
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'collab-2',
    name: 'Maria Oliveira',
    email: 'maria.oliveira@example.com',
    role: 'editor',
    department: 'Marketing',
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
export const getAssets = async (): Promise<Asset[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockAssets);
    }, 500);
  });
};

// Get Collaborators
export const getCollaborators = async (): Promise<Collaborator[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCollaborators);
    }, 500);
  });
};

// Get Integrations
export const getIntegrations = async (): Promise<Integration[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockIntegrations);
    }, 500);
  });
};

// Get Workflows
export const getWorkflows = async (): Promise<Workflow[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockWorkflows);
    }, 500);
  });
};

// Get Templates
export const getTemplates = async () => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTemplates);
    }, 500);
  });
};

// Add any other service functions needed
