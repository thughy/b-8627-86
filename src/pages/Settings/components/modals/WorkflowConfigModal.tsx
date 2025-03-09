
import React from "react";
import { 
  Dialog, 
  DialogContent
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Workflow } from "@/pages/Workflows/models/WorkflowModels";
import { WorkflowTab } from "../../hooks/workflow/useWorkflowTabs";

// Import the refactored components
import WorkflowBasicForm from "./workflow/WorkflowBasicForm";
import StructureView from "./workflow/StructureView";
import VersionsView from "./workflow/VersionsView";
import ModalHeader from "./workflow/ModalHeader";
import ModalFooter from "./workflow/ModalFooter";
import { useWorkflowConfig } from "../../hooks/useWorkflowConfig";

interface WorkflowConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  workflow?: Workflow;
  onSave: (workflow: Partial<Workflow>) => void;
}

const WorkflowConfigModal = ({ 
  isOpen, 
  onClose, 
  workflow, 
  onSave 
}: WorkflowConfigModalProps) => {
  const { toast } = useToast();
  
  // Use the custom hook to manage state
  const { 
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
    newDepartment,
    setNewDepartment,
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
    handleChange,
    handleStatusChange,
    handleAddDepartment,
    handleAddPipeline,
    handleAddStage,
    handleAddAgent,
    handleAddAsset,
    handleDeleteDepartment,
    handleDeletePipeline,
    handleDeleteStage,
    handleDeleteAgent,
    handleDeleteAsset
  } = useWorkflowConfig(isOpen, workflow);

  const handleSubmit = () => {
    if (!formData.title) {
      toast({
        title: "Título obrigatório",
        description: "Por favor, informe um título para o workflow.",
        variant: "destructive",
      });
      return;
    }

    // Here you could save departments, pipelines, etc.
    // associated with the workflow in a real implementation
    onSave(formData);
    toast({
      title: workflow ? "Workflow atualizado" : "Workflow criado",
      description: `O workflow "${formData.title}" foi ${workflow ? "atualizado" : "criado"} com sucesso.`,
    });
    onClose();
  };

  // Function to safely handle tab changes with correct typing
  const handleTabChange = (value: string) => {
    // This ensures we only set valid tab values
    if (value === 'workflow' || value === 'structure' || value === 'versions') {
      setActiveTab(value);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
        <ModalHeader 
          title={workflow ? "Editar Workflow" : "Novo Workflow"}
          description={workflow 
            ? "Edite as informações do workflow existente." 
            : "Configure um novo workflow para seu negócio."
          }
        />

        <Tabs value={activeTab} onValueChange={handleTabChange} className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="workflow">Workflow</TabsTrigger>
            <TabsTrigger value="structure">Estrutura</TabsTrigger>
            <TabsTrigger value="versions">Versões</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto p-1">
            <TabsContent value="workflow" className="mt-4">
              <WorkflowBasicForm 
                formData={formData}
                handleChange={handleChange}
                handleStatusChange={handleStatusChange}
              />
            </TabsContent>

            <TabsContent value="structure" className="mt-4">
              <StructureView
                departments={departments}
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
                newDepartment={newDepartment}
                setNewDepartment={setNewDepartment}
                newPipeline={newPipeline}
                setNewPipeline={setNewPipeline}
                newStage={newStage}
                setNewStage={setNewStage}
                newAgent={newAgent}
                setNewAgent={setNewAgent}
                newAsset={newAsset}
                setNewAsset={setNewAsset}
                expandedDepartments={expandedDepartments}
                expandedPipelines={expandedPipelines}
                expandedStages={expandedStages}
                toggleDepartmentExpand={toggleDepartmentExpand}
                togglePipelineExpand={togglePipelineExpand}
                toggleStageExpand={toggleStageExpand}
                handleAddDepartment={handleAddDepartment}
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
            </TabsContent>

            <TabsContent value="versions" className="mt-4">
              <VersionsView />
            </TabsContent>
          </div>
        </Tabs>

        <ModalFooter onClose={onClose} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default WorkflowConfigModal;
