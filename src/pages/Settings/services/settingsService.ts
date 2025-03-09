
import { 
  Workflow, 
  Agent, 
  Asset, 
  Template, 
  Integration, 
  Collaborator 
} from "@/pages/Workflows/models/WorkflowModels";

// Mock data for workflow settings
export const getWorkflows = (): Workflow[] => {
  return [
    {
      id: "workflow-1",
      title: "Workflow de Vendas",
      description: "Processo de vendas completo da empresa",
      status: "active",
      departmentId: "dept-1",
      createdAt: new Date("2023-10-01"),
      updatedAt: new Date("2023-11-15")
    },
    {
      id: "workflow-2",
      title: "Workflow de Atendimento",
      description: "Processo de atendimento ao cliente",
      status: "active",
      departmentId: "dept-2",
      createdAt: new Date("2023-09-15"),
      updatedAt: new Date("2023-11-10")
    },
    {
      id: "workflow-3",
      title: "Workflow de Marketing",
      description: "Processo de campanhas de marketing",
      status: "draft",
      departmentId: "dept-3",
      createdAt: new Date("2023-11-01"),
      updatedAt: new Date("2023-11-05")
    }
  ];
};

// Mock data for agent settings
export const getAgents = (): Agent[] => {
  return [
    {
      id: "agent-1",
      stageId: "stage-1",
      profile: {
        name: "Assistente de Vendas",
        role: "Vendedor",
        goal: "Auxiliar no processo de vendas, qualificar leads e agendar demonstrações"
      },
      workEnvironment: {
        workflowTitle: "Workflow de Vendas",
        departmentTitle: "Comercial",
        stageTitle: "Prospecção"
      },
      businessRules: {
        rules: ["Não negociar preços", "Encaminhar casos complexos para gerente"],
        conversationStyle: "Profissional e amigável"
      },
      expertise: {
        knowledge: ["Produtos", "Preços", "Processos de vendas"],
        skills: ["Persuasão", "Negociação", "Comunicação clara"]
      },
      ragDocuments: ["catalogo_produtos.pdf", "manual_vendas.pdf"],
      tools: ["Chat", "Email", "Agenda"],
      llmModel: "GPT-4",
      status: "active",
      createdAt: new Date("2023-10-10"),
      updatedAt: new Date("2023-11-15")
    },
    {
      id: "agent-2",
      stageId: "stage-6",
      profile: {
        name: "Assistente de Suporte",
        role: "Atendente",
        goal: "Resolver problemas de clientes e encaminhar casos complexos"
      },
      workEnvironment: {
        workflowTitle: "Workflow de Atendimento",
        departmentTitle: "Suporte",
        stageTitle: "Aberto"
      },
      businessRules: {
        restrictions: ["Não conceder descontos", "Seguir protocolo de escalação"],
        conversationStyle: "Empático e resolutivo"
      },
      expertise: {
        knowledge: ["FAQ", "Problemas comuns", "Soluções técnicas"],
        tasks: ["Responder dúvidas", "Resolver problemas técnicos"]
      },
      tools: ["Chat", "Telefone", "Base de conhecimento"],
      llmModel: "Claude",
      status: "active",
      createdAt: new Date("2023-09-20"),
      updatedAt: new Date("2023-11-10")
    }
  ];
};

// Mock data for asset settings
export const getAssets = (): Asset[] => {
  return [
    {
      id: "asset-1",
      dealId: "deal-1",
      title: "Contrato Premium",
      description: "Modelo de contrato para plano premium",
      type: "Contrato",
      status: "completed",
      createdAt: new Date("2023-10-15"),
      updatedAt: new Date("2023-11-01")
    },
    {
      id: "asset-2",
      dealId: "deal-2",
      title: "Imóvel Comercial",
      description: "Dados do imóvel comercial para locação",
      type: "Imóvel",
      amount: 450000,
      status: "open",
      files: ["planta_baixa.pdf", "fotos_imovel.zip"],
      createdAt: new Date("2023-11-05"),
      updatedAt: new Date("2023-11-10")
    }
  ];
};

// Mock data for templates
export const getTemplates = (): Template[] => {
  return [
    {
      id: "template-1",
      type: "workflow",
      name: "Workflow de Vendas Imobiliárias",
      version: "1.2",
      data: {
        workflowTitle: "Vendas Imobiliárias",
        stages: ["Prospecção", "Visita", "Proposta", "Contrato", "Fechamento"]
      },
      createdAt: new Date("2023-08-15"),
      updatedAt: new Date("2023-10-20")
    },
    {
      id: "template-2",
      type: "agent",
      name: "Agente de Vendas Automotivas",
      version: "1.0",
      data: {
        profile: {
          name: "Vendedor Auto",
          role: "Especialista em Vendas de Veículos",
          goal: "Conduzir o processo de venda de veículos"
        },
        expertise: {
          knowledge: ["Modelos", "Especificações técnicas", "Financiamento"]
        }
      },
      createdAt: new Date("2023-09-10"),
      updatedAt: new Date("2023-10-25")
    }
  ];
};

// Mock data for integrations
export const getIntegrations = (): Integration[] => {
  return [
    {
      id: "integration-1",
      name: "WhatsApp Business",
      type: "message",
      provider: "Meta",
      credentials: { apiKey: "********", phoneNumber: "+5511999999999" },
      isActive: true,
      createdAt: new Date("2023-07-20"),
      updatedAt: new Date("2023-10-15")
    },
    {
      id: "integration-2",
      name: "Stripe",
      type: "payment",
      provider: "Stripe",
      credentials: { apiKey: "********", webhookSecret: "********" },
      isActive: true,
      createdAt: new Date("2023-08-05"),
      updatedAt: new Date("2023-09-30")
    },
    {
      id: "integration-3",
      name: "OpenAI",
      type: "llm",
      provider: "OpenAI",
      credentials: { apiKey: "********" },
      isActive: true,
      createdAt: new Date("2023-06-10"),
      updatedAt: new Date("2023-10-01")
    }
  ];
};

// Mock data for collaborators
export const getCollaborators = (): Collaborator[] => {
  return [
    {
      id: "collab-1",
      name: "Ana Silva",
      role: "Gerente de Vendas",
      email: "ana.silva@exemplo.com",
      phone: "+5511999888777",
      hierarchyLevel: "Gerência",
      type: "collaborator",
      status: "active",
      createdAt: new Date("2023-05-15"),
      updatedAt: new Date("2023-09-20")
    },
    {
      id: "collab-2",
      name: "Carlos Oliveira",
      role: "Desenvolvedor",
      email: "carlos.oliveira@exemplo.com",
      hierarchyLevel: "Técnico",
      type: "developer",
      status: "active",
      createdAt: new Date("2023-06-10"),
      updatedAt: new Date("2023-08-15")
    },
    {
      id: "collab-3",
      name: "Maria Santos",
      role: "Administradora",
      email: "maria.santos@exemplo.com",
      phone: "+5511999777666",
      hierarchyLevel: "Diretoria",
      type: "master",
      status: "active",
      createdAt: new Date("2023-04-20"),
      updatedAt: new Date("2023-10-05")
    }
  ];
};
