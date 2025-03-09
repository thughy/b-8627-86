
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

// Import components
import WorkflowHeader from "@/components/workflows/WorkflowHeader";
import WorkflowFilters from "@/components/workflows/WorkflowFilters";
import DepartmentDropdown from "@/components/workflows/DepartmentDropdown";
import PipelineCard from "@/components/workflows/PipelineCard";
import ListView from "@/components/workflows/ListView";
import WorkflowConfigModal from "@/pages/Settings/components/modals/WorkflowConfigModal";

// Import services and models
import { 
  getDepartments, 
  getPipelinesByDepartment,
  getWorkflows
} from "./services/workflowService";
import { Department, Pipeline, Workflow, Deal } from "./models/WorkflowModels";

const WorkflowsPage = () => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban");
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [currentWorkflow, setCurrentWorkflow] = useState<Workflow | undefined>(undefined);
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Obter workflows no carregamento inicial
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Carregar workflows da API (ou mock data)
        const workflowsData = getWorkflows();
        setWorkflows(workflowsData);
        
      } catch (error) {
        console.error("Erro ao carregar workflows:", error);
        toast({
          title: "Erro ao carregar workflows",
          description: "Não foi possível carregar os workflows configurados.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [toast]);
  
  // Obter dados
  const departments = getDepartments();
  const pipelines = selectedDepartment 
    ? getPipelinesByDepartment(selectedDepartment.id)
    : departments.length > 0 
      ? getPipelinesByDepartment(departments[0].id)
      : [];
  
  useEffect(() => {
    if (departments.length > 0 && !selectedDepartment) {
      setSelectedDepartment(departments[0]);
    }
  }, [departments, selectedDepartment]);
  
  // Manipular ações do usuário
  const handleAction = (action: string, data?: any) => {
    console.log(`Ação: ${action}`, data);
    
    switch (action) {
      case "viewDeals":
        // Quando o usuário clica para ver os deals de um workflow
        setCurrentWorkflow(data);
        // Idealmente mudaríamos para a visualização Kanban e filtraríamos os deals desse workflow
        setViewMode("kanban");
        if (data.departments && data.departments.length > 0) {
          // Encontrar o departamento associado a este workflow
          const relatedDepartment = departments.find(d => d.id === data.departments[0].id);
          if (relatedDepartment) {
            setSelectedDepartment(relatedDepartment);
          }
        }
        toast({
          title: `Operando workflow: ${data.title}`,
          description: "Carregando deals e departamentos relacionados."
        });
        break;
      
      case "viewDeal":
        // Quando o usuário clica para ver um deal específico
        setSelectedDeal(data);
        toast({
          title: `Visualizando deal: ${data.title}`,
          description: "Carregando detalhes do deal."
        });
        break;
      
      case "createDeal":
        // Quando o usuário clica para criar um novo deal em um estágio
        toast({
          title: "Adicionar novo deal",
          description: `No estágio ID: ${data.stageId}`,
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

  // Fechar modal de configuração
  const handleCloseConfigModal = () => {
    setIsConfigModalOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <WorkflowHeader title="Gestão de Workflows" description="Opere seus workflows e acompanhe seus deals" />
        
        <WorkflowFilters 
          viewMode={viewMode} 
          onViewModeChange={setViewMode} 
        />

        <Tabs defaultValue="all">
          <TabsList className="hidden">
            <TabsTrigger value="all">Todos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6 mt-0">
            {viewMode === "list" ? (
              // Visualização de lista de workflows
              <ListView 
                onAction={handleAction}
                workflows={workflows}
              />
            ) : (
              // Visualização Kanban (exibe pipelines e deals)
              <>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <DepartmentDropdown
                    departments={departments}
                    selectedDepartment={selectedDepartment || departments[0]}
                    onSelectDepartment={handleSelectDepartment}
                  />
                </div>

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
                    </div>
                  )}
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Modal de configuração de workflow - usado apenas para visualização */}
      {isConfigModalOpen && (
        <WorkflowConfigModal
          isOpen={isConfigModalOpen}
          onClose={handleCloseConfigModal}
          workflow={currentWorkflow}
          onSave={() => {}}
        />
      )}
    </DashboardLayout>
  );
};

export default WorkflowsPage;
