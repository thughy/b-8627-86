
import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { TaskColumn as TaskColumnType, Task } from '@/pages/Workflows/models/TaskModel';
import TaskColumn from './TaskColumn';

interface TaskKanbanBoardProps {
  columns: TaskColumnType[];
  onDragEnd: (result: DropResult) => void;
  onTaskClick: (task: Task) => void;
  onAddTask?: (columnId: string) => void;
}

const TaskKanbanBoard: React.FC<TaskKanbanBoardProps> = ({
  columns,
  onDragEnd,
  onTaskClick,
  onAddTask
}) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="overflow-x-auto pb-4">
        <div 
          className="flex gap-4" 
          style={{ minWidth: Math.max(columns.length * 320, 100) + "px" }}
        >
          {columns.map(column => (
            <TaskColumn
              key={column.id}
              column={column}
              onTaskClick={onTaskClick}
              onAddTask={onAddTask}
            />
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default TaskKanbanBoard;
