
import { Department, Pipeline, Stage, Agent, Asset, Workflow } from "@/pages/Workflows/models/WorkflowModels";

export const getSoftwareSalesTemplate = () => {
  // Create two workflows
  const workflows: Workflow[] = [
    {
      id: "workflow-autb-sales",
      title: "Vendas de Software AutB",
      description: "Processo de venda do sistema de automatização AutB",
      status: "active",
      departmentId: "dept-sales-autb",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "workflow-autb-implementation",
      title: "Implementação AutB",
      description: "Processo de implementação do sistema AutB para novos clientes",
      status: "active",
      departmentId: "dept-implementation-autb",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  // Create departments
  const departments: Department[] = [
    {
      id: "dept-sales-autb",
      title: "Comercial AutB",
      description: "Departamento responsável pelas vendas de software AutB",
      color: "#4f46e5" // Indigo
    },
    {
      id: "dept-implementation-autb",
      title: "Implementação AutB",
      description: "Departamento responsável pela implementação do software AutB",
      color: "#0891b2" // Cyan
    }
  ];

  // Create pipelines
  const pipelines: Pipeline[] = [
    {
      id: "pipeline-prospection-autb",
      departmentId: "dept-sales-autb",
      title: "Prospecção e Venda AutB",
      description: "Pipeline de prospecção e venda do software AutB",
      stages: []
    },
    {
      id: "pipeline-success-autb",
      departmentId: "dept-implementation-autb",
      title: "Implementação e Sucesso AutB",
      description: "Pipeline de implementação e sucesso do cliente com AutB",
      stages: []
    }
  ];

  // Create stages (4 for each pipeline)
  const stages: Stage[] = [
    // Sales pipeline stages
    {
      id: "stage-prospection-autb",
      pipelineId: "pipeline-prospection-autb",
      title: "Prospecção",
      description: "Identificação e qualificação de leads para o sistema AutB",
      order: 1
    },
    {
      id: "stage-qualification-autb",
      pipelineId: "pipeline-prospection-autb",
      title: "Qualificação",
      description: "Qualificação de oportunidades e análise de necessidades",
      order: 2
    },
    {
      id: "stage-proposal-autb",
      pipelineId: "pipeline-prospection-autb",
      title: "Proposta",
      description: "Elaboração e apresentação de propostas comerciais AutB",
      order: 3
    },
    {
      id: "stage-closing-autb",
      pipelineId: "pipeline-prospection-autb",
      title: "Fechamento",
      description: "Negociação final e fechamento da venda AutB",
      order: 4
    },
    
    // Implementation pipeline stages
    {
      id: "stage-onboarding-autb",
      pipelineId: "pipeline-success-autb",
      title: "Onboarding",
      description: "Início do processo de implementação e configuração inicial",
      order: 1
    },
    {
      id: "stage-implementation-autb",
      pipelineId: "pipeline-success-autb",
      title: "Implementação",
      description: "Configuração do sistema e personalização para o cliente",
      order: 2
    },
    {
      id: "stage-training-autb",
      pipelineId: "pipeline-success-autb",
      title: "Treinamento",
      description: "Treinamento da equipe do cliente para uso do sistema AutB",
      order: 3
    },
    {
      id: "stage-success-autb",
      pipelineId: "pipeline-success-autb",
      title: "Sucesso do Cliente",
      description: "Acompanhamento pós-implementação e expansão do uso",
      order: 4
    }
  ];

  // Create agents (one for each stage)
  const agents: Agent[] = [
    {
      id: "agent-prospector-autb",
      stageId: "stage-prospection-autb",
      profile: {
        name: "Agente Prospector AutB",
        role: "Especialista em Prospecção",
        goal: "Identificar leads qualificados para o sistema AutB"
      },
      workEnvironment: {
        workflowTitle: "Vendas de Software AutB",
        stageTitle: "Prospecção"
      },
      businessRules: {
        rules: ["Contatar apenas empresas com mais de 20 funcionários", "Priorizar setores de tecnologia e manufatura"],
        restrictions: ["Não ofertar para concorrentes diretos"],
        conversationStyle: "consultivo"
      },
      expertise: {
        knowledge: ["Automação de processos", "Software AutB", "Mercado de tecnologia"],
        skills: ["Prospecção ativa", "Qualificação de leads", "Marcação de demonstrações"]
      },
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "agent-qualifier-autb",
      stageId: "stage-qualification-autb",
      profile: {
        name: "Agente Qualificador AutB",
        role: "Especialista em Qualificação",
        goal: "Qualificar leads e identificar necessidades específicas"
      },
      workEnvironment: {
        workflowTitle: "Vendas de Software AutB",
        stageTitle: "Qualificação"
      },
      businessRules: {
        rules: ["Analisar processos atuais do cliente", "Identificar pontos de dor"],
        conversationStyle: "consultivo"
      },
      expertise: {
        knowledge: ["Processos de negócio", "Software AutB", "Análise de requisitos"],
        skills: ["Entrevistas de diagnóstico", "Análise de processos", "Identificação de necessidades"]
      },
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "agent-proposal-autb",
      stageId: "stage-proposal-autb",
      profile: {
        name: "Agente de Propostas AutB",
        role: "Especialista em Propostas",
        goal: "Elaborar propostas comerciais personalizadas"
      },
      workEnvironment: {
        workflowTitle: "Vendas de Software AutB",
        stageTitle: "Proposta"
      },
      businessRules: {
        rules: ["Personalizar propostas por setor", "Destacar ROI esperado"],
        conversationStyle: "consultivo"
      },
      expertise: {
        knowledge: ["Precificação AutB", "Propostas comerciais", "ROI de automação"],
        skills: ["Elaboração de propostas", "Apresentações comerciais", "Cálculo de ROI"]
      },
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "agent-closer-autb",
      stageId: "stage-closing-autb",
      profile: {
        name: "Agente Fechador AutB",
        role: "Especialista em Fechamento",
        goal: "Finalizar negociações e converter vendas"
      },
      workEnvironment: {
        workflowTitle: "Vendas de Software AutB",
        stageTitle: "Fechamento"
      },
      businessRules: {
        rules: ["Negociar dentro dos limites de desconto", "Facilitar o processo de contratação"],
        conversationStyle: "assertivo"
      },
      expertise: {
        knowledge: ["Negociação", "Contratos", "Modelos de licenciamento AutB"],
        skills: ["Negociação", "Gestão de objeções", "Fechamento de vendas"]
      },
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    
    // Implementation agents
    {
      id: "agent-onboarding-autb",
      stageId: "stage-onboarding-autb",
      profile: {
        name: "Agente de Onboarding AutB",
        role: "Especialista em Onboarding",
        goal: "Iniciar o cliente no processo de implementação"
      },
      workEnvironment: {
        workflowTitle: "Implementação AutB",
        stageTitle: "Onboarding"
      },
      businessRules: {
        rules: ["Estabelecer cronograma de implementação", "Coletar requisitos detalhados"],
        conversationStyle: "técnico"
      },
      expertise: {
        knowledge: ["Implementação AutB", "Gestão de projetos", "Levantamento de requisitos"],
        skills: ["Planejamento", "Documentação", "Gestão de expectativas"]
      },
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "agent-implementer-autb",
      stageId: "stage-implementation-autb",
      profile: {
        name: "Agente Implementador AutB",
        role: "Especialista em Implementação",
        goal: "Configurar e personalizar o sistema para o cliente"
      },
      workEnvironment: {
        workflowTitle: "Implementação AutB",
        stageTitle: "Implementação"
      },
      businessRules: {
        rules: ["Seguir padrões de configuração", "Realizar testes antes de entregar"],
        conversationStyle: "técnico"
      },
      expertise: {
        knowledge: ["Configuração AutB", "Personalização", "Desenvolvimento de soluções"],
        skills: ["Configuração técnica", "Programação", "Testes de sistema"]
      },
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "agent-trainer-autb",
      stageId: "stage-training-autb",
      profile: {
        name: "Agente Treinador AutB",
        role: "Especialista em Treinamento",
        goal: "Capacitar a equipe do cliente no uso do sistema"
      },
      workEnvironment: {
        workflowTitle: "Implementação AutB",
        stageTitle: "Treinamento"
      },
      businessRules: {
        rules: ["Adaptar treinamento ao perfil dos usuários", "Fornecer material de apoio"],
        conversationStyle: "educativo"
      },
      expertise: {
        knowledge: ["Treinamento", "Funcionalidades AutB", "Andragogia"],
        skills: ["Ensino", "Comunicação", "Produção de material didático"]
      },
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "agent-success-autb",
      stageId: "stage-success-autb",
      profile: {
        name: "Agente de Sucesso AutB",
        role: "Especialista em Sucesso do Cliente",
        goal: "Garantir adoção e satisfação contínua"
      },
      workEnvironment: {
        workflowTitle: "Implementação AutB",
        stageTitle: "Sucesso do Cliente"
      },
      businessRules: {
        rules: ["Realizar check-ins periódicos", "Identificar oportunidades de expansão"],
        conversationStyle: "consultivo"
      },
      expertise: {
        knowledge: ["Sucesso do cliente", "Melhores práticas AutB", "Upsell e cross-sell"],
        skills: ["Relacionamento com clientes", "Análise de uso", "Estratégias de expansão"]
      },
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  // Create assets (one for each stage)
  const assets: Asset[] = [
    {
      id: "asset-prospection-guide-autb",
      dealId: "stage-prospection-autb",
      title: "Guia de Prospecção AutB",
      description: "Material para identificar leads ideais para o sistema AutB",
      type: "Documento",
      status: "open",
      parameters: {
        format: "PDF",
        pages: 15,
        sections: ["Perfil ideal de cliente", "Scripts de abordagem", "Qualificação inicial"]
      },
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "asset-qualification-questions-autb",
      dealId: "stage-qualification-autb",
      title: "Questionário de Qualificação AutB",
      description: "Perguntas estruturadas para qualificação de prospects",
      type: "Documento",
      status: "open",
      parameters: {
        format: "Interativo",
        questions: 25,
        categories: ["Processos atuais", "Dores", "Orçamento", "Tomada de decisão"]
      },
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "asset-proposal-template-autb",
      dealId: "stage-proposal-autb",
      title: "Template de Proposta AutB",
      description: "Modelo de proposta comercial para o sistema AutB",
      type: "Documento",
      status: "open",
      parameters: {
        format: "DOCX",
        pages: 20,
        sections: ["Sumário executivo", "Solução proposta", "Investimento", "ROI projetado", "Cronograma"]
      },
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "asset-contract-template-autb",
      dealId: "stage-closing-autb",
      title: "Modelo de Contrato AutB",
      description: "Template de contrato para aquisição do sistema AutB",
      type: "Documento legal",
      status: "open",
      parameters: {
        format: "PDF",
        pages: 30,
        sections: ["Termos de serviço", "SLA", "Licenciamento", "Suporte"]
      },
      createdAt: new Date(),
      updatedAt: new Date()
    },
    
    // Implementation assets
    {
      id: "asset-onboarding-checklist-autb",
      dealId: "stage-onboarding-autb",
      title: "Checklist de Onboarding AutB",
      description: "Lista de verificação para início do processo de implementação",
      type: "Documento",
      status: "open",
      parameters: {
        format: "Interativo",
        items: 50,
        categories: ["Informações do cliente", "Requisitos técnicos", "Configurações iniciais"]
      },
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "asset-implementation-guide-autb",
      dealId: "stage-implementation-autb",
      title: "Guia de Implementação AutB",
      description: "Manual técnico para implementação do sistema AutB",
      type: "Documento técnico",
      status: "open",
      parameters: {
        format: "PDF",
        pages: 100,
        sections: ["Arquitetura", "Configuração", "Personalização", "Integrações"]
      },
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "asset-training-materials-autb",
      dealId: "stage-training-autb",
      title: "Material de Treinamento AutB",
      description: "Conjunto de materiais para capacitação dos usuários",
      type: "Kit de treinamento",
      status: "open",
      parameters: {
        format: "Múltiplo",
        components: ["Apresentações", "Vídeos", "Exercícios práticos", "Manual do usuário"]
      },
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "asset-success-plan-autb",
      dealId: "stage-success-autb",
      title: "Plano de Sucesso do Cliente AutB",
      description: "Estratégia para garantir adoção e satisfação contínua",
      type: "Documento estratégico",
      status: "open",
      parameters: {
        format: "PDF",
        pages: 25,
        sections: ["Métricas de sucesso", "Plano de adoção", "Estratégia de expansão", "Suporte continuado"]
      },
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  return {
    workflows,
    departments,
    pipelines,
    stages,
    agents,
    assets
  };
};
