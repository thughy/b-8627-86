
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { File, FileFilter } from "./models/FileModel";
import { filterFiles } from "./services/fileService";
import FileHeader from "./components/FileHeader";
import FileSearch from "./components/FileSearch";
import FileList from "./components/FileList";
import FileViewModal from "./components/modals/FileViewModal";

const FilesPage = () => {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [filters, setFilters] = useState<FileFilter>({
    search: "",
    type: "all",
    workflow: "all"
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    loadFiles();
  }, [filters, currentPage]);

  const loadFiles = () => {
    const result = filterFiles(filters, currentPage, itemsPerPage);
    setFiles(result.files);
    setTotalPages(result.pagination.totalPages);
    setTotalItems(result.pagination.totalItems);
  };

  const handleAddFile = () => {
    // Handle adding new file
    toast({
      title: "Upload de arquivo",
      description: "Funcionalidade de upload será implementada em breve."
    });
  };

  const handleViewFile = (file: File) => {
    setSelectedFile(file);
    setIsModalOpen(true);
  };

  const handleDeleteFile = (fileId: string) => {
    // Implement delete logic
    toast({
      title: "Arquivo excluído",
      description: "O arquivo foi excluído com sucesso."
    });
    loadFiles();
  };

  const handleSearchChange = (value: string) => {
    setFilters(prev => ({ ...prev, search: value }));
    setCurrentPage(1);
  };

  const handleFilterChange = (key: keyof FileFilter, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4 space-y-6">
        <Card>
          <CardContent className="p-6 space-y-6">
            <FileHeader onAddFile={handleAddFile} />
            
            <FileSearch 
              search={filters.search || ""}
              type={filters.type || "all"}
              workflow={filters.workflow || "all"}
              onSearchChange={handleSearchChange}
              onTypeChange={(value) => handleFilterChange("type", value)}
              onWorkflowChange={(value) => handleFilterChange("workflow", value)}
            />
            
            <FileList
              files={files}
              onViewFile={handleViewFile}
              onDeleteFile={handleDeleteFile}
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              onPageChange={handlePageChange}
              itemsPerPage={itemsPerPage}
            />
          </CardContent>
        </Card>

        {isModalOpen && (
          <FileViewModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            file={selectedFile}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default FilesPage;
