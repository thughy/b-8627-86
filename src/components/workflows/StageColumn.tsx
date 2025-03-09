
import React from "react";
import { Stage, Deal } from "@/pages/Workflows/models/WorkflowModels";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import DealList from "./DealList";
import { getDealsByStage } from "./utils/dealUtils";
import { Droppable } from "react-beautiful-dnd";

interface StageColumnProps {
  stage: Stage;
  deals: Deal[];
  onDealClick: (deal: Deal) => void;
  onAction?: (action: string, data?: any) => void;
  pipelineId?: string;
  getChatPreview?: (dealId: string) => any[];
}

const StageColumn: React.FC<StageColumnProps> = ({
  stage,
  deals,
  onDealClick,
  onAction,
  pipelineId,
  getChatPreview
}) => {
  const stageDeals = getDealsByStage(deals, stage.id);
  
  return (
    <div className="flex-1 min-w-[300px]">
      <div className="bg-muted/40 rounded-md p-3 h-full flex flex-col border border-border/40">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-sm">{stage.title}</h3>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
            {stageDeals.length}
          </span>
        </div>
        
        <Droppable droppableId={stage.id}>
          {(provided) => (
            <div 
              className="space-y-3 flex-1 min-h-[200px] rounded-md p-2"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <DealList 
                deals={stageDeals} 
                onDealClick={onDealClick}
                getChatPreview={getChatPreview}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full mt-3 justify-start text-muted-foreground hover:text-foreground"
          onClick={() => {
            if (onAction) {
              onAction("createDeal", { stageId: stage.id, pipelineId });
            }
          }}
        >
          <Plus className="h-4 w-4 mr-1" />
          Adicionar Deal
        </Button>
      </div>
    </div>
  );
};

export default StageColumn;
