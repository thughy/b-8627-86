
import React from "react";
import { Stage, Deal } from "@/pages/Workflows/models/WorkflowModels";
import { getDealsByStage } from "@/pages/Workflows/services/workflowService";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import DealCard from "./DealCard";

interface KanbanBoardProps {
  stages: Stage[];
  pipelineId: string;
  onAction: (action: string, data?: any) => void;
}

const KanbanBoard = ({ stages, pipelineId, onAction }: KanbanBoardProps) => {
  // Ordenar estágios pela ordem
  const sortedStages = [...stages].sort((a, b) => a.order - b.order);
  
  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-4" style={{ minWidth: Math.max(stages.length * 320, 100) + "px" }}>
        {sortedStages.map((stage) => {
          const deals = getDealsByStage(stage.id);
          return (
            <div key={stage.id} className="flex-1 min-w-[300px]">
              <div className="bg-muted/40 rounded-md p-3 h-full flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-sm">{stage.title}</h3>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    {deals.length}
                  </span>
                </div>
                
                <div className="space-y-3 flex-1 min-h-[200px]">
                  {deals.length > 0 ? (
                    deals.map((deal) => (
                      <DealCard 
                        key={deal.id} 
                        deal={deal} 
                        onAction={onAction} 
                      />
                    ))
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-sm text-muted-foreground">Sem deals</p>
                    </div>
                  )}
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full mt-3 justify-start text-muted-foreground hover:text-foreground"
                  onClick={() => onAction("createDeal", { stageId: stage.id, pipelineId })}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Adicionar Deal
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KanbanBoard;
