
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
    toast({
      title: "Negócio selecionado",
      description: `Negócio "${deal.title}" foi selecionado.`,
    });
  };

  const handleCreateAsset = (dealId: string, asset: Partial<Asset>) => {
    console.log(`Criando asset para deal ${dealId}:`, asset);
    toast({
      title: "Asset adicionado",
      description: `O asset foi adicionado ao negócio com sucesso.`,
    });
  };

  const handleEditDeal = (deal: Deal) => {
    console.log('Editando deal:', deal);
    toast({
      title: "Negócio atualizado",
      description: "As alterações foram salvas com sucesso.",
    });
  };

  const handleDeleteDeal = (dealId: string) => {
    console.log('Excluindo deal:', dealId);
    setIsDealModalOpen(false);
    
    toast({
      title: "Negócio excluído",
      description: "O negócio foi excluído com sucesso.",
    });
    
    return dealId; // Return the ID so the parent hook can filter it out
  };

  const handleCancelDeal = (dealId: string) => {
    console.log('Cancelando deal:', dealId);
    
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

  const handleCloseDealModal = () => {
    setIsDealModalOpen(false);
  };

  // Obter prévia do chat (últimas 3 mensagens)
  const getChatPreview = (dealId: string) => {
    // Em um cenário real, isso seria carregado da API
    return [
      { id: 'msg-3', text: 'Podemos fechar o contrato na próxima semana.', sender: 'user', timestamp: new Date(Date.now() - 1000 * 60 * 60) },
      { id: 'msg-2', text: 'As condições parecem favoráveis.', sender: 'agent', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) },
      { id: 'msg-1', text: 'Vamos revisar os termos do contrato.', sender: 'user', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3) },
    ];
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
    handleCreateDeal,
    handleCloseDealModal,
    getChatPreview
  };
};
