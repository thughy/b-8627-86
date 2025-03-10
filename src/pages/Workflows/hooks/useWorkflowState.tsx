
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
import { DealFilters } from '../components/AdvancedFiltersModal';

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
    isAssetModalOpen,
    setIsAssetModalOpen,
    selectedAsset,
    setSelectedAsset,
    handleDealClick, 
    handleAssetClick,
    handleCreateAsset, 
    handleCreateTask,
    handleCreateNote,
    handleCreateDocument,
    handleCreateEmail,
    handleEditDeal, 
    handleDeleteDeal: deleteAction, 
    handleCancelDeal: cancelAction,
    handleWinDeal: winAction,
    handleLoseDeal: loseAction, 
    handleCreateDeal,
    handleCloseDealModal,
    handleCloseAssetModal,
    handleEditAsset,
    handleDeleteAsset,
    handleCompleteAsset,
    handleCancelAsset,
    handleCreateNoteForAsset,
    handleCreateDocumentForAsset,
    getChatPreview
  } = useDealActions();
  
  const { handleDragEnd } = useDragAndDrop(stages, deals, setDeals);
  
  const { 
    searchTerm, 
    setSearchTerm, 
    filteredDeals, 
    advancedFilters, 
    setAdvancedFilters 
  } = useSearch(deals);
  
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

  // Handle the actual win by updating the deal status
  const handleWinDeal = (dealId: string) => {
    const result = winAction(dealId);
    setDeals(deals.map(deal => 
      deal.id === result.dealId 
        ? { ...deal, status: result.status as Deal['status'] } 
        : deal
    ));
  };

  // Handle the actual loss by updating the deal status
  const handleLoseDeal = (dealId: string, reason?: string) => {
    const result = loseAction(dealId, reason);
    setDeals(deals.map(deal => 
      deal.id === result.dealId 
        ? { ...deal, status: result.status as Deal['status'], reasonForLoss: result.reasonForLoss } 
        : deal
    ));
  };

  // Handle applying advanced filters
  const handleApplyAdvancedFilters = (filters: DealFilters) => {
    setAdvancedFilters(filters);
  };

  return {
    workflows,
    pipelines,
    stages,
    deals,
    filteredDeals,
    searchTerm,
    setSearchTerm,
    advancedFilters,
    handleApplyAdvancedFilters,
    selectedDeal,
    setSelectedDeal,
    isDealModalOpen,
    setIsDealModalOpen,
    isAssetModalOpen,
    setIsAssetModalOpen,
    selectedAsset,
    setSelectedAsset,
    viewMode,
    setViewMode,
    selectedWorkflow,
    setSelectedWorkflow,
    selectedPipeline,
    setSelectedPipeline,
    handleDealClick,
    handleAssetClick,
    handleCreateAsset,
    handleCreateTask,
    handleCreateNote,
    handleCreateDocument,
    handleCreateEmail,
    handleEditDeal,
    handleDeleteDeal,
    handleCancelDeal,
    handleWinDeal,
    handleLoseDeal,
    handleDragEnd,
    handleCreateDeal,
    handleCloseDealModal,
    handleCloseAssetModal,
    handleEditAsset,
    handleDeleteAsset,
    handleCompleteAsset,
    handleCancelAsset,
    handleCreateNoteForAsset,
    handleCreateDocumentForAsset,
    getChatPreview
  };
};
