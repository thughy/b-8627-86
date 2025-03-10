
import { Workflow, Pipeline, Stage, Deal } from '../models/WorkflowModels';

// Mock data - replace with API calls later
export const mockWorkflows: Workflow[] = [
  {
    id: 'workflow-1',
    title: 'Workflow de Vendas',
    description: 'Processo de vendas completo',
    status: 'active',
    departmentId: 'dept-1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const mockPipelines: Pipeline[] = [
  {
    id: 'pipeline-1',
    departmentId: 'dept-1',
    title: 'Pipeline de Vendas Principal',
    description: 'Pipeline para gerenciar oportunidades de vendas',
    stages: [],
  },
];

export const mockStages: Stage[] = [
  {
    id: 'stage-1',
    pipelineId: 'pipeline-1',
    title: 'Prospecção',
    description: 'Primeiro contato com o cliente',
    order: 1,
  },
  {
    id: 'stage-2',
    pipelineId: 'pipeline-1',
    title: 'Qualificação',
    description: 'Entendimento das necessidades do cliente',
    order: 2,
  },
  {
    id: 'stage-3',
    pipelineId: 'pipeline-1',
    title: 'Proposta',
    description: 'Apresentação da solução',
    order: 3,
  },
];

export const mockDeals: Deal[] = [
  {
    id: 'deal-1',
    title: 'Venda de Software para Empresa X',
    description: 'Oportunidade de venda de licenças de software',
    stageId: 'stage-1',
    status: 'open',
    type: 'new',
    amount: 15000,
    customerName: 'Empresa X',
    customerOrganization: 'Tech Solutions Inc.',
    interests: 'interested',
    startDate: new Date(),
    createdAt: new Date(),
  },
  {
    id: 'deal-2',
    title: 'Consultoria em Marketing Digital',
    description: 'Serviços de consultoria para otimizar campanhas',
    stageId: 'stage-2',
    status: 'won',
    type: 'renewal',
    amount: 8000,
    customerName: 'João Silva',
    customerOrganization: 'Marketing Pro',
    interests: 'buy',
    startDate: new Date(),
    createdAt: new Date(),
  },
  {
    id: 'deal-3',
    title: 'Treinamento para Equipe de Vendas',
    description: 'Capacitação da equipe comercial',
    stageId: 'stage-3',
    status: 'open',
    type: 'cross-sell',
    amount: 12000,
    customerName: 'Maria Oliveira',
    customerOrganization: 'Global Sales Corp',
    interests: 'negotiate',
    startDate: new Date(),
    createdAt: new Date(),
  },
];
