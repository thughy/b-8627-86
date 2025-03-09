
import React from 'react';
import { Deal, Asset } from '@/pages/Workflows/models/WorkflowModels';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
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
  onWinDeal?: (dealId: string) => void;
  onLoseDeal?: (dealId: string, reason?: string) => void;
  onCreateAsset?: (dealId: string, asset?: Partial<Asset>) => void;
  onCreateTask?: (dealId: string) => void;
  onCreateNote?: (dealId: string) => void;
  onCreateDocument?: (dealId: string) => void;
  onCreateEmail?: (dealId: string) => void;
}

const DealCardModal: React.FC<DealCardModalProps> = ({
  isOpen,
  onClose,
  deal,
  onEditDeal,
  onDeleteDeal,
  onCancelDeal,
  onWinDeal,
  onLoseDeal,
  onCreateAsset,
  onCreateTask,
  onCreateNote,
  onCreateDocument,
  onCreateEmail
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
      <DialogContent className="max-w-6xl max-h-[90vh] p-0 flex flex-col">
        <DialogHeader className="p-6 pb-2 flex-shrink-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">{deal.title}</DialogTitle>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                    Ações
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {deal.status === 'open' && onWinDeal && (
                    <DropdownMenuItem onClick={() => onWinDeal(deal.id)}>
                      Marcar como Ganho
                    </DropdownMenuItem>
                  )}
                  {deal.status === 'open' && onLoseDeal && (
                    <DropdownMenuItem onClick={() => onLoseDeal(deal.id)}>
                      Marcar como Perdido
                    </DropdownMenuItem>
                  )}
                  {deal.status === 'open' && onCancelDeal && (
                    <DropdownMenuItem onClick={() => onCancelDeal(deal.id)}>
                      Cancelar
                    </DropdownMenuItem>
                  )}
                  {onDeleteDeal && (
                    <DropdownMenuItem 
                      className="text-red-500 focus:text-red-500" 
                      onClick={() => onDeleteDeal(deal.id)}
                    >
                      Excluir
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </DialogHeader>

        {/* Informações Resumidas - Não rolável */}
        <div className="px-6 pt-2 pb-4 flex-shrink-0">
          <DealSummaryCards deal={deal} />
          <DealCounters counters={counters} />
        </div>

        {/* Conteúdo principal em colunas - Cada coluna com sua própria área de rolagem */}
        <div className="flex-1 grid grid-cols-12 gap-6 px-6 pb-6 overflow-hidden">
          {/* Coluna de Parâmetros com ScrollArea independente */}
          <div className="col-span-4 flex flex-col overflow-hidden">
            <h3 className="text-lg font-medium mb-3">Parâmetros</h3>
            <div className="border rounded-md flex-1 overflow-hidden">
              <ScrollArea className="h-[calc(80vh-200px)]">
                <div className="p-4">
                  <DealParametersTab deal={deal} onEditDeal={onEditDeal} />
                </div>
              </ScrollArea>
            </div>
          </div>
          
          {/* Coluna de Workspace com ScrollArea independente */}
          <div className="col-span-8 flex flex-col overflow-hidden">
            <h3 className="text-lg font-medium mb-3 pl-4">Workspace</h3>
            <div className="pl-4 border rounded-md flex-1 overflow-hidden">
              <ScrollArea className="h-[calc(80vh-200px)]">
                <DealWorkspaceTab 
                  deal={deal} 
                  onCreateAsset={onCreateAsset}
                  onCreateTask={onCreateTask}
                  onCreateNote={onCreateNote}
                  onCreateDocument={onCreateDocument}
                  onCreateEmail={onCreateEmail}
                />
              </ScrollArea>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DealCardModal;
