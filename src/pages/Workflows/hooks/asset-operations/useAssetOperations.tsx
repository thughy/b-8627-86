
import { useState } from 'react';
import { Asset } from '@/pages/Workflows/models/WorkflowModels';
import { useToast } from '@/hooks/use-toast';
import { getAssetBackground } from '../../components/asset-modal/utils/assetStyleUtils';
import { validateAssetRequiredFields, getDefaultAssetValues } from '../../components/asset-modal/utils/assetTypeUtils';

export const useAssetOperations = (onUpdate?: (assets: Asset[]) => void) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const createAsset = async (dealId: string, initialData?: Partial<Asset>): Promise<Asset> => {
    setIsProcessing(true);
    
    try {
      const defaultValues = getDefaultAssetValues(dealId);
      const newAsset: Asset = {
        ...defaultValues,
        ...initialData,
        id: `asset-${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date()
      } as Asset;
      
      console.log('Created new asset:', newAsset);
      
      toast({
        title: "Ativo criado",
        description: "O ativo foi criado com sucesso",
      });
      
      return newAsset;
    } catch (error) {
      console.error('Error creating asset:', error);
      toast({
        title: "Erro ao criar ativo",
        description: "Ocorreu um erro ao criar o ativo",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };
  
  const updateAsset = async (asset: Asset): Promise<Asset> => {
    setIsProcessing(true);
    
    try {
      if (!validateAssetRequiredFields(asset)) {
        throw new Error('Missing required fields');
      }
      
      const updatedAsset = {
        ...asset,
        updatedAt: new Date()
      };
      
      console.log('Updated asset:', updatedAsset);
      
      toast({
        title: "Ativo atualizado",
        description: "O ativo foi atualizado com sucesso",
      });
      
      return updatedAsset;
    } catch (error) {
      console.error('Error updating asset:', error);
      toast({
        title: "Erro ao atualizar ativo",
        description: "Ocorreu um erro ao atualizar o ativo",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };
  
  const deleteAsset = async (assetId: string): Promise<string> => {
    setIsProcessing(true);
    
    try {
      console.log('Deleted asset:', assetId);
      
      toast({
        title: "Ativo excluído",
        description: "O ativo foi excluído com sucesso",
      });
      
      return assetId;
    } catch (error) {
      console.error('Error deleting asset:', error);
      toast({
        title: "Erro ao excluir ativo",
        description: "Ocorreu um erro ao excluir o ativo",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };
  
  const changeAssetStatus = async (asset: Asset, newStatus: Asset['status'], reasonForCancellation?: string): Promise<Asset> => {
    setIsProcessing(true);
    
    try {
      const updatedAsset = {
        ...asset,
        status: newStatus,
        ...(newStatus === 'cancelled' && reasonForCancellation ? { cancellationReason: reasonForCancellation } : {}),
        updatedAt: new Date()
      };
      
      console.log('Changed asset status:', updatedAsset);
      
      const statusMessages = {
        'open': "Ativo reaberto",
        'processing': "Ativo em processamento",
        'completed': "Ativo concluído",
        'cancelled': "Ativo cancelado"
      };
      
      toast({
        title: statusMessages[newStatus] || "Status atualizado",
        description: "O status do ativo foi atualizado com sucesso",
      });
      
      return updatedAsset;
    } catch (error) {
      console.error('Error changing asset status:', error);
      toast({
        title: "Erro ao mudar status",
        description: "Ocorreu um erro ao alterar o status do ativo",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };
  
  const getAssetById = (assets: Asset[], assetId: string): Asset | undefined => {
    return assets.find(asset => asset.id === assetId);
  };
  
  const getAssetsByDeal = (assets: Asset[], dealId: string): Asset[] => {
    return assets.filter(asset => asset.dealId === dealId);
  };
  
  const getAssetSummary = (asset: Asset) => {
    const background = getAssetBackground(asset.type);
    const isCompleted = asset.status === 'completed';
    const isCancelled = asset.status === 'cancelled';
    
    return {
      background,
      isCompleted,
      isCancelled,
      statusLabel: asset.status === 'open' ? 'Aberto' : 
                  asset.status === 'processing' ? 'Em processamento' : 
                  asset.status === 'completed' ? 'Concluído' : 'Cancelado'
    };
  };
  
  return {
    isProcessing,
    createAsset,
    updateAsset,
    deleteAsset,
    changeAssetStatus,
    getAssetById,
    getAssetsByDeal,
    getAssetSummary
  };
};
