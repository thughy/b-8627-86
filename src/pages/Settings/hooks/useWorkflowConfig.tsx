import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { 
  Workflow, 
  Department, 
  Pipeline, 
  Stage, 
  Agent, 
  Asset 
} from "@/pages/Workflows/models/WorkflowModels";
import { getDemoData } from "../components/modals/workflow/MockDataGenerator";

export const useWorkflowConfig = (
  isOpen: boolean,
  workflow?: Workflow
) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("workflow");
  const [formData, setFormData] = useState<Partial<Workflow>>(
    workflow || {
      title: "",
      description: "",
      status: "draft"
    }
  );

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

  const [newDepartment, setNewDepartment] = useState<Partial<Department>>({ title: "", description: "" });
  const [newPipeline, setNewPipeline] = useState<Partial<Pipeline>>({ title: "", description: "" });
  const [newStage, setNewStage] = useState<Partial<Stage>>({ title: "", description: "", order: 0 });
  const [newAgent, setNewAgent] = useState<Partial<Agent>>({ profile: { name: "", role: "", goal: "" } });
  const [newAsset, setNewAsset] = useState<Partial<Asset>>({ title: "", description: "", type: "", status: "open" });

  const [expandedDepartments, setExpandedDepartments] = useState<Record<string, boolean>>({});
  const [expandedPipelines, setExpandedPipelines] = useState<Record<string, boolean>>({});
  const [expandedStages, setExpandedStages] = useState<Record<string, boolean>>({});

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
  }, [isOpen, workflow]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (status: 'active' | 'inactive' | 'draft') => {
    setFormData(prev => ({ ...prev, status }));
  };

  const toggleDepartmentExpand = (deptId: string) => {
    setExpandedDepartments(prev => ({
      ...prev,
      [deptId]: !prev[deptId]
    }));
  };

  const togglePipelineExpand = (pipeId: string) => {
    setExpandedPipelines(prev => ({
      ...prev,
      [pipeId]: !prev[pipeId]
    }));
  };

  const toggleStageExpand = (stageId: string) => {
    setExpandedStages(prev => ({
      ...prev,
      [stageId]: !prev[stageId]
    }));
  };

  const handleAddDepartment = () => {
    if (!newDepartment.title) {
      toast({
        title: "Título obrigatório",
        description: "Por favor, informe um título para o departamento.",
        variant: "destructive",
      });
      return;
    }

    const department: Department = {
      id: `dept-${Date.now()}`,
      title: newDepartment.title,
      description: newDepartment.description || "",
      color: "#6366F1"
    };

    setDepartments(prev => [...prev, department]);
    setSelectedDepartment(department);
    setNewDepartment({ title: "", description: "" });
    
    setExpandedDepartments(prev => ({
      ...prev,
      [department.id]: true
    }));
    
    toast({
      title: "Departamento adicionado",
      description: `O departamento "${department.title}" foi adicionado com sucesso.`,
    });
  };

  const handleAddPipeline = (departmentId: string) => {
    if (!newPipeline.title) {
      toast({
        title: "Título obrigatório",
        description: "Por favor, informe um título para o pipeline.",
        variant: "destructive",
      });
      return;
    }

    const pipeline: Pipeline = {
      id: `pipeline-${Date.now()}`,
      departmentId: departmentId,
      title: newPipeline.title,
      description: newPipeline.description || "",
      stages: []
    };

    setPipelines(prev => [...prev, pipeline]);
    setSelectedPipeline(pipeline);
    setNewPipeline({ title: "", description: "" });
    
    setExpandedPipelines(prev => ({
      ...prev,
      [pipeline.id]: true
    }));
    
    toast({
      title: "Pipeline adicionado",
      description: `O pipeline "${pipeline.title}" foi adicionado com sucesso.`,
    });
  };

  const handleAddStage = (pipelineId: string) => {
    if (!newStage.title) {
      toast({
        title: "Título obrigatório",
        description: "Por favor, informe um título para o estágio.",
        variant: "destructive",
      });
      return;
    }

    const stagesInPipeline = stages.filter(s => s.pipelineId === pipelineId);
    const nextOrder = stagesInPipeline.length > 0 
      ? Math.max(...stagesInPipeline.map(s => s.order)) + 1 
      : 1;

    const stage: Stage = {
      id: `stage-${Date.now()}`,
      pipelineId: pipelineId,
      title: newStage.title,
      description: newStage.description || "",
      order: nextOrder
    };

    setStages(prev => [...prev, stage]);
    setSelectedStage(stage);
    setNewStage({ title: "", description: "", order: 0 });
    
    setExpandedStages(prev => ({
      ...prev,
      [stage.id]: true
    }));
    
    toast({
      title: "Estágio adicionado",
      description: `O estágio "${stage.title}" foi adicionado com sucesso.`,
    });
  };

  const handleAddAgent = (stageId: string) => {
    if (!newAgent.profile?.name) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, informe um nome para o agente.",
        variant: "destructive",
      });
      return;
    }

    const agent: Agent = {
      id: `agent-${Date.now()}`,
      stageId: stageId,
      profile: {
        name: newAgent.profile.name,
        role: newAgent.profile.role || "Assistente",
        goal: newAgent.profile.goal || ""
      },
      workEnvironment: {
        stageTitle: stages.find(s => s.id === stageId)?.title || ""
      },
      businessRules: {},
      expertise: {},
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setAgents(prev => [...prev, agent]);
    setSelectedAgent(agent);
    setNewAgent({ profile: { name: "", role: "", goal: "" } });
    
    toast({
      title: "Agente adicionado",
      description: `O agente "${agent.profile.name}" foi adicionado com sucesso.`,
    });
  };

  const handleAddAsset = (stageId: string) => {
    if (!newAsset.title) {
      toast({
        title: "Título obrigatório",
        description: "Por favor, informe um título para o asset.",
        variant: "destructive",
      });
      return;
    }

    const asset: Asset = {
      id: `asset-${Date.now()}`,
      dealId: stageId,
      title: newAsset.title,
      description: newAsset.description || "",
      type: newAsset.type || "Documento",
      status: "open",
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setAssets(prev => [...prev, asset]);
    setSelectedAsset(asset);
    setNewAsset({ title: "", description: "", type: "", status: "open" });
    
    toast({
      title: "Asset adicionado",
      description: `O asset "${asset.title}" foi adicionado com sucesso.`,
    });
  };

  const handleDeleteDepartment = (departmentId: string) => {
    toast({
      title: "Remover Departamento",
      description: `Tem certeza que deseja remover este departamento? Todos os pipelines e estágios associados também serão removidos.`,
      variant: "destructive",
      action: (
        <Button 
          variant="outline" 
          onClick={() => {
            setDepartments(prev => prev.filter(d => d.id !== departmentId));
            
            const pipelineIds = pipelines
              .filter(p => p.departmentId === departmentId)
              .map(p => p.id);
            
            setPipelines(prev => prev.filter(p => p.departmentId !== departmentId));
            
            const stageIds = stages
              .filter(s => pipelineIds.includes(s.pipelineId))
              .map(s => s.id);
            
            setStages(prev => prev.filter(s => !pipelineIds.includes(s.pipelineId)));
            
            setAgents(prev => prev.filter(a => !stageIds.includes(a.stageId)));
            
            if (selectedDepartment?.id === departmentId) {
              setSelectedDepartment(null);
            }
            
            toast({
              title: "Departamento removido",
              description: `O departamento e seus componentes foram removidos com sucesso.`,
            });
          }}
        >
          Confirmar
        </Button>
      ),
    });
  };

  const handleDeletePipeline = (pipelineId: string) => {
    toast({
      title: "Remover Pipeline",
      description: `Tem certeza que deseja remover este pipeline? Todos os estágios associados também serão removidos.`,
      variant: "destructive",
      action: (
        <Button 
          variant="outline" 
          onClick={() => {
            setPipelines(prev => prev.filter(p => p.id !== pipelineId));
            
            const stageIds = stages
              .filter(s => s.pipelineId === pipelineId)
              .map(s => s.id);
            
            setStages(prev => prev.filter(s => s.pipelineId !== pipelineId));
            
            setAgents(prev => prev.filter(a => !stageIds.includes(a.stageId)));
            
            if (selectedPipeline?.id === pipelineId) {
              setSelectedPipeline(null);
            }
            
            toast({
              title: "Pipeline removido",
              description: `O pipeline e seus componentes foram removidos com sucesso.`,
            });
          }}
        >
          Confirmar
        </Button>
      ),
    });
  };

  const handleDeleteStage = (stageId: string) => {
    toast({
      title: "Remover Estágio",
      description: `Tem certeza que deseja remover este estágio? Todos os agentes associados também serão removidos.`,
      variant: "destructive",
      action: (
        <Button 
          variant="outline" 
          onClick={() => {
            setStages(prev => prev.filter(s => s.id !== stageId));
            
            setAgents(prev => prev.filter(a => a.stageId !== stageId));
            
            if (selectedStage?.id === stageId) {
              setSelectedStage(null);
            }
            
            toast({
              title: "Estágio removido",
              description: `O estágio e seus componentes foram removidos com sucesso.`,
            });
          }}
        >
          Confirmar
        </Button>
      ),
    });
  };

  const handleDeleteAgent = (agentId: string) => {
    toast({
      title: "Remover Agente",
      description: `Tem certeza que deseja remover este agente?`,
      variant: "destructive",
      action: (
        <Button 
          variant="outline" 
          onClick={() => {
            setAgents(prev => prev.filter(a => a.id !== agentId));
            
            if (selectedAgent?.id === agentId) {
              setSelectedAgent(null);
            }
            
            toast({
              title: "Agente removido",
              description: `O agente foi removido com sucesso.`,
            });
          }}
        >
          Confirmar
        </Button>
      ),
    });
  };

  const handleDeleteAsset = (assetId: string) => {
    toast({
      title: "Remover Asset",
      description: `Tem certeza que deseja remover este asset?`,
      variant: "destructive",
      action: (
        <Button 
          variant="outline" 
          onClick={() => {
            setAssets(prev => prev.filter(a => a.id !== assetId));
            
            if (selectedAsset?.id === assetId) {
              setSelectedAsset(null);
            }
            
            toast({
              title: "Asset removido",
              description: `O asset foi removido com sucesso.`,
            });
          }}
        >
          Confirmar
        </Button>
      ),
    });
  };

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
  };
};
