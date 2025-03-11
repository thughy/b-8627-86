
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorkflowKanbanView from './WorkflowKanbanView';
import WorkflowTaskView from './WorkflowTaskView';
import { Deal, Pipeline, Stage } from '../models/WorkflowModels';

interface WorkflowViewSelectorProps {
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

const WorkflowViewSelector: React.FC<WorkflowViewSelectorProps> = ({
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
    <Tabs 
      value={viewMode} 
      onValueChange={(value: string) => {
        if (value === 'deals' || value === 'tasks') {
          onViewModeChange(value as 'deals' | 'tasks');
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
