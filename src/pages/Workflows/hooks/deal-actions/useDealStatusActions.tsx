
export const useDealStatusActions = () => {
  const handleDeleteDeal = (dealId: string) => {
    console.log('Excluindo deal:', dealId);
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

  const handleEditDeal = (deal: any) => {
    console.log('Editando deal:', deal);
    return deal;
  };

  const handleCreateDeal = () => {
    console.log('Criar novo negócio');
  };

  return {
    handleDeleteDeal,
    handleCancelDeal,
    handleWinDeal,
    handleLoseDeal,
    handleEditDeal,
    handleCreateDeal
  };
};
