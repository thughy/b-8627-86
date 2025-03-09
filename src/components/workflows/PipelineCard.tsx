
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Pipeline, Deal } from "@/pages/Workflows/models/WorkflowModels";
import { FolderKanban } from "lucide-react";
import KanbanBoard from "./KanbanBoard";
import { DropResult } from "react-beautiful-dnd";

interface PipelineCardProps {
  pipeline: Pipeline;
  onAction: (action: string, data?: any) => void;
  isActive?: boolean;
  deals: Deal[];
  onDragEnd: (result: DropResult) => void;
  onDealClick: (deal: Deal) => void;
}

const PipelineCard = ({ 
  pipeline, 
  onAction, 
  isActive = false, 
  deals, 
  onDragEnd, 
  onDealClick 
}: PipelineCardProps) => {
  // Filter deals that belong to this pipeline's stages
  const pipelineDeals = deals.filter(deal => 
    pipeline.stages.some(stage => stage.id === deal.stageId)
  );

  return (
    <Card className={`mb-8 transition-all ${isActive ? 'ring-2 ring-primary/50' : ''}`}>
      <CardHeader className="pb-3 flex flex-row justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-2 rounded-md text-primary">
            <FolderKanban className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-xl">{pipeline.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{pipeline.description}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <KanbanBoard 
          stages={pipeline.stages} 
          pipelineId={pipeline.id}
          onAction={onAction}
          deals={pipelineDeals}
          onDragEnd={onDragEnd}
          onDealClick={onDealClick}
        />
      </CardContent>
    </Card>
  );
};

export default PipelineCard;
