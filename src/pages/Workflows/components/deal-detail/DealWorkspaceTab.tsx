
import React, { useState } from 'react';
import { Deal, Asset } from '@/pages/Workflows/models/WorkflowModels';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCircle, FileText, History, CheckSquare, Mail, Image, File } from 'lucide-react';
import ChatSection from './workspace/ChatSection';
import FocusTabContent from './workspace/FocusTabContent';
import HistoryTabContent from './workspace/HistoryTabContent';
import WorkspaceActionButtons from './workspace/WorkspaceActionButtons';
import { ScrollArea } from '@/components/ui/scroll-area';

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
  const [messages, setMessages] = useState<any[]>([]); // Just a placeholder until we implement hooks

  // Simplified handler that will be replaced later
  const handleSendMessage = (message: string) => {
    console.log("Message sent:", message);
    // This function is just a placeholder and doesn't actually add messages
    // Will be replaced with the real implementation later
  };

  // Example assets for this deal (in a real scenario, would be loaded from API)
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
    <div className="p-4">
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

      <div className="mt-4 h-[400px]">
        <Tabs defaultValue="chat" value={activeTab} className="w-full h-full">
          <TabsContent value="chat" className="mt-0 h-full">
            <ChatSection 
              dealId={deal.id} 
              messages={messages} 
              onSendMessage={handleSendMessage}
            />
          </TabsContent>
          
          <TabsContent value="focus" className="mt-0 h-full">
            <ScrollArea className="h-full">
              <FocusTabContent 
                deal={deal}
                assets={assets}
                onCreateAsset={onCreateAsset}
              />
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="history" className="mt-0 h-full">
            <ScrollArea className="h-full">
              <HistoryTabContent />
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DealWorkspaceTab;
