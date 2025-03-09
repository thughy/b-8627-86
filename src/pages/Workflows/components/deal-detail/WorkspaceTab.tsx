
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Asset, Deal } from '@/pages/Workflows/models/WorkflowModels';
import ChatSection from './workspace/ChatSection';
import FocusTabContent from './workspace/FocusTabContent';
import HistoryTabContent from './workspace/HistoryTabContent';
import WorkspaceActionButtons from './workspace/WorkspaceActionButtons';
import { useChatState } from './workspace/hooks/useChatState';

interface WorkspaceTabProps {
  deal: Deal;
  onCreateAsset?: (dealId: string, asset?: Partial<Asset>) => void;
  onCreateTask?: (dealId: string) => void;
  onCreateNote?: (dealId: string) => void;
  onCreateDocument?: (dealId: string) => void;
  onCreateEmail?: (dealId: string) => void;
}

const WorkspaceTab: React.FC<WorkspaceTabProps> = ({ 
  deal,
  onCreateAsset,
  onCreateTask,
  onCreateNote,
  onCreateDocument,
  onCreateEmail
}) => {
  const [activeTab, setActiveTab] = useState('chat');
  const chatState = useChatState(deal.id);

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
            messages={chatState.messages}
            messageText={chatState.messageText}
            setMessageText={chatState.setMessageText}
            sendMessage={chatState.sendMessage}
            typing={chatState.typing}
            attachments={chatState.attachments}
            handleAddAttachment={chatState.handleAddAttachment}
            handleRemoveAttachment={chatState.handleRemoveAttachment}
          />
        </TabsContent>
        
        <TabsContent value="focus" className="border-none p-0">
          <FocusTabContent 
            deal={deal} 
            assets={[]} // We need to provide some assets here
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

export default WorkspaceTab;
