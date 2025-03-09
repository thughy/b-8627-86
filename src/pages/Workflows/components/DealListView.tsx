
import React from 'react';
import { Deal } from '@/pages/Workflows/models/WorkflowModels';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatDate } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Editar</DropdownMenuItem>
                  <DropdownMenuItem>Duplicar</DropdownMenuItem>
                  <DropdownMenuItem>Compartilhar</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-500 focus:text-red-500">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <span>Excluir</span>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta ação não pode ser desfeita. Tem certeza de que deseja excluir este negócio?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction>Excluir</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              {deal.description}
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500">Valor</div>
                <div className="font-medium">{formatCurrency(deal.amount || 0)}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Status</div>
                <Badge className={
                  deal.status === 'won' ? 'bg-green-500' :
                    deal.status === 'lost' ? 'bg-red-500' : 'bg-blue-500'
                }>
                  {deal.status === 'won' ? 'Ganho' :
                    deal.status === 'lost' ? 'Perdido' :
                      deal.status === 'completed' ? 'Concluído' : 'Aberto'}
                </Badge>
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
