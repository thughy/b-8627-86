
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorkflowKanbanView from './WorkflowKanbanView';
import DealListView from './DealListView';
import { Deal, Pipeline, Stage } from '../models/WorkflowModels';

interface WorkflowViewContentProps {
  viewMode: 'kanban' | 'list';
  onViewModeChange: (value: string) => void;
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
    <div className="mt-4">
      <WorkflowKanbanView 
        stages={stages} 
        deals={filteredDeals} 
        onDragEnd={handleDragEnd} 
        onDealClick={openDealModal}
        onCreateDeal={handleCreateDeal}
        selectedPipeline={selectedPipeline}
        pipelines={pipelines}
        onPipelineChange={setSelectedPipeline}
        getChatPreview={getChatPreview}
      />
    </div>
  );
};

export default WorkflowViewContent;
