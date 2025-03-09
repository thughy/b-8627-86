
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Asset } from '@/pages/Workflows/models/WorkflowModels';

interface WorkspaceActionButtonsProps {
  onCreateAsset?: () => void;
}

const WorkspaceActionButtons: React.FC<WorkspaceActionButtonsProps> = ({ onCreateAsset }) => {
  return (
    <div className="flex gap-2">
      <Button size="sm" variant="outline" onClick={onCreateAsset}>
        <Plus className="h-4 w-4 mr-1" />
        Asset
      </Button>
      <Button size="sm" variant="outline">
        <Plus className="h-4 w-4 mr-1" />
        Tarefa
      </Button>
      <Button size="sm" variant="outline">
        <Plus className="h-4 w-4 mr-1" />
        Nota
      </Button>
    </div>
  );
};

export default WorkspaceActionButtons;
