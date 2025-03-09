
import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, File, Image, Video, Headphones, Archive, FilterX, Folder } from "lucide-react";

interface FileSearchProps {
  search: string;
  type: string;
  folder: string;
  onSearchChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onFolderChange: (value: string) => void;
}

const FileSearch: React.FC<FileSearchProps> = ({
  search,
  type,
  folder,
  onSearchChange,
  onTypeChange,
  onFolderChange
}) => {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar por nome, descrição, pasta..."
          className="pl-8"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Select value={type} onValueChange={onTypeChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filtrar por tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="flex items-center gap-2">
                <FilterX className="h-4 w-4" />
                <span>Todos os tipos</span>
              </SelectItem>
              <SelectItem value="document" className="flex items-center gap-2">
                <File className="h-4 w-4" />
                <span>Documentos</span>
              </SelectItem>
              <SelectItem value="image" className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                <span>Imagens</span>
              </SelectItem>
              <SelectItem value="video" className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                <span>Vídeos</span>
              </SelectItem>
              <SelectItem value="audio" className="flex items-center gap-2">
                <Headphones className="h-4 w-4" />
                <span>Áudios</span>
              </SelectItem>
              <SelectItem value="archive" className="flex items-center gap-2">
                <Archive className="h-4 w-4" />
                <span>Arquivos Compactados</span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select value={folder} onValueChange={onFolderChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filtrar por pasta" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as pastas</SelectItem>
              <SelectItem value="workflow">Workflows</SelectItem>
              <SelectItem value="department">Departamentos</SelectItem>
              <SelectItem value="pipeline">Pipelines</SelectItem>
              <SelectItem value="stage">Estágios</SelectItem>
              <SelectItem value="deal">Deals</SelectItem>
              <SelectItem value="asset">Assets</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default React.memo(FileSearch);
