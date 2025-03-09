
import React from 'react';
import { Deal } from '@/pages/Workflows/models/WorkflowModels';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Building2, Calendar, CreditCard, User } from 'lucide-react';

interface DealDetailsTabProps {
  deal: Deal;
}

const DealDetailsTab: React.FC<DealDetailsTabProps> = ({ deal }) => {
  // Type guard for custom deal properties
  interface ExtendedDeal extends Deal {
    reasonForLoss?: string;
    interests?: string;
  }
  
  const extendedDeal = deal as ExtendedDeal;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'won':
        return <Badge className="bg-green-500">Ganho</Badge>;
      case 'lost':
        return <Badge className="bg-red-500">Perdido</Badge>;
      case 'completed':
        return <Badge className="bg-purple-500">Concluído</Badge>;
      default:
        return <Badge className="bg-blue-500">Aberto</Badge>;
    }
  };

  return (
    <ScrollArea className="h-[60vh]">
      <div className="space-y-4 p-2">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium mb-1">Tipo</h3>
            <p className="text-muted-foreground">{deal.type || 'Não especificado'}</p>
          </div>
          <div>
            <h3 className="font-medium mb-1">Status</h3>
            {getStatusBadge(deal.status)}
          </div>
          
          {extendedDeal.interests && (
            <div>
              <h3 className="font-medium mb-1">Interesse</h3>
              <p className="text-muted-foreground">{extendedDeal.interests}</p>
            </div>
          )}
          
          {deal.status === 'lost' && extendedDeal.reasonForLoss && (
            <div>
              <h3 className="font-medium mb-1">Motivo da Perda</h3>
              <p className="text-muted-foreground">{extendedDeal.reasonForLoss}</p>
            </div>
          )}
          
          {deal.startDate && (
            <div>
              <h3 className="font-medium mb-1">Data de Início</h3>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(deal.startDate)}</span>
              </div>
            </div>
          )}
          
          {deal.endDate && (
            <div>
              <h3 className="font-medium mb-1">Data de Término</h3>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(deal.endDate)}</span>
              </div>
            </div>
          )}
          
          {deal.amount !== undefined && (
            <div>
              <h3 className="font-medium mb-1">Valor</h3>
              <div className="flex items-center gap-1 font-medium">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <span>{formatCurrency(deal.amount)}</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="border-t pt-4">
          <h3 className="font-medium mb-2">Cliente</h3>
          {deal.customerName && (
            <div className="flex items-center gap-2 mb-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>{deal.customerName}</span>
            </div>
          )}
          {deal.customerOrganization && (
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span>{deal.customerOrganization}</span>
            </div>
          )}
        </div>
        
        {deal.description && (
          <div className="border-t pt-4">
            <h3 className="font-medium mb-2">Descrição</h3>
            <p className="text-muted-foreground">{deal.description}</p>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default DealDetailsTab;
