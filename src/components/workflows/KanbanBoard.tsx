
import React from "react";
import { Stage, Deal } from "@/pages/Workflows/models/WorkflowModels";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DropResult } from "react-beautiful-dnd";

interface KanbanBoardProps {
  stages: Stage[];
  pipelineId?: string;
  onAction?: (action: string, data?: any) => void;
  deals: Deal[];
  onDragEnd: (result: DropResult) => void;
  onDealClick: (deal: Deal) => void;
}

const KanbanBoard = ({ 
  stages, 
  pipelineId, 
  deals, 
  onDragEnd, 
  onDealClick,
  onAction 
}: KanbanBoardProps) => {
  // Ordenar estágios pela ordem
  const sortedStages = [...stages].sort((a, b) => a.order - b.order);
  
  const getDealsByStage = (stageId: string) => {
    return deals.filter(deal => deal.stageId === stageId);
  };

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-4" style={{ minWidth: Math.max(stages.length * 320, 100) + "px" }}>
        {sortedStages.map((stage) => {
          const stageDeals = getDealsByStage(stage.id);
          return (
            <div key={stage.id} className="flex-1 min-w-[300px]">
              <div className="bg-muted/40 rounded-md p-3 h-full flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-sm">{stage.title}</h3>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    {stageDeals.length}
                  </span>
                </div>
                
                <div className="space-y-3 flex-1 min-h-[200px] rounded-md p-2">
                  {stageDeals.length > 0 ? (
                    stageDeals.map((deal) => (
                      <Card 
                        key={deal.id} 
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => onDealClick(deal)}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-sm">{deal.title}</h4>
                            <Badge variant="outline" className="text-xs">
                              {deal.status}
                            </Badge>
                          </div>
                          {deal.description && (
                            <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">
                              {deal.description}
                            </p>
                          )}
                        </CardContent>
                      </Card>
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
        })}
      </div>
    </div>
  );
};

export default KanbanBoard;
