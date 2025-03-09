
import React from "react";
import { File } from "@/pages/Files/models/FileModel";
import { Button } from "@/components/ui/button";
import { Eye, Trash2, Download, FileText, Image, Video, Headphones, Archive, File as FileIcon, Folder } from "lucide-react";
import { formatDate, formatFileSize } from "@/lib/utils";

interface FileListItemProps {
  file: File;
  onView: (file: File) => void;
  onDelete: (fileId: string) => void;
}

const FileListItem: React.FC<FileListItemProps> = ({
  file,
  onView,
  onDelete
}) => {
  const getFileIcon = () => {
    switch (file.type) {
      case 'document':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'image':
        return <Image className="h-5 w-5 text-green-500" />;
      case 'video':
        return <Video className="h-5 w-5 text-red-500" />;
      case 'audio':
        return <Headphones className="h-5 w-5 text-purple-500" />;
      case 'archive':
        return <Archive className="h-5 w-5 text-amber-500" />;
      default:
        return <FileIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="grid grid-cols-5 gap-4 p-4 items-center">
      <div className="col-span-2">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
            {getFileIcon()}
          </div>
          <div className="flex flex-col">
            <span className="font-medium">{file.name}</span>
            <span className="text-xs text-muted-foreground">
              {file.description || "Sem descrição"}
            </span>
          </div>
        </div>
      </div>

      <div className="col-span-1">
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <Folder className="h-3 w-3 text-muted-foreground" />
            <span className="text-sm">{file.folder}</span>
          </div>
          <span className="text-xs text-muted-foreground">{file.parentName || file.path}</span>
        </div>
      </div>

      <div className="col-span-1">
        <div className="flex flex-col">
          <span>{formatFileSize(file.size)}</span>
          <span className="text-xs text-muted-foreground">{formatDate(file.updatedAt)}</span>
        </div>
      </div>

      <div className="col-span-1 flex justify-end gap-2">
        <Button variant="ghost" size="icon" onClick={() => onView(file)}>
          <Eye className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Download className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => onDelete(file.id)}
          className="text-red-500 hover:text-red-600 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default FileListItem;
