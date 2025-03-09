
import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { File } from "@/pages/Files/models/FileModel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatFileSize } from "@/lib/utils";
import { Upload, FileText, Image, Video, Headphones, Archive, File as FileIcon } from "lucide-react";

interface FileViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (file: File) => void;
  onDelete: (fileId: string) => void;
  file: File | null;
}

const FileViewModal: React.FC<FileViewModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  file
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<Partial<File>>(
    file || {
      name: "",
      type: "document",
      size: 0,
      extension: "",
      url: "",
      path: "",
      folder: "workflow",
      description: ""
    }
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleChange = (field: keyof File, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSave(formData as File);
    onClose();
  };

  const handleDelete = () => {
    if (file?.id) {
      onDelete(file.id);
      onClose();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      const fileExtension = selectedFile.name.split('.').pop() || '';
      
      let fileType: 'document' | 'image' | 'video' | 'audio' | 'archive' | 'other' = 'other';
      
      if (['pdf', 'doc', 'docx', 'txt', 'xlsx', 'pptx'].includes(fileExtension.toLowerCase())) {
        fileType = 'document';
      } else if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExtension.toLowerCase())) {
        fileType = 'image';
      } else if (['mp4', 'avi', 'mov', 'wmv'].includes(fileExtension.toLowerCase())) {
        fileType = 'video';
      } else if (['mp3', 'wav', 'ogg'].includes(fileExtension.toLowerCase())) {
        fileType = 'audio';
      } else if (['zip', 'rar', 'tar', 'gz'].includes(fileExtension.toLowerCase())) {
        fileType = 'archive';
      }
      
      setFormData(prev => ({
        ...prev,
        name: selectedFile.name,
        size: selectedFile.size,
        extension: fileExtension,
        type: fileType
      }));
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const getFileIcon = () => {
    switch (formData.type) {
      case 'document':
        return <FileText className="h-12 w-12 text-blue-500" />;
      case 'image':
        return <Image className="h-12 w-12 text-green-500" />;
      case 'video':
        return <Video className="h-12 w-12 text-red-500" />;
      case 'audio':
        return <Headphones className="h-12 w-12 text-purple-500" />;
      case 'archive':
        return <Archive className="h-12 w-12 text-amber-500" />;
      default:
        return <FileIcon className="h-12 w-12 text-gray-500" />;
    }
  };

  const renderFilePreview = () => {
    if (!formData.name && !file) {
      return (
        <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg border-gray-300 bg-gray-50 cursor-pointer" onClick={triggerFileInput}>
          <Upload className="h-10 w-10 text-gray-400 mb-2" />
          <p className="text-sm font-medium mb-1">Clique para selecionar um arquivo</p>
          <p className="text-xs text-muted-foreground">ou arraste e solte aqui</p>
        </div>
      );
    }
    
    return (
      <div className="p-4 border rounded-lg">
        <div className="flex items-start gap-4">
          {getFileIcon()}
          <div>
            <h3 className="font-medium">{formData.name}</h3>
            {formData.size > 0 && (
              <p className="text-sm text-muted-foreground">
                {formatFileSize(formData.size)}
              </p>
            )}
            {formData.extension && (
              <p className="text-sm text-muted-foreground mt-1">
                Tipo: {formData.extension.toUpperCase()}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {file ? "Visualizar Arquivo" : "Enviar Arquivo"}
          </DialogTitle>
          <DialogDescription>
            {file
              ? "Visualize ou edite as informações do arquivo."
              : "Selecione um arquivo para upload e preencha as informações."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />

          {renderFilePreview()}

          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do arquivo</Label>
                <Input
                  id="name"
                  value={formData.name || ""}
                  onChange={(e) => handleChange("name", e.target.value)}
                  disabled={!!file}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description || ""}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Adicione uma breve descrição sobre o arquivo"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="folder">Pasta</Label>
                <Select
                  value={formData.folder || "workflow"}
                  onValueChange={(value) => handleChange("folder", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a pasta" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="workflow">Workflow</SelectItem>
                    <SelectItem value="department">Departamento</SelectItem>
                    <SelectItem value="pipeline">Pipeline</SelectItem>
                    <SelectItem value="stage">Estágio</SelectItem>
                    <SelectItem value="deal">Deal</SelectItem>
                    <SelectItem value="asset">Asset</SelectItem>
                    <SelectItem value="other">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="parentName">Nome do Parent</Label>
                <Input
                  id="parentName"
                  value={formData.parentName || ""}
                  onChange={(e) => handleChange("parentName", e.target.value)}
                  placeholder="Ex: Nome do workflow ou departamento"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="path">Caminho</Label>
              <Input
                id="path"
                value={formData.path || ""}
                onChange={(e) => handleChange("path", e.target.value)}
                placeholder="/workflows/departamento/pipeline/"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="flex space-x-2 justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          {file && (
            <Button 
              variant="destructive" 
              onClick={handleDelete}
            >
              Excluir
            </Button>
          )}
          <Button onClick={handleSubmit}>
            {file ? "Salvar" : "Enviar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FileViewModal;
