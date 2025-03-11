
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorkflowKanbanView from './WorkflowKanbanView';
import WorkflowTaskView from './WorkflowTaskView';
import { ContentViewMode, DisplayViewMode } from '../hooks/useWorkflowViews';
import { Deal, Pipeline, Stage } from '../models/WorkflowModels';

interface WorkflowViewSelectorProps {
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

const WorkflowViewSelector: React.FC<WorkflowViewSelectorProps> = ({
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
    <Tabs 
      value={contentMode} 
      onValueChange={(value: string) => {
        if (value === 'deals' || value === 'tasks') {
          onContentModeChange(value as ContentViewMode);
        }
      }} 
      className="mt-4"
    >
      <TabsList className="mb-4">
        <TabsTrigger value="deals">Negócios</TabsTrigger>
        <TabsTrigger value="tasks">Tarefas</TabsTrigger>
      </TabsList>
      
      <TabsContent value="deals" className="mt-0">
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
      </TabsContent>
      
      <TabsContent value="tasks" className="mt-0">
        <WorkflowTaskView workflowId={selectedPipeline} />
      </TabsContent>
    </Tabs>
  );
};

export default WorkflowViewSelector;
