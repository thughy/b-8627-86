
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useWorkflowMain } from './hooks/useWorkflowMain';
import WorkflowHeaderSection from './components/WorkflowHeaderSection';
import WorkflowViewContent from './components/WorkflowViewContent';
import WorkflowModalsContainer from './components/WorkflowModalsContainer';

export default function WorkflowsPage() {
  const {
    // Workflow state
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
    
    // Modal states
    isDealModalOpen,
    isDealCreationModalOpen,
    selectedDeal,
    editingDeal,
    isAssetModalOpen,
    isAssetCreationModalOpen,
    selectedAsset,
    editingAsset,
    
    // Modal operations
    openDealModal,
    closeDealModal,
    openDealCreationModal,
    closeDealCreationModal,
    openAssetModal,
    closeAssetModal,
    openAssetCreationModal,
    closeAssetCreationModal,
    
    // CRUD operations
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
    
    // Other operations
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

  // Create wrapper functions with the correct signatures for the WorkflowModalsContainer props
  const handleCreateNoteForAssetWrapper = (assetId: string, note: string) => {
    return handleCreateNoteForAsset(assetId, note);
  };

  const handleCreateDocumentForAssetWrapper = (assetId: string, documentUrl: string, documentName: string) => {
    return handleCreateDocumentForAsset(assetId, documentUrl, documentName);
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-4 px-4">
        {/* Header Section with Filters */}
        <WorkflowHeaderSection 
          filteredDeals={filteredDeals}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedWorkflow={selectedWorkflow}
          setSelectedWorkflow={setSelectedWorkflow}
          selectedPipeline={selectedPipeline}
          setSelectedPipeline={setSelectedPipeline}
          viewMode={viewMode}
          setViewMode={setViewMode}
          workflows={workflows}
          pipelines={pipelines}
          onCreateDeal={handleCreateDeal}
        />

        {/* View Content (Kanban or List) */}
        <WorkflowViewContent 
          viewMode={viewMode}
          onViewModeChange={(value) => {
            if (value === 'kanban' || value === 'list') {
              setViewMode(value as 'kanban' | 'list');
            }
          }}
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

        {/* Modals */}
        <WorkflowModalsContainer 
          // Deal modal props
          isDealModalOpen={isDealModalOpen}
          closeDealModal={closeDealModal}
          selectedDeal={selectedDeal}
          onEditDeal={handleEditDeal}
          onDeleteDeal={handleDeleteDeal}
          onCancelDeal={handleCancelDeal}
          onWinDeal={handleWinDeal}
          onLoseDeal={handleLoseDeal}
          
          // Asset modal props
          isAssetModalOpen={isAssetModalOpen}
          closeAssetModal={closeAssetModal}
          selectedAsset={selectedAsset}
          onEditAsset={handleEditAsset}
          onDeleteAsset={handleDeleteAsset}
          onCompleteAsset={handleCompleteAsset}
          onCancelAsset={handleCancelAsset}
          
          // Creation modal props
          isDealCreationModalOpen={isDealCreationModalOpen}
          closeDealCreationModal={closeDealCreationModal}
          isAssetCreationModalOpen={isAssetCreationModalOpen}
          closeAssetCreationModal={closeAssetCreationModal}
          
          // Data props
          editingDeal={editingDeal}
          editingAsset={editingAsset}
          stages={stages}
          selectedStageForNewDeal={selectedStageForNewDeal}
          
          // Action handlers
          onCreateAsset={handleCreateAsset}
          onCreateTask={handleCreateTask}
          onCreateNote={handleCreateNote}
          onCreateDocument={handleCreateDocument}
          onCreateEmail={handleCreateEmail}
          onCreateNoteForAsset={handleCreateNoteForAssetWrapper}
          onCreateDocumentForAsset={handleCreateDocumentForAssetWrapper}
          onSaveDeal={handleSaveDeal}
          onSaveAsset={handleSaveAsset}
        />
      </div>
    </DashboardLayout>
  );
}
