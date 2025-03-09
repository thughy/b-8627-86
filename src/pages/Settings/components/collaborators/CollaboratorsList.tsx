
import React from "react";
import { Collaborator } from "@/pages/Workflows/models/WorkflowModels";
import CollaboratorListItem from "./CollaboratorListItem";

interface CollaboratorsListProps {
  collaborators: Collaborator[];
  onEditCollaborator: (collaborator: Collaborator) => void;
  onDeleteCollaborator: (collaborator: Collaborator | string) => void;
}

const CollaboratorsList: React.FC<CollaboratorsListProps> = ({
  collaborators,
  onEditCollaborator,
  onDeleteCollaborator
}) => {
  return (
    <div className="border rounded-md">
      <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b">
        <div className="col-span-2">Nome / Função</div>
        <div className="col-span-1">Email</div>
        <div className="col-span-1 hidden md:block">Tipo</div>
        <div className="col-span-1">Status</div>
        <div className="col-span-1 text-right">Ações</div>
      </div>

      <div className="divide-y">
        {collaborators.length > 0 ? (
          collaborators.map((collaborator) => (
            <CollaboratorListItem
              key={collaborator.id}
              collaborator={collaborator}
              onEdit={onEditCollaborator}
              onDelete={onDeleteCollaborator}
            />
          ))
        ) : (
          <div className="p-4 text-center text-muted-foreground">
            Nenhum colaborador encontrado
          </div>
        )}
      </div>
    </div>
  );
};

export default CollaboratorsList;
