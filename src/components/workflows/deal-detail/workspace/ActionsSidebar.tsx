
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, CheckSquare, Package, Mail, MessageSquare, History } from 'lucide-react';

interface ActionsSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onCreateAsset: () => void;
}

const ActionsSidebar: React.FC<ActionsSidebarProps> = ({
  activeSection,
  onSectionChange,
  onCreateAsset
}) => {
  return (
    <div className="col-span-5 md:col-span-1 border-r p-3 flex flex-col">
      <h3 className="font-medium mb-3">Ações</h3>
      <div className="space-y-2">
        <Button variant="outline" className="w-full justify-start" size="sm">
          <FileText className="h-4 w-4 mr-2" />
          Nota
        </Button>
        <Button variant="outline" className="w-full justify-start" size="sm">
          <CheckSquare className="h-4 w-4 mr-2" />
          Tarefa
        </Button>
        <Button variant="outline" className="w-full justify-start" size="sm" onClick={onCreateAsset}>
          <Package className="h-4 w-4 mr-2" />
          Asset
        </Button>
        <Button variant="outline" className="w-full justify-start" size="sm">
          <FileText className="h-4 w-4 mr-2" />
          Documento
        </Button>
        <Button variant="outline" className="w-full justify-start" size="sm">
          <Mail className="h-4 w-4 mr-2" />
          Email
        </Button>
      </div>

      <div className="mt-4 pt-4 border-t">
        <h3 className="font-medium mb-3">Seções</h3>
        <div className="space-y-2">
          <Button 
            variant={activeSection === 'chat' ? 'default' : 'outline'} 
            className="w-full justify-start" 
            size="sm"
            onClick={() => onSectionChange('chat')}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Chat
          </Button>
          <Button 
            variant={activeSection === 'focus' ? 'default' : 'outline'} 
            className="w-full justify-start" 
            size="sm"
            onClick={() => onSectionChange('focus')}
          >
            <Package className="h-4 w-4 mr-2" />
            Focus
          </Button>
          <Button 
            variant={activeSection === 'history' ? 'default' : 'outline'} 
            className="w-full justify-start" 
            size="sm"
            onClick={() => onSectionChange('history')}
          >
            <History className="h-4 w-4 mr-2" />
            Histórico
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActionsSidebar;
