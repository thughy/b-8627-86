
import React from "react";
import DepartmentItem from "./DepartmentItem";
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
        <DepartmentItem
          key={department.id}
          department={department}
          pipelines={pipelines}
          stages={stages}
          agents={agents}
          assets={assets}
          selectedDepartment={selectedDepartment}
          setSelectedDepartment={setSelectedDepartment}
          selectedPipeline={selectedPipeline}
          setSelectedPipeline={setSelectedPipeline}
          selectedStage={selectedStage}
          setSelectedStage={setSelectedStage}
          selectedAgent={selectedAgent}
          setSelectedAgent={setSelectedAgent}
          selectedAsset={selectedAsset}
          setSelectedAsset={setSelectedAsset}
          newPipeline={newPipeline}
          setNewPipeline={setNewPipeline}
          newStage={newStage}
          setNewStage={setNewStage}
          newAgent={newAgent}
          setNewAgent={setNewAgent}
          newAsset={newAsset}
          setNewAsset={setNewAsset}
          expanded={expandedDepartments[department.id]}
          expandedPipelines={expandedPipelines}
          expandedStages={expandedStages}
          toggleExpand={() => toggleDepartmentExpand(department.id)}
          togglePipelineExpand={togglePipelineExpand}
          toggleStageExpand={toggleStageExpand}
          handleAddPipeline={handleAddPipeline}
          handleAddStage={handleAddStage}
          handleAddAgent={handleAddAgent}
          handleAddAsset={handleAddAsset}
          handleDeleteDepartment={handleDeleteDepartment}
          handleDeletePipeline={handleDeletePipeline}
          handleDeleteStage={handleDeleteStage}
          handleDeleteAgent={handleDeleteAgent}
          handleDeleteAsset={handleDeleteAsset}
        />
      ))}
    </div>
  );
};

export default DepartmentList;
