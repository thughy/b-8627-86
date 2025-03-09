
// Define types for workflows
export interface Workflow {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'inactive' | 'draft';
  departmentId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define types for departments
export interface Department {
  id: string;
  title: string;
  description: string;
  color?: string; // Adding color property
}

// Define types for pipelines
export interface Pipeline {
  id: string;
  departmentId: string;
  title: string;
  description: string;
  stages: Stage[];
}

// Define types for stages
export interface Stage {
  id: string;
  pipelineId: string;
  title: string;
  description?: string; // Adding description property
  order: number;
}

// Define types for deals
export interface Deal {
  id: string;
  title: string;
  description?: string;
  stageId: string;
  status: 'open' | 'won' | 'lost' | 'completed';
  type?: string; // Adding type property
  amount?: number;
  startDate?: Date;
  endDate?: Date;
  customerName?: string;
  customerOrganization?: string;
  createdAt: Date;
}

// Define types for assets
export interface Asset {
  id: string;
  dealId: string;
  title: string;
  description?: string;
  type: string;
  amount?: number;
  status: 'open' | 'processing' | 'completed' | 'cancelled'; // Fixed spelling ('cancelled' instead of 'canceled')
  startDate?: Date;
  endDate?: Date;
  workEnvironment?: {
    workflowTitle?: string;
    departmentTitle?: string;
    stageTitle?: string;
  };
  files?: string[];
  parameters?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

// Define types for templates
export interface Template {
  id: string;
  type: 'workflow' | 'department' | 'pipeline' | 'stage' | 'agent' | 'asset';
  name: string;
  version: string;
  data: Record<string, any>;
  updatedAt: Date;
}

// Define types for agents
export interface Agent {
  id: string;
  stageId: string;
  profile: {
    agentName: string;
    agentRole: string;
    agentGoal: string;
  };
  workEnvironment: {
    workflowTitle?: string;
    workflowDescription?: string;
    departmentTitle?: string;
    departmentDescription?: string;
    stageTitle?: string;
    stageDescription?: string;
  };
  businessRules: {
    rules: string;
    restrictions: string;
    conversationStyle: 'formal' | 'informal' | 'funny' | 'friendly' | 'technical' | 'professional';
  };
  expertise: {
    knowledge: string;
    skills: string;
    examples: string;
    tasks: string;
  };
  rag?: string[];
  tools: {
    vision?: boolean;
    audio?: boolean;
    speech?: boolean;
    telephony?: boolean;
    meeting?: boolean;
    calendar?: boolean;
    email?: boolean;
    pdf?: boolean;
    chat?: boolean;
    webSearch?: boolean;
  };
  llmModel?: string; // Adding llmModel property
  status: 'active' | 'paused' | 'blocked';
  createdAt: Date;
  updatedAt: Date;
}

// Add missing interface for Collaborator
export interface Collaborator {
  id: string;
  name: string;
  email: string;
  role: string;
  type: string;
  status: string;
  phone?: string;
  hierarchyLevel?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Add missing interface for Integration
export interface Integration {
  id: string;
  name: string;
  type: string;
  provider: string;
  status: string;
  config: Record<string, any>;
  createdAt: Date;
  updatedAt?: Date;
}
