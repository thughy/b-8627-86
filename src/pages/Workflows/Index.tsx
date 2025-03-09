
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import WorkflowHeader from './components/WorkflowHeader';
import WorkflowFilters from './components/WorkflowFilters';
import DealListView from './components/DealListView';
import KanbanBoard from '@/components/workflows/KanbanBoard';
import { useWorkflowState } from './hooks/useWorkflowState';

export default function WorkflowsPage() {
  const {
    workflows,
    pipelines,
    stages,
    filteredDeals,
    searchTerm,
    setSearchTerm,
    selectedDeal,
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
  } = useWorkflowState();

  return (
    <DashboardLayout>
      <div className="container mx-auto py-10">
        <WorkflowHeader onCreateDeal={handleCreateDeal} />

        <WorkflowFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedWorkflow={selectedWorkflow}
          onWorkflowChange={setSelectedWorkflow}
          selectedPipeline={selectedPipeline}
          onPipelineChange={setSelectedPipeline}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          workflows={workflows}
          pipelines={pipelines}
        />

        {viewMode === 'kanban' ? (
          <KanbanBoard 
            stages={stages} 
            pipelineId={selectedPipeline}
            deals={filteredDeals} 
            onDragEnd={handleDragEnd} 
            onDealClick={handleDealClick}
            onAction={(action, data) => {
              if (action === "createDeal") {
                handleCreateDeal();
              } else if (action === "viewDeal") {
                handleDealClick(data);
              }
            }}
          />
        ) : (
          <DealListView 
            deals={filteredDeals} 
            onDealClick={handleDealClick} 
          />
        )}
      </div>
    </DashboardLayout>
  );
}
