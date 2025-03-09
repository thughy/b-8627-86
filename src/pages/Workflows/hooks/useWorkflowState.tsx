
import { useState } from 'react';
import { 
  Workflow, 
  Pipeline, 
  Stage, 
  Deal
} from '@/pages/Workflows/models/WorkflowModels';
import { mockWorkflows, mockPipelines, mockStages, mockDeals } from '@/pages/Workflows/data/mockData';
import { useDealActions } from './useDealActions';
import { useDragAndDrop } from './useDragAndDrop';
import { useSearch } from './useSearch';
import { useWorkflowViews } from './useWorkflowViews';
import { useWorkflowSelection } from './useWorkflowSelection';

export const useWorkflowState = () => {
  const [workflows] = useState<Workflow[]>(mockWorkflows);
  const [pipelines] = useState<Pipeline[]>(mockPipelines);
  const [stages] = useState<Stage[]>(mockStages);
  const [deals, setDeals] = useState<Deal[]>(mockDeals);
  
  // Use our smaller, more focused hooks
  const { 
    selectedDeal, 
    setSelectedDeal,
    isDealModalOpen,
    setIsDealModalOpen,
    handleDealClick, 
    handleCreateAsset, 
    handleEditDeal, 
    handleDeleteDeal: deleteAction, 
    handleCancelDeal: cancelAction, 
    handleCreateDeal,
    handleCloseDealModal
  } = useDealActions();
  
  const { handleDragEnd } = useDragAndDrop(stages, deals, setDeals);
  
  const { searchTerm, setSearchTerm, filteredDeals } = useSearch(deals);
  
  const { viewMode, setViewMode } = useWorkflowViews();
  
  const { 
    selectedWorkflow, 
    setSelectedWorkflow, 
    selectedPipeline, 
    setSelectedPipeline 
  } = useWorkflowSelection(workflows, pipelines);

  // Handle the actual deletion by filtering the deals array
  const handleDeleteDeal = (dealId: string) => {
    const id = deleteAction(dealId);
    setDeals(deals.filter(deal => deal.id !== id));
  };

  // Handle the actual cancellation by updating the deal status
  const handleCancelDeal = (dealId: string) => {
    const result = cancelAction(dealId);
    setDeals(deals.map(deal => 
      deal.id === result.dealId 
        ? { ...deal, status: result.status as Deal['status'], reasonForLoss: result.reasonForLoss } 
        : deal
    ));
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
    handleCreateDeal,
    handleCloseDealModal
  };
};
