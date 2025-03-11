
import React from 'react';
import WorkflowHeader from './WorkflowHeader';
import WorkflowFilters from './WorkflowFilters';
import { ContentViewMode, DisplayViewMode } from '../hooks/useWorkflowViews';
import { Deal, Pipeline, Workflow } from '../models/WorkflowModels';

interface WorkflowHeaderSectionProps {
  filteredDeals: Deal[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedWorkflow: string;
  setSelectedWorkflow: (id: string) => void;
  selectedPipeline: string;
  setSelectedPipeline: (id: string) => void;
  contentMode: ContentViewMode;
  displayMode: DisplayViewMode;
  setContentMode: (mode: ContentViewMode) => void;
  setDisplayMode: (mode: DisplayViewMode) => void;
  workflows: Workflow[];
  pipelines: Pipeline[];
  onCreateDeal: () => void;
}

const WorkflowHeaderSection: React.FC<WorkflowHeaderSectionProps> = ({
  filteredDeals,
  searchTerm,
  setSearchTerm,
  selectedWorkflow,
  setSelectedWorkflow,
  selectedPipeline,
  setSelectedPipeline,
  contentMode,
  displayMode,
  setContentMode,
  setDisplayMode,
  workflows,
  pipelines,
  onCreateDeal
}) => {
  return (
    <>
      <WorkflowHeader onCreateDeal={onCreateDeal} />

      <WorkflowFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedWorkflow={selectedWorkflow}
        onWorkflowChange={setSelectedWorkflow}
        selectedPipeline={selectedPipeline}
        onPipelineChange={setSelectedPipeline}
        viewMode={displayMode}
        onViewModeChange={setDisplayMode}
        workflows={workflows}
        pipelines={pipelines}
      />
    </>
  );
};

export default WorkflowHeaderSection;
