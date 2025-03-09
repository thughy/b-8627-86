
import React, { useState } from 'react';
import { Deal, Asset } from '@/pages/Workflows/models/WorkflowModels';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Import refactored components
import DealHeader from './deal-detail/DealHeader';
import DealSummary from './deal-detail/DealSummary';
import DealDetailsTab from './deal-detail/DealDetailsTab';
import WorkspaceTab from './deal-detail/WorkspaceTab';

interface DealDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  deal: Deal;
  onCreateAsset: (dealId: string, asset: Partial<Asset>) => void;
  onEditDeal?: (deal: Deal) => void;
  onDeleteDeal?: (dealId: string) => void;
  onCancelDeal?: (dealId: string) => void;
}

const DealDetailModal: React.FC<DealDetailModalProps> = ({
  isOpen,
  onClose,
  deal,
  onCreateAsset,
  onEditDeal,
  onDeleteDeal,
  onCancelDeal
}) => {
  const [activeTab, setActiveTab] = useState('workspace');

  // Example assets for this deal
  const assets: Asset[] = [
    {
      id: 'asset-1',
      dealId: deal.id,
      title: 'Proposta Comercial',
      description: 'Documento com detalhes da proposta',
      type: 'document',
      status: 'completed',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'asset-2',
      dealId: deal.id,
      title: 'Contrato de Serviço',
      description: 'Contrato para assinatura',
      type: 'contract',
      status: 'processing',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  const handleCreateAsset = () => {
    const newAsset: Partial<Asset> = {
      title: 'Novo Asset',
      description: 'Descrição do novo asset',
      type: 'document',
      status: 'open'
    };
    onCreateAsset(deal.id, newAsset);
  };

  // Counters para exibir na cabeçalho
  const counters = {
    chat: 2,
    assets: assets.length,
    tasks: 0,
    notes: 0,
    emails: 0
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DealHeader 
          deal={deal}
          onEditDeal={onEditDeal}
          onDeleteDeal={onDeleteDeal}
          onCancelDeal={onCancelDeal}
        />
        
        {/* Informações Resumidas */}
        <DealSummary deal={deal} counters={counters} />
        
        <div className="flex flex-1 overflow-hidden">
          <Tabs defaultValue="workspace" className="flex-1 flex flex-col" onValueChange={setActiveTab} value={activeTab}>
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="details">Detalhes</TabsTrigger>
              <TabsTrigger value="workspace">Workspace</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="flex-1 overflow-hidden">
              <DealDetailsTab deal={deal} />
            </TabsContent>
            
            <TabsContent value="workspace" className="flex-1 overflow-hidden">
              <WorkspaceTab 
                assets={assets}
                onCreateAsset={handleCreateAsset}
                dealId={deal.id}
                deal={deal}
              />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DealDetailModal;
