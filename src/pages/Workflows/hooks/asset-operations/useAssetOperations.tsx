
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Asset } from '@/pages/Workflows/models/WorkflowModels';
import { v4 as uuidv4 } from 'uuid';
import { getDefaultAssetValues, validateAssetRequiredFields } from '../../components/asset-modal/utils/assetTypeUtils';

export const useAssetOperations = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const createAsset = (dealId: string, assetData: Partial<Asset> = {}) => {
    setIsLoading(true);
    
    try {
      const defaultValues = getDefaultAssetValues(dealId);
      const newAsset: Asset = {
        ...defaultValues,
        ...assetData,
        id: uuidv4(),
        dealId,
        createdAt: new Date(),
        updatedAt: new Date()
      } as Asset;
      
      // Validate the asset data
      const validation = validateAssetRequiredFields(newAsset);
      if (!validation.valid) {
        toast({
          title: "Erro na validação",
          description: validation.errors.join(", "),
          variant: "destructive"
        });
        return null;
      }
      
      toast({
        title: "Asset criado",
        description: "Um novo asset foi criado com sucesso."
      });
      
      return newAsset;
    } catch (error) {
      console.error("Erro ao criar asset:", error);
      toast({
        title: "Erro ao criar asset",
        description: "Ocorreu um erro ao criar o asset.",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateAsset = (asset: Asset) => {
    setIsLoading(true);
    
    try {
      const updatedAsset = {
        ...asset,
        updatedAt: new Date()
      };
      
      // Validate the asset data
      const validation = validateAssetRequiredFields(updatedAsset);
      if (!validation.valid) {
        toast({
          title: "Erro na validação",
          description: validation.errors.join(", "),
          variant: "destructive"
        });
        return null;
      }
      
      toast({
        title: "Asset atualizado",
        description: "O asset foi atualizado com sucesso."
      });
      
      return updatedAsset;
    } catch (error) {
      console.error("Erro ao atualizar asset:", error);
      toast({
        title: "Erro ao atualizar asset",
        description: "Ocorreu um erro ao atualizar o asset.",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  const deleteAsset = (assetId: string) => {
    setIsLoading(true);
    
    try {
      // In a real application, this would call an API to delete the asset
      toast({
        title: "Asset removido",
        description: "O asset foi removido com sucesso."
      });
      
      return assetId;
    } catch (error) {
      console.error("Erro ao remover asset:", error);
      toast({
        title: "Erro ao remover asset",
        description: "Ocorreu um erro ao remover o asset.",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  const completeAsset = (assetId: string) => {
    setIsLoading(true);
    
    try {
      toast({
        title: "Asset concluído",
        description: "O asset foi marcado como concluído."
      });
      
      return {
        assetId,
        status: 'completed' as const
      };
    } catch (error) {
      console.error("Erro ao concluir asset:", error);
      toast({
        title: "Erro ao concluir asset",
        description: "Ocorreu um erro ao concluir o asset.",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  const cancelAsset = (assetId: string) => {
    setIsLoading(true);
    
    try {
      toast({
        title: "Asset cancelado",
        description: "O asset foi cancelado com sucesso."
      });
      
      return {
        assetId,
        status: 'cancelled' as const
      };
    } catch (error) {
      console.error("Erro ao cancelar asset:", error);
      toast({
        title: "Erro ao cancelar asset",
        description: "Ocorreu um erro ao cancelar o asset.",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    isLoading,
    createAsset,
    updateAsset,
    deleteAsset,
    completeAsset,
    cancelAsset
  };
};
