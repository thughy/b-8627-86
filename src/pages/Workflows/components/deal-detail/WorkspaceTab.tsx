
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
  const [activeFilter, setActiveFilter] = useState('all'); // Add filter state
  const chatState = useChatState(deal.id);

  // Create a wrapper for the sendMessage function to match the expected type
  const handleSendMessage = () => {
    if (chatState.messageText.trim() || chatState.attachments.length > 0) {
      chatState.sendMessage(chatState.messageText);
    }
  };

  // Create a wrapper for handleRemoveAttachment to match the expected type
  const handleRemoveAttachment = (id: string) => {
    // Find the index of the attachment with the given id
    const index = chatState.attachments.findIndex(att => att.id === id);
    if (index !== -1) {
      chatState.handleRemoveAttachment(index);
    }
  };

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
            sendMessage={handleSendMessage}
            typing={chatState.typing}
            attachments={chatState.attachments}
            handleAddAttachment={chatState.handleAddAttachment}
            handleRemoveAttachment={handleRemoveAttachment}
            filter={activeFilter}
          />
        </TabsContent>
        
        <TabsContent value="focus" className="border-none p-0">
          <FocusTabContent 
            deal={deal} 
            assets={[]} // We need to provide some assets here
            onCreateAsset={onCreateAsset}
            filter={activeFilter} // Add filter prop
          />
        </TabsContent>
        
        <TabsContent value="history" className="border-none p-0">
          <HistoryTabContent 
            deal={deal} 
            filter={activeFilter} // Add filter prop
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkspaceTab;
