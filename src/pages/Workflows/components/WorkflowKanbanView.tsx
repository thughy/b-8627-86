
import React from 'react';
import KanbanBoard from '@/components/workflows/KanbanBoard';
import { Stage, Deal } from '@/pages/Workflows/models/WorkflowModels';

interface WorkflowKanbanViewProps {
  stages: Stage[];
  deals: Deal[];
  onDragEnd: (result: any) => void;
  onDealClick: (deal: Deal) => void;
  onCreateDeal: () => void;
  selectedPipeline: string | null;
  pipelines: { id: string; title: string }[];
  onPipelineChange: (pipelineId: string) => void;
  getChatPreview?: (dealId: string) => any[];
}

const WorkflowKanbanView: React.FC<WorkflowKanbanViewProps> = ({
  stages,
  deals,
  onDragEnd,
  onDealClick,
  selectedPipeline,
  getChatPreview
}) => {
  // Filter stages by the selected pipeline
  const filteredStages = stages.filter(
    stage => !selectedPipeline || stage.pipelineId === selectedPipeline
  );
  
  if (filteredStages.length === 0) {
    return (
      <div className="p-8 text-center">
        <h3 className="text-lg font-medium mb-2">Nenhum estágio encontrado</h3>
        <p className="text-muted-foreground mb-4">
          Selecione um pipeline ou configure estágios no pipeline atual.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <KanbanBoard
        stages={filteredStages}
        deals={deals}
        pipelineId={selectedPipeline || undefined}
        onDragEnd={onDragEnd}
        onDealClick={onDealClick}
        getChatPreview={getChatPreview}
      />
    </div>
  );
};

export default WorkflowKanbanView;
