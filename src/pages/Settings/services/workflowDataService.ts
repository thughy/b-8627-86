
import { Department, Pipeline, Stage } from "@/pages/Workflows/models/WorkflowModels";

// Mock data for development
const mockDepartments: Department[] = [
  {
    id: "dept-1",
    title: "Vendas",
    description: "Departamento de vendas",
    color: "#4CAF50"
  },
  {
    id: "dept-2",
    title: "Marketing",
    description: "Departamento de marketing",
    color: "#2196F3"
  },
  {
    id: "dept-3",
    title: "Atendimento",
    description: "Departamento de atendimento ao cliente",
    color: "#FF9800"
  }
];

const mockPipelines: Pipeline[] = [
  {
    id: "pipe-1",
    departmentId: "dept-1",
    title: "Pipeline de Vendas",
    description: "Pipeline principal de vendas",
    stages: []
  },
  {
    id: "pipe-2",
    departmentId: "dept-2",
    title: "Pipeline de Marketing",
    description: "Pipeline de campanhas de marketing",
    stages: []
  }
];

const mockStages: Stage[] = [
  {
    id: "stage-1",
    pipelineId: "pipe-1",
    title: "Prospecção",
    description: "Fase inicial de contato com clientes potenciais",
    order: 1
  },
  {
    id: "stage-2",
    pipelineId: "pipe-1",
    title: "Qualificação",
    description: "Avaliação do potencial do cliente",
    order: 2
  },
  {
    id: "stage-3",
    pipelineId: "pipe-2",
    title: "Planejamento",
    description: "Planejamento de campanha",
    order: 1
  }
];

export const getDepartments = (): Department[] => {
  return mockDepartments;
};

export const getPipelines = (): Pipeline[] => {
  return mockPipelines;
};

export const getStages = (): Stage[] => {
  return mockStages;
};
