
import React from 'react';
import { Deal } from '@/pages/Workflows/models/WorkflowModels';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronRight, Calendar, DollarSign, User } from 'lucide-react';

interface DealListViewProps {
  deals: Deal[];
  onDealClick: (deal: Deal) => void;
}

const DealListView: React.FC<DealListViewProps> = ({ deals, onDealClick }) => {
  const getStatusColor = (status: Deal['status']) => {
    switch (status) {
      case 'open':
        return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20';
      case 'won':
        return 'bg-green-500/10 text-green-500 hover:bg-green-500/20';
      case 'lost':
        return 'bg-red-500/10 text-red-500 hover:bg-red-500/20';
      case 'completed':
        return 'bg-purple-500/10 text-purple-500 hover:bg-purple-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20';
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

  if (deals.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">Nenhum negócio encontrado com os filtros atuais.</p>
      </div>
    );
  }

  return (
    <Card className="overflow-hidden border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Título</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deals.map((deal) => (
            <TableRow 
              key={deal.id} 
              onClick={() => onDealClick(deal)}
              className="cursor-pointer hover:bg-muted/50"
            >
              <TableCell className="font-medium">
                <div className="flex flex-col">
                  <span>{deal.title}</span>
                  {deal.description && (
                    <span className="text-xs text-muted-foreground line-clamp-1">
                      {deal.description}
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                {deal.customerName ? (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{deal.customerName}</span>
                    {deal.customerOrganization && (
                      <span className="text-xs text-muted-foreground">
                        ({deal.customerOrganization})
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="text-muted-foreground">N/D</span>
                )}
              </TableCell>
              <TableCell>
                {deal.amount ? (
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(deal.amount)}
                    </span>
                  </div>
                ) : (
                  <span className="text-muted-foreground">N/D</span>
                )}
              </TableCell>
              <TableCell>
                {deal.startDate && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {formatDistanceToNow(deal.startDate, { 
                        addSuffix: true,
                        locale: ptBR
                      })}
                    </span>
                  </div>
                )}
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={`${getStatusColor(deal.status)}`}>
                  {getStatusText(deal.status)}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default DealListView;
