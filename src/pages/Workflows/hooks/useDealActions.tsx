
import { useState } from 'react';
import { Deal, Asset } from '@/pages/Workflows/models/WorkflowModels';
import { useToast } from '@/hooks/use-toast';

export const useDealActions = () => {
  const { toast } = useToast();
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [isDealModalOpen, setIsDealModalOpen] = useState(false);
  const [isAssetModalOpen, setIsAssetModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  
  const handleDealClick = (deal: Deal) => {
    setSelectedDeal(deal);
    setIsDealModalOpen(true);
  };

  const handleCreateAsset = (dealId: string, asset?: Partial<Asset>) => {
    console.log(`Criando asset para deal ${dealId}:`, asset || {});
    
    // If an asset is provided, open the modal with that asset
    if (asset) {
      setSelectedAsset({
        id: `asset-${Date.now()}`,
        dealId: dealId,
        title: asset.title || "Novo Asset",
        description: asset.description || "",
        type: asset.type || "Documento",
        status: "open",
        createdAt: new Date(),
        updatedAt: new Date()
      } as Asset);
    } else {
      setSelectedAsset({
        id: `asset-${Date.now()}`,
        dealId: dealId,
        title: "Novo Asset",
        description: "",
        type: "Documento",
        status: "open",
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    
    setIsAssetModalOpen(true);
  };

  const handleAssetClick = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsAssetModalOpen(true);
  };

  const handleCreateTask = (dealId: string) => {
    console.log(`Criando tarefa para deal ${dealId}`);
    toast({
      title: "Tarefa Criada",
      description: "Nova tarefa adicionada ao negócio",
    });
  };

  const handleCreateNote = (dealId: string) => {
    console.log(`Criando nota para deal ${dealId}`);
    toast({
      title: "Nota Criada",
      description: "Nova nota adicionada ao negócio",
    });
  };

  const handleCreateDocument = (dealId: string) => {
    console.log(`Criando documento para deal ${dealId}`);
    toast({
      title: "Documento Criado",
      description: "Novo documento adicionado ao negócio",
    });
  };

  const handleCreateEmail = (dealId: string) => {
    console.log(`Criando email para deal ${dealId}`);
    toast({
      title: "Email Criado",
      description: "Novo email adicionado ao negócio",
    });
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

  const handleCloseAssetModal = () => {
    setIsAssetModalOpen(false);
    setSelectedAsset(null);
  };

  const handleEditAsset = (asset: Asset) => {
    console.log('Editando asset:', asset);
    setIsAssetModalOpen(false);
  };

  const handleDeleteAsset = (assetId: string) => {
    console.log('Excluindo asset:', assetId);
    setIsAssetModalOpen(false);
  };

  const handleCompleteAsset = (assetId: string) => {
    console.log('Concluindo asset:', assetId);
  };

  const handleCancelAsset = (assetId: string) => {
    console.log('Cancelando asset:', assetId);
  };

  const handleCreateNoteForAsset = (assetId: string) => {
    console.log(`Criando nota para asset ${assetId}`);
    toast({
      title: "Nota Criada",
      description: "Nova nota adicionada ao asset",
    });
  };

  const handleCreateDocumentForAsset = (assetId: string) => {
    console.log(`Criando documento para asset ${assetId}`);
    toast({
      title: "Documento Criado",
      description: "Novo documento adicionado ao asset",
    });
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
    isAssetModalOpen,
    setIsAssetModalOpen,
    selectedAsset,
    setSelectedAsset,
    handleDealClick,
    handleAssetClick,
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
    handleCloseAssetModal,
    handleEditAsset,
    handleDeleteAsset,
    handleCompleteAsset,
    handleCancelAsset,
    handleCreateNoteForAsset,
    handleCreateDocumentForAsset,
    getChatPreview
  };
};
