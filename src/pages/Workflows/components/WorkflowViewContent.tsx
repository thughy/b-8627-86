
import React from 'react';
import WorkflowViewSelector from './WorkflowViewSelector';
import { Deal, Pipeline, Stage } from '../models/WorkflowModels';

interface WorkflowViewContentProps {
  viewMode: 'deals' | 'tasks' | 'kanban' | 'list';
  onViewModeChange: (value: 'deals' | 'tasks') => void;
  filteredDeals: Deal[];
  stages: Stage[];
  handleDragEnd: (result: any) => void;
  openDealModal: (deal: Deal) => void;
  handleCreateDeal: () => void;
  selectedPipeline: string;
  pipelines: Pipeline[];
  setSelectedPipeline: (id: string) => void;
  getChatPreview?: (dealId: string) => any[];
}

const WorkflowViewContent: React.FC<WorkflowViewContentProps> = ({
  viewMode,
  onViewModeChange,
  filteredDeals,
  stages,
  handleDragEnd,
  openDealModal,
  handleCreateDeal,
  selectedPipeline,
  pipelines,
  setSelectedPipeline,
  getChatPreview
}) => {
  return (
    <WorkflowViewSelector 
      viewMode={viewMode}
      onViewModeChange={onViewModeChange}
      filteredDeals={filteredDeals}
      stages={stages}
      handleDragEnd={handleDragEnd}
      openDealModal={openDealModal}
      handleCreateDeal={handleCreateDeal}
      selectedPipeline={selectedPipeline}
      pipelines={pipelines}
      setSelectedPipeline={setSelectedPipeline}
      getChatPreview={getChatPreview}
    />
  );
};

export default WorkflowViewContent;
