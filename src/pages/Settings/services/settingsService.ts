
import { Template, Integration, Collaborator, Agent, Asset } from "@/pages/Workflows/models/WorkflowModels";

// Função para obter templates da biblioteca
export const getTemplates = (): Template[] => {
  return [
    {
      id: "template-1",
      type: "workflow",
      name: "Workflow de Vendas B2B",
      version: "1.0",
      data: {
        workflowTitle: "Processo de Vendas B2B",
        departmentTitle: "Comercial",
        pipelineTitle: "Pipeline de Vendas",
        stages: ["Prospecção", "Qualificação", "Proposta", "Negociação", "Fechamento"]
      },
      createdAt: new Date('2023-10-15'),
      updatedAt: new Date('2023-12-22')
    },
    {
      id: "template-2",
      type: "agent",
      name: "Agente de Qualificação de Leads",
      version: "1.2",
      data: {
        agentName: "LeadQualifier",
        agentRole: "Qualificador de Leads",
        agentGoal: "Qualificar leads conforme critérios BANT"
      },
      createdAt: new Date('2023-11-10'),
      updatedAt: new Date('2024-01-05')
    },
    {
      id: "template-3",
      type: "department",
      name: "Departamento de Marketing",
      version: "1.0",
      data: {
        departmentTitle: "Marketing",
        description: "Gestão de campanhas e leads"
      },
      createdAt: new Date('2023-09-28'),
      updatedAt: new Date('2023-09-28')
    },
    {
      id: "template-4",
      type: "pipeline",
      name: "Pipeline de Atendimento",
      version: "1.1",
      data: {
        pipelineTitle: "Fluxo de Atendimento ao Cliente",
        stages: ["Abertura", "Análise", "Resolução", "Feedback"]
      },
      createdAt: new Date('2023-08-12'),
      updatedAt: new Date('2023-11-18')
    },
    {
      id: "template-5",
      type: "stage",
      name: "Estágio de Demonstração",
      version: "1.0",
      data: {
        stageTitle: "Demonstração do Produto",
        description: "Etapa para demonstração do produto ao cliente"
      },
      createdAt: new Date('2023-12-03'),
      updatedAt: new Date('2023-12-03')
    },
    {
      id: "template-6",
      type: "asset",
      name: "Lead Qualificado",
      version: "1.0",
      data: {
        assetTitle: "Lead Qualificado",
        description: "Template para leads qualificados",
        parameters: ["Nome", "Empresa", "Cargo", "Telefone", "Email", "Origem", "Interesse"]
      },
      createdAt: new Date('2023-11-25'),
      updatedAt: new Date('2024-01-10')
    }
  ];
};

// Função para obter integrações
export const getIntegrations = (): Integration[] => {
  return [
    {
      id: "integration-1",
      name: "WhatsApp Business API",
      type: "message",
      provider: "Meta",
      credentials: {
        apiKey: "********",
        phoneNumberId: "123456789"
      },
      isActive: true,
      createdAt: new Date('2023-09-10'),
      updatedAt: new Date('2023-12-05')
    },
    {
      id: "integration-2",
      name: "Stripe Pagamentos",
      type: "payment",
      provider: "Stripe",
      credentials: {
        secretKey: "********",
        publicKey: "pk_test_******"
      },
      isActive: true,
      createdAt: new Date('2023-10-15'),
      updatedAt: new Date('2023-10-15')
    },
    {
      id: "integration-3",
      name: "OpenAI GPT-4",
      type: "llm",
      provider: "OpenAI",
      credentials: {
        apiKey: "********"
      },
      isActive: true,
      createdAt: new Date('2023-11-22'),
      updatedAt: new Date('2024-01-10')
    },
    {
      id: "integration-4",
      name: "Gmail",
      type: "email",
      provider: "Google",
      credentials: {
        clientId: "********",
        clientSecret: "********",
        refreshToken: "********"
      },
      isActive: false,
      createdAt: new Date('2023-08-17'),
      updatedAt: new Date('2023-08-17')
    },
    {
      id: "integration-5",
      name: "Twilio SMS",
      type: "call",
      provider: "Twilio",
      credentials: {
        accountSid: "********",
        authToken: "********",
        phoneNumber: "+1234567890"
      },
      isActive: true,
      createdAt: new Date('2023-12-01'),
      updatedAt: new Date('2023-12-01')
    }
  ];
};

