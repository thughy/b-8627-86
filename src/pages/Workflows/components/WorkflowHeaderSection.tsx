
import React from 'react';
import WorkflowHeader from './WorkflowHeader';
import WorkflowFilters from './WorkflowFilters';
import { Deal, Pipeline, Workflow } from '../models/WorkflowModels';

interface WorkflowHeaderSectionProps {
  filteredDeals: Deal[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedWorkflow: string;
  setSelectedWorkflow: (id: string) => void;
  selectedPipeline: string;
  setSelectedPipeline: (id: string) => void;
  viewMode: 'kanban' | 'list';
  setViewMode: (mode: 'kanban' | 'list') => void;
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
  viewMode,
  setViewMode,
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
        viewMode={viewMode}
        onViewModeChange={(value) => {
          if (value === 'kanban' || value === 'list') {
            setViewMode(value);
          }
        }}
        workflows={workflows}
        pipelines={pipelines}
      />
    </>
  );
};

export default WorkflowHeaderSection;
