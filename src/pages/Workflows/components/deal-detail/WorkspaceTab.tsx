
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FocusTabContent from './workspace/FocusTabContent';
import HistoryTabContent from './workspace/HistoryTabContent';
import ChatSection from './workspace/ChatSection';
import { Deal } from '@/pages/Workflows/models/WorkflowModels';
import { useChatState } from './workspace/hooks/useChatState';

interface WorkspaceTabProps {
  deal: Deal;
}

const WorkspaceTab: React.FC<WorkspaceTabProps> = ({ deal }) => {
  const [activeTab, setActiveTab] = useState('chat');
  const chatState = useChatState(deal.id);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      <div className="md:col-span-2">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="focus">Foco</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="space-y-4">
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
          
          <TabsContent value="focus" className="space-y-4">
            <FocusTabContent deal={deal} />
          </TabsContent>
          
          <TabsContent value="history" className="space-y-4">
            <HistoryTabContent deal={deal} />
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="bg-muted/30 p-4 rounded-lg">
        {/* Sidebar content */}
        <h3 className="font-medium text-lg mb-3">Ações</h3>
        {/* Actions sidebar content goes here */}
      </div>
    </div>
  );
};

export default WorkspaceTab;
