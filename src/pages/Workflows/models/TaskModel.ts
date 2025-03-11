
import { Deal } from './WorkflowModels';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'open' | 'processing' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  dealId?: string;
  assignedTo?: string;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Define um tipo para as colunas do kanban de tarefas
export interface TaskColumn {
  id: string;
  title: string;
  tasks: Task[];
}

// Mapeamento de status para colunas do kanban
export const taskStatusToColumn: Record<Task['status'], string> = {
  'open': 'todo',
  'processing': 'inProgress',
  'completed': 'done',
  'cancelled': 'cancelled'
};

// Colunas padrão para o kanban de tarefas
export const defaultTaskColumns: TaskColumn[] = [
  { id: 'todo', title: 'A Fazer', tasks: [] },
  { id: 'inProgress', title: 'Em Andamento', tasks: [] },
  { id: 'done', title: 'Concluído', tasks: [] },
  { id: 'cancelled', title: 'Cancelado', tasks: [] }
];

// Função auxiliar para organizar tarefas em colunas
export const organizeTasksByColumn = (tasks: Task[]): TaskColumn[] => {
  const columns = JSON.parse(JSON.stringify(defaultTaskColumns)) as TaskColumn[];
  
  tasks.forEach(task => {
    const columnId = taskStatusToColumn[task.status];
    const column = columns.find(col => col.id === columnId);
    if (column) {
      column.tasks.push(task);
    }
  });
  
  return columns;
};
