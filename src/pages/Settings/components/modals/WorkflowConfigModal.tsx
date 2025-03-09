
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
import { useToast } from "@/hooks/use-toast";
import { 
  Workflow, 
  Department, 
  Pipeline, 
  Stage, 
  Agent, 
  Asset 
} from "@/pages/Workflows/models/WorkflowModels";
import { Plus, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  const [selectedPipeline, setSelectedPipeline] = useState<Pipeline | null>(null);
  const [stages, setStages] = useState<Stage[]>([]);
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);

  // Formulários para criar novos itens
  const [newDepartment, setNewDepartment] = useState<Partial<Department>>({ title: "", description: "" });
  const [newPipeline, setNewPipeline] = useState<Partial<Pipeline>>({ title: "", description: "" });
  const [newStage, setNewStage] = useState<Partial<Stage>>({ title: "", description: "", order: 0 });
  const [newAgent, setNewAgent] = useState<Partial<Agent>>({ profile: { name: "", role: "", goal: "" } });
  const [newAsset, setNewAsset] = useState<Partial<Asset>>({ title: "", description: "", type: "", status: "open" });

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
      } else {
        setDepartments([]);
        setPipelines([]);
        setStages([]);
        setAgents([]);
        setAssets([]);
      }
      
      setActiveTab("workflow");
    }
  }, [isOpen, workflow]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (status: 'active' | 'inactive' | 'draft') => {
    setFormData(prev => ({ ...prev, status }));
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
    
    toast({
      title: "Departamento adicionado",
      description: `O departamento "${department.title}" foi adicionado com sucesso.`,
    });
  };

  const handleAddPipeline = () => {
    if (!selectedDepartment) {
      toast({
        title: "Departamento necessário",
        description: "Selecione um departamento antes de adicionar um pipeline.",
        variant: "destructive",
      });
      return;
    }

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
      departmentId: selectedDepartment.id,
      title: newPipeline.title,
      description: newPipeline.description || "",
      stages: []
    };

    setPipelines(prev => [...prev, pipeline]);
    setSelectedPipeline(pipeline);
    setNewPipeline({ title: "", description: "" });
    
    toast({
      title: "Pipeline adicionado",
      description: `O pipeline "${pipeline.title}" foi adicionado com sucesso.`,
    });
  };

  const handleAddStage = () => {
    if (!selectedPipeline) {
      toast({
        title: "Pipeline necessário",
        description: "Selecione um pipeline antes de adicionar um estágio.",
        variant: "destructive",
      });
      return;
    }

    if (!newStage.title) {
      toast({
        title: "Título obrigatório",
        description: "Por favor, informe um título para o estágio.",
        variant: "destructive",
      });
      return;
    }

    const stage: Stage = {
      id: `stage-${Date.now()}`,
      pipelineId: selectedPipeline.id,
      title: newStage.title,
      description: newStage.description || "",
      order: stages.filter(s => s.pipelineId === selectedPipeline.id).length + 1
    };

    setStages(prev => [...prev, stage]);
    setSelectedStage(stage);
    setNewStage({ title: "", description: "", order: 0 });
    
    toast({
      title: "Estágio adicionado",
      description: `O estágio "${stage.title}" foi adicionado com sucesso.`,
    });
  };

  const handleAddAgent = () => {
    if (!selectedStage) {
      toast({
        title: "Estágio necessário",
        description: "Selecione um estágio antes de adicionar um agente.",
        variant: "destructive",
      });
      return;
    }

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
      stageId: selectedStage.id,
      profile: {
        name: newAgent.profile.name,
        role: newAgent.profile.role || "Assistente",
        goal: newAgent.profile.goal || ""
      },
      workEnvironment: {
        stageTitle: selectedStage.title
      },
      businessRules: {},
      expertise: {},
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setAgents(prev => [...prev, agent]);
    setNewAgent({ profile: { name: "", role: "", goal: "" } });
    
    toast({
      title: "Agente adicionado",
      description: `O agente "${agent.profile.name}" foi adicionado com sucesso.`,
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

  const renderDepartmentsList = () => {
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
          <Card 
            key={department.id} 
            className={`cursor-pointer hover:bg-accent/50 transition-colors ${selectedDepartment?.id === department.id ? 'border-primary' : ''}`}
            onClick={() => setSelectedDepartment(department)}
          >
            <CardHeader className="py-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: department.color || "#CBD5E1" }}
                  />
                  {department.title}
                </CardTitle>
                <Button variant="ghost" size="icon">
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            {department.description && (
              <CardContent className="py-0 pb-3">
                <p className="text-sm text-muted-foreground">{department.description}</p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    );
  };

  const renderPipelinesList = () => {
    if (!selectedDepartment) {
      return (
        <div className="text-center p-8 text-muted-foreground">
          Selecione um departamento para ver os pipelines associados.
        </div>
      );
    }

    const departmentPipelines = pipelines.filter(p => p.departmentId === selectedDepartment.id);
    
    if (departmentPipelines.length === 0) {
      return (
        <div className="text-center p-8 text-muted-foreground">
          Nenhum pipeline cadastrado para este departamento. Adicione um pipeline para continuar.
        </div>
      );
    }

    return (
      <div className="space-y-4 mt-4">
        {departmentPipelines.map(pipeline => (
          <Card 
            key={pipeline.id} 
            className={`cursor-pointer hover:bg-accent/50 transition-colors ${selectedPipeline?.id === pipeline.id ? 'border-primary' : ''}`}
            onClick={() => setSelectedPipeline(pipeline)}
          >
            <CardHeader className="py-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">{pipeline.title}</CardTitle>
                <Button variant="ghost" size="icon">
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            {pipeline.description && (
              <CardContent className="py-0 pb-3">
                <p className="text-sm text-muted-foreground">{pipeline.description}</p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    );
  };

  const renderStagesList = () => {
    if (!selectedPipeline) {
      return (
        <div className="text-center p-8 text-muted-foreground">
          Selecione um pipeline para ver os estágios associados.
        </div>
      );
    }

    const pipelineStages = stages
      .filter(s => s.pipelineId === selectedPipeline.id)
      .sort((a, b) => a.order - b.order);
    
    if (pipelineStages.length === 0) {
      return (
        <div className="text-center p-8 text-muted-foreground">
          Nenhum estágio cadastrado para este pipeline. Adicione um estágio para continuar.
        </div>
      );
    }

    return (
      <div className="space-y-4 mt-4">
        {pipelineStages.map(stage => (
          <Card 
            key={stage.id} 
            className={`cursor-pointer hover:bg-accent/50 transition-colors ${selectedStage?.id === stage.id ? 'border-primary' : ''}`}
            onClick={() => setSelectedStage(stage)}
          >
            <CardHeader className="py-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Badge variant="outline">{stage.order}</Badge>
                  {stage.title}
                </CardTitle>
                <Button variant="ghost" size="icon">
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            {stage.description && (
              <CardContent className="py-0 pb-3">
                <p className="text-sm text-muted-foreground">{stage.description}</p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    );
  };

  const renderAgentsList = () => {
    if (!selectedStage) {
      return (
        <div className="text-center p-8 text-muted-foreground">
          Selecione um estágio para ver os agentes associados.
        </div>
      );
    }

    const stageAgents = agents.filter(a => a.stageId === selectedStage.id);
    
    if (stageAgents.length === 0) {
      return (
        <div className="text-center p-8 text-muted-foreground">
          Nenhum agente cadastrado para este estágio. Adicione um agente para continuar.
        </div>
      );
    }

    return (
      <div className="space-y-4 mt-4">
        {stageAgents.map(agent => (
          <Card key={agent.id}>
            <CardHeader className="py-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">{agent.profile.name}</CardTitle>
                <Badge className={`${agent.status === 'active' ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'}`}>
                  {agent.status === 'active' ? 'Ativo' : 'Inativo'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="py-0 pb-3">
              <p className="text-sm font-medium">{agent.profile.role}</p>
              {agent.profile.goal && (
                <p className="text-sm text-muted-foreground mt-1">{agent.profile.goal}</p>
              )}
            </CardContent>
          </Card>
        ))}
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

    const assets: Asset[] = [];

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
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="workflow">Workflow</TabsTrigger>
            <TabsTrigger value="department">Departamentos</TabsTrigger>
            <TabsTrigger value="pipeline">Pipelines</TabsTrigger>
            <TabsTrigger value="stage">Estágios</TabsTrigger>
            <TabsTrigger value="agent">Agentes</TabsTrigger>
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

            <TabsContent value="department" className="mt-4">
              <div className="space-y-6">
                <div className="bg-muted/50 p-4 rounded-md">
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

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-3">Departamentos</h3>
                  {renderDepartmentsList()}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="pipeline" className="mt-4">
              <div className="space-y-6">
                <div className="bg-muted/50 p-4 rounded-md">
                  <h3 className="text-lg font-medium mb-3">Adicionar Pipeline</h3>
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="department-select">Departamento</Label>
                      <div className="p-2 border rounded-md bg-background">
                        {selectedDepartment ? (
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: selectedDepartment.color || "#CBD5E1" }}
                            />
                            <span>{selectedDepartment.title}</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">Selecione um departamento na aba Departamentos</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="pipeline-title">Título</Label>
                      <Input 
                        id="pipeline-title"
                        placeholder="Nome do pipeline"
                        value={newPipeline.title}
                        onChange={(e) => setNewPipeline(prev => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="pipeline-description">Descrição</Label>
                      <Textarea 
                        id="pipeline-description"
                        placeholder="Descreva a função deste pipeline"
                        rows={2}
                        value={newPipeline.description}
                        onChange={(e) => setNewPipeline(prev => ({ ...prev, description: e.target.value }))}
                      />
                    </div>
                    <Button 
                      className="w-full"
                      onClick={handleAddPipeline}
                      disabled={!selectedDepartment}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Pipeline
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-3">Pipelines</h3>
                  {renderPipelinesList()}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="stage" className="mt-4">
              <div className="space-y-6">
                <div className="bg-muted/50 p-4 rounded-md">
                  <h3 className="text-lg font-medium mb-3">Adicionar Estágio</h3>
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="pipeline-select">Pipeline</Label>
                      <div className="p-2 border rounded-md bg-background">
                        {selectedPipeline ? (
                          <span>{selectedPipeline.title}</span>
                        ) : (
                          <span className="text-muted-foreground">Selecione um pipeline na aba Pipelines</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="stage-title">Título</Label>
                      <Input 
                        id="stage-title"
                        placeholder="Nome do estágio"
                        value={newStage.title}
                        onChange={(e) => setNewStage(prev => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="stage-description">Descrição</Label>
                      <Textarea 
                        id="stage-description"
                        placeholder="Descreva a função deste estágio"
                        rows={2}
                        value={newStage.description}
                        onChange={(e) => setNewStage(prev => ({ ...prev, description: e.target.value }))}
                      />
                    </div>
                    <Button 
                      className="w-full"
                      onClick={handleAddStage}
                      disabled={!selectedPipeline}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Estágio
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-3">Estágios</h3>
                  {renderStagesList()}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="agent" className="mt-4">
              <div className="space-y-6">
                <div className="bg-muted/50 p-4 rounded-md">
                  <h3 className="text-lg font-medium mb-3">Adicionar Agente</h3>
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="stage-select">Estágio</Label>
                      <div className="p-2 border rounded-md bg-background">
                        {selectedStage ? (
                          <span>{selectedStage.title}</span>
                        ) : (
                          <span className="text-muted-foreground">Selecione um estágio na aba Estágios</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="agent-name">Nome do Agente</Label>
                      <Input 
                        id="agent-name"
                        placeholder="Nome do agente"
                        value={newAgent.profile?.name || ""}
                        onChange={(e) => setNewAgent(prev => ({ 
                          ...prev, 
                          profile: { ...prev.profile!, name: e.target.value } 
                        }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="agent-role">Função</Label>
                      <Input 
                        id="agent-role"
                        placeholder="Função deste agente"
                        value={newAgent.profile?.role || ""}
                        onChange={(e) => setNewAgent(prev => ({ 
                          ...prev, 
                          profile: { ...prev.profile!, role: e.target.value } 
                        }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="agent-goal">Objetivo</Label>
                      <Textarea 
                        id="agent-goal"
                        placeholder="Objetivo principal deste agente"
                        rows={2}
                        value={newAgent.profile?.goal || ""}
                        onChange={(e) => setNewAgent(prev => ({ 
                          ...prev, 
                          profile: { ...prev.profile!, goal: e.target.value } 
                        }))}
                      />
                    </div>
                    <Button 
                      className="w-full"
                      onClick={handleAddAgent}
                      disabled={!selectedStage}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Agente
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-3">Agentes</h3>
                  {renderAgentsList()}
                </div>
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
