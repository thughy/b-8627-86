
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Collaborator } from "@/pages/Workflows/models/WorkflowModels";
import { useToast } from "@/hooks/use-toast";
import CollaboratorForm from "./collaborator/CollaboratorForm";
import CollaboratorModalFooter from "./collaborator/CollaboratorModalFooter";

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
      // Reset form for new collaborator
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

    // Create new collaborator or update existing one
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

        <CollaboratorForm 
          formData={formData}
          onChange={handleChange}
        />

        <CollaboratorModalFooter 
          onClose={onClose}
          onSave={handleSubmit}
          onDelete={handleDelete}
          isEditMode={!!collaborator}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CollaboratorConfigModal;
