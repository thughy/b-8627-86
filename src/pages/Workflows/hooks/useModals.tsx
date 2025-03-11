
import { useState } from 'react';
import { Deal, Asset } from '@/pages/Workflows/models/WorkflowModels';

export const useModals = () => {
  // Estado para modais de Deal
  const [isDealModalOpen, setIsDealModalOpen] = useState(false);
  const [isDealCreationModalOpen, setIsDealCreationModalOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [editingDeal, setEditingDeal] = useState<Partial<Deal> | null>(null);
  
  // Estado para modais de Asset
  const [isAssetModalOpen, setIsAssetModalOpen] = useState(false);
  const [isAssetCreationModalOpen, setIsAssetCreationModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [editingAsset, setEditingAsset] = useState<Partial<Asset> | null>(null);
  
  // Operações para Deal
  const openDealModal = (deal: Deal) => {
    setSelectedDeal(deal);
    setIsDealModalOpen(true);
  };
  
  const closeDealModal = () => {
    setIsDealModalOpen(false);
    // Opcional: Atrasar a limpeza do selectedDeal para evitar UI flickering
    setTimeout(() => setSelectedDeal(null), 300);
  };
  
  const openDealCreationModal = (initialData?: Partial<Deal>) => {
    setEditingDeal(initialData || null);
    setIsDealCreationModalOpen(true);
  };
  
  const closeDealCreationModal = () => {
    setIsDealCreationModalOpen(false);
    setEditingDeal(null);
  };
  
  const openDealEditModal = (deal: Deal) => {
    setEditingDeal(deal);
    setIsDealCreationModalOpen(true);
  };
  
  // Operações para Asset
  const openAssetModal = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsAssetModalOpen(true);
  };
  
  const closeAssetModal = () => {
    setIsAssetModalOpen(false);
    setTimeout(() => setSelectedAsset(null), 300);
  };
  
  const openAssetCreationModal = (dealId: string, initialData?: Partial<Asset>) => {
    const assetDefaults = initialData || { dealId };
    setEditingAsset(assetDefaults);
    setIsAssetCreationModalOpen(true);
  };
  
  const closeAssetCreationModal = () => {
    setIsAssetCreationModalOpen(false);
    setEditingAsset(null);
  };
  
  const openAssetEditModal = (asset: Asset) => {
    setEditingAsset(asset);
    setIsAssetCreationModalOpen(true);
  };

  return {
    // Estado
    isDealModalOpen,
    isDealCreationModalOpen,
    selectedDeal,
    editingDeal,
    isAssetModalOpen,
    isAssetCreationModalOpen,
    selectedAsset,
    editingAsset,
    
    // Operações para Deal
    openDealModal,
    closeDealModal,
    openDealCreationModal,
    closeDealCreationModal,
    openDealEditModal,
    
    // Operações para Asset
    openAssetModal,
    closeAssetModal,
    openAssetCreationModal,
    closeAssetCreationModal,
    openAssetEditModal
  };
};
