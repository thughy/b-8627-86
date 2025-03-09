
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
