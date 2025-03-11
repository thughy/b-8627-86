
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useModals } from './useModals';
import { useWorkflowState } from './useWorkflowState';
import { Deal, Asset, Stage, Pipeline, Workflow } from '@/pages/Workflows/models/WorkflowModels';
import { getDefaultAssetValues } from '../components/asset-modal/utils/assetTypeUtils';

export const useWorkflowMain = () => {
  const { toast } = useToast();
  const workflowState = useWorkflowState();
  const modals = useModals();
  
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStageForNewDeal, setSelectedStageForNewDeal] = useState<string | null>(null);

  // Efeito para adicionar o asset criado ao deal selecionado
  useEffect(() => {
    if (workflowState.selectedDeal && workflowState.selectedAsset) {
      // Verificar se o asset já existe no deal
      const assetExists = workflowState.selectedDeal.assets?.some(
        asset => asset.id === workflowState.selectedAsset?.id
      );
      
      // Se não existir, adicionar ao deal
      if (!assetExists && workflowState.selectedDeal.assets) {
        const updatedDeal = {
          ...workflowState.selectedDeal,
          assets: [...workflowState.selectedDeal.assets, workflowState.selectedAsset]
        };
        workflowState.setSelectedDeal(updatedDeal);
      }
    }
  }, [workflowState.selectedAsset, workflowState.selectedDeal]);

  // Manipuladores de ações para Deal
  const handleCreateDeal = (stageId?: string) => {
    if (stageId) {
      setSelectedStageForNewDeal(stageId);
    }
    modals.openDealCreationModal({ stageId });
  };
  
  const handleEditDeal = (deal: Deal) => {
    modals.openDealEditModal(deal);
  };
  
  const handleSaveDeal = (dealData: Partial<Deal>) => {
    setIsLoading(true);
    
    try {
      // Verificar se é uma criação ou atualização
      if (dealData.id) {
        // Atualizar deal existente
        workflowState.handleEditDeal({
          ...(workflowState.deals.find(d => d.id === dealData.id) || {}),
          ...dealData
        } as Deal);
        
        toast({
          title: "Deal atualizado",
          description: "Deal atualizado com sucesso!"
        });
      } else {
        // Criar novo deal
        const newDeal = workflowState.handleCreateDeal(dealData);
        
        toast({
          title: "Deal criado",
          description: "Novo deal criado com sucesso!"
        });
      }
      
      setSelectedStageForNewDeal(null);
    } catch (error) {
      console.error("Erro ao salvar deal:", error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar o deal.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Manipuladores de ações para Asset
  const handleCreateAsset = (dealId: string) => {
    const defaultAsset = getDefaultAssetValues(dealId);
    modals.openAssetCreationModal(dealId, defaultAsset);
  };
  
  const handleEditAsset = (asset: Asset) => {
    modals.openAssetEditModal(asset);
  };
  
  const handleSaveAsset = (assetData: Partial<Asset>) => {
    setIsLoading(true);
    
    try {
      // Verificar se é uma criação ou atualização
      if (assetData.id) {
        // Atualizar asset existente
        workflowState.handleEditAsset({
          ...(workflowState.selectedDeal?.assets?.find(a => a.id === assetData.id) || {}),
          ...assetData
        } as Asset);
        
        toast({
          title: "Asset atualizado",
          description: "Asset atualizado com sucesso!"
        });
      } else {
        // Criar novo asset
        const newAsset = workflowState.handleCreateAsset(assetData.dealId || '', assetData);
        
        toast({
          title: "Asset criado",
          description: "Novo asset criado com sucesso!"
        });
      }
    } catch (error) {
      console.error("Erro ao salvar asset:", error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar o asset.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    ...workflowState,
    ...modals,
    isLoading,
    selectedStageForNewDeal,
    handleCreateDeal,
    handleEditDeal,
    handleSaveDeal,
    handleCreateAsset,
    handleEditAsset,
    handleSaveAsset
  };
};
