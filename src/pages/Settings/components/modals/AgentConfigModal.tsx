
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
import { useToast } from "@/hooks/use-toast";
import { Agent } from "@/pages/Workflows/models/WorkflowModels";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, Book, Database, Settings2, Shield } from "lucide-react";

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
        goal: "",
      },
      workEnvironment: {},
      businessRules: {},
      expertise: {},
      status: "active",
    }
  );

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      profile: {
        ...prev.profile!,
        [name]: value
      }
    }));
  };

  const handleStatusChange = (status: 'active' | 'paused' | 'blocked') => {
    setFormData(prev => ({ ...prev, status }));
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
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{agent ? "Editar Agente" : "Novo Agente"}</DialogTitle>
          <DialogDescription>
            {agent 
              ? "Edite as configurações do agente existente." 
              : "Configure um novo agente de IA para seu negócio."}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-5">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              <span className="hidden sm:inline">Perfil</span>
            </TabsTrigger>
            <TabsTrigger value="workEnvironment" className="flex items-center gap-2">
              <Settings2 className="h-4 w-4" />
              <span className="hidden sm:inline">Ambiente</span>
            </TabsTrigger>
            <TabsTrigger value="businessRules" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Regras</span>
            </TabsTrigger>
            <TabsTrigger value="expertise" className="flex items-center gap-2">
              <Book className="h-4 w-4" />
              <span className="hidden sm:inline">Expertise</span>
            </TabsTrigger>
            <TabsTrigger value="rag" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span className="hidden sm:inline">RAG</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4 mt-4">
            <div className="flex gap-4 items-center mb-6">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-primary/10 text-primary text-xl">
                  {formData.profile?.name?.charAt(0) || "A"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-lg font-medium">
                  {formData.profile?.name || "Novo Agente"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {formData.profile?.role || "Configure o perfil do agente"}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome do Agente</Label>
                <Input 
                  id="name"
                  name="name"
                  placeholder="Ex: Assistente de Vendas"
                  value={formData.profile?.name || ""}
                  onChange={handleProfileChange}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="role">Função</Label>
                <Input 
                  id="role"
                  name="role"
                  placeholder="Ex: Vendedor, Atendente, Suporte"
                  value={formData.profile?.role || ""}
                  onChange={handleProfileChange}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="goal">Objetivo</Label>
                <Textarea 
                  id="goal"
                  name="goal"
                  placeholder="Descreva o principal objetivo deste agente"
                  rows={3}
                  value={formData.profile?.goal || ""}
                  onChange={handleProfileChange}
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

          <TabsContent value="workEnvironment" className="space-y-4 mt-4">
            <div className="flex items-center justify-center h-40 border rounded-md text-muted-foreground">
              Configuração de Ambiente de Trabalho em desenvolvimento
            </div>
          </TabsContent>
          
          <TabsContent value="businessRules" className="space-y-4 mt-4">
            <div className="flex items-center justify-center h-40 border rounded-md text-muted-foreground">
              Configuração de Regras de Negócio em desenvolvimento
            </div>
          </TabsContent>
          
          <TabsContent value="expertise" className="space-y-4 mt-4">
            <div className="flex items-center justify-center h-40 border rounded-md text-muted-foreground">
              Configuração de Expertise em desenvolvimento
            </div>
          </TabsContent>
          
          <TabsContent value="rag" className="space-y-4 mt-4">
            <div className="flex items-center justify-center h-40 border rounded-md text-muted-foreground">
              Configuração de Documentos RAG em desenvolvimento
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
