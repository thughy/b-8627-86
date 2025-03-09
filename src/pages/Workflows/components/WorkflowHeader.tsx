
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface WorkflowHeaderProps {
  onCreateDeal: () => void;
}

const WorkflowHeader: React.FC<WorkflowHeaderProps> = ({ onCreateDeal }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <div className="text-2xl font-bold">Workflows</div>
      <Button onClick={onCreateDeal}>
        <Plus className="h-4 w-4 mr-2" />
        Novo Negócio
      </Button>
    </div>
  );
};

export default WorkflowHeader;
