
import React from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash, ChevronRight, ChevronDown } from "lucide-react";
import StageList from "./StageList";
import { Pipeline, Stage, Agent, Asset } from "@/pages/Workflows/models/WorkflowModels";

interface PipelineListProps {
  departmentId: string;
  pipelines: Pipeline[];
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
  expandedPipelines: Record<string, boolean>;
  expandedStages: Record<string, boolean>;
  togglePipelineExpand: (pipeId: string) => void;
  toggleStageExpand: (stageId: string) => void;
  handleAddStage: (pipelineId: string) => void;
  handleAddAgent: (stageId: string) => void;
  handleAddAsset: (stageId: string) => void;
  handleDeletePipeline: (pipelineId: string) => void;
  handleDeleteStage: (stageId: string) => void;
  handleDeleteAgent: (agentId: string) => void;
  handleDeleteAsset: (assetId: string) => void;
}

const PipelineList = ({
  departmentId,
  pipelines,
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
  expandedPipelines,
  expandedStages,
  togglePipelineExpand,
  toggleStageExpand,
  handleAddStage,
  handleAddAgent,
  handleAddAsset,
  handleDeletePipeline,
  handleDeleteStage,
  handleDeleteAgent,
  handleDeleteAsset
}: PipelineListProps) => {
  const departmentPipelines = pipelines.filter(p => p.departmentId === departmentId);
  
  return (
    <>
      {departmentPipelines.map(pipeline => (
        <Collapsible 
          key={pipeline.id}
          open={expandedPipelines[pipeline.id]}
          onOpenChange={() => togglePipelineExpand(pipeline.id)}
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
                    handleDeletePipeline(pipeline.id);
                  }}
                >
                  <Trash className="h-4 w-4" />
                </Button>
                {expandedPipelines[pipeline.id] ? 
                  <ChevronDown className="h-5 w-5" /> : 
                  <ChevronRight className="h-5 w-5" />
                }
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-3 pl-6 border-t bg-background/30">
              <div className="mb-3 text-sm font-medium">Adicionar Estágio</div>
              <div className="grid grid-cols-12 gap-2 mb-4">
                <div className="col-span-5">
                  <Input 
                    placeholder="Título do estágio"
                    value={newStage.title}
                    onChange={(e) => setNewStage(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div className="col-span-5">
                  <Input 
                    placeholder="Descrição (opcional)"
                    value={newStage.description}
                    onChange={(e) => setNewStage(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                <div className="col-span-2">
                  <Button 
                    className="w-full"
                    size="sm"
                    onClick={() => handleAddStage(pipeline.id)}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Adicionar
                  </Button>
                </div>
              </div>

              <div className="space-y-2 pl-2">
                <StageList
                  pipelineId={pipeline.id}
                  stages={stages}
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
      ))}
    </>
  );
};

export default PipelineList;
