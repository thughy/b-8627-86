
import React from "react";
import { Collaborator } from "@/pages/Workflows/models/WorkflowModels";
import { Button } from "@/components/ui/button";
import { Edit, Trash, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export interface CollaboratorsListProps {
  collaborators: Collaborator[];
  onEditCollaborator: (collaborator: Collaborator) => void;
  onDeleteCollaborator: (collaboratorId: string) => void;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  itemsPerPage?: number;
}

const CollaboratorsList = ({ 
  collaborators, 
  onEditCollaborator, 
  onDeleteCollaborator,
  currentPage = 1,
  totalPages = 1,
  onPageChange = () => {},
  itemsPerPage = 10
}: CollaboratorsListProps) => {
  if (collaborators.length === 0) {
    return (
      <div className="text-center py-12 border rounded-md bg-muted/10">
        <p className="text-muted-foreground">Nenhum colaborador encontrado.</p>
      </div>
    );
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="grid grid-cols-5 gap-4 p-4 bg-muted/50 font-medium text-sm">
        <div>Nome</div>
        <div>Email</div>
        <div>Função</div>
        <div>Status</div>
        <div className="text-right">Ações</div>
      </div>

      {collaborators.map((collaborator) => (
        <div
          key={collaborator.id}
          className="grid grid-cols-5 gap-4 p-4 items-center border-t"
        >
          <div className="font-medium">{collaborator.name}</div>
          <div className="text-sm">{collaborator.email}</div>
          <div className="text-sm">{collaborator.role}</div>
          <div>
            <Badge
              className={
                collaborator.status === 'active' ? 'bg-green-500' :
                collaborator.status === 'inactive' ? 'bg-red-500' : 'bg-amber-500'
              }
            >
              {collaborator.status === 'active' ? 'Ativo' :
               collaborator.status === 'inactive' ? 'Inativo' : 'Pendente'}
            </Badge>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEditCollaborator(collaborator)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDeleteCollaborator(collaborator.id)}
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
      
      {totalPages > 1 && (
        <div className="p-4 border-t flex justify-center">
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(page)}
              >
                {page}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CollaboratorsList;
