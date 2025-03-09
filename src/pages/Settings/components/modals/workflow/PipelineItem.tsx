
import React from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Trash, ChevronRight, ChevronDown } from "lucide-react";
import StageList from "./StageList";
import AddStageForm from "./AddStageForm";
import { Pipeline, Stage, Agent, Asset } from "@/pages/Workflows/models/WorkflowModels";

interface PipelineItemProps {
  pipeline: Pipeline;
  stages: Stage[];
  agents: Agent[];
  assets: Asset[];
  selectedPipeline: Pipeline | null;
  setSelectedPipeline: React.Dispatch<React.SetStateAction<Pipeline | null>>;
  selectedStage: Stage | null;
  setSelectedStage: React.Dispatch<React.SetStateAction<Stage | null>>;
  selectedAgent: Agent | null;
  setSelectedAgent: React.Dispatch<React.SetStateAction<Agent | null>>;
  selectedAsset: Asset | null;
  setSelectedAsset: React.Dispatch<React.SetStateAction<Asset | null>>;
  newStage: Partial<Stage>;
  setNewStage: React.Dispatch<React.SetStateAction<Partial<Stage>>>;
  newAgent: Partial<Agent>;
  setNewAgent: React.Dispatch<React.SetStateAction<Partial<Agent>>>;
  newAsset: Partial<Asset>;
  setNewAsset: React.Dispatch<React.SetStateAction<Partial<Asset>>>;
  expanded: boolean;
  expandedStages: Record<string, boolean>;
  toggleExpand: () => void;
  toggleStageExpand: (stageId: string) => void;
  handleAddStage: () => void;
  handleAddAgent: (stageId: string) => void;
  handleAddAsset: (stageId: string) => void;
  handleDeletePipeline: () => void;
  handleDeleteStage: (stageId: string) => void;
  handleDeleteAgent: (agentId: string) => void;
  handleDeleteAsset: (assetId: string) => void;
}

const PipelineItem = ({
  pipeline,
  stages,
  agents,
  assets,
  selectedPipeline,
  setSelectedPipeline,
  selectedStage,
  setSelectedStage,
  selectedAgent,
  setSelectedAgent,
  selectedAsset,
  setSelectedAsset,
  newStage,
  setNewStage,
  newAgent,
  setNewAgent,
  newAsset,
  setNewAsset,
  expanded,
  expandedStages,
  toggleExpand,
  toggleStageExpand,
  handleAddStage,
  handleAddAgent,
  handleAddAsset,
  handleDeletePipeline,
  handleDeleteStage,
  handleDeleteAgent,
  handleDeleteAsset
}: PipelineItemProps) => {
  const pipelineStages = stages.filter(s => s.pipelineId === pipeline.id);
  
  return (
    <Collapsible 
      key={pipeline.id}
      open={expanded}
      onOpenChange={toggleExpand}
      className="border rounded-md"
    >
      <CollapsibleTrigger asChild>
        <div 
          className={`p-3 flex justify-between items-center cursor-pointer hover:bg-accent/50 transition-colors ${selectedPipeline?.id === pipeline.id ? 'border-l-4 border-primary' : ''}`}
          onClick={() => setSelectedPipeline(pipeline)}
        >
          <div className="flex items-center gap-2">
            <div className="font-medium">{pipeline.title}</div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleDeletePipeline();
              }}
            >
              <Trash className="h-4 w-4" />
            </Button>
            {expanded ? 
              <ChevronDown className="h-5 w-5" /> : 
              <ChevronRight className="h-5 w-5" />
            }
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="p-3 pl-6 border-t bg-background/30">
          <AddStageForm
            newStage={newStage}
            setNewStage={setNewStage}
            onAddStage={handleAddStage}
          />

          <div className="space-y-2 pl-2">
            <StageList
              pipelineId={pipeline.id}
              stages={pipelineStages}
              agents={agents}
              assets={assets}
              selectedStage={selectedStage}
              setSelectedStage={setSelectedStage}
              selectedAgent={selectedAgent}
              setSelectedAgent={setSelectedAgent}
              selectedAsset={selectedAsset}
              setSelectedAsset={setSelectedAsset}
              newAgent={newAgent}
              setNewAgent={setNewAgent}
              newAsset={newAsset}
              setNewAsset={setNewAsset}
              expandedStages={expandedStages}
              toggleStageExpand={toggleStageExpand}
              handleAddAgent={handleAddAgent}
              handleAddAsset={handleAddAsset}
              handleDeleteStage={handleDeleteStage}
              handleDeleteAgent={handleDeleteAgent}
              handleDeleteAsset={handleDeleteAsset}
            />
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default PipelineItem;
