
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
import DealDetailModal from "@/components/workflows/DealDetailModal";
import AssetCreationModal from "@/components/workflows/AssetCreationModal";

// Import services and models
import { 
  getDepartments, 
  getPipelinesByDepartment,
  getWorkflows,
  createDeal,
  createAsset
} from "./services/workflowService";
import { Department, Pipeline, Workflow, Deal, Asset } from "./models/WorkflowModels";

const WorkflowsPage = () => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban");
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [currentWorkflow, setCurrentWorkflow] = useState<Workflow | undefined>(undefined);
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Deal and Asset management modals
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAssetModalOpen, setIsAssetModalOpen] = useState(false);
  const [currentDealId, setCurrentDealId] = useState<string>("");
  
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
        setIsDetailModalOpen(true);
        break;
      
      case "createDeal":
        // Quando o usuário clica para criar um novo deal em um estágio
        const newDeal = createDeal({
          title: `Novo Deal`,
          description: `Deal criado em ${new Date().toLocaleDateString()}`,
          stageId: data.stageId,
          status: "open",
          createdAt: new Date()
        });
        
        toast({
          title: "Deal criado com sucesso",
          description: `O deal foi adicionado ao estágio selecionado.`,
        });
        break;
      
      case "createAsset":
        // Quando o usuário clica para criar um novo asset para um deal
        setCurrentDealId(data.dealId);
        setIsAssetModalOpen(true);
        break;
        
      case "viewAsset":
        // Quando o usuário clica para ver um asset
        toast({
          title: `Visualizando asset: ${data.title}`,
          description: "Esta funcionalidade está sendo implementada."
        });
        break;
        
      case "addCustomer":
        // Quando o usuário quer adicionar um cliente ao deal
        toast({
          title: "Adicionar cliente",
          description: "Esta funcionalidade está sendo implementada."
        });
        break;
      
      default:
        toast({
          title: `Ação: ${action}`,
          description: "Esta funcionalidade está em desenvolvimento",
        });
    }
  };

  // Lidar com a criação de um novo asset
  const handleSaveAsset = (assetData: Partial<Asset>) => {
    const newAsset = createAsset(assetData);
    
    // Atualizar a interface ou realizar outras ações necessárias
    console.log("Asset criado:", newAsset);
  };

  // Definir departamento selecionado
  const handleSelectDepartment = (department: Department | null) => {
    setSelectedDepartment(department);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <WorkflowHeader 
          title="Gestão de Workflows" 
          description="Opere seus workflows e acompanhe seus deals" 
        />
        
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
                      isActive={currentWorkflow?.departments?.some(d => 
                        departments.find(dept => dept.id === d.id)?.pipelines?.some(p => p.id === pipeline.id)
                      )}
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

      {/* Modal de detalhes do Deal */}
      <DealDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        deal={selectedDeal}
        onAction={handleAction}
      />
      
      {/* Modal de criação de Asset */}
      <AssetCreationModal
        isOpen={isAssetModalOpen}
        onClose={() => setIsAssetModalOpen(false)}
        onSave={handleSaveAsset}
        dealId={currentDealId}
      />
    </DashboardLayout>
  );
};

export default WorkflowsPage;
