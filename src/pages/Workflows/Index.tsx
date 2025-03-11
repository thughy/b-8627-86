
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useWorkflowMain } from './hooks/useWorkflowMain';
import { useWorkflowViews } from './hooks/useWorkflowViews';
import WorkflowHeaderSection from './components/WorkflowHeaderSection';
import WorkflowViewContent from './components/WorkflowViewContent';
import WorkflowModalsContainer from './components/WorkflowModalsContainer';

export default function WorkflowsPage() {
  const {
    workflows,
    pipelines,
    stages,
    deals,
    filteredDeals,
    searchTerm,
    setSearchTerm,
    selectedWorkflow,
    setSelectedWorkflow,
    selectedPipeline,
    setSelectedPipeline,
    
    isDealModalOpen,
    isDealCreationModalOpen,
    selectedDeal,
    editingDeal,
    isAssetModalOpen,
    isAssetCreationModalOpen,
    selectedAsset,
    editingAsset,
    
    openDealModal,
    closeDealModal,
    openDealCreationModal,
    closeDealCreationModal,
    openAssetModal,
    closeAssetModal,
    openAssetCreationModal,
    closeAssetCreationModal,
    
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

  const { 
    contentMode, 
    setContentMode, 
    displayMode, 
    setDisplayMode 
  } = useWorkflowViews();

  const handleCreateNoteForAssetWrapper = (assetId: string, note: string) => {
    return handleCreateNoteForAsset(assetId, note);
  };

  const handleCreateDocumentForAssetWrapper = (assetId: string, documentUrl: string, documentName: string) => {
    return handleCreateDocumentForAsset(assetId, documentUrl, documentName);
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-4 px-4">
        <WorkflowHeaderSection 
          filteredDeals={filteredDeals}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedWorkflow={selectedWorkflow}
          setSelectedWorkflow={setSelectedWorkflow}
          selectedPipeline={selectedPipeline}
          setSelectedPipeline={setSelectedPipeline}
          contentMode={contentMode}
          displayMode={displayMode}
          setContentMode={setContentMode}
          setDisplayMode={setDisplayMode}
          workflows={workflows}
          pipelines={pipelines}
          onCreateDeal={handleCreateDeal}
        />

        <WorkflowViewContent 
          contentMode={contentMode}
          displayMode={displayMode}
          onContentModeChange={setContentMode}
          onDisplayModeChange={setDisplayMode}
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

        <WorkflowModalsContainer 
          isDealModalOpen={isDealModalOpen}
          closeDealModal={closeDealModal}
          selectedDeal={selectedDeal}
          onEditDeal={handleEditDeal}
          onDeleteDeal={handleDeleteDeal}
          onCancelDeal={handleCancelDeal}
          onWinDeal={handleWinDeal}
          onLoseDeal={handleLoseDeal}
          
          isAssetModalOpen={isAssetModalOpen}
          closeAssetModal={closeAssetModal}
          selectedAsset={selectedAsset}
          onEditAsset={handleEditAsset}
          onDeleteAsset={handleDeleteAsset}
          onCompleteAsset={handleCompleteAsset}
          onCancelAsset={handleCancelAsset}
          
          isDealCreationModalOpen={isDealCreationModalOpen}
          closeDealCreationModal={closeDealCreationModal}
          isAssetCreationModalOpen={isAssetCreationModalOpen}
          closeAssetCreationModal={closeAssetCreationModal}
          
          editingDeal={editingDeal}
          editingAsset={editingAsset}
          stages={stages}
          selectedStageForNewDeal={selectedStageForNewDeal}
          
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
