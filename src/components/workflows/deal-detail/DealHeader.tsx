
import React from 'react';
import { Deal } from '@/pages/Workflows/models/WorkflowModels';
import {
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Edit, Trash2, X } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface DealHeaderProps {
  deal: Deal;
  onEditDeal?: (deal: Deal) => void;
  onDeleteDeal?: (dealId: string) => void;
  onCancelDeal?: (dealId: string) => void;
}

const DealHeader: React.FC<DealHeaderProps> = ({
  deal,
  onEditDeal,
  onDeleteDeal,
  onCancelDeal
}) => {
  return (
    <DialogHeader className="flex flex-row items-center justify-between">
      <DialogTitle className="text-xl">{deal.title}</DialogTitle>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {onEditDeal && (
            <DropdownMenuItem onClick={() => onEditDeal(deal)}>
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </DropdownMenuItem>
          )}
          {onDeleteDeal && (
            <DropdownMenuItem 
              onClick={() => onDeleteDeal(deal.id)} 
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir
            </DropdownMenuItem>
          )}
          {onCancelDeal && (
            <DropdownMenuItem onClick={() => onCancelDeal(deal.id)}>
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </DialogHeader>
  );
};

export default DealHeader;
