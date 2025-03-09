
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
import { getDemoData } from "../components/modals/workflow/MockDataGenerator";
import { useDepartmentLogic } from "./workflow/useDepartmentLogic";
import { usePipelineLogic } from "./workflow/usePipelineLogic";
import { useStageLogic } from "./workflow/useStageLogic";
import { useAgentLogic } from "./workflow/useAgentLogic";
import { useAssetLogic } from "./workflow/useAssetLogic";
import { useWorkflowFormLogic } from "./workflow/useWorkflowFormLogic";

export const useWorkflowConfig = (
  isOpen: boolean,
  workflow?: Workflow
) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("workflow");
  
  const { formData, setFormData, handleChange, handleStatusChange } = useWorkflowFormLogic(workflow);

  const [departments, setDepartments] = useState<Department[]>([]);
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  const [stages, setStages] = useState<Stage[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);

  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [selectedPipeline, setSelectedPipeline] = useState<Pipeline | null>(null);
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const [expandedDepartments, setExpandedDepartments] = useState<Record<string, boolean>>({});
  const [expandedPipelines, setExpandedPipelines] = useState<Record<string, boolean>>({});
  const [expandedStages, setExpandedStages] = useState<Record<string, boolean>>({});

  // Use our custom hooks
  const departmentLogic = useDepartmentLogic(
    departments, setDepartments,
    pipelines, setPipelines,
    stages, setStages,
    agents, setAgents,
    selectedDepartment, setSelectedDepartment,
    expandedDepartments, setExpandedDepartments
  );

  const pipelineLogic = usePipelineLogic(
    pipelines, setPipelines,
    stages, setStages,
    agents, setAgents,
    selectedPipeline, setSelectedPipeline,
    expandedPipelines, setExpandedPipelines
  );

  const stageLogic = useStageLogic(
    stages, setStages,
    agents, setAgents,
    selectedStage, setSelectedStage,
    expandedStages, setExpandedStages
  );

  const agentLogic = useAgentLogic(
    agents, setAgents,
    stages,
    selectedAgent, setSelectedAgent
  );

  const assetLogic = useAssetLogic(
    assets, setAssets,
    selectedAsset, setSelectedAsset
  );

  useEffect(() => {
    if (isOpen) {
      setFormData(
        workflow || {
          title: "",
          description: "",
          status: "draft"
        }
      );
      
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
  }, [isOpen, workflow, setFormData]);

  return {
    activeTab,
    setActiveTab,
    formData,
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
    // Department logic
    newDepartment: departmentLogic.newDepartment,
    setNewDepartment: departmentLogic.setNewDepartment,
    toggleDepartmentExpand: departmentLogic.toggleDepartmentExpand,
    handleAddDepartment: departmentLogic.handleAddDepartment,
    handleDeleteDepartment: departmentLogic.handleDeleteDepartment,
    // Pipeline logic
    newPipeline: pipelineLogic.newPipeline,
    setNewPipeline: pipelineLogic.setNewPipeline,
    togglePipelineExpand: pipelineLogic.togglePipelineExpand,
    handleAddPipeline: pipelineLogic.handleAddPipeline,
    handleDeletePipeline: pipelineLogic.handleDeletePipeline,
    // Stage logic
    newStage: stageLogic.newStage,
    setNewStage: stageLogic.setNewStage,
    toggleStageExpand: stageLogic.toggleStageExpand,
    handleAddStage: stageLogic.handleAddStage,
    handleDeleteStage: stageLogic.handleDeleteStage,
    // Agent logic
    newAgent: agentLogic.newAgent,
    setNewAgent: agentLogic.setNewAgent,
    handleAddAgent: agentLogic.handleAddAgent,
    handleDeleteAgent: agentLogic.handleDeleteAgent,
    // Asset logic
    newAsset: assetLogic.newAsset,
    setNewAsset: assetLogic.setNewAsset,
    handleAddAsset: assetLogic.handleAddAsset,
    handleDeleteAsset: assetLogic.handleDeleteAsset,
    // Form logic
    handleChange,
    handleStatusChange
  };
};
