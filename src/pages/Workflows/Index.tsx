
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import WorkflowHeader from './components/WorkflowHeader';
import WorkflowFilters from './components/WorkflowFilters';
import DealListView from './components/DealListView';
import DealCardModal from './components/DealCardModal';
import AssetCardModal from './components/AssetCardModal';
import WorkflowKanbanView from './components/WorkflowKanbanView';
import WorkflowStats from './components/WorkflowStats';
import DealCreationModal from './components/DealCreationModal';
import AssetCreationModal from './components/AssetCreationModal';
import { useWorkflowMain } from './hooks/useWorkflowMain';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function WorkflowsPage() {
  const {
    // Estado do workflow
    workflows,
    pipelines,
    stages,
    deals,
    filteredDeals,
    searchTerm,
    setSearchTerm,
    viewMode,
    setViewMode,
    selectedWorkflow,
    setSelectedWorkflow,
    selectedPipeline,
    setSelectedPipeline,
    
    // Estado dos modais
    isDealModalOpen,
    isDealCreationModalOpen,
    selectedDeal,
    editingDeal,
    isAssetModalOpen,
    isAssetCreationModalOpen,
    selectedAsset,
    editingAsset,
    
    // Operações de modais
    openDealModal,
    closeDealModal,
    openDealCreationModal,
    closeDealCreationModal,
    openAssetModal,
    closeAssetModal,
    openAssetCreationModal,
    closeAssetCreationModal,
    
    // Operações CRUD
    handleDragEnd,
    handleCreateDeal,
    handleSaveDeal,
    handleEditDeal,
    handleDeleteDeal,
    handleCancelDeal,
    handleWinDeal,
    handleLoseDeal,
    handleCreateAsset,
    handleSaveAsset,
    handleEditAsset,
    handleDeleteAsset,
    handleCompleteAsset,
    handleCancelAsset,
    
    // Outras operações
    handleCreateTask,
    handleCreateNote,
    handleCreateDocument,
    handleCreateEmail,
    handleCreateNoteForAsset,
    handleCreateDocumentForAsset,
    getChatPreview,
    selectedStageForNewDeal,
    isLoading
  } = useWorkflowMain();

  return (
    <DashboardLayout>
      <div className="container mx-auto py-4 px-4">
        <WorkflowHeader onCreateDeal={() => openDealCreationModal()} />

        <WorkflowStats 
          deals={filteredDeals}
          selectedPipeline={selectedPipeline}
        />

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

        <Tabs value={viewMode} onValueChange={setViewMode} className="mt-4">
          <TabsList className="mb-4">
            <TabsTrigger value="kanban">Kanban</TabsTrigger>
            <TabsTrigger value="list">Lista</TabsTrigger>
          </TabsList>
          
          <TabsContent value="kanban" className="mt-0">
            <WorkflowKanbanView 
              stages={stages} 
              deals={filteredDeals} 
              onDragEnd={handleDragEnd} 
              onDealClick={openDealModal}
              onCreateDeal={() => openDealCreationModal()}
              selectedPipeline={selectedPipeline}
              pipelines={pipelines}
              onPipelineChange={setSelectedPipeline}
              getChatPreview={getChatPreview}
            />
          </TabsContent>
          
          <TabsContent value="list" className="mt-0">
            <DealListView 
              deals={filteredDeals} 
              onDealClick={openDealModal} 
            />
          </TabsContent>
        </Tabs>

        {/* Modais */}
        {selectedDeal && (
          <DealCardModal 
            isOpen={isDealModalOpen}
            onClose={closeDealModal}
            deal={selectedDeal}
            onEditDeal={handleEditDeal}
            onDeleteDeal={handleDeleteDeal}
            onCancelDeal={handleCancelDeal}
            onWinDeal={handleWinDeal}
            onLoseDeal={handleLoseDeal}
            onCreateAsset={(dealId) => openAssetCreationModal(dealId)}
            onCreateTask={handleCreateTask}
            onCreateNote={handleCreateNote}
            onCreateDocument={handleCreateDocument}
            onCreateEmail={handleCreateEmail}
            isAssetModalOpen={isAssetModalOpen}
            onCloseAssetModal={closeAssetModal}
            selectedAsset={selectedAsset}
            onEditAsset={handleEditAsset}
            onDeleteAsset={handleDeleteAsset}
            onCompleteAsset={handleCompleteAsset}
            onCancelAsset={handleCancelAsset}
            onCreateNoteForAsset={handleCreateNoteForAsset}
            onCreateDocumentForAsset={handleCreateDocumentForAsset}
          />
        )}

        <DealCreationModal 
          isOpen={isDealCreationModalOpen}
          onClose={closeDealCreationModal}
          onSave={handleSaveDeal}
          stages={stages}
          initialDeal={editingDeal || undefined}
          preSelectedStageId={selectedStageForNewDeal || undefined}
        />

        {editingAsset && (
          <AssetCreationModal 
            isOpen={isAssetCreationModalOpen}
            onClose={closeAssetCreationModal}
            onSave={handleSaveAsset}
            dealId={editingAsset.dealId || ''}
            initialAsset={editingAsset}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
