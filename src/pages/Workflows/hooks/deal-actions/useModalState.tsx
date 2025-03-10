
import { useState } from 'react';
import { Deal, Asset } from '@/pages/Workflows/models/WorkflowModels';
import { useToast } from '@/hooks/use-toast';

export const useModalState = () => {
  const { toast } = useToast();
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [isDealModalOpen, setIsDealModalOpen] = useState(false);
  const [isAssetModalOpen, setIsAssetModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  
  const handleDealClick = (deal: Deal) => {
    setSelectedDeal(deal);
    setIsDealModalOpen(true);
  };

  const handleAssetClick = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsAssetModalOpen(true);
  };

  const handleCloseDealModal = () => {
    setIsDealModalOpen(false);
  };

  const handleCloseAssetModal = () => {
    setIsAssetModalOpen(false);
    setSelectedAsset(null);
  };

  return {
    toast,
    selectedDeal,
    setSelectedDeal,
    isDealModalOpen,
    setIsDealModalOpen,
    isAssetModalOpen,
    setIsAssetModalOpen,
    selectedAsset,
    setSelectedAsset,
    handleDealClick,
    handleAssetClick,
    handleCloseDealModal,
    handleCloseAssetModal
  };
};
