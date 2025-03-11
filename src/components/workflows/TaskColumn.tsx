
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { TaskColumn as TaskColumnType, Task } from '@/pages/Workflows/models/TaskModel';
import TaskCard from './TaskCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface TaskColumnProps {
  column: TaskColumnType;
  onTaskClick: (task: Task) => void;
  onAddTask?: (columnId: string) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ 
  column, 
  onTaskClick,
  onAddTask
}) => {
  return (
    <div className="flex-1 min-w-[300px]">
      <div className="bg-muted/40 rounded-md p-3 h-full flex flex-col border border-border/40">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-sm">{column.title}</h3>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
            {column.tasks.length}
          </span>
        </div>
        
        <Droppable droppableId={column.id}>
          {(provided) => (
            <div 
              className="space-y-3 flex-1 min-h-[200px] rounded-md p-2"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {column.tasks.map((task, index) => (
                <TaskCard 
                  key={task.id}
                  task={task}
                  index={index}
                  onClick={onTaskClick}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full mt-3 justify-start text-muted-foreground hover:text-foreground"
          onClick={() => onAddTask && onAddTask(column.id)}
        >
          <Plus className="h-4 w-4 mr-1" />
          Adicionar Tarefa
        </Button>
      </div>
    </div>
  );
};

export default TaskColumn;
