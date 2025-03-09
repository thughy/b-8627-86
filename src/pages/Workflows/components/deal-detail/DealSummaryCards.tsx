
import React from 'react';
import { Deal } from '@/pages/Workflows/models/WorkflowModels';
import { Card, CardContent } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { User, DollarSign, Calendar, Hash } from 'lucide-react';
import DealStatusBadge from './DealStatusBadge';

interface DealSummaryCardsProps {
  deal: Deal;
}

const DealSummaryCards: React.FC<DealSummaryCardsProps> = ({ deal }) => {
  return (
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
            <DealStatusBadge status={deal.status} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DealSummaryCards;
