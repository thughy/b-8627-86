
import { Department, Pipeline, Stage, Deal, Workflow, Asset } from "../models/WorkflowModels";

// Mock data para workflow
const mockWorkflows: Workflow[] = [
  {
    id: "workflow-1",
    title: "Comercial",
    description: "Workflow de vendas e prospecção",
    status: "active",
    departmentId: "dept-1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "workflow-2",
    title: "Suporte",
    description: "Workflow de atendimento ao cliente",
    status: "active",
    departmentId: "dept-2",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "workflow-3",
    title: "Marketing",
    description: "Workflow de campanhas de marketing",
    status: "draft",
    departmentId: "dept-3",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "workflow-4",
    title: "Financeiro",
    description: "Workflow de gestão financeira",
    status: "inactive",
    departmentId: "dept-4",
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

// Mock data para departamentos
const mockDepartments: Department[] = [
  {
    id: "dept-1",
    title: "Comercial",
    description: "Departamento de vendas"
  },
  {
    id: "dept-2",
    title: "Suporte",
    description: "Departamento de suporte ao cliente"
  },
  {
    id: "dept-3",
    title: "Marketing",
    description: "Departamento de marketing"
  },
  {
    id: "dept-4",
    title: "Financeiro",
    description: "Departamento financeiro"
  }
];

// Mock data para pipelines
const mockPipelines: Pipeline[] = [
  {
    id: "pipeline-1",
    departmentId: "dept-1",
    title: "Pipeline de Vendas",
    description: "Fluxo principal de vendas",
    stages: [
      {
        id: "stage-1",
        pipelineId: "pipeline-1",
        title: "Prospecção",
        order: 1
      },
      {
        id: "stage-2",
        pipelineId: "pipeline-1",
        title: "Qualificação",
        order: 2
      },
      {
        id: "stage-3",
        pipelineId: "pipeline-1",
        title: "Proposta",
        order: 3
      },
      {
        id: "stage-4",
        pipelineId: "pipeline-1",
        title: "Negociação",
        order: 4
      },
      {
        id: "stage-5",
        pipelineId: "pipeline-1",
        title: "Fechamento",
        order: 5
      }
    ]
  },
  {
    id: "pipeline-2",
    departmentId: "dept-2",
    title: "Pipeline de Suporte",
    description: "Fluxo de atendimento ao cliente",
    stages: [
      {
        id: "stage-6",
        pipelineId: "pipeline-2",
        title: "Triagem",
        order: 1
      },
      {
        id: "stage-7",
        pipelineId: "pipeline-2",
        title: "Atendimento",
        order: 2
      },
      {
        id: "stage-8",
        pipelineId: "pipeline-2",
        title: "Resolução",
        order: 3
      },
      {
        id: "stage-9",
        pipelineId: "pipeline-2",
        title: "Verificação",
        order: 4
      }
    ]
  }
];

// Mock data para deals
const mockDeals: Deal[] = [
  // Deals do pipeline de vendas
  {
    id: "deal-1",
    title: "Cliente A",
    stageId: "stage-1",
    status: "open",
    customerName: "João Silva",
    customerOrganization: "Empresa X",
    createdAt: new Date()
  },
  {
    id: "deal-2",
    title: "Cliente B",
    stageId: "stage-1",
    status: "open",
    customerName: "Maria Oliveira",
    customerOrganization: "Empresa Y",
    createdAt: new Date()
  },
  {
    id: "deal-3",
    title: "Cliente C",
    stageId: "stage-2",
    status: "open",
    amount: 5000,
    customerName: "Pedro Santos",
    customerOrganization: "Empresa Z",
    createdAt: new Date()
  },
  {
    id: "deal-4",
    title: "Cliente D",
    stageId: "stage-3",
    status: "open",
    amount: 12000,
    customerName: "Ana Costa",
    customerOrganization: "Empresa W",
    createdAt: new Date()
  },
  {
    id: "deal-5",
    title: "Cliente E",
    stageId: "stage-4",
    status: "open",
    amount: 8500,
    customerName: "Carlos Ferreira",
    customerOrganization: "Empresa K",
    createdAt: new Date()
  },
  {
    id: "deal-6",
    title: "Cliente F",
    stageId: "stage-5",
    status: "won",
    amount: 15000,
    customerName: "Fernanda Lima",
    customerOrganization: "Empresa M",
    createdAt: new Date()
  },
  
  // Deals do pipeline de suporte
  {
    id: "deal-7",
    title: "Suporte Cliente X",
    stageId: "stage-6",
    status: "open",
    customerName: "Roberto Alves",
    customerOrganization: "Empresa N",
    createdAt: new Date()
  },
  {
    id: "deal-8",
    title: "Suporte Cliente Y",
    stageId: "stage-7",
    status: "open",
    customerName: "Luciana Mendes",
    customerOrganization: "Empresa P",
    createdAt: new Date()
  },
  {
    id: "deal-9",
    title: "Suporte Cliente Z",
    stageId: "stage-8",
    status: "completed",
    customerName: "Marcelo Souza",
    customerOrganization: "Empresa Q",
    createdAt: new Date()
  }
];

// Mock data para assets
const mockAssets: Asset[] = [];

// Funções para acessar os dados
export const getWorkflows = (): Workflow[] => {
  return mockWorkflows;
};

export const getDepartments = (): Department[] => {
  return mockDepartments;
};

export const getPipelinesByDepartment = (departmentId: string): Pipeline[] => {
  return mockPipelines.filter(pipeline => pipeline.departmentId === departmentId);
};

export const getDealsByStage = (stageId: string): Deal[] => {
  return mockDeals.filter(deal => deal.stageId === stageId);
};

export const getDealsByPipeline = (pipelineId: string): Deal[] => {
  const stageIds = mockPipelines
    .find(pipeline => pipeline.id === pipelineId)?.stages
    .map(stage => stage.id) || [];
  
  return mockDeals.filter(deal => stageIds.includes(deal.stageId));
};

export const getDealsByDepartment = (departmentId: string): Deal[] => {
  const pipelines = getPipelinesByDepartment(departmentId);
  const pipelineIds = pipelines.map(pipeline => pipeline.id);
  
  let deals: Deal[] = [];
  pipelineIds.forEach(pipelineId => {
    deals = [...deals, ...getDealsByPipeline(pipelineId)];
  });
  
  return deals;
};

export const getDealsByWorkflow = (workflowId: string): Deal[] => {
  const workflow = mockWorkflows.find(w => w.id === workflowId);
  if (!workflow) return [];
  
  return getDealsByDepartment(workflow.departmentId);
};

// Função para criar um novo deal
export const createDeal = (dealData: Partial<Deal>): Deal => {
  const newDeal: Deal = {
    id: `deal-${mockDeals.length + 1}`,
    title: dealData.title || "Novo Deal",
    description: dealData.description,
    stageId: dealData.stageId || "",
    status: dealData.status || "open",
    amount: dealData.amount,
    startDate: dealData.startDate,
    endDate: dealData.endDate,
    customerName: dealData.customerName,
    customerOrganization: dealData.customerOrganization,
    createdAt: new Date()
  };

  mockDeals.push(newDeal);
  return newDeal;
};

// Função para criar um novo asset
export const createAsset = (assetData: Partial<Asset>): Asset => {
  const newAsset: Asset = {
    id: `asset-${mockAssets.length + 1}`,
    dealId: assetData.dealId || "",
    title: assetData.title || "Novo Asset",
    description: assetData.description,
    type: assetData.type || "",
    amount: assetData.amount,
    status: assetData.status || "open",
    startDate: assetData.startDate,
    endDate: assetData.endDate,
    workEnvironment: assetData.workEnvironment,
    files: assetData.files || [],
    parameters: assetData.parameters || {},
    createdAt: new Date(),
    updatedAt: new Date()
  };

  mockAssets.push(newAsset);
  return newAsset;
};

// Função para obter assets de um deal
export const getAssetsByDeal = (dealId: string): Asset[] => {
  return mockAssets.filter(asset => asset.dealId === dealId);
};
