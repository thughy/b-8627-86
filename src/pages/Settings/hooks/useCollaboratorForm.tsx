
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
        status: "active",
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
    onClose();
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    isEditMode: !!collaborator
  };
};
