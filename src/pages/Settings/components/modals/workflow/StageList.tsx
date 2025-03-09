
import React from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash, ChevronRight, ChevronDown } from "lucide-react";
import AgentList from "./AgentList";
import AssetList from "./AssetList";
import { Stage, Agent, Asset } from "@/pages/Workflows/models/WorkflowModels";

interface StageListProps {
  pipelineId: string;
  stages: Stage[];
  agents: Agent[];
  assets: Asset[];
  selectedStage: Stage | null;
  setSelectedStage: React.Dispatch<React.SetStateAction<Stage | null>>;
  selectedAgent: Agent | null;
  setSelectedAgent: React.Dispatch<React.SetStateAction<Agent | null>>;
  selectedAsset: Asset | null;
  setSelectedAsset: React.Dispatch<React.SetStateAction<Asset | null>>;
  newAgent: Partial<Agent>;
  setNewAgent: React.Dispatch<React.SetStateAction<Partial<Agent>>>;
  newAsset: Partial<Asset>;
  setNewAsset: React.Dispatch<React.SetStateAction<Partial<Asset>>>;
  expandedStages: Record<string, boolean>;
  toggleStageExpand: (stageId: string) => void;
  handleAddAgent: (stageId: string) => void;
  handleAddAsset: (stageId: string) => void;
  handleDeleteStage: (stageId: string) => void;
  handleDeleteAgent: (agentId: string) => void;
  handleDeleteAsset: (assetId: string) => void;
}

const StageList = ({
  pipelineId,
  stages,
  agents,
  assets,
  selectedStage,
  setSelectedStage,
  selectedAgent,
  setSelectedAgent,
  selectedAsset,
  setSelectedAsset,
  expandedStages,
  toggleStageExpand,
  handleAddAgent,
  handleAddAsset,
  handleDeleteStage,
  handleDeleteAgent,
  handleDeleteAsset
}: StageListProps) => {
  const pipelineStages = stages
    .filter(s => s.pipelineId === pipelineId)
    .sort((a, b) => a.order - b.order);
  
  return (
    <>
      {pipelineStages.map(stage => (
        <Collapsible 
          key={stage.id}
          open={expandedStages[stage.id]}
          onOpenChange={() => toggleStageExpand(stage.id)}
          className="border rounded-md"
        >
          <CollapsibleTrigger asChild>
            <div 
              className={`p-2 flex justify-between items-center cursor-pointer hover:bg-accent/50 transition-colors ${selectedStage?.id === stage.id ? 'border-l-4 border-primary' : ''}`}
              onClick={() => setSelectedStage(stage)}
            >
              <div className="flex items-center gap-2">
                <Badge variant="outline">{stage.order}</Badge>
                <div className="font-medium">{stage.title}</div>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteStage(stage.id);
                  }}
                >
                  <Trash className="h-4 w-4" />
                </Button>
                {expandedStages[stage.id] ? 
                  <ChevronDown className="h-5 w-5" /> : 
                  <ChevronRight className="h-5 w-5" />
                }
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-2 pl-6 border-t bg-background/20 space-y-3">
              <div>
                <div className="mb-2 text-sm font-medium">Agentes</div>
                <AgentList
                  stageId={stage.id}
                  agents={agents}
                  selectedAgent={selectedAgent}
                  setSelectedAgent={setSelectedAgent}
                  handleDeleteAgent={handleDeleteAgent}
                />
              </div>

              <div>
                <div className="mb-2 text-sm font-medium">Assets</div>
                <AssetList
                  stageId={stage.id}
                  assets={assets}
                  selectedAsset={selectedAsset}
                  setSelectedAsset={setSelectedAsset}
                  handleDeleteAsset={handleDeleteAsset}
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </>
  );
};

export default StageList;
