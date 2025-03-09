
import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import CollaboratorsHeader from "./collaborators/CollaboratorsHeader";
import CollaboratorsList from "./collaborators/CollaboratorsList";
import { Collaborator } from "@/pages/Workflows/models/WorkflowModels";
import { getCollaborators } from "../services/settingsService";
import CollaboratorConfigModal from "./modals/CollaboratorConfigModal";

const CollaboratorsSettings = () => {
  const [collaborators, setCollaborators] = React.useState<Collaborator[]>([]);
  const [filteredCollaborators, setFilteredCollaborators] = React.useState<Collaborator[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [currentCollaborator, setCurrentCollaborator] = React.useState<Collaborator | null>(null);

  // Fetch collaborators
  useEffect(() => {
    const loadCollaborators = () => {
      const collaboratorData = getCollaborators();
      setCollaborators(collaboratorData);
      setFilteredCollaborators(collaboratorData);
    };
    
    loadCollaborators();
  }, []);

  // Filter collaborators
  useEffect(() => {
    const filtered = collaborators.filter(collaborator => {
      const matchesSearch = 
        collaborator.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        collaborator.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || collaborator.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
    
    setFilteredCollaborators(filtered);
  }, [searchTerm, statusFilter, collaborators]);

  // Handle adding a new collaborator
  const handleAddCollaborator = () => {
    setCurrentCollaborator(null);
    setIsModalOpen(true);
  };

  // Handle editing an existing collaborator
  const handleEditCollaborator = (collaborator: Collaborator) => {
    setCurrentCollaborator(collaborator);
    setIsModalOpen(true);
  };

  // Handle saving a collaborator (create or update)
  const handleSaveCollaborator = (collaborator: Collaborator) => {
    if (currentCollaborator) {
      // Update existing collaborator
      setCollaborators(prev => 
        prev.map(c => c.id === collaborator.id ? collaborator : c)
      );
    } else {
      // Create new collaborator
      setCollaborators(prev => [...prev, collaborator]);
    }
    
    setIsModalOpen(false);
  };

  // Handle deleting a collaborator
  const handleDeleteCollaborator = (collaboratorId: string) => {
    setCollaborators(prev => prev.filter(c => c.id !== collaboratorId));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <CollaboratorsHeader
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            onAddCollaborator={handleAddCollaborator}
          />
          
          <CollaboratorsList
            collaborators={filteredCollaborators}
            onEditCollaborator={handleEditCollaborator}
            onDeleteCollaborator={handleDeleteCollaborator}
          />
        </CardContent>
      </Card>
      
      {isModalOpen && (
        <CollaboratorConfigModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          collaborator={currentCollaborator}
          onSave={handleSaveCollaborator}
          onDelete={handleDeleteCollaborator}
        />
      )}
    </div>
  );
};

export default CollaboratorsSettings;
