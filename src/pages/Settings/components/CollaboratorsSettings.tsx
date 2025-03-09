
import React, { useState, useEffect } from "react";
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
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredCollaborators = collaborators.filter((collaborator) => 
    collaborator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    collaborator.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    collaborator.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredCollaborators.length / itemsPerPage);
  const paginatedCollaborators = filteredCollaborators.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
      
      // Adjust current page if needed
      if (currentPage > 1 && paginatedCollaborators.length === 1) {
        setCurrentPage(currentPage - 1);
      }
      
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
      
      // Navigate to the last page to show the new collaborator
      const newTotalPages = Math.ceil((filteredCollaborators.length + 1) / itemsPerPage);
      setCurrentPage(newTotalPages);
      
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
          collaborators={paginatedCollaborators}
          onEditCollaborator={handleEditCollaborator}
          onDeleteCollaborator={handleDeleteCollaborator}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
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
