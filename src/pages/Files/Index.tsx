
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { File as FileModel, FileFilter } from "./models/FileModel";
import { filterFiles } from "./services/fileService";
import FileHeader from "./components/FileHeader";
import FileSearch from "./components/FileSearch";
import FileList from "./components/FileList";
import FileViewModal from "./components/modals/FileViewModal";

const FilesPage = () => {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileModel | null>(null);
  const [files, setFiles] = useState<FileModel[]>([]);
  const [filters, setFilters] = useState<FileFilter>({
    search: "",
    type: "all",
    folder: "all"
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage] = useState(10);

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
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const handleViewFile = (file: FileModel) => {
    setSelectedFile(file);
    setIsModalOpen(true);
  };

  const handleDeleteFile = (fileId: string) => {
    toast({
      title: "Arquivo excluído",
      description: "O arquivo foi excluído com sucesso."
    });
    loadFiles();
  };

  const handleSaveFile = (file: FileModel) => {
    toast({
      title: selectedFile ? "Arquivo atualizado" : "Arquivo enviado",
      description: `O arquivo ${file.name} foi ${selectedFile ? "atualizado" : "enviado"} com sucesso.`
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
              folder={filters.folder || "all"}
              onSearchChange={handleSearchChange}
              onTypeChange={(value) => handleFilterChange("type", value)}
              onFolderChange={(value) => handleFilterChange("folder", value)}
            />
            
            <FileList
              files={files}
              onViewFile={handleViewFile}
              onDeleteFile={handleDeleteFile}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={itemsPerPage}
            />
          </CardContent>
        </Card>

        {isModalOpen && (
          <FileViewModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveFile}
            onDelete={handleDeleteFile}
            file={selectedFile}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default FilesPage;
