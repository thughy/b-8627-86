
import React from "react";
import { Stage, Deal, Agent } from "@/pages/Workflows/models/WorkflowModels";
import { DropResult, DragDropContext } from "react-beautiful-dnd";
import StageColumn from "./StageColumn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface KanbanBoardProps {
  stages: Stage[];
  pipelineId?: string;
  agents?: Agent[];
  onAction?: (action: string, data?: any) => void;
  deals: Deal[];
  onDragEnd: (result: DropResult) => void;
  onDealClick: (deal: Deal) => void;
  onAgentSelect?: (stageId: string, agentId: string) => void;
  getChatPreview?: (dealId: string) => any[];
}

const KanbanBoard = ({ 
  stages, 
  pipelineId, 
  deals, 
  agents = [],
  onDragEnd, 
  onDealClick,
  onAction,
  onAgentSelect,
  getChatPreview 
}: KanbanBoardProps) => {
  // Sort stages by order
  const sortedStages = [...stages].sort((a, b) => a.order - b.order);
  
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4" style={{ minWidth: Math.max(stages.length * 320, 100) + "px" }}>
          {sortedStages.map((stage) => (
            <StageColumn
              key={stage.id}
              stage={stage}
              deals={deals}
              agents={agents}
              onDealClick={onDealClick}
              onAction={onAction}
              onAgentSelect={onAgentSelect}
              pipelineId={pipelineId}
              getChatPreview={getChatPreview}
            />
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
