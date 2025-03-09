
import { useState } from "react";
import { Department, Pipeline, Stage, Agent, Asset } from "@/pages/Workflows/models/WorkflowModels";

export const useWorkflowSelection = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [selectedPipeline, setSelectedPipeline] = useState<Pipeline | null>(null);
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  return {
    selectedDepartment,
    setSelectedDepartment,
    selectedPipeline,
    setSelectedPipeline,
    selectedStage,
    setSelectedStage,
    selectedAgent,
    setSelectedAgent,
    selectedAsset,
    setSelectedAsset
  };
};
