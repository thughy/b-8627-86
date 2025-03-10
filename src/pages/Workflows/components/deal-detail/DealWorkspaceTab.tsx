
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Asset, Deal } from '@/pages/Workflows/models/WorkflowModels';
import ChatSection from './workspace/ChatSection';
import FocusTabContent from './workspace/FocusTabContent';
import HistoryTabContent from './workspace/HistoryTabContent';
import WorkspaceActionButtons from './workspace/WorkspaceActionButtons';
import { useChatState } from './workspace/hooks/useChatState';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

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
  const [activeTab, setActiveTab] = React.useState('chat');
  const [activeFilter, setActiveFilter] = useState('all');
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

  // Lista de filtros disponíveis
  const filters = [
    { id: 'all', label: 'Todos' },
    { id: 'notes', label: 'Notas' },
    { id: 'tasks', label: 'Tarefas' },
    { id: 'emails', label: 'Emails' },
    { id: 'assets', label: 'Assets' },
    { id: 'documents', label: 'Documentos' }
  ];

  return (
    <div className="p-4">
      {/* Barra superior com tabs e ações */}
      <div className="flex justify-between items-center mb-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
          <TabsList>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="focus">Foco</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
          </TabsList>
        </Tabs>
        <WorkspaceActionButtons 
          dealId={deal.id}
          onCreateNote={() => onCreateNote?.(deal.id)}
          onCreateTask={() => onCreateTask?.(deal.id)}
          onCreateAsset={() => onCreateAsset?.(deal.id)}
          onCreateDocument={() => onCreateDocument?.(deal.id)}
          onCreateEmail={() => onCreateEmail?.(deal.id)}
        />
      </div>
      
      {/* Filtros comuns para todas as abas */}
      <div className="flex flex-wrap gap-2 mb-4">
        {filters.map(filter => (
          <Button
            key={filter.id}
            variant={activeFilter === filter.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter(filter.id)}
            className="flex items-center gap-1"
          >
            {filter.id === 'all' && <Filter className="h-3.5 w-3.5" />}
            {filter.label}
          </Button>
        ))}
      </div>
      
      {/* Conteúdo das abas */}
      <TabsContent value="chat" className="border-none p-0">
        <ChatSection 
          dealId={deal.id}
          messages={chatState.messages}
          messageText={chatState.messageText}
          setMessageText={chatState.setMessageText}
          sendMessage={chatState.sendMessage}
          typing={chatState.typing}
          attachments={chatState.attachments}
          handleAddAttachment={chatState.handleAddAttachment}
          handleRemoveAttachment={chatState.handleRemoveAttachment}
          filter={activeFilter}
        />
      </TabsContent>
      
      <TabsContent value="focus" className="border-none p-0">
        <FocusTabContent 
          deal={deal} 
          assets={dummyAssets}
          onCreateAsset={onCreateAsset}
          filter={activeFilter}
        />
      </TabsContent>
      
      <TabsContent value="history" className="border-none p-0">
        <HistoryTabContent 
          deal={deal} 
          filter={activeFilter} 
        />
      </TabsContent>
    </div>
  );
};

export default DealWorkspaceTab;
