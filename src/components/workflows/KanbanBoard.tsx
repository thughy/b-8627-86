
import React from "react";
import { Stage, Deal } from "@/pages/Workflows/models/WorkflowModels";
import { DropResult } from "react-beautiful-dnd";
import StageColumn from "./StageColumn";

interface KanbanBoardProps {
  stages: Stage[];
  pipelineId?: string;
  onAction?: (action: string, data?: any) => void;
  deals: Deal[];
  onDragEnd: (result: DropResult) => void;
  onDealClick: (deal: Deal) => void;
  getChatPreview?: (dealId: string) => any[];
}

const KanbanBoard = ({ 
  stages, 
  pipelineId, 
  deals, 
  onDragEnd, 
  onDealClick,
  onAction,
  getChatPreview 
}: KanbanBoardProps) => {
  // Sort stages by order
  const sortedStages = [...stages].sort((a, b) => a.order - b.order);
  
  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-4" style={{ minWidth: Math.max(stages.length * 320, 100) + "px" }}>
        {sortedStages.map((stage) => (
          <StageColumn
            key={stage.id}
            stage={stage}
            deals={deals}
            onDealClick={onDealClick}
            onAction={onAction}
            pipelineId={pipelineId}
            getChatPreview={getChatPreview}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
