
import { useState, useEffect } from "react";
import { Collaborator } from "@/pages/Workflows/models/WorkflowModels";
import { useToast } from "@/hooks/use-toast";

interface UseCollaboratorFormProps {
  collaborator: Collaborator | null;
  onSave: (collaborator: Collaborator) => void;
  onClose: () => void;
}

export const useCollaboratorForm = ({ 
  collaborator, 
  onSave, 
  onClose 
}: UseCollaboratorFormProps) => {
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
        status: "pending", // Alterado para "pending" para refletir o status de convite
      });
    }
  }, [collaborator]);

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

    // Create new collaborator invitation or update existing one
    const savedCollaborator: Collaborator = {
      id: collaborator?.id || `collab-${Date.now()}`,
      name: formData.name!,
      role: formData.role!,
      email: formData.email!,
      phone: formData.phone || "",
      hierarchyLevel: formData.hierarchyLevel || "",
      type: (formData.type as "subscriber" | "collaborator" | "developer" | "master") || "collaborator",
      status: collaborator ? formData.status as "active" | "inactive" | "pending" : "pending", // Use "pending" for new invites
      createdAt: collaborator?.createdAt || new Date(),
      updatedAt: new Date(),
    };

    // Se não for edição, simula o envio de um email de convite
    if (!collaborator) {
      // Simulação do envio de email - aqui seria integrado um serviço real de emails
      console.log(`Enviando convite para ${savedCollaborator.email}...`);
      
      toast({
        title: "Convite enviado",
        description: `Um convite foi enviado para ${savedCollaborator.email}`,
      });
    }

    onSave(savedCollaborator);
    onClose();
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    isEditMode: !!collaborator
  };
};
