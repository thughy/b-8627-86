
import React from "react";
import { Deal } from "@/pages/Workflows/models/WorkflowModels";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";

interface DealCardProps {
  deal: Deal;
  onAction: (action: string, data?: any) => void;
}

const DealCard = ({ deal, onAction }: DealCardProps) => {
  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onAction("viewDeal", deal)}
    >
      <CardContent className="p-3">
        <div className="flex items-start justify-between">
          <h4 className="font-medium text-sm line-clamp-2">
            {deal.title}
          </h4>
          <Badge variant="outline">
            {deal.status === 'open' ? 'Aberto' : 
             deal.status === 'won' ? 'Ganho' : 
             deal.status === 'lost' ? 'Perdido' : 
             deal.status === 'completed' ? 'Concluído' : 
             deal.status === 'canceled' ? 'Cancelado' : 'Desconhecido'}
          </Badge>
        </div>
        
        {deal.description && (
          <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">
            {deal.description}
          </p>
        )}
        
        <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-3 text-xs">
          {deal.amount && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="font-medium text-foreground">
                {formatCurrency(deal.amount)}
              </span>
            </div>
          )}
          
          {deal.startDate && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <span>{format(new Date(deal.startDate), 'dd/MM/yyyy')}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DealCard;
