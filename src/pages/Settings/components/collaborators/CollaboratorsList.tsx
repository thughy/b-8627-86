
import React from "react";
import { Collaborator } from "@/pages/Workflows/models/WorkflowModels";
import CollaboratorListItem from "./CollaboratorListItem";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface CollaboratorsListProps {
  collaborators: Collaborator[];
  onEditCollaborator: (collaborator: Collaborator) => void;
  onDeleteCollaborator: (collaborator: Collaborator | string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
}

const CollaboratorsList: React.FC<CollaboratorsListProps> = ({
  collaborators,
  onEditCollaborator,
  onDeleteCollaborator,
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage
}) => {
  // Generate pagination items
  const renderPaginationItems = () => {
    const items = [];
    
    // Always show first page
    items.push(
      <PaginationItem key="page-1">
        <PaginationLink 
          href="#" 
          isActive={currentPage === 1}
          onClick={(e) => {
            e.preventDefault();
            onPageChange(1);
          }}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    // Add ellipsis if needed
    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis-1">
          <span className="flex h-9 w-9 items-center justify-center">...</span>
        </PaginationItem>
      );
    }

    // Add pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i <= totalPages && i > 1) {
        items.push(
          <PaginationItem key={`page-${i}`}>
            <PaginationLink 
              href="#" 
              isActive={currentPage === i}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(i);
              }}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    // Add ellipsis if needed
    if (currentPage < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis-2">
          <span className="flex h-9 w-9 items-center justify-center">...</span>
        </PaginationItem>
      );
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key={`page-${totalPages}`}>
          <PaginationLink 
            href="#" 
            isActive={currentPage === totalPages}
            onClick={(e) => {
              e.preventDefault();
              onPageChange(totalPages);
            }}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

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

      {totalPages > 1 && (
        <div className="py-4 border-t">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) {
                      onPageChange(currentPage - 1);
                    }
                  }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {renderPaginationItems()}
              
              <PaginationItem>
                <PaginationNext 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) {
                      onPageChange(currentPage + 1);
                    }
                  }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <div className="text-center text-sm text-muted-foreground mt-2">
            Mostrando {Math.min(itemsPerPage, collaborators.length)} de {itemsPerPage * (currentPage - 1) + collaborators.length} resultados
          </div>
        </div>
      )}
    </div>
  );
};

export default CollaboratorsList;
