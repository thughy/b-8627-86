
import { Template, Workflow, Department, Pipeline, Stage, Agent, Asset } from "@/pages/Workflows/models/WorkflowModels";
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

export const getTemplates = (): Template[] => {
  return mockTemplates;
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
