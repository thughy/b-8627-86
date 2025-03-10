
import React from 'react';
import { Asset } from '@/pages/Workflows/models/WorkflowModels';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import AssetModalHeader from './asset-modal/AssetModalHeader';
import AssetSummaryInfo from './asset-modal/AssetSummaryInfo';
import AssetContent from './asset-modal/AssetContent';
import { getAssetBackground } from './asset-modal/utils/assetStyleUtils';

interface AssetCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset: Asset | null;
  onEditAsset?: (asset: Asset) => void;
  onDeleteAsset?: (assetId: string) => void;
  onCancelAsset?: (assetId: string) => void;
  onCompleteAsset?: (assetId: string) => void;
  onCreateNote?: (assetId: string) => void;
  onCreateDocument?: (assetId: string) => void;
}

const AssetCardModal: React.FC<AssetCardModalProps> = ({
  isOpen,
  onClose,
  asset,
  onEditAsset,
  onDeleteAsset,
  onCancelAsset,
  onCompleteAsset,
  onCreateNote,
  onCreateDocument
}) => {
  if (!asset) return null;

  // Get background style based on asset type
  const assetBackground = getAssetBackground(asset.type);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className={cn("max-w-6xl max-h-[90vh] p-0 flex flex-col", assetBackground)}>
        <AssetModalHeader 
          asset={asset}
          onCompleteAsset={onCompleteAsset}
          onCancelAsset={onCancelAsset}
          onDeleteAsset={onDeleteAsset}
        />

        <AssetSummaryInfo asset={asset} />

        <AssetContent 
          asset={asset}
          onEditAsset={onEditAsset}
          onCreateNote={onCreateNote}
          onCreateDocument={onCreateDocument}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AssetCardModal;
