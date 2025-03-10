
import { useState } from 'react';
import { Deal, Asset } from '@/pages/Workflows/models/WorkflowModels';

export const useDealActions = () => {
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [isDealModalOpen, setIsDealModalOpen] = useState(false);
  
  const handleDealClick = (deal: Deal) => {
    setSelectedDeal(deal);
    setIsDealModalOpen(true);
  };

  const handleCreateAsset = (dealId: string, asset?: Partial<Asset>) => {
    console.log(`Criando asset para deal ${dealId}:`, asset || {});
  };

  const handleCreateTask = (dealId: string) => {
    console.log(`Criando tarefa para deal ${dealId}`);
  };

  const handleCreateNote = (dealId: string) => {
    console.log(`Criando nota para deal ${dealId}`);
  };

  const handleCreateDocument = (dealId: string) => {
    console.log(`Criando documento para deal ${dealId}`);
  };

  const handleCreateEmail = (dealId: string) => {
    console.log(`Criando email para deal ${dealId}`);
  };

  const handleEditDeal = (deal: Deal) => {
    console.log('Editando deal:', deal);
  };

  const handleDeleteDeal = (dealId: string) => {
    console.log('Excluindo deal:', dealId);
    setIsDealModalOpen(false);
    return dealId; // Return the ID so the parent hook can filter it out
  };

  const handleCancelDeal = (dealId: string) => {
    console.log('Cancelando deal:', dealId);
    return { dealId, status: 'lost', reasonForLoss: 'Cancelado pelo usuário' };
  };

  const handleWinDeal = (dealId: string) => {
    console.log('Marcando deal como ganho:', dealId);
    return { dealId, status: 'won' };
  };

  const handleLoseDeal = (dealId: string, reason: string = 'Outro') => {
    console.log('Marcando deal como perdido:', dealId, 'Motivo:', reason);
    return { dealId, status: 'lost', reasonForLoss: reason };
  };

  const handleCreateDeal = () => {
    console.log('Criar novo negócio');
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
