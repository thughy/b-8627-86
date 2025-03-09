
import React from "react";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface CollaboratorsHeaderProps {
  onInviteCollaborator: () => void;
}

const CollaboratorsHeader: React.FC<CollaboratorsHeaderProps> = ({
  onInviteCollaborator
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <CardTitle>Gerenciamento de Colaboradores</CardTitle>
        <CardDescription>
          Configure e gerencie os colaboradores do sistema
        </CardDescription>
      </div>
      <Button onClick={onInviteCollaborator} className="flex-shrink-0">
        <Plus className="h-4 w-4 mr-2" />
        Convidar Colaborador
      </Button>
    </div>
  );
};

export default React.memo(CollaboratorsHeader);
