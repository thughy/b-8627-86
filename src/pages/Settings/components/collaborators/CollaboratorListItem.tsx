
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Collaborator } from "@/pages/Workflows/models/WorkflowModels";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface CollaboratorListItemProps {
  collaborator: Collaborator;
  onEdit: (collaborator: Collaborator) => void;
  onDelete: (collaborator: Collaborator | string) => void;
}

const CollaboratorListItem: React.FC<CollaboratorListItemProps> = ({ 
  collaborator, 
  onEdit, 
  onDelete 
}) => {
  const { toast } = useToast();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500 hover:bg-green-600">Ativo</Badge>;
      case 'inactive':
        return <Badge className="bg-red-500 hover:bg-red-600">Inativo</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pendente</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-6 gap-4 p-4 items-center">
      <div className="col-span-2">
        <div className="font-medium">{collaborator.name}</div>
        <div className="text-sm text-muted-foreground">{collaborator.role}</div>
      </div>
      <div className="col-span-1 text-muted-foreground truncate">
        {collaborator.email}
      </div>
      <div className="col-span-1 hidden md:block text-muted-foreground capitalize">
        {collaborator.type}
      </div>
      <div className="col-span-1">
        {getStatusBadge(collaborator.status)}
      </div>
      <div className="col-span-1 flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(collaborator)}>
              Editar
            </DropdownMenuItem>
            {collaborator.status === 'pending' && (
              <DropdownMenuItem onClick={() => {
                // Simula o reenvio do convite
                toast({
                  title: "Convite reenviado",
                  description: `Um novo convite foi enviado para ${collaborator.email}.`,
                });
              }}>
                Reenviar convite
              </DropdownMenuItem>
            )}
            <DropdownMenuItem 
              onClick={() => onDelete(collaborator)}
              className="text-red-500 focus:text-red-500"
            >
              {collaborator.status === 'pending' ? 'Cancelar convite' : 'Remover'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default CollaboratorListItem;
