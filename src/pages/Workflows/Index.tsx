
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import WorkflowHeader from './components/WorkflowHeader';
import WorkflowFilters from './components/WorkflowFilters';
import DealListView from './components/DealListView';
import DealCardModal from './components/DealCardModal';
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
    isDealModalOpen,
    viewMode,
    setViewMode,
    selectedWorkflow,
    setSelectedWorkflow,
    selectedPipeline,
    setSelectedPipeline,
    handleDealClick,
    handleCreateAsset,
    handleCreateTask,
    handleCreateNote,
    handleCreateDocument,
    handleCreateEmail,
    handleEditDeal,
    handleDeleteDeal,
    handleCancelDeal,
    handleDragEnd,
    handleCreateDeal,
    handleCloseDealModal
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

        <DealCardModal 
          isOpen={isDealModalOpen}
          onClose={handleCloseDealModal}
          deal={selectedDeal}
          onEditDeal={handleEditDeal}
          onDeleteDeal={handleDeleteDeal}
          onCancelDeal={handleCancelDeal}
          onCreateAsset={handleCreateAsset}
          onCreateTask={handleCreateTask}
          onCreateNote={handleCreateNote}
          onCreateDocument={handleCreateDocument}
          onCreateEmail={handleCreateEmail}
        />
      </div>
    </DashboardLayout>
  );
}
