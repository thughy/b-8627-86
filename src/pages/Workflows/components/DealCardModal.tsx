
import React, { useState } from 'react';
import { Deal, Asset } from '@/pages/Workflows/models/WorkflowModels';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Edit, Trash, X, User, Calendar, DollarSign, Hash, MessageCircle, FileText, CheckSquare } from 'lucide-react';
import DealParametersTab from './deal-detail/DealParametersTab';
import DealWorkspaceTab from './deal-detail/DealWorkspaceTab';

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
  const [activeTab, setActiveTab] = useState('parameters');

  if (!deal) return null;

  const getStatusColor = (status: Deal['status']) => {
    switch (status) {
      case 'open':
        return 'bg-blue-500/10 text-blue-500';
      case 'won':
        return 'bg-green-500/10 text-green-500';
      case 'lost':
        return 'bg-red-500/10 text-red-500';
      case 'completed':
        return 'bg-purple-500/10 text-purple-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  const getStatusText = (status: Deal['status']) => {
    switch (status) {
      case 'open':
        return 'Em aberto';
      case 'won':
        return 'Ganho';
      case 'lost':
        return 'Perdido';
      case 'completed':
        return 'Concluído';
      default:
        return status;
    }
  };

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
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden flex flex-col">
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
          <div className="flex flex-wrap gap-4 mb-4">
            <Card className="bg-muted/50 flex-1 min-w-[200px]">
              <CardContent className="p-3 flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Cliente</p>
                  <p className="font-medium">
                    {deal.customerName || "Não definido"}
                    {deal.customerOrganization && (
                      <span className="ml-1 text-sm text-muted-foreground">
                        ({deal.customerOrganization})
                      </span>
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/50 flex-1 min-w-[200px]">
              <CardContent className="p-3 flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Valor</p>
                  <p className="font-medium">
                    {deal.amount
                      ? new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }).format(deal.amount)
                      : "Não definido"}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/50 flex-1 min-w-[200px]">
              <CardContent className="p-3 flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Criado</p>
                  <p className="font-medium">
                    {deal.startDate
                      ? formatDistanceToNow(deal.startDate, { addSuffix: true, locale: ptBR })
                      : "Não definido"}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/50 flex-1 min-w-[200px]">
              <CardContent className="p-3 flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Hash className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant="outline" className={`${getStatusColor(deal.status)}`}>
                    {getStatusText(deal.status)}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contadores */}
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex items-center gap-1 text-sm">
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Mensagens:</span>
              <span className="font-medium">{counters.chat}</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Ativos:</span>
              <span className="font-medium">{counters.assets}</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <CheckSquare className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Tarefas:</span>
              <span className="font-medium">{counters.tasks}</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="parameters" className="flex flex-col h-full" onValueChange={setActiveTab} value={activeTab}>
            <TabsList className="mx-6 mb-2">
              <TabsTrigger value="parameters">Parâmetros</TabsTrigger>
              <TabsTrigger value="workspace">Workspace</TabsTrigger>
            </TabsList>
            
            <TabsContent value="parameters" className="flex-1 overflow-auto p-6 pt-0">
              <DealParametersTab deal={deal} onEditDeal={onEditDeal} />
            </TabsContent>
            
            <TabsContent value="workspace" className="flex-1 overflow-auto p-6 pt-0">
              <DealWorkspaceTab 
                deal={deal} 
                onCreateAsset={onCreateAsset}
              />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DealCardModal;
