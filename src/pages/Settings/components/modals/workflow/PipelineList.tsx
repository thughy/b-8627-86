
import React from "react";
import PipelineItem from "./PipelineItem";
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
        <PipelineItem
          key={pipeline.id}
          pipeline={pipeline}
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
          expanded={expandedPipelines[pipeline.id]}
          expandedStages={expandedStages}
          toggleExpand={() => togglePipelineExpand(pipeline.id)}
          toggleStageExpand={toggleStageExpand}
          handleAddStage={() => handleAddStage(pipeline.id)}
          handleAddAgent={handleAddAgent}
          handleAddAsset={handleAddAsset}
          handleDeletePipeline={() => handleDeletePipeline(pipeline.id)}
          handleDeleteStage={handleDeleteStage}
          handleDeleteAgent={handleDeleteAgent}
          handleDeleteAsset={handleDeleteAsset}
        />
      ))}
    </>
  );
};

export default PipelineList;
