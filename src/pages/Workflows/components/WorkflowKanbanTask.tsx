
import React, { useState } from 'react';
import TaskKanbanBoard from '@/components/workflows/TaskKanbanBoard';
import { useTaskKanban } from '../hooks/useTaskKanban';
import TaskModal from './TaskModal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Plus, Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface WorkflowKanbanTaskProps {
  workflowId?: string;
}

const WorkflowKanbanTask: React.FC<WorkflowKanbanTaskProps> = ({ workflowId }) => {
  const {
    columns,
    searchTerm,
    setSearchTerm,
    selectedPriority,
    setSelectedPriority,
    isTaskModalOpen,
    selectedTask,
    isCreateMode,
    openCreateTaskModal,
    openEditTaskModal,
    closeTaskModal,
    handleDragEnd,
    createTask,
    updateTask,
    deleteTask
  } = useTaskKanban();

  // Manipulador para adicionar tarefa em uma coluna específica
  const handleAddTask = (columnId: string) => {
    // Mapear ID da coluna para status da tarefa
    const statusMap: Record<string, any> = {
      'todo': 'open',
      'inProgress': 'processing',
      'done': 'completed',
      'cancelled': 'cancelled'
    };
    
    // Abrir modal com status pré-selecionado
    openCreateTaskModal();
    // Não podemos alterar diretamente o formulário, então os valores padrão
    // serão tratados no componente do modal
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-2">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar tarefas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Select 
            value={selectedPriority || ""} 
            onValueChange={(value) => setSelectedPriority(value || null)}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filtrar por prioridade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todas prioridades</SelectItem>
              <SelectItem value="low">Baixa</SelectItem>
              <SelectItem value="medium">Média</SelectItem>
              <SelectItem value="high">Alta</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={openCreateTaskModal} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Nova Tarefa
          </Button>
        </div>
      </div>
      
      <TaskKanbanBoard
        columns={columns}
        onDragEnd={handleDragEnd}
        onTaskClick={openEditTaskModal}
        onAddTask={handleAddTask}
      />
      
      <TaskModal 
        isOpen={isTaskModalOpen}
        onClose={closeTaskModal}
        task={selectedTask}
        isCreateMode={isCreateMode}
        onSave={isCreateMode ? createTask : updateTask}
        onDelete={deleteTask}
      />
    </div>
  );
};

export default WorkflowKanbanTask;
