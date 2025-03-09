
import React, { useState } from "react";
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
import { Agent } from "@/pages/Workflows/models/WorkflowModels";

interface AgentConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  agent?: Agent;
  onSave: (agent: Partial<Agent>) => void;
}

const AgentConfigModal = ({ 
  isOpen, 
  onClose, 
  agent, 
  onSave 
}: AgentConfigModalProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState<Partial<Agent>>(
    agent || {
      profile: {
        name: "",
        role: "",
        goal: ""
      },
      workEnvironment: {},
      businessRules: {},
      expertise: {},
      ragDocuments: [],
      tools: [],
      llmModel: "GPT-4",
      status: "active"
    }
  );

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
    setFormData(prev => ({
      ...prev,
      workEnvironment: {
        ...prev.workEnvironment!,
        [field]: value
      }
    }));
  };

  const handleBusinessRulesChange = (field: string, value: string | string[]) => {
    // Corrigindo para aceitar tanto string como array de strings
    if (field === "rules") {
      // Se for o campo "rules", garantimos que seja um array
      const rulesArray = typeof value === 'string' 
        ? value.split('\n').filter(r => r.trim()) 
        : value;
      
      setFormData(prev => ({
        ...prev,
        businessRules: {
          ...prev.businessRules!,
          rules: rulesArray
        }
      }));
    } else {
      // Para outros campos como conversationStyle, mantemos como string
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
    // Corrigindo para aceitar tanto string como array de strings
    if (field === "knowledge" || field === "skills") {
      // Se for campos que devem ser arrays, garantimos o formato correto
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
      // Para outros campos, mantemos como string
      setFormData(prev => ({
        ...prev,
        expertise: {
          ...prev.expertise!,
          [field]: value
        }
      }));
    }
  };

  const handleToolsChange = (value: string) => {
    const tools = value.split(',').map(t => t.trim()).filter(t => t);
    setFormData(prev => ({
      ...prev,
      tools
    }));
  };

  const handleRagDocumentsChange = (value: string) => {
    const documents = value.split(',').map(d => d.trim()).filter(d => d);
    setFormData(prev => ({
      ...prev,
      ragDocuments: documents
    }));
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="environment">Ambiente</TabsTrigger>
            <TabsTrigger value="capabilities">Capacidades</TabsTrigger>
            <TabsTrigger value="configuration">Configuração</TabsTrigger>
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
                <Input 
                  id="workflowTitle"
                  value={formData.workEnvironment?.workflowTitle || ""}
                  onChange={(e) => handleWorkEnvironmentChange("workflowTitle", e.target.value)}
                  placeholder="Nome do workflow onde o agente atua"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="departmentTitle">Departamento</Label>
                <Input 
                  id="departmentTitle"
                  value={formData.workEnvironment?.departmentTitle || ""}
                  onChange={(e) => handleWorkEnvironmentChange("departmentTitle", e.target.value)}
                  placeholder="Nome do departamento"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="stageTitle">Estágio</Label>
                <Input 
                  id="stageTitle"
                  value={formData.workEnvironment?.stageTitle || ""}
                  onChange={(e) => handleWorkEnvironmentChange("stageTitle", e.target.value)}
                  placeholder="Estágio do pipeline onde o agente atua"
                />
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

          <TabsContent value="capabilities" className="space-y-4 mt-4">
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
                <Label htmlFor="conversationStyle">Estilo de Conversação</Label>
                <Input 
                  id="conversationStyle"
                  value={formData.businessRules?.conversationStyle || ""}
                  onChange={(e) => handleBusinessRulesChange("conversationStyle", e.target.value)}
                  placeholder="Ex: Formal, Amigável, Profissional"
                />
              </div>

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
            </div>
          </TabsContent>

          <TabsContent value="configuration" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="tools">Ferramentas (separadas por vírgula)</Label>
                <Input 
                  id="tools"
                  value={formData.tools?.join(', ') || ""}
                  onChange={(e) => handleToolsChange(e.target.value)}
                  placeholder="Ex: Chat, Email, Agenda"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="ragDocuments">Documentos RAG (separados por vírgula)</Label>
                <Input 
                  id="ragDocuments"
                  value={formData.ragDocuments?.join(', ') || ""}
                  onChange={(e) => handleRagDocumentsChange(e.target.value)}
                  placeholder="Ex: manual.pdf, faq.pdf"
                />
              </div>

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
                <div className="flex space-x-2">
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
                    variant={formData.status === 'paused' ? "default" : "outline"}
                    onClick={() => handleStatusChange('paused')}
                    className="flex-1"
                  >
                    Pausado
                  </Button>
                  <Button 
                    type="button" 
                    variant={formData.status === 'blocked' ? "default" : "outline"}
                    onClick={() => handleStatusChange('blocked')}
                    className="flex-1"
                  >
                    Bloqueado
                  </Button>
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
