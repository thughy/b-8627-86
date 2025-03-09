
import { 
  Workflow, 
  Department, 
  Pipeline, 
  Stage, 
  Agent, 
  Asset 
} from "@/pages/Workflows/models/WorkflowModels";
import { useDepartmentLogic } from "./workflow/useDepartmentLogic";
import { usePipelineLogic } from "./workflow/usePipelineLogic";
import { useStageLogic } from "./workflow/useStageLogic";
import { useAgentLogic } from "./workflow/useAgentLogic";
import { useAssetLogic } from "./workflow/useAssetLogic";
import { useWorkflowTabs } from "./workflow/useWorkflowTabs";
import { useWorkflowSelection } from "./workflow/useWorkflowSelection";
import { useWorkflowStructure } from "./workflow/useWorkflowStructure";
import { useWorkflowFormState } from "./workflow/useWorkflowFormState";
import { useWorkflowDataInit } from "./workflow/useWorkflowDataInit";

export const useWorkflowConfig = (
  isOpen: boolean,
  workflow?: Workflow
) => {
  // Use smaller hooks
  const { activeTab, setActiveTab } = useWorkflowTabs();
  const { formData, setFormData, handleChange, handleStatusChange } = useWorkflowFormState(workflow);
  
  // Use the selection hook
  const { 
    selectedDepartment, setSelectedDepartment,
    selectedPipeline, setSelectedPipeline,
    selectedStage, setSelectedStage,
    selectedAgent, setSelectedAgent,
    selectedAsset, setSelectedAsset
  } = useWorkflowSelection();

  // Use the structure hook for expansions
  const {
    expandedDepartments, setExpandedDepartments,
    expandedPipelines, setExpandedPipelines, 
    expandedStages, setExpandedStages
  } = useWorkflowStructure();

  // Use the data initialization hook
  const {
    departments, setDepartments,
    pipelines, setPipelines,
    stages, setStages,
    agents, setAgents,
    assets, setAssets
  } = useWorkflowDataInit(
    isOpen,
    workflow,
    setActiveTab,
    setSelectedDepartment,
    setSelectedPipeline,
    setSelectedStage,
    setSelectedAgent,
    setSelectedAsset,
    setExpandedDepartments,
    setExpandedPipelines,
    setExpandedStages
  );

  // Use our custom hooks for CRUD operations
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

  return {
    // Tab state
    activeTab,
    setActiveTab,
    
    // Form data
    formData,
    
    // Data structures
    departments,
    pipelines,
    stages,
    agents,
    assets,
    
    // Selected entities
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
    handleStatusChange,
    
    // Structure expansion state
    expandedDepartments,
    expandedPipelines,
    expandedStages
  };
};
