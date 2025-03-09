
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
import { Workflow } from "@/pages/Workflows/models/WorkflowModels";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (status: 'active' | 'inactive' | 'draft') => {
    setFormData(prev => ({ ...prev, status }));
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

    onSave(formData);
    toast({
      title: workflow ? "Workflow atualizado" : "Workflow criado",
      description: `O workflow "${formData.title}" foi ${workflow ? "atualizado" : "criado"} com sucesso.`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{workflow ? "Editar Workflow" : "Novo Workflow"}</DialogTitle>
          <DialogDescription>
            {workflow 
              ? "Edite as informações do workflow existente." 
              : "Configure um novo workflow para seu negócio."}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-5">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="workflow">Workflow</TabsTrigger>
            <TabsTrigger value="department">Departamento</TabsTrigger>
            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
            <TabsTrigger value="stage">Estágios</TabsTrigger>
          </TabsList>

          <TabsContent value="workflow" className="space-y-4 mt-4">
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

          <TabsContent value="department" className="space-y-4 mt-4">
            <div className="flex items-center justify-center h-40 border rounded-md text-muted-foreground">
              Configuração de Departamentos em desenvolvimento
            </div>
          </TabsContent>

          <TabsContent value="pipeline" className="space-y-4 mt-4">
            <div className="flex items-center justify-center h-40 border rounded-md text-muted-foreground">
              Configuração de Pipelines em desenvolvimento
            </div>
          </TabsContent>

          <TabsContent value="stage" className="space-y-4 mt-4">
            <div className="flex items-center justify-center h-40 border rounded-md text-muted-foreground">
              Configuração de Estágios em desenvolvimento
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

export default WorkflowConfigModal;
