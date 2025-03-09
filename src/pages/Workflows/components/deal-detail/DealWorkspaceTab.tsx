
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Asset, Deal } from '@/pages/Workflows/models/WorkflowModels';
import { useChatMessages } from '../../hooks/useChatMessages';
import ChatSection from './workspace/ChatSection';
import FocusTabContent from './workspace/FocusTabContent';
import HistoryTabContent from './workspace/HistoryTabContent';
import WorkspaceActionButtons from './workspace/WorkspaceActionButtons';

interface DealWorkspaceTabProps {
  deal: Deal;
  onCreateAsset?: (dealId: string, asset?: Partial<Asset>) => void;
  onCreateTask?: (dealId: string) => void;
  onCreateNote?: (dealId: string) => void;
  onCreateDocument?: (dealId: string) => void;
  onCreateEmail?: (dealId: string) => void;
}

const DealWorkspaceTab: React.FC<DealWorkspaceTabProps> = ({
  deal,
  onCreateAsset,
  onCreateTask,
  onCreateNote,
  onCreateDocument,
  onCreateEmail
}) => {
  const { messages, sendMessage } = useChatMessages(deal.id);
  const [activeTab, setActiveTab] = React.useState('chat');

  // Exemplo de assets para este deal (em um cenário real, viriam da API)
  const dummyAssets: Asset[] = [
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
    <div className="p-4">
      <WorkspaceActionButtons 
        dealId={deal.id}
        onCreateNote={() => onCreateNote?.(deal.id)}
        onCreateTask={() => onCreateTask?.(deal.id)}
        onCreateAsset={() => onCreateAsset?.(deal.id)}
        onCreateDocument={() => onCreateDocument?.(deal.id)}
        onCreateEmail={() => onCreateEmail?.(deal.id)}
      />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-4">
        <TabsList className="mb-4">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="focus">Foco</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat" className="border-none p-0">
          <ChatSection 
            dealId={deal.id} 
            messages={messages}
            sendMessage={sendMessage}
          />
        </TabsContent>
        
        <TabsContent value="focus" className="border-none p-0">
          <FocusTabContent 
            deal={deal} 
            assets={dummyAssets}
            onCreateAsset={onCreateAsset}
          />
        </TabsContent>
        
        <TabsContent value="history" className="border-none p-0">
          <HistoryTabContent deal={deal} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DealWorkspaceTab;
