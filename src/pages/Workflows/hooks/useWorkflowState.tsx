
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

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const { source, destination, draggableId } = result;
    
    if (source.droppableId === destination.droppableId) return;
    
    // Update the deal's stageId
    setDeals(prevDeals => 
      prevDeals.map(deal => 
        deal.id === draggableId 
          ? { ...deal, stageId: destination.droppableId } 
          : deal
      )
    );
    
    toast({
      title: "Negócio movido",
      description: "O negócio foi movido para um novo estágio com sucesso.",
    });
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
    handleDragEnd,
    handleCreateDeal
  };
};
