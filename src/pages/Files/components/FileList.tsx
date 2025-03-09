import React from "react";
import { File } from "@/pages/Files/models/FileModel";
import FileListItem from "./FileListItem";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis
} from "@/components/ui/pagination";
import { getPageRange } from "@/lib/utils";

interface FileListProps {
  files: File[];
  onViewFile: (file: File) => void;
  onDeleteFile: (fileId: string) => void;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
}

const FileList: React.FC<FileListProps> = ({
  files,
  onViewFile,
  onDeleteFile,
  currentPage,
  totalPages,
  totalItems,
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
          <PaginationEllipsis />
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
          <PaginationEllipsis />
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
      <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b">
        <div className="col-span-2">Nome do Arquivo</div>
        <div className="col-span-1">Tipo</div>
        <div className="col-span-1">Pasta</div>
        <div className="col-span-1 text-right">Ações</div>
      </div>

      <div className="divide-y">
        {files.length > 0 ? (
          files.map((file) => (
            <FileListItem
              key={file.id}
              file={file}
              onView={onViewFile}
              onDelete={onDeleteFile}
            />
          ))
        ) : (
          <div className="p-4 text-center text-muted-foreground">
            Nenhum arquivo encontrado
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
            Mostrando {files.length} de {totalItems} resultados
          </div>
        </div>
      )}
    </div>
  );
};

export default FileList;
