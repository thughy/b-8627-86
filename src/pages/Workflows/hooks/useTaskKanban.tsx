
import { useState, useCallback } from 'react';
import { Task, organizeTasksByColumn, TaskColumn } from '../models/TaskModel';
import { mockTasks } from '../data/mockTaskData';
import { useToast } from '@/hooks/use-toast';
import { DropResult } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

export const useTaskKanban = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [columns, setColumns] = useState<TaskColumn[]>(organizeTasksByColumn(mockTasks));
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isCreateMode, setIsCreateMode] = useState(false);
  
  const { toast } = useToast();

  // Filtrar tarefas com base no termo de busca e prioridade selecionada
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = searchTerm 
      ? task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (task.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
      : true;
      
    const matchesPriority = selectedPriority 
      ? task.priority === selectedPriority
      : true;
      
    return matchesSearch && matchesPriority;
  });

  // Reorganiza as colunas quando as tarefas mudam
  const refreshColumns = useCallback(() => {
    setColumns(organizeTasksByColumn(filteredTasks));
  }, [filteredTasks]);

  // Lidar com o arrastar e soltar das tarefas
  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // Se não houver destino ou se a tarefa for solta na mesma posição
    if (!destination || 
        (destination.droppableId === source.droppableId && 
         destination.index === source.index)) {
      return;
    }

    // Encontrar a tarefa que foi arrastada
    const task = tasks.find(t => t.id === draggableId);
    if (!task) return;

    // Mapear o ID da coluna de destino para o status da tarefa
    const newStatus = Object.entries(organizeTasksByColumn([]).reduce((acc, column) => {
      return { ...acc, [column.id]: column.id };
    }, {})).find(([_, colId]) => colId === destination.droppableId)?.[0] as Task['status'] || 'open';

    // Atualizar o status da tarefa
    const updatedTask = { ...task, status: newStatus, updatedAt: new Date() };
    
    // Atualizar o estado das tarefas
    const updatedTasks = tasks.map(t => 
      t.id === updatedTask.id ? updatedTask : t
    );
    
    setTasks(updatedTasks);
    
    // Atualizar também as colunas para refletir a mudança imediatamente
    const newColumns = [...columns];
    
    // Remover a tarefa da coluna de origem
    const sourceColumn = newColumns.find(col => col.id === source.droppableId);
    if (sourceColumn) {
      sourceColumn.tasks.splice(source.index, 1);
    }
    
    // Adicionar a tarefa à coluna de destino
    const destinationColumn = newColumns.find(col => col.id === destination.droppableId);
    if (destinationColumn) {
      destinationColumn.tasks.splice(destination.index, 0, updatedTask);
    }
    
    setColumns(newColumns);
    
    toast({
      title: "Tarefa movida",
      description: `${updatedTask.title} foi movida para ${destinationColumn?.title || 'nova coluna'}`
    });
  };

  // Abrir o modal de criação de tarefa
  const openCreateTaskModal = () => {
    setSelectedTask(null);
    setIsCreateMode(true);
    setIsTaskModalOpen(true);
  };

  // Abrir o modal de edição de tarefa
  const openEditTaskModal = (task: Task) => {
    setSelectedTask(task);
    setIsCreateMode(false);
    setIsTaskModalOpen(true);
  };

  // Fechar o modal de tarefa
  const closeTaskModal = () => {
    setIsTaskModalOpen(false);
    setTimeout(() => {
      setSelectedTask(null);
      setIsCreateMode(false);
    }, 300);
  };

  // Criar uma nova tarefa
  const createTask = (taskData: Partial<Task>) => {
    const newTask: Task = {
      id: uuidv4(),
      title: taskData.title || 'Nova tarefa',
      description: taskData.description,
      status: taskData.status || 'open',
      priority: taskData.priority || 'medium',
      dealId: taskData.dealId,
      assignedTo: taskData.assignedTo,
      dueDate: taskData.dueDate,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setTasks([...tasks, newTask]);
    
    toast({
      title: "Tarefa criada",
      description: `${newTask.title} foi criada com sucesso`
    });
    
    closeTaskModal();
    refreshColumns();
  };

  // Atualizar uma tarefa existente
  const updateTask = (taskData: Partial<Task>) => {
    if (!selectedTask) return;
    
    const updatedTask: Task = {
      ...selectedTask,
      ...taskData,
      updatedAt: new Date()
    };
    
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
    
    toast({
      title: "Tarefa atualizada",
      description: `${updatedTask.title} foi atualizada com sucesso`
    });
    
    closeTaskModal();
    refreshColumns();
  };

  // Excluir uma tarefa
  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    
    toast({
      title: "Tarefa excluída",
      description: "A tarefa foi excluída com sucesso"
    });
    
    closeTaskModal();
    refreshColumns();
  };

  return {
    tasks,
    filteredTasks,
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
    deleteTask,
    refreshColumns
  };
};
