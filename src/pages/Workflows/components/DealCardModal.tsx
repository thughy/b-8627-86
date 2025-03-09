
import React from 'react';
import { Deal, Asset } from '@/pages/Workflows/models/WorkflowModels';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Edit, Trash, X } from 'lucide-react';
import DealParametersTab from './deal-detail/DealParametersTab';
import DealWorkspaceTab from './deal-detail/DealWorkspaceTab';
import DealStatusBadge from './deal-detail/DealStatusBadge';
import DealSummaryCards from './deal-detail/DealSummaryCards';
import DealCounters from './deal-detail/DealCounters';

interface DealCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  deal: Deal | null;
  onEditDeal?: (deal: Deal) => void;
  onDeleteDeal?: (dealId: string) => void;
  onCancelDeal?: (dealId: string) => void;
  onCreateAsset?: (dealId: string, asset: Partial<Asset>) => void;
}

const DealCardModal: React.FC<DealCardModalProps> = ({
  isOpen,
  onClose,
  deal,
  onEditDeal,
  onDeleteDeal,
  onCancelDeal,
  onCreateAsset
}) => {
  if (!deal) return null;

  // Exemplo de contadores (em um cenário real, viriam da API)
  const counters = {
    chat: 3,
    assets: 2,
    tasks: 5,
    notes: 1,
    emails: 2,
    documents: 3
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-6xl max-h-[90vh] p-0 overflow-hidden flex flex-col">
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">{deal.title}</DialogTitle>
            <div className="flex items-center gap-2">
              {onEditDeal && (
                <Button variant="ghost" size="sm" onClick={() => onEditDeal(deal)}>
                  <Edit className="h-4 w-4 mr-1" />
                  Editar
                </Button>
              )}
              {onCancelDeal && deal.status === 'open' && (
                <Button variant="ghost" size="sm" onClick={() => onCancelDeal(deal.id)}>
                  <X className="h-4 w-4 mr-1" />
                  Cancelar
                </Button>
              )}
              {onDeleteDeal && (
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700" onClick={() => onDeleteDeal(deal.id)}>
                  <Trash className="h-4 w-4 mr-1" />
                  Excluir
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>

        {/* Informações Resumidas */}
        <div className="px-6 py-2">
          <DealSummaryCards deal={deal} />
          <DealCounters counters={counters} />
        </div>

        {/* Conteúdo principal em colunas */}
        <div className="flex-1 overflow-hidden p-6 pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            {/* Coluna de Parâmetros */}
            <div className="overflow-y-auto pr-2">
              <h3 className="text-lg font-medium mb-3">Parâmetros</h3>
              <DealParametersTab deal={deal} onEditDeal={onEditDeal} />
            </div>
            
            {/* Coluna de Workspace */}
            <div className="overflow-y-auto pl-2 border-l border-border">
              <h3 className="text-lg font-medium mb-3 pl-4">Workspace</h3>
              <div className="pl-4">
                <DealWorkspaceTab 
                  deal={deal} 
                  onCreateAsset={onCreateAsset}
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DealCardModal;
