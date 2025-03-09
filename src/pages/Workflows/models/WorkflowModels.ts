
export interface Workflow {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'inactive' | 'draft';
  departmentId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Department {
  id: string;
  title: string;
  description: string;
  color?: string;
}

export interface Pipeline {
  id: string;
  departmentId: string;
  title: string;
  description: string;
  stages: Stage[];
}

export interface Stage {
  id: string;
  pipelineId: string;
  title: string;
  description?: string;
  order: number;
}

export interface Deal {
  id: string;
  title: string;
  description?: string;
  stageId: string;
  type?: string;
  amount?: number;
  status: 'open' | 'won' | 'lost' | 'canceled' | 'completed';
  startDate?: Date;
  endDate?: Date;
  customerName?: string;
  customerOrganization?: string;
  createdAt: Date;
}

export interface Asset {
  id: string;
  dealId: string;
  title: string;
  description?: string;
  type: string;
  amount?: number;
  status: 'open' | 'processing' | 'completed' | 'canceled';
  startDate?: Date;
  endDate?: Date;
  files?: string[];
  parameters?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface Agent {
  id: string;
  stageId: string;
  profile: {
    name: string;
    role: string;
    goal: string;
  };
  workEnvironment: {
    workflowTitle?: string;
    workflowDescription?: string;
    departmentTitle?: string;
    stageTitle?: string;
  };
  businessRules: {
    rules?: string[];
    restrictions?: string[];
    conversationStyle?: string;
  };
  expertise: {
    knowledge?: string[];
    skills?: string[];
    examples?: string[];
    tasks?: string[];
  };
  ragDocuments?: string[];
  tools?: string[];
  llmModel?: string;
  status: 'active' | 'paused' | 'blocked';
  createdAt: Date;
  updatedAt: Date;
}

export interface Template {
  id: string;
  type: 'workflow' | 'department' | 'pipeline' | 'stage' | 'agent' | 'asset';
  name: string;
  version: string;
  data: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface Integration {
  id: string;
  name: string;
  type: 'message' | 'payment' | 'llm' | 'call' | 'email' | 'custom';
  provider: string;
  credentials: Record<string, any>;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Collaborator {
  id: string;
  name: string;
  role: string;
  email: string;
  phone?: string;
  hierarchyLevel?: string;
  type: 'subscriber' | 'collaborator' | 'developer' | 'master';
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}
