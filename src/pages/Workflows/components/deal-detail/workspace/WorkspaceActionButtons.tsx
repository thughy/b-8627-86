
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, FileText, CheckSquare, Image, Mail, File } from 'lucide-react';
import { Asset } from '@/pages/Workflows/models/WorkflowModels';

interface WorkspaceActionButtonsProps {
  onCreateAsset?: (dealId: string, asset?: Partial<Asset>) => void;
  onCreateTask?: (dealId: string) => void;
  onCreateNote?: (dealId: string) => void;
  onCreateDocument?: (dealId: string) => void;
  onCreateEmail?: (dealId: string) => void;
  dealId: string;
}

const WorkspaceActionButtons: React.FC<WorkspaceActionButtonsProps> = React.memo(({ 
  onCreateAsset,
  onCreateTask,
  onCreateNote,
  onCreateDocument,
  onCreateEmail,
  dealId
}) => {
  // Create stable callback functions to prevent re-renders
  const handleCreateAsset = React.useCallback(() => {
    onCreateAsset?.(dealId);
  }, [onCreateAsset, dealId]);
  
  const handleCreateTask = React.useCallback(() => {
    onCreateTask?.(dealId);
  }, [onCreateTask, dealId]);
  
  const handleCreateNote = React.useCallback(() => {
    onCreateNote?.(dealId);
  }, [onCreateNote, dealId]);
  
  const handleCreateDocument = React.useCallback(() => {
    onCreateDocument?.(dealId);
  }, [onCreateDocument, dealId]);
  
  const handleCreateEmail = React.useCallback(() => {
    onCreateEmail?.(dealId);
  }, [onCreateEmail, dealId]);

  return (
    <div className="flex gap-2 overflow-x-auto">
      <Button 
        size="sm" 
        variant="outline" 
        onClick={handleCreateAsset} 
        className="whitespace-nowrap"
      >
        <Image className="h-4 w-4 mr-1" />
        Asset
      </Button>
      <Button 
        size="sm" 
        variant="outline" 
        onClick={handleCreateTask} 
        className="whitespace-nowrap"
      >
        <CheckSquare className="h-4 w-4 mr-1" />
        Tarefa
      </Button>
      <Button 
        size="sm" 
        variant="outline" 
        onClick={handleCreateNote} 
        className="whitespace-nowrap"
      >
        <FileText className="h-4 w-4 mr-1" />
        Nota
      </Button>
      <Button 
        size="sm" 
        variant="outline" 
        onClick={handleCreateDocument} 
        className="whitespace-nowrap"
      >
        <File className="h-4 w-4 mr-1" />
        Documento
      </Button>
      <Button 
        size="sm" 
        variant="outline" 
        onClick={handleCreateEmail} 
        className="whitespace-nowrap"
      >
        <Mail className="h-4 w-4 mr-1" />
        Email
      </Button>
    </div>
  );
});

WorkspaceActionButtons.displayName = 'WorkspaceActionButtons';

export default WorkspaceActionButtons;
