
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, FileText, CheckSquare, Image, Mail, File } from 'lucide-react';
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
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuItem onClick={handleCreateAsset}>
            <Image className="h-4 w-4 mr-2" />
            Asset
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCreateTask}>
            <CheckSquare className="h-4 w-4 mr-2" />
            Tarefa
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCreateNote}>
            <FileText className="h-4 w-4 mr-2" />
            Nota
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCreateDocument}>
            <File className="h-4 w-4 mr-2" />
            Documento
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCreateEmail}>
            <Mail className="h-4 w-4 mr-2" />
            Email
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
});

WorkspaceActionButtons.displayName = 'WorkspaceActionButtons';

export default WorkspaceActionButtons;

