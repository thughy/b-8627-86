
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Pipeline } from "@/pages/Workflows/models/WorkflowModels";
import KanbanBoard from "./KanbanBoard";

interface PipelineCardProps {
  pipeline: Pipeline;
  onAction: (action: string, data?: any) => void;
}

const PipelineCard = ({ pipeline, onAction }: PipelineCardProps) => {
  return (
    <Card className="mb-8">
      <CardHeader className="pb-3 flex flex-row justify-between items-center">
        <div>
          <CardTitle className="text-xl">{pipeline.title}</CardTitle>
          <p className="text-sm text-muted-foreground">{pipeline.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onAction("editPipeline", pipeline)}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Editar Pipeline
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <KanbanBoard 
          stages={pipeline.stages} 
          pipelineId={pipeline.id}
          onAction={onAction}
        />
      </CardContent>
    </Card>
  );
};

export default PipelineCard;
