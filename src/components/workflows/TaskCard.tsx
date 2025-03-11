
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Task } from '@/pages/Workflows/models/TaskModel';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface TaskCardProps {
  task: Task;
  index: number;
  onClick: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index, onClick }) => {
  // Determinar a cor baseada na prioridade
  const getPriorityColor = (priority: Task['priority']) => {
    switch(priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-blue-500';
    }
  };

  // Formatar data relativa
  const formatRelativeDate = (date?: Date) => {
    if (!date) return '';
    return formatDistanceToNow(date, { addSuffix: true, locale: ptBR });
  };

  // Determinar o ícone de status
  const getStatusIcon = (status: Task['status']) => {
    switch(status) {
      case 'completed': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'processing': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'cancelled': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Calendar className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="mb-3"
        >
          <Card 
            className={`border border-border/40 hover:border-primary/30 transition-all cursor-pointer ${
              snapshot.isDragging ? 'shadow-lg' : ''
            }`}
            onClick={() => onClick(task)}
          >
            <CardContent className="p-3">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-sm line-clamp-2">{task.title}</h3>
                <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`} />
              </div>
              
              {task.description && (
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                  {task.description}
                </p>
              )}
              
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center text-xs text-muted-foreground">
                  {getStatusIcon(task.status)}
                  <span className="ml-1">
                    {task.dueDate ? formatRelativeDate(task.dueDate) : 'Sem prazo'}
                  </span>
                </div>
                
                {task.assignedTo && (
                  <Badge variant="outline" className="text-xs">
                    {task.assignedTo.split('-')[1]}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
