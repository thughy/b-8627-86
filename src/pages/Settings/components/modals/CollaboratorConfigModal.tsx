
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Collaborator } from "@/pages/Workflows/models/WorkflowModels";
import CollaboratorForm from "./collaborator/CollaboratorForm";
import CollaboratorModalFooter from "./collaborator/CollaboratorModalFooter";
import { useCollaboratorForm } from "@/pages/Settings/hooks/useCollaboratorForm";

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
  const { 
    formData, 
    handleChange, 
    handleSubmit,
    isEditMode 
  } = useCollaboratorForm({
    collaborator,
    onSave,
    onClose
  });

  const handleDelete = () => {
    if (collaborator?.id) {
      onDelete(collaborator.id);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {collaborator ? "Editar Colaborador" : "Convidar Colaborador"}
          </DialogTitle>
          <DialogDescription>
            {collaborator
              ? "Atualize as informações do colaborador no sistema."
              : "Preencha os dados para enviar um convite para um novo colaborador."}
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
          isEditMode={isEditMode}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CollaboratorConfigModal;
