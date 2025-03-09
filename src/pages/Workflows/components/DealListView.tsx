
import React from 'react';
import { Deal } from '@/pages/Workflows/models/WorkflowModels';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatDate } from '@/lib/utils';

interface DealListViewProps {
  deals: Deal[];
  onDealClick: (deal: Deal) => void;
}

const DealListView: React.FC<DealListViewProps> = ({ deals, onDealClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {deals.map(deal => (
        <Card key={deal.id} className="cursor-pointer" onClick={() => onDealClick(deal)}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="text-lg font-medium">{deal.title}</div>
              <Badge>
                {deal.status === 'open' ? 'Aberto' : 
                 deal.status === 'won' ? 'Ganho' : 
                 deal.status === 'lost' ? 'Perdido' : 
                 deal.status === 'completed' ? 'Concluído' : 
                 deal.status === 'canceled' ? 'Cancelado' : 'Desconhecido'}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              {deal.description}
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500">Valor</div>
                <div className="font-medium">{formatCurrency(deal.amount || 0)}</div>
              </div>
            </div>
            <div className="mt-3 text-xs text-gray-500">
              Criado em: {formatDate(deal.createdAt)}
            </div>
          </CardContent>
        </Card>
      ))}

      {deals.length === 0 && (
        <div className="col-span-full text-center p-8 border rounded-md bg-muted/20">
          <p className="text-muted-foreground">Nenhum negócio encontrado</p>
        </div>
      )}
    </div>
  );
};

export default DealListView;
