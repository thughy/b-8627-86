
import { useState } from 'react';
import { 
  Workflow, 
  Pipeline, 
  Stage, 
  Deal, 
  Asset 
} from '@/pages/Workflows/models/WorkflowModels';
import { mockWorkflows, mockPipelines, mockStages, mockDeals } from '@/pages/Workflows/data/mockData';
import { useToast } from "@/hooks/use-toast";
import { DropResult } from 'react-beautiful-dnd';

export const useWorkflowState = () => {
  const { toast } = useToast();
  const [workflows, setWorkflows] = useState<Workflow[]>(mockWorkflows);
  const [pipelines, setPipelines] = useState<Pipeline[]>(mockPipelines);
  const [stages, setStages] = useState<Stage[]>(mockStages);
  const [deals, setDeals] = useState<Deal[]>(mockDeals);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [isDealModalOpen, setIsDealModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [selectedWorkflow, setSelectedWorkflow] = useState<string>(workflows[0]?.id || '');
  const [selectedPipeline, setSelectedPipeline] = useState<string>(pipelines[0]?.id || '');

  const filteredDeals = deals.filter(deal =>
    deal.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDealClick = (deal: Deal) => {
    setSelectedDeal(deal);
    setIsDealModalOpen(true);
  };

  const handleCreateAsset = (dealId: string, asset: Partial<Asset>) => {
    console.log(`Creating asset for deal ${dealId}:`, asset);
    toast({
      title: "Asset adicionado",
      description: `O asset foi adicionado ao negócio com sucesso.`,
    });
  };

  const handleEditDeal = (deal: Deal) => {
    console.log('Editing deal:', deal);
    toast({
      title: "Editar negócio",
      description: "Funcionalidade em desenvolvimento.",
    });
  };

  const handleDeleteDeal = (dealId: string) => {
    console.log('Deleting deal:', dealId);
    // Aqui você poderia implementar a lógica para excluir o negócio
    setDeals(deals.filter(deal => deal.id !== dealId));
    setIsDealModalOpen(false);
    
    toast({
      title: "Negócio excluído",
      description: "O negócio foi excluído com sucesso.",
    });
  };

  const handleCancelDeal = (dealId: string) => {
    console.log('Canceling deal:', dealId);
    // Alterar o status do deal para cancelled ou similar
    setDeals(deals.map(deal => 
      deal.id === dealId 
        ? { ...deal, status: 'lost', reasonForLoss: 'Cancelado pelo usuário' } 
        : deal
    ));
    
    toast({
      title: "Negócio cancelado",
      description: "O negócio foi cancelado com sucesso.",
    });
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    
    // Dropped outside a valid droppable area
    if (!destination) return;
    
    // Dropped in the same position
    if (source.droppableId === destination.droppableId && 
        source.index === destination.index) return;
    
    // If dropped in a different stage, update the deal's stageId
    if (source.droppableId !== destination.droppableId) {
      // Update the deal's stageId
      setDeals(prevDeals => 
        prevDeals.map(deal => 
          deal.id === draggableId 
            ? { ...deal, stageId: destination.droppableId } 
            : deal
        )
      );
      
      // Find stage name for toast message
      const targetStage = stages.find(stage => stage.id === destination.droppableId);
      const stageName = targetStage ? targetStage.title : 'novo estágio';
      
      toast({
        title: "Negócio movido",
        description: `O negócio foi movido para ${stageName} com sucesso.`,
      });
    } else {
      // Reordering within the same stage (future enhancement)
      // This would require adding an 'order' property to deals
      // and implementing logic to reorder within a stage
    }
  };

  const handleCreateDeal = () => {
    toast({
      title: "Criar novo negócio",
      description: "Funcionalidade em desenvolvimento.",
    });
  };

  return {
    workflows,
    pipelines,
    stages,
    deals,
    filteredDeals,
    searchTerm,
    setSearchTerm,
    selectedDeal,
    setSelectedDeal,
    isDealModalOpen,
    setIsDealModalOpen,
    viewMode,
    setViewMode,
    selectedWorkflow,
    setSelectedWorkflow,
    selectedPipeline,
    setSelectedPipeline,
    handleDealClick,
    handleCreateAsset,
    handleEditDeal,
    handleDeleteDeal,
    handleCancelDeal,
    handleDragEnd,
    handleCreateDeal
  };
};
