
import React, { useState } from 'react';
import { Asset } from '@/pages/Workflows/models/WorkflowModels';
import ActionsSidebar from './workspace/ActionsSidebar';
import ChatSection from './workspace/ChatSection';
import FocusSection from './workspace/FocusSection';
import HistorySection from './workspace/HistorySection';

interface WorkspaceTabProps {
  assets: Asset[];
  onCreateAsset: () => void;
  dealId?: string;
}

const WorkspaceTab: React.FC<WorkspaceTabProps> = ({ 
  assets, 
  onCreateAsset,
  dealId 
}) => {
  const [activeSection, setActiveSection] = useState<string>('focus');
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<string>('all');

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 h-full overflow-hidden">
      <ActionsSidebar 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onCreateAsset={onCreateAsset}
      />
      
      <div className="col-span-5 md:col-span-4 flex flex-col overflow-hidden">
        {activeSection === 'chat' && <ChatSection dealId={dealId} />}
        
        {activeSection === 'focus' && (
          <FocusSection 
            activeTab={activeWorkspaceTab} 
            onTabChange={setActiveWorkspaceTab} 
            assets={assets}
          />
        )}
        
        {activeSection === 'history' && <HistorySection />}
      </div>
    </div>
  );
};

export default WorkspaceTab;
