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
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Agent, Department, Pipeline, Stage } from "@/pages/Workflows/models/WorkflowModels";
import { getDepartments, getPipelines, getStages } from "@/pages/Settings/services/settingsService";
import { Eye, Ear, Mic, Phone, Video, Calendar, Mail, FileText, Database, MessageSquare, Search } from "lucide-react";

interface AgentConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  agent?: Agent;
  onSave: (agent: Partial<Agent>) => void;
}

const AVAILABLE_TOOLS = [
  { id: "vision", name: "Visão", icon: Eye },
  { id: "hearing", name: "Audição", icon: Ear },
  { id: "speech", name: "Fala", icon: Mic },
  { id: "telephony", name: "Telefonia", icon: Phone },
  { id: "meeting", name: "Meeting", icon: Video },
  { id: "calendar", name: "Agenda", icon: Calendar },
  { id: "email", name: "Email", icon: Mail },
  { id: "pdf", name: "PDF", icon: FileText },
  { id: "rag", name: "RAG", icon: Database },
  { id: "chat", name: "Chat", icon: MessageSquare },
  { id: "web-search", name: "Pesquisa Web", icon: Search }
];

const CONVERSATION_STYLES = [
  { id: "formal", name: "Formal" },
  { id: "informal", name: "Informal" },
  { id: "funny", name: "Engraçado" },
  { id: "friendly", name: "Amigável" },
  { id: "technical", name: "Técnico" },
  { id: "professional", name: "Profissional" }
];

