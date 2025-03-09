
import { Department, Pipeline, Stage, Agent, Asset } from "@/pages/Workflows/models/WorkflowModels";

export const getDemoData = (workflowId: string) => {
  const departments: Department[] = [
    {
      id: "dept-101",
      title: "Comercial",
      description: "Departamento responsável pelas vendas e negociações",
      color: "#6366F1"
    },
    {
      id: "dept-102",
      title: "Marketing",
      description: "Departamento responsável por estratégias de marketing",
      color: "#EC4899"
    }
  ];

  const pipelines: Pipeline[] = [
    {
      id: "pipeline-201",
      departmentId: "dept-101",
      title: "Pipeline de Vendas",
      description: "Processo de vendas completo",
      stages: []
    },
    {
      id: "pipeline-202",
      departmentId: "dept-101",
      title: "Atendimento Pós-Venda",
      description: "Suporte e acompanhamento pós-venda",
      stages: []
    }
  ];

  const stages: Stage[] = [
    {
      id: "stage-301",
      pipelineId: "pipeline-201",
      title: "Prospecção",
      description: "Prospecção de novos clientes",
      order: 1
    },
    {
      id: "stage-302",
      pipelineId: "pipeline-201",
      title: "Qualificação",
      description: "Qualificação de leads",
      order: 2
    },
    {
      id: "stage-303",
      pipelineId: "pipeline-201",
      title: "Proposta",
      description: "Envio de propostas",
      order: 3
    }
  ];

  const agents: Agent[] = [
    {
      id: "agent-401",
      stageId: "stage-301",
      profile: {
        agentName: "Agente de Prospecção",
        agentRole: "Vendedor",
        agentGoal: "Encontrar novos leads qualificados"
      },
      workEnvironment: {
        workflowTitle: "Processo de Vendas B2B",
        stageTitle: "Prospecção"
      },
      businessRules: {
        rules: "Sempre ser cordial",
        restrictions: "Não oferecer descontos",
        conversationStyle: "professional"
      },
      expertise: {
        knowledge: "Produtos e serviços",
        skills: "Comunicação efetiva",
        examples: "Exemplos de abordagem",
        tasks: "Qualificação de leads"
      },
      tools: {},
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  const assets: Asset[] = [
    {
      id: "asset-501",
      dealId: "stage-301", // Simulando relação com o stage
      title: "Lead Generator",
      description: "Ferramenta para geração de leads qualificados",
      type: "Ferramenta",
      status: "open",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  return { departments, pipelines, stages, agents, assets };
};
