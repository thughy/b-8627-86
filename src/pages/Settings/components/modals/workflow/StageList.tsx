
import React from "react";
import StageItem from "./StageItem";
import { useStageItemLogic } from "../../../hooks/workflow/useStageItemLogic";
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
  newAgent,
  setNewAgent,
  newAsset,
  setNewAsset,
  expandedStages,
  toggleStageExpand,
  handleAddAgent,
  handleAddAsset,
  handleDeleteStage,
  handleDeleteAgent,
  handleDeleteAsset
}: StageListProps) => {
  const pipelineStages = stages
    .filter(stage => stage.pipelineId === pipelineId)
    .sort((a, b) => a.order - b.order);
  
  return (
    <>
      {pipelineStages.map(stage => {
        const stageLogic = useStageItemLogic(
          stage,
          selectedStage,
          setSelectedStage,
          expandedStages,
          toggleStageExpand,
          handleDeleteStage
        );
        
        return (
          <StageItem
            key={stage.id}
            stage={stage}
            isSelected={stageLogic.isSelected}
            isExpanded={stageLogic.isExpanded}
            agents={agents}
            assets={assets}
            selectedAgent={selectedAgent}
            setSelectedAgent={setSelectedAgent}
            selectedAsset={selectedAsset}
            setSelectedAsset={setSelectedAsset}
            newAgent={newAgent}
            setNewAgent={setNewAgent}
            newAsset={newAsset}
            setNewAsset={setNewAsset}
            onSelect={stageLogic.onSelect}
            onToggleExpand={stageLogic.onToggleExpand}
            onDelete={stageLogic.onDelete}
            handleAddAgent={handleAddAgent}
            handleAddAsset={handleAddAsset}
            handleDeleteAgent={handleDeleteAgent}
            handleDeleteAsset={handleDeleteAsset}
          />
        );
      })}
    </>
  );
};

export default StageList;
