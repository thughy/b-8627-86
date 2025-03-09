
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, FileText, CheckSquare, Image, Mail, File } from 'lucide-react';
import { Asset } from '@/pages/Workflows/models/WorkflowModels';

interface WorkspaceActionButtonsProps {
  onCreateAsset?: () => void;
}

const WorkspaceActionButtons: React.FC<WorkspaceActionButtonsProps> = ({ onCreateAsset }) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      <Button size="sm" variant="outline" onClick={onCreateAsset} className="whitespace-nowrap">
        <Image className="h-4 w-4 mr-1" />
        Asset
      </Button>
      <Button size="sm" variant="outline" className="whitespace-nowrap">
        <CheckSquare className="h-4 w-4 mr-1" />
        Tarefa
      </Button>
      <Button size="sm" variant="outline" className="whitespace-nowrap">
        <FileText className="h-4 w-4 mr-1" />
        Nota
      </Button>
      <Button size="sm" variant="outline" className="whitespace-nowrap">
        <File className="h-4 w-4 mr-1" />
        Documento
      </Button>
      <Button size="sm" variant="outline" className="whitespace-nowrap">
        <Mail className="h-4 w-4 mr-1" />
        Email
      </Button>
    </div>
  );
};

export default WorkspaceActionButtons;
