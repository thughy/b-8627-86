
import { useModalState } from './deal-actions/useModalState';
import { useAssetActions } from './deal-actions/useAssetActions';
import { useDealStatusActions } from './deal-actions/useDealStatusActions';
import { useContentActions } from './deal-actions/useContentActions';
import { Deal, Asset } from '@/pages/Workflows/models/WorkflowModels';

export const useDealActions = () => {
  // Use our smaller, more focused hooks
  const modalState = useModalState();
  const assetActions = useAssetActions();
  const dealStatusActions = useDealStatusActions();
  const contentActions = useContentActions();

  // Create a wrapper for handleCreateAsset to set the selected asset and open the modal
  const handleCreateAsset = (dealId: string, asset?: Partial<Asset>) => {
    const newAsset = assetActions.handleCreateAsset(dealId, asset);
    modalState.setSelectedAsset(newAsset);
    modalState.setIsAssetModalOpen(true);
  };

  return {
    // State from modalState
    selectedDeal: modalState.selectedDeal,
    setSelectedDeal: modalState.setSelectedDeal,
    isDealModalOpen: modalState.isDealModalOpen,
    setIsDealModalOpen: modalState.setIsDealModalOpen,
    isAssetModalOpen: modalState.isAssetModalOpen,
    setIsAssetModalOpen: modalState.setIsAssetModalOpen,
    selectedAsset: modalState.selectedAsset,
    setSelectedAsset: modalState.setSelectedAsset,
    
    // Actions from modalState
    handleDealClick: modalState.handleDealClick,
    handleAssetClick: modalState.handleAssetClick,
    handleCloseDealModal: modalState.handleCloseDealModal,
    handleCloseAssetModal: modalState.handleCloseAssetModal,
    
    // Modified asset creation function
    handleCreateAsset,
    
    // Pass through other asset actions
    handleEditAsset: assetActions.handleEditAsset,
    handleDeleteAsset: assetActions.handleDeleteAsset,
    handleCompleteAsset: assetActions.handleCompleteAsset,
    handleCancelAsset: assetActions.handleCancelAsset,
    handleCreateNoteForAsset: assetActions.handleCreateNoteForAsset,
    handleCreateDocumentForAsset: assetActions.handleCreateDocumentForAsset,
    
    // Deal status actions
    handleEditDeal: dealStatusActions.handleEditDeal,
    handleDeleteDeal: dealStatusActions.handleDeleteDeal,
    handleCancelDeal: dealStatusActions.handleCancelDeal,
    handleWinDeal: dealStatusActions.handleWinDeal,
    handleLoseDeal: dealStatusActions.handleLoseDeal,
    handleCreateDeal: dealStatusActions.handleCreateDeal,
    
    // Content creation actions
    handleCreateTask: contentActions.handleCreateTask,
    handleCreateNote: contentActions.handleCreateNote,
    handleCreateDocument: contentActions.handleCreateDocument,
    handleCreateEmail: contentActions.handleCreateEmail,
    getChatPreview: contentActions.getChatPreview
  };
};
