
import React from "react";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Save, Trash2, Send } from "lucide-react";

interface CollaboratorModalFooterProps {
  onClose: () => void;
  onSave: () => void;
  onDelete?: () => void;
  isEditMode: boolean;
}

const CollaboratorModalFooter: React.FC<CollaboratorModalFooterProps> = ({
  onClose,
  onSave,
  onDelete,
  isEditMode
}) => {
  return (
    <DialogFooter className="flex justify-between">
      <div className="flex gap-2">
        <Button variant="outline" onClick={onClose}>
          <X className="h-4 w-4 mr-2" />
          Cancelar
        </Button>
        {isEditMode && onDelete && (
          <Button 
            variant="destructive" 
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Excluir
          </Button>
        )}
      </div>
      <Button onClick={onSave}>
        {isEditMode ? (
          <>
            <Save className="h-4 w-4 mr-2" />
            Salvar
          </>
        ) : (
          <>
            <Send className="h-4 w-4 mr-2" />
            Enviar Convite
          </>
        )}
      </Button>
    </DialogFooter>
  );
};

export default CollaboratorModalFooter;
