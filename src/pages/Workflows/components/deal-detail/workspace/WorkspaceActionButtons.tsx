
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { 
  MoreVertical, 
  FileText, 
  ClipboardList, 
  FolderKanban, 
  Mail, 
  Paperclip 
} from 'lucide-react';
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
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={handleCreateAsset}>
            <FolderKanban className="h-4 w-4 mr-2 text-blue-500" />
            Asset
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCreateTask}>
            <ClipboardList className="h-4 w-4 mr-2 text-green-500" />
            Tarefa
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCreateNote}>
            <FileText className="h-4 w-4 mr-2 text-yellow-500" />
            Nota
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCreateDocument}>
            <Paperclip className="h-4 w-4 mr-2 text-purple-500" />
            Anexo
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCreateEmail}>
            <Mail className="h-4 w-4 mr-2 text-red-500" />
            Email
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
});

WorkspaceActionButtons.displayName = 'WorkspaceActionButtons';

export default WorkspaceActionButtons;
