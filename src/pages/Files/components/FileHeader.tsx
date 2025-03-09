
import React from "react";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface FileHeaderProps {
  onAddFile: () => void;
}

const FileHeader: React.FC<FileHeaderProps> = ({
  onAddFile
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <CardTitle>Gerenciamento de Arquivos</CardTitle>
        <CardDescription>
          Organize e gerencie todos os arquivos do sistema por workflows e departamentos
        </CardDescription>
      </div>
      <Button onClick={onAddFile} className="flex-shrink-0">
        <Upload className="h-4 w-4 mr-2" />
        Enviar Arquivo
      </Button>
    </div>
  );
};

export default React.memo(FileHeader);
