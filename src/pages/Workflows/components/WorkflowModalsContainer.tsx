
import React from 'react';
import DealCardModal from './DealCardModal';
import AssetCardModal from './AssetCardModal';
import DealCreationModal from './DealCreationModal';
import AssetCreationModal from './AssetCreationModal';
import { Deal, Asset, Stage } from '../models/WorkflowModels';

interface WorkflowModalsContainerProps {
  // Deal modal props
  isDealModalOpen: boolean;
  closeDealModal: () => void;
  selectedDeal: Deal | null;
  onEditDeal: (deal: Deal) => void;
  onDeleteDeal: (dealId: string) => void;
  onCancelDeal: (dealId: string) => void;
  onWinDeal: (dealId: string) => void;
  onLoseDeal: (dealId: string, reason?: string) => void;
  
  // Asset modal props
  isAssetModalOpen: boolean;
  closeAssetModal: () => void;
  selectedAsset: Asset | null;
  onEditAsset: (asset: Asset) => void;
  onDeleteAsset: (assetId: string) => void;
  onCompleteAsset: (assetId: string) => void;
  onCancelAsset: (assetId: string) => void;
  
  // Creation modal props
  isDealCreationModalOpen: boolean;
  closeDealCreationModal: () => void;
  isAssetCreationModalOpen: boolean;
  closeAssetCreationModal: () => void;
  
  // Data props
  editingDeal: Partial<Deal> | null;
  editingAsset: Partial<Asset> | null;
  stages: Stage[];
  selectedStageForNewDeal: string | null;
  
  // Action handlers
  onCreateAsset: (dealId: string) => void;
  onCreateTask: (dealId: string) => void;
  onCreateNote: (dealId: string) => void;
  onCreateDocument: (dealId: string) => void;
  onCreateEmail: (dealId: string) => void;
  onCreateNoteForAsset: (assetId: string, note: string) => void; // Fixed type signature
  onCreateDocumentForAsset: (assetId: string, documentUrl: string, documentName: string) => void; // Fixed type signature
  onSaveDeal: (dealData: Partial<Deal>) => void;
  onSaveAsset: (assetData: Partial<Asset>) => void;
}

const WorkflowModalsContainer: React.FC<WorkflowModalsContainerProps> = ({
  // Deal modal props
  isDealModalOpen,
  closeDealModal,
  selectedDeal,
  onEditDeal,
  onDeleteDeal,
  onCancelDeal,
  onWinDeal,
  onLoseDeal,
  
  // Asset modal props
  isAssetModalOpen,
  closeAssetModal,
  selectedAsset,
  onEditAsset,
  onDeleteAsset,
  onCompleteAsset,
  onCancelAsset,
  
  // Creation modal props
  isDealCreationModalOpen,
  closeDealCreationModal,
  isAssetCreationModalOpen,
  closeAssetCreationModal,
  
  // Data props
  editingDeal,
  editingAsset,
  stages,
  selectedStageForNewDeal,
  
  // Action handlers
  onCreateAsset,
  onCreateTask,
  onCreateNote,
  onCreateDocument,
  onCreateEmail,
  onCreateNoteForAsset,
  onCreateDocumentForAsset,
  onSaveDeal,
  onSaveAsset,
}) => {
  // Define wrapper functions to make type signatures compatible
  const handleCreateNoteWrapper = (assetId: string) => {
    if (onCreateNoteForAsset) {
      // Since we expect a note parameter but can't provide it in the current context,
      // we'll pass an empty string as default
      onCreateNoteForAsset(assetId, "");
    }
  };

  const handleCreateDocumentWrapper = (assetId: string) => {
    if (onCreateDocumentForAsset) {
      // Since we expect document url and name parameters but can't provide them in the current context,
      // we'll pass empty strings as defaults
      onCreateDocumentForAsset(assetId, "", "");
    }
  };

  return (
    <>
      {/* Deal Card Modal */}
      {selectedDeal && (
        <DealCardModal 
          isOpen={isDealModalOpen}
          onClose={closeDealModal}
          deal={selectedDeal}
          onEditDeal={onEditDeal}
          onDeleteDeal={onDeleteDeal}
          onCancelDeal={onCancelDeal}
          onWinDeal={onWinDeal}
          onLoseDeal={onLoseDeal}
          onCreateAsset={onCreateAsset}
          onCreateTask={onCreateTask}
          onCreateNote={onCreateNote}
          onCreateDocument={onCreateDocument}
          onCreateEmail={onCreateEmail}
          isAssetModalOpen={isAssetModalOpen}
          onCloseAssetModal={closeAssetModal}
          selectedAsset={selectedAsset}
          onEditAsset={onEditAsset}
          onDeleteAsset={onDeleteAsset}
          onCompleteAsset={onCompleteAsset}
          onCancelAsset={onCancelAsset}
          onCreateNoteForAsset={handleCreateNoteWrapper}
          onCreateDocumentForAsset={handleCreateDocumentWrapper}
        />
      )}

      {/* Deal Creation Modal */}
      <DealCreationModal 
        isOpen={isDealCreationModalOpen}
        onClose={closeDealCreationModal}
        onSave={onSaveDeal}
        stages={stages}
        initialDeal={editingDeal || undefined}
        preSelectedStageId={selectedStageForNewDeal || undefined}
      />

      {/* Asset Creation Modal */}
      {editingAsset && (
        <AssetCreationModal 
          isOpen={isAssetCreationModalOpen}
          onClose={closeAssetCreationModal}
          onSave={onSaveAsset}
          dealId={editingAsset.dealId || ''}
          initialAsset={editingAsset}
        />
      )}
    </>
  );
};

export default WorkflowModalsContainer;
