
import { Task } from '../models/TaskModel';
import { v4 as uuidv4 } from 'uuid';

export const mockTasks: Task[] = [
  {
    id: uuidv4(),
    title: 'Revisar proposta comercial',
    description: 'Revisar os termos e condições da proposta antes de enviar para o cliente',
    status: 'open',
    priority: 'high',
    dealId: 'deal-1',
    assignedTo: 'user-1',
    dueDate: new Date(2023, 5, 15),
    createdAt: new Date(2023, 5, 10),
    updatedAt: new Date(2023, 5, 10)
  },
  {
    id: uuidv4(),
    title: 'Agendar reunião de alinhamento',
    description: 'Marcar reunião inicial com o cliente para alinhar expectativas',
    status: 'processing',
    priority: 'medium',
    dealId: 'deal-2',
    assignedTo: 'user-2',
    dueDate: new Date(2023, 5, 18),
    createdAt: new Date(2023, 5, 12),
    updatedAt: new Date(2023, 5, 12)
  },
  {
    id: uuidv4(),
    title: 'Preparar apresentação',
    description: 'Criar slides para a reunião com o diretor financeiro',
    status: 'completed',
    priority: 'medium',
    dealId: 'deal-1',
    assignedTo: 'user-1',
    dueDate: new Date(2023, 5, 20),
    createdAt: new Date(2023, 5, 15),
    updatedAt: new Date(2023, 5, 19)
  },
  {
    id: uuidv4(),
    title: 'Enviar contrato para assinatura',
    description: 'Enviar o contrato final após aprovação jurídica',
    status: 'open',
    priority: 'high',
    dealId: 'deal-3',
    assignedTo: 'user-3',
    dueDate: new Date(2023, 5, 25),
    createdAt: new Date(2023, 5, 20),
    updatedAt: new Date(2023, 5, 20)
  },
  {
    id: uuidv4(),
    title: 'Fazer follow-up com cliente',
    description: 'Verificar se o cliente tem dúvidas sobre a proposta',
    status: 'cancelled',
    priority: 'low',
    dealId: 'deal-4',
    assignedTo: 'user-2',
    dueDate: new Date(2023, 5, 22),
    createdAt: new Date(2023, 5, 16),
    updatedAt: new Date(2023, 5, 21)
  }
];
