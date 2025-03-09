
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collaborator } from "@/pages/Workflows/models/WorkflowModels";
import { useToast } from "@/hooks/use-toast";
import { X, Save, Trash2 } from "lucide-react";

interface CollaboratorConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (collaborator: Collaborator) => void;
  onDelete: (id: string) => void;
  collaborator: Collaborator | null;
}

const CollaboratorConfigModal: React.FC<CollaboratorConfigModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  collaborator,
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<Collaborator>>({
    name: "",
    role: "",
    email: "",
    phone: "",
    hierarchyLevel: "",
    type: "collaborator",
    status: "active",
  });

  useEffect(() => {
    if (collaborator) {
      setFormData({
        ...collaborator
      });
    } else {
      // Resetar formulário para novo colaborador
      setFormData({
        name: "",
        role: "",
        email: "",
        phone: "",
        hierarchyLevel: "",
        type: "collaborator",
        status: "active",
      });
    }
  }, [collaborator, isOpen]);

  const handleChange = (field: keyof Collaborator, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.role) {
      toast({
        title: "Campos obrigatórios",
        description: "Nome, email e função são campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    // Criar novo colaborador ou atualizar existente
    const savedCollaborator: Collaborator = {
      id: collaborator?.id || `collab-${Date.now()}`,
      name: formData.name!,
      role: formData.role!,
      email: formData.email!,
      phone: formData.phone || "",
      hierarchyLevel: formData.hierarchyLevel || "",
      type: (formData.type as "subscriber" | "collaborator" | "developer" | "master") || "collaborator",
      status: (formData.status as "active" | "inactive") || "active",
      createdAt: collaborator?.createdAt || new Date(),
      updatedAt: new Date(),
    };

    onSave(savedCollaborator);
  };

  const handleDelete = () => {
    if (collaborator?.id) {
      onDelete(collaborator.id);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {collaborator ? "Editar Colaborador" : "Adicionar Colaborador"}
          </DialogTitle>
          <DialogDescription>
            {collaborator
              ? "Atualize as informações do colaborador no sistema."
              : "Preencha os dados para adicionar um novo colaborador."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome *</Label>
              <Input
                id="name"
                value={formData.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Nome completo"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="email@exemplo.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="role">Função *</Label>
              <Input
                id="role"
                value={formData.role || ""}
                onChange={(e) => handleChange("role", e.target.value)}
                placeholder="Cargo ou função"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                value={formData.phone || ""}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="(00) 00000-0000"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hierarchyLevel">Nível Hierárquico</Label>
              <Input
                id="hierarchyLevel"
                value={formData.hierarchyLevel || ""}
                onChange={(e) => handleChange("hierarchyLevel", e.target.value)}
                placeholder="Nível na organização"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Tipo de Usuário</Label>
              <Select 
                value={formData.type || "collaborator"} 
                onValueChange={(value) => handleChange("type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo de usuário" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="subscriber">Assinante</SelectItem>
                    <SelectItem value="collaborator">Colaborador</SelectItem>
                    <SelectItem value="developer">Desenvolvedor</SelectItem>
                    <SelectItem value="master">Master</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select 
              value={formData.status || "active"} 
              onValueChange={(value) => handleChange("status", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            {collaborator && (
              <Button 
                variant="destructive" 
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir
              </Button>
            )}
          </div>
          <Button onClick={handleSubmit}>
            <Save className="h-4 w-4 mr-2" />
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CollaboratorConfigModal;