// Função para obter colaboradores
export const getCollaborators = (): Collaborator[] => {
  return [
    {
      id: "collab-1",
      name: "João Silva",
      role: "Gerente de Vendas",
      email: "joao.silva@exemplo.com",
      phone: "+55 11 99999-8888",
      hierarchyLevel: "Gerência",
      type: "master",
      status: "active",
      createdAt: new Date('2023-08-10'),
      updatedAt: new Date('2023-08-10')
    },
    {
      id: "collab-2",
      name: "Maria Santos",
      role: "Analista de Marketing",
      email: "maria.santos@exemplo.com",
      phone: "+55 11 99999-7777",
      hierarchyLevel: "Operacional",
      type: "collaborator",
      status: "active",
      createdAt: new Date('2023-09-15'),
      updatedAt: new Date('2023-09-15')
    },
    {
      id: "collab-3",
      name: "Carlos Oliveira",
      role: "Desenvolvedor",
      email: "carlos.oliveira@exemplo.com",
      phone: "+55 11 99999-6666",
      hierarchyLevel: "Técnico",
      type: "developer",
      status: "active",
      createdAt: new Date('2023-10-20'),
      updatedAt: new Date('2023-10-20')
    },
    {
      id: "collab-4",
      name: "Ana Pereira",
      role: "CEO",
      email: "ana.pereira@exemplo.com",
      phone: "+55 11 99999-5555",
      hierarchyLevel: "Direção",
      type: "subscriber",
      status: "active",
      createdAt: new Date('2023-07-05'),
      updatedAt: new Date('2023-07-05')
    },
    {
      id: "collab-5",
      name: "Roberto Almeida",
      role: "Atendente",
      email: "roberto.almeida@exemplo.com",
      phone: "+55 11 99999-4444",
      hierarchyLevel: "Operacional",
      type: "collaborator",
      status: "inactive",
      createdAt: new Date('2023-11-12'),
      updatedAt: new Date('2023-12-05')
    }
  ];
};

// Função para obter agentes
export const getAgents = (): Agent[] => {
  return [
    {
      id: "agent-1",
      stageId: "stage-1",
      profile: {
        name: "Lead Qualifier",
        role: "Agente de Qualificação",
        goal: "Qualificar leads com base em critérios BANT"
      },
      workEnvironment: {
        workflowTitle: "Processo de Vendas",
        departmentTitle: "Comercial",
        stageTitle: "Qualificação"
      },
      businessRules: {
        rules: ["Verificar orçamento mínimo de R$ 10.000", "Confirmar poder de decisão", "Identificar prazo de compra"],
        restrictions: ["Não negociar valores", "Não fazer promessas"],
        conversationStyle: "Profissional"
      },
      expertise: {
        knowledge: ["Produtos", "Soluções", "Mercado"],
        skills: ["Análise BANT", "Comunicação", "Persuasão"],
        examples: ["Como identificar decisores", "Como qualificar orçamento"],
        tasks: ["Agendar reunião com qualificados", "Registrar informações no CRM"]
      },
      ragDocuments: ["produtos.pdf", "precos.pdf"],
      tools: ["Chat", "Email"],
      llmModel: "gpt-4",
      status: "active",
      createdAt: new Date('2023-10-15'),
      updatedAt: new Date('2024-01-05')
    },
    {
      id: "agent-2",
      stageId: "stage-2",
      profile: {
        name: "Proposal Creator",
        role: "Agente de Propostas",
        goal: "Criar propostas personalizadas"
      },
      workEnvironment: {
        workflowTitle: "Processo de Vendas",
        departmentTitle: "Comercial",
        stageTitle: "Proposta"
      },
      businessRules: {
        rules: ["Aplicar descontos conforme tabela", "Incluir termos de serviço", "Estabelecer prazo de validade"],
        restrictions: ["Limite de desconto de 15%", "Não alterar condições padrão"],
        conversationStyle: "Formal"
      },
      expertise: {
        knowledge: ["Produtos", "Preços", "Condições comerciais"],
        skills: ["Redação", "Cálculo de valores", "Customização"],
        examples: ["Propostas anteriores bem-sucedidas"],
        tasks: ["Enviar proposta", "Registrar data de envio", "Agendar follow-up"]
      },
      ragDocuments: ["modelo_proposta.pdf", "tabela_precos.pdf"],
      tools: ["Email", "PDF"],
      llmModel: "gpt-4",
      status: "active",
      createdAt: new Date('2023-11-10'),
      updatedAt: new Date('2023-12-20')
    }
  ];
};

// Função para obter assets
export const getAssets = (): Asset[] => {
  return [
    {
      id: "asset-1",
      dealId: "deal-1",
      title: "Proposta Comercial - Empresa ABC",
      description: "Proposta para implementação de sistema",
      type: "Proposta",
      amount: 25000,
      status: "open",
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-02-15'),
      files: ["proposta_abc.pdf", "anexo_tecnico.pdf"],
      parameters: {
        version: "1.2",
        discount: "10%",
        paymentTerms: "30/60/90 dias"
      },
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-10')
    },
    {
      id: "asset-2",
      dealId: "deal-2",
      title: "Contrato de Serviço - Empresa XYZ",
      description: "Contrato para prestação de serviços contínuos",
      type: "Contrato",
      amount: 5000,
      status: "processing",
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      files: ["contrato_xyz.pdf", "anexo_sla.pdf"],
      parameters: {
        renewalType: "Automática",
        servicePeriod: "12 meses",
        supportLevel: "Premium"
      },
      createdAt: new Date('2023-12-20'),
      updatedAt: new Date('2024-01-05')
    }
  ];
};
