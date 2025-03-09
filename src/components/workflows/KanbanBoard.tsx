
import React from "react";
import { Stage, Deal } from "@/pages/Workflows/models/WorkflowModels";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import DealCard from "./DealCard";
import { DragDropContext, Droppable, Draggable, DroppableProvided, DraggableProvided, DropResult } from "react-beautiful-dnd";

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
    <DragDropContext onDragEnd={onDragEnd}>
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
                  
                  <Droppable droppableId={stage.id}>
                    {(provided: DroppableProvided, snapshot) => (
                      <div 
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`space-y-3 flex-1 min-h-[200px] rounded-md p-2 transition-colors ${snapshot.isDraggingOver ? 'bg-primary/10' : ''}`}
                      >
                        {stageDeals.length > 0 ? (
                          stageDeals.map((deal, index) => (
                            <Draggable key={deal.id} draggableId={deal.id} index={index}>
                              {(provided: DraggableProvided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`transition-transform ${snapshot.isDragging ? 'scale-105 shadow-lg' : ''}`}
                                >
                                  <DealCard 
                                    deal={deal} 
                                    onAction={(action, data) => {
                                      if (action === "viewDeal") {
                                        onDealClick(deal);
                                      } else if (onAction) {
                                        onAction(action, data);
                                      }
                                    }} 
                                  />
                                </div>
                              )}
                            </Draggable>
                          ))
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <p className="text-sm text-muted-foreground">Sem deals</p>
                          </div>
                        )}
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
          })}
        </div>
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
