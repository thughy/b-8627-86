
import { Workflow, Department, Pipeline, Stage, Deal } from "../models/WorkflowModels";

// Mock data para departamentos
export const getDepartments = (): Department[] => {
  return [
    { id: "dept-1", title: "Comercial", description: "Departamento de vendas e negociações", color: "#10b981" },
    { id: "dept-2", title: "Suporte", description: "Departamento de atendimento ao cliente", color: "#3b82f6" },
    { id: "dept-3", title: "Marketing", description: "Departamento de marketing e comunicação", color: "#8b5cf6" },
    { id: "dept-4", title: "Financeiro", description: "Departamento financeiro e contábil", color: "#f59e0b" }
  ];
};

// Mock data para pipelines
export const getPipelines = (): Pipeline[] => {
  return [
    {
      id: "pipe-1",
      departmentId: "dept-1",
      title: "Pipeline de Vendas",
      description: "Processo de vendas completo",
      stages: [
        { id: "stage-1", pipelineId: "pipe-1", title: "Prospecção", order: 1 },
        { id: "stage-2", pipelineId: "pipe-1", title: "Qualificação", order: 2 },
        { id: "stage-3", pipelineId: "pipe-1", title: "Proposta", order: 3 },
        { id: "stage-4", pipelineId: "pipe-1", title: "Negociação", order: 4 },
        { id: "stage-5", pipelineId: "pipe-1", title: "Fechamento", order: 5 }
      ]
    },
    {
      id: "pipe-2",
      departmentId: "dept-2",
      title: "Atendimento",
      description: "Fluxo de atendimento ao cliente",
      stages: [
        { id: "stage-6", pipelineId: "pipe-2", title: "Aberto", order: 1 },
        { id: "stage-7", pipelineId: "pipe-2", title: "Em Análise", order: 2 },
        { id: "stage-8", pipelineId: "pipe-2", title: "Em Resolução", order: 3 },
        { id: "stage-9", pipelineId: "pipe-2", title: "Concluído", order: 4 }
      ]
    },
    {
      id: "pipe-3",
      departmentId: "dept-3",
      title: "Campanhas",
      description: "Gestão de campanhas de marketing",
      stages: [
        { id: "stage-10", pipelineId: "pipe-3", title: "Planejamento", order: 1 },
        { id: "stage-11", pipelineId: "pipe-3", title: "Produção", order: 2 },
        { id: "stage-12", pipelineId: "pipe-3", title: "Revisão", order: 3 },
        { id: "stage-13", pipelineId: "pipe-3", title: "Execução", order: 4 },
        { id: "stage-14", pipelineId: "pipe-3", title: "Análise", order: 5 }
      ]
    }
  ];
};

// Mock data para deals
export const getDeals = (): Deal[] => {
  return [
    {
      id: "deal-1",
      title: "Cliente A - Contrato Anual",
      description: "Renovação de contrato anual",
      stageId: "stage-4",
      type: "Contrato",
      amount: 15000,
      status: "open",
      customerName: "João Silva",
      customerOrganization: "Empresa A",
      createdAt: new Date("2023-10-15")
    },
    {
      id: "deal-2",
      title: "Cliente B - Novo Projeto",
      description: "Implementação de novo sistema",
      stageId: "stage-2",
      type: "Projeto",
      amount: 25000,
      status: "open",
      customerName: "Maria Santos",
      customerOrganization: "Empresa B",
      createdAt: new Date("2023-11-02")
    },
    {
      id: "deal-3",
      title: "Suporte Premium",
      description: "Upgrade para plano premium",
      stageId: "stage-7",
      type: "Suporte",
      amount: 1200,
      status: "open",
      customerName: "Carlos Oliveira",
      customerOrganization: "Empresa C",
      createdAt: new Date("2023-11-10")
    },
    {
      id: "deal-4",
      title: "Campanha Redes Sociais",
      description: "Campanha para Instagram e Facebook",
      stageId: "stage-11",
      type: "Marketing",
      amount: 8000,
      status: "open",
      customerName: "Ana Pereira",
      customerOrganization: "Empresa D",
      createdAt: new Date("2023-11-05")
    }
  ];
};

// Filtrar pipelines por departamento
export const getPipelinesByDepartment = (departmentId: string): Pipeline[] => {
  return getPipelines().filter(pipeline => pipeline.departmentId === departmentId);
};

// Filtrar deals por estágio
export const getDealsByStage = (stageId: string): Deal[] => {
  return getDeals().filter(deal => deal.stageId === stageId);
};

// Obter pipeline por ID
export const getPipelineById = (pipelineId: string): Pipeline | undefined => {
  return getPipelines().find(pipeline => pipeline.id === pipelineId);
};

// Obter departamento por ID
export const getDepartmentById = (departmentId: string): Department | undefined => {
  return getDepartments().find(dept => dept.id === departmentId);
};
