
import React, { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Workflow, 
  Department, 
  Pipeline, 
  Stage, 
  Agent, 
  Asset 
} from "@/pages/Workflows/models/WorkflowModels";
import { Plus, Trash, ChevronRight, ChevronsRight, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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
  const [activeTab, setActiveTab] = useState("workflow");
  const [formData, setFormData] = useState<Partial<Workflow>>(
    workflow || {
      title: "",
      description: "",
      status: "draft"
    }
  );

  // Estado para departamentos, pipelines, stages, agents e assets
  const [departments, setDepartments] = useState<Department[]>([]);
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  const [stages, setStages] = useState<Stage[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);

  // Estados para elementos selecionados
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [selectedPipeline, setSelectedPipeline] = useState<Pipeline | null>(null);
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  // Formulários para criar novos itens
  const [newDepartment, setNewDepartment] = useState<Partial<Department>>({ title: "", description: "" });
  const [newPipeline, setNewPipeline] = useState<Partial<Pipeline>>({ title: "", description: "" });
  const [newStage, setNewStage] = useState<Partial<Stage>>({ title: "", description: "", order: 0 });
  const [newAgent, setNewAgent] = useState<Partial<Agent>>({ profile: { name: "", role: "", goal: "" } });
  const [newAsset, setNewAsset] = useState<Partial<Asset>>({ title: "", description: "", type: "", status: "open" });

  // Estados para expandir/colapsar seções
  const [expandedDepartments, setExpandedDepartments] = useState<Record<string, boolean>>({});
  const [expandedPipelines, setExpandedPipelines] = useState<Record<string, boolean>>({});
  const [expandedStages, setExpandedStages] = useState<Record<string, boolean>>({});

  // Resetar os dados do formulário ao abrir o modal
  useEffect(() => {
    if (isOpen) {
      setFormData(
        workflow || {
          title: "",
          description: "",
          status: "draft"
        }
      );
      
      // Para um exemplo de demonstração, podemos inicializar com alguns dados de exemplo
      // Em uma implementação real, esses dados viriam de APIs
      if (workflow) {
        // Simular carregamento de departamentos, pipelines, etc.
        const demoData = getDemoData(workflow.id);
        setDepartments(demoData.departments);
        setPipelines(demoData.pipelines);
        setStages(demoData.stages);
        setAgents(demoData.agents);
        setAssets(demoData.assets);

        // Inicializar departamentos expandidos
        const deptExpanded: Record<string, boolean> = {};
        demoData.departments.forEach(dept => {
          deptExpanded[dept.id] = false;
        });
        setExpandedDepartments(deptExpanded);

        // Inicializar pipelines expandidos
        const pipeExpanded: Record<string, boolean> = {};
        demoData.pipelines.forEach(pipe => {
          pipeExpanded[pipe.id] = false;
        });
        setExpandedPipelines(pipeExpanded);

        // Inicializar stages expandidos
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
    
    // Inicializar como expandido
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
    
    // Inicializar como expandido
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
    
    // Inicializar como expandido
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
      dealId: "", // Seria associado a um deal posteriormente
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
    // Confirmar exclusão
    toast({
      title: "Remover Departamento",
      description: `Tem certeza que deseja remover este departamento? Todos os pipelines e estágios associados também serão removidos.`,
      variant: "destructive",
      action: (
        <Button 
          variant="outline" 
          onClick={() => {
            // Remover departamento
            setDepartments(prev => prev.filter(d => d.id !== departmentId));
            
            // Remover pipelines associados
            const pipelineIds = pipelines
              .filter(p => p.departmentId === departmentId)
              .map(p => p.id);
            
            setPipelines(prev => prev.filter(p => p.departmentId !== departmentId));
            
            // Remover estágios associados
            const stageIds = stages
              .filter(s => pipelineIds.includes(s.pipelineId))
              .map(s => s.id);
            
            setStages(prev => prev.filter(s => !pipelineIds.includes(s.pipelineId)));
            
            // Remover agentes associados
            setAgents(prev => prev.filter(a => !stageIds.includes(a.stageId)));
            
            // Atualizar seleções
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
    // Confirmar exclusão
    toast({
      title: "Remover Pipeline",
      description: `Tem certeza que deseja remover este pipeline? Todos os estágios associados também serão removidos.`,
      variant: "destructive",
      action: (
        <Button 
          variant="outline" 
          onClick={() => {
            // Remover pipeline
            setPipelines(prev => prev.filter(p => p.id !== pipelineId));
            
            // Remover estágios associados
            const stageIds = stages
              .filter(s => s.pipelineId === pipelineId)
              .map(s => s.id);
            
            setStages(prev => prev.filter(s => s.pipelineId !== pipelineId));
            
            // Remover agentes associados
            setAgents(prev => prev.filter(a => !stageIds.includes(a.stageId)));
            
            // Atualizar seleções
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
    // Confirmar exclusão
    toast({
      title: "Remover Estágio",
      description: `Tem certeza que deseja remover este estágio? Todos os agentes associados também serão removidos.`,
      variant: "destructive",
      action: (
        <Button 
          variant="outline" 
          onClick={() => {
            // Remover estágio
            setStages(prev => prev.filter(s => s.id !== stageId));
            
            // Remover agentes associados
            setAgents(prev => prev.filter(a => a.stageId !== stageId));
            
            // Atualizar seleções
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
    // Confirmar exclusão
    toast({
      title: "Remover Agente",
      description: `Tem certeza que deseja remover este agente?`,
      variant: "destructive",
      action: (
        <Button 
          variant="outline" 
          onClick={() => {
            // Remover agente
            setAgents(prev => prev.filter(a => a.id !== agentId));
            
            // Atualizar seleções
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
    // Confirmar exclusão
    toast({
      title: "Remover Asset",
      description: `Tem certeza que deseja remover este asset?`,
      variant: "destructive",
      action: (
        <Button 
          variant="outline" 
          onClick={() => {
            // Remover asset
            setAssets(prev => prev.filter(a => a.id !== assetId));
            
            // Atualizar seleções
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

  const handleSubmit = () => {
    if (!formData.title) {
      toast({
        title: "Título obrigatório",
        description: "Por favor, informe um título para o workflow.",
        variant: "destructive",
      });
      return;
    }

    // Aqui você poderia salvar também os departamentos, pipelines, etc.
    // associados ao workflow em uma implementação real
    onSave(formData);
    toast({
      title: workflow ? "Workflow atualizado" : "Workflow criado",
      description: `O workflow "${formData.title}" foi ${workflow ? "atualizado" : "criado"} com sucesso.`,
    });
    onClose();
  };

  const renderHierarchicalView = () => {
    if (departments.length === 0) {
      return (
        <div className="text-center p-8 text-muted-foreground">
          Nenhum departamento cadastrado. Adicione um departamento para começar.
        </div>
      );
    }

    return (
      <div className="space-y-4 mt-4">
        {departments.map(department => (
          <Collapsible 
            key={department.id}
            open={expandedDepartments[department.id]}
            onOpenChange={() => toggleDepartmentExpand(department.id)}
            className="border rounded-md"
          >
            <CollapsibleTrigger asChild>
              <div 
                className={`p-4 flex justify-between items-center cursor-pointer hover:bg-accent/50 transition-colors ${selectedDepartment?.id === department.id ? 'border-l-4 border-primary' : ''}`}
                onClick={() => setSelectedDepartment(department)}
              >
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: department.color || "#CBD5E1" }}
                  />
                  <div className="font-medium">{department.title}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteDepartment(department.id);
                    }}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                  {expandedDepartments[department.id] ? 
                    <ChevronDown className="h-5 w-5" /> : 
                    <ChevronRight className="h-5 w-5" />
                  }
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-4 pl-6 border-t bg-background/60">
                <div className="mb-3 text-sm font-medium">Adicionar Pipeline</div>
                <div className="grid grid-cols-12 gap-2 mb-4">
                  <div className="col-span-5">
                    <Input 
                      placeholder="Título do pipeline"
                      value={newPipeline.title}
                      onChange={(e) => setNewPipeline(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div className="col-span-5">
                    <Input 
                      placeholder="Descrição (opcional)"
                      value={newPipeline.description}
                      onChange={(e) => setNewPipeline(prev => ({ ...prev, description: e.target.value }))}
                    />
                  </div>
                  <div className="col-span-2">
                    <Button 
                      className="w-full"
                      size="sm"
                      onClick={() => handleAddPipeline(department.id)}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Adicionar
                    </Button>
                  </div>
                </div>

                <div className="space-y-2 pl-2">
                  {pipelines
                    .filter(p => p.departmentId === department.id)
                    .map(pipeline => (
                      <Collapsible 
                        key={pipeline.id}
                        open={expandedPipelines[pipeline.id]}
                        onOpenChange={() => togglePipelineExpand(pipeline.id)}
                        className="border rounded-md"
                      >
                        <CollapsibleTrigger asChild>
                          <div 
                            className={`p-3 flex justify-between items-center cursor-pointer hover:bg-accent/50 transition-colors ${selectedPipeline?.id === pipeline.id ? 'border-l-4 border-primary' : ''}`}
                            onClick={() => setSelectedPipeline(pipeline)}
                          >
                            <div className="flex items-center gap-2">
                              <div className="font-medium">{pipeline.title}</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeletePipeline(pipeline.id);
                                }}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                              {expandedPipelines[pipeline.id] ? 
                                <ChevronDown className="h-5 w-5" /> : 
                                <ChevronRight className="h-5 w-5" />
                              }
                            </div>
                          </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="p-3 pl-6 border-t bg-background/30">
                            <div className="mb-3 text-sm font-medium">Adicionar Estágio</div>
                            <div className="grid grid-cols-12 gap-2 mb-4">
                              <div className="col-span-5">
                                <Input 
                                  placeholder="Título do estágio"
                                  value={newStage.title}
                                  onChange={(e) => setNewStage(prev => ({ ...prev, title: e.target.value }))}
                                />
                              </div>
                              <div className="col-span-5">
                                <Input 
                                  placeholder="Descrição (opcional)"
                                  value={newStage.description}
                                  onChange={(e) => setNewStage(prev => ({ ...prev, description: e.target.value }))}
                                />
                              </div>
                              <div className="col-span-2">
                                <Button 
                                  className="w-full"
                                  size="sm"
                                  onClick={() => handleAddStage(pipeline.id)}
                                >
                                  <Plus className="h-4 w-4 mr-1" />
                                  Adicionar
                                </Button>
                              </div>
                            </div>

                            <div className="space-y-2 pl-2">
                              {stages
                                .filter(s => s.pipelineId === pipeline.id)
                                .sort((a, b) => a.order - b.order)
                                .map(stage => (
                                  <Collapsible 
                                    key={stage.id}
                                    open={expandedStages[stage.id]}
                                    onOpenChange={() => toggleStageExpand(stage.id)}
                                    className="border rounded-md"
                                  >
                                    <CollapsibleTrigger asChild>
                                      <div 
                                        className={`p-2 flex justify-between items-center cursor-pointer hover:bg-accent/50 transition-colors ${selectedStage?.id === stage.id ? 'border-l-4 border-primary' : ''}`}
                                        onClick={() => setSelectedStage(stage)}
                                      >
                                        <div className="flex items-center gap-2">
                                          <Badge variant="outline">{stage.order}</Badge>
                                          <div className="font-medium">{stage.title}</div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <Button 
                                            variant="ghost" 
                                            size="sm"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleDeleteStage(stage.id);
                                            }}
                                          >
                                            <Trash className="h-4 w-4" />
                                          </Button>
                                          {expandedStages[stage.id] ? 
                                            <ChevronDown className="h-5 w-5" /> : 
                                            <ChevronRight className="h-5 w-5" />
                                          }
                                        </div>
                                      </div>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                      <div className="p-2 pl-6 border-t bg-background/20 space-y-3">
                                        <div>
                                          <div className="mb-2 text-sm font-medium">Agentes</div>
                                          <div className="grid grid-cols-12 gap-2 mb-3">
                                            <div className="col-span-5">
                                              <Input 
                                                placeholder="Nome do agente"
                                                value={newAgent.profile?.name || ""}
                                                onChange={(e) => setNewAgent(prev => ({ 
                                                  ...prev, 
                                                  profile: { ...prev.profile!, name: e.target.value } 
                                                }))}
                                              />
                                            </div>
                                            <div className="col-span-5">
                                              <Input 
                                                placeholder="Função (opcional)"
                                                value={newAgent.profile?.role || ""}
                                                onChange={(e) => setNewAgent(prev => ({ 
                                                  ...prev, 
                                                  profile: { ...prev.profile!, role: e.target.value } 
                                                }))}
                                              />
                                            </div>
                                            <div className="col-span-2">
                                              <Button 
                                                className="w-full"
                                                size="sm"
                                                onClick={() => handleAddAgent(stage.id)}
                                              >
                                                <Plus className="h-4 w-4 mr-1" />
                                                Adicionar
                                              </Button>
                                            </div>
                                          </div>

                                          <div className="space-y-2 pl-2">
                                            {agents
                                              .filter(a => a.stageId === stage.id)
                                              .map(agent => (
                                                <div 
                                                  key={agent.id}
                                                  className={`p-2 border rounded-md flex justify-between items-center hover:bg-accent/30 cursor-pointer transition-colors ${selectedAgent?.id === agent.id ? 'border-l-4 border-primary' : ''}`}
                                                  onClick={() => setSelectedAgent(agent)}
                                                >
                                                  <div>
                                                    <div className="font-medium">{agent.profile.name}</div>
                                                    <div className="text-xs text-muted-foreground">{agent.profile.role}</div>
                                                  </div>
                                                  <Button 
                                                    variant="ghost" 
                                                    size="sm"
                                                    onClick={(e) => {
                                                      e.stopPropagation();
                                                      handleDeleteAgent(agent.id);
                                                    }}
                                                  >
                                                    <Trash className="h-4 w-4" />
                                                  </Button>
                                                </div>
                                              ))}
                                          </div>
                                        </div>

                                        <div>
                                          <div className="mb-2 text-sm font-medium">Assets</div>
                                          <div className="grid grid-cols-12 gap-2 mb-3">
                                            <div className="col-span-5">
                                              <Input 
                                                placeholder="Título do asset"
                                                value={newAsset.title}
                                                onChange={(e) => setNewAsset(prev => ({ ...prev, title: e.target.value }))}
                                              />
                                            </div>
                                            <div className="col-span-5">
                                              <Select
                                                value={newAsset.type}
                                                onValueChange={(value) => setNewAsset(prev => ({ ...prev, type: value }))}
                                              >
                                                <SelectTrigger>
                                                  <SelectValue placeholder="Tipo de asset" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                  <SelectItem value="Documento">Documento</SelectItem>
                                                  <SelectItem value="Contrato">Contrato</SelectItem>
                                                  <SelectItem value="Lead">Lead</SelectItem>
                                                  <SelectItem value="Produto">Produto</SelectItem>
                                                  <SelectItem value="Serviço">Serviço</SelectItem>
                                                </SelectContent>
                                              </Select>
                                            </div>
                                            <div className="col-span-2">
                                              <Button 
                                                className="w-full"
                                                size="sm"
                                                onClick={() => handleAddAsset(stage.id)}
                                              >
                                                <Plus className="h-4 w-4 mr-1" />
                                                Adicionar
                                              </Button>
                                            </div>
                                          </div>

                                          <div className="space-y-2 pl-2">
                                            {assets
                                              .filter(asset => asset.dealId.includes(stage.id)) // Simulação de relação
                                              .map(asset => (
                                                <div 
                                                  key={asset.id}
                                                  className={`p-2 border rounded-md flex justify-between items-center hover:bg-accent/30 cursor-pointer transition-colors ${selectedAsset?.id === asset.id ? 'border-l-4 border-primary' : ''}`}
                                                  onClick={() => setSelectedAsset(asset)}
                                                >
                                                  <div>
                                                    <div className="font-medium">{asset.title}</div>
                                                    <div className="text-xs text-muted-foreground">{asset.type}</div>
                                                  </div>
                                                  <Button 
                                                    variant="ghost" 
                                                    size="sm"
                                                    onClick={(e) => {
                                                      e.stopPropagation();
                                                      handleDeleteAsset(asset.id);
                                                    }}
                                                  >
                                                    <Trash className="h-4 w-4" />
                                                  </Button>
                                                </div>
                                              ))}
                                          </div>
                                        </div>
                                      </div>
                                    </CollapsibleContent>
                                  </Collapsible>
                                ))}
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    );
  };

  const renderDepartmentForm = () => {
    return (
      <div className="bg-muted/50 p-4 rounded-md mb-6">
        <h3 className="text-lg font-medium mb-3">Adicionar Departamento</h3>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="department-title">Título</Label>
            <Input 
              id="department-title"
              placeholder="Nome do departamento"
              value={newDepartment.title}
              onChange={(e) => setNewDepartment(prev => ({ ...prev, title: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="department-description">Descrição</Label>
            <Textarea 
              id="department-description"
              placeholder="Descreva a função deste departamento"
              rows={2}
              value={newDepartment.description}
              onChange={(e) => setNewDepartment(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>
          <Button 
            className="w-full"
            onClick={handleAddDepartment}
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Departamento
          </Button>
        </div>
      </div>
    );
  };

  // Função de demonstração para gerar dados de exemplo
  const getDemoData = (workflowId: string) => {
    const departments: Department[] = [
      {
        id: "dept-101",
        title: "Comercial",
        description: "Departamento responsável pelas vendas e negociações",
        color: "#6366F1"
      },
      {
        id: "dept-102",
        title: "Marketing",
        description: "Departamento responsável por estratégias de marketing",
        color: "#EC4899"
      }
    ];

    const pipelines: Pipeline[] = [
      {
        id: "pipeline-201",
        departmentId: "dept-101",
        title: "Pipeline de Vendas",
        description: "Processo de vendas completo",
        stages: []
      },
      {
        id: "pipeline-202",
        departmentId: "dept-101",
        title: "Atendimento Pós-Venda",
        description: "Suporte e acompanhamento pós-venda",
        stages: []
      }
    ];

    const stages: Stage[] = [
      {
        id: "stage-301",
        pipelineId: "pipeline-201",
        title: "Prospecção",
        description: "Prospecção de novos clientes",
        order: 1
      },
      {
        id: "stage-302",
        pipelineId: "pipeline-201",
        title: "Qualificação",
        description: "Qualificação de leads",
        order: 2
      },
      {
        id: "stage-303",
        pipelineId: "pipeline-201",
        title: "Proposta",
        description: "Envio de propostas",
        order: 3
      }
    ];

    const agents: Agent[] = [
      {
        id: "agent-401",
        stageId: "stage-301",
        profile: {
          name: "Agente de Prospecção",
          role: "Vendedor",
          goal: "Encontrar novos leads qualificados"
        },
        workEnvironment: {
          workflowTitle: "Processo de Vendas B2B",
          stageTitle: "Prospecção"
        },
        businessRules: {},
        expertise: {},
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    const assets: Asset[] = [
      {
        id: "asset-501",
        dealId: "stage-301", // Simulando relação com o stage
        title: "Lead Generator",
        description: "Ferramenta para geração de leads qualificados",
        type: "Ferramenta",
        status: "open",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    return { departments, pipelines, stages, agents, assets };
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{workflow ? "Editar Workflow" : "Novo Workflow"}</DialogTitle>
          <DialogDescription>
            {workflow 
              ? "Edite as informações do workflow existente." 
              : "Configure um novo workflow para seu negócio."}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="workflow">Workflow</TabsTrigger>
            <TabsTrigger value="structure">Estrutura</TabsTrigger>
            <TabsTrigger value="versions">Versões</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto p-1">
            <TabsContent value="workflow" className="mt-4">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Título</Label>
                  <Input 
                    id="title"
                    name="title"
                    placeholder="Título do workflow"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea 
                    id="description"
                    name="description"
                    placeholder="Descreva o objetivo deste workflow"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Status</Label>
                  <div className="flex space-x-4">
                    <Button 
                      type="button" 
                      variant={formData.status === 'active' ? "default" : "outline"}
                      onClick={() => handleStatusChange('active')}
                      className="flex-1"
                    >
                      Ativo
                    </Button>
                    <Button 
                      type="button" 
                      variant={formData.status === 'inactive' ? "default" : "outline"}
                      onClick={() => handleStatusChange('inactive')}
                      className="flex-1"
                    >
                      Inativo
                    </Button>
                    <Button 
                      type="button" 
                      variant={formData.status === 'draft' ? "default" : "outline"}
                      onClick={() => handleStatusChange('draft')}
                      className="flex-1"
                    >
                      Rascunho
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="structure" className="mt-4">
              <div className="space-y-6">
                {renderDepartmentForm()}
                <Separator />
                {renderHierarchicalView()}
              </div>
            </TabsContent>

            <TabsContent value="versions" className="mt-4">
              <div className="flex items-center justify-center h-40 border rounded-md text-muted-foreground">
                Gerenciamento de versões em desenvolvimento
              </div>
            </TabsContent>
          </div>
        </Tabs>

        <DialogFooter className="flex space-x-2 justify-end">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button variant="destructive" onClick={onClose}>Deletar</Button>
          <Button onClick={handleSubmit}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WorkflowConfigModal;
