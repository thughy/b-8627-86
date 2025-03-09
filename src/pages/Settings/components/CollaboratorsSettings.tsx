
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Collaborator } from "@/pages/Workflows/models/WorkflowModels";
import { getCollaborators } from "../services/settingsService";
import CollaboratorConfigModal from "./modals/CollaboratorConfigModal";
import CollaboratorsHeader from "./collaborators/CollaboratorsHeader";
import CollaboratorsSearch from "./collaborators/CollaboratorsSearch";
import CollaboratorsList from "./collaborators/CollaboratorsList";

const CollaboratorsSettings = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [collaborators, setCollaborators] = useState<Collaborator[]>(getCollaborators());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCollaborator, setSelectedCollaborator] = useState<Collaborator | null>(null);

  const filteredCollaborators = collaborators.filter((collaborator) => 
    collaborator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    collaborator.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    collaborator.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCollaborator = () => {
    setSelectedCollaborator(null);
    setIsModalOpen(true);
  };

  const handleEditCollaborator = (collaborator: Collaborator) => {
    setSelectedCollaborator(collaborator);
    setIsModalOpen(true);
  };

  const handleDeleteCollaborator = (collaboratorToDelete: Collaborator | string) => {
    const id = typeof collaboratorToDelete === 'string' 
      ? collaboratorToDelete 
      : collaboratorToDelete.id;
    
    if (id) {
      setCollaborators(prev => prev.filter(c => c.id !== id));
      toast({
        title: "Colaborador removido",
        description: `O colaborador foi removido com sucesso.`,
      });
    }
  };

  const handleSaveCollaborator = (collaboratorData: Collaborator) => {
    if (selectedCollaborator) {
      // Update existing collaborator
      setCollaborators(prev => 
        prev.map(c => 
          c.id === collaboratorData.id ? collaboratorData : c
        )
      );
      toast({
        title: "Colaborador atualizado",
        description: `As informações do colaborador ${collaboratorData.name} foram atualizadas com sucesso.`,
      });
    } else {
      // Add new collaborator
      setCollaborators(prev => [...prev, collaboratorData]);
      toast({
        title: "Convite enviado",
        description: `Um convite foi enviado para ${collaboratorData.email}.`,
      });
    }
    setIsModalOpen(false);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CollaboratorsHeader onInviteCollaborator={handleAddCollaborator} />
      </CardHeader>
      <CardContent>
        <CollaboratorsSearch
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <CollaboratorsList
          collaborators={filteredCollaborators}
          onEditCollaborator={handleEditCollaborator}
          onDeleteCollaborator={handleDeleteCollaborator}
        />
      </CardContent>

      <CollaboratorConfigModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        collaborator={selectedCollaborator}
        onSave={handleSaveCollaborator}
        onDelete={handleDeleteCollaborator}
      />
    </Card>
  );
};

export default CollaboratorsSettings;
