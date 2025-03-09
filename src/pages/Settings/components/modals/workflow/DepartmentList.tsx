
import React from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash, ChevronRight, ChevronDown } from "lucide-react";
import PipelineList from "./PipelineList";
import { Department, Pipeline, Stage, Agent, Asset } from "@/pages/Workflows/models/WorkflowModels";

interface DepartmentListProps {
  departments: Department[];
  pipelines: Pipeline[];
  stages: Stage[];
  agents: Agent[];
  assets: Asset[];
  selectedDepartment: Department | null;
  setSelectedDepartment: React.Dispatch<React.SetStateAction<Department | null>>;
  selectedPipeline: Pipeline | null;
  setSelectedPipeline: React.Dispatch<React.SetStateAction<Pipeline | null>>;
  selectedStage: Stage | null;
  setSelectedStage: React.Dispatch<React.SetStateAction<Stage | null>>;
  selectedAgent: Agent | null;
  setSelectedAgent: React.Dispatch<React.SetStateAction<Agent | null>>;
  selectedAsset: Asset | null;
  setSelectedAsset: React.Dispatch<React.SetStateAction<Asset | null>>;
  newPipeline: Partial<Pipeline>;
  setNewPipeline: React.Dispatch<React.SetStateAction<Partial<Pipeline>>>;
  newStage: Partial<Stage>;
  setNewStage: React.Dispatch<React.SetStateAction<Partial<Stage>>>;
  newAgent: Partial<Agent>;
  setNewAgent: React.Dispatch<React.SetStateAction<Partial<Agent>>>;
  newAsset: Partial<Asset>;
  setNewAsset: React.Dispatch<React.SetStateAction<Partial<Asset>>>;
  expandedDepartments: Record<string, boolean>;
  expandedPipelines: Record<string, boolean>;
  expandedStages: Record<string, boolean>;
  toggleDepartmentExpand: (deptId: string) => void;
  togglePipelineExpand: (pipeId: string) => void;
  toggleStageExpand: (stageId: string) => void;
  handleAddPipeline: (departmentId: string) => void;
  handleAddStage: (pipelineId: string) => void;
  handleAddAgent: (stageId: string) => void;
  handleAddAsset: (stageId: string) => void;
  handleDeleteDepartment: (departmentId: string) => void;
  handleDeletePipeline: (pipelineId: string) => void;
  handleDeleteStage: (stageId: string) => void;
  handleDeleteAgent: (agentId: string) => void;
  handleDeleteAsset: (assetId: string) => void;
}

const DepartmentList = ({
  departments,
  pipelines,
  stages,
  agents,
  assets,
  selectedDepartment,
  setSelectedDepartment,
  selectedPipeline,
  setSelectedPipeline,
  selectedStage,
  setSelectedStage,
  selectedAgent,
  setSelectedAgent,
  selectedAsset,
  setSelectedAsset,
  newPipeline,
  setNewPipeline,
  newStage,
  setNewStage,
  newAgent,
  setNewAgent,
  newAsset,
  setNewAsset,
  expandedDepartments,
  expandedPipelines,
  expandedStages,
  toggleDepartmentExpand,
  togglePipelineExpand,
  toggleStageExpand,
  handleAddPipeline,
  handleAddStage,
  handleAddAgent,
  handleAddAsset,
  handleDeleteDepartment,
  handleDeletePipeline,
  handleDeleteStage,
  handleDeleteAgent,
  handleDeleteAsset
}: DepartmentListProps) => {
  if (departments.length === 0) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        Nenhum departamento cadastrado. Adicione um departamento para começar.
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-4">
      {departments.map(department => (
        <Collapsible 
          key={department.id}
          open={expandedDepartments[department.id]}
          onOpenChange={() => toggleDepartmentExpand(department.id)}
          className="border rounded-md"
        >
          <CollapsibleTrigger asChild>
            <div 
              className={`p-4 flex justify-between items-center cursor-pointer hover:bg-accent/50 transition-colors ${selectedDepartment?.id === department.id ? 'border-l-4 border-primary' : ''}`}
              onClick={() => setSelectedDepartment(department)}
            >
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: department.color || "#CBD5E1" }}
                />
                <div className="font-medium">{department.title}</div>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteDepartment(department.id);
                  }}
                >
                  <Trash className="h-4 w-4" />
                </Button>
                {expandedDepartments[department.id] ? 
                  <ChevronDown className="h-5 w-5" /> : 
                  <ChevronRight className="h-5 w-5" />
                }
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 pl-6 border-t bg-background/60">
              <div className="mb-3 text-sm font-medium">Adicionar Pipeline</div>
              <div className="grid grid-cols-12 gap-2 mb-4">
                <div className="col-span-5">
                  <Input 
                    placeholder="Título do pipeline"
                    value={newPipeline.title}
                    onChange={(e) => setNewPipeline(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div className="col-span-5">
                  <Input 
                    placeholder="Descrição (opcional)"
                    value={newPipeline.description}
                    onChange={(e) => setNewPipeline(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                <div className="col-span-2">
                  <Button 
                    className="w-full"
                    size="sm"
                    onClick={() => handleAddPipeline(department.id)}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Adicionar
                  </Button>
                </div>
              </div>

              <div className="space-y-2 pl-2">
                <PipelineList
                  departmentId={department.id}
                  pipelines={pipelines}
                  stages={stages}
                  agents={agents}
                  assets={assets}
                  selectedPipeline={selectedPipeline}
                  setSelectedPipeline={setSelectedPipeline}
                  selectedStage={selectedStage}
                  setSelectedStage={setSelectedStage}
                  selectedAgent={selectedAgent}
                  setSelectedAgent={setSelectedAgent}
                  selectedAsset={selectedAsset}
                  setSelectedAsset={setSelectedAsset}
                  newStage={newStage}
                  setNewStage={setNewStage}
                  newAgent={newAgent}
                  setNewAgent={setNewAgent}
                  newAsset={newAsset}
                  setNewAsset={setNewAsset}
                  expandedPipelines={expandedPipelines}
                  expandedStages={expandedStages}
                  togglePipelineExpand={togglePipelineExpand}
                  toggleStageExpand={toggleStageExpand}
                  handleAddStage={handleAddStage}
                  handleAddAgent={handleAddAgent}
                  handleAddAsset={handleAddAsset}
                  handleDeletePipeline={handleDeletePipeline}
                  handleDeleteStage={handleDeleteStage}
                  handleDeleteAgent={handleDeleteAgent}
                  handleDeleteAsset={handleDeleteAsset}
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
};

export default DepartmentList;
