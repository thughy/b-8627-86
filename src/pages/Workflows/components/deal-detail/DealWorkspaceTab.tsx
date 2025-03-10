
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Asset, Deal } from '@/pages/Workflows/models/WorkflowModels';
import ChatSection from './workspace/ChatSection';
import FocusTabContent from './workspace/FocusTabContent';
import HistoryTabContent from './workspace/HistoryTabContent';
import WorkspaceActionButtons from './workspace/WorkspaceActionButtons';
import { useChatState } from './workspace/hooks/useChatState';

interface DealWorkspaceTabProps {
  deal: Deal;
  onCreateAsset?: (dealId: string, asset?: Partial<Asset>) => void;
  onCreateTask?: (dealId: string) => void;
  onCreateNote?: (dealId: string) => void;
  onCreateDocument?: (dealId: string) => void;
  onCreateEmail?: (dealId: string) => void;
}

const filterOptions = [
  { id: 'all', label: 'Todos' },
  { id: 'notes', label: 'Notas' },
  { id: 'tasks', label: 'Tarefas' },
  { id: 'emails', label: 'Emails' },
  { id: 'assets', label: 'Assets' },
  { id: 'documents', label: 'Anexos' }
];

const DealWorkspaceTab: React.FC<DealWorkspaceTabProps> = ({
  deal,
  onCreateAsset,
  onCreateTask,
  onCreateNote,
  onCreateDocument,
  onCreateEmail
}) => {
  const [activeTab, setActiveTab] = React.useState('chat');
  const [filter, setFilter] = React.useState('all');
  const chatState = useChatState(deal.id);

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

  // Função wrapper para adapter o tipo para o ChatSection
  const handleSendMessage = () => {
    if (chatState.messageText.trim()) {
      chatState.sendMessage(chatState.messageText);
    }
  };

  // Função wrapper para adapter o tipo para o ChatSection
  const handleRemoveAttachment = (attachmentId: string) => {
    const index = parseInt(attachmentId, 10);
    if (!isNaN(index)) {
      chatState.handleRemoveAttachment(index);
    }
  };

  return (
    <div className="p-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="focus">Foco</TabsTrigger>
            <TabsTrigger value="history">Registros</TabsTrigger>
          </TabsList>
          
          {/* Filters moved inline with tabs, aligned to right */}
          <div className="flex items-center gap-2">
            <div className="flex flex-wrap gap-1">
              {filterOptions.map(filterOption => (
                <Button
                  key={filterOption.id}
                  variant={filter === filterOption.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(filterOption.id)}
                  className="h-8 px-2 text-xs"
                >
                  {filterOption.label}
                </Button>
              ))}
            </div>
            
            <WorkspaceActionButtons 
              dealId={deal.id}
              onCreateNote={onCreateNote}
              onCreateTask={onCreateTask}
              onCreateAsset={onCreateAsset}
              onCreateDocument={onCreateDocument}
              onCreateEmail={onCreateEmail}
            />
          </div>
        </div>
        
        <TabsContent value="chat" className="border-none p-0">
          <ChatSection 
            dealId={deal.id}
            messages={chatState.messages}
            messageText={chatState.messageText}
            setMessageText={chatState.setMessageText}
            sendMessage={handleSendMessage}
            typing={chatState.typing}
            attachments={chatState.attachments}
            handleAddAttachment={chatState.handleAddAttachment}
            handleRemoveAttachment={handleRemoveAttachment}
          />
        </TabsContent>
        
        <TabsContent value="focus" className="border-none p-0">
          <FocusTabContent 
            deal={deal} 
            assets={dummyAssets}
            filter={filter}
            onCreateAsset={onCreateAsset}
          />
        </TabsContent>
        
        <TabsContent value="history" className="border-none p-0">
          <HistoryTabContent 
            deal={deal} 
            filter={filter}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DealWorkspaceTab;
