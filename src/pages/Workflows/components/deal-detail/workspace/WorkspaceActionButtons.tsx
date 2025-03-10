
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

const WorkspaceActionButtons: React.FC<WorkspaceActionButtonsProps> = ({ 
  onCreateAsset,
  onCreateTask,
  onCreateNote,
  onCreateDocument,
  onCreateEmail,
  dealId
}) => {
  return (
    <div className="flex gap-2 overflow-x-auto">
      <Button 
        size="sm" 
        variant="outline" 
        onClick={() => onCreateAsset?.(dealId)} 
        className="whitespace-nowrap"
      >
        <Image className="h-4 w-4 mr-1" />
        Asset
      </Button>
      <Button 
        size="sm" 
        variant="outline" 
        onClick={() => onCreateTask?.(dealId)} 
        className="whitespace-nowrap"
      >
        <CheckSquare className="h-4 w-4 mr-1" />
        Tarefa
      </Button>
      <Button 
        size="sm" 
        variant="outline" 
        onClick={() => onCreateNote?.(dealId)} 
        className="whitespace-nowrap"
      >
        <FileText className="h-4 w-4 mr-1" />
        Nota
      </Button>
      <Button 
        size="sm" 
        variant="outline" 
        onClick={() => onCreateDocument?.(dealId)} 
        className="whitespace-nowrap"
      >
        <File className="h-4 w-4 mr-1" />
        Documento
      </Button>
      <Button 
        size="sm" 
        variant="outline" 
        onClick={() => onCreateEmail?.(dealId)} 
        className="whitespace-nowrap"
      >
        <Mail className="h-4 w-4 mr-1" />
        Email
      </Button>
    </div>
  );
};

export default WorkspaceActionButtons;
