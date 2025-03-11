
import React from 'react';
import WorkflowViewSelector from './WorkflowViewSelector';
import { ContentViewMode, DisplayViewMode } from '../hooks/useWorkflowViews';
import { Deal, Pipeline, Stage } from '../models/WorkflowModels';

interface WorkflowViewContentProps {
  contentMode: ContentViewMode;
  displayMode: DisplayViewMode;
  onContentModeChange: (value: ContentViewMode) => void;
  onDisplayModeChange: (value: DisplayViewMode) => void;
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
  contentMode,
  displayMode,
  onContentModeChange,
  onDisplayModeChange,
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
      contentMode={contentMode}
      displayMode={displayMode}
      onContentModeChange={onContentModeChange}
      onDisplayModeChange={onDisplayModeChange}
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
