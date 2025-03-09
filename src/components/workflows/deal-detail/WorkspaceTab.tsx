
import React, { useState, useEffect } from 'react';
import { Asset, Deal } from '@/pages/Workflows/models/WorkflowModels';
import ActionsSidebar from './workspace/ActionsSidebar';
import ChatSection from './workspace/ChatSection';
import FocusSection from './workspace/FocusSection';
import HistorySection from './workspace/HistorySection';
import { useToast } from '@/hooks/use-toast';
import { ChatMessage } from '@/pages/Workflows/hooks/useChatMessages';

interface WorkspaceTabProps {
  assets: Asset[];
  onCreateAsset: () => void;
  dealId?: string;
  deal?: Deal;
}

const WorkspaceTab: React.FC<WorkspaceTabProps> = ({ 
  assets, 
  onCreateAsset,
  dealId,
  deal
}) => {
  const [activeSection, setActiveSection] = useState<string>('chat');
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<string>('all');
  const { toast } = useToast();
  
  // Simplified approach using local state for messages
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Set chat as default active section when deal changes
  useEffect(() => {
    if (dealId) {
      setActiveSection('chat');
    }
  }, [dealId]);

  // Simplified placeholder function for sending messages
  const handleSendMessage = (content: string) => {
    console.log("Message sent (disabled):", content);
    // This functionality is disabled for now
  };

  const handleCreateAction = (actionType: string) => {
    switch (actionType) {
      case 'asset':
        onCreateAsset();
        break;
      case 'note':
      case 'task':
      case 'document':
      case 'email':
        toast({
          title: `Criar ${actionType}`,
          description: "Funcionalidade em desenvolvimento."
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 h-full overflow-hidden">
      <ActionsSidebar 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onCreateAction={handleCreateAction}
      />
      
      <div className="col-span-5 md:col-span-4 flex flex-col overflow-hidden">
        {activeSection === 'chat' && (
          <ChatSection 
            dealId={dealId || ''} 
            messages={messages} 
            onSendMessage={handleSendMessage}
          />
        )}
        
        {activeSection === 'focus' && (
          <FocusSection 
            activeTab={activeWorkspaceTab} 
            onTabChange={setActiveWorkspaceTab} 
            assets={assets}
          />
        )}
        
        {activeSection === 'history' && <HistorySection dealId={dealId} />}
      </div>
    </div>
  );
};

export default WorkspaceTab;
