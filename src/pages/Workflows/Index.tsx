
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

// Import components
import WorkflowHeader from "@/components/workflows/WorkflowHeader";
import WorkflowFilters from "@/components/workflows/WorkflowFilters";
import DepartmentDropdown from "@/components/workflows/DepartmentDropdown";
import PipelineCard from "@/components/workflows/PipelineCard";
import ListView from "@/components/workflows/ListView";

// Import services and models
import { 
  getDepartments, 
  getPipelinesByDepartment 
} from "./services/workflowService";
import { Department, Pipeline } from "./models/WorkflowModels";

const WorkflowsPage = () => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban");
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  
  // Obter dados
  const departments = getDepartments();
  const pipelines = selectedDepartment 
    ? getPipelinesByDepartment(selectedDepartment.id)
    : departments.length > 0 
      ? getPipelinesByDepartment(departments[0].id)
      : [];
  
  // Manipular ações do usuário
  const handleAction = (action: string, data?: any) => {
    console.log(`Ação: ${action}`, data);
    
    switch (action) {
      case "createWorkflow":
        toast({
          title: "Criar novo workflow",
          description: "Esta funcionalidade está em desenvolvimento",
        });
        break;
      
      case "viewDeal":
        toast({
          title: `Visualizando deal: ${data.title}`,
          description: "Esta funcionalidade está em desenvolvimento",
        });
        break;
      
      case "createDeal":
        toast({
          title: "Adicionar novo deal",
          description: `No estágio ID: ${data.stageId}`,
        });
        break;
      
      case "editPipeline":
        toast({
          title: `Editar pipeline: ${data.title}`,
          description: "Esta funcionalidade está em desenvolvimento",
        });
        break;
      
      default:
        toast({
          title: `Ação: ${action}`,
          description: "Esta funcionalidade está em desenvolvimento",
        });
    }
  };

  // Definir departamento selecionado
  const handleSelectDepartment = (department: Department | null) => {
    setSelectedDepartment(department);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <WorkflowHeader onCreateWorkflow={() => handleAction("createWorkflow")} />
        
        <WorkflowFilters 
          viewMode={viewMode} 
          onViewModeChange={setViewMode} 
        />

        <Tabs defaultValue="all">
          <TabsList className="hidden">
            <TabsTrigger value="all">Todos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6 mt-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <DepartmentDropdown
                departments={departments}
                selectedDepartment={selectedDepartment || departments[0]}
                onSelectDepartment={handleSelectDepartment}
              />
              
              <Button 
                onClick={() => handleAction("createPipeline")}
                className="sm:flex-none flex-1"
                variant="outline"
              >
                <Plus className="h-4 w-4 mr-2" />
                Novo Pipeline
              </Button>
            </div>

            {viewMode === "kanban" ? (
              <div className="space-y-8">
                {pipelines.map((pipeline: Pipeline) => (
                  <PipelineCard 
                    key={pipeline.id} 
                    pipeline={pipeline} 
                    onAction={handleAction}
                  />
                ))}
                
                {pipelines.length === 0 && (
                  <div className="flex flex-col items-center justify-center bg-muted/30 rounded-lg p-8 text-center">
                    <h3 className="text-lg font-medium mb-2">Nenhum pipeline encontrado</h3>
                    <p className="text-muted-foreground mb-4">
                      Não existe nenhum pipeline configurado para este departamento.
                    </p>
                    <Button onClick={() => handleAction("createPipeline")}>
                      <Plus className="h-4 w-4 mr-2" />
                      Criar Novo Pipeline
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <ListView onAction={handleAction} />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default WorkflowsPage;
