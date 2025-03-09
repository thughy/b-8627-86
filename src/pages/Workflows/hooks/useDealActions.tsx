
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

  const handleCreateAsset = (dealId: string, asset?: Partial<Asset>) => {
    console.log(`Criando asset para deal ${dealId}:`, asset || {});
    toast({
      title: "Asset adicionado",
      description: `O asset foi adicionado ao negócio com sucesso.`,
    });
  };

  const handleCreateTask = (dealId: string) => {
    console.log(`Criando tarefa para deal ${dealId}`);
    toast({
      title: "Tarefa adicionada",
      description: `Uma nova tarefa foi adicionada ao negócio.`,
    });
  };

  const handleCreateNote = (dealId: string) => {
    console.log(`Criando nota para deal ${dealId}`);
    toast({
      title: "Nota adicionada",
      description: `Uma nova nota foi adicionada ao negócio.`,
    });
  };

  const handleCreateDocument = (dealId: string) => {
    console.log(`Criando documento para deal ${dealId}`);
    toast({
      title: "Documento adicionado",
      description: `Um novo documento foi adicionado ao negócio.`,
    });
  };

  const handleCreateEmail = (dealId: string) => {
    console.log(`Criando email para deal ${dealId}`);
    toast({
      title: "Email adicionado",
      description: `Um novo email foi adicionado ao negócio.`,
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

  const handleWinDeal = (dealId: string) => {
    console.log('Marcando deal como ganho:', dealId);
    
    toast({
      title: "Negócio ganho",
      description: "O negócio foi marcado como ganho com sucesso.",
    });
    
    return { dealId, status: 'won' };
  };

  const handleLoseDeal = (dealId: string, reason: string = 'Outro') => {
    console.log('Marcando deal como perdido:', dealId, 'Motivo:', reason);
    
    toast({
      title: "Negócio perdido",
      description: "O negócio foi marcado como perdido com sucesso.",
    });
    
    return { dealId, status: 'lost', reasonForLoss: reason };
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
    handleCreateTask,
    handleCreateNote,
    handleCreateDocument,
    handleCreateEmail,
    handleEditDeal,
    handleDeleteDeal,
    handleCancelDeal,
    handleWinDeal,
    handleLoseDeal,
    handleCreateDeal,
    handleCloseDealModal,
    getChatPreview
  };
};
