
import React, { useState, useEffect } from 'react';
import { Asset, Deal } from '@/pages/Workflows/models/WorkflowModels';
import ActionsSidebar from './workspace/ActionsSidebar';
import ChatSection from './workspace/ChatSection';
import FocusSection from './workspace/FocusSection';
import HistorySection from './workspace/HistorySection';
import { useToast } from '@/hooks/use-toast';
import { useChatState } from '@/pages/Workflows/components/deal-detail/workspace/hooks/useChatState';

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
  
  // Get chat state from the useChatState hook
  const chatState = useChatState(dealId || '');
  
  // Set chat as default active section when deal changes
  useEffect(() => {
    if (dealId) {
      setActiveSection('chat');
    }
  }, [dealId]);

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
            messages={chatState.messages}
            messageText={chatState.messageText}
            setMessageText={chatState.setMessageText}
            sendMessage={chatState.sendMessage}
            typing={chatState.typing}
            attachments={chatState.attachments}
            handleAddAttachment={chatState.handleAddAttachment}
            handleRemoveAttachment={chatState.handleRemoveAttachment}
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