const AgentConfigModal = ({ 
  isOpen, 
  onClose, 
  agent, 
  onSave 
}: AgentConfigModalProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const [departments, setDepartments] = useState<Department[]>([]);
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  const [stages, setStages] = useState<Stage[]>([]);
  const [formData, setFormData] = useState<Partial<Agent>>(
    agent || {
      profile: {
        name: "",
        role: "",
        goal: ""
      },
      workEnvironment: {},
      businessRules: {
        rules: [],
        restrictions: [],
        conversationStyle: "professional"
      },
      expertise: {
        knowledge: [],
        skills: [],
        examples: [],
        tasks: []
      },
      ragDocuments: [],
      tools: [],
      llmModel: "GPT-4",
      status: "active"
    }
  );

  useEffect(() => {
    setDepartments(getDepartments());
    setPipelines(getPipelines());
    setStages(getStages());
  }, []);
  
  useEffect(() => {
    if (agent) {
      setFormData(agent);
    }
  }, [agent]);

  const handleProfileChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      profile: {
        ...prev.profile!,
        [field]: value
      }
    }));
  };

  const handleWorkEnvironmentChange = (field: string, value: string) => {
    let newWorkEnvironment = {
      ...formData.workEnvironment!,
      [field]: value
    };

    if (field === "workflowTitle") {
      newWorkEnvironment.departmentTitle = "";
      newWorkEnvironment.stageTitle = "";
    } else if (field === "departmentTitle") {
      newWorkEnvironment.stageTitle = "";
    }

    setFormData(prev => ({
      ...prev,
      workEnvironment: newWorkEnvironment
    }));
  };

  const handleBusinessRulesChange = (field: string, value: string | string[]) => {
    if (field === "rules" || field === "restrictions") {
      const itemsArray = typeof value === 'string' 
        ? value.split('\n').filter(r => r.trim()) 
        : value;
      
      setFormData(prev => ({
        ...prev,
        businessRules: {
          ...prev.businessRules!,
          [field]: itemsArray
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        businessRules: {
          ...prev.businessRules!,
          [field]: value
        }
      }));
    }
  };

  const handleExpertiseChange = (field: string, value: string | string[]) => {
    if (field === "knowledge" || field === "skills" || field === "examples" || field === "tasks") {
      const itemsArray = typeof value === 'string' 
        ? value.split('\n').filter(item => item.trim()) 
        : value;
      
      setFormData(prev => ({
        ...prev,
        expertise: {
          ...prev.expertise!,
          [field]: itemsArray
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        expertise: {
          ...prev.expertise!,
          [field]: value
        }
      }));
    }
  };

  const handleRagDocumentsChange = (value: string) => {
    const documents = value.split('\n').map(d => d.trim()).filter(d => d);
    setFormData(prev => ({
      ...prev,
      ragDocuments: documents
    }));
  };

  const handleToolToggle = (toolId: string) => {
    const currentTools = formData.tools || [];
    
    if (currentTools.includes(toolId)) {
      setFormData(prev => ({
        ...prev,
        tools: currentTools.filter(t => t !== toolId)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        tools: [...currentTools, toolId]
      }));
    }
  };

  const handleLLMModelChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      llmModel: value
    }));
  };

  const handleStatusChange = (status: 'active' | 'paused' | 'blocked') => {
    setFormData(prev => ({
      ...prev,
      status
    }));
  };

  const handleSubmit = () => {
    if (!formData.profile?.name) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, informe um nome para o agente.",
        variant: "destructive",
      });
      return;
    }

    onSave(formData);
    toast({
      title: agent ? "Agente atualizado" : "Agente criado",
      description: `O agente "${formData.profile?.name}" foi ${agent ? "atualizado" : "criado"} com sucesso.`,
    });
    onClose();
  };

  const filteredPipelines = pipelines.filter(pipeline => 
    !formData.workEnvironment?.departmentTitle || 
    pipeline.departmentId === departments.find(d => d.title === formData.workEnvironment?.departmentTitle)?.id
  );

  const filteredStages = stages.filter(stage => 
    !formData.workEnvironment?.departmentTitle || 
    stage.pipelineId === filteredPipelines.find(p => p.title === formData.workEnvironment?.workflowTitle)?.id
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{agent ? "Editar Agente" : "Novo Agente"}</DialogTitle>
          <DialogDescription>
            {agent 
              ? "Edite as informações do agente existente." 
              : "Configure um novo agente de IA para seu workflow."}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-5">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="environment">Ambiente</TabsTrigger>
            <TabsTrigger value="rules">Regras</TabsTrigger>
            <TabsTrigger value="expertise">Expertise</TabsTrigger>
            <TabsTrigger value="rag">RAG</TabsTrigger>
            <TabsTrigger value="tools">Ferramentas</TabsTrigger>
            <TabsTrigger value="configuration">Config</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome do Agente</Label>
                <Input 
                  id="name"
                  value={formData.profile?.name || ""}
                  onChange={(e) => handleProfileChange("name", e.target.value)}
                  placeholder="Ex: Assistente de Vendas"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="role">Função</Label>
                <Input 
                  id="role"
                  value={formData.profile?.role || ""}
                  onChange={(e) => handleProfileChange("role", e.target.value)}
                  placeholder="Ex: Vendedor, Atendente, Consultor"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="goal">Objetivo</Label>
                <Textarea 
                  id="goal"
                  value={formData.profile?.goal || ""}
                  onChange={(e) => handleProfileChange("goal", e.target.value)}
                  placeholder="Descreva o objetivo principal deste agente"
                  rows={4}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="environment" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="workflowTitle">Workflow</Label>
                <Select 
                  value={formData.workEnvironment?.workflowTitle || ""} 
                  onValueChange={(value) => handleWorkEnvironmentChange("workflowTitle", value)}
                >
                  <SelectTrigger id="workflowTitle">
                    <SelectValue placeholder="Selecione o workflow" />
                  </SelectTrigger>
                  <SelectContent>
                    {pipelines.map(pipeline => (
                      <SelectItem key={pipeline.id} value={pipeline.title}>
                        {pipeline.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="departmentTitle">Departamento</Label>
                <Select 
                  value={formData.workEnvironment?.departmentTitle || ""} 
                  onValueChange={(value) => handleWorkEnvironmentChange("departmentTitle", value)}
                  disabled={!formData.workEnvironment?.workflowTitle}
                >
                  <SelectTrigger id="departmentTitle">
                    <SelectValue placeholder="Selecione o departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(department => (
                      <SelectItem key={department.id} value={department.title}>
                        {department.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="stageTitle">Estágio</Label>
                <Select 
                  value={formData.workEnvironment?.stageTitle || ""} 
                  onValueChange={(value) => handleWorkEnvironmentChange("stageTitle", value)}
                  disabled={!formData.workEnvironment?.departmentTitle}
                >
                  <SelectTrigger id="stageTitle">
                    <SelectValue placeholder="Selecione o estágio" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredStages.map(stage => (
                      <SelectItem key={stage.id} value={stage.title}>
                        {stage.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="workflowDescription">Descrição do Ambiente de Trabalho</Label>
                <Textarea 
                  id="workflowDescription"
                  value={formData.workEnvironment?.workflowDescription || ""}
                  onChange={(e) => handleWorkEnvironmentChange("workflowDescription", e.target.value)}
                  placeholder="Descreva o ambiente de trabalho do agente"
                  rows={3}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="rules" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="rules">Regras de Negócio</Label>
                <Textarea 
                  id="rules"
                  value={formData.businessRules?.rules?.join('\n') || ""}
                  onChange={(e) => handleBusinessRulesChange("rules", e.target.value)}
                  placeholder="Uma regra por linha"
                  rows={3}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="restrictions">Restrições</Label>
                <Textarea 
                  id="restrictions"
                  value={formData.businessRules?.restrictions?.join('\n') || ""}
                  onChange={(e) => handleBusinessRulesChange("restrictions", e.target.value)}
                  placeholder="Uma restrição por linha"
                  rows={3}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="conversationStyle">Estilo de Conversação</Label>
                <Select 
                  value={formData.businessRules?.conversationStyle || "professional"} 
                  onValueChange={(value) => handleBusinessRulesChange("conversationStyle", value)}
                >
                  <SelectTrigger id="conversationStyle">
                    <SelectValue placeholder="Selecione o estilo" />
                  </SelectTrigger>
                  <SelectContent>
                    {CONVERSATION_STYLES.map(style => (
                      <SelectItem key={style.id} value={style.id}>
                        {style.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="expertise" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="knowledge">Conhecimentos</Label>
                <Textarea 
                  id="knowledge"
                  value={formData.expertise?.knowledge?.join('\n') || ""}
                  onChange={(e) => handleExpertiseChange("knowledge", e.target.value)}
                  placeholder="Um conhecimento por linha"
                  rows={3}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="skills">Habilidades</Label>
                <Textarea 
                  id="skills"
                  value={formData.expertise?.skills?.join('\n') || ""}
                  onChange={(e) => handleExpertiseChange("skills", e.target.value)}
                  placeholder="Uma habilidade por linha"
                  rows={3}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="examples">Exemplos</Label>
                <Textarea 
                  id="examples"
                  value={formData.expertise?.examples?.join('\n') || ""}
                  onChange={(e) => handleExpertiseChange("examples", e.target.value)}
                  placeholder="Um exemplo por linha"
                  rows={3}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="tasks">Tarefas</Label>
                <Textarea 
                  id="tasks"
                  value={formData.expertise?.tasks?.join('\n') || ""}
                  onChange={(e) => handleExpertiseChange("tasks", e.target.value)}
                  placeholder="Uma tarefa por linha"
                  rows={3}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="rag" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="ragDocuments">Documentos RAG</Label>
                <Textarea 
                  id="ragDocuments"
                  value={formData.ragDocuments?.join('\n') || ""}
                  onChange={(e) => handleRagDocumentsChange(e.target.value)}
                  placeholder="Um documento por linha (ex: Produtos.pdf, Serviços.pdf)"
                  rows={6}
                />
                <p className="text-xs text-muted-foreground">
                  Exemplos: Produtos.pdf, Institucional.pdf, Serviços.pdf, Portfólio.pdf, Normativa.pdf, ProcedimentoOperacional.pdf
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tools" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Ferramentas disponíveis</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                {AVAILABLE_TOOLS.map(tool => {
                  const isActive = formData.tools?.includes(tool.id);
                  return (
                    <div key={tool.id} className={`p-3 rounded-md border ${isActive ? 'border-primary bg-primary/5' : 'border-input'}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <tool.icon className={`h-5 w-5 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                          <span className={`font-medium ${isActive ? 'text-primary' : ''}`}>{tool.name}</span>
                        </div>
                        <Switch 
                          checked={isActive}
                          onCheckedChange={() => handleToolToggle(tool.id)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="configuration" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="llmModel">Modelo LLM</Label>
                <Select 
                  value={formData.llmModel} 
                  onValueChange={handleLLMModelChange}
                >
                  <SelectTrigger id="llmModel">
                    <SelectValue placeholder="Selecione o modelo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GPT-4">GPT-4</SelectItem>
                    <SelectItem value="GPT-3.5">GPT-3.5</SelectItem>
                    <SelectItem value="Claude">Claude</SelectItem>
                    <SelectItem value="Claude-2">Claude-2</SelectItem>
                    <SelectItem value="Llama-3">Llama-3</SelectItem>
                    <SelectItem value="Gemini">Gemini</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Status</Label>
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center space-x-3">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="font-medium">Ativo</span>
                    </div>
                    <Switch 
                      checked={formData.status === 'active'}
                      onCheckedChange={() => handleStatusChange('active')}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center space-x-3">
                      <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                      <span className="font-medium">Pausado</span>
                    </div>
                    <Switch 
                      checked={formData.status === 'paused'}
                      onCheckedChange={() => handleStatusChange('paused')}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center space-x-3">
                      <div className="h-2 w-2 rounded-full bg-red-500"></div>
                      <span className="font-medium">Bloqueado</span>
                    </div>
                    <Switch 
                      checked={formData.status === 'blocked'}
                      onCheckedChange={() => handleStatusChange('blocked')}
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex space-x-2 justify-end">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSubmit}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AgentConfigModal;
