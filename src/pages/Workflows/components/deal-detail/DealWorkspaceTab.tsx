
import React, { useState } from 'react';
import { Deal, Asset } from '@/pages/Workflows/models/WorkflowModels';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCircle, FileText, History } from 'lucide-react';
import { useChatMessages } from '@/pages/Workflows/hooks/useChatMessages';
import ChatSection from './workspace/ChatSection';
import FocusTabContent from './workspace/FocusTabContent';
import HistoryTabContent from './workspace/HistoryTabContent';
import WorkspaceActionButtons from './workspace/WorkspaceActionButtons';

interface DealWorkspaceTabProps {
  deal: Deal;
  onCreateAsset?: (dealId: string, asset: Partial<Asset>) => void;
}

const DealWorkspaceTab: React.FC<DealWorkspaceTabProps> = ({ deal, onCreateAsset }) => {
  const [activeTab, setActiveTab] = useState('chat');
  const { messages } = useChatMessages(deal.id);

  const handleCreateAsset = () => {
    if (onCreateAsset) {
      const newAsset: Partial<Asset> = {
        title: 'Novo Asset',
        description: 'Descrição do novo asset',
        type: 'document',
        status: 'open'
      };
      onCreateAsset(deal.id, newAsset);
    }
  };

  // Exemplos de ativos para este negócio (em um cenário real, seriam carregados da API)
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

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <Tabs defaultValue="chat" className="w-full" onValueChange={setActiveTab} value={activeTab}>
          <TabsList>
            <TabsTrigger value="chat" className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="focus" className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              Focus
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-1">
              <History className="h-4 w-4" />
              Histórico
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <WorkspaceActionButtons onCreateAsset={handleCreateAsset} />
      </div>

      <div className="flex-1 overflow-hidden">
        <TabsContent value="chat" className="h-full">
          <ChatSection dealId={deal.id} messages={messages} />
        </TabsContent>
        
        <TabsContent value="focus" className="h-full">
          <FocusTabContent 
            deal={deal}
            assets={assets}
            onCreateAsset={onCreateAsset}
          />
        </TabsContent>
        
        <TabsContent value="history" className="h-full">
          <HistoryTabContent />
        </TabsContent>
      </div>
    </div>
  );
};

export default DealWorkspaceTab;
