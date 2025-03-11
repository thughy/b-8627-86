
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Asset } from '@/pages/Workflows/models/WorkflowModels';
import AssetForm from './AssetForm';

interface AssetCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (assetData: Partial<Asset>) => void;
  dealId: string;
  initialAsset?: Partial<Asset>;
}

const AssetCreationModal: React.FC<AssetCreationModalProps> = ({
  isOpen,
  onClose,
  onSave,
  dealId,
  initialAsset
}) => {
  const handleSubmit = (assetData: Partial<Asset>) => {
    onSave(assetData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{initialAsset?.id ? 'Editar' : 'Novo'} Asset</DialogTitle>
        </DialogHeader>
        
        <AssetForm 
          asset={initialAsset}
          dealId={dealId}
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AssetCreationModal;
