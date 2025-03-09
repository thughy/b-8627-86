
import { useState } from 'react';
import { Deal, Asset } from '@/pages/Workflows/models/WorkflowModels';
import { useToast } from "@/hooks/use-toast";

export const useDealActions = () => {
  const { toast } = useToast();
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [isDealModalOpen, setIsDealModalOpen] = useState(false);
  
  const handleDealClick = (deal: Deal) => {
    setSelectedDeal(deal);
    setIsDealModalOpen(true);
  };

  const handleCreateAsset = (dealId: string, asset: Partial<Asset>) => {
    console.log(`Creating asset for deal ${dealId}:`, asset);
    toast({
      title: "Asset adicionado",
      description: `O asset foi adicionado ao negócio com sucesso.`,
    });
  };

  const handleEditDeal = (deal: Deal) => {
    console.log('Editing deal:', deal);
    toast({
      title: "Editar negócio",
      description: "Funcionalidade em desenvolvimento.",
    });
  };

  const handleDeleteDeal = (dealId: string) => {
    console.log('Deleting deal:', dealId);
    
    toast({
      title: "Negócio excluído",
      description: "O negócio foi excluído com sucesso.",
    });
    
    return dealId; // Return the ID so the parent hook can filter it out
  };

  const handleCancelDeal = (dealId: string) => {
    console.log('Canceling deal:', dealId);
    
    toast({
      title: "Negócio cancelado",
      description: "O negócio foi cancelado com sucesso.",
    });
    
    return { dealId, status: 'lost', reasonForLoss: 'Cancelado pelo usuário' };
  };

  const handleCreateDeal = () => {
    toast({
      title: "Criar novo negócio",
      description: "Funcionalidade em desenvolvimento.",
    });
  };

  return {
    selectedDeal,
    setSelectedDeal,
    isDealModalOpen,
    setIsDealModalOpen,
    handleDealClick,
    handleCreateAsset,
    handleEditDeal,
    handleDeleteDeal,
    handleCancelDeal,
    handleCreateDeal
  };
};
