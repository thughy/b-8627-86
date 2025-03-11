
import { useState } from 'react';
import { Asset } from '@/pages/Workflows/models/WorkflowModels';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';
import { validateAssetRequiredFields } from '../../components/asset-modal/utils/assetTypeUtils';

export const useAssetOperations = () => {
  const { toast } = useToast();
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [isAssetModalOpen, setIsAssetModalOpen] = useState(false);

  const createAsset = (dealId: string, assetData: Partial<Asset> = {}) => {
    // Validate required fields
    if (!dealId) {
      toast({
        title: "Erro ao criar asset",
        description: "ID do deal é obrigatório",
        variant: "destructive"
      });
      return null;
    }

    // Create new asset with default values
    const newAsset: Asset = {
      id: uuidv4(),
      dealId,
      title: assetData.title || 'Novo asset',
      description: assetData.description || '',
      type: assetData.type || 'contract',
      status: assetData.status || 'open',
      amount: assetData.amount || 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      parameters: assetData.parameters || {},
      files: assetData.files || []
    };

    // Validate all required fields
    if (!validateAssetRequiredFields(newAsset)) {
      toast({
        title: "Erro ao criar asset",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return null;
    }

    toast({
      title: "Asset criado",
      description: "Asset criado com sucesso!"
    });

    return newAsset;
  };

  const updateAsset = (asset: Asset) => {
    // Ensure all required fields are present
    if (!validateAssetRequiredFields(asset)) {
      toast({
        title: "Erro ao atualizar asset",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return null;
    }

    // Update the asset
    const updatedAsset: Asset = {
      ...asset,
      updatedAt: new Date()
    };

    toast({
      title: "Asset atualizado",
      description: "Asset atualizado com sucesso!"
    });

    return updatedAsset;
  };

  const deleteAsset = (assetId: string) => {
    if (!assetId) {
      toast({
        title: "Erro ao excluir asset",
        description: "ID do asset é obrigatório",
        variant: "destructive"
      });
      return false;
    }

    toast({
      title: "Asset excluído",
      description: "Asset excluído com sucesso!"
    });

    return true;
  };

  const completeAsset = (assetId: string) => {
    if (!assetId) {
      toast({
        title: "Erro ao concluir asset",
        description: "ID do asset é obrigatório",
        variant: "destructive"
      });
      return false;
    }

    toast({
      title: "Asset concluído",
      description: "Asset concluído com sucesso!"
    });

    return true;
  };

  const cancelAsset = (assetId: string) => {
    if (!assetId) {
      toast({
        title: "Erro ao cancelar asset",
        description: "ID do asset é obrigatório",
        variant: "destructive"
      });
      return false;
    }

    toast({
      title: "Asset cancelado",
      description: "Asset cancelado com sucesso!"
    });

    return true;
  };

  const openAssetModal = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsAssetModalOpen(true);
  };

  const closeAssetModal = () => {
    setIsAssetModalOpen(false);
    setTimeout(() => setSelectedAsset(null), 300);
  };

  return {
    selectedAsset,
    setSelectedAsset,
    isAssetModalOpen,
    setIsAssetModalOpen,
    createAsset,
    updateAsset,
    deleteAsset,
    completeAsset,
    cancelAsset,
    openAssetModal,
    closeAssetModal
  };
};
