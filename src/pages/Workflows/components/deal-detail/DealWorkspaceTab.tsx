
import React, { useState } from 'react';
import { Deal, Asset } from '@/pages/Workflows/models/WorkflowModels';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCircle, FileText, History, CheckSquare, Mail, Image, File } from 'lucide-react';
import { useChatMessages } from '@/pages/Workflows/hooks/useChatMessages';
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
  const [activeTab, setActiveTab] = useState('chat');
  const { messages, sendMessage } = useChatMessages(deal.id);

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
    <div className="h-full flex flex-col p-4">
      <div className="flex justify-between items-center mb-4">
        <Tabs defaultValue="chat" className="w-full" onValueChange={setActiveTab} value={activeTab}>
          <div className="flex justify-between items-center">
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
          
            <div className="ml-auto">
              <WorkspaceActionButtons 
                dealId={deal.id}
                onCreateAsset={onCreateAsset}
                onCreateTask={onCreateTask}
                onCreateNote={onCreateNote}
                onCreateDocument={onCreateDocument}
                onCreateEmail={onCreateEmail}
              />
            </div>
          </div>
        </Tabs>
      </div>

      <div className="flex-1 overflow-auto">
        <Tabs defaultValue="chat" value={activeTab} className="h-full">
          <TabsContent value="chat" className="h-full mt-0">
            <ChatSection dealId={deal.id} messages={messages} />
          </TabsContent>
          
          <TabsContent value="focus" className="h-full mt-0">
            <FocusTabContent 
              deal={deal}
              assets={assets}
              onCreateAsset={onCreateAsset}
            />
          </TabsContent>
          
          <TabsContent value="history" className="h-full mt-0">
            <HistoryTabContent />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DealWorkspaceTab;
