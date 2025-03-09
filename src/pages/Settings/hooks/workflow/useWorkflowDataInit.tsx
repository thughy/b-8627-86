import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  Workflow, 
  Department, 
  Pipeline, 
  Stage, 
  Agent, 
  Asset 
} from "@/pages/Workflows/models/WorkflowModels";
import { getDemoData } from "../../components/modals/workflow/MockDataGenerator";

export const useWorkflowDataInit = (
  isOpen: boolean,
  workflow: Workflow | undefined,
  setActiveTab: (tab: "workflow" | "structure" | "versions") => void,
  setSelectedDepartment: React.Dispatch<React.SetStateAction<Department | null>>,
  setSelectedPipeline: React.Dispatch<React.SetStateAction<Pipeline | null>>,
  setSelectedStage: React.Dispatch<React.SetStateAction<Stage | null>>,
  setSelectedAgent: React.Dispatch<React.SetStateAction<Agent | null>>,
  setSelectedAsset: React.Dispatch<React.SetStateAction<Asset | null>>,
  setExpandedDepartments: React.Dispatch<React.SetStateAction<Record<string, boolean>>>,
  setExpandedPipelines: React.Dispatch<React.SetStateAction<Record<string, boolean>>>,
  setExpandedStages: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  const [stages, setStages] = useState<Stage[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);

  useEffect(() => {
    if (isOpen) {
      if (workflow) {
        const demoData = getDemoData(workflow.id);
        setDepartments(demoData.departments);
        setPipelines(demoData.pipelines);
        setStages(demoData.stages);
        setAgents(demoData.agents);
        setAssets(demoData.assets);

        const deptExpanded: Record<string, boolean> = {};
        demoData.departments.forEach(dept => {
          deptExpanded[dept.id] = false;
        });
        setExpandedDepartments(deptExpanded);

        const pipeExpanded: Record<string, boolean> = {};
        demoData.pipelines.forEach(pipe => {
          pipeExpanded[pipe.id] = false;
        });
        setExpandedPipelines(pipeExpanded);

        const stageExpanded: Record<string, boolean> = {};
        demoData.stages.forEach(stage => {
          stageExpanded[stage.id] = false;
        });
        setExpandedStages(stageExpanded);
      } else {
        setDepartments([]);
        setPipelines([]);
        setStages([]);
        setAgents([]);
        setAssets([]);
        setExpandedDepartments({});
        setExpandedPipelines({});
        setExpandedStages({});
      }
      
      setActiveTab("workflow");
      setSelectedDepartment(null);
      setSelectedPipeline(null);
      setSelectedStage(null);
      setSelectedAgent(null);
      setSelectedAsset(null);
    }
  }, [isOpen, workflow, setActiveTab, setSelectedDepartment, setSelectedPipeline, 
      setSelectedStage, setSelectedAgent, setSelectedAsset, setExpandedDepartments, 
      setExpandedPipelines, setExpandedStages]);

  return {
    departments,
    setDepartments,
    pipelines,
    setPipelines,
    stages,
    setStages,
    agents,
    setAgents,
    assets,
    setAssets
  };
};
